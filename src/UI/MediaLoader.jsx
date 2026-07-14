/**
 * Loading placeholder for heavy media (3D scenes, videos): a soft gradient
 * glow plus a spinning accent ring — the same visual language as the hero
 * fallback. Fills its nearest positioned parent; overlay it while an asset
 * loads and unmount it when the asset is ready.
 */
const MediaLoader = ({ className = "" }) => (
    <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden ${className}`}
    >
        <div className="absolute aspect-square w-2/3 max-w-[16rem] animate-float-slow rounded-full bg-main_gradient opacity-25 blur-3xl" />
        <div className="absolute h-14 w-14 rounded-full border-2 border-accent/20" />
        <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-transparent border-t-accent" />
    </div>
);

export default MediaLoader;
