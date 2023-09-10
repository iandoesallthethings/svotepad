/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	corePlugins: {
		// preflight: false
	},

	theme: {
		extend: {}
	},

	plugins: []
};

module.exports = config;
