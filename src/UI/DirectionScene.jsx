import { memo } from "react";

/* ------------------------------------------------------------------ *
 * Animated SVG "mini-scenes" — one per Direction card.
 * viewBox is 320 x 180 (the card banner ratio). All motion is killed
 * automatically under prefers-reduced-motion (see index.css), so each
 * scene also reads well as a static illustration.
 * ------------------------------------------------------------------ */

const Frame = ({ gradient, children }) => (
    <div className="direction-scene" style={{ background: gradient }}>
        {children}
    </div>
);

/* small helper for a gear silhouette */
const Gear = ({ cx, cy, r, teeth = 9, color, spin }) => (
    <g className="s-rot" style={{ animation: spin }}>
        {Array.from({ length: teeth }).map((_, i) => (
            <rect
                key={i}
                x={cx - 4.5}
                y={cy - r - 8}
                width={9}
                height={14}
                rx={2}
                fill={color}
                transform={`rotate(${(i * 360) / teeth} ${cx} ${cy})`}
            />
        ))}
        <circle cx={cx} cy={cy} r={r} fill={color} />
        <circle cx={cx} cy={cy} r={r * 0.42} fill="rgba(0,0,0,0.35)" />
    </g>
);

/* 1 — Biology & Medicine: pulsing heart + scrolling ECG line */
const Bio = () => (
    <Frame gradient="linear-gradient(150deg,#3a0d1e 0%,#7c1636 55%,#c62a54 100%)">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
            <g
                style={{ animation: "scene-ecg 3.2s linear infinite" }}
                stroke="#ffd7e2"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
            >
                {[0, 160, 320].map((x) => (
                    <path
                        key={x}
                        d={`M${x} 120 h34 l8 -46 l10 78 l9 -50 l7 18 h35`}
                    />
                ))}
            </g>
            <g
                className="s-rot"
                style={{
                    animation: "scene-pulse 1.4s ease-in-out infinite",
                    transformOrigin: "160px 88px",
                }}
            >
                <path
                    d="M160 118 C132 96 118 82 118 66 C118 52 129 44 141 44 C150 44 156 49 160 56 C164 49 170 44 179 44 C191 44 202 52 202 66 C202 82 188 96 160 118 Z"
                    fill="#ffe3ec"
                />
                <path
                    d="M160 118 C132 96 118 82 118 66 C118 52 129 44 141 44 C150 44 156 49 160 56 C164 49 170 44 179 44 C191 44 202 52 202 66 C202 82 188 96 160 118 Z"
                    fill="none"
                    stroke="#ff9db8"
                    strokeWidth="2"
                    opacity="0.5"
                />
            </g>
        </svg>
    </Frame>
);

/* 2 — Physics: nucleus with three orbiting electrons */
const Physics = () => (
    <Frame gradient="linear-gradient(150deg,#0c1a4a 0%,#243b8f 52%,#3f5fd6 100%)">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
            {[
                { rot: 0, dur: "6s" },
                { rot: 60, dur: "8s" },
                { rot: 120, dur: "10s" },
            ].map((o, i) => (
                <g
                    key={i}
                    className="s-rot"
                    style={{ animation: `scene-spin ${o.dur} linear infinite` }}
                    transform={`rotate(${o.rot} 160 90)`}
                >
                    <ellipse
                        cx="160"
                        cy="90"
                        rx="72"
                        ry="26"
                        fill="none"
                        stroke="#cdd9ff"
                        strokeWidth="1.5"
                        opacity="0.6"
                    />
                    <circle cx="232" cy="90" r="6" fill="#eaf1ff" />
                </g>
            ))}
            <circle cx="160" cy="90" r="13" fill="#eaf1ff" />
            <circle cx="160" cy="90" r="20" fill="#7f9dff" opacity="0.35" />
        </svg>
    </Frame>
);

/* 3 — Geography: globe with a satellite on an orbit ring */
const Geo = () => (
    <Frame gradient="linear-gradient(150deg,#052733 0%,#0e5a6b 52%,#20a3b4 100%)">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
            <g style={{ animation: "scene-bob 5s ease-in-out infinite" }}>
                <clipPath id="globeClip">
                    <circle cx="160" cy="90" r="46" />
                </clipPath>
                <circle cx="160" cy="90" r="46" fill="#0a3f4c" />
                <g
                    clipPath="url(#globeClip)"
                    stroke="#8fe4ee"
                    strokeWidth="1.4"
                    fill="none"
                    opacity="0.75"
                >
                    {[18, 34, 46].map((rx) => (
                        <ellipse key={rx} cx="160" cy="90" rx={rx} ry="46" />
                    ))}
                    <line x1="114" y1="90" x2="206" y2="90" />
                    <line x1="120" y1="66" x2="200" y2="66" />
                    <line x1="120" y1="114" x2="200" y2="114" />
                </g>
                <circle
                    cx="160"
                    cy="90"
                    r="46"
                    fill="none"
                    stroke="#d5fbff"
                    strokeWidth="1.5"
                    opacity="0.5"
                />
            </g>
            <g
                className="s-rot"
                style={{ animation: "scene-spin 9s linear infinite" }}
            >
                <ellipse
                    cx="160"
                    cy="90"
                    rx="74"
                    ry="60"
                    fill="none"
                    stroke="#bff2f8"
                    strokeWidth="1.2"
                    strokeDasharray="3 6"
                    opacity="0.55"
                />
                <circle cx="234" cy="90" r="5" fill="#eafdff" />
            </g>
        </svg>
    </Frame>
);

/* 4 — Chemistry: rotating benzene ring + rising bubbles */
const Chem = () => {
    const nodes = Array.from({ length: 6 }).map((_, i) => {
        const a = (Math.PI / 3) * i - Math.PI / 2;
        return { x: 160 + Math.cos(a) * 40, y: 90 + Math.sin(a) * 40 };
    });
    return (
        <Frame gradient="linear-gradient(150deg,#06321f 0%,#0f6b3f 52%,#20b56b 100%)">
            <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
                <g
                    className="s-rot"
                    style={{ animation: "scene-spin 22s linear infinite" }}
                >
                    <polygon
                        points={nodes.map((n) => `${n.x},${n.y}`).join(" ")}
                        fill="none"
                        stroke="#cfffe4"
                        strokeWidth="2"
                        opacity="0.7"
                    />
                    {nodes.map((n, i) => (
                        <circle
                            key={i}
                            cx={n.x}
                            cy={n.y}
                            r="7"
                            fill="#eafff3"
                        />
                    ))}
                    <circle cx="160" cy="90" r="26" fill="none" stroke="#9df3c1" strokeWidth="1.4" opacity="0.5" />
                </g>
                {[
                    { x: 70, s: 6, d: "0s", dur: "5.5s" },
                    { x: 96, s: 4, d: "1.6s", dur: "6.5s" },
                    { x: 240, s: 7, d: "0.8s", dur: "5s" },
                    { x: 262, s: 4, d: "2.4s", dur: "7s" },
                ].map((b, i) => (
                    <circle
                        key={i}
                        cx={b.x}
                        cy="150"
                        r={b.s}
                        fill="#eafff3"
                        opacity="0"
                        style={{
                            animation: `scene-bubble ${b.dur} ease-in ${b.d} infinite`,
                        }}
                    />
                ))}
            </svg>
        </Frame>
    );
};

/* 5 — Engineering: two interlocking counter-rotating gears */
const Eng = () => (
    <Frame gradient="linear-gradient(150deg,#181b22 0%,#2c3242 52%,#414a5e 100%)">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
            <Gear
                cx={132}
                cy={92}
                r={34}
                teeth={10}
                color="#f4b942"
                spin="scene-spin 14s linear infinite"
            />
            <Gear
                cx={205}
                cy={70}
                r={24}
                teeth={8}
                color="#e0e5ee"
                spin="scene-spin-rev 10s linear infinite"
            />
        </svg>
    </Frame>
);

/* 6 — Art & Design: drifting ribbon + floating shapes */
const Art = () => (
    <Frame gradient="linear-gradient(150deg,#2a0d3a 0%,#6a1f8f 52%,#c62dae 100%)">
        <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid slice">
            <defs>
                <linearGradient id="artRibbon" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ffd1f5" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff0fb" />
                    <stop offset="1" stopColor="#ffd1f5" stopOpacity="0" />
                </linearGradient>
            </defs>
            <g
                fill="none"
                stroke="url(#artRibbon)"
                strokeWidth="3"
                strokeLinecap="round"
            >
                {[70, 100, 130].map((y, i) => (
                    <path
                        key={y}
                        d={`M-40 ${y} Q 80 ${y - 40} 160 ${y} T 360 ${y}`}
                        style={{
                            animation: `scene-drift ${6 + i * 1.2}s ease-in-out ${i * 0.5}s infinite`,
                        }}
                    />
                ))}
            </g>
            <circle
                cx="60"
                cy="52"
                r="12"
                fill="#ffe08a"
                style={{ animation: "scene-bob 4s ease-in-out infinite" }}
            />
            <rect
                x="238"
                y="40"
                width="22"
                height="22"
                rx="5"
                fill="#8affd6"
                style={{ animation: "scene-bob 5.5s ease-in-out 0.6s infinite" }}
            />
            <polygon
                points="250,140 266,140 258,124"
                fill="#7fb4ff"
                style={{ animation: "scene-bob 4.8s ease-in-out 1.1s infinite" }}
            />
        </svg>
    </Frame>
);

const SCENES = {
    bio: Bio,
    physics: Physics,
    geo: Geo,
    chem: Chem,
    eng: Eng,
    art: Art,
};

const DirectionScene = ({ scene }) => {
    const Component = SCENES[scene] ?? Physics;
    return <Component />;
};

export default memo(DirectionScene);
