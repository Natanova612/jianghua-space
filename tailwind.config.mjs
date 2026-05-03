/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        deep: {
          space: '#0B1120',
          void: '#070C18'
        },
        aurora: {
          green: '#34D399',
          blue: '#38BDF8',
          gold: '#FBBF24'
        }
      }
    }
  },
  plugins: []
}