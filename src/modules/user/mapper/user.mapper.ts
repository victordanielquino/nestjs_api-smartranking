import { User } from '../model';
import { plainToClass } from 'class-transformer';
import { UserReadDto } from '../model/dtos';

export const UserMapper_EntityToDto = (user: User): UserReadDto => {
  return plainToClass(UserReadDto, user, {
    excludeExtraneousValues: true,
  });
};

export const UserMapper_EntitysToDtos = (users: User[]): UserReadDto[] => {
  return users.map((item) => UserMapper_EntityToDto(item));
};
