import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { User } from "../../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";


export class JwtAccessStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_ACCESS_SECRET
    });
  }
  async validate(payload: any): Promise<User> {
    const user = await this.userRepository.findOneBy({id: payload.id})
    if (!user) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
    }
    return user
  }
}