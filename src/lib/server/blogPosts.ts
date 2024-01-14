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

			slug: parse(filepath).name
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
