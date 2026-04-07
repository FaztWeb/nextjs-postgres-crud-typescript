/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        parchment: {
          50: "#fefcf9",
          100: "#faf6f0",
          200: "#f5ede0",
          300: "#ebe0cc",
          400: "#d4c9b0",
          500: "#b8a98a",
        },
        ink: {
          DEFAULT: "#3c3632",
          light: "#6b5f56",
          muted: "#9c8f84",
          faint: "#c4b8ad",
        },
        night: {
          DEFAULT: "#1a1614",
          surface: "#231f1c",
          card: "#2a2522",
          border: "#3d3632",
          muted: "#78706a",
          text: "#e8e0d8",
          faint: "#524b45",
        },
      },
      boxShadow: {
        card: "0 1px 4px 0 rgba(160, 140, 110, 0.12), 0 1px 2px -1px rgba(160, 140, 110, 0.08)",
        "card-hover":
          "0 6px 16px 0 rgba(160, 140, 110, 0.16), 0 2px 6px -2px rgba(160, 140, 110, 0.1)",
        form: "0 2px 8px 0 rgba(160, 140, 110, 0.1)",
        "card-dark": "0 1px 4px 0 rgba(0, 0, 0, 0.3), 0 1px 2px -1px rgba(0, 0, 0, 0.2)",
        "card-dark-hover":
          "0 6px 16px 0 rgba(0, 0, 0, 0.4), 0 2px 6px -2px rgba(0, 0, 0, 0.25)",
        "form-dark": "0 2px 8px 0 rgba(0, 0, 0, 0.3)",
      },
      borderRadius: {
        notebook: "14px",
      },
    },
  },
  plugins: [],
};
