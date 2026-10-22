import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { BookGlow } from "../components/art.jsx";
import Icon from "../components/Icon.jsx";
import { EmptyState, PageHeader, Sheet } from "../components/ui.jsx";
import { CONTENT_TYPES, LOADING_TIPS, SCHOOL_THEMES, SITUATIONS, typeInfo } from "../lib/content.js";
import { useApp } from "../state/AppContext.jsx";

const DETAIL_EXAMPLES = {
  dinossauros: "Ex.: T. rex, fósseis, dinossauros do Brasil",
  espaco: "Ex.: Marte, buracos negros, astronautas",
  futebol: "Ex.: Copa do Mundo, goleiros, regras do jogo",
  jogos: "Ex.: como os jogos são feitos, Minecraft",
  musica: "Ex.: piano, como o som funciona",
  tecnologia: "Ex.: internet, inteligência artificial",
  natureza: "Ex.: florestas, flores, chuva",
};

function GeneratingScreen({ onCancel }) {
  const [progress, setProgress] = useState(5);
  const [tip, setTip] = useState(0);

  useEffect(() => {
    const grow = setInterval(() => setProgress((p) => p + (93 - p) * 0.05), 400);
    const rotate = setInterval(() => setTip((i) => (i + 1) % LOADING_TIPS.length), 6000);
    return () => {
      clearInterval(grow);
      clearInterval(rotate);
    };
  }, []);

  return (
    <div className="generating" role="dialog" aria-modal="true" aria-labelledby="gerando-titulo">
      <button type="button" className="icon-btn generating-close" onClick={onCancel} aria-label="Cancelar" autoFocus>
        <Icon name="x" size={26} />
      </button>
      <div className="generating-center">
        <BookGlow />
        <h2 id="gerando-titulo">Criando seu conteúdo...</h2>
        <p>Estamos reunindo tudo o que você gosta para gerar um texto incrível!</p>
        <div className="progress" role="progressbar" aria-label="Progresso" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <span style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="generating-tip">
        <Icon name="star" filled size={20} />
        <p>
          <strong>Dica:</strong> {LOADING_TIPS[tip]}
        </p>
      </div>
    </div>
  );
}

export default function Generate() {
  const { interests, generate } = useApp();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const active = interests.filter((i) => i.active);

  const [typeId, setTypeId] = useState(() => (typeInfo(params.get("tipo")).id === params.get("tipo") ? params.get("tipo") : null));
  const [interestId, setInterestId] = useState(() => params.get("interesse") || active[0]?.id);
  const [detail, setDetail] = useState("");
  const [theme, setTheme] = useState(() => params.get("tema") || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const abortRef = useRef(null);

  // Os parâmetros da URL só servem para abrir a tela já preenchida.
  useEffect(() => {
    if (params.has("tipo") || params.has("interesse") || params.has("tema")) setParams({}, { replace: true });
  }, [params, setParams]);

  useEffect(() => () => abortRef.current?.abort(), []);

  const interest = interests.find((i) => i.id === interestId) || active[0];
  const choices = interest && !active.some((i) => i.id === interest.id) ? [interest, ...active] : active;
  const type = typeId ? typeInfo(typeId) : null;
  const isStory = typeId === "cotidiano";

  const openType = (id) => {
    setTypeId(id);
    setError("");
    if (id === "cotidiano" || typeId === "cotidiano") setDetail("");
  };

  async function create() {
    if (!interest) return;
    if (isStory && !detail.trim()) {
      setError("Escreva ou escolha uma situação.");
      return;
    }
    setError("");
    setLoading(true);
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const text = await generate(
        { type: typeId, interest, theme: isStory ? "" : theme.trim(), detail: detail.trim() },
        controller.signal,
      );
      navigate(`/texto/${text.id}`);
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(err.message === "Failed to fetch" ? "Sem conexão com o servidor. Verifique a internet e tente de novo." : err.message);
      }
      setLoading(false);
    }
  }

  return (
    <div className="page page-narrow">
      <PageHeader title="Gerar novo conteúdo" subtitle="Escolha o tipo de conteúdo que deseja criar com base nos seus interesses." />

      {active.length === 0 ? (
        <EmptyState
          emoji="🌟"
          title="Escolha seus interesses primeiro"
          action={
            <Link to="/interesses" className="btn btn-primary">
              Escolher interesses
            </Link>
          }
        >
          Os conteúdos são criados a partir dos temas de que você gosta.
        </EmptyState>
      ) : (
        <ul className="type-list">
          {CONTENT_TYPES.map((t) => (
            <li key={t.id}>
              <button type="button" className="type-card" onClick={() => openType(t.id)}>
                <span className={`type-icon type-icon-lg tone-${t.tone}`} aria-hidden="true">
                  <Icon name={t.icon} size={26} />
                </span>
                <span className="type-text">
                  <strong>{t.label}</strong>
                  <small>{t.description}</small>
                </span>
                <Icon name="chevron" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <Sheet
        open={Boolean(type) && !loading && active.length > 0}
        onClose={() => setTypeId(null)}
        title={type?.label}
        footer={
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={create}>
            <Icon name="sparkles" size={20} />
            Criar conteúdo
          </button>
        }
      >
        <p className="field-label" id="interesse-escolha">
          Sobre qual interesse?
        </p>
        <div className="chip-grid" role="radiogroup" aria-labelledby="interesse-escolha">
          {choices.map((item) => (
            <button
              key={item.id}
              type="button"
              role="radio"
              aria-checked={interest?.id === item.id}
              className={`chip chip-lg ${interest?.id === item.id ? "chip-on" : ""}`}
              onClick={() => setInterestId(item.id)}
            >
              <span aria-hidden="true">{item.emoji}</span> {item.name}
            </button>
          ))}
        </div>

        {isStory ? (
          <>
            <label className="field field-labeled">
              <span className="field-label">Qual situação do dia a dia?</span>
              <span className="field-box">
                <input value={detail} onChange={(e) => setDetail(e.target.value.slice(0, 140))} placeholder="Ex.: ir ao dentista" />
              </span>
            </label>
            <div className="chip-grid chip-grid-sm">
              {SITUATIONS.map((situation) => (
                <button
                  key={situation}
                  type="button"
                  className={`chip ${detail === situation ? "chip-on" : ""}`}
                  aria-pressed={detail === situation}
                  onClick={() => setDetail(situation)}
                >
                  {situation}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
          <label className="field field-labeled">
            <span className="field-label">Tema do texto (opcional)</span>
            <span className="field-box">
              <Icon name="book" size={20} className="field-icon" />
              <input
                value={theme}
                onChange={(e) => setTheme(e.target.value.slice(0, 80))}
                placeholder="Ex.: História do Brasil, frações, ciclo da água"
              />
            </span>
            <span className="field-hint">
              {theme.trim()
                ? `O texto vai ensinar ${theme.trim()} usando ${interest?.name.toLowerCase()} como ponte, sem mudar os fatos da escola.`
                : `Deixe em branco para um texto sobre ${interest?.name.toLowerCase()}.`}
            </span>
          </label>
          <div className="chip-grid chip-grid-sm">
            {SCHOOL_THEMES.map((item) => (
              <button
                key={item}
                type="button"
                className={`chip ${theme === item ? "chip-on" : ""}`}
                aria-pressed={theme === item}
                onClick={() => setTheme(theme === item ? "" : item)}
              >
                {item}
              </button>
            ))}
          </div>
          <label className="field field-labeled">
            <span className="field-label">Quer algo específico? (opcional)</span>
            <span className="field-box">
              <input
                value={detail}
                onChange={(e) => setDetail(e.target.value.slice(0, 140))}
                placeholder={
                  theme.trim()
                    ? "Ex.: a chegada dos portugueses, para o 4º ano"
                    : DETAIL_EXAMPLES[interest?.id] || "Ex.: uma curiosidade, um personagem, uma pergunta"
                }
              />
            </span>
          </label>
          </>
        )}

        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
      </Sheet>

      {loading && <GeneratingScreen onCancel={() => abortRef.current?.abort()} />}
    </div>
  );
}
