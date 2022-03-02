import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsesRepository";
import { deleteFile } from "@utils/file";

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<void> {
    // Encontrar usuário de acordo com o ID
    const user = await this.usersRepository.findById(user_id);

    // Deletar um avatar existente, se houver
    if (user.avatar) {
      await deleteFile(`./tmp/avatar/${user.avatar}`);
    }

    // Criar/Atualizar avatar do usuário
    user.avatar = avatar_file;
    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase };
