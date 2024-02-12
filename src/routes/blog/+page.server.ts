import { groupedPosts, tags } from '$lib/server/blogPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Writing | Blog',
		description: 'My blog, code snippets and other programming related posts',
		posts: groupedPosts,
		tags
	};
};
