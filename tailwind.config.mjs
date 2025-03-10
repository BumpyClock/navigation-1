// tailwind.config.mjs
export default {
    darkMode: 'class',
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
      './src/components/**/*.{js,ts,jsx,tsx,mdx}',
      './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
      extend: {
        // Using textColor and backgroundColor with CSS variables
        
      },
    },
    plugins: [require('tailwindcss-animate')],
  }