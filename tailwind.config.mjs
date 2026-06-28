/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'human-bg': '#FAF6F1',
        'ai-bg': '#0B1120',
        'human-text': '#1A202C',
        'ai-text': '#E2E8F0',
        'aurora-green': '#34D399',
        'aurora-blue': '#38BDF8',
        'resonance-gold': '#FBBF24',
        'gray-deep': '#2D3748',
        'gray-mid': '#4A5568',
        'gray-light': '#718096',
        'gray-pale': '#A0AEC0',
        // Starfield v0.2 palette
        'starfield-bg': '#0a0a0f',
        'starfield-ai-blue': '#4a9eff',
        'starfield-ai-cyan': '#00d4aa',
        'starfield-human-silver': '#e0e0e0',
        'starfield-human-amber': '#ff9f43',
        'starfield-resonance': '#b347e6',
        'starfield-warning': '#e63946',
      },
      fontFamily: {
        human: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        star: ['"Orbitron"', '"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        sans: ['"Noto Sans SC"', '"PingFang SC"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', '"Courier New"', 'monospace'],
        'serif-en': ['Newsreader', 'Georgia', 'serif'],
      },
      animation: {
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'flow-down': 'flowDown 3s ease-out forwards',
        'gradient-shift': 'gradientShift 10s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 5s ease-in-out infinite',
        'float-1': 'floatY 7s ease-in-out infinite',
        'float-2': 'floatY 9s ease-in-out infinite 2.5s',
        'float-3': 'floatY 8s ease-in-out infinite 5s',
        'float-4': 'floatY 6s ease-in-out infinite 1s',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.3)', opacity: '0.5' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        flowDown: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.25', transform: 'translateX(-50%) scaleY(0.7)' },
          '50%': { opacity: '0.55', transform: 'translateX(-50%) scaleY(1.3)' },
        },
        floatY: {
          '0%, 100%': { transform: 'translateY(0) translateX(-50%)' },
          '50%': { transform: 'translateY(-20px) translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
