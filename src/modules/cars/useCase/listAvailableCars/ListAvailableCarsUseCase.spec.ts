import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car1",
      description: "Car1 description",
      daily_rate: 150.0,
      license_plate: "CAR1-1234",
      fine_amount: 100.0,
      brand: "Car1-brand",
      category_id: "hash-category-car1",
    });

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car2",
      description: "Car2 description",
      daily_rate: 150.0,
      license_plate: "CAR2-1234",
      fine_amount: 100.0,
      brand: "Car2-brand",
      category_id: "hash-category-car2",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car2",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car3",
      description: "Car3 description",
      daily_rate: 150.0,
      license_plate: "CAR3-1234",
      fine_amount: 100.0,
      brand: "Car3-brand",
      category_id: "hash-category-car3",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "Car3-brand",
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car4",
      description: "Car4 description",
      daily_rate: 150.0,
      license_plate: "CAR4-1234",
      fine_amount: 100.0,
      brand: "Car4-brand",
      category_id: "hash-category-car4",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "hash-category-car4",
    });

    expect(cars).toEqual([car]);
  });
});
