// Logo e ilustrações fixas do app, todas em SVG para ficarem nítidas em qualquer tela.

export function LogoMark({ size = 48 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true" className="logo-mark">
      <g stroke="var(--logo-gap)" strokeWidth="2.5">
        <circle cx="36" cy="22" r="12" fill="#4a7cf0" />
        <circle cx="22" cy="27" r="12" fill="#8b6fe8" />
        <circle cx="40" cy="39" r="10" fill="#f6c744" />
        <circle cx="25" cy="42" r="11" fill="#5dbb7d" />
      </g>
      <g stroke="#4a7cf0" strokeWidth="2.5" strokeLinecap="round">
        <path d="M51 13l3-4" />
        <path d="M53 19l5-1" />
        <path d="M47 9V5" />
      </g>
    </svg>
  );
}

export function Logo({ size = 40, className = "" }) {
  return (
    <span className={`logo ${className}`}>
      <LogoMark size={size} />
      <span className="logo-word" style={{ fontSize: size * 0.62 }}>
        Hiperfocus
      </span>
    </span>
  );
}

export function Waves({ className = "" }) {
  return (
    <svg className={`waves ${className}`} viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 70C70 30 130 120 220 104c70-12 120-62 180-40v96H0z" fill="var(--wave-blue)" />
      <path d="M170 160c40-64 130-86 230-118v118z" fill="var(--wave-green)" />
      <path d="M240 160c40-36 100-46 160-56v56z" fill="var(--wave-yellow)" />
    </svg>
  );
}

function Pine({ x, y, s = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-3" y="0" width="6" height="14" fill="#6b4a2e" />
      <path d="M0-44L-16-14h32z M0-30L-20 4h40z" fill="#3f8e6a" />
    </g>
  );
}

// Criança exploradora olhando as montanhas (cartão de boas-vindas da tela inicial).
export function HeroArt() {
  return (
    <svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="hero-art">
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ed0f4" />
          <stop offset="1" stopColor="#fdeccc" />
        </linearGradient>
      </defs>
      <rect width="400" height="260" fill="url(#hero-sky)" />
      <circle cx="300" cy="72" r="44" fill="#fff3c4" opacity="0.5" />
      <circle cx="300" cy="72" r="26" fill="#ffd96b" />
      <g fill="#fff" opacity="0.9">
        <ellipse cx="80" cy="50" rx="34" ry="11" />
        <ellipse cx="100" cy="42" rx="20" ry="12" />
        <ellipse cx="220" cy="34" rx="26" ry="8" />
      </g>
      <path d="M0 172L58 98l46 46 66-78 60 70 52-48 62 64 56-36v144H0z" fill="#a9c3e8" />
      <path d="M170 66l-14 17 9-2 6 6 6-6 6 1z M58 98l-10 13 7-1 4 4 5-4 5 0z" fill="#fff" />
      <path d="M0 202l70-60 56 48 74-62 70 60 58-40 72 44v68H0z" fill="#86a8da" />
      <path d="M0 214q100-36 200-10t200-6v62H0z" fill="#86c99f" />
      <Pine x={300} y={200} s={1.1} />
      <Pine x={330} y={206} s={0.8} />
      <Pine x={360} y={198} s={1.2} />
      <Pine x={30} y={212} s={0.9} />
      <path d="M0 238q120-30 240-8t160-4v34H0z" fill="#5fae80" />
      {/* criança de costas, com mochila */}
      <g transform="translate(148 0)">
        <ellipse cx="0" cy="240" rx="30" ry="5" fill="#000" opacity="0.12" />
        <rect x="-15" y="196" width="12" height="42" rx="6" fill="#24396b" />
        <rect x="3" y="196" width="12" height="42" rx="6" fill="#24396b" />
        <ellipse cx="-9" cy="238" rx="9" ry="5" fill="#3a2a22" />
        <ellipse cx="9" cy="238" rx="9" ry="5" fill="#3a2a22" />
        <rect x="-31" y="144" width="12" height="44" rx="6" fill="#ee8f42" />
        <rect x="19" y="144" width="12" height="44" rx="6" fill="#ee8f42" />
        <rect x="-24" y="136" width="48" height="66" rx="16" fill="#f59e4c" />
        <rect x="-19" y="142" width="38" height="50" rx="10" fill="#2f5d8c" />
        <rect x="-13" y="166" width="26" height="20" rx="6" fill="#3e73a8" />
        <path d="M-12 142v-6M12 142v-6" stroke="#24456b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-22" cy="122" r="5" fill="#e8ad84" />
        <circle cx="22" cy="122" r="5" fill="#e8ad84" />
        <circle cx="0" cy="118" r="22" fill="#3b2a20" />
        <path d="M-20 108q20-22 40 0" fill="#4a3528" />
      </g>
    </svg>
  );
}

// Pessoa lendo um livro (tela "Adicionar interesse").
export function ReadingArt({ size = 150 }) {
  return (
    <svg width={size} height={size * 0.9} viewBox="0 0 200 180" aria-hidden="true" className="reading-art">
      <circle cx="100" cy="98" r="72" fill="var(--accent-soft)" />
      <g fill="#f6c744">
        <path d="M34 50l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" />
        <path d="M168 66l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
      </g>
      <circle cx="160" cy="40" r="4" fill="#8b6fe8" />
      <path d="M48 170c0-44 22-74 52-74s52 30 52 74z" fill="#2fa39a" />
      <circle cx="100" cy="66" r="24" fill="#e8b48f" />
      <path d="M76 66c0-18 10-28 24-28s24 10 24 28c-6-10-14-14-24-14s-18 4-24 14z" fill="#2b2b3a" />
      <circle cx="100" cy="34" r="11" fill="#2b2b3a" />
      <path d="M90 70q3 3 6 0M104 70q3 3 6 0" stroke="#5a3b2a" strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <path d="M95 80q5 4 10 0" stroke="#c97c5d" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M58 118q22-8 42 4v40q-20-12-42-4z" fill="#3b6fe0" />
      <path d="M142 118q-22-8-42 4v40q20-12 42-4z" fill="#5b8cf0" />
      <path d="M100 122v40" stroke="#2a55b8" strokeWidth="2" />
      <path d="M68 128q12-3 24 2M68 138q12-3 24 2M108 130q12-5 24-2M108 140q12-5 24-2" stroke="#cfe0ff" strokeWidth="2" strokeLinecap="round" />
      <circle cx="58" cy="140" r="7" fill="#e8b48f" />
      <circle cx="142" cy="140" r="7" fill="#e8b48f" />
    </svg>
  );
}

// Livro aberto com brilho (tela de carregamento).
export function BookGlow() {
  return (
    <svg viewBox="0 0 160 160" className="book-glow" aria-hidden="true">
      <defs>
        <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0.45" stopColor="#4a7cf0" stopOpacity="0.45" />
          <stop offset="1" stopColor="#4a7cf0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="80" cy="80" r="78" fill="url(#glow)" />
      <circle cx="80" cy="80" r="50" fill="#1b3466" stroke="#2f5395" strokeWidth="2" />
      <path d="M46 62q16-7 32 2v42q-16-9-32-2z" fill="#79a6ff" />
      <path d="M114 62q-16-7-32 2v42q16-9 32-2z" fill="#a9c6ff" />
      <path d="M80 64v42" stroke="#4a7cf0" strokeWidth="2" />
      <path d="M53 74q10-3 19 1M53 84q10-3 19 1M88 75q10-4 19-1M88 85q10-4 19-1" stroke="#dce8ff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}
