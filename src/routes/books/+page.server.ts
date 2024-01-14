import { books, booksStats } from '$lib/server/books';
import type { PageServerLoad } from '../books/$types';

export const load: PageServerLoad = async () => {
	return {
		books,
		booksStats
	};
};
