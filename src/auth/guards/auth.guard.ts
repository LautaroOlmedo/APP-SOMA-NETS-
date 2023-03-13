import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

// ---------- ---------- ---------- ---------- ----------

import { UsersService } from 'src/users/services/users.service';
import { useToken } from 'src/utils/use.token';
import { IUseToken } from '../interfaces/auth.interface';
import { PUBLIC_KEY } from 'src/constants/key-decorators';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
/*AuthGuard: clase que valida que END-POINTS/FUNCIONES van a ser publicas o no
mediante el decorador */
export class AuthGuard implements CanActivate {
  constructor(
    private readonly usersService: UsersService,
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>(
      PUBLIC_KEY,
      context.getHandler(),
    );
    if (isPublic) {
      return true;
    }
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers['soma_token'];
    if (!token || Array.isArray(token)) {
      throw new UnauthorizedException('Token invalido');
    }
    const manageToken: IUseToken | string = useToken(token);
    if (typeof manageToken === 'string') {
      throw new UnauthorizedException(manageToken);
    }
    if (manageToken.isExpired) {
      throw new UnauthorizedException('El token ha expirado');
    }
    const { sub } = manageToken;
    const user: UserEntity = await this.usersService.findOneUser(sub);
    if (!user) {
      throw new UnauthorizedException('Usuario no valido');
    }
    req.idUser = user.id;
    req.roleUser = user.role;
    return true;
  }
}
