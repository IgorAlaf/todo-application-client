import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')
const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}'
	],
	theme: {
		extend: {
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
			},
			colors: {
				main: '#EFB030',
				'gray-primary': '#848382',
				'gray-light': '#D9D9D9'
			},
			maxWidth: {
				primary: '1264px'
			}
		}
	},
	plugins: []
}
export default config
