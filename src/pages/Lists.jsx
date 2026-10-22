import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "../components/Icon.jsx";
import { TextRow } from "../components/texts.jsx";
import { EmptyState, PageHeader, Segmented } from "../components/ui.jsx";
import { slugify } from "../lib/interests.js";
import { relativeDay } from "../lib/text.js";
import { useApp } from "../state/AppContext.jsx";

function matches(text, query) {
  if (!query) return true;
  const haystack = slugify(`${text.title} ${text.interestName} ${text.paragraphs.join(" ")}`);
  return haystack.includes(slugify(query));
}

function SearchBox({ value, onChange }) {
  return (
    <label className="field list-search">
      <span className="sr-only">Buscar textos</span>
      <span className="field-box">
        <Icon name="search" size={20} className="field-icon" />
        <input type="search" value={value} onChange={(e) => onChange(e.target.value)} placeholder="Buscar por título ou tema" />
      </span>
    </label>
  );
}

const GenerateButton = () => (
  <Link to="/gerar" className="btn btn-primary">
    <Icon name="sparkles" size={20} />
    Gerar conteúdo
  </Link>
);

export function MyTexts() {
  const { texts, interests } = useApp();
  const [query, setQuery] = useState("");
  const [interest, setInterest] = useState("todos");
  const used = interests.filter((i) => texts.some((t) => t.interestId === i.id));
  const list = texts.filter((t) => (interest === "todos" || t.interestId === interest) && matches(t, query));

  const groups = [];
  for (const text of list) {
    const label = relativeDay(text.createdAt);
    const group = groups.find((g) => g.label === label);
    if (group) group.items.push(text);
    else groups.push({ label, items: [text] });
  }

  return (
    <div className="page page-narrow">
      <PageHeader back={false} title="Meus textos" subtitle="Tudo o que você criou, do mais novo para o mais antigo." />
      {texts.length === 0 ? (
        <EmptyState emoji="📝" title="Nenhum texto ainda" action={<GenerateButton />}>
          Crie o seu primeiro texto a partir de um dos seus interesses.
        </EmptyState>
      ) : (
        <>
          <SearchBox value={query} onChange={setQuery} />
          {used.length > 1 && (
            <div className="filter-chips" role="group" aria-label="Filtrar por interesse">
              <button type="button" className={`chip ${interest === "todos" ? "chip-on" : ""}`} aria-pressed={interest === "todos"} onClick={() => setInterest("todos")}>
                Todos
              </button>
              {used.map((i) => (
                <button
                  key={i.id}
                  type="button"
                  className={`chip ${interest === i.id ? "chip-on" : ""}`}
                  aria-pressed={interest === i.id}
                  onClick={() => setInterest(i.id)}
                >
                  <span aria-hidden="true">{i.emoji}</span> {i.name}
                </button>
              ))}
            </div>
          )}
          {groups.length === 0 && <p className="muted center">Nenhum texto encontrado.</p>}
          {groups.map((group) => (
            <section key={group.label} aria-label={group.label}>
              <h2 className="group-title">{group.label}</h2>
              <ul className="text-list">
                {group.items.map((text) => (
                  <TextRow key={text.id} text={text} />
                ))}
              </ul>
            </section>
          ))}
        </>
      )}
    </div>
  );
}

const TABS = [
  { value: "todos", label: "Todos" },
  { value: "textos", label: "Textos" },
  { value: "ilustracoes", label: "Ilustrações" },
];

export function Library() {
  const { texts } = useApp();
  const [tab, setTab] = useState("todos");
  const [query, setQuery] = useState("");
  const saved = texts.filter((t) => t.saved);
  const list = saved.filter(
    (t) => (tab === "todos" || (tab === "ilustracoes" ? Boolean(t.illustration) : !t.illustration)) && matches(t, query),
  );

  return (
    <div className="page page-narrow">
      <PageHeader
        back={false}
        title="Minha biblioteca"
        subtitle="Aqui estão os conteúdos que você gerou e salvou para ler quando quiser."
      />
      {saved.length === 0 ? (
        <EmptyState emoji="📚" title="Sua biblioteca está vazia" action={<GenerateButton />}>
          Quando gostar de um texto, toque em “Salvar no meu acervo” para guardá-lo aqui.
        </EmptyState>
      ) : (
        <>
          <Segmented label="Tipo de conteúdo" value={tab} onChange={setTab} options={TABS} />
          {saved.length > 4 && <SearchBox value={query} onChange={setQuery} />}
          {list.length ? (
            <ul className="text-list">
              {list.map((text) => (
                <TextRow key={text.id} text={text} />
              ))}
            </ul>
          ) : (
            <p className="muted center">Nada por aqui ainda.</p>
          )}
        </>
      )}
    </div>
  );
}
