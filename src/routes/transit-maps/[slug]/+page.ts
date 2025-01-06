import { error } from '@sveltejs/kit';

export async function load({ params }) {
	try {
		const transitMap = await import(`../../../lib/content/transitMaps/${params.slug}.md`);

		return {
			title: transitMap.metadata.title,
			date: transitMap.metadata.created,
			content: transitMap.default,
			meta: transitMap.metadata,
			img: transitMap.metadata.image
		};
	} catch (e) {
		throw error(404, `Could not find ${params.slug}`);
	}
}
