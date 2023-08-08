import { User } from "../../users/users.entity";

export class IAuthResponse {
  accessToken: string;
  user: User
}