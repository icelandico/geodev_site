import { parse } from 'path';

type GlobEntry = {
	metadata: Post;
	default: unknown;
};

export interface Post {
	title: string;
	description: string;
	date: string;
}

export const posts = Object.entries(
	import.meta.glob<GlobEntry>('./../content/blog/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,

			// generate the slug from the file path
			slug: parse(filepath).name
		};
	})
	// sort by date
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
// add references to the next/previous post
