import { Suspense, lazy, useState } from "react";
import { CustomButton, MediaLoader } from "../UI/index.js";

// Lazy-load the (heavy) Spline runtime so it never blocks first paint.
const Spline = lazy(() => import("@splinetool/react-spline"));

const Home = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-grid-fade">
      <div className="shell grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-2">
        {/* copy */}
        <div className="max-w-xl">
          <p
            style={{
              backgroundColor: "rgb(var(--surface) / 0.6)",
              borderColor: "rgb(var(--border))",
            }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm text-muted backdrop-blur"
          >
            <span
              style={{ backgroundColor: "rgb(var(--accent))" }}
              className="h-2 w-2 rounded-full"
            />
            WebAR · no app required
          </p>
          <h1>
            A universal
            <br />
            WebAR <span className="text-main_gradient">creation</span>
            <br />
            platform
          </h1>
          <h5 className="mt-6 max-w-md">
            Augmented reality that runs straight from the browser — no installs.
            Interact with 3D objects, videos and animations right on your phone,
            tablet or laptop.
          </h5>

          <div className="mt-9 flex flex-wrap items-center gap-6">
            <CustomButton
              title="Quick start"
              href="#demo"
              containerStyles="h-14 px-8 text-lg"
            />
            <a
              href="#demo"
              className="group flex items-center gap-2 font-futuraLTBold text-lg text-content transition-colors hover:text-accent"
            >
              Watch demo
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 39 40"
                fill="none"
                className="transition-transform group-hover:translate-x-1"
              >
                <path
                  d="M14.0689 31.8878 26.1498 21.3913C26.5535 21.0409 26.8049 20.5153 26.8049 19.9288 26.8049 19.3423 26.5459 18.8167 26.1498 18.4663L14.0537 7.93937C13.8633 7.80988 13.6348 7.7337 13.391 7.7337 12.7283 7.7337 12.1875 8.29738 12.1875 8.99816V30.8442C12.1875 31.545 12.7283 32.1087 13.391 32.1087 13.6424 32.1087 13.8785 32.0249 14.0689 31.8878Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* 3D visual */}
        <div
          id="DNA"
          className="relative h-[340px] w-full translate-y-[16%] sm:h-[440px] lg:h-[560px]"
        >
          {!loaded && <MediaLoader />}
          <Suspense fallback={<MediaLoader />}>
            <Spline
              scene="https://prod.spline.design/N6dVUxk3qcS18Nua/scene.splinecode"
              onLoad={() => setLoaded(true)}
              className="!h-full !w-full origin-center scale-[2]"
            />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Home;
