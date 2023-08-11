import { ROLES } from 'src/constants/roles';
import { UserEntity } from 'src/users/entities/user.entity';

export interface PayloadToken {
  sub: string;
  role: ROLES;
  // exp: number;
}

export interface AuthBody {
  username: string;
  password: string;
}

export interface AuthResponse {
  accesToken: string;
  user: UserEntity;
}

export interface AuthTokenResult {
  role: string;
  sub: string;
  iat: number;
  exp: number;
}

export interface IUseToken {
  role: string;
  sub: string;
  isExpired: boolean;
}
