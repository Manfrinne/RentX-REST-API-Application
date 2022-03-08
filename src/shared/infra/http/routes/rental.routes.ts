import { Router } from "express";

import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";
import { DevolutionController } from "@modules/rentals/useCases/devolutionRental/DevolutionRentalController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ListRentalsByUserController } from "@modules/rentals/useCases/listRentalsByUse/ListRentalsByUserController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionController = new DevolutionController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);

rentalsRoutes.post(
  "/devolution/:id",
  ensureAuthenticated,
  devolutionController.handle
);

rentalsRoutes.get(
  "/user",
  ensureAuthenticated,
  listRentalsByUserController.handle
);

export { rentalsRoutes };
