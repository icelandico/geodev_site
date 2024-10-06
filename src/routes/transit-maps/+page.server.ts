import { transitMaps, pageText } from '$lib/server/transitMaps';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	console.log('page', pageText)
	return {
		title: `Transit Maps`,
		maps: transitMaps,
		introduction: pageText[0],
	};
};
