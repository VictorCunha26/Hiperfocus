// A conta do protótipo fica salva só neste aparelho. Guardamos apenas o
// resumo (hash) da senha, nunca a senha em si.
export async function hashPassword(email, password) {
  const data = new TextEncoder().encode(`hiperfocus:${email.trim().toLowerCase()}:${password}`);
  if (globalThis.crypto?.subtle) {
    const digest = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
  }
  // Navegadores sem crypto.subtle (ex.: acesso por IP sem HTTPS): resumo simples.
  let h = 2166136261;
  for (const byte of data) h = Math.imul(h ^ byte, 16777619);
  return `fnv-${(h >>> 0).toString(16)}`;
}
