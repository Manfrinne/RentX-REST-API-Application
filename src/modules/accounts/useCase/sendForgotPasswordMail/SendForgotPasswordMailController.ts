import { Request, Response } from "express";
import { container } from "tsyringe";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

class SendForgotPasswordMailController {
  async execute(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassWordUseCas = container.resolve(
      SendForgotPasswordMailUseCase
    );

    await sendForgotPassWordUseCas.execute(email);

    return response.send();
  }
}

export { SendForgotPasswordMailController };
