const Feature = ({ icon, title, description }) => {
    return (
        <div
            className="group flex aspect-square flex-col items-center justify-center text-center gap-4 rounded-card
                       border border-border bg-surface/40 p-6 backdrop-blur
                       transition-all duration-300 hover:-translate-y-1.5
                       hover:border-accent/60 hover:bg-surface"
        >
            <span
                className="flex h-20 w-20 items-center justify-center rounded-2xl
                           border border-border bg-surface-2 transition-colors
                           group-hover:border-accent/50"
            >
                <img src={icon} alt="" aria-hidden="true" className="h-10 w-10" />
            </span>
            <h3 className="text-content">{title}</h3>
            <p className="max-w-[24ch] text-sm text-muted sm:text-base">
                {description}
            </p>
        </div>
    );
};

export default Feature;
