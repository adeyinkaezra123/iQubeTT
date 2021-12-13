import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        "iqube-orange": {
          "light": '#F2994A',
          "dark": '#F2C94C',
        },
        "iqube-blue": "#2F80ED",
        "iqube-purple": '#4E598C',
        "iqube-gray": '#BDBDBD',

      },
    },
  },
  plugins: [],
}
export default config
