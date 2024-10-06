import { parse } from 'path';

export interface TransitMap {
	title: string;
	created: string;
	image: string;
	slug: string;
}

type GlobEntry = {
	metadata: TransitMap;
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
