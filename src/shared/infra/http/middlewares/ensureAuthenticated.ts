import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Pegar o token para verificação
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new AppError("Token Missing!", 401);

  const [, token] = authHeader.split(" ");

  try {
    // secretOrPrivateKey = 8796f21f68346949fa74351b90bfd8b5e3b69889
    const { sub: user_id } = verify(
      token,
      "8796f21f68346949fa74351b90bfd8b5e3b69889"
    ) as IPayload;

    // Verificar se o usuário com o token existe no database
    const usersRepository = new UsersRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) throw new AppError("User does not exists!", 401);

    // Só foi possível passar esse id para o Request porque subscrevemos
    // o arquivo de tipagem do TypeScript - @types/express/index.d.ts
    req.user = {
      id: user_id,
    };

    next();
  } catch {
    throw new AppError("Invalid token!", 401);
  }
}
