/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primaryBlue: '#2563EB',
				secondaryBlue: '#54a0ff',
				primaryBlack: '#3E3E3E',
				secondaryBlack: '#D8D8D8'
			}
		}
	},
	plugins: []
};
