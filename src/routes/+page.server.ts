import { posts } from '$lib/server/blogPosts';
import { books } from '$lib/server/books';
import { projects } from '$lib/server/projects';
import { PAGE_DESCRIPTION, PAGE_TITLE } from '$utils/constants';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: PAGE_TITLE,
		description: PAGE_DESCRIPTION,
		posts: posts.slice(0, 5),
		books: books.slice(0, 5),
		projects: projects.slice(0, 5)
	};
};
