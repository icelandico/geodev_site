import { projects } from '$lib/server/projects';
import type { PageServerLoad } from '../projects/$types';

export const load: PageServerLoad = async () => {
	return {
		title: 'Projects - websites, apps, maps and others',
		projects
	};
};
