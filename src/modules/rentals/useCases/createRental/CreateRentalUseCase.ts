import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalsUseCase {
  constructor(
    @inject("RentalsRepository")
    private rentalRepository: IRentalsRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    // Variável para determinar tempo mínimo de aluguel de veículos.
    const minimunHourRental = 24;

    // Não deve ser possível cadastrar um alguel caso já houver outro em aberto para o mesmo carro.
    const carUnavailable = await this.rentalRepository.findOpenRentalByCar(
      car_id
    );
    if (carUnavailable) throw new AppError("Car is unavailable");

    // Não deve ser possível cadastrar um alguel caso já houver outro em aberto para o mesmo usuário.
    const rentalOpenToUse = await this.rentalRepository.findOpenRentalByUser(
      user_id
    );
    if (rentalOpenToUse) {
      throw new AppError("There's a rental in prograss for user");
    }

    const dateNow = this.dateProvider.dateNow();

    // O aluguel dever ter duração mínima de 24 horas. Modificar formato para
    // padrão universal UTC. A biblioteca DateJS faz isso de formal padrão.
    const compareDates = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date
    );

    // Se a locação for menor que 24hors, a aplicação vai dar error.
    if (compareDates < minimunHourRental) {
      throw new AppError("Invalid return time!");
    }

    const rental = await this.rentalRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalsUseCase };
