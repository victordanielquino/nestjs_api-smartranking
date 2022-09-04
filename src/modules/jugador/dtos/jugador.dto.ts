export class JugadorCreateDto {
  readonly name: string;
  readonly username: string;
  readonly password: string;
}

export class JugadorUpdateDto {
  readonly name?: string;
  readonly username?: string;
  readonly password?: string;
}
