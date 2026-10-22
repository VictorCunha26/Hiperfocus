// Catálogo de interesses sugeridos. "scene" escolhe o cenário da ilustração
// montada no aparelho e "extras" são os elementos que aparecem junto.
export const CATALOG = [
  { id: "dinossauros", name: "Dinossauros", emoji: "🦖", scene: "prehistoric", extras: ["🦕", "🌋", "🥚"] },
  { id: "espaco", name: "Espaço", emoji: "🪐", scene: "space", extras: ["🚀", "⭐", "🌙"] },
  { id: "futebol", name: "Futebol", emoji: "⚽", scene: "field", extras: ["🥅", "🏆", "👟"] },
  { id: "jogos", name: "Jogos", emoji: "🎮", scene: "tech", extras: ["👾", "🕹️", "⭐"] },
  { id: "musica", name: "Música", emoji: "🎵", scene: "music", extras: ["🎸", "🥁", "🎹"] },
  { id: "tecnologia", name: "Tecnologia", emoji: "💻", scene: "tech", extras: ["📡", "💡", "🔌"] },
  { id: "natureza", name: "Natureza", emoji: "🌿", scene: "sky", extras: ["🌻", "🦋", "🌳"] },
  { id: "robos", name: "Robôs", emoji: "🤖", scene: "tech", extras: ["⚙️", "🔋", "🛰️"] },
  { id: "avioes", name: "Aviões", emoji: "✈️", scene: "sky", extras: ["☁️", "🛫", "🧭"] },
  { id: "historia", name: "História", emoji: "🏛️", scene: "warm", extras: ["📜", "👑", "🗺️"] },
  { id: "culinaria", name: "Culinária", emoji: "🍳", scene: "warm", extras: ["🧁", "🥕", "🍓"] },
  { id: "ciencia", name: "Ciência", emoji: "🔬", scene: "tech", extras: ["🧪", "🧬", "💡"] },
  { id: "desenhos", name: "Desenhos", emoji: "🎨", scene: "pastel", extras: ["✏️", "🖍️", "⭐"] },
  { id: "animais", name: "Animais", emoji: "🐶", scene: "sky", extras: ["🐱", "🐾", "🦜"] },
  { id: "oceano", name: "Oceano", emoji: "🐳", scene: "ocean", extras: ["🐠", "🐙", "🐚"] },
  { id: "carros", name: "Carros", emoji: "🚗", scene: "road", extras: ["🏁", "🚦", "⛽"] },
  { id: "trens", name: "Trens", emoji: "🚂", scene: "sky", extras: ["🛤️", "🚉", "☁️"] },
  { id: "mapas", name: "Mapas e países", emoji: "🗺️", scene: "sky", extras: ["🧭", "🌍", "🚩"] },
  { id: "insetos", name: "Insetos", emoji: "🐞", scene: "sky", extras: ["🐝", "🦋", "🌼"] },
  { id: "super-herois", name: "Super-heróis", emoji: "🦸", scene: "space", extras: ["⚡", "🛡️", "💥"] },
  { id: "matematica", name: "Matemática", emoji: "🔢", scene: "pastel", extras: ["📐", "🧮", "➗"] },
];

// Os sete primeiros aparecem na lista inicial de "Meus interesses".
export const STARTER_IDS = ["dinossauros", "espaco", "futebol", "jogos", "musica", "tecnologia", "natureza"];

const KEYWORDS = [
  [/gat/, "🐱", "sky"], [/cachorr|\bc[aã]o\b|\bc[aã]es\b/, "🐶", "sky"], [/cavalo/, "🐴", "sky"],
  [/lego|bloco/, "🧱", "pastel"], [/pok[eé]mon/, "⚡", "sky"], [/minecraft/, "⛏️", "tech"],
  [/tre[mn]|metr[oô]/, "🚂", "sky"], [/[oô]nibus/, "🚌", "road"], [/bandeira/, "🚩", "sky"],
  [/planeta|estrela|gal[aá]xia|astronaut|foguete|lua\b/, "🚀", "space"], [/vulc[aã]o/, "🌋", "prehistoric"],
  [/chuva|clima|tempo|nuvem|tempestade/, "⛅", "sky"], [/arte|pintura/, "🎨", "pastel"],
  [/livro|leitura|hist[oó]ria em quadrinhos|gibi/, "📚", "pastel"], [/n[uú]mero|conta/, "🔢", "pastel"],
  [/rel[oó]gio|hora/, "⏰", "pastel"], [/piano|teclado/, "🎹", "music"], [/viol[aã]o|guitarra/, "🎸", "music"],
  [/bateria|tambor/, "🥁", "music"], [/dan[cç]a/, "💃", "music"], [/basquete/, "🏀", "field"],
  [/v[oô]lei/, "🏐", "field"], [/t[eê]nis/, "🎾", "field"], [/nata[cç][aã]o|nadar/, "🏊", "ocean"],
  [/bicicleta|bike/, "🚲", "road"], [/castelo|princesa|pr[ií]ncipe/, "🏰", "warm"], [/egit|pir[aâ]mide/, "🏺", "warm"],
  [/pirata/, "🏴‍☠️", "ocean"], [/sereia/, "🧜", "ocean"], [/unic[oó]rnio/, "🦄", "pastel"], [/drag[aã]o/, "🐉", "prehistoric"],
  [/tubar[aã]o/, "🦈", "ocean"], [/baleia/, "🐳", "ocean"], [/peix/, "🐟", "ocean"], [/p[aá]ssaro|ave\b|aves/, "🐦", "sky"],
  [/borboleta/, "🦋", "sky"], [/abelha/, "🐝", "sky"], [/formiga/, "🐜", "sky"], [/flor/, "🌸", "sky"],
  [/[aá]rvore|floresta/, "🌳", "sky"], [/mar\b|praia|onda/, "🌊", "ocean"], [/montanha/, "⛰️", "sky"],
  [/neve|gelo|pinguim/, "❄️", "sky"], [/chocolate|doce/, "🍫", "warm"], [/bolo/, "🎂", "warm"], [/pizza/, "🍕", "warm"],
  [/fruta/, "🍎", "warm"], [/caminh[aã]o/, "🚚", "road"], [/moto/, "🏍️", "road"], [/barco|navio/, "🚢", "ocean"],
  [/helic[oó]ptero/, "🚁", "sky"], [/avi[aã]o|avi[oõ]es/, "✈️", "sky"], [/rob[oô]/, "🤖", "tech"],
  [/computador|programa/, "💻", "tech"], [/celular/, "📱", "tech"], [/internet/, "🌐", "tech"],
  [/qu[ií]mica|experi[eê]ncia/, "🧪", "tech"], [/f[ií]sica|[aá]tomo/, "⚛️", "tech"], [/medicina|m[eé]dic/, "🩺", "pastel"],
  [/esporte/, "🏅", "field"], [/anime|mang[aá]/, "🌸", "pastel"], [/desenho animado|tv\b|s[eé]rie/, "📺", "pastel"],
  [/filme|cinema/, "🎬", "pastel"], [/geografia|pa[ií]s/, "🌍", "sky"], [/elevador|escada rolante/, "🏢", "pastel"],
  [/carro/, "🚗", "road"], [/m[uú]sica/, "🎵", "music"], [/jogo|game/, "🎮", "tech"], [/dinoss/, "🦖", "prehistoric"],
];

export function slugify(text) {
  return String(text)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function findInCatalog(idOrName) {
  const slug = slugify(idOrName);
  return CATALOG.find((item) => item.id === slug || slugify(item.name) === slug) || null;
}

export function guessVisual(name) {
  const lower = String(name).toLowerCase();
  // Também testa sem acentos e no singular ("tubarões" → "tubarao").
  const plain = lower
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[oa]es\b/g, "ao");
  for (const [pattern, emoji, scene] of KEYWORDS) {
    if (pattern.test(lower) || pattern.test(plain)) return { emoji, scene };
  }
  return { emoji: "⭐", scene: "pastel" };
}

export function makeInterest(name, emoji) {
  const fromCatalog = findInCatalog(name);
  if (fromCatalog) return { id: fromCatalog.id, name: fromCatalog.name, emoji: emoji || fromCatalog.emoji, active: true };
  const guess = guessVisual(name);
  const clean = name.trim().replace(/\s+/g, " ");
  return {
    id: slugify(clean),
    name: clean.charAt(0).toUpperCase() + clean.slice(1),
    emoji: emoji || guess.emoji,
    active: true,
  };
}

export function visualFor(interest) {
  const fromCatalog = findInCatalog(interest?.id || interest?.name || "");
  if (fromCatalog) return { scene: fromCatalog.scene, extras: fromCatalog.extras };
  const guess = guessVisual(interest?.name || "");
  return { scene: guess.scene, extras: ["⭐", "✨", "💫"] };
}

export const EMOJI_CHOICES = [
  "⭐", "🦖", "🪐", "⚽", "🎮", "🎵", "💻", "🌿", "🤖", "✈️", "🐶", "🐱",
  "🐳", "🚗", "🚂", "🎨", "📚", "🔬", "🏰", "🦄", "🧱", "🌋", "🌈", "🍕",
];
