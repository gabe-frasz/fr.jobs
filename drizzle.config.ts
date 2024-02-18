import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./drizzle/migrations",
	schema: "./drizzle/schema.ts",
	driver: "pg",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: <explanation>
		connectionString: process.env.POSTGRES_URL!,
	},
});
