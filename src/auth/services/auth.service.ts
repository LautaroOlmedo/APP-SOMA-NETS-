import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from 'src/users/services/users.service';
import { UserEntity } from 'src/users/entities/user.entity';
import { PayloadToken } from '../interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}
  public async validateUser(username: string, password: string) {
    const userByUsername = await this.usersService.findBy({
      key: 'username',
      value: username,
    });

    /*const userByEmail = await this.usersService.findeBy({
        key: 'username',
        value: username,
      });*/
    if (userByUsername) {
      const match = await bcrypt.compare(password, userByUsername.password);

      if (match) return userByUsername;
    }
    return null;
  }

  public async signJWT({
    payload,
    secret,
    expires,
  }: {
    payload: jwt.JwtPayload;
    secret: string;
    expires: number | string;
  }) {
    return jwt.sign(payload, secret, { expiresIn: expires });
  }

  public async generateJWT(user: UserEntity): Promise<any> {
    const getUser = await this.usersService.findOneUser(user.id);
    const payload: PayloadToken = {
      role: getUser.role,
      sub: getUser.id,
    };

    return {
      accesToken: await this.signJWT({
        payload,
        secret: 'hola',
        expires: '1h',
      }),
      user,
    };
  }
}
