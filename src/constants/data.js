const featureDescription = {
    Quality:
        "Our high-quality models let you explore every object down to the finest detail.",
    Customization:
        "A growing library of models means you'll easily find something that fits your topic.",
    Simplicity:
        "The service is simple and user-friendly — open a link and it just works.",
    Support: "Get 24/7 support from our team whenever you need a hand.",
};

// "Directions" — the fields Artistry's WebAR content is built for.
// `scene` maps to an animated SVG scene in UI/DirectionScene.jsx.
const directions = [
    {
        scene: "bio",
        title: "Biology & Medicine",
        description:
            "Rotate a beating heart, peel back muscle layers, and study anatomy in true 3D.",
    },
    {
        scene: "physics",
        title: "Physics",
        description:
            "Visualise fields, circuits and forces as interactive objects instead of static diagrams.",
    },
    {
        scene: "geo",
        title: "Geography",
        description:
            "Explore a photoreal Earth, tectonic plates and climate systems at any scale.",
    },
    {
        scene: "chem",
        title: "Chemistry",
        description:
            "Build molecules, watch reactions unfold and inspect crystal lattices up close.",
    },
    {
        scene: "eng",
        title: "Engineering",
        description:
            "Take apart machines and devices component by component to see how they work.",
    },
    {
        scene: "art",
        title: "Art & Design",
        description:
            "Stage sculptures, products and prototypes in real space before they exist.",
    },
];

const footerLinks = [
    "Privacy Policy",
    "Terms of Use",
    "Sales Policy",
    "Legal",
    "Site Map",
];

export default {
    featureDescription,
    directions,
    footerLinks,
};
