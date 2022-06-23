import { instanceToInstance } from "class-transformer";

import { User } from "../infra/typeorm/entities/User";
import { IUserReponseDTO } from "@modules/accounts/dtos/IUserReponseDTO";

class UserMap {
  static toDTO({
    id,
    name,
    email,
    avatar,
    driver_license,
    avatar_url,
  }: User): IUserReponseDTO {
    const user = instanceToInstance({
      id,
      name,
      email,
      avatar,
      driver_license,
      avatar_url,
    });
    return user;
  }
}

export { UserMap };
