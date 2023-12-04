import { ErrorManager } from 'src/utils/error.manager';
import { UserDTO } from '../dto/user.dto';
import { User } from './user';

export interface UserRepository {
  GetAll(): Promise<User[] | ErrorManager>;
  GetByID(id: string): Promise<User | ErrorManager>;
  CreateUser(body: UserDTO): Promise<ErrorManager>;
}
