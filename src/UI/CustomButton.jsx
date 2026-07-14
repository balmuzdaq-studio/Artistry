const base =
    "inline-flex flex-row justify-center items-center rounded-xl font-futuraLTBold font-bold " +
    "transition-all duration-300 focus:outline-none focus-visible:ring-2 " +
    "focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
    "disabled:opacity-50 disabled:pointer-events-none select-none";

const variants = {
    primary:
        "bg-main_gradient text-bg hover:shadow-glow-green hover:-translate-y-0.5 active:translate-y-0",
    ghost:
        "bg-surface/60 text-content border border-border backdrop-blur " +
        "hover:border-accent hover:text-accent",
};

const CustomButton = ({
    title,
    children,
    handlePress,
    onClick,
    href,
    variant = "primary",
    type = "button",
    containerStyles = "",
    textStyles = "",
    ...rest
}) => {
    const cls = `${base} ${variants[variant] ?? variants.primary} ${containerStyles}`;
    const label = (
        <span className={textStyles}>{children ?? title}</span>
    );
    const press = onClick ?? handlePress;

    if (href) {
        return (
            <a href={href} className={cls} {...rest}>
                {label}
            </a>
        );
    }

    return (
        <button type={type} onClick={press} className={cls} {...rest}>
            {label}
        </button>
    );
};

export default CustomButton;
