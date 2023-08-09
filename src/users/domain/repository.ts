import { UserDTO } from '../dto/user.dto';
import { User } from './user';

export interface UserRepository {
  GetAll(): Promise<User[] | null>;
  GetByID(id: string): Promise<User | null>;
  CreateUSer(body: UserDTO): Promise<null>;
}
