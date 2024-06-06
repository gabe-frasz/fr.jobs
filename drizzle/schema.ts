import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const jobs = pgTable("onlyjobs_jobs", {
	id: serial("id").primaryKey(),
	company: text("company").notNull(),
	title: text("title").notNull(),
	link: text("link").notNull(),
	createdAt: timestamp("created_at", { withTimezone: false })
		.defaultNow()
		.notNull(),
});
