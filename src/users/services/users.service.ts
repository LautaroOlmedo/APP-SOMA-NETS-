import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

// ---------- ---------- ---------- ---------- ----------

import { UserDTO, UserToStoreDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';
import { ErrorManager } from '../../utils/error.manager';

import { DirectionsEntity } from 'src/directions/entities/directions.entity';
import { EmailService } from '../../emails/services/email.service';

import { PhonesService } from 'src/phones/services/phones.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreUsersEntity)
    private readonly storeUsersRepository: Repository<StoreUsersEntity>,
    @InjectRepository(DirectionsEntity)
    private readonly directionRepository: Repository<DirectionsEntity>,

    private readonly emailsService: EmailService,
    private readonly phonesService: PhonesService,

    private readonly dataSource: DataSource,
  ) {}

  public async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users: UserEntity[] = await this.userRepository
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.brand', 'brand')
        .leftJoinAndSelect('user.storesIncludes', 'storesIncludes')
        .leftJoinAndSelect('storesIncludes.store', 'store')
        .leftJoinAndSelect('user.emails', 'email')
        .leftJoinAndSelect('user.phones', 'phone')
        .getMany();
      // if (users.length === 0) {
      //   throw new ErrorManager({
      //     type: 'BAD_REQUEST',
      //     message: 'No se encontró resultado',
      //   });
      // }
      return users;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneUser(id: string): Promise<UserEntity | null> {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({ id })
        .leftJoinAndSelect('user.brand', 'brand')
        .leftJoinAndSelect('user.storesIncludes', 'storesIncludes')
        .leftJoinAndSelect('storesIncludes.store', 'store')
        .getOne();
      if (!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return user;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  // METODO PARA LOGING DE AUTH
  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UserEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();
      return user;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async findByUniqueValues(
    DNI: string,
    email: string,
    username: string,
  ): Promise<UserEntity | null> {
    try {
      const userAlreadyExists: UserEntity = await this.userRepository.findOne({
        where: [{ dni: DNI }, { username }],
      });

      if (!userAlreadyExists) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'El usuario ya existe',
        });
      }
      return null;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async createUser(body: UserDTO): Promise<UserEntity> {
    const {
      lastname,
      firstname,
      age,
      username,
      role,
      active,
      dni,
      direction,
      brand,
      department,
      province,
      country,
      emails,
      phones,
    } = body;

    let { password } = body;

    const queryRunner = this.dataSource.createQueryRunner();
    try {
      queryRunner.connect();
      queryRunner.startTransaction();

      password = await bcrypt.hash(password, +process.env.HASH_SALT);
      const newUser = this.userRepository.create({
        firstname: firstname,
        lastname: lastname,
        age: age,
        password: password,
        username: username,
        role: role,
        active: active,
        dni: dni,
        brand: brand,
        department: department,
        province: province,
        country: country,
      });

      const newDirection = this.directionRepository.create({ direction });
      newDirection.department = newUser.department;
      await this.directionRepository.save(newDirection);
      newUser.direction = newDirection;

      // ---> MODIFICAR EMAILS & PHONES

      await this.userRepository.save(newUser); // PARA CREAR UN NUEVO USUARIO Y LUEGO GUARDAR SUS EMAILS Y PHONES PRIMEROS LO GUARDAMOS

      await this.emailsService.createUserEmail(emails, newUser);
      await this.phonesService.createUserPhone(phones, newUser);

      await queryRunner.commitTransaction();
      return newUser;
    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    } finally {
      queryRunner.release();
    }
  }

  public async updateUser(
    id: string,
    body: UserUpdateDTO,
  ): Promise<UpdateResult | undefined> {
    try {
      const user: UpdateResult = await this.userRepository.update(id, body);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo actualizar',
        });
      }
      return user;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async deleteUser(id: string): Promise<DeleteResult | undefined> {
    try {
      const user: DeleteResult = await this.userRepository.delete(id);
      if (user.affected === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se pudo eliminar',
        });
      }
      return user;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  // ---------- ----------  RELATIONS  ---------- ----------

  public async relationToStore(body: UserToStoreDTO) {
    try {
      return await this.storeUsersRepository.save(body);
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }
}
