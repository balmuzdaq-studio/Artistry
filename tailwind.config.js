/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                // token-driven — follow the active palette (Aurora / Spectral)
                bg: "rgb(var(--bg) / <alpha-value>)",
                surface: "rgb(var(--surface) / <alpha-value>)",
                "surface-2": "rgb(var(--surface-2) / <alpha-value>)",
                border: "rgb(var(--border) / <alpha-value>)",
                accent: "rgb(var(--accent) / <alpha-value>)",
                "grad-from": "rgb(var(--grad-from) / <alpha-value>)",
                "grad-to": "rgb(var(--grad-to) / <alpha-value>)",
                content: "rgb(var(--text) / <alpha-value>)",
                muted: "rgb(var(--text-muted) / <alpha-value>)",
                // legacy aliases kept so existing markup keeps working
                main: "rgb(var(--accent) / <alpha-value>)",
                gradient_first: "rgb(var(--grad-from) / <alpha-value>)",
                gradient_secons: "rgb(var(--grad-to) / <alpha-value>)",
            },
            backgroundImage: {
                main_gradient:
                    "linear-gradient(105deg, rgb(var(--grad-from)), rgb(var(--grad-to)))",
                "grid-fade":
                    "radial-gradient(ellipse 80% 60% at 50% 0%, rgb(var(--accent) / 0.12), transparent 70%)",
            },
            fontFamily: {
                // Inter = body/UI, Bricolage Grotesque = display headings.
                sans: ["Inter", "system-ui", "sans-serif"],
                display: ["Bricolage Grotesque", "sans-serif"],
                intro: ["Intro", "sans-serif"],
                // Legacy aliases kept so existing font-futuraLT* utility classes
                // follow the new type system without touching every component.
                futuraLT: ["Inter", "system-ui", "sans-serif"],
                futuraLTBold: ["Bricolage Grotesque", "sans-serif"],
            },
            maxWidth: {
                shell: "1440px",
            },
            borderRadius: {
                card: "20px",
            },
            boxShadow: {
                "glow-green": "0 0 32px 2px var(--glow)",
                card: "0 20px 60px -30px rgba(0, 0, 0, 0.8)",
            },
            keyframes: {
                "float-slow": {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-14px)" },
                },
                shimmer: {
                    "0%": { backgroundPosition: "0% 50%" },
                    "100%": { backgroundPosition: "200% 50%" },
                },
            },
            animation: {
                "float-slow": "float-slow 6s ease-in-out infinite",
                shimmer: "shimmer 6s linear infinite",
            },
        },
    },
    future: {
        hoverOnlyWhenSupported: true,
    },
    plugins: [],
};
