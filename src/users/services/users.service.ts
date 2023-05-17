import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { last } from 'rxjs';

// ---------- ---------- ---------- ---------- ----------

import { UserDTO, UserToStoreDTO, UserUpdateDTO } from '../dto/user.dto';
import { UserEntity } from '../entities/user.entity';
import { StoreUsersEntity } from 'src/stores/entities/store-users.entity';
import { ErrorManager } from '../../utils/error.manager';
import { UserDirectionsEntity } from '../../directions/entities/user-directions.entity';
import { ROLES } from '../../constants/roles';
import { BrandEntity } from '../../brands/entities/brand.entity';
import { DepartmentEntity } from '../../departments/entities/department.entity';
import { ProvinceEntity } from '../../provinces/entities/province.entity';
import { CountryEntity } from '../../countries/entities/country.entity';
import { UserEmailsEntity } from '../../emails/entities/user-emails.entity';
import { UserPhonesEntity } from '../../phones/entities/user-phones.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(StoreUsersEntity)
    private readonly storeUsersRepository: Repository<StoreUsersEntity>,
    @InjectRepository(UserDirectionsEntity)
    private readonly userDirectionRepository: Repository<UserDirectionsEntity>,
    @InjectRepository(UserEmailsEntity)
    private readonly userEmailsRepository: Repository<UserEmailsEntity>,
    @InjectRepository(UserPhonesEntity)
    private readonly userPhonesRepository: Repository<UserPhonesEntity>,
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
      if (users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró resultado',
        });
      }
      return users;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
    }
  }

  public async findOneUser(id: string): Promise<UserEntity> {
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

  public async createUser(
    lastname: string,
    firstname: string,
    age: number,
    username: string,
    password: string,
    role: ROLES,
    active: boolean,
    dni: string,
    direction: string,
    brand: BrandEntity,
    department: DepartmentEntity,
    province: ProvinceEntity,
    country: CountryEntity,
    emails: string[],
    phones: string[],
  ): Promise<UserEntity> {
    try {
      password = await bcrypt.hash(password, +process.env.HASH_SALT);
      const newUser = this.userRepository.create({
        firstname: firstname,
        lastname: lastname,
        age,
        password,
        username,
        role,
        active,
        dni,
        brand,
        department,
        province,
        country,
      });

      const newDirection = this.userDirectionRepository.create({ direction });
      newDirection.department = newUser.department;
      await this.userDirectionRepository.save(newDirection);
      newUser.direction = newDirection;

      await this.userRepository.save(newUser); // PARA CREAR UN NUEVO USUARIO Y LUEGO GUARDAR SUS EMAILS Y PHONES PRIMEROS LO GUARDAMOS
      for (let i = 0; i < emails.length; i++) {
        let newEmail = this.userEmailsRepository.create({ email: emails[i] });
        newEmail.user = newUser;
        await this.userEmailsRepository.save(newEmail);
      }

      for (let j = 0; j < phones.length; j++) {
        let newPhone = this.userPhonesRepository.create({
          phoneNumber: phones[j],
        });
        newPhone.user = newUser;
        await this.userPhonesRepository.save(newPhone);
      }
      return newUser;
    } catch (e) {
      console.log(e);
      throw ErrorManager.createSignatureError(e.message);
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
