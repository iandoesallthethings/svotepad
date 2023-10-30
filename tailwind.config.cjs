/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	corePlugins: {
		// preflight: false
	},

	theme: {
		extend: {}
	},

	plugins: [require('@tailwindcss/typography')]
}

module.exports = config
