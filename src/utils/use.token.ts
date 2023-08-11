import * as jwt from 'jsonwebtoken';
import { ConfigModule, ConfigService } from '@nestjs/config';

// ---------- ---------- ---------- ---------- ----------

import { AuthTokenResult, IUseToken } from 'src/auth/interfaces/auth.interface';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();
/*useToken: función que realiza la DECODIFICACIÓN del token recibido, si recibe un token invalido retorna
token invalido, si no, retorna la información que obtiene con la decodificación (gracias a jwt.decode), 
que es sub (ID del usuario), el ROL que tiene ese usuario y devuelve true o false en base a si el token 
YA EXPIRÓ a través de el cálculo matemático +expiresDate <= +currentDate / 1000*/
export const useToken = (token: string): IUseToken | string => {
  try {
    const decode = jwt.decode(token) as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp);
    return {
      sub: decode.sub,
      role: decode.role,
      isExpired: +expiresDate <= +currentDate / 1000,
    };
  } catch (e) {
    console.log(e);
    return 'Token invalido';
  }
};

export const validateToken = (token: string): boolean | string => {
  try {
    const decode = jwt.verify(
      token,
      configService.get('JWT_SECRET'),
    ) as AuthTokenResult;

    const currentDate = new Date();
    const expiresDate = new Date(decode.exp * 1000);
    const isTokenValid = currentDate <= expiresDate;
    return isTokenValid;
  } catch (e) {
    if (e instanceof jwt.TokenExpiredError) {
      return false;
    }
    console.log(e);
    return 'Token invalido';
  }
};
