import { sql } from "@vercel/postgres";
import { drizzle as createDrizzleClient } from "drizzle-orm/vercel-postgres";

import type { Job } from "..";
import { jobs as jobsTable } from "../../drizzle/schema";

const drizzle = createDrizzleClient(sql);

export async function saveJobs(jobs: Job[]) {
	await drizzle.insert(jobsTable).values(jobs);
}
