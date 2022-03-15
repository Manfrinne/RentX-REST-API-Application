import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    // Só é possível chamar o 'user' porque subscrevemos a tipagem original
    const { id } = req.user;
    const avatar_file = req.file.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id: id, avatar_file });

    // Código 204 é usado para especificar que o resource foi alterado, mas
    // não passamos de volta nenhum conteúdo ("no content")
    return res.status(204).send();
  }
}

export { UpdateUserAvatarController };
