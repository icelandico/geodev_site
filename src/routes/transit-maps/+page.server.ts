import { transitMaps } from '$lib/server/transitMaps';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: `Transit Maps`,
		maps: transitMaps,
	};
};
