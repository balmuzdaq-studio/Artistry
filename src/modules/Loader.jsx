/**
 * Full-screen intro loader.
 * Opaque so it fully covers first paint (no FOUC/jank leaks through), and
 * animated entirely in CSS so it stays smooth even while the heavy Spline /
 * three.js bundles are parsing on the main thread.
 */
const Loader = ({ loading }) => {
    return (
        <div
            aria-hidden={!loading}
            style={{ backgroundColor: "rgb(var(--bg))" }}
            className={`fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500 ${
                loading ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
        >
            <div className="flex flex-col items-center gap-7">
                <span className="loader-wordmark font-intro text-4xl tracking-[0.15em] sm:text-5xl">
                    ARTISTRY
                </span>
                <span className="loader-bar" />
            </div>
        </div>
    );
};

export default Loader;
