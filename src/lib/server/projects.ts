import { parse } from 'path';

export interface Project {
	title: string;
	templateKey: string;
	image: string;
	description: string;
	type: 'map' | 'code';
}

type GlobEntry = {
	metadata: Project;
	default: unknown;
};

export const projects = Object.entries(
	import.meta.glob<GlobEntry>('./../content/projects/**/*.md', { eager: true })
).map(([filepath, globEntry]) => {
	return {
		...globEntry.metadata,
		slug: parse(filepath).name
	};
});
