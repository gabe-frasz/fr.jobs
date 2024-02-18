import { launch } from "puppeteer";

import { KEYWORDS, LINKEDIN_COMPANIES_ID } from "./consts";
import { saveJobs } from "./lib/drizzle";
import { getLinkedinCompanyJobs } from "./utils/get-linkedin-company-by-id";

// TODO: add X-Team page
// TODO: deploy on https://render.com (0.016¢ / min)

export type Job = {
	title: string;
	company: string;
	link: string;
};

const browser = await launch({ headless: "new", args: ["--no-sandbox"] });
const page = await browser.newPage();
await page.setViewport({ width: 1080, height: 1024 });

const jobs: Job[] = [];

for (const companyId of LINKEDIN_COMPANIES_ID) {
	const companyJobs = await getLinkedinCompanyJobs(page, companyId);
	jobs.push(...companyJobs);
}

await browser.close();

const filteredJobs = jobs.filter((job) => {
	return KEYWORDS.some((keyword) => job.title.toLowerCase().includes(keyword));
});

if (filteredJobs.length > 0) {
	await saveJobs(filteredJobs);
}
