import { Request, Response } from "express";
import { container } from "tsyringe";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params; // http://localhost:3333/rentals/devolution/{id}

    const devolutionUseCase = container.resolve(DevolutionRentalUseCase);
    const rental = await devolutionUseCase.execute({ id, user_id });

    return response.status(200).json(rental);
  }
}

export { DevolutionController };
