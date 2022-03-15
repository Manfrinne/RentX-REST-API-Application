import { Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticaUserUseCase } from "./AuthenticateUserUseCase";

class AuthenticateUserController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { password, email } = req.body;

    const authenticateUserUseCase = container.resolve(AuthenticaUserUseCase);

    const token = await authenticateUserUseCase.execute({
      password,
      email,
    });

    return res.json(token);
  }
}

export { AuthenticateUserController };
