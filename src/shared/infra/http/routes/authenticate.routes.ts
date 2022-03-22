import { Router } from "express";

import { AuthenticateUserController } from "@modules/accounts/useCase/authenticateUser/AuthenticateUserController";
import { RefreshTokenController } from "@modules/accounts/useCase/refreshToken/RefreshTokenController";

const authenticateRoutes = Router();

const authenticateUserController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenController();

authenticateRoutes.post("/sessions", authenticateUserController.handle);
authenticateRoutes.post("/refresh-token", refreshTokenUserController.handle);

export { authenticateRoutes };
