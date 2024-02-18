import type { Page } from "puppeteer";
import type { Job } from "..";

export async function getLinkedinCompanyJobs(page: Page, companyId: string) {
	await page.goto(
		`https://www.linkedin.com/jobs/search/?f_C=${companyId}&geoId=92000000`,
	);

	try {
		await page.waitForSelector(".jobs-search__results-list", {
			timeout: 5000,
		});
	} catch {
		console.warn("No jobs found at company: ", companyId);
		return [];
	}

	return await page.$$eval(".jobs-search__results-list > li", (el) => {
		return el.map((job) => ({
			title: job.querySelector(".base-search-card__title")?.textContent?.trim(),
			company: job
				.querySelector(".base-search-card__subtitle")
				?.textContent?.trim(),
			link: job.querySelector(".base-card__full-link")?.getAttribute("href"),
		})) as Job[];
	});
}
