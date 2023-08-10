import {
  Body,
  Controller,
  ExecutionContext,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthDTO, ValidateTokenDTO } from '../dto/auth.dto';
import { request } from 'express';

// ---------- ---------- ---------- ---------- ----------

import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/roles.decorator';
import { PublicAcces } from '../decorators/public.decorator';

@Controller('auth')
@UseGuards(AuthGuard, RolesGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @PublicAcces()
  @Post('login')
  public async loging(@Body() { username, password }: AuthDTO) {
    const userValidate = await this.authService.validateUser(
      username,
      password,
    );
    if (!userValidate) throw new UnauthorizedException('Información no valida');
    const jwt = await this.authService.generateJWT(userValidate);
    console.log(jwt);

    return jwt;
  }

  @Roles('ADMIN')
  @Post('validateToken')
  public async validateToken(@Body() { token }: ValidateTokenDTO) {
    console.log('token controller', token);
    console.log('token controller typeof', typeof token);

    const data = await this.authService.activeTokenValidate(token);
    if (typeof data === 'boolean') {
      if (data === true) {
        return {
          status: 200,
          tokenActive: true,
        };
      } else {
        return {
          status: 200,
          tokenActive: false,
        };
      }
    }
  }
}
