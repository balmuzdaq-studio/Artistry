import { useGSAP } from "@gsap/react";
import { VideoCarousel } from "../components/index.js";
import { animateWithGsap } from "../hooks/animations.js";

const Models = () => {
    useGSAP(() => {
        animateWithGsap("#models .section-heading", {
            y: 0,
            opacity: 1,
        });
    }, []);

    return (
        <section id="models" className="py-20 sm:py-28">
            <div className="shell">
                <div className="mb-12 max-w-2xl">
                    <p className="mb-3 font-futuraLTBold text-sm uppercase tracking-[0.2em] text-accent">
                        Library
                    </p>
                    <h2 className="section-heading">
                        <span className="text-main_gradient">Models</span>
                    </h2>
                    <h5 className="mt-4">
                        A taste of what already lives in the Artistry library —
                        press play and swipe through.
                    </h5>
                </div>
            </div>
            <VideoCarousel />
        </section>
    );
};

export default Models;
