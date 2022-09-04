import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { JugadorCreateDto } from '../dtos';
import { JugadorService } from '../services/jugador.service';

@Controller('jugador')
export class JugadorController {
  constructor(private readonly _jugadorService: JugadorService) {}

  @Get()
  async findAll() {
    const data = await this._jugadorService.findAll();
    return {
      messaje: 'findAll',
      data,
    };
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return {
      messaje: 'findOne',
    };
  }

  @Post()
  async createOne(@Body() dto: JugadorCreateDto) {
    const data = await this._jugadorService.createOne(dto);
    return {
      messaje: 'createOne',
      data,
    };
  }

  @Put(':id')
  updateOne(@Param('id') id: number, @Body() dto: JugadorCreateDto) {
    return {
      messaje: 'updateOne',
    };
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return {
      messaje: 'updateOne',
    };
  }
}
