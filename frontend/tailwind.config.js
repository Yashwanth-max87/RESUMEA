export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#07090f',
        panel: '#0d111c',
        panel2: '#121827',
        line: '#253044',
        mint: '#5eead4',
        coral: '#fb7185',
        amber: '#fbbf24',
      },
      boxShadow: {
        glow: '0 0 40px rgba(94, 234, 212, 0.18)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Merriweather', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};

