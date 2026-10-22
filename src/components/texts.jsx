import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { typeInfo } from "../lib/content.js";
import { formatDate } from "../lib/text.js";
import { useApp } from "../state/AppContext.jsx";
import Icon from "./Icon.jsx";
import Scene from "./Scene.jsx";
import { useToast } from "./ui.jsx";

const svgUri = (svg) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export function Illustration({ text, className = "", showStatus = false }) {
  const interest = { id: text.interestId, name: text.interestName, emoji: text.emoji };
  const label = `Ilustração sobre ${text.interestName}: ${text.title}`;
  if (text.illustration?.status === "done" && text.illustration.svg) {
    return <img className={`illustration ${className}`} src={svgUri(text.illustration.svg)} alt={label} />;
  }
  return (
    <div className={`illustration ${className}`}>
      <Scene interest={interest} seed={text.id} label={label} />
      {showStatus && text.illustration?.status === "pending" && (
        <div className="illustration-status">
          <span className="spinner" aria-hidden="true" />
          Desenhando a ilustração…
        </div>
      )}
    </div>
  );
}

export function TextThumb({ text }) {
  if (text.illustration) return <Illustration text={text} className="thumb" />;
  const tone = typeInfo(text.type).tone;
  return (
    <div className={`thumb thumb-tile tone-${tone}`} aria-hidden="true">
      <span>{text.emoji}</span>
    </div>
  );
}

function RowMenu({ text }) {
  const { updateText, deleteText } = useApp();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const close = (event) => !ref.current?.contains(event.target) && setOpen(false);
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", close);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="row-menu" ref={ref}>
      <button
        type="button"
        className="icon-btn"
        aria-label={`Opções de “${text.title}”`}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="more" />
      </button>
      {open && (
        <div className="menu" role="menu">
          <button
            type="button"
            role="menuitem"
            onClick={() => {
              updateText(text.id, { saved: !text.saved });
              toast(text.saved ? "Removido da biblioteca" : "Salvo na biblioteca", "success");
              setOpen(false);
            }}
          >
            <Icon name="bookmark" size={18} />
            {text.saved ? "Remover da biblioteca" : "Salvar na biblioteca"}
          </button>
          <button
            type="button"
            role="menuitem"
            className="danger"
            onClick={() => {
              if (window.confirm(`Excluir “${text.title}”?`)) {
                deleteText(text.id);
                toast("Texto excluído");
              }
              setOpen(false);
            }}
          >
            <Icon name="trash" size={18} />
            Excluir
          </button>
        </div>
      )}
    </div>
  );
}

export function TextRow({ text }) {
  return (
    <li className="text-row">
      <Link to={`/texto/${text.id}`} className="text-row-link">
        <TextThumb text={text} />
        <div className="text-row-body">
          <h3>{text.title}</h3>
          <span className="reader-chips">
            {text.theme && <span className="chip chip-sm chip-theme">📚 {text.theme}</span>}
            <span className="chip chip-sm">
              <span aria-hidden="true">{text.emoji}</span> {text.interestName}
            </span>
          </span>
          <span className="meta">
            {formatDate(text.createdAt)} · {typeInfo(text.type).label}
            {text.readAt && (
              <span className="read-badge">
                <Icon name="check" size={14} /> Lido
              </span>
            )}
          </span>
        </div>
      </Link>
      <RowMenu text={text} />
    </li>
  );
}
