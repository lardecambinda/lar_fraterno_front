/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },

      textColor: {
        "light-black": "var(--black)",
        background: "var(--background)",
        accent: "var(--secondary)",
        violet: "var(--violet)",
      },
      borderColor: {
        "light-black": "var(--black)",
      },
      backgroundColor: {
        violet: "var(--violet)",
        accent: "var(--secondary)",
        "light-black": "var(--black)",
      },
    },
  },
  plugins: [],
};
