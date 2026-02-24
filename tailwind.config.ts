const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#D4420A",
        secondary: "#F5C500",
        dark: "#3D1F0A",
        bgDark: "#1A0D05",
      },
    },
  },
  plugins: [],
};

export default config;
