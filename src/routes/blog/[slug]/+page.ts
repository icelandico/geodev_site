import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const post = await import(`../../../lib/content/blog/${params.slug}.md`);

		return {
			title: post.metadata.title,
			content: post.default,
			meta: post.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
