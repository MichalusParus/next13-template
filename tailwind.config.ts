import type { Config } from 'tailwindcss';

// prettier-ignore
const config: Config = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      height:{
        'headerHeight':'4.25rem'
      },
      maxWidth: {'contentSize':'1400px'},
      colors: {
        'text':'#141414',
        'title':'#141414',
        'bg':'#C1C1C1',
        'primary': {
          'text':'#EBEBEB',
          'textHover':'#EBEBEB',
          'textActive':'#C2C2C2',
          'bg':'#4C2F47',
          'bgHover':'#331F2F',
          'bgActive':'#4C2F47',
          'border':'#000000',
        },
        'secondary': {
          'text':'#141414',
          'textHover':'#141414',
          'textActive':'#3D3D3D',
          'bg':'#C1C1C1',
          'bgHover':'#B8B8B8',
          'bgActive':'#C1C1C1',
          'border':'#000000',
        }
      },
      spacing: {
        'sm':'0.375rem 0.75rem',
        'md':'0.5rem 1rem',
        'lg':'0.625rem 1.25rem',
        'smIcon':'375rem',
        'mdIcon':'0.5rem',
        'lgicon':'0.625rem',
        'headerHeight':'4.25rem'
      }
    },
  },
  plugins: [],
};
export default config;
