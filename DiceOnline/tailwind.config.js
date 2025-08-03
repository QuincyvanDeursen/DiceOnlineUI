/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flyonui/dist/**/*.js"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require('flyonui')
  ],
  flyonui: {
    themes: [
      {
        maintheme: {
          "color-scheme": "light",
          "primary": "oklch(78% 0.20 240)",        // lichtblauw neon
          "primary-content": "oklch(98% 0.01 240)",
          "secondary": "oklch(75% 0.22 140)",      // neon groen
          "secondary-content": "oklch(98% 0.01 140)",
          "accent": "oklch(76% 0.24 280)",         // neon paars
          "accent-content": "oklch(98% 0.01 280)",
          "neutral": "oklch(22% 0.06 240)",
          "neutral-content": "oklch(92% 0.02 240)",
          "base-100": "oklch(96% 0.03 240)",       // lichte achtergrond
          "base-200": "oklch(88% 0.06 240)",
          "base-300": "oklch(78% 0.10 240)",
          "base-content": "oklch(18% 0.04 240)",   // donkere tekst
          "info": "oklch(76% 0.23 200)",           // neon cyaan
          "info-content": "oklch(98% 0.01 200)",
          "success": "oklch(78% 0.24 150)",        // neon lime
          "success-content": "oklch(98% 0.01 150)",
          "warning": "oklch(82% 0.26 85)",         // neon geel
          "warning-content": "oklch(22% 0.04 85)",
          "error": "oklch(76% 0.25 15)",           // neon rood
          "error-content": "oklch(98% 0.01 15)",
          "--rounded-btn": "1rem",
          "--rounded-box": "0.5rem",
          "--rounded-badge": "1.9rem"
        }
      }
    ]
  }
}