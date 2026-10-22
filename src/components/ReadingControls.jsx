import { speakSample, speechSupported } from "../lib/speech.js";
import { useApp } from "../state/AppContext.jsx";
import Icon from "./Icon.jsx";
import { Segmented } from "./ui.jsx";

const FONTS = [
  { value: "nunito", label: "Padrão", family: "var(--font-nunito)" },
  { value: "lexend", label: "Lexend", family: "var(--font-lexend)" },
  { value: "atkinson", label: "Atkinson", family: "var(--font-atkinson)" },
];

const SPACING = [
  { value: 1.5, label: "Normal" },
  { value: 1.75, label: "Ampla" },
  { value: 2.05, label: "Extra" },
];

export default function ReadingControls({ showPreview = false }) {
  const { prefs, setPrefs } = useApp();
  return (
    <div className="reading-controls">
      {showPreview && (
        <div className="reading-preview reader-text" aria-label="Prévia do texto">
          <p>
            O Tiranossauro Rex viveu há milhões de anos. Ele tinha dentes enormes e pernas muito fortes.
          </p>
        </div>
      )}

      <div className="control">
        <div className="control-head">
          <span className="field-label" id="tamanho-label">
            Tamanho da letra
          </span>
          <span className="control-value">{prefs.fontSize}px</span>
        </div>
        <div className="range-row">
          <button
            type="button"
            className="icon-btn icon-btn-soft"
            aria-label="Diminuir letra"
            onClick={() => setPrefs({ fontSize: Math.max(16, prefs.fontSize - 2) })}
          >
            <span className="a-small">A</span>
          </button>
          <input
            type="range"
            min="16"
            max="32"
            step="1"
            value={prefs.fontSize}
            aria-labelledby="tamanho-label"
            onChange={(e) => setPrefs({ fontSize: Number(e.target.value) })}
          />
          <button
            type="button"
            className="icon-btn icon-btn-soft"
            aria-label="Aumentar letra"
            onClick={() => setPrefs({ fontSize: Math.min(32, prefs.fontSize + 2) })}
          >
            <span className="a-large">A</span>
          </button>
        </div>
      </div>

      <div className="control">
        <span className="field-label">Tipo de letra</span>
        <div className="font-options" role="radiogroup" aria-label="Tipo de letra">
          {FONTS.map((font) => (
            <button
              key={font.value}
              type="button"
              role="radio"
              aria-checked={prefs.font === font.value}
              className={`font-option ${prefs.font === font.value ? "active" : ""}`}
              onClick={() => setPrefs({ font: font.value })}
            >
              <span style={{ fontFamily: font.family }} className="font-sample">
                Aa
              </span>
              {font.label}
            </button>
          ))}
        </div>
      </div>

      <div className="control">
        <span className="field-label">Espaço entre as linhas</span>
        <Segmented
          label="Espaço entre as linhas"
          value={SPACING.reduce((best, s) => (Math.abs(s.value - prefs.lineHeight) < Math.abs(best.value - prefs.lineHeight) ? s : best)).value}
          onChange={(value) => setPrefs({ lineHeight: value })}
          options={SPACING}
        />
      </div>

      {speechSupported && (
        <div className="control">
          <div className="control-head">
            <span className="field-label" id="voz-label">
              Velocidade da voz
            </span>
            <span className="control-value">{prefs.voiceRate.toFixed(1)}×</span>
          </div>
          <div className="range-row">
            <span className="range-end">Devagar</span>
            <input
              type="range"
              min="0.6"
              max="1.4"
              step="0.1"
              value={prefs.voiceRate}
              aria-labelledby="voz-label"
              onChange={(e) => setPrefs({ voiceRate: Number(e.target.value) })}
            />
            <span className="range-end">Rápido</span>
          </div>
          <button
            type="button"
            className="btn btn-soft btn-sm"
            onClick={() => speakSample("Olá! Esta é a voz que vai ler os seus textos.", prefs.voiceRate)}
          >
            <Icon name="volume" size={18} />
            Testar voz
          </button>
        </div>
      )}
    </div>
  );
}
