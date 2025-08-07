/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Enable class-based dark mode

    content: [
        './app/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            fontFamily: {
                orbitron: ['var(--font-orbitron)', 'sans-serif'],
            },
            colors: {
                neon: '#a855f7',
                darkBg: '#0a0a23',
            },
            boxShadow: {
                glow: '0 0 10px #a855f7',
            },
        },
    },
    plugins: [],
}
