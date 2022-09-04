import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import config from '../../common/config/config';
import { ConfigType } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configEnv: ConfigType<typeof config>) => {
        return {
          type: 'postgres',
          url: configEnv.postgresUrl,
          ssl: {
            rejectUnauthorized: false,
          },
          synchronize: false, // para que la base de datos se sincronize conforme se creen las model
          autoLoadEntities: true, // sincronizar con las entidades creadas
        };
      },
    }),
  ],
})
export class DatabaseModule {}
