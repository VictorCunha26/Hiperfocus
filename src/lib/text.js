// Utilidades de texto e datas.

export function splitSentences(paragraph) {
  const parts = String(paragraph).match(/[^.!?…]+(?:[.!?…]+["”»)]?|$)/g) || [paragraph];
  return parts.map((s) => s.trim()).filter(Boolean);
}

export function countWords(paragraphs = []) {
  return paragraphs.join(" ").split(/\s+/).filter(Boolean).length;
}

export function readingMinutes(paragraphs) {
  // Ritmo tranquilo de leitura para quem está começando: ~90 palavras por minuto.
  return Math.max(1, Math.round(countWords(paragraphs) / 90));
}

export function newId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

const dateFormat = new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric" });

export function formatDate(iso) {
  return dateFormat.format(new Date(iso)).replace(/\./g, "");
}

export function relativeDay(iso) {
  const date = new Date(iso);
  const today = new Date();
  const startOf = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  const diff = Math.round((startOf(today) - startOf(date)) / 86_400_000);
  if (diff === 0) return "Hoje";
  if (diff === 1) return "Ontem";
  if (diff < 7) return "Esta semana";
  return "Antes";
}

export function firstName(name = "") {
  return name.trim().split(/\s+/)[0] || "";
}
