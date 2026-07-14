import { useState, useEffect } from "react";
import {
    Header,
    Home,
    AboutUs,
    Directions,
    Models,
    Demo,
    Footer,
    Loader,
} from "./modules/index.js";

function App() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const t = setTimeout(() => setIsLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    // Lock scrolling while the intro loader covers the screen so the reveal
    // doesn't jump.
    useEffect(() => {
        document.body.style.overflow = isLoading ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isLoading]);

    return (
        <>
            <Loader loading={isLoading} />
            <main
                aria-busy={isLoading}
                className={`transition-opacity duration-700 ${
                    isLoading ? "opacity-0" : "opacity-100"
                }`}
            >
                <Header />
                <Home />
                <AboutUs />
                <Directions />
                <Models />
                <Demo />
                <Footer />
            </main>
        </>
    );
}

export default App;
