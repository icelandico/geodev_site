import { posts } from '$lib/server/blogPosts';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Programming and cartography',
		description: `Hello, I'm Michal, front-end developer from Poland. Specialized in JavaScript, Typescript, React and React Native. Welcome on my website where you can find interesting articles and my works related to programming and cartography.`,
		posts: posts.slice(0, 6)
	};
};
