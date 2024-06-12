import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
export default async function migrations(request, response) {
  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dryRun: true,
    dir: join("infra", "migrations"),
    direction: "up",
    verbose: true,
    migrationsTable: "pgmigrations",
  };

  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    response.status(200).json(pendingMigrations);
  }
  if (request.method === "POST") {
    const migratedMigration = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });
    if (migratedMigration.length > 0) {
      response.status(201).json(migratedMigration);
    }
    response.status(200).json(migratedMigration);
  }
}
