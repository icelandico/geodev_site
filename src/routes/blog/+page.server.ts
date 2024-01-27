import { posts, tags } from '$lib/server/blogPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		posts,
		tags
	};
};