import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — taken verbatim from the FaborMe Technical Design doc.
        // These are the values that encode "premium UK professional" in code.
        navy: {
          DEFAULT: '#0A1F44',
          dark: '#061530',
        },
        gold: {
          DEFAULT: '#B8902F',
          light: '#F2E6C7',
        },
        cream: '#FAF6EC',
        ink: '#1A1A1A',
        muted: '#6B6B70',
        line: '#D8D8DC',
      },
      fontFamily: {
        // Display: Cormorant Garamond — editorial, restrained luxury.
        // UI: Outfit — geometric but warm, modern professional.
        // Mono: JetBrains Mono — only used for code & numbers in dashboards.
        display: ['var(--font-display)', 'Georgia', 'serif'],
        ui: ['var(--font-ui)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'Consolas', 'monospace'],
      },
      spacing: {
        // 4pt scale from the spec.
        '1': '4px',
        '2': '8px',
        '3': '12px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        '24': '96px',
      },
      maxWidth: {
        prose: '68ch',
        copy: '52ch',
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
    },
  },
  plugins: [],
};

export default config;
