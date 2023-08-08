import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../users/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { IAuthResponse } from "./interfaces/auth-response.interface";
import { RegisterDto } from "./dtos/register.dto";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService
  ) {
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        return user;
      }
    }
    throw new HttpException("User not found", HttpStatus.NOT_FOUND);
  }

  generateAuthResponse(user: User): IAuthResponse {
    delete user.password;
    return {
      user,
      accessToken: this.jwtService.sign({ id: user.id, email: user.email }, { secret: process.env.JWT_ACCESS_SECRET })
    };
  }

  async login(user: User): Promise<IAuthResponse> {
    return this.generateAuthResponse(user)
  }

  async register(registerDto: RegisterDto): Promise<IAuthResponse> {
    const { email, password, passwordConfirm } = registerDto;
    if (password !== passwordConfirm) {
      throw  new HttpException("Password are not identical", HttpStatus.BAD_REQUEST);
    }
    if (await this.usersRepository.findOneBy({ email })) {
      throw new HttpException("User is already exist", HttpStatus.BAD_REQUEST);
    }
    const user = new User();
    user.email = email;
    user.password = await bcrypt.hash(password, Number(process.env.BCRYPY_SALT));
    return this.generateAuthResponse(await this.usersRepository.save(user))
  }

}
