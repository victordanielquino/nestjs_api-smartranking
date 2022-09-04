import { Module } from '@nestjs/common';
import { JugadorController } from './controller/jugador.controller';
import { JugadorService } from './services/jugador.service';

@Module({
  controllers: [JugadorController],
  providers: [JugadorService],
})
export class JugadorModule {}
