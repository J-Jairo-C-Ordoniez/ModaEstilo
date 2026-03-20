import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/infrastructure/db/schema/schema.prisma",
  migrations: {
    path: "src/infrastructure/db/migrations",
  },
  engine: "client",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
