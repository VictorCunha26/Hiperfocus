// Carrega as variáveis do arquivo .env (se existir) antes dos outros módulos.
try {
  process.loadEnvFile();
} catch {
  // Sem .env: seguimos com as variáveis do sistema.
}
