import { data, icons } from "../constants/index.js";

const socials = [
    { icon: icons.GitHub, label: "GitHub", href: "https://github.com" },
    { icon: icons.Instagram, label: "Instagram", href: "https://instagram.com" },
    { icon: icons.LinkedIn, label: "LinkedIn", href: "https://linkedin.com" },
];

const Footer = () => {
    return (
        <footer className="mt-10 border-t border-border pt-10">
            <div className="shell pb-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <a href="#home" className="font-intro text-xl text-main_gradient">
                        ARTISTRY
                    </a>
                    <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        {data.footerLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                className="text-xs font-semibold text-muted transition-colors hover:text-content"
                            >
                                {link}
                            </a>
                        ))}
                    </nav>
                </div>

                <div className="my-8 h-px w-full bg-border" />

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 sm:items-center">
                    <p className="text-xs font-semibold text-muted text-center sm:text-left order-3 sm:order-1">
                        Copyright © 2024 Artistry Inc. All rights reserved.
                    </p>
                    <div className="flex items-center justify-center gap-3 order-2 sm:order-2">
                        <span className="text-sm font-medium text-muted">Made by</span>
                        <a href="https://balmuzdaq.studio" target="_blank" rel="noopener noreferrer" className="flex items-center">
                            <img src="/Balmuzdaq_gradient.png" alt="Balmuzdaq Studio" className="h-9 sm:h-11 object-contain opacity-90 transition-opacity hover:opacity-100" />
                        </a>
                    </div>
                    <div className="flex gap-4 justify-center sm:justify-end order-1 sm:order-3">
                        {socials.map((s) => (
                            <a
                                key={s.label}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={s.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface/50 transition-colors hover:border-accent"
                            >
                                <img src={s.icon} alt="" aria-hidden="true" className="h-5 w-5" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
