/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'sidebar': 'var(--sidebar-bg, #1e1e1e)',
        'sidebar-foreground': 'var(--sidebar-fg, #ffffff)',
        'sidebar-accent': 'var(--sidebar-accent-bg, #2d2d2d)',
        'sidebar-accent-foreground': 'var(--sidebar-accent-fg, #ffffff)',
        'sidebar-border': 'var(--sidebar-border, #333333)',
        'sidebar-primary': 'var(--sidebar-primary, #3b82f6)',
        'sidebar-primary-foreground': 'var(--sidebar-primary-fg, #ffffff)',
        'content': 'var(--content-bg, #ffffff)',
        'content-foreground': 'var(--content-fg, #000000)',
        'content-dark': 'var(--content-dark-bg, #1e1e1e)',
      }
    }
  },
  plugins: [
    require('tailwindcss-animate')
  ]
}