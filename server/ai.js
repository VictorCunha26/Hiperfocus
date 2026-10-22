// Integração com a IA (Google Gemini, plano gratuito) para gerar textos e ilustrações.
import { ApiError, GoogleGenAI } from "@google/genai";

// Modelos tentados em ordem: se um estiver indisponível, sobrecarregado ou sem cota, passa para o próximo.
const MODELS = [
  ...(process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : []),
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.5-flash",
  "gemini-3.1-flash-lite",
].filter((m, i, list) => list.indexOf(m) === i);
const MODEL = MODELS[0];
const RETRY_STATUS = [404, 429, 500, 503];

let client = null;
function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new AIUnavailableError("IA não configurada (defina GEMINI_API_KEY no arquivo .env).");
  if (!client) client = new GoogleGenAI({ apiKey });
  return client;
}

export const aiInfo = { model: MODEL, provider: "Gemini" };

export class AIUnavailableError extends Error {}
export class AIRateLimitError extends Error {}

const LEVELS = {
  iniciante:
    "Leitor iniciante: frases curtas (até 10 palavras), vocabulário simples e concreto, 3 parágrafos curtos, cerca de 90 a 130 palavras no total.",
  intermediario:
    "Leitor intermediário: frases claras e diretas, alguns termos novos explicados no próprio texto, 4 parágrafos, cerca de 160 a 230 palavras no total.",
  avancado:
    "Leitor avançado: frases completas e informativas, vocabulário mais rico (com termos técnicos explicados), 5 parágrafos, cerca de 250 a 340 palavras no total.",
};

const TYPES = {
  texto: "Um texto informativo e envolvente, com fatos reais e curiosos.",
  "texto-ilustracao":
    "Um texto informativo e envolvente, que será acompanhado de uma ilustração. Descreva em illustration_description uma cena que combine com o texto.",
  dica: "Uma 'Dica do dia': uma curiosidade rápida e surpreendente, em 1 ou 2 parágrafos curtos (no máximo 70 palavras no total), independentemente do nível de leitura.",
  desafio:
    "Um 'Desafio de leitura': um texto curto seguido de exatamente 3 perguntas de compreensão de múltipla escolha, com 3 alternativas cada. As respostas devem estar explícitas no texto.",
  cotidiano:
    "Uma história do dia a dia (narrativa social) que ajuda a pessoa a entender e se preparar para a situação informada, usando o hiperfoco como ponte (por exemplo, um personagem ou elementos do hiperfoco vivendo a mesma situação). Descreva a situação passo a passo, o que a pessoa pode sentir, o que pode fazer para se acalmar e termine de forma positiva e tranquilizadora. Não invente regras rígidas nem prometa coisas que podem não acontecer.",
};

const SYSTEM_TEXT = `Você escreve textos de leitura para o Hiperfocus, um aplicativo que usa os interesses intensos (hiperfoco) de pessoas com Transtorno do Espectro Autista (TEA) para estimular o gosto pela leitura e apoiar a aprendizagem escolar.

Escreva sempre em português do Brasil, seguindo estas diretrizes:
- Linguagem clara, literal e previsível. Evite ironia, sarcasmo, duplo sentido e expressões idiomáticas; se usar uma, explique o significado.
- Estrutura organizada: título curto e chamativo, parágrafos com uma ideia principal cada.
- Tom acolhedor, positivo e respeitoso, sem infantilizar. Nada assustador, violento ou ansiogênico.
- Use fatos corretos. Se houver incerteza científica, diga isso de forma simples ("os cientistas acreditam que...").
- Não use markdown, emojis nem listas dentro dos parágrafos.

Quando houver um TEMA ESCOLAR:
- O tema escolar é o ASSUNTO do texto. O hiperfoco é a PONTE: use-o como narrador, personagem guia, comparações, exemplos e analogias para despertar o interesse.
- O conteúdo do tema escolar deve ser fiel ao que é ensinado na escola (de acordo com a BNCC): datas, nomes, lugares, conceitos e acontecimentos corretos. Nunca altere, simplifique de forma errada ou invente fatos do tema escolar para encaixar o hiperfoco.
- Se o hiperfoco não tem relação real com o tema (por exemplo, não existiam dinossauros na época do Brasil colonial), deixe explícito que é imaginação ("Imagine que um dinossauro viajante do tempo...", "Se um T. rex pudesse visitar..."). A parte imaginária é só a moldura; os fatos do tema continuam verdadeiros e sem mistura.
- Use só fatos consolidados, que aparecem em livros didáticos. Se não tiver certeza de um detalhe (um nome, uma data, um número), deixe-o de fora em vez de arriscar.
- Se existir uma relação real entre o hiperfoco e o tema (por exemplo, fósseis de dinossauros encontrados no Brasil), ela pode ser usada, desde que correta.
- O glossário, o "Você sabia?" e as perguntas devem ajudar a aprender o tema escolar.

Campos da resposta:
- title: título do texto.
- paragraphs: os parágrafos do texto, na ordem.
- fun_fact: uma curiosidade extra curta e verdadeira para a seção "Você sabia?" (sobre o tema escolar, quando houver).
- glossary: de 2 a 4 palavras do texto que podem ser novas para o leitor, com um significado simples (no máximo 15 palavras cada).
- questions: para o tipo desafio, exatamente 3 perguntas com 3 alternativas e o índice (0, 1 ou 2) da correta. Para os outros tipos, uma lista vazia.
- illustration_description: descrição visual de uma cena que combine com o texto (cenário, personagens, cores), em uma ou duas frases.
- emoji: um único emoji que represente o texto.`;

const TEXT_SCHEMA = {
  type: "object",
  properties: {
    title: { type: "string" },
    paragraphs: { type: "array", items: { type: "string" } },
    fun_fact: { type: "string" },
    glossary: {
      type: "array",
      items: {
        type: "object",
        properties: { word: { type: "string" }, meaning: { type: "string" } },
        required: ["word", "meaning"],
      },
    },
    questions: {
      type: "array",
      items: {
        type: "object",
        properties: {
          question: { type: "string" },
          options: { type: "array", items: { type: "string" } },
          answer_index: { type: "integer" },
        },
        required: ["question", "options", "answer_index"],
      },
    },
    illustration_description: { type: "string" },
    emoji: { type: "string" },
  },
  required: ["title", "paragraphs", "fun_fact", "glossary", "questions", "illustration_description", "emoji"],
};

function buildTextPrompt({ type, interest, theme, detail, level, age, readerName, otherInterests }) {
  const lines = [`Tipo de conteúdo: ${TYPES[type]}`, `Hiperfoco (interesse do leitor): ${interest}`];
  if (type === "cotidiano") {
    lines.push(`Situação do dia a dia: ${detail || "fazer algo novo"}`);
  } else if (theme) {
    lines.push(`TEMA ESCOLAR (assunto principal do texto): ${theme}`);
    lines.push(`Escreva sobre ${theme}, usando ${interest} como ponte para despertar o interesse, sem alterar a veracidade do conteúdo escolar.`);
  } else {
    lines.push(`Sem tema escolar: o texto é sobre o próprio hiperfoco (${interest}).`);
  }
  if (detail && type !== "cotidiano") lines.push(`Detalhe pedido pelo responsável: ${detail}`);
  lines.push(`Nível de leitura: ${LEVELS[level] || LEVELS.intermediario}`);
  if (age) lines.push(`Idade do leitor: ${age} anos.`);
  if (readerName && type === "cotidiano") lines.push(`Nome do leitor (pode aparecer na história): ${readerName}`);
  if (otherInterests?.length && !theme) {
    lines.push(`Outros interesses do leitor (use só se combinar naturalmente): ${otherInterests.join(", ")}`);
  }
  lines.push("Escreva um texto novo e original.");
  return lines.join("\n");
}

async function generateWithFallback(request) {
  let lastError;
  for (const model of MODELS) {
    try {
      return await getClient().models.generateContent({ ...request, model });
    } catch (error) {
      lastError = error;
      if (!(error instanceof ApiError) || !RETRY_STATUS.includes(error.status)) throw error;
      console.warn(`[gemini] ${model} indisponível (${error.status}), tentando o próximo modelo.`);
    }
  }
  throw lastError;
}

async function callGemini({ system, prompt, schema }) {
  let response;
  try {
    response = await generateWithFallback({
      contents: prompt,
      config: {
        systemInstruction: system,
        ...(schema ? { responseMimeType: "application/json", responseJsonSchema: schema } : {}),
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      if (error.status === 429) {
        throw new AIRateLimitError("Limite gratuito do Gemini atingido. Aguarde um minuto e tente de novo.");
      }
      if (error.status === 401 || error.status === 403 || (error.status === 400 && /api key/i.test(error.message))) {
        throw new AIUnavailableError("Chave do Gemini inválida (verifique GEMINI_API_KEY).");
      }
    }
    throw error;
  }
  const text = response.text;
  if (!text) throw new Error("A IA não pôde criar este conteúdo. Tente outro tema ou detalhe.");
  return text;
}

export async function generateText(input) {
  const raw = await callGemini({ system: SYSTEM_TEXT, prompt: buildTextPrompt(input), schema: TEXT_SCHEMA });
  const data = JSON.parse(raw);
  const questions = (data.questions || [])
    .filter((q) => q.options?.length >= 2 && q.answer_index >= 0 && q.answer_index < q.options.length)
    .map((q) => ({ question: q.question, options: q.options, answer: q.answer_index }));
  return {
    title: data.title,
    paragraphs: (data.paragraphs || []).filter(Boolean),
    funFact: data.fun_fact,
    glossary: data.glossary || [],
    questions: input.type === "desafio" ? questions : [],
    illustrationDescription: data.illustration_description,
    emoji: data.emoji,
  };
}

const SYSTEM_SVG = `Você é um ilustrador de livros infantis que desenha em SVG.
Crie UMA ilustração em SVG puro, no estilo flat e amigável, com cores suaves e harmoniosas, formas arredondadas e boa leitura visual, adequada para crianças e jovens com TEA (sem elementos assustadores, sem excesso de detalhes, sem poluição visual).

Regras técnicas obrigatórias:
- Responda somente com o código, começando em <svg e terminando em </svg>.
- Use viewBox="0 0 800 500" e xmlns="http://www.w3.org/2000/svg", sem width/height fixos.
- Preencha todo o fundo (céu, cenário ou cor de fundo).
- Não use texto, <script>, <foreignObject>, <image>, links, atributos de evento ou recursos externos.
- Gradientes e filtros simples são permitidos (com ids próprios).
- Mantenha o arquivo abaixo de 25 KB.`;

export async function generateIllustration({ interest, title, description }) {
  const raw = await callGemini({
    system: SYSTEM_SVG,
    prompt: `Hiperfoco: ${interest}\nTítulo do texto: ${title}\nCena: ${description || title}`,
  });
  const match = raw.match(/<svg[\s\S]*<\/svg>/i);
  if (!match) throw new Error("A IA não retornou uma ilustração válida.");
  return sanitizeSvg(match[0]);
}

// O app exibe o SVG dentro de <img>, o que já impede scripts; mesmo assim,
// removemos qualquer coisa que não seja desenho.
export function sanitizeSvg(svg) {
  const clean = svg
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<(script|foreignObject|iframe|object|embed|image|a)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<(script|foreignObject|iframe|object|embed|image)\b[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*("[^"]*"|'[^']*')/gi, "")
    .replace(/(href|xlink:href)\s*=\s*("(?!#)[^"]*"|'(?!#)[^']*')/gi, "")
    .replace(/url\(\s*['"]?(?!#)[^)]*\)/gi, "none");
  if (clean.length > 200_000) throw new Error("Ilustração muito grande.");
  return clean;
}
