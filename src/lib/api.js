async function post(path, body, signal) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Não foi possível falar com o servidor.");
  return data;
}

export function requestContent(payload, signal) {
  return post("/api/conteudo", payload, signal);
}

export function requestIllustration(payload) {
  return post("/api/ilustracao", payload);
}

export async function fetchStatus() {
  const response = await fetch("/api/status");
  if (!response.ok) throw new Error("offline");
  return response.json();
}
