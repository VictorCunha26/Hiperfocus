import { useCallback, useEffect, useState } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { levelLabel } from "../lib/content.js";
import { firstName } from "../lib/text.js";
import { useApp } from "../state/AppContext.jsx";
import { Logo } from "./art.jsx";
import Icon from "./Icon.jsx";

const NAV = [
  { to: "/inicio", label: "Início", icon: "home" },
  { to: "/meus-textos", label: "Meus textos", icon: "book" },
  { to: "/biblioteca", label: "Biblioteca", icon: "library" },
  { to: "/perfil", label: "Perfil", icon: "user" },
];

function NavItems({ onNavigate }) {
  return (
    <ul className="side-nav-list">
      {NAV.map((item) => (
        <li key={item.to}>
          <NavLink to={item.to} className="side-link" onClick={onNavigate}>
            <Icon name={item.icon} />
            {item.label}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

function UserCard() {
  const { account } = useApp();
  return (
    <NavLink to="/perfil" className="user-card">
      <span className="avatar avatar-sm" aria-hidden="true">
        {account?.avatar}
      </span>
      <span>
        <strong>{firstName(account?.name)}</strong>
        <small>Nível {levelLabel(account?.level).toLowerCase()}</small>
      </span>
    </NavLink>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  return (
    <aside className="sidebar" aria-label="Menu principal">
      <NavLink to="/inicio" className="sidebar-logo" aria-label="Hiperfocus, início">
        <Logo size={38} />
      </NavLink>
      <button type="button" className="btn btn-primary btn-block" onClick={() => navigate("/gerar")}>
        <Icon name="sparkles" size={20} />
        Gerar conteúdo
      </button>
      <nav>
        <NavItems />
      </nav>
      <div className="sidebar-foot">
        <NavLink to="/ajuda" className="side-link side-link-sm">
          <Icon name="help" size={20} />
          Ajuda e suporte
        </NavLink>
        <UserCard />
      </div>
    </aside>
  );
}

function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {NAV.map((item) => (
        <NavLink key={item.to} to={item.to} className="bottom-link">
          <Icon name={item.icon} size={24} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function Drawer({ open, onClose }) {
  const { logout } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="drawer-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <div className="drawer-head">
          <Logo size={34} />
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Fechar menu" autoFocus>
            <Icon name="x" />
          </button>
        </div>
        <UserCard />
        <nav>
          <NavItems onNavigate={onClose} />
        </nav>
        <hr />
        <ul className="side-nav-list">
          {[
            { to: "/gerar", label: "Gerar conteúdo", icon: "sparkles" },
            { to: "/interesses", label: "Meus interesses", icon: "star" },
            { to: "/leitura", label: "Leitura e acessibilidade", icon: "type" },
            { to: "/ajuda", label: "Ajuda e suporte", icon: "help" },
            { to: "/sobre", label: "Sobre o Hiperfocus", icon: "info" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} className="side-link side-link-sm" onClick={onClose}>
                <Icon name={item.icon} size={20} />
                {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              type="button"
              className="side-link side-link-sm"
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              <Icon name="logout" size={20} />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const { pathname } = useLocation();
  const reading = pathname.startsWith("/texto/");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className={`shell ${reading ? "shell-reading" : ""}`}>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <Sidebar />
      <main className="shell-main" id="conteudo">
        <Outlet context={{ openMenu: () => setMenuOpen(true) }} />
      </main>
      {!reading && <BottomNav />}
      <Drawer open={menuOpen} onClose={closeMenu} />
    </div>
  );
}
