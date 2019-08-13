import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { BlacklistModule } from './auth/blacklist/blacklist.module';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import { APP_FILTER } from '@nestjs/core';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    AdminModule,
    BlacklistModule,
    ConfigModule,
    TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => ({
      type: configService.dbType as any,
      host: configService.dbHost,
      port: configService.dbPort,
      username: configService.dbUsername,
      password: configService.dbPassword,
      database: configService.dbName,
      entities: ['./src/data/entities/*.ts'],
    }),
  }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
