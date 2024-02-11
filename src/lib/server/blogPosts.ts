import { parse } from 'path';

interface Tag {
	name: string;
}

export interface GroupedPost {
	year: number;
	posts: Post[];
}

type PostData = {
	metadata: Post;
	default: unknown;
};

type TagData = {
	metadata: Tag;
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


export const posts = Object.entries(
	import.meta.glob<PostData>('./../content/blog/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,
			slug: parse(filepath).name
		};
	})

export const groupedPosts = posts
	.reduce((groupedPosts: GroupedPost[], post: Post) => {
		const year = new Date(post.date).getFullYear();

		const existingYearIndex = groupedPosts.findIndex((group) => group.year === year);

		if (existingYearIndex !== -1) {
			groupedPosts[existingYearIndex].posts.push(post);
		} else {
			groupedPosts.push({
				year,
				posts: [post]
			});
		}

		return groupedPosts;
	}, [])
	.map((yearGroup) => ({
		...yearGroup,
		posts: yearGroup.posts.sort((a, b) => (new Date(b.date) > new Date(a.date) ? 1 : -1))
	}))
	.sort((a, b) => b.year - a.year);

export const tags = Object.entries(
	import.meta.glob<TagData>('./../content/tags/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => globEntry.metadata)
	.sort();
