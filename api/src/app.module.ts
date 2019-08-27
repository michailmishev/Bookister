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
import { BooksController } from './books/books.controller';
import { BooksModule } from './books/books.module';
import { ReviewsController } from './reviews/reviews.controller';
import { ReviewsService } from './reviews/reviews.service';
import { ReviewsModule } from './reviews/reviews.module';
import { BooksService } from './books/books.service';

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
    BooksModule,
    ReviewsModule,
  ],
  controllers: [AppController /* , BooksController, ReviewsController */ ],
  providers: [AppService, ReviewsService,  BooksService],
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
