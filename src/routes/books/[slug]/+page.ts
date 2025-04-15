import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const book = await import(`../../../lib/content/books/${params.slug}.md`);
		return {
			title: `Reading - ${book.metadata.title}`,
			content: book.default,
			meta: book.metadata
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
