import { parse } from 'path';

export interface Project {
	title: string;
	templateKey: string;
	image: string;
	description: string;
	type: 'map' | 'code';
	selfUrl?: string;
	date: string;
	created: string;
	published: boolean;
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
	.filter((project) => project.published)
	.sort((a, b) =>
		a.created && b.created ? new Date(b?.created).getTime() - new Date(a?.created).getTime() : 0
	);
