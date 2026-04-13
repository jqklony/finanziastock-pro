import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#003366", light: "#0078B4", dark: "#001a33" },
        accent: "#e63946",
        success: "#2a9d8f",
        warning: "#e9c46a",
      },
    },
  },
  plugins: [],
} satisfies Config;
