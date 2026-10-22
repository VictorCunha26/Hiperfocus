import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeroArt, Logo, Waves } from "../components/art.jsx";
import Icon, { GoogleIcon } from "../components/Icon.jsx";
import { PageHeader, Segmented, Sheet, useToast } from "../components/ui.jsx";
import { LEVELS } from "../lib/content.js";
import { useApp } from "../state/AppContext.jsx";

const TAGLINE = "Seus interesses também são um caminho para aprender.";
const INTRO = "Textos e ilustrações personalizados para tornar a leitura mais leve, interessante e significativa.";

function AuthLayout({ children }) {
  return (
    <div className="auth">
      <aside className="auth-brand" aria-hidden="true">
        <Logo size={46} className="logo-light" />
        <h2>{TAGLINE}</h2>
        <p>{INTRO}</p>
        <ul className="floating-chips">
          <li>🦖 Dinossauros</li>
          <li>🪐 Espaço</li>
          <li>⚽ Futebol</li>
          <li>🎮 Jogos</li>
        </ul>
        <Waves className="auth-waves" />
      </aside>
      <main className="auth-main">
        <div className="auth-card">{children}</div>
      </main>
    </div>
  );
}

export function Welcome() {
  const navigate = useNavigate();
  return (
    <div className="welcome">
      <div className="welcome-inner">
        <div className="welcome-copy">
          <Logo size={64} className="welcome-logo" />
          <h1>{TAGLINE}</h1>
          <p>{INTRO}</p>
          <div className="welcome-actions">
            <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => navigate("/criar-conta")}>
              Começar
            </button>
            <Link to="/entrar" className="link-strong">
              Já tenho uma conta
            </Link>
          </div>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <div className="welcome-art-card">
            <HeroArt />
          </div>
          <span className="bubble bubble-1">🦖</span>
          <span className="bubble bubble-2">🪐</span>
          <span className="bubble bubble-3">⚽</span>
          <span className="bubble bubble-4">🎮</span>
        </div>
      </div>
      <Waves className="welcome-waves" />
    </div>
  );
}

function Field({ icon, label, children, error }) {
  return (
    <label className={`field ${error ? "field-error" : ""}`}>
      <span className="sr-only">{label}</span>
      <span className="field-box">
        {icon && <Icon name={icon} size={20} className="field-icon" />}
        {children}
      </span>
    </label>
  );
}

function PasswordInput({ value, onChange, autoComplete, placeholder = "Senha" }) {
  const [visible, setVisible] = useState(false);
  return (
    <span className="field-box">
      <Icon name="lock" size={20} className="field-icon" />
      <input
        type={visible ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-label={placeholder}
        required
      />
      <button
        type="button"
        className="icon-btn icon-btn-sm"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Esconder senha" : "Mostrar senha"}
      >
        <Icon name={visible ? "eyeOff" : "eye"} size={20} />
      </button>
    </span>
  );
}

export function Login() {
  const { login, reset } = useApp();
  const navigate = useNavigate();
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setBusy(true);
    const problem = await login(email, password);
    setBusy(false);
    if (problem) setError(problem);
    else navigate("/inicio");
  }

  return (
    <AuthLayout>
      <PageHeader title="Entrar" subtitle="Acesse sua conta para continuar com o Hiperfocus." backTo="/" />
      <form className="form" onSubmit={submit} noValidate>
        <Field icon="user" label="E-mail">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail"
            autoComplete="email"
            required
          />
        </Field>
        <label className="field">
          <span className="sr-only">Senha</span>
          <PasswordInput value={password} onChange={setPassword} autoComplete="current-password" />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={busy || !email || !password}>
          Entrar
        </button>
        <button type="button" className="link-strong center" onClick={() => setForgotOpen(true)}>
          Esqueci minha senha
        </button>
        <div className="divider">
          <span>ou</span>
        </div>
        <button
          type="button"
          className="btn btn-outline btn-lg btn-block"
          onClick={() => toast("O login com Google estará disponível na versão online do Hiperfocus.")}
        >
          <GoogleIcon />
          Entrar com o Google
        </button>
        <p className="form-foot">
          Não tem uma conta? <Link to="/criar-conta">Criar conta</Link>
        </p>
      </form>

      <Sheet open={forgotOpen} onClose={() => setForgotOpen(false)} title="Esqueci minha senha">
        <p className="muted">
          Nesta versão, a conta e os textos ficam salvos somente neste aparelho, por isso não é possível enviar um e-mail
          de recuperação.
        </p>
        <p className="muted">
          Se você não lembra a senha, pode apagar os dados deste aparelho e criar uma conta nova. Os textos salvos serão
          perdidos.
        </p>
        <button
          type="button"
          className="btn btn-danger btn-block"
          onClick={() => {
            if (window.confirm("Apagar todos os dados deste aparelho e criar uma nova conta?")) {
              reset();
              navigate("/criar-conta");
            }
          }}
        >
          Apagar dados e criar nova conta
        </button>
      </Sheet>
    </AuthLayout>
  );
}

export function Signup() {
  const { signup, account } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", age: "", level: "intermediario", guardian: "", email: "", password: "" });
  const [error, setError] = useState("");
  const set = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  async function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return setError("Escreva o nome de quem vai ler.");
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError("Escreva um e-mail válido.");
    if (form.password.length < 6) return setError("A senha precisa ter pelo menos 6 caracteres.");
    if (account && !window.confirm("Já existe uma conta neste aparelho. Criar uma nova vai substituir a anterior. Continuar?")) {
      return undefined;
    }
    await signup(form);
    navigate("/interesses?inicio=1");
    return undefined;
  }

  return (
    <AuthLayout>
      <PageHeader title="Criar conta" subtitle="O responsável pode criar a conta e cadastrar os interesses de quem vai ler." backTo="/" />
      <form className="form" onSubmit={submit} noValidate>
        <div className="form-row">
          <label className="field field-labeled">
            <span className="field-label">Nome de quem vai ler</span>
            <span className="field-box">
              <Icon name="user" size={20} className="field-icon" />
              <input value={form.name} onChange={(e) => set("name")(e.target.value)} placeholder="Ex.: Lucas Silva" autoComplete="name" required />
            </span>
          </label>
          <label className="field field-labeled field-age">
            <span className="field-label">Idade</span>
            <span className="field-box">
              <input
                type="number"
                inputMode="numeric"
                min="3"
                max="99"
                value={form.age}
                onChange={(e) => set("age")(e.target.value)}
                placeholder="Opcional"
              />
            </span>
          </label>
        </div>
        <div className="field field-labeled">
          <span className="field-label" id="nivel-label">
            Nível de leitura
          </span>
          <Segmented
            label="Nível de leitura"
            value={form.level}
            onChange={set("level")}
            options={LEVELS.map((l) => ({ value: l.value, label: l.label }))}
          />
          <span className="field-hint">{LEVELS.find((l) => l.value === form.level).description}</span>
        </div>
        <label className="field field-labeled">
          <span className="field-label">Nome do responsável (opcional)</span>
          <span className="field-box">
            <Icon name="heart" size={20} className="field-icon" />
            <input value={form.guardian} onChange={(e) => set("guardian")(e.target.value)} placeholder="Ex.: Ana Silva" />
          </span>
        </label>
        <label className="field field-labeled">
          <span className="field-label">E-mail</span>
          <span className="field-box">
            <Icon name="mail" size={20} className="field-icon" />
            <input type="email" value={form.email} onChange={(e) => set("email")(e.target.value)} placeholder="E-mail" autoComplete="email" required />
          </span>
        </label>
        <label className="field field-labeled">
          <span className="field-label">Senha</span>
          <PasswordInput value={form.password} onChange={set("password")} autoComplete="new-password" placeholder="Pelo menos 6 caracteres" />
        </label>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn-primary btn-lg btn-block">
          Criar conta
        </button>
        <p className="form-foot">
          Já tem uma conta? <Link to="/entrar">Entrar</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
