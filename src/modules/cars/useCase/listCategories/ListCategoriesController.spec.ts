import { hash } from "bcrypt";
import request from "supertest";
import { Connection } from "typeorm";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
        values('${id}', 'admin', 'admin@rentx.com', '${password}', 'true', 'now()', 'XXXXXXX')
      `
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("Should be able to list all categories", async () => {
    const reponseToken = await request(app).post("/sessions").send({
      email: "admin@rentx.com",
      password: "admin",
    });

    const { refresh_token } = reponseToken.body;

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest Name Test01",
        description: "Category supertest Description Test01",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest Name Test02",
        description: "Category supertest Description Test02",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    await request(app)
      .post("/categories")
      .send({
        name: "Category supertest Name Test03",
        description: "Category supertest Description Test03",
      })
      .set({ Authorization: `Bearer ${refresh_token}` });

    const response = await request(app).get("/categories");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(3);
  });
});
