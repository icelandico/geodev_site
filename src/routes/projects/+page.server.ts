import { projects } from '$lib/server/projects';
import type { PageServerLoad } from '../projects/$types';

export const load: PageServerLoad = async () => {
	const mapProjects = projects.filter((project) => project.type === 'map');
	const programmingProjects = projects.filter((project) => project.type === 'code');
	return {
		title: 'Projects - websites, apps, maps and others',
		mapProjects,
		programmingProjects
	};
};
