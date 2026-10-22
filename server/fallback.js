// Conteúdo de exemplo usado quando a IA não está configurada ou não respondeu.
// Permite testar o aplicativo inteiro sem chave de API.

const LIBRARY = {
  dinossauros: {
    analogy:
      "Os paleontólogos trabalham com calma, escavando um pouquinho de cada vez. Eu também posso ir com calma, um passo de cada vez.",
    texts: [
      {
        title: "O poderoso Tiranossauro Rex",
        paragraphs: [
          "O Tiranossauro Rex, também conhecido como T. rex, viveu há cerca de 68 a 66 milhões de anos, no período Cretáceo. Ele foi um dos maiores dinossauros carnívoros que já existiram.",
          "Um T. rex adulto podia medir cerca de 12 metros de comprimento, mais ou menos o tamanho de um ônibus. Ele podia pesar mais de 7 toneladas, mais do que um elefante africano.",
          "Os braços do T. rex eram curtos, mas fortes. Já as pernas eram enormes e musculosas. A cabeça era grande e tinha dentes que podiam ter o tamanho de uma banana.",
          "Sabemos tudo isso graças aos fósseis, que são restos de animais muito antigos preservados nas rochas. Os paleontólogos estudam esses fósseis como detetives, juntando pistas para descobrir como os dinossauros viviam.",
        ],
        funFact:
          "O T. rex tinha uma das mordidas mais fortes de todos os animais terrestres que já viveram. Os cientistas calculam que ela era várias vezes mais forte que a de um leão.",
        glossary: [
          { word: "Cretáceo", meaning: "Período da história da Terra que terminou há 66 milhões de anos." },
          { word: "Fósseis", meaning: "Restos ou marcas de seres vivos antigos preservados nas rochas." },
          { word: "Paleontólogo", meaning: "Cientista que estuda os fósseis." },
        ],
        questions: [
          { question: "Em que período o T. rex viveu?", options: ["No Cretáceo", "Nos dias de hoje", "Na Idade Média"], answer: 0 },
          { question: "Qual era o tamanho aproximado de um T. rex adulto?", options: ["O tamanho de um gato", "O tamanho de um ônibus", "O tamanho de uma formiga"], answer: 1 },
          { question: "Como os cientistas descobrem como os dinossauros viviam?", options: ["Estudando fósseis", "Assistindo a filmes", "Lendo histórias em quadrinhos"], answer: 0 },
        ],
      },
      {
        title: "Os dinossauros ainda estão entre nós?",
        paragraphs: [
          "Quando pensamos em dinossauros, imaginamos animais gigantes que desapareceram há muito tempo. Mas os cientistas descobriram algo surpreendente: as aves são descendentes dos dinossauros.",
          "Isso quer dizer que o pombo da praça, a galinha e o beija-flor são parentes de dinossauros como o Velociraptor. Eles fazem parte do mesmo grupo de animais, chamado terópodes.",
          "Muitos dinossauros tinham penas. Algumas penas serviam para manter o corpo quente, e outras talvez fossem coloridas para chamar a atenção, como acontece com muitas aves hoje.",
          "Há cerca de 66 milhões de anos, um grande asteroide caiu na Terra e a maioria dos dinossauros desapareceu. Apenas um grupo de dinossauros com penas sobreviveu e deu origem às aves que vemos hoje.",
        ],
        funFact: "O Velociraptor de verdade era do tamanho de um peru e tinha o corpo coberto de penas.",
        glossary: [
          { word: "Descendentes", meaning: "Seres que vieram de outros, como filhos e netos." },
          { word: "Terópodes", meaning: "Grupo de dinossauros que andavam sobre duas patas, como o T. rex." },
          { word: "Asteroide", meaning: "Rocha grande que viaja pelo espaço." },
        ],
        questions: [
          { question: "De quais animais as aves descendem?", options: ["Dos peixes", "Dos dinossauros", "Dos insetos"], answer: 1 },
          { question: "Para que algumas penas dos dinossauros serviam?", options: ["Para manter o corpo quente", "Para nadar mais rápido", "Para cavar buracos"], answer: 0 },
          { question: "O que caiu na Terra há cerca de 66 milhões de anos?", options: ["Uma chuva de neve", "Um grande asteroide", "Um avião"], answer: 1 },
        ],
      },
    ],
    tips: [
      "O Argentinossauro, um dos maiores dinossauros conhecidos, podia ter mais de 30 metros de comprimento. É mais ou menos o comprimento de uma quadra de basquete!",
      "A palavra dinossauro vem do grego e quer dizer “lagarto terrível”. Mas os dinossauros não eram lagartos: eles formavam um grupo próprio de répteis.",
      "No Brasil foram encontrados fósseis de vários dinossauros, como o Staurikosaurus, um dos mais antigos do mundo, descoberto no Rio Grande do Sul.",
    ],
  },

  espaco: {
    analogy:
      "Os astronautas seguem cada etapa da missão com atenção. Eu também posso seguir um passo de cada vez.",
    texts: [
      {
        title: "Uma viagem pelo Sistema Solar",
        paragraphs: [
          "O Sistema Solar é a nossa vizinhança no espaço. No centro dele está o Sol, uma estrela enorme que nos dá luz e calor.",
          "Oito planetas giram ao redor do Sol. Na ordem, do mais perto para o mais longe, eles são: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.",
          "Os quatro primeiros planetas são rochosos, como a Terra. Os quatro últimos são gigantes formados principalmente por gases e gelo. Júpiter é o maior de todos: dentro dele caberiam mais de mil Terras.",
          "A Terra é o único planeta onde sabemos que existe vida. Ela está na distância certa do Sol: nem quente demais, nem fria demais. Por isso, tem água líquida.",
        ],
        funFact:
          "Um dia em Vênus é mais longo que um ano em Vênus. O planeta demora mais para girar em torno de si mesmo do que para dar uma volta completa ao redor do Sol.",
        glossary: [
          { word: "Estrela", meaning: "Bola gigante de gás muito quente que produz luz própria." },
          { word: "Planeta", meaning: "Corpo grande que gira em volta de uma estrela." },
          { word: "Rochoso", meaning: "Feito de rocha, com chão firme." },
        ],
        questions: [
          { question: "O que fica no centro do Sistema Solar?", options: ["A Lua", "O Sol", "Júpiter"], answer: 1 },
          { question: "Qual é o maior planeta do Sistema Solar?", options: ["Júpiter", "Marte", "Mercúrio"], answer: 0 },
          { question: "Por que a Terra tem água líquida?", options: ["Porque está na distância certa do Sol", "Porque é o maior planeta", "Porque não gira"], answer: 0 },
        ],
      },
      {
        title: "Como é a vida de um astronauta?",
        paragraphs: [
          "Astronautas são pessoas treinadas para viajar e trabalhar no espaço. Muitos deles moram por alguns meses na Estação Espacial Internacional, um laboratório que fica girando ao redor da Terra.",
          "Lá em cima, tudo flutua. Por isso, os astronautas dormem em sacos de dormir presos na parede, para não saírem flutuando pela estação durante a noite.",
          "Eles também precisam fazer exercícios por cerca de duas horas todos os dias. Sem a gravidade, os músculos e os ossos ficam fracos se não forem usados.",
          "A estação dá uma volta completa na Terra a cada 90 minutos, mais ou menos. Por isso, os astronautas podem ver cerca de 16 nasceres do sol em um único dia!",
        ],
        funFact: "O primeiro astronauta brasileiro foi Marcos Pontes, que viajou até a Estação Espacial Internacional em 2006.",
        glossary: [
          { word: "Gravidade", meaning: "Força que puxa as coisas em direção ao chão." },
          { word: "Laboratório", meaning: "Lugar onde cientistas fazem experiências." },
          { word: "Flutuar", meaning: "Ficar solto no ar, sem cair." },
        ],
        questions: [
          { question: "Onde os astronautas dormem na estação?", options: ["Em camas comuns", "Em sacos de dormir presos na parede", "No chão"], answer: 1 },
          { question: "Por que os astronautas fazem exercícios todos os dias?", options: ["Para os músculos e ossos não ficarem fracos", "Para a estação andar mais rápido", "Para esquentar a estação"], answer: 0 },
          { question: "Quanto tempo a estação leva para dar uma volta na Terra?", options: ["Cerca de 90 minutos", "Uma semana", "Um ano"], answer: 0 },
        ],
      },
    ],
    tips: [
      "No espaço não há ar para levar o som. Por isso, do lado de fora da nave, tudo é completamente silencioso.",
      "As pegadas deixadas pelos astronautas na Lua podem continuar lá por milhões de anos, porque na Lua não há vento nem chuva para apagá-las.",
      "A luz do Sol leva cerca de 8 minutos para chegar até a Terra.",
    ],
  },

  futebol: {
    analogy:
      "Antes de um jogo, o time combina o que cada jogador vai fazer. Saber o plano me ajuda, assim como ajuda o time.",
    texts: [
      {
        title: "A história do futebol",
        paragraphs: [
          "O futebol é o esporte mais popular do mundo. Ele é jogado por dois times de 11 jogadores, e o objetivo é colocar a bola no gol do adversário usando os pés, a cabeça ou o corpo, sem usar as mãos e os braços.",
          "Jogos com bola existem há milhares de anos em vários lugares do mundo. Mas as regras do futebol moderno foram escritas na Inglaterra, em 1863.",
          "O futebol chegou ao Brasil no fim do século 19. Charles Miller, um brasileiro filho de ingleses, trouxe da Inglaterra as primeiras bolas e o livro de regras, em 1894.",
          "O Brasil é famoso no mundo todo pelo seu futebol. Em 2002, a seleção brasileira se tornou a primeira a conquistar cinco Copas do Mundo.",
        ],
        funFact: "O goleiro é o único jogador que pode tocar a bola com as mãos, mas só dentro da sua grande área.",
        glossary: [
          { word: "Adversário", meaning: "O time que joga contra o seu." },
          { word: "Regras", meaning: "Combinados que todos precisam seguir no jogo." },
          { word: "Seleção", meaning: "Time formado pelos melhores jogadores de um país." },
        ],
        questions: [
          { question: "Quantos jogadores cada time tem em campo?", options: ["5", "11", "20"], answer: 1 },
          { question: "Onde as regras do futebol moderno foram escritas?", options: ["Na Inglaterra", "No Japão", "No Egito"], answer: 0 },
          { question: "Quem trouxe as primeiras bolas de futebol para o Brasil?", options: ["Charles Miller", "Um astronauta", "Um goleiro italiano"], answer: 0 },
        ],
      },
      {
        title: "Como funciona o impedimento?",
        paragraphs: [
          "O impedimento é uma das regras mais famosas do futebol. Ela existe para impedir que um atacante fique o tempo todo parado perto do gol adversário, só esperando a bola.",
          "Um jogador está em posição de impedimento quando, no momento do passe, está mais perto da linha do gol adversário do que a bola e do que o penúltimo defensor. Normalmente, o último defensor é o goleiro.",
          "Estar nessa posição não é falta por si só. O impedimento só é marcado se o jogador participar da jogada, por exemplo, recebendo a bola. E não existe impedimento no próprio campo de defesa.",
          "Quem observa essa regra são os assistentes, que correm na lateral do campo com uma bandeira. Hoje, em muitos campeonatos, o árbitro de vídeo, chamado VAR, ajuda a conferir os lances.",
        ],
        funFact: "Não há impedimento quando o jogador recebe a bola direto de um arremesso lateral, de um tiro de meta ou de um escanteio.",
        glossary: [
          { word: "Atacante", meaning: "Jogador que tenta fazer gols." },
          { word: "Defensor", meaning: "Jogador que tenta impedir os gols do adversário." },
          { word: "Árbitro", meaning: "Pessoa que garante que as regras sejam cumpridas." },
        ],
        questions: [
          { question: "Para que serve a regra do impedimento?", options: ["Para impedir que um atacante fique só esperando a bola perto do gol", "Para o goleiro poder usar as mãos", "Para o jogo durar mais"], answer: 0 },
          { question: "Quem segura a bandeira na lateral do campo?", options: ["O goleiro", "Os assistentes", "O técnico"], answer: 1 },
          { question: "Como se chama o árbitro de vídeo?", options: ["VAR", "GOL", "BOLA"], answer: 0 },
        ],
      },
    ],
    tips: [
      "Uma partida de futebol profissional tem 90 minutos, divididos em dois tempos de 45 minutos.",
      "Uma bola oficial de futebol pesa entre 410 e 450 gramas, mais ou menos o mesmo que uma lata de leite em pó.",
      "Nas partidas internacionais, o campo deve ter entre 100 e 110 metros de comprimento.",
    ],
  },

  jogos: {
    analogy:
      "Em um jogo, passamos uma fase de cada vez. Essa situação também tem fases, e eu posso passar por cada uma delas.",
    texts: [
      {
        title: "Como nasce um videogame",
        paragraphs: [
          "Por trás de cada videogame existe uma equipe de pessoas que trabalha junta por meses ou até anos. Cada pessoa cuida de uma parte do jogo.",
          "Os designers de jogos inventam as regras, as fases e os desafios. Os artistas desenham os personagens e os cenários. Os músicos criam as trilhas e os efeitos sonoros.",
          "Os programadores escrevem o código, que são as instruções que dizem ao computador o que fazer. É o código que faz o personagem pular quando você aperta um botão.",
          "Antes de o jogo ser lançado, os testadores jogam muitas e muitas vezes para encontrar erros, chamados de bugs. Assim, o jogo chega mais divertido e funcionando bem.",
        ],
        funFact:
          "A palavra bug quer dizer inseto em inglês. Em 1947, uma mariposa de verdade foi encontrada presa dentro de um computador, causando um erro!",
        glossary: [
          { word: "Designer", meaning: "Pessoa que planeja como algo vai funcionar e ficar." },
          { word: "Código", meaning: "Instruções escritas para o computador seguir." },
          { word: "Bug", meaning: "Um erro em um programa ou jogo." },
        ],
        questions: [
          { question: "Quem inventa as regras e as fases do jogo?", options: ["Os designers de jogos", "Os testadores", "Os jogadores"], answer: 0 },
          { question: "O que é o código?", options: ["Um desenho", "Instruções que dizem ao computador o que fazer", "Uma música"], answer: 1 },
          { question: "Como se chamam os erros encontrados nos jogos?", options: ["Bugs", "Fases", "Pixels"], answer: 0 },
        ],
      },
      {
        title: "O que são pixels?",
        paragraphs: [
          "Se você olhar bem de perto para uma tela, vai perceber que a imagem é formada por pontinhos minúsculos. Esses pontinhos se chamam pixels.",
          "Cada pixel mostra uma cor só. Juntos, milhares ou milhões de pixels formam as imagens que vemos nos jogos, nos vídeos e nas fotos.",
          "Os primeiros videogames tinham poucos pixels. Por isso, os personagens pareciam feitos de quadradinhos. Esse estilo se chama pixel art e é usado até hoje em muitos jogos.",
          "Uma tela Full HD tem cerca de 2 milhões de pixels. Quanto mais pixels uma tela tem, mais detalhes ela consegue mostrar.",
        ],
        funFact: "Muitas telas criam todas as cores misturando só três cores de luz: vermelho, verde e azul.",
        glossary: [
          { word: "Pixel", meaning: "Pontinho de cor que forma as imagens nas telas." },
          { word: "Minúsculo", meaning: "Muito, muito pequeno." },
          { word: "Pixel art", meaning: "Arte feita com quadradinhos de cor." },
        ],
        questions: [
          { question: "O que são pixels?", options: ["Pontinhos que formam a imagem na tela", "Botões do controle", "Fases do jogo"], answer: 0 },
          { question: "Por que os personagens dos primeiros jogos pareciam feitos de quadradinhos?", options: ["Porque eram de papel", "Porque os jogos tinham poucos pixels", "Porque eram de madeira"], answer: 1 },
          { question: "Quantos pixels tem, mais ou menos, uma tela Full HD?", options: ["Cerca de 2 milhões", "Cerca de 10", "Cerca de 100"], answer: 0 },
        ],
      },
    ],
    tips: [
      "O Tetris foi criado em 1984 por Alexey Pajitnov, um programador que vivia em Moscou.",
      "O personagem Mario apareceu pela primeira vez em 1981, no jogo Donkey Kong. Naquela época, ele se chamava Jumpman!",
      "Muitos jogos usam regras de física para que os objetos caiam, quiquem e rolem de um jeito parecido com o mundo real.",
    ],
  },

  musica: {
    analogy: "Uma música tem começo, meio e fim. Essa situação também tem começo, meio e fim.",
    texts: [
      {
        title: "Como o som chega até você",
        paragraphs: [
          "Todo som começa com uma vibração. Quando você toca a corda de um violão, ela vibra, ou seja, se mexe para frente e para trás muito rápido.",
          "Essa vibração empurra o ar em volta, criando ondas sonoras. As ondas viajam pelo ar até chegar às suas orelhas.",
          "Dentro da orelha, o tímpano vibra junto com as ondas, e o cérebro transforma essas vibrações nos sons que você reconhece: uma voz, uma bateria, um piano.",
          "Vibrações rápidas criam sons agudos, como o de um apito. Vibrações lentas criam sons graves, como o de um tambor grande. A música é a arte de combinar esses sons de um jeito organizado.",
        ],
        funFact: "O som viaja pelo ar a cerca de 340 metros por segundo. Na água, ele é mais de quatro vezes mais rápido!",
        glossary: [
          { word: "Vibração", meaning: "Movimento rápido de vai e vem." },
          { word: "Tímpano", meaning: "Pele fininha dentro da orelha que vibra com o som." },
          { word: "Agudo", meaning: "Som fino, como o de um apito." },
        ],
        questions: [
          { question: "Como todo som começa?", options: ["Com uma vibração", "Com uma cor", "Com um desenho"], answer: 0 },
          { question: "Que parte da orelha vibra junto com as ondas sonoras?", options: ["O tímpano", "O nariz", "O cabelo"], answer: 0 },
          { question: "Que tipo de som as vibrações lentas criam?", options: ["Sons agudos", "Sons graves", "Nenhum som"], answer: 1 },
        ],
      },
    ],
    tips: [
      "O piano tem 88 teclas: 52 brancas e 36 pretas.",
      "Heitor Villa-Lobos é um dos compositores brasileiros mais conhecidos do mundo. Ele misturava a música clássica com ritmos do Brasil.",
    ],
  },

  tecnologia: {
    analogy: "Um computador segue instruções passo a passo. Eu também posso seguir os passos, um de cada vez.",
    texts: [
      {
        title: "Como funciona a internet?",
        paragraphs: [
          "A internet é uma rede gigante que liga computadores, celulares e outros aparelhos do mundo inteiro. Com ela, os aparelhos conseguem trocar informações entre si.",
          "Quando você abre um vídeo, seu aparelho envia um pedido para outro computador, chamado servidor, que guarda esse vídeo. O servidor responde enviando o vídeo em pedacinhos, chamados pacotes.",
          "Os pacotes viajam por cabos, antenas e até por cabos enormes no fundo do mar, que ligam um continente ao outro. Quando chegam ao seu aparelho, eles são montados de novo, na ordem certa.",
          "Tudo isso acontece em menos de um segundo. É por isso que conseguimos conversar com pessoas de outros países quase na mesma hora.",
        ],
        funFact: "A maior parte das informações da internet que vão de um continente a outro viaja por cabos submarinos, e não por satélites.",
        glossary: [
          { word: "Rede", meaning: "Conjunto de coisas ligadas umas às outras." },
          { word: "Servidor", meaning: "Computador que guarda e envia informações para outros." },
          { word: "Submarino", meaning: "Que fica embaixo da água do mar." },
        ],
        questions: [
          { question: "O que é a internet?", options: ["Uma rede que liga aparelhos do mundo inteiro", "Um tipo de celular", "Um jogo"], answer: 0 },
          { question: "Como se chamam os pedacinhos de informação?", options: ["Pacotes", "Pixels", "Botões"], answer: 0 },
          { question: "Por onde os pacotes viajam entre os continentes?", options: ["Por cabos no fundo do mar", "Por cartas", "Por bicicletas"], answer: 0 },
        ],
      },
    ],
    tips: [
      "O ENIAC, um dos primeiros computadores eletrônicos, ocupava uma sala inteira e pesava cerca de 27 toneladas.",
      "A primeira mensagem enviada pela rede que deu origem à internet, em 1969, deveria ser a palavra LOGIN. Mas o sistema travou depois das duas primeiras letras: LO.",
    ],
  },

  natureza: {
    analogy: "Uma planta cresce devagar, um pouquinho por dia. Não preciso ter pressa: posso ir no meu ritmo.",
    texts: [
      {
        title: "Como as plantas fazem o próprio alimento",
        paragraphs: [
          "As plantas não precisam ir ao mercado nem caçar para comer. Elas fabricam o próprio alimento usando luz do sol, água e ar. Esse processo se chama fotossíntese.",
          "As raízes puxam a água do solo. As folhas pegam do ar um gás chamado gás carbônico. E uma substância verde dentro das folhas, a clorofila, captura a luz do sol.",
          "Com a energia da luz, a planta transforma a água e o gás carbônico em açúcar, que é o seu alimento. Ela usa esse açúcar para crescer e para fazer flores e frutos.",
          "Durante a fotossíntese, as plantas soltam oxigênio no ar. É esse oxigênio que nós e muitos outros animais respiramos. Por isso, cuidar das plantas é cuidar da vida.",
        ],
        funFact: "Grande parte do oxigênio do planeta vem de algas e de pequenos seres que vivem nos oceanos, e não só das árvores.",
        glossary: [
          { word: "Fotossíntese", meaning: "Jeito que as plantas fabricam alimento usando a luz." },
          { word: "Clorofila", meaning: "Substância que deixa as folhas verdes e captura a luz." },
          { word: "Oxigênio", meaning: "Gás do ar que precisamos para respirar." },
        ],
        questions: [
          { question: "Do que as plantas precisam para fazer a fotossíntese?", options: ["Luz do sol, água e ar", "Areia e pedras", "Somente terra"], answer: 0 },
          { question: "O que deixa as folhas verdes?", options: ["A clorofila", "O oxigênio", "A chuva"], answer: 0 },
          { question: "Que gás as plantas soltam no ar durante a fotossíntese?", options: ["Gás carbônico", "Oxigênio", "Nenhum gás"], answer: 1 },
        ],
      },
    ],
    tips: [
      "Os girassóis jovens acompanham o movimento do Sol durante o dia. Quando ficam adultos, param e ficam virados para o leste.",
      "A Amazônia é a maior floresta tropical do mundo e abriga milhares de espécies de plantas e animais.",
    ],
  },

  robos: {
    analogy: "Um robô segue o programa passo a passo. Eu também posso seguir os passos, um de cada vez.",
    texts: [
      {
        title: "O que faz um robô ser um robô?",
        paragraphs: [
          "Um robô é uma máquina que consegue perceber o ambiente, decidir o que fazer e realizar uma ação. Tudo isso seguindo instruções criadas por pessoas.",
          "Para perceber o mundo, os robôs usam sensores. Alguns sensores funcionam como olhos; outros medem a distância, a temperatura ou o toque.",
          "O cérebro do robô é um computador. Ele recebe as informações dos sensores e decide o que fazer, de acordo com o programa que foi escrito para ele.",
          "Para agir, os robôs usam motores, rodas, braços e garras. Existem robôs que montam carros em fábricas, robôs que limpam a casa e até robôs que exploram Marte.",
        ],
        funFact: "A palavra robô foi usada pela primeira vez em 1920, em uma peça de teatro do escritor tcheco Karel Čapek.",
        glossary: [
          { word: "Sensor", meaning: "Peça que capta informações, como luz, som ou distância." },
          { word: "Programa", meaning: "Conjunto de instruções que o computador segue." },
          { word: "Garra", meaning: "Parte que serve para pegar e segurar objetos." },
        ],
        questions: [
          { question: "O que os robôs usam para perceber o ambiente?", options: ["Sensores", "Lápis", "Bolas"], answer: 0 },
          { question: "Qual parte funciona como o cérebro do robô?", options: ["A roda", "O computador", "A garra"], answer: 1 },
          { question: "Em que planeta existem robôs explorando?", options: ["Em Marte", "Em Júpiter", "Em Netuno"], answer: 0 },
        ],
      },
    ],
    tips: ["Os robôs Curiosity e Perseverance andam pela superfície de Marte estudando as rochas e o solo do planeta."],
  },

  avioes: {
    analogy: "Antes de decolar, os pilotos conferem uma lista de passos. Eu também posso ter a minha lista e seguir um passo de cada vez.",
    texts: [
      {
        title: "Como um avião consegue voar?",
        paragraphs: [
          "Um avião pesa muitas toneladas e, mesmo assim, consegue voar. O segredo está no formato das asas e na velocidade.",
          "Quando o avião corre pela pista, o ar passa muito rápido por cima e por baixo das asas. As asas têm um formato especial e ficam levemente inclinadas, empurrando o ar para baixo.",
          "Ao empurrar o ar para baixo, a asa recebe uma força para cima, chamada sustentação. Quando a sustentação fica maior que o peso do avião, ele decola.",
          "Os motores dão o impulso para frente, e o piloto usa partes móveis das asas e da cauda para subir, descer e fazer curvas com segurança.",
        ],
        funFact: "O brasileiro Alberto Santos-Dumont voou com o 14-Bis em Paris, em 1906, em um dos primeiros voos de avião registrados da história.",
        glossary: [
          { word: "Sustentação", meaning: "Força que empurra o avião para cima." },
          { word: "Decolar", meaning: "Sair do chão e começar a voar." },
          { word: "Impulso", meaning: "Força que empurra para frente." },
        ],
        questions: [
          { question: "O que faz o avião subir?", options: ["A sustentação das asas", "As rodas", "As janelas"], answer: 0 },
          { question: "O que os motores fazem?", options: ["Deixam o avião parado", "Dão impulso para frente", "Acendem as luzes"], answer: 1 },
          { question: "Quando o avião decola?", options: ["Quando a sustentação fica maior que o peso", "Quando começa a chover", "Quando as portas abrem"], answer: 0 },
        ],
      },
    ],
    tips: ["Os aviões comerciais costumam voar a cerca de 10 mil metros de altura, bem acima da maioria das nuvens."],
  },

  oceano: {
    analogy: "As ondas do mar vêm e vão no seu próprio ritmo. Eu também posso respirar devagar, no meu ritmo.",
    texts: [
      {
        title: "A baleia-azul, gigante dos mares",
        paragraphs: [
          "A baleia-azul é o maior animal vivo do planeta. Ela pode passar de 25 metros de comprimento e pesar mais de 100 toneladas.",
          "Mesmo sendo tão grande, ela se alimenta de animais pequenininhos, chamados krill, que parecem pequenos camarões. Uma baleia-azul adulta pode comer toneladas de krill em um único dia.",
          "A baleia-azul é um mamífero, assim como nós. Ela respira ar e precisa subir até a superfície para respirar pelo espiráculo, um buraco que fica no alto da cabeça.",
          "Ela se comunica com sons muito graves, que podem viajar por centenas de quilômetros embaixo da água. Hoje, a baleia-azul é protegida por leis, porque já foi muito caçada no passado.",
        ],
        funFact: "O coração de uma baleia-azul pode pesar cerca de 180 quilos, mais ou menos o peso de dois adultos.",
        glossary: [
          { word: "Mamífero", meaning: "Animal que amamenta os filhotes." },
          { word: "Krill", meaning: "Pequeno animal do mar, parecido com um camarão." },
          { word: "Espiráculo", meaning: "Buraco no alto da cabeça da baleia, usado para respirar." },
        ],
        questions: [
          { question: "Do que a baleia-azul se alimenta?", options: ["De krill", "De algas gigantes", "De tubarões"], answer: 0 },
          { question: "Por onde a baleia-azul respira?", options: ["Pelas nadadeiras", "Pelo espiráculo", "Pela cauda"], answer: 1 },
          { question: "Por que a baleia-azul é protegida por leis?", options: ["Porque já foi muito caçada", "Porque é muito barulhenta", "Porque mora no deserto"], answer: 0 },
        ],
      },
    ],
    tips: ["O oceano cobre cerca de 70% da superfície da Terra.", "Os polvos têm três corações e sangue azul."],
  },

  animais: {
    analogy: "Os animais exploram um lugar novo com calma, cheirando e observando. Eu também posso observar com calma antes de agir.",
    texts: [
      {
        title: "O superpoder do nariz dos cachorros",
        paragraphs: [
          "O nariz de um cachorro é como um superpoder. Enquanto nós temos cerca de 6 milhões de células para sentir cheiros, os cachorros podem ter até 300 milhões.",
          "Por isso, os cachorros conseguem sentir cheiros muito fracos, que nós nem percebemos. Eles conseguem até saber se alguém passou por um lugar horas antes.",
          "O focinho úmido ajuda a capturar as partículas de cheiro que estão no ar. E cada cachorro tem um desenho único no nariz, assim como cada pessoa tem a sua impressão digital.",
          "Graças a esse olfato incrível, cães treinados ajudam as pessoas de muitas formas: encontram pessoas perdidas, ajudam bombeiros e trabalham em aeroportos.",
        ],
        funFact: "Os cachorros conseguem sentir cheiros com cada narina separadamente, o que ajuda a descobrir de que lado vem o cheiro.",
        glossary: [
          { word: "Olfato", meaning: "Sentido que usamos para sentir cheiros." },
          { word: "Partícula", meaning: "Pedacinho muito pequeno de alguma coisa." },
          { word: "Impressão digital", meaning: "Desenho único que cada pessoa tem na ponta dos dedos." },
        ],
        questions: [
          { question: "Quantas células para sentir cheiros um cachorro pode ter?", options: ["Até 300 milhões", "Apenas 10", "Nenhuma"], answer: 0 },
          { question: "Para que serve o focinho úmido?", options: ["Para capturar partículas de cheiro", "Para beber água", "Para enxergar melhor"], answer: 0 },
          { question: "Como os cães treinados ajudam as pessoas?", options: ["Dirigindo carros", "Encontrando pessoas perdidas", "Cozinhando"], answer: 1 },
        ],
      },
    ],
    tips: ["Os gatos passam boa parte do dia dormindo: muitos dormem de 12 a 16 horas por dia."],
  },
};

const ALIASES = {
  espaço: "espaco",
  astronomia: "espaco",
  planetas: "espaco",
  videogames: "jogos",
  games: "jogos",
  música: "musica",
  robôs: "robos",
  robotica: "robos",
  robótica: "robos",
  aviões: "avioes",
  aviacao: "avioes",
  aviação: "avioes",
  mar: "oceano",
  oceanos: "oceano",
  "fundo do mar": "oceano",
  cachorros: "animais",
  bichos: "animais",
  computadores: "tecnologia",
  plantas: "natureza",
};

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

function findEntry(interest) {
  const key = normalize(interest);
  if (LIBRARY[key]) return LIBRARY[key];
  const alias = ALIASES[String(interest || "").toLowerCase().trim()] || ALIASES[key];
  if (alias) return LIBRARY[alias];
  const partial = Object.keys(LIBRARY).find((k) => key.includes(k) || k.includes(key));
  return partial ? LIBRARY[partial] : null;
}

const pick = (list) => list[Math.floor(Math.random() * list.length)];

function fitToLevel(paragraphs, level) {
  return level === "iniciante" ? paragraphs.slice(0, 3) : paragraphs;
}

function genericText(interest) {
  return {
    title: `Explorando: ${interest}`,
    paragraphs: [
      `Você gosta muito de ${interest}, e isso é ótimo! Quando gostamos de um assunto, aprender sobre ele fica mais fácil e mais divertido.`,
      `Todo assunto tem muitas perguntas para descobrir. O que é ${interest}? Como funciona? Onde podemos encontrar? Quem são as pessoas que estudam ou trabalham com isso?`,
      `Uma boa ideia é procurar livros, fotos e vídeos sobre ${interest} junto com alguém de confiança. Cada descoberta nova pode virar um texto para ler aqui no Hiperfocus.`,
      `Quando a inteligência artificial estiver ligada, este espaço vai mostrar textos novos e cheios de curiosidades sobre ${interest}, escritos especialmente para você.`,
    ],
    funFact: "Ler sobre assuntos de que gostamos ajuda o cérebro a guardar palavras novas com mais facilidade.",
    glossary: [
      { word: "Curiosidade", meaning: "Vontade de descobrir e aprender coisas novas." },
      { word: "Descoberta", meaning: "Algo novo que a gente aprende ou encontra." },
    ],
    questions: [
      { question: "Por que aprender sobre um assunto de que gostamos fica mais fácil?", options: ["Porque é mais divertido", "Porque é mais curto", "Porque não tem palavras"], answer: 0 },
      { question: "Com quem é uma boa ideia procurar livros e vídeos?", options: ["Com alguém de confiança", "Sozinho, sem contar a ninguém", "Com um desconhecido"], answer: 0 },
      { question: "O que cada descoberta nova pode virar?", options: ["Um texto para ler no Hiperfocus", "Um bolo", "Uma viagem"], answer: 0 },
    ],
  };
}

function socialStory({ interest, detail, readerName, entry }) {
  const situation = (detail || "fazer algo novo").replace(/[.!?]+$/, "");
  const lower = situation.charAt(0).toLowerCase() + situation.slice(1);
  const title = situation.charAt(0).toUpperCase() + situation.slice(1);
  const analogy = entry?.analogy || `Posso imaginar que ${interest} está comigo, me fazendo companhia.`;
  return {
    title: `${title}: um passo de cada vez`,
    paragraphs: [
      `${readerName ? `Meu nome é ${readerName}. ` : ""}Às vezes, eu preciso ${lower}. Muitas pessoas fazem isso, e pode ser diferente do que eu faço todos os dias.`,
      "Antes, posso perguntar para um adulto de confiança o que vai acontecer e em que ordem. Saber os passos me ajuda a ter mais calma.",
      "Durante a situação, pode haver barulhos, luzes ou pessoas que eu não conheço. Se eu me sentir desconfortável, posso respirar fundo bem devagar, contar até cinco ou segurar um objeto de que eu gosto.",
      analogy,
      "Quando terminar, posso contar como foi. Está tudo bem sentir o que eu senti. Eu fiz algo importante!",
    ],
    funFact: "Respirar devagar, contando até quatro para puxar o ar e até quatro para soltar, ajuda o corpo a se acalmar.",
    glossary: [
      { word: "Confiança", meaning: "Sentir que alguém é seguro e quer o nosso bem." },
      { word: "Desconfortável", meaning: "Quando algo incomoda ou não parece bom." },
    ],
    questions: [],
  };
}

// Sem IA não dá para escrever sobre qualquer tema escolar com fatos corretos,
// então o exemplo apenas mostra como o texto vai unir o tema e o hiperfoco.
function themeText(theme, interest) {
  return {
    title: `${theme} com ${interest}`,
    paragraphs: [
      `Este texto vai ensinar sobre ${theme}, usando ${interest} como ponte para deixar a leitura mais interessante.`,
      `O assunto principal é sempre ${theme}. Os fatos, as datas e os conceitos são os mesmos que você aprende na escola.`,
      `${interest} aparece como guia da leitura: em comparações, exemplos e, às vezes, em situações de imaginação. Quando for imaginação, o texto avisa.`,
      "Quando a inteligência artificial estiver ligada, este espaço vai mostrar um texto completo e novo, feito especialmente para você.",
    ],
    funFact: "Ligar um assunto novo a algo de que gostamos ajuda o cérebro a lembrar melhor do que aprendemos.",
    glossary: [{ word: "Tema", meaning: "O assunto principal de um texto." }],
    questions: [
      { question: "Qual é o assunto principal deste texto?", options: [theme, interest, "Nenhum"], answer: 0 },
      { question: `Para que ${interest} aparece no texto?`, options: ["Como guia da leitura", "Para mudar os fatos", "Para ocupar espaço"], answer: 0 },
      { question: "O que o texto faz quando usa imaginação?", options: ["Avisa o leitor", "Esconde", "Muda a história real"], answer: 0 },
    ],
    illustrationDescription: "",
    emoji: "",
  };
}

export function fallbackText({ type, interest, theme, detail, level, readerName }) {
  const entry = findEntry(interest);

  if (theme && type !== "cotidiano") {
    const text = themeText(theme, interest);
    return { ...text, questions: type === "desafio" ? text.questions : [] };
  }

  if (type === "cotidiano") {
    const story = socialStory({ interest, detail, readerName, entry });
    return { ...story, illustrationDescription: "", emoji: "" };
  }

  if (type === "dica") {
    const tip = entry ? pick(entry.tips) : `Que tal descobrir hoje uma curiosidade nova sobre ${interest}? Pergunte, pesquise e conte para alguém o que aprendeu!`;
    return {
      title: `Dica do dia: ${interest}`,
      paragraphs: [tip],
      funFact: "",
      glossary: [],
      questions: [],
      illustrationDescription: "",
      emoji: "",
    };
  }

  const base = entry ? pick(entry.texts) : genericText(interest);
  // No desafio o texto fica completo, porque as perguntas dependem dele.
  const paragraphs = type === "desafio" ? base.paragraphs : fitToLevel(base.paragraphs, level);
  return {
    title: base.title,
    paragraphs,
    funFact: base.funFact,
    glossary: base.glossary,
    questions: type === "desafio" ? base.questions : [],
    illustrationDescription: "",
    emoji: "",
  };
}
