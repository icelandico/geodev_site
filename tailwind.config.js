/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				primaryBlue: '#1400FF',
				secondaryBlue: '#D0CCFF',
				primaryBlack: '#3E3E3E',
				secondaryBlack: '#D8D8D8'
			},
		}
	},
	plugins: []
};
