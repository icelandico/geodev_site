import { parse } from 'path';

type GlobEntry = {
	metadata: Book;
	default: unknown;
};

export interface Book {
	templateKey: string;
	title: string;
	author: string;
	slug: string;
	date: string;
	link: string;
	rating: string;
	pages: number;
	next: number;
	previous: {
		templateKey: string;
		title: string;
		author: string;
		slug: string;
		date: string;
		link: string;
		rating: string;
		pages: number;
	};
}

export const books = Object.entries(
	import.meta.glob<GlobEntry>('/content/books/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,

			slug: parse(filepath).name
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
	.map((post, index, allBooks) => ({
		...post,
		next: allBooks[index - 1] || 0,
		previous: allBooks[index + 1] || 0
	}));
