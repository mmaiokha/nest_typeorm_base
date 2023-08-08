import { registerAs } from "@nestjs/config";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
require("dotenv").config();

export default registerAs("orm.config", (): PostgresConnectionOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + "/../../**/*.entity{.ts,.js}"],
  migrations: [__dirname + "/../../migrations/**/*{.ts,.js}"]
}));