import { IsEmail, IsString, Length } from "class-validator";

export class RegisterDto {
  @IsString()
  @IsEmail()
  email: string

  @IsString()
  @Length(7, 25)
  password: string

  @IsString()
  @Length(7, 25)
  passwordConfirm: string
}