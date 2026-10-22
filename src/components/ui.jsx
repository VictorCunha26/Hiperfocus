import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "./Icon.jsx";

/* ---------- Avisos rápidos (toasts) ---------- */

const ToastContext = createContext(() => {});

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const show = useCallback((message, tone = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((list) => [...list.slice(-2), { id, message, tone }]);
    setTimeout(() => setToasts((list) => list.filter((t) => t.id !== id)), 3500);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className="toasts" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.tone}`}>
            {t.tone === "success" && <Icon name="check" size={18} />}
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);

/* ---------- Janela (bottom sheet no celular, diálogo no computador) ---------- */

export function Sheet({ open, onClose, title, children, footer, labelledBy }) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const onKey = (event) => event.key === "Escape" && closeRef.current();
    document.addEventListener("keydown", onKey);
    document.body.classList.add("no-scroll");
    const focusable = panelRef.current?.querySelector("input, button:not(.sheet-close), [tabindex]");
    (focusable || panelRef.current)?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("no-scroll");
      previous?.focus?.();
    };
  }, [open]);

  if (!open) return null;
  const titleId = labelledBy || "sheet-title";
  return (
    <div className="sheet-backdrop" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="sheet" role="dialog" aria-modal="true" aria-labelledby={titleId} ref={panelRef} tabIndex={-1}>
        <div className="sheet-handle" aria-hidden="true" />
        <div className="sheet-head">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-btn sheet-close" onClick={onClose} aria-label="Fechar">
            <Icon name="x" />
          </button>
        </div>
        <div className="sheet-body">{children}</div>
        {footer && <div className="sheet-foot">{footer}</div>}
      </div>
    </div>
  );
}

/* ---------- Cabeçalho das páginas internas ---------- */

export function useGoBack(fallback = "/inicio") {
  const navigate = useNavigate();
  return useCallback(() => {
    if (window.history.state?.idx > 0) navigate(-1);
    else navigate(fallback, { replace: true });
  }, [navigate, fallback]);
}

export function PageHeader({ title, subtitle, back = true, backTo, fallback, actions, eyebrow }) {
  const navigate = useNavigate();
  const goBackInHistory = useGoBack(fallback);
  const goBack = () => (backTo ? navigate(backTo) : goBackInHistory());
  return (
    <header className="page-header">
      <div className="page-header-row">
        {back && (
          <button type="button" className="icon-btn back-btn" onClick={goBack} aria-label="Voltar">
            <Icon name="back" size={24} />
          </button>
        )}
        <div className="page-header-titles">
          {eyebrow}
          <h1>{title}</h1>
        </div>
        {actions && <div className="page-header-actions">{actions}</div>}
      </div>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </header>
  );
}

/* ---------- Outros ---------- */

export function EmptyState({ emoji = "📚", title, children, action }) {
  return (
    <div className="empty">
      <div className="empty-emoji" aria-hidden="true">
        {emoji}
      </div>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
      {action}
    </div>
  );
}

export function Switch({ checked, onChange, label, description }) {
  return (
    <label className="switch-row">
      <span>
        <span className="switch-label">{label}</span>
        {description && <span className="switch-desc">{description}</span>}
      </span>
      <input type="checkbox" role="switch" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="switch" aria-hidden="true" />
    </label>
  );
}

export function Segmented({ value, onChange, options, label }) {
  return (
    <div className="segmented" role="radiogroup" aria-label={label}>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={value === option.value}
          className={value === option.value ? "active" : ""}
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
