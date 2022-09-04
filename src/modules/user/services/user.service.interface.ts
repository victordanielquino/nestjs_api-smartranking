import { User } from '../model';
import { UserCreateDto, UserReadDto, UserUpdateDto } from '../model/dtos';

export interface UserServiceInterface {
  findAll(): Promise<UserReadDto[]>;

  findOne(id: number): Promise<UserReadDto>;

  createOne(dto: UserCreateDto): Promise<UserReadDto>;

  updateOne(id: number, dot: UserUpdateDto): Promise<UserReadDto>;

  deleteOne(id: number): Promise<any>;

  findOneByUsername(username: string): Promise<User>;

  hashPassword(password: string): Promise<string>;

  checkPassword(password: string, passwordEncript: string): Promise<boolean>;
}
