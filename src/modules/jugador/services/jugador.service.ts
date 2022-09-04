import { Injectable, NotFoundException } from '@nestjs/common';
import { JugadorI } from '../interfaces';
import { JugadorCreateDto, JugadorUpdateDto } from '../dtos';

@Injectable()
export class JugadorService {
  private jugadores: JugadorI[] = [];
  private id = 1;

  async findAll(): Promise<JugadorI[]> {
    return this.jugadores;
  }

  async findOne(id: number): Promise<JugadorI> {
    return this.jugadores.find((item) => item.id === id);
  }

  async createOne(dto: JugadorCreateDto): Promise<JugadorI> {
    const newJugador: JugadorI = {
      id: 1,
      ...dto,
    };
    this.jugadores.push(newJugador);
    this.id = this.id + 1;
    return newJugador;
  }

  async updateOne(id: number, change: JugadorUpdateDto): Promise<JugadorI> {
    let jugador = await this.findOne(id);
    if (!jugador) throw new NotFoundException('Jugador no encontrado');
    jugador = { ...jugador, ...change };
    return jugador;
  }
}
