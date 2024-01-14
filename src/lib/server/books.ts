import { parse } from 'path';

type GlobEntry = {
	metadata: Book;
	default: unknown;
};

interface BookStatsReturnType {
	year: number;
	books: number;
	pages: number;
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
}

export const books = Object.entries(
	import.meta.glob<GlobEntry>('./../content/books/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,

			slug: parse(filepath).name
		};
	})
	.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export const booksStats = Object.entries(
	import.meta.glob<GlobEntry>('./../content/books/**/*.md', { eager: true })
)
	.map(([_, globEntry]) => globEntry.metadata)
	.reduce<BookStatsReturnType[]>((acc, book) => {
		const year = new Date(book.date).getFullYear();
		const yearEntry = acc.find((entry) => entry.year === year);

		yearEntry
			? (yearEntry.books++, (yearEntry.pages += book.pages))
			: acc.push({ year, books: 1, pages: book.pages });

		return acc;
	}, [])
	.sort((a, b) => b.year - a.year);
