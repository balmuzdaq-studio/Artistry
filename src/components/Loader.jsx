import { Html } from "@react-three/drei";

// 3D-scene loading placeholder — a gradient glow + spinning accent ring,
// rendered at the model's position while the .glb streams in.
const Loader = () => {
    return (
        <Html center>
            <div className="relative flex h-28 w-28 items-center justify-center">
                <div className="absolute h-28 w-28 rounded-full bg-main_gradient opacity-25 blur-2xl" />
                <div className="absolute h-14 w-14 rounded-full border-2 border-accent/20" />
                <div className="absolute h-14 w-14 animate-spin rounded-full border-2 border-transparent border-t-accent" />
            </div>
        </Html>
    );
};

export default Loader;
