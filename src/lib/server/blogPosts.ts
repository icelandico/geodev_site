import { parse } from 'path';

type GlobEntry = {
	metadata: Post;
	default: unknown;
};

export interface Post {
	templateKey: string;
	title: string;
	slug: string;
	date: string;
	category: string;
	tag: string[];
}

interface GroupedPost {
	year: number;
	posts: Post[];
}

export const posts = Object.entries(
	import.meta.glob<GlobEntry>('./../content/blog/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,
			slug: parse(filepath).name
		};
	})
	.reduce((groupedPosts: GroupedPost[], post: Post) => {
		const year = new Date(post.date).getFullYear();

		const existingYearIndex = groupedPosts.findIndex((group) => group.year === year);

		if (existingYearIndex !== -1) {
			groupedPosts[existingYearIndex].posts.push(post);
		} else {
			groupedPosts.push({ year, posts: [post] });
		}

		return groupedPosts;
	}, [])
	.sort((a, b) => b.year - a.year);
