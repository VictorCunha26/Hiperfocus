import { useMemo } from "react";
import { visualFor } from "../lib/interests.js";

// Ilustração montada no próprio aparelho: um cenário de acordo com o tema e os
// emojis do interesse. É usada enquanto a IA desenha (ou quando ela não está ligada).

function seededRandom(seed) {
  let h = 1779033703;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 3432918353);
  return () => {
    h = Math.imul(h ^ (h >>> 15), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    return ((h ^= h >>> 16) >>> 0) / 4294967296;
  };
}

const EMOJI_FONT = '"Apple Color Emoji","Segoe UI Emoji","Noto Color Emoji",sans-serif';

const BACKGROUNDS = {
  sky: ["#bfe3ff", "#f2faff"],
  prehistoric: ["#ffd9a8", "#fff4e0"],
  space: ["#1b1f5e", "#3d2c8d"],
  field: ["#bfe3ff", "#eaf7ff"],
  ocean: ["#86d6f7", "#1f6fb2"],
  tech: ["#2b2a6b", "#5b3fd0"],
  music: ["#ffe0ec", "#e8dbff"],
  warm: ["#ffe6c2", "#fff8ec"],
  road: ["#cdeaff", "#f4fbff"],
  pastel: ["#e9e3ff", "#fff0f5"],
};

function Cloud({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity="0.92">
      <ellipse cx="0" cy="0" rx="58" ry="18" />
      <ellipse cx="-18" cy="-12" rx="26" ry="20" />
      <ellipse cx="16" cy="-16" rx="30" ry="24" />
    </g>
  );
}

function Hills({ back, front }) {
  return (
    <>
      <path d="M0 340q160-70 330-30t300-10 170 10v190H0z" fill={back} />
      <path d="M0 400q200-50 420-20t380-10v130H0z" fill={front} />
    </>
  );
}

function Backdrop({ theme, rand }) {
  switch (theme) {
    case "space": {
      const stars = Array.from({ length: 70 }, (_, i) => (
        <circle key={i} cx={rand() * 800} cy={rand() * 420} r={rand() * 2.2 + 0.6} fill="#fff" opacity={rand() * 0.7 + 0.3} />
      ));
      return (
        <>
          {stars}
          <circle cx="660" cy="120" r="54" fill="#f6b26b" />
          <path d="M610 112c20 6 70 8 100-4" stroke="#e8954a" strokeWidth="8" fill="none" opacity="0.6" />
          <ellipse cx="660" cy="122" rx="96" ry="20" fill="none" stroke="#ffe0b0" strokeWidth="7" transform="rotate(-14 660 122)" />
          <circle cx="130" cy="100" r="34" fill="#e6e9f5" />
          <circle cx="120" cy="92" r="7" fill="#cdd2e6" />
          <circle cx="142" cy="112" r="5" fill="#cdd2e6" />
          <path d="M0 430q200-60 400-30t400-20v120H0z" fill="#5b4fa8" />
          <path d="M0 462q220-40 420-16t380-6v60H0z" fill="#4a3f92" />
        </>
      );
    }
    case "prehistoric":
      return (
        <>
          <circle cx="160" cy="110" r="46" fill="#ffd36b" />
          <path d="M520 360l92-190h40l92 190z" fill="#a1785c" />
          <path d="M612 170h40l-8 18h-24z" fill="#ff8a4c" />
          <g fill="#fff" opacity="0.7">
            <circle cx="636" cy="140" r="16" />
            <circle cx="656" cy="114" r="20" />
            <circle cx="684" cy="92" r="14" />
          </g>
          <Hills back="#a9d18a" front="#80b965" />
          {[90, 300, 760].map((x, i) => (
            <g key={x} transform={`translate(${x} ${i === 1 ? 390 : 410})`}>
              <path d="M0 0q-4-60 6-110" stroke="#7a5236" strokeWidth="9" fill="none" strokeLinecap="round" />
              <g fill="#4fa36b">
                <ellipse cx="-30" cy="-110" rx="40" ry="11" transform="rotate(20 -30 -110)" />
                <ellipse cx="42" cy="-112" rx="40" ry="11" transform="rotate(-20 42 -112)" />
                <ellipse cx="6" cy="-128" rx="12" ry="34" />
              </g>
            </g>
          ))}
        </>
      );
    case "field":
      return (
        <>
          <Cloud x={160} y={80} />
          <Cloud x={620} y={60} s={0.8} />
          <rect y="210" width="800" height="80" fill="#8fa9d6" />
          {Array.from({ length: 4 }, (_, i) => (
            <rect key={i} y={220 + i * 18} width="800" height="6" fill="#a9bfe6" />
          ))}
          <rect y="290" width="800" height="210" fill="#6bbf6b" />
          {Array.from({ length: 5 }, (_, i) => (
            <rect key={i} y={290 + i * 44} width="800" height="22" fill="#62b262" />
          ))}
          <g stroke="#fff" strokeWidth="5" fill="none" opacity="0.9">
            <path d="M400 290v210" />
            <ellipse cx="400" cy="400" rx="120" ry="44" />
            <path d="M690 330h110M690 330v120h110" />
          </g>
          <g stroke="#fff" strokeWidth="6" fill="none">
            <path d="M720 350v-80h80" />
          </g>
          <g stroke="#fff" strokeWidth="1.5" opacity="0.6">
            {Array.from({ length: 6 }, (_, i) => (
              <path key={i} d={`M${726 + i * 13} 276v74`} />
            ))}
          </g>
        </>
      );
    case "ocean": {
      const bubbles = Array.from({ length: 18 }, (_, i) => (
        <circle key={i} cx={rand() * 800} cy={rand() * 360 + 40} r={rand() * 9 + 3} fill="none" stroke="#fff" strokeWidth="2" opacity="0.6" />
      ));
      return (
        <>
          <g fill="#fff" opacity="0.08">
            <path d="M120 0h80L60 500H0z" />
            <path d="M420 0h60L380 500h-90z" />
            <path d="M650 0h70L700 500h-80z" />
          </g>
          {bubbles}
          <path d="M0 440q200-40 400-10t400-10v80H0z" fill="#f2d9a0" />
          {[60, 150, 690, 740].map((x, i) => (
            <path
              key={x}
              d={`M${x} 450q-16-40 0-80t0-80`}
              stroke={i % 2 ? "#2f8f68" : "#3fa37a"}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </>
      );
    }
    case "tech":
      return (
        <>
          <g stroke="#8c7cff" strokeWidth="2" opacity="0.35">
            {Array.from({ length: 9 }, (_, i) => (
              <path key={`h${i}`} d={`M0 ${300 + i * i * 3 + i * 14}H800`} />
            ))}
            {Array.from({ length: 17 }, (_, i) => (
              <path key={`v${i}`} d={`M400 300L${-400 + i * 100} 500`} />
            ))}
          </g>
          <circle cx="400" cy="300" r="170" fill="#7c6bff" opacity="0.18" />
          {Array.from({ length: 14 }, (_, i) => (
            <rect key={i} x={rand() * 760} y={rand() * 240 + 20} width="14" height="14" rx="3" fill={["#ffd36b", "#5de0c6", "#ff8ac7"][i % 3]} opacity="0.75" />
          ))}
        </>
      );
    case "music":
      return (
        <>
          {Array.from({ length: 5 }, (_, i) => (
            <path key={i} d={`M0 ${120 + i * 16}q200-50 400 0t400 0`} stroke="#b79cf2" strokeWidth="2.5" fill="none" opacity="0.6" />
          ))}
          {[
            [120, 130],
            [290, 100],
            [600, 150],
            [700, 110],
          ].map(([x, y]) => (
            <g key={x} fill="#8b6fe8" opacity="0.8">
              <ellipse cx={x} cy={y} rx="12" ry="9" transform={`rotate(-20 ${x} ${y})`} />
              <rect x={x + 9} y={y - 50} width="4" height="50" />
            </g>
          ))}
          <Hills back="#f5c6dc" front="#e9b5f0" />
        </>
      );
    case "warm":
      return (
        <>
          <circle cx="640" cy="110" r="50" fill="#ffd36b" />
          <Cloud x={200} y={90} s={0.9} />
          <Hills back="#f5d39b" front="#eebb73" />
        </>
      );
    case "road":
      return (
        <>
          <circle cx="650" cy="100" r="42" fill="#ffd96b" />
          <Cloud x={180} y={80} />
          <Hills back="#a8ddb5" front="#7cc59a" />
          <path d="M330 500l50-180h40l50 180z" fill="#7d8597" />
          <path d="M400 330v20M400 370v30M400 420v40M400 475v25" stroke="#fff" strokeWidth="6" />
        </>
      );
    case "pastel": {
      const colors = ["#ffd36b", "#8bd6a8", "#8fb0ff", "#ff9fc4", "#b79cf2"];
      return (
        <>
          {Array.from({ length: 26 }, (_, i) => {
            const x = rand() * 800;
            const y = rand() * 460;
            const c = colors[i % colors.length];
            return i % 2 ? (
              <circle key={i} cx={x} cy={y} r={rand() * 8 + 4} fill={c} opacity="0.7" />
            ) : (
              <rect key={i} x={x} y={y} width="14" height="14" rx="3" fill={c} opacity="0.7" transform={`rotate(${rand() * 90} ${x} ${y})`} />
            );
          })}
          <path d="M0 420q200-50 400-20t400-10v110H0z" fill="#d9ccff" />
        </>
      );
    }
    default:
      return (
        <>
          <circle cx="660" cy="100" r="46" fill="#ffd96b" />
          <Cloud x={170} y={90} />
          <Cloud x={480} y={60} s={0.7} />
          <Hills back="#a8ddb5" front="#7cc59a" />
          {Array.from({ length: 10 }, (_, i) => (
            <circle key={i} cx={rand() * 800} cy={430 + rand() * 60} r="5" fill={["#ff9fc4", "#ffd36b", "#fff"][i % 3]} />
          ))}
        </>
      );
  }
}

export default function Scene({ interest, seed = "", label, className = "" }) {
  const content = useMemo(() => {
    const { scene, extras } = visualFor(interest);
    const rand = seededRandom(`${interest?.id}-${seed}`);
    const [top, bottom] = BACKGROUNDS[scene] || BACKGROUNDS.sky;
    const flip = rand() > 0.5;
    const mainX = flip ? 360 : 440;
    const id = `bg-${scene}-${String(seed).replace(/[^a-z0-9]/gi, "")}`;
    return (
      <>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={top} />
            <stop offset="1" stopColor={bottom} />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill={`url(#${id})`} />
        <Backdrop theme={scene} rand={rand} />
        <ellipse cx={mainX} cy="440" rx="130" ry="18" fill="#000" opacity="0.12" />
        <g fontFamily={EMOJI_FONT} textAnchor="middle" dominantBaseline="central">
          <text x={flip ? 640 : 160} y="370" fontSize="92">
            {extras[0]}
          </text>
          <text x={flip ? 130 : 670} y="390" fontSize="70">
            {extras[1]}
          </text>
          <text x={flip ? 560 : 240} y="170" fontSize="58">
            {extras[2]}
          </text>
          <text x={mainX} y="320" fontSize="210">
            {interest?.emoji || "⭐"}
          </text>
        </g>
      </>
    );
  }, [interest?.id, interest?.name, interest?.emoji, seed]);

  return (
    <svg
      viewBox="0 0 800 500"
      preserveAspectRatio="xMidYMid slice"
      className={`scene ${className}`}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      {content}
    </svg>
  );
}
