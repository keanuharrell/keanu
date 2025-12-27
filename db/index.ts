import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schemas";
// import { loadEnvConfig } from "@next/env";

// loadEnvConfig(process.cwd(), true);

export const db = drizzle(`${process.env.DATABASE_URL}`, { schema });
