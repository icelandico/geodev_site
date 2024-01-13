import { books } from '$lib/server/books';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		books
	};
};
