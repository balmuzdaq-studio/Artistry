import { useState, useEffect } from "react";
import { CustomButton } from "../UI/index.js";

const NAV = [
    { title: "Home", link: "#home" },
    { title: "About us", link: "#about_us" },
    { title: "Directions", link: "#directions" },
    { title: "Models", link: "#models" },
    { title: "Demo", link: "#demo" },
];

const NavLink = ({ link, title, onClick }) => (
    <a
        href={link}
        onClick={onClick}
        className="relative font-futuraLTBold text-[15px] text-content/75 transition-colors
                   hover:text-content after:absolute after:-bottom-1.5 after:left-0 after:h-0.5
                   after:w-0 after:rounded-full after:bg-main_gradient after:transition-all
                   after:duration-300 hover:after:w-full"
    >
        {title}
    </a>
);

const Logo = ({ onClick }) => (
    <a href="#home" onClick={onClick} className="flex items-center gap-3.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-main_gradient font-display text-lg font-extrabold leading-none text-bg shadow-glow-green">
            A
        </span>
        <span className="font-intro text-2xl leading-none tracking-wide text-content">
            ARTISTRY
        </span>
    </a>
);

const Header = () => {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            id="home"
            className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
                scrolled
                    ? "border-b border-border bg-bg/80 backdrop-blur-xl"
                    : "border-b border-transparent"
            }`}
        >
            <nav className="shell flex h-[76px] items-center justify-between">
                <Logo />

                {/* desktop nav */}
                <div className="hidden items-center gap-9 lg:flex">
                    {NAV.map((item) => (
                        <NavLink key={item.title} {...item} />
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <CustomButton
                        title="Library"
                        href="#models"
                        containerStyles="hidden sm:inline-flex h-10 px-5 text-sm"
                    />
                    {/* mobile menu toggle */}
                    <button
                        type="button"
                        aria-label="Toggle menu"
                        aria-expanded={open}
                        onClick={() => setOpen((v) => !v)}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface/60 lg:hidden"
                    >
                        <span className="relative block h-4 w-5">
                            <span
                                className={`absolute left-0 h-0.5 w-5 bg-content transition-all ${
                                    open ? "top-1.5 rotate-45" : "top-0"
                                }`}
                            />
                            <span
                                className={`absolute left-0 top-1.5 h-0.5 w-5 bg-content transition-all ${
                                    open ? "opacity-0" : "opacity-100"
                                }`}
                            />
                            <span
                                className={`absolute left-0 h-0.5 w-5 bg-content transition-all ${
                                    open ? "top-1.5 -rotate-45" : "top-3"
                                }`}
                            />
                        </span>
                    </button>
                </div>
            </nav>

            {/* mobile menu */}
            {open && (
                <div className="border-t border-border bg-bg/95 backdrop-blur-xl lg:hidden">
                    <div className="shell flex flex-col gap-5 py-6">
                        {NAV.map((item) => (
                            <NavLink
                                key={item.title}
                                {...item}
                                onClick={() => setOpen(false)}
                            />
                        ))}
                        <CustomButton
                            title="Library"
                            href="#models"
                            handlePress={() => setOpen(false)}
                            containerStyles="h-11 px-5 text-sm w-fit"
                        />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
