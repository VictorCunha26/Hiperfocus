import "./env.js";
import express from "express";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { AIRateLimitError, AIUnavailableError, aiInfo, generateIllustration, generateText } from "./ai.js";
import { fallbackText } from "./fallback.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(here, "..", "dist");
// Em desenvolvimento (--dev) a API fica sempre na 3001, porque o Vite usa a PORT.
const DEV = process.argv.includes("--dev");
const PORT = DEV ? 3001 : Number(process.env.PORT) || 3001;
const DEMO = process.env.HIPERFOCUS_DEMO === "1";

const TYPES = ["texto", "texto-ilustracao", "dica", "desafio", "cotidiano"];
const LEVELS = ["iniciante", "intermediario", "avancado"];

const app = express();
app.disable("x-powered-by");
app.use(express.json({ limit: "32kb" }));

const cleanText = (value, max) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";

function readContentRequest(body = {}) {
  const type = TYPES.includes(body.type) ? body.type : null;
  const interest = cleanText(body.interest, 60);
  if (!type || !interest) return null;
  const age = Number.parseInt(body.age, 10);
  return {
    type,
    interest,
    theme: cleanText(body.theme, 80),
    detail: cleanText(body.detail, 140),
    level: LEVELS.includes(body.level) ? body.level : "intermediario",
    age: age >= 3 && age <= 99 ? age : null,
    readerName: cleanText(body.readerName, 40).split(" ")[0],
    otherInterests: Array.isArray(body.otherInterests)
      ? body.otherInterests.map((i) => cleanText(i, 40)).filter(Boolean).slice(0, 8)
      : [],
  };
}

app.get("/api/status", (_req, res) => {
  res.json({
    ok: true,
    demo: DEMO,
    keyConfigured: Boolean(process.env.GEMINI_API_KEY),
    provider: aiInfo.provider,
    model: aiInfo.model,
  });
});

app.post("/api/conteudo", async (req, res) => {
  const input = readContentRequest(req.body);
  if (!input) {
    return res.status(400).json({ error: "Informe o tipo de conteúdo e o interesse." });
  }

  if (!DEMO) {
    try {
      const content = await generateText(input);
      return res.json({ ...content, source: "ia" });
    } catch (error) {
      const notice =
        error instanceof AIUnavailableError
          ? "Modo demonstração: a IA ainda não foi configurada, então este é um texto de exemplo."
          : error instanceof AIRateLimitError
            ? "O limite gratuito da IA foi atingido por agora, então preparamos um texto de exemplo. Tente de novo em um minuto."
            : "A IA não respondeu agora, então preparamos um texto de exemplo. Tente de novo em instantes.";
      console.warn("[conteudo]", error.message);
      return res.json({ ...fallbackText(input), source: "exemplo", notice });
    }
  }

  res.json({
    ...fallbackText(input),
    source: "exemplo",
    notice: "Modo demonstração: este é um texto de exemplo.",
  });
});

app.post("/api/ilustracao", async (req, res) => {
  const interest = cleanText(req.body?.interest, 60);
  const title = cleanText(req.body?.title, 160);
  const description = cleanText(req.body?.description, 600);
  if (!interest || !title) {
    return res.status(400).json({ error: "Informe o interesse e o título." });
  }
  if (DEMO) return res.json({ svg: null, source: "exemplo" });

  try {
    const svg = await generateIllustration({ interest, title, description });
    res.json({ svg, source: "ia" });
  } catch (error) {
    console.warn("[ilustracao]", error.message);
    // O app continua com a ilustração montada no próprio aparelho.
    res.json({ svg: null, source: "exemplo" });
  }
});

app.use("/api", (_req, res) => res.status(404).json({ error: "Rota não encontrada." }));

// Em produção (npm start), o mesmo servidor entrega o app compilado.
if (existsSync(distDir)) {
  app.use(express.static(distDir, { index: false, maxAge: "1h" }));
  app.get("/{*rota}", (_req, res) => res.sendFile(path.join(distDir, "index.html")));
}

app.listen(PORT, (error) => {
  if (error) {
    console.error(
      error.code === "EADDRINUSE"
        ? `A porta ${PORT} já está em uso. Feche o outro "npm run dev" que está aberto e tente de novo.`
        : error.message,
    );
    process.exit(1);
  }
  const mode = DEMO ? "demonstração" : `IA ${aiInfo.provider} (${aiInfo.model})`;
  console.log(`Hiperfocus API em http://localhost:${PORT} · modo: ${mode}`);
});
