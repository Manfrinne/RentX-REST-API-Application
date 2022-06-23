import { Router } from "express";

import { SendForgotPasswordMailController } from "@modules/accounts/useCase/sendForgotPasswordMail/SendForgotPasswordMailController";
import { ResetPasswordUserController } from "@modules/accounts/useCase/resetPasswordUser/ResetPasswordUserController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetPasswordUserController = new ResetPasswordUserController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetPasswordUserController.handle);

export { passwordRoutes };
