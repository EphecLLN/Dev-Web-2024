import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "postgres",
});
const db = drizzle(client);

export default db;
