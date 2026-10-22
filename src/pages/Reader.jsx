import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import ReadingControls from "../components/ReadingControls.jsx";
import { Illustration } from "../components/texts.jsx";
import { EmptyState, Sheet, useGoBack, useToast } from "../components/ui.jsx";
import { typeInfo } from "../lib/content.js";
import { useSpeech } from "../lib/speech.js";
import { countWords, firstName, readingMinutes, splitSentences } from "../lib/text.js";
import { useApp } from "../state/AppContext.jsx";

function Quiz({ questions, onCorrect }) {
  const [answers, setAnswers] = useState({});
  const allRight = questions.every((_, i) => answers[i]?.correct);

  const choose = (qi, oi) => {
    if (answers[qi]?.correct) return;
    const correct = oi === questions[qi].answer;
    setAnswers((a) => ({ ...a, [qi]: { choice: oi, correct } }));
    if (correct) onCorrect();
  };

  return (
    <section className="quiz" aria-labelledby="quiz-titulo">
      <h2 id="quiz-titulo">
        <Icon name="target" /> Desafio de leitura
      </h2>
      <p className="muted">Responda com calma. Se precisar, volte ao texto para conferir.</p>
      <ol className="quiz-list">
        {questions.map((q, qi) => (
          <li key={qi} className="quiz-q">
            <p className="quiz-question">
              <span className="quiz-number">{qi + 1}</span>
              {q.question}
            </p>
            <div className="quiz-options">
              {q.options.map((option, oi) => {
                const picked = answers[qi]?.choice === oi;
                const state = picked ? (answers[qi].correct ? "right" : "wrong") : "";
                return (
                  <button
                    key={oi}
                    type="button"
                    className={`quiz-option ${state}`}
                    aria-pressed={picked}
                    disabled={answers[qi]?.correct && !picked}
                    onClick={() => choose(qi, oi)}
                  >
                    <span className="quiz-letter" aria-hidden="true">
                      {state === "right" ? "✓" : "ABCD"[oi]}
                    </span>
                    {option}
                  </button>
                );
              })}
            </div>
            {answers[qi] && (
              <p className={`quiz-feedback ${answers[qi].correct ? "ok" : "try"}`} role="status">
                {answers[qi].correct ? "Isso mesmo! Muito bem! 🎉" : "Quase! Releia o texto com calma e tente outra vez."}
              </p>
            )}
          </li>
        ))}
      </ol>
      {allRight && <p className="quiz-done">⭐ Você acertou todas as perguntas! ⭐</p>}
    </section>
  );
}

function ReaderView({ text }) {
  const { prefs, account, stats, updateText, markRead, deleteText, correctAnswer } = useApp();
  const navigate = useNavigate();
  const goBack = useGoBack("/meus-textos");
  const toast = useToast();
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [focusOn, setFocusOn] = useState(false);
  const [focusIndex, setFocusIndex] = useState(0);
  const textRef = useRef(null);
  const type = typeInfo(text.type);

  const { byParagraph, flat } = useMemo(() => {
    let index = 0;
    const groups = text.paragraphs.map((paragraph, p) =>
      splitSentences(paragraph).map((sentence) => ({ text: sentence, index: index++, p })),
    );
    return { byParagraph: groups, flat: groups.flat() };
  }, [text.paragraphs]);
  const sentenceTexts = useMemo(() => flat.map((s) => s.text), [flat]);
  const speech = useSpeech(sentenceTexts, prefs.voiceRate);
  const words = countWords(text.paragraphs);

  // No modo foco, acompanha o parágrafo que está sendo lido em voz alta.
  useEffect(() => {
    if (focusOn && speech.current >= 0) setFocusIndex(flat[speech.current].p);
  }, [speech.current, focusOn, flat]);

  useEffect(() => {
    const target = focusOn
      ? textRef.current?.children[focusIndex]
      : speech.current >= 0
        ? textRef.current?.querySelector(`[data-s="${speech.current}"]`)
        : null;
    target?.scrollIntoView({ block: focusOn ? "center" : "nearest", behavior: prefs.reduceMotion ? "auto" : "smooth" });
  }, [focusIndex, focusOn, speech.current, prefs.reduceMotion]);

  const moveFocus = useCallback(
    (delta) => setFocusIndex((i) => Math.min(text.paragraphs.length - 1, Math.max(0, i + delta))),
    [text.paragraphs.length],
  );

  useEffect(() => {
    if (!focusOn) return undefined;
    const onKey = (event) => {
      if (event.target.closest("input, textarea")) return;
      if (event.key === "ArrowRight") moveFocus(1);
      if (event.key === "ArrowLeft") moveFocus(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [focusOn, moveFocus]);

  const toggleSave = () => {
    updateText(text.id, { saved: !text.saved });
    toast(text.saved ? "Removido da biblioteca" : "Salvo no seu acervo!", "success");
  };

  const finish = () => {
    if (!text.readAt) markRead(text.id);
    speech.stop();
    setCelebrate(true);
  };

  const share = async () => {
    const body = `${text.title}\n\n${text.paragraphs.join("\n\n")}`;
    try {
      if (navigator.share) await navigator.share({ title: text.title, text: body });
      else {
        await navigator.clipboard.writeText(body);
        toast("Texto copiado! Agora é só colar onde quiser.", "success");
      }
    } catch {
      /* compartilhamento cancelado */
    }
  };

  const remove = () => {
    if (!window.confirm(`Excluir “${text.title}”?`)) return;
    speech.stop();
    deleteText(text.id);
    toast("Texto excluído");
    navigate("/meus-textos", { replace: true });
  };

  const listenLabel = speech.status === "playing" ? "Pausar" : speech.status === "paused" ? "Continuar" : "Ouvir";

  return (
    <article className={`reader type-${text.type}`}>
      <header className="reader-top">
        <button type="button" className="icon-btn" onClick={goBack} aria-label="Voltar">
          <Icon name="back" size={24} />
        </button>
        <div className="reader-top-titles">
          <span className="reader-type">{type.label}</span>
          <span className="reader-chips">
            {text.theme && (
              <span className="chip chip-sm chip-theme">
                <span aria-hidden="true">📚</span> {text.theme}
              </span>
            )}
            <span className="chip chip-sm">
              <span aria-hidden="true">{text.emoji}</span> {text.interestName}
            </span>
          </span>
        </div>
        <button type="button" className="icon-btn" onClick={share} aria-label="Compartilhar texto">
          <Icon name="share" />
        </button>
        <button type="button" className="icon-btn" onClick={remove} aria-label="Excluir texto">
          <Icon name="trash" />
        </button>
      </header>

      {text.notice && (
        <p className="notice">
          <Icon name="info" size={18} />
          {text.notice}
        </p>
      )}

      <div className="reader-layout">
        <div className="reader-main">
          {text.illustration && <Illustration text={text} className="reader-illustration" showStatus />}
          {text.type === "dica" && (
            <div className="tip-hero" aria-hidden="true">
              <span>{text.emoji}</span>
              <Icon name="bulb" size={28} />
            </div>
          )}

          <h1 className="reader-title">{text.title}</h1>
          <p className="reader-meta">
            <Icon name="clock" size={16} /> {readingMinutes(text.paragraphs)} min de leitura · {words} palavras
          </p>

          <div className="reader-tools" role="toolbar" aria-label="Ferramentas de leitura">
            {speech.supported && (
              <button type="button" className={`tool ${speech.status !== "idle" ? "active" : ""}`} onClick={speech.toggle}>
                <Icon name={speech.status === "playing" ? "pause" : "volume"} size={20} />
                {listenLabel}
              </button>
            )}
            {speech.status !== "idle" && (
              <button type="button" className="tool" onClick={speech.stop}>
                <Icon name="stop" size={18} />
                Parar
              </button>
            )}
            {text.paragraphs.length > 1 && (
              <button
                type="button"
                className={`tool ${focusOn ? "active" : ""}`}
                aria-pressed={focusOn}
                onClick={() => setFocusOn((v) => !v)}
              >
                <Icon name="focus" size={20} />
                Modo foco
              </button>
            )}
            <button type="button" className="tool" onClick={() => setSettingsOpen(true)} aria-label="Ajustar letra e leitura">
              <Icon name="type" size={20} />
              Aa
            </button>
          </div>

          <div className={`reader-text ${focusOn ? "focus-mode" : ""}`} ref={textRef}>
            {byParagraph.map((sentences, p) => (
              <p
                key={p}
                className={focusOn ? (p === focusIndex ? "is-focus" : "is-dim") : ""}
                onClick={() => focusOn && setFocusIndex(p)}
              >
                {sentences.map((s) => (
                  <span
                    key={s.index}
                    data-s={s.index}
                    className={speech.current === s.index ? "speaking" : ""}
                    onClick={() => speech.status !== "idle" && speech.speakFrom(s.index)}
                  >
                    {s.text}{" "}
                  </span>
                ))}
              </p>
            ))}
          </div>

          {focusOn && (
            <div className="focus-nav">
              <button type="button" className="btn btn-soft" onClick={() => moveFocus(-1)} disabled={focusIndex === 0}>
                <Icon name="back" size={20} /> Anterior
              </button>
              <span aria-live="polite">
                {focusIndex + 1} de {text.paragraphs.length}
              </span>
              <button
                type="button"
                className="btn btn-soft"
                onClick={() => moveFocus(1)}
                disabled={focusIndex === text.paragraphs.length - 1}
              >
                Próximo <Icon name="chevron" size={20} />
              </button>
            </div>
          )}

          {text.questions?.length > 0 && <Quiz questions={text.questions} onCorrect={correctAnswer} />}
        </div>

        {(text.funFact || text.glossary?.length > 0) && (
          <aside className="reader-aside">
            {text.funFact && (
              <section className="fact-box">
                <span className="fact-icon" aria-hidden="true">
                  💡
                </span>
                <div>
                  <h2>Você sabia?</h2>
                  <p>{text.funFact}</p>
                </div>
              </section>
            )}
            {text.glossary?.length > 0 && (
              <section className="glossary">
                <h2>
                  <Icon name="book" size={20} /> Palavras novas
                </h2>
                <dl>
                  {text.glossary.map((entry) => (
                    <div key={entry.word}>
                      <dt>{entry.word}</dt>
                      <dd>{entry.meaning}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}
          </aside>
        )}
      </div>

      <div className="reader-more">
        <Link
          to={`/gerar?tipo=${text.type}&interesse=${text.interestId}${text.theme ? `&tema=${encodeURIComponent(text.theme)}` : ""}`}
          className="link-strong"
        >
          <Icon name="refresh" size={18} /> Criar outro sobre {text.interestName}
        </Link>
      </div>

      <div className="reader-actions">
        <button type="button" className={`btn btn-lg ${text.readAt ? "btn-done" : "btn-outline"}`} onClick={finish}>
          <Icon name={text.readAt ? "check" : "star"} size={20} />
          {text.readAt ? "Leitura concluída" : "Terminei de ler!"}
        </button>
        <button type="button" className={`btn btn-lg ${text.saved ? "btn-soft" : "btn-primary"}`} onClick={toggleSave} aria-pressed={text.saved}>
          <Icon name="bookmark" size={20} filled={text.saved} />
          {text.saved ? "Salvo no acervo" : "Salvar no meu acervo"}
        </button>
      </div>

      <Sheet open={settingsOpen} onClose={() => setSettingsOpen(false)} title="Ajustar leitura">
        <ReadingControls />
      </Sheet>

      <Sheet
        open={celebrate}
        onClose={() => setCelebrate(false)}
        title={`Muito bem${account?.name ? `, ${firstName(account.name)}` : ""}!`}
        footer={
          <div className="sheet-actions">
            <button type="button" className="btn btn-outline btn-lg" onClick={() => setCelebrate(false)}>
              Fechar
            </button>
            <button type="button" className="btn btn-primary btn-lg" onClick={() => navigate("/gerar")}>
              Ler outro texto
            </button>
          </div>
        }
      >
        <div className="celebrate">
          <div className="celebrate-stars" aria-hidden="true">
            ⭐ 🌟 ⭐
          </div>
          <p>
            Você leu <strong>{words} palavras</strong> sobre {text.interestName.toLowerCase()}.
          </p>
          <p className="muted">
            {stats.textsRead === 1 ? "Este foi o seu primeiro texto lido!" : `Você já leu ${stats.textsRead} textos no Hiperfocus.`}
          </p>
        </div>
      </Sheet>
    </article>
  );
}

export default function Reader() {
  const { id } = useParams();
  const { texts } = useApp();
  const text = texts.find((t) => t.id === id);
  if (!text) {
    return (
      <div className="page">
        <EmptyState
          emoji="🔎"
          title="Texto não encontrado"
          action={
            <Link to="/meus-textos" className="btn btn-primary">
              Ver meus textos
            </Link>
          }
        >
          Ele pode ter sido excluído.
        </EmptyState>
      </div>
    );
  }
  return <ReaderView key={text.id} text={text} />;
}
