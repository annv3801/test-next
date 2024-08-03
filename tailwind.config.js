/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        screens: {
          sm: '100%',  // or your preferred width
          md: '100%',  // or your preferred width
          lg: '1024px', // or your preferred width
          xl: '1280px', // setting the max-width for xl
          '2xl': '1280px', // setting the same max-width for 2xl
        },
      },
    },
  },
  plugins: [],
};
