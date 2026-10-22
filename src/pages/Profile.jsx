import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo, Waves } from "../components/art.jsx";
import Icon from "../components/Icon.jsx";
import ReadingControls from "../components/ReadingControls.jsx";
import { PageHeader, Segmented, Sheet, Switch, useGoBack, useToast } from "../components/ui.jsx";
import { AVATARS, LEVELS, levelLabel } from "../lib/content.js";
import { useApp } from "../state/AppContext.jsx";
import { ReadingStats } from "./Home.jsx";

const THEMES = [
  { value: "claro", label: "Claro" },
  { value: "escuro", label: "Escuro" },
  { value: "sistema", label: "Automático" },
];

function SettingRow({ icon, label, value, to, onClick }) {
  const content = (
    <>
      <span className="setting-icon" aria-hidden="true">
        <Icon name={icon} size={20} />
      </span>
      <span className="setting-label">{label}</span>
      {value && <span className="setting-value">{value}</span>}
      <Icon name="chevron" size={18} className="setting-chevron" />
    </>
  );
  return (
    <li>
      {to ? (
        <Link to={to} className="setting-row">
          {content}
        </Link>
      ) : (
        <button type="button" className="setting-row" onClick={onClick}>
          {content}
        </button>
      )}
    </li>
  );
}

export function Profile() {
  const { account, interests, prefs, setPrefs, logout, reset } = useApp();
  const navigate = useNavigate();
  const [themeOpen, setThemeOpen] = useState(false);
  const activeCount = interests.filter((i) => i.active).length;

  return (
    <div className="page page-narrow page-profile">
      <header className="profile-head">
        <span className="avatar avatar-xl" aria-hidden="true">
          {account?.avatar}
        </span>
        <div>
          <h1>{account?.name}</h1>
          <p className="muted">Nível {levelLabel(account?.level).toLowerCase()}{account?.age ? ` · ${account.age} anos` : ""}</p>
          <Link to="/perfil/editar" className="link-strong">
            Editar perfil
          </Link>
        </div>
        <Link to="/leitura" className="icon-btn profile-settings" aria-label="Leitura e acessibilidade">
          <Icon name="settings" />
        </Link>
      </header>

      <section className="panel" aria-labelledby="conquistas">
        <h2 id="conquistas">Minhas conquistas</h2>
        <ReadingStats />
      </section>

      <ul className="settings-list">
        <SettingRow icon="star" label="Meus interesses" value={`${activeCount} ${activeCount === 1 ? "selecionado" : "selecionados"}`} to="/interesses" />
        <SettingRow icon="level" label="Nível de leitura" value={levelLabel(account?.level)} to="/perfil/editar" />
        <SettingRow icon="type" label="Leitura e acessibilidade" to="/leitura" />
        <SettingRow
          icon={prefs.theme === "escuro" ? "moon" : "sun"}
          label="Aparência"
          value={`Tema ${THEMES.find((t) => t.value === prefs.theme)?.label.toLowerCase()}`}
          onClick={() => setThemeOpen(true)}
        />
        <SettingRow icon="help" label="Ajuda e suporte" to="/ajuda" />
        <SettingRow icon="info" label="Sobre o Hiperfocus" to="/sobre" />
      </ul>

      <div className="profile-actions">
        <button
          type="button"
          className="btn btn-outline btn-block"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <Icon name="logout" size={20} />
          Sair da conta
        </button>
        <button
          type="button"
          className="link-danger"
          onClick={() => {
            if (window.confirm("Apagar a conta, os interesses e todos os textos deste aparelho? Isso não pode ser desfeito.")) {
              reset();
              navigate("/");
            }
          }}
        >
          Apagar todos os dados deste aparelho
        </button>
      </div>

      <div className="encourage" aria-hidden="true">
        <p>
          Você consegue!
          <br />E o Hiperfocus está aqui para te ajudar.
        </p>
        <Icon name="heart" size={22} />
        <Waves />
      </div>

      <Sheet open={themeOpen} onClose={() => setThemeOpen(false)} title="Aparência">
        <Segmented label="Tema" value={prefs.theme} onChange={(theme) => setPrefs({ theme })} options={THEMES} />
        <p className="muted">No modo automático, o app segue o tema claro ou escuro do aparelho.</p>
      </Sheet>
    </div>
  );
}

export function EditProfile() {
  const { account, updateAccount } = useApp();
  const goBack = useGoBack("/perfil");
  const toast = useToast();
  const [form, setForm] = useState({
    name: account?.name || "",
    age: account?.age || "",
    level: account?.level || "intermediario",
    guardian: account?.guardian || "",
    avatar: account?.avatar || "🧒",
  });
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (event) => {
    event.preventDefault();
    if (!form.name.trim()) return;
    updateAccount({ ...form, name: form.name.trim(), age: form.age ? Number(form.age) : null });
    toast("Perfil atualizado!", "success");
    goBack();
  };

  return (
    <div className="page page-narrow">
      <PageHeader title="Editar perfil" fallback="/perfil" />
      <form className="form" onSubmit={submit}>
        <div className="field field-labeled">
          <span className="field-label">Avatar</span>
          <div className="avatar-picker" role="radiogroup" aria-label="Avatar">
            {AVATARS.map((avatar) => (
              <button
                key={avatar}
                type="button"
                role="radio"
                aria-checked={form.avatar === avatar}
                className={`avatar avatar-md ${form.avatar === avatar ? "active" : ""}`}
                onClick={() => set("avatar")(avatar)}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
        <div className="form-row">
          <label className="field field-labeled">
            <span className="field-label">Nome de quem lê</span>
            <span className="field-box">
              <input value={form.name} onChange={(e) => set("name")(e.target.value)} required />
            </span>
          </label>
          <label className="field field-labeled field-age">
            <span className="field-label">Idade</span>
            <span className="field-box">
              <input type="number" inputMode="numeric" min="3" max="99" value={form.age} onChange={(e) => set("age")(e.target.value)} placeholder="Opcional" />
            </span>
          </label>
        </div>
        <fieldset className="field field-labeled level-cards">
          <legend className="field-label">Nível de leitura</legend>
          {LEVELS.map((level) => (
            <label key={level.value} className={`level-card ${form.level === level.value ? "active" : ""}`}>
              <input type="radio" name="level" value={level.value} checked={form.level === level.value} onChange={() => set("level")(level.value)} />
              <strong>{level.label}</strong>
              <small>{level.description}</small>
            </label>
          ))}
        </fieldset>
        <label className="field field-labeled">
          <span className="field-label">Nome do responsável (opcional)</span>
          <span className="field-box">
            <input value={form.guardian} onChange={(e) => set("guardian")(e.target.value)} />
          </span>
        </label>
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Salvar
        </button>
      </form>
    </div>
  );
}

export function ReadingPrefs() {
  const { prefs, setPrefs } = useApp();
  return (
    <div className="page page-narrow">
      <PageHeader
        title="Leitura e acessibilidade"
        fallback="/perfil"
        subtitle="Deixe a leitura do jeito mais confortável. As mudanças aparecem na prévia e em todos os textos."
      />
      <div className="panel">
        <ReadingControls showPreview />
      </div>
      <div className="panel">
        <div className="control">
          <span className="field-label">Aparência</span>
          <Segmented label="Tema" value={prefs.theme} onChange={(theme) => setPrefs({ theme })} options={THEMES} />
        </div>
        <Switch
          checked={prefs.reduceMotion}
          onChange={(reduceMotion) => setPrefs({ reduceMotion })}
          label="Reduzir animações"
          description="Deixa as transições mais calmas, sem movimentos na tela."
        />
      </div>
    </div>
  );
}

const FAQ = [
  {
    q: "Como escolher bons interesses?",
    a: "Pense nos assuntos de que a pessoa mais fala, nos desenhos, jogos e brinquedos favoritos. Quanto mais específico, melhor: em vez de só “animais”, experimente “tubarões” ou “gatos”.",
  },
  {
    q: "Qual nível de leitura devo escolher?",
    a: "Comece pelo nível em que a leitura fica confortável, sem cansar. Iniciante usa frases curtas; Intermediário traz textos médios com algumas palavras novas; Avançado traz textos mais longos. Você pode mudar o nível a qualquer momento em Perfil.",
  },
  {
    q: "O que são as Situações do dia a dia?",
    a: "São histórias que ajudam a se preparar para momentos da rotina, como ir ao dentista ou cortar o cabelo. Elas explicam os passos da situação, usando o tema de interesse como ponte, e terminam de forma tranquilizadora.",
  },
  {
    q: "Como funcionam o “Ouvir” e o “Modo foco”?",
    a: "Em qualquer texto, toque em “Ouvir” para que o aparelho leia em voz alta, destacando a frase que está sendo lida. O “Modo foco” mostra um parágrafo de cada vez, deixando os outros mais claros, para ajudar na concentração.",
  },
  {
    q: "Os textos criados pela IA são sempre corretos?",
    a: "A IA é orientada a usar fatos corretos e linguagem clara, mas pode errar. Recomendamos que um responsável leia junto, principalmente no começo, e converse sobre o que foi lido.",
  },
  {
    q: "Onde ficam os meus dados?",
    a: "Nesta versão, a conta, os interesses e os textos ficam salvos somente neste aparelho. Para gerar os textos, o tema escolhido, o nível de leitura e o primeiro nome (nas histórias do dia a dia) são enviados ao serviço de IA.",
  },
];

export function Help() {
  return (
    <div className="page page-narrow">
      <PageHeader title="Ajuda e suporte" fallback="/perfil" subtitle="Respostas para as dúvidas mais comuns de quem usa o Hiperfocus." />
      <div className="faq">
        {FAQ.map((item) => (
          <details key={item.q}>
            <summary>
              {item.q}
              <Icon name="chevron" size={18} />
            </summary>
            <p>{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export function About() {
  return (
    <div className="page page-narrow">
      <PageHeader title="Sobre o Hiperfocus" fallback="/perfil" />
      <div className="about">
        <Logo size={56} />
        <p>
          O Hiperfocus usa o <strong>hiperfoco</strong> de pessoas com Transtorno do Espectro Autista (TEA) como ferramenta para
          estimular o interesse, o engajamento e o desenvolvimento da leitura.
        </p>
        <p>
          O responsável cadastra os principais interesses e temas de hiperfoco. Com base nessas informações, a Inteligência
          Artificial gera textos personalizados, com conteúdos educativos e situações do cotidiano, além de ilustrações
          relacionadas ao conteúdo.
        </p>
        <p>
          Assim, interesses que já fazem parte do dia a dia se transformam em recursos de apoio à aprendizagem, tornando a leitura
          mais motivadora, acessível e significativa.
        </p>
        <ul className="about-list">
          <li>
            <Icon name="sparkles" size={20} /> Textos e ilustrações criados a partir dos interesses
          </li>
          <li>
            <Icon name="volume" size={20} /> Leitura em voz alta com destaque da frase
          </li>
          <li>
            <Icon name="focus" size={20} /> Modo foco, letra ajustável e tema escuro
          </li>
          <li>
            <Icon name="smile" size={20} /> Histórias para situações do dia a dia
          </li>
        </ul>
        <p className="muted">Versão 1.0</p>
      </div>
    </div>
  );
}
