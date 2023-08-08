import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import ormConfig from "./config/orm/orm.config";


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: ormConfig
    }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
