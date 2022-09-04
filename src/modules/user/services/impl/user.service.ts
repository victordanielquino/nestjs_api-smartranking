import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from '../../model';
import { UserCreateDto, UserReadDto, UserUpdateDto } from '../../model/dtos';
import { UserServiceInterface } from '../user.service.interface';
import {
  UserMapper_EntitysToDtos,
  UserMapper_EntityToDto,
} from '../../mapper/user.mapper';

@Injectable()
export class UserService implements UserServiceInterface {
  constructor(@InjectRepository(User) private _userRepo: Repository<User>) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async checkPassword(password, passwordEncript): Promise<boolean> {
    return await bcrypt.compare(password, passwordEncript);
  }

  async findAll(): Promise<UserReadDto[]> {
    const users = await this._userRepo.find();
    return UserMapper_EntitysToDtos(users);
  }

  async findOne(id: number): Promise<UserReadDto> {
    const user = await this._userRepo.findOneBy({ id });
    if (!user) throw new BadRequestException('usuario no encontrado');
    return UserMapper_EntityToDto(user);
  }

  async createOne(dto: UserCreateDto): Promise<UserReadDto> {
    const existUser = await this._userRepo.findOneBy({
      username: dto.username,
    });
    if (existUser) throw new BadRequestException(`EL usuario ya exite.`);
    const hash = await this.hashPassword(dto.password);
    const newUser = await this._userRepo.create({ ...dto, password: hash });
    const user = await this._userRepo.save(newUser);
    return UserMapper_EntityToDto(user);
  }

  async updateOne(id: number, dto: UserUpdateDto): Promise<UserReadDto> {
    const user = await this._userRepo.findOneBy({ id });
    this._userRepo.merge(user, dto);
    const userChange = await this._userRepo.save(user);
    return UserMapper_EntityToDto(userChange);
  }

  async deleteOne(id: number): Promise<any> {
    const user = await this._userRepo.findOneBy({ id });
    return await this._userRepo.remove(user);
  }

  async findOneByUsername(username: string) {
    return await this._userRepo.findOne({
      where: { username },
    });
  }
}
