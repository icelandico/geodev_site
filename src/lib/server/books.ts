import { parse } from 'path';
import matter from 'gray-matter';

type GlobEntry = {
	metadata: Book;
	default: unknown;
};

interface BookStatsReturnType {
	year: number;
	books: number;
	pages: number;
}

export interface Book {
	templateKey: string;
	title: string;
	author: string;
	slug: string;
	date: string;
	link: string;
	rating: string;
	pages: number;
	genre: string[];
	polishOnly: boolean;
}

export const books = Object.entries(
	import.meta.glob('./../content/books/**/*.md', { eager: true, as: 'raw' })
)
	.map(([filepath, rawMarkdown]) => {
		const { data: metadata, content } = matter(rawMarkdown);
		return {
			...(metadata as Book),
			content,
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

	export function getSingleBook(slug: string) {
		const files = import.meta.glob('./../content/books/**/*.md', {
			as: 'raw',
			eager: true
		});
	
		const match = Object.entries(files).find(([path]) =>
			path.endsWith(`${slug}.md`)
		);
	
		if (!match) return null;
	
		const [filepath, rawMarkdown] = match;
		const { data: metadata, content } = matter(rawMarkdown);
	
		return {
			...(metadata as Book),
			content,
			slug
		};
	}