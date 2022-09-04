import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/impl/user.service';
import { UserCreateDto, UserUpdateDto } from '../model/dtos';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  findAll() {
    return this._userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this._userService.findOne(id);
  }

  @Post()
  async createOne(@Body() userDTO: UserCreateDto) {
    return await this._userService.createOne(userDTO);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UserUpdateDto,
  ) {
    return await this._userService.updateOne(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this._userService.deleteOne(id);
  }
}
