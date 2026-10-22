import { Link, useOutletContext } from "react-router-dom";
import { HeroArt } from "../components/art.jsx";
import Icon from "../components/Icon.jsx";
import { TextRow } from "../components/texts.jsx";
import { CONTENT_TYPES } from "../lib/content.js";
import { firstName } from "../lib/text.js";
import { useApp } from "../state/AppContext.jsx";

export function ReadingStats({ compact = false }) {
  const { stats, texts } = useApp();
  const items = [
    { icon: "book", value: stats.textsRead, label: stats.textsRead === 1 ? "texto lido" : "textos lidos" },
    { icon: "text", value: stats.wordsRead, label: "palavras lidas" },
    { icon: "trophy", value: stats.correctAnswers, label: stats.correctAnswers === 1 ? "acerto nos desafios" : "acertos nos desafios" },
  ];
  if (!compact) items.push({ icon: "bookmark", value: texts.filter((t) => t.saved).length, label: "na biblioteca" });
  return (
    <ul className={`stats ${compact ? "stats-compact" : ""}`}>
      {items.map((item) => (
        <li key={item.label} className="stat">
          <span className="stat-icon">
            <Icon name={item.icon} size={18} />
          </span>
          <strong>{item.value.toLocaleString("pt-BR")}</strong>
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Home() {
  const { account, interests, texts } = useApp();
  const { openMenu } = useOutletContext();
  const active = interests.filter((i) => i.active);
  const recent = texts.slice(0, 3);

  return (
    <div className="page page-home">
      <header className="home-header">
        <button type="button" className="icon-btn menu-btn" onClick={openMenu} aria-label="Abrir menu">
          <Icon name="menu" size={24} />
        </button>
        <div className="home-greeting">
          <h1>Olá, {firstName(account?.name)}!</h1>
          <p>Que bom te ver por aqui!</p>
        </div>
        <Link to="/perfil" className="avatar avatar-md" aria-label="Abrir perfil">
          {account?.avatar}
        </Link>
      </header>

      <Link to="/gerar" className="hero-card">
        <div className="hero-card-art">
          <HeroArt />
        </div>
        <div className="hero-card-copy">
          <h2>Seus interesses geram grandes histórias.</h2>
          <p>Vamos transformar o que você gosta em aprendizado?</p>
          <span className="round-arrow" aria-hidden="true">
            <Icon name="chevron" size={20} strokeWidth={2.5} />
          </span>
        </div>
      </Link>

      <div className="home-grid">
        <div className="home-main">
          <section aria-labelledby="interesses-titulo">
            <div className="section-head">
              <h2 id="interesses-titulo">Seus interesses</h2>
              <Link to="/interesses">Editar</Link>
            </div>
            <ul className="interest-strip">
              {active.map((interest) => (
                <li key={interest.id}>
                  <Link to={`/gerar?interesse=${interest.id}`} className="interest-card">
                    <span className="interest-emoji" aria-hidden="true">
                      {interest.emoji}
                    </span>
                    <span className="interest-name">{interest.name}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/interesses/adicionar" className="interest-card interest-add">
                  <span className="interest-emoji" aria-hidden="true">
                    <Icon name="plus" size={28} />
                  </span>
                  <span className="interest-name">Adicionar</span>
                </Link>
              </li>
            </ul>
          </section>

          <Link to="/gerar" className="cta-card only-mobile">
            <span className="cta-icon" aria-hidden="true">
              <Icon name="sparkles" />
            </span>
            <span className="cta-text">
              <strong>Gerar novo conteúdo</strong>
              <small>Crie um texto e uma ilustração com base nos seus interesses.</small>
            </span>
            <Icon name="chevron" />
          </Link>

          {recent.length > 0 && (
            <section aria-labelledby="recentes-titulo">
              <div className="section-head">
                <h2 id="recentes-titulo">Continue lendo</h2>
                <Link to="/meus-textos">Ver todos</Link>
              </div>
              <ul className="text-list">
                {recent.map((text) => (
                  <TextRow key={text.id} text={text} />
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="home-side">
          <section className="panel only-desktop" aria-labelledby="criar-titulo">
            <h2 id="criar-titulo">Criar agora</h2>
            <ul className="quick-types">
              {CONTENT_TYPES.map((type) => (
                <li key={type.id}>
                  <Link to={`/gerar?tipo=${type.id}`} className="quick-type">
                    <span className={`type-icon tone-${type.tone}`} aria-hidden="true">
                      <Icon name={type.icon} size={20} />
                    </span>
                    <span>{type.label}</span>
                    <Icon name="chevron" size={18} />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="panel" aria-labelledby="leitura-titulo">
            <h2 id="leitura-titulo">Sua leitura</h2>
            <ReadingStats compact />
          </section>
        </aside>
      </div>
    </div>
  );
}
