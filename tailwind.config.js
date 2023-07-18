/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      "grid-auto-fit": (value) => ({
        gridTemplateColumns: `repeat(auto-fit, minmax(${value}, 1fr))`,
      }),
    },
  },
  plugins: [],
};
