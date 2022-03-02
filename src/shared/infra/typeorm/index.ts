import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defauldOption = await getConnectionOptions();

  return createConnection(
    Object.assign(defauldOption, {
      host: process.env.NODE_ENV === "test" ? "localhost" : host,
      database:
        process.env.NODE_ENV === "test" ? "rentx_test" : defauldOption.database,
    })
  );
};
