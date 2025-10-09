/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primaryBlue: '#5e81ac',
				primaryBlack: '#3E3E3E',
				secondaryBlack: '#D8D8D8',
				primaryDark: '#192734',
				primaryOrange: '#e67e22'
			}
		}
	},
	plugins: []
};
