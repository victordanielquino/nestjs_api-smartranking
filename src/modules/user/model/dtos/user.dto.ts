import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';

export class UserReadDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  @Type(() => Number)
  @Expose()
  readonly id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  @Expose()
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  @Expose()
  readonly enabled: boolean;
}

export class UserCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  readonly username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'the username of user' })
  readonly password: string;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
