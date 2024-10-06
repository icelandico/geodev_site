import { parse } from 'path';

export interface TransitMap {
	title: string;
	created: string;
	image: string;
	slug: string;
}

export interface Pages {
	homeHeader: string;
	worksHeader: string;
	emailAddress: string;
	blogHeader: string;
	transitDiagrams: string;
}

type GlobEntry = {
	metadata: TransitMap;
	default: unknown;
};

type GlobEntryPages = {
	metadata: {transitDiagrams: string};
	default: unknown;
};

export const transitMaps = Object.entries(
	import.meta.glob<GlobEntry>('./../content/transitMaps/**/*.md', { eager: true })
).map(([filepath, globEntry]) => {
	return {
		...globEntry.metadata,
		slug: parse(filepath).name
	};
});

export const pageText =  Object.entries(
	import.meta.glob<GlobEntryPages>('./../content/pages/index.md', { eager: true })
).map(([filepath, globEntry]) => {
	return {
		...globEntry.metadata,
	};
});
