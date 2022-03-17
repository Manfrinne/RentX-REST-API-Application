import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CreateRentalsUseCase } from "./CreateRentalUseCase";
import { AppError } from "@shared/errors/AppError";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalsUseCase;
let rentalRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalsUseCase(
      rentalRepositoryInMemory,
      dayjsDateProvider,
      carsRepositoryInMemory
    );
  });

  it("Should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "112233",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there are another rental open to the same User", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "112233",
      car_id: "654123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "112233",
        car_id: "123456",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in prograss for user"));
  });

  it("Should not be able to create a new rental if there are another rental open to the same Car", async () => {
    await rentalRepositoryInMemory.create({
      user_id: "112233",
      car_id: "test123",
      expected_return_date: dayAdd24Hours,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test123",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable"));
  });

  it("Should not be able to create a new rental if the rental is less than 24hours", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "123",
        car_id: "test123",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
