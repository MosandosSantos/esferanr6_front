import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
   container: {
        center: true,
        padding: "15px"
      },
    screens: {
        sm: "640px",
        md: "768px",
        lg: "960px",
        xl: "1200px",
    },
    fontFamily: {
      primary: "var(--font-dmSans)",
      secondary: "var(--font-barlow)",
    },
    extend: {
     
      colors: {
        primary: "#121315",
        secondary: "#666666",
        accent: "#ffca3b",
        border: "#d7d7d7",
      },
      boxShadow: { 
        custom: "0px 4px 54px 10px rgba(18, 19, 21, 0.06)",
      },
      // ...existing code...
      backgroundImage: {
        hero: "url('/assets/img/hero/bg.jpg')",
      },
      // ...existing code...

    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
