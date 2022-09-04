import { Module } from '@nestjs/common';
import { JugadorModule } from './modules/jugador/jugador.module';
import { DatabaseModule } from './modules/database/database.module';
import config from './common/config/config';
import { ConfigModule } from '@nestjs/config';
import { enviroments } from './common/config/enviroments';
import * as Joi from 'joi';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: enviroments[process.env.NODE_ENV] || '.env.dev',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    JugadorModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
