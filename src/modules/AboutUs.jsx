import { FeaturesList } from "../components/index.js";
import { images } from "../constants";

const AboutUs = () => {
    return (
        <section id="about_us" className="py-20 sm:py-28">
            <div className="shell">
                <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-center">
                    <div>
                        <p className="mb-3 font-futuraLTBold text-sm uppercase tracking-[0.2em] text-accent">
                            About
                        </p>
                        <h1>
                            What is{" "}
                            <span className="text-main_gradient">Artistry</span>
                            <br className="hidden sm:block" /> and what it does?
                        </h1>
                    </div>
                    <img
                        src={images.AR}
                        alt="Artistry augmented reality preview"
                        className="w-full max-w-sm rounded-card md:w-[40%]"
                    />
                </div>
                <FeaturesList />
            </div>
        </section>
    );
};

export default AboutUs;
