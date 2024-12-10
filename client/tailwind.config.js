/** @type {import('tailwindcss').Config} */

import { fontFamily } from "tailwindcss/defaultTheme";

export default {
    darkMode: ['class'],
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}',
        './src/hooks/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
    	extend: {
			backgroundImage: {
				'main': "linear-gradient(179deg, rgba(0,0,0,1) 70%, rgba(149,10,10,1) 90%, rgba(255,0,0,1) 100%)"
			},
			fontFamily: {
				aeonik: ["aeonik", "sans-serif"],
				"aeonik-bold": ["aeonik-bold"],
				"aeonik-lt": "aeonik-lt",
				helvetica: "helvetica",
				neue: "neue",
				"helvetica-ex": "helvetica-ex",
				"semibold": "inter-semi-bold",
				"unison": "unison",
				sans: ["inter", ...fontFamily.sans]
			},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		colors: {
				'red': {DEFAULT: '#991b1b', 400: "#d76036", 500: "#b33922", 600: 'rgba(149,10,10,1)'},
				'white': {DEFAULT: "#ffffff", 50: "#cccccc"},
				'grey': { 
					5: "#a3a3a3", 
					10: "#b2ada9", 
					50: "#a5a19e", 
					100: "#282421", 
					500: "#49413e", 
					800: "#222222",
					850: "#181819",
					950: "#101010"
				},
				'black': { DEFAULT: "#080607" },
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
		}
    },
    plugins: [require("tailwindcss-animate")],
}

