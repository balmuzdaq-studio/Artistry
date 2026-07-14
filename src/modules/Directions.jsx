import { useGSAP } from "@gsap/react";
import { animateWithGsap } from "../hooks/animations.js";
import { CardTable } from "../components/index.js";

const Directions = () => {
    useGSAP(() => {
        animateWithGsap("#directions .section-heading", {
            y: 0,
            opacity: 1,
        });
    }, []);

    return (
        <section id="directions" className="py-20 sm:py-28">
            <div className="shell">
                <div className="mb-12 max-w-2xl">
                    <p className="mb-3 font-futuraLTBold text-sm uppercase tracking-[0.2em] text-accent">
                        Use cases
                    </p>
                    <h2 className="section-heading">
                        <span className="text-main_gradient">Directions</span>
                    </h2>
                    <h5 className="mt-4">
                        One platform, many classrooms. Artistry brings hard-to-picture
                        ideas into real space across every field.
                    </h5>
                </div>
                <CardTable />
            </div>
        </section>
    );
};

export default Directions;
