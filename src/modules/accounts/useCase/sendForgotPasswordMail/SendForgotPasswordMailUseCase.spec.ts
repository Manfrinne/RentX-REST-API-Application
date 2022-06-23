import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/implementations/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";
import { jest } from "@jest/globals";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepository: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    usersTokensRepository = new UsersTokensRepositoryInMemory();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepository,
      dateProvider,
      mailProvider
    );
  });

  it("Should be able to send a forgot password mail to user", async () => {
    const sendMail = jest.spyOn(mailProvider, "sendMail");

    await usersRepositoryInMemory.create({
      driver_license: "99899598",
      email: "veb@cad.tn",
      name: "Clyde George",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("veb@cad.tn");

    expect(sendMail).toHaveBeenCalled();
  });

  it("Should not be able to send an mail to user non-existent", async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute("fan@ehuragcuk.us")
    ).rejects.toEqual(new AppError("User does not exists!"));
  });

  it("Should be able to create an users tokens", async () => {
    const generateTokenMail = jest.spyOn(usersRepositoryInMemory, "create");

    await usersRepositoryInMemory.create({
      driver_license: "7854854",
      email: "cadcad@cad.tn",
      name: "George Create",
      password: "1234",
    });

    await sendForgotPasswordMailUseCase.execute("cadcad@cad.tn");

    expect(generateTokenMail).toBeCalled();
  });
});
