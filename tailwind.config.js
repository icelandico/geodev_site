/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				primaryBlue: '#2563EB',
				secondaryBlue: '#54a0ff',
				tertiaryBlue: '#D0CCFF',
				primaryBlack: '#3E3E3E',
				secondaryBlack: '#D8D8D8',
				primaryDark: '#192734',
				secondaryWhite: '#ecf0f1'
			}
		}
	},
	plugins: []
};
