import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class', // Habilita el modo oscuro por clase
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#232959',   // Colores personalizados
        secondary: '#3E4A97',
        accent: '#FF6384',
        backgroundDark: '#121212',  // Color de fondo para modo oscuro
        textDark: '#ffffff',       // Color del texto para modo oscuro
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;