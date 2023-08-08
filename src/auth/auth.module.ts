import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { UsersModule } from "../users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { LocalStrategy } from "./strategies/local.strategy";
import { JwtAccessStrategy } from "./strategies/jwt-access.strategy";

@Module({
  imports: [
    UsersModule,
    JwtModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtAccessStrategy]
})
export class AuthModule {
}
