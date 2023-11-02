import type { Config } from 'tailwindcss'

const config: Config = {
  content: [

    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        "primary": "#fb923c",
        "secondary": "#F97316",
        "tertiary": "",
        "error": "#dc2626",

      },
    },
    screens: {
      'xl': { 'max': '1279px' },
      'min-lg': { 'min': '1024' },
      'lg': { 'max': '1023px' },
      'md': { 'max': '767px' },
      'sm': { 'max': '639px' },
    },

  },
  plugins: [

  ],
}
export default config
