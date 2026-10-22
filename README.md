# Hiperfocus

Aplicativo que usa o **hiperfoco** de pessoas com Transtorno do Espectro Autista (TEA) para estimular a leitura.
O responsável cadastra os interesses de quem vai ler e a Inteligência Artificial cria textos e ilustrações
personalizados sobre esses temas, adaptados ao nível de leitura.

Funciona no **celular** e no **computador** (layout responsivo): no celular, barra de navegação inferior;
a partir de 960 px de largura, menu lateral e telas em colunas. Também pode ser instalado na tela inicial
do celular (PWA).

## Como rodar

Requisitos: Node.js 20.19 ou mais novo.

```bash
npm install
npm run dev
```

Abra http://localhost:5180. O comando sobe o site (Vite, porta 5180) e a API (Express, porta 3001).

### Ligar a IA

1. Copie `.env.example` para `.env`.
2. Crie uma chave gratuita do Google Gemini em https://aistudio.google.com/apikey e preencha `GEMINI_API_KEY`.
3. Reinicie o `npm run dev`.

Sem a chave, o app funciona em **modo demonstração**: usa textos de exemplo (dinossauros, espaço, futebol,
jogos, música, tecnologia, natureza, robôs, aviões, oceano e animais) e ilustrações montadas no aparelho.

### Testar no celular

Com o celular na mesma rede Wi-Fi do computador:

```bash
npm run dev:celular
```

e abra no celular o endereço "Network" que aparecer no terminal (ex.: `http://192.168.0.10:5180`).

### Produção

```bash
npm run build
npm start
```

O mesmo servidor entrega o site e a API em http://localhost:3001 (ou na porta definida em `PORT`).

## Funcionalidades

- **Conta e interesses**: cadastro feito pelo responsável, com nome, idade, nível de leitura e temas de hiperfoco.
- **Tema escolar + hiperfoco**: escolha um tema (ex.: História do Brasil) e o texto ensina esse tema usando o
  hiperfoco (ex.: dinossauros) como ponte — narrador, comparações e exemplos — sem alterar os fatos ensinados
  na escola. Quando o hiperfoco não tem relação real com o tema, o texto deixa claro que aquela parte é imaginação.
- **Cinco tipos de conteúdo**: Texto, Texto + Ilustração, Dica do dia, Desafio de leitura (com perguntas)
  e Situações do dia a dia (histórias sociais, ex.: "ir ao dentista").
- **Leitura acessível**: ouvir o texto em voz alta com destaque da frase lida, modo foco (um parágrafo por vez),
  tamanho e tipo de letra (Nunito, Lexend, Atkinson Hyperlegible), espaçamento, tema escuro e animações reduzidas.
- **Apoio ao vocabulário**: seção "Você sabia?" e "Palavras novas" em cada texto.
- **Biblioteca e histórico**: textos salvos, busca, filtros e conquistas de leitura.

## Estrutura

```
server/            API (Express)
  ai.js            chamadas ao Gemini: texto (JSON estruturado) e ilustração (SVG)
  fallback.js      textos de exemplo do modo demonstração
  index.js         rotas /api/conteudo, /api/ilustracao e /api/status
src/
  pages/           telas (boas-vindas, entrar, início, gerar, leitura, biblioteca, perfil...)
  components/      menu, ícones, ilustrações, janelas e controles de leitura
  state/           estado do app salvo no aparelho (localStorage)
  lib/             interesses, voz, utilidades de texto
```

## Observações

- Nesta versão, a conta e os textos ficam salvos **somente no aparelho** (navegador). Login em vários
  aparelhos, recuperação de senha e "Entrar com o Google" precisam de um backend com banco de dados.
- Os textos são gerados por IA e podem conter erros: recomenda-se que o responsável acompanhe a leitura.
- As ilustrações da IA são desenhos em SVG, limpos pelo servidor antes de chegar ao app.
