import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthDTO } from '../dto/auth.dto';

// ---------- ---------- ---------- ---------- ----------

import { AuthBody } from '../interfaces/auth.interface';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
}
