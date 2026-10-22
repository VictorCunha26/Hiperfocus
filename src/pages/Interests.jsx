import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ReadingArt } from "../components/art.jsx";
import Icon from "../components/Icon.jsx";
import { PageHeader, useGoBack, useToast } from "../components/ui.jsx";
import { CATALOG, EMOJI_CHOICES, STARTER_IDS, guessVisual, slugify } from "../lib/interests.js";
import { useApp } from "../state/AppContext.jsx";

export function Interests() {
  const { interests, setInterests } = useApp();
  const navigate = useNavigate();
  const toast = useToast();
  const [params] = useSearchParams();
  const onboarding = params.get("inicio") === "1";
  const [draft, setDraft] = useState(interests);
  const goBack = useGoBack();
  const count = draft.filter((i) => i.active).length;

  const toggle = (id) => setDraft((list) => list.map((i) => (i.id === id ? { ...i, active: !i.active } : i)));
  const remove = (id) => setDraft((list) => list.filter((i) => i.id !== id));

  const goAdd = () => {
    setInterests(draft);
    navigate(`/interesses/adicionar${onboarding ? "?inicio=1" : ""}`);
  };

  const save = () => {
    setInterests(draft);
    if (onboarding) {
      navigate("/inicio", { replace: true });
    } else {
      toast("Interesses salvos!", "success");
      goBack();
    }
  };

  return (
    <div className="page page-narrow">
      <PageHeader
        title={onboarding ? "Do que você gosta?" : "Meus interesses"}
        back={!onboarding}
        subtitle="Selecione ou adicione os temas de que você mais gosta. Esses interesses serão usados pela IA para criar conteúdos personalizados."
      />

      <ul className="check-list">
        {draft.map((interest) => (
          <li key={interest.id} className="check-item">
            <label>
              <span className="check-emoji" aria-hidden="true">
                {interest.emoji}
              </span>
              <span className="check-name">{interest.name}</span>
              <input type="checkbox" checked={interest.active} onChange={() => toggle(interest.id)} />
              <span className="checkbox" aria-hidden="true">
                <Icon name="check" size={16} strokeWidth={3} />
              </span>
            </label>
            {!STARTER_IDS.includes(interest.id) && (
              <button type="button" className="icon-btn icon-btn-sm" onClick={() => remove(interest.id)} aria-label={`Remover ${interest.name}`}>
                <Icon name="x" size={18} />
              </button>
            )}
          </li>
        ))}
      </ul>

      <button type="button" className="add-row" onClick={goAdd}>
        <Icon name="plus" size={20} />
        Adicionar outro interesse
      </button>

      <div className="sticky-actions">
        <button type="button" className="btn btn-primary btn-lg btn-block" disabled={!count} onClick={save}>
          {onboarding ? "Continuar" : "Salvar"}
        </button>
        <p className="hint" aria-live="polite">
          {count ? `${count} ${count === 1 ? "interesse selecionado" : "interesses selecionados"}` : "Escolha pelo menos um interesse."}
        </p>
      </div>
    </div>
  );
}

export function AddInterest() {
  const { interests, addInterest, setInterests } = useApp();
  const toast = useToast();
  const [params] = useSearchParams();
  const goBack = useGoBack(`/interesses${params.get("inicio") === "1" ? "?inicio=1" : ""}`);
  const [query, setQuery] = useState("");
  const [emoji, setEmoji] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const activeIds = new Set(interests.filter((i) => i.active).map((i) => i.id));
  const term = slugify(query);
  const matching = CATALOG.filter((item) => !term || slugify(item.name).includes(term));
  const suggestions = term || showAll ? matching : matching.slice(0, 12);
  const exact = CATALOG.some((item) => slugify(item.name) === term) || interests.some((i) => i.id === term);
  const guess = guessVisual(query).emoji;

  const add = (name, chosen) => {
    const interest = addInterest(name, chosen);
    toast(`${interest.emoji} ${interest.name} está nos seus interesses!`, "success");
  };

  const toggleSuggestion = (item) => {
    if (activeIds.has(item.id)) {
      setInterests(interests.map((i) => (i.id === item.id ? { ...i, active: false } : i)));
    } else {
      add(item.name);
    }
  };

  const submit = (event) => {
    event.preventDefault();
    if (!query.trim()) return;
    add(query, emoji || guess);
    setQuery("");
    setEmoji(null);
  };

  return (
    <div className="page page-narrow">
      <PageHeader
        title="Adicionar interesse"
        subtitle="Digite um tema de que você gosta e vamos incluí-lo na sua lista."
        fallback={`/interesses${params.get("inicio") === "1" ? "?inicio=1" : ""}`}
      />
      <form onSubmit={submit} className="add-form">
        <label className="field">
          <span className="sr-only">Buscar ou escrever um interesse</span>
          <span className="field-box field-box-lg">
            <Icon name="search" size={20} className="field-icon" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value.slice(0, 40))}
              placeholder="Ex.: carros, dinossauros, música..."
              enterKeyHint="done"
            />
          </span>
        </label>
        {query.trim() && !exact && (
          <div className="custom-add">
            <p className="field-label">Escolha um ícone para “{query.trim()}”</p>
            <div className="emoji-picker" role="radiogroup" aria-label="Ícone do interesse">
              {[guess, ...EMOJI_CHOICES.filter((e) => e !== guess)].slice(0, 16).map((choice) => (
                <button
                  key={choice}
                  type="button"
                  role="radio"
                  aria-checked={(emoji || guess) === choice}
                  className={(emoji || guess) === choice ? "active" : ""}
                  onClick={() => setEmoji(choice)}
                >
                  {choice}
                </button>
              ))}
            </div>
            <button type="submit" className="btn btn-primary btn-block">
              <Icon name="plus" size={20} />
              Adicionar “{query.trim()}”
            </button>
          </div>
        )}
      </form>

      <section aria-labelledby="sugestoes">
        <h2 id="sugestoes" className="section-title">
          Sugestões
        </h2>
        {suggestions.length ? (
          <ul className="chip-grid">
            {suggestions.map((item) => {
              const on = activeIds.has(item.id);
              return (
                <li key={item.id}>
                  <button type="button" className={`chip chip-lg ${on ? "chip-on" : ""}`} aria-pressed={on} onClick={() => toggleSuggestion(item)}>
                    <span aria-hidden="true">{on ? "✓" : item.emoji}</span> {item.name}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="muted">Nenhuma sugestão com esse nome. Você pode adicionar o tema assim mesmo!</p>
        )}
        {suggestions.length < matching.length && (
          <button type="button" className="link-strong more-link" onClick={() => setShowAll(true)}>
            Ver mais sugestões
          </button>
        )}
      </section>

      <div className="add-illustration">
        <ReadingArt />
        <p>Quanto mais você mostra o que gosta, mais personalizado fica o seu conteúdo!</p>
      </div>

      <div className="sticky-actions">
        <button type="button" className="btn btn-primary btn-lg btn-block" onClick={goBack}>
          Concluir
        </button>
      </div>
    </div>
  );
}
