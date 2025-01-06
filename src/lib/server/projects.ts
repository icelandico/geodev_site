import { parse } from 'path';

export interface Project {
	title: string;
	templateKey: string;
	image: string;
	description: string;
	type: 'map' | 'code';
	selfUrl?: string;
	date?: string;
}

type GlobEntry = {
	metadata: Project;
	default: unknown;
};

export const projects = Object.entries(
	import.meta.glob<GlobEntry>('./../content/projects/**/*.md', { eager: true })
)
	.map(([filepath, globEntry]) => {
		return {
			...globEntry.metadata,
			slug: parse(filepath).name
		};
	})
	.sort((a, b) =>
		a.date && b.date ? new Date(b?.date).getTime() - new Date(a?.date).getTime() : 0
	);
