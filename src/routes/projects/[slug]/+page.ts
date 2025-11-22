import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const project = await import(`../../../lib/content/projects/${params.slug}.md`);

		return {
			title: project.metadata.title,
			description: project.metadata.description,
			content: project.default,
			meta: project.metadata,
			date: project.metadata.date,
			created: project.metadata.created
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
