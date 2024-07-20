import { posts } from '$lib/server/blogPosts';
import { books } from '$lib/server/books';
import { PAGE_DESCRIPTION } from '$utils/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Programming and cartography',
		description: PAGE_DESCRIPTION,
		posts: posts.slice(0, 5),
		books: books.slice(0, 5)
	};
};
