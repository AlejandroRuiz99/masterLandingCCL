/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Negro cálido tintado hacia el dorado (nunca #000)
        ink: {
          DEFAULT: "#0b0a07",
          900: "#0b0a07",
          800: "#121009",
          700: "#1c1810",
          600: "#2a251a",
        },
        // Marfil / papel para secciones claras (nunca #fff)
        bone: {
          DEFAULT: "#f3ede0",
          200: "#e8e0cf",
          300: "#d8cdb6",
        },
        gold: {
          DEFAULT: "#c9a84c",
          pale: "#e7cf93",
          deep: "#9a7d34",
          ink: "#5c4a1f",
        },
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: ["Geist", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.045em",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};
