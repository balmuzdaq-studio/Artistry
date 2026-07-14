import DirectionScene from "./DirectionScene.jsx";

const Card = ({ scene, title, description, index }) => {
    return (
        <article
            className="group flex h-full flex-col overflow-hidden rounded-card
                       border border-border bg-surface/40 backdrop-blur
                       transition-all duration-300 hover:-translate-y-1.5
                       hover:border-accent/60 hover:shadow-card"
        >
            {/* animated scene banner */}
            <div className="relative h-36 w-full overflow-hidden">
                <DirectionScene scene={scene} />
                {/* fade the scene into the card body */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent" />
                {typeof index === "number" && (
                    <span className="absolute right-3 top-3 rounded-full border border-white/20 bg-black/25 px-2 py-0.5 font-futuraLTBold text-xs text-white backdrop-blur">
                        {String(index + 1).padStart(2, "0")}
                    </span>
                )}
            </div>

            <div className="flex flex-col gap-2.5 p-6">
                <h3 className="text-content">{title}</h3>
                <p className="text-muted">{description}</p>
            </div>
        </article>
    );
};

export default Card;
