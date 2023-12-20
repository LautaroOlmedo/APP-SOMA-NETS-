import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

// ---------- ---------- ---------- ---------- ----------

import { UserDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';

import { ErrorManager } from '../../utils/error.manager';

import { EmailService } from '../../emails/services/email.service';
import { PhonesService } from '../../phones/services/phones.service';
import { DirectionsService } from '../../directions/services/directions.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    private readonly emailsService: EmailService,
    private readonly phonesService: PhonesService,
    private readonly directionsService: DirectionsService,

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
        .leftJoinAndSelect('user.brand', 'brand.id')
        .getOne();
      return user;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async findByUniqueValues(
    body: UserDTO,
  ): Promise<boolean | ErrorManager> {
    const { dni, username } = body;
    try {
      const userAlreadyExists: UserEntity = await this.userRepository.findOne({
        where: [{ dni }, { username }],
      });

      if (userAlreadyExists) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'DNI o USERNAME en uso',
        });
      }
      return true;
    } catch (e) {
      console.log(e);
      throw new ErrorManager.createSignatureError(e.message);
    }
  }

  public async createUser(body: UserDTO): Promise<void | ErrorManager> {
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

      const userDirection = await this.directionsService.createUserDirection(
        direction,
        department,
      );

      newUser.direction = userDirection;

      await this.userRepository.save(newUser);

      await this.emailsService.createUserEmail(emails, newUser);
      await this.phonesService.createUserPhone(phones, newUser);

      await queryRunner.commitTransaction();
      return;
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
}
