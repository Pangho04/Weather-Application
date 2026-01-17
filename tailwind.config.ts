import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        // sans 기본 폰트 배열 맨 앞에 Pretendard를 추가합니다.
        sans: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
      },
      screens: {
        landscape: { raw: '(max-height: 500px) and (orientation: landscape)' },
      },
    },
  },
  plugins: [require('daisyui')],
} satisfies Config;
