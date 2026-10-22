export const CONTENT_TYPES = [
  {
    id: "texto",
    label: "Texto",
    description: "Histórias, explicações, curiosidades e muito mais.",
    icon: "text",
    tone: "blue",
  },
  {
    id: "texto-ilustracao",
    label: "Texto + Ilustração",
    description: "Uma experiência completa, com texto e imagem personalizada.",
    icon: "image",
    tone: "purple",
  },
  {
    id: "dica",
    label: "Dica do dia",
    description: "Curiosidades e aprendizados rápidos sobre seus temas favoritos.",
    icon: "bulb",
    tone: "yellow",
  },
  {
    id: "desafio",
    label: "Desafio de leitura",
    description: "Pequenos textos com perguntas para testar o que você aprendeu.",
    icon: "target",
    tone: "coral",
  },
  {
    id: "cotidiano",
    label: "Situações do dia a dia",
    description: "Histórias que ajudam a se preparar para momentos da rotina.",
    icon: "smile",
    tone: "green",
  },
];

export const typeInfo = (id) => CONTENT_TYPES.find((t) => t.id === id) || CONTENT_TYPES[0];

export const LEVELS = [
  { value: "iniciante", label: "Iniciante", description: "Frases curtas e palavras simples." },
  { value: "intermediario", label: "Intermediário", description: "Textos médios, com algumas palavras novas." },
  { value: "avancado", label: "Avançado", description: "Textos mais longos e completos." },
];

export const levelLabel = (value) => LEVELS.find((l) => l.value === value)?.label || "Intermediário";

export const SITUATIONS = [
  "Ir ao dentista",
  "Primeiro dia na escola nova",
  "Cortar o cabelo",
  "Esperar a minha vez",
  "Ir ao supermercado",
  "Uma festa de aniversário",
  "Tomar vacina",
  "Viajar de avião",
];

export const SCHOOL_THEMES = [
  "História do Brasil",
  "Sistema Solar",
  "Ciclo da água",
  "Frações",
  "Corpo humano",
  "Meio ambiente",
  "Regiões do Brasil",
  "Descobrimento do Brasil",
];

export const AVATARS = ["🧒", "👦", "👧", "🧑", "🦖", "🚀", "🐱", "🐶", "🤖", "🦄", "⚽", "🎮"];

export const LOADING_TIPS = [
  "Quanto mais detalhes sobre seus interesses, melhor fica o resultado!",
  "Você pode ouvir o texto em voz alta tocando em “Ouvir”.",
  "No modo foco, você lê um parágrafo de cada vez, sem pressa.",
  "Salve seus textos favoritos para ler de novo quando quiser.",
  "Palavras novas aparecem explicadas no fim de cada texto.",
];
