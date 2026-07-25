import { NewsArticle, HeatmapNode, TicketPlatform, TourApp, ApiStatusItem, RedditFanOpinion } from '../types';

export const INITIAL_NEWS_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Oasis confirma gravação de álbum ao vivo oficial durante shows em SP',
    subtitle: 'A equipe de produção do Oasis confirmou que os shows no Estádio do MorumBIS serão gravados em áudio imersivo de alta resolução para um futuro lançamento comemorativo.',
    category: 'TURNÊS',
    author: 'Thiago Reed',
    date: '25 de Julho, 2026 - 11:20',
    confirmationDate: 'Confirmado em 23/07/2026',
    confirmedBySource: 'Billboard & Live Nation',
    readTime: '4 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    featured: true,
    verifiedByThiagoReed: true,
    sourceUrl: 'https://www.billboard.com/music/',
    content: `A volta do Oasis aos palcos continua sendo um dos marcos mais expressivos do mercado global de música ao vivo. A recente confirmação de que os concertos na América Latina contarão com captação profissional em multi-pistas e áudio imersivo elevou ainda mais a expectativa dos fãs brasileiros.

**Análise Editorial & Contexto:**
A histórica reunião dos irmãos Liam e Noel Gallagher atrai públicos recordes. A escolha do Estádio do MorumBIS em São Paulo para o registro fonográfico reforça a reputação do público brasileiro como um dos mais vibrantes e calorosos da turnê mundial.

**Orientações para Compra Segura de Ingressos:**
- Fique atento às taxas de serviço secundárias. Enquanto a Ticketmaster aplica taxas dinâmicas de conveniência no lote inicial, certas plataformas de revenda não autorizadas cobram valores adicionais elevados na etapa de pagamento.
- Dê preferência a plataformas com política clara de taxa zero ao comprador (como a TickPick) ou mantenha os alertas oficiais ativos em aplicativos como o Songkick para anúncios de setores e datas extras.`,
    sources: ['Billboard', 'Live Nation Press', 'Pollstar Wire'],
    redditHypeScore: 98,
    tags: ['Oasis', 'WorldTour2026', 'MorumBIS', 'AoVivo'],
    redditQuotes: [
      { subreddit: 'r/Oasis', user: 'LiamLive26', quote: 'A confirmação do álbum ao vivo gravado no MorumBIS é uma notícia histórica!', upvotes: 1420, timeAgo: 'há 3 horas' },
      { subreddit: 'r/Music', user: 'ManchesterSound', quote: 'Garantir o setor pista foi a melhor decisão. A energia de São Paulo vai ficar imortalizada nesse disco.', upvotes: 890, timeAgo: 'há 5 horas' }
    ]
  },
  {
    id: '2',
    title: 'Guia Anti-Golpes 2026: Como Evitar Fraudes na Revenda de Ingressos de Festivais',
    subtitle: 'Especialistas em consumo alertam para o crescimento de páginas falsas e explicam quais plataformas possuem garantia real contra fraudes.',
    category: 'EDITORIAL',
    author: 'Thiago Reed',
    date: '24 de Julho, 2026 - 16:45',
    confirmationDate: 'Confirmado em 21/07/2026',
    confirmedBySource: 'Procon & Associação de Defesa do Consumidor',
    readTime: '6 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=1200&auto=format&fit=crop',
    verifiedByThiagoReed: true,
    sourceUrl: 'https://www.pollstar.com/',
    content: `Com a alta dos preços e o esgotamento rápido para grandes festivais de 2026 (como Coachella, Rock in Rio, Primavera Sound e Glastonbury), os golpes de revenda informal em redes sociais registraram alta significativa. 

**Recomendações de Segurança:**
1. **Nunca pague via Pix ou transferência direta sem intermediação:** Vendedores em redes sociais e fóruns informais não oferecem garantias legais em caso de ingresso duplicado ou falso.
2. **Priorize plataformas com Garantia do Comprador:** Serviços consolidados como TickPick e StubHub oferecem substituição imediata ou reembolso de 100% caso haja qualquer inconsistência na catraca.
3. **Cuidado com Taxas Ocultas:** Sempre confira o valor final no carrinho antes de autorizar o pagamento. Transparência no preço final desde o primeiro clique é o principal indicador de uma plataforma confiável.`,
    sources: ['Defesa do Consumidor', 'Billboard Biz', 'Análise de Mercado'],
    redditHypeScore: 94,
    tags: ['Segurança', 'Festivais', 'AntiGolpe', 'Ingressos']
  },
  {
    id: '3',
    title: 'Bandsintown vs Songkick vs JamBase: Qual o Melhor App de Alerta de Turnês em 2026?',
    subtitle: 'Analisamos a velocidade de notificação, integração com plataformas de streaming e precisão de localização de cada aplicativo.',
    category: 'MERCADO',
    author: 'Redação de Jornalismo Musical',
    date: '23 de Julho, 2026 - 09:15',
    confirmationDate: 'Confirmado em 20/07/2026',
    confirmedBySource: 'Spotify Web Insights & Análise Independente',
    readTime: '5 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1200&auto=format&fit=crop',
    featured: false,
    verifiedByThiagoReed: true,
    sourceUrl: 'https://www.musicbusinessworldwide.com/',
    content: `Para quem deseja garantir ingressos antes da lotação máxima, os aplicativos de alerta de shows tornaram-se ferramentas indispensáveis na rotina dos amantes de música ao vivo.

**Análise Comparativa:**
- **Bandsintown:** Destaca-se pelo imenso catálogo de artistas independentes e regionais. As notificações de anúncios de turnê costumam chegar poucos instantes após a divulgação oficial.
- **Songkick:** Oferece a melhor sincronização automática com bibliotecas do Spotify e Apple Music, notificando o usuário assim que um artista da sua biblioteca confirma data na sua cidade.
- **JamBase:** Essencial para o circuito de festivais e bandas de jam, trazendo itinerários detalhados e atualizações de palcos secundários.`,
    sources: ['Análise Independente', 'Tech Music Review'],
    redditHypeScore: 89,
    tags: ['Apps', 'Bandsintown', 'Songkick', 'Tecnologia']
  },
  {
    id: '4',
    title: 'Coachella & Grandes Festivais: Inovações em Experiência Imersiva de Som e Luz',
    subtitle: 'Como a engenharia de áudio espacial e o design cênico estão redefinindo os grandes espetáculos ao vivo.',
    category: 'FESTIVAIS',
    author: 'Beatriz Lima',
    date: '22 de Julho, 2026 - 18:30',
    confirmationDate: 'Confirmado em 19/07/2026',
    confirmedBySource: 'Coachella Tech Brief & NME',
    readTime: '4 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1200&auto=format&fit=crop',
    verifiedByThiagoReed: false,
    sourceUrl: 'https://www.nme.com/music',
    content: `A união entre design de iluminação de última geração e engenharia de áudio imersivo estabeleceu novos parâmetros para os grandes festivais de 2026. Palcos principais e arenas secundárias foram reformulados para entregar clareza acústica uniforme, independentemente da distância do público em relação às torres de som.`,
    sources: ['Coachella Tech Brief', 'NME Magazine'],
    redditHypeScore: 87,
    tags: ['Coachella', 'Design', 'ÁudioEspacial', 'Tecnologia']
  },
  {
    id: '5',
    title: 'Kendrick Lamar Surpreende Fãs com Anúncio Global de Novo Álbum e Apresentações Especiais',
    subtitle: 'Ações de divulgação espalhadas por grandes capitais geram grande repercussão na imprensa e nas redes sociais.',
    category: 'ALERTAS',
    author: 'Thiago Reed',
    date: '21 de Julho, 2026 - 22:00',
    confirmationDate: 'Confirmado em 21/07/2026',
    confirmedBySource: 'Pitchfork & Interscope Records',
    readTime: '3 min de leitura',
    imageUrl: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?q=80&w=1200&auto=format&fit=crop',
    verifiedByThiagoReed: true,
    sourceUrl: 'https://pitchfork.com/',
    content: `Um lançamento surpresa acompanhado de intervenções visuais em grandes metrópoles chamou a atenção da indústria da música. O anúncio movimentou milhões de reproduções simultâneas nas principais plataformas de áudio logo nas primeiras horas de divulgação.`,
    sources: ['Pitchfork', 'Interscope Records', 'Billboard'],
    redditHypeScore: 99,
    tags: ['KendrickLamar', 'Lançamento', 'Musica', 'Exclusivo']
  }
];

export const REDDIT_FAN_OPINIONS: RedditFanOpinion[] = [
  {
    id: 'red-1',
    subreddit: 'r/Oasis',
    user: 'Liam_Mcr_96',
    quote: '"Se gravar em SP o áudio de Don\'t Look Back in Anger, vai ser o maior registro ao vivo da década!"',
    artistOrEvent: 'Oasis em SP (MorumBIS)',
    upvotes: 3410,
    timeAgo: 'há 2 horas',
    verifiedRealExpectation: true,
    sourceUrl: 'https://www.reddit.com/r/oasis'
  },
  {
    id: 'red-2',
    subreddit: 'r/Coldplay',
    user: 'SpheresFanatic',
    quote: '"Wembley com 59% a menos de pegada de carbono provou que grandes turnês sustentáveis funcionam."',
    artistOrEvent: 'Coldplay em Wembley',
    upvotes: 2180,
    timeAgo: 'há 4 horas',
    verifiedRealExpectation: true,
    sourceUrl: 'https://www.reddit.com/r/coldplay'
  },
  {
    id: 'red-3',
    subreddit: 'r/HipHopHeads',
    user: 'KDot_Analyst',
    quote: '"A passagem de som no MSG vazou a introdução da faixa com a SZA. O instrumental tá surreal!"',
    artistOrEvent: 'Kendrick Lamar no MSG',
    upvotes: 4890,
    timeAgo: 'há 1 hora',
    verifiedRealExpectation: true,
    sourceUrl: 'https://www.reddit.com/r/hiphopheads'
  },
  {
    id: 'red-4',
    subreddit: 'r/festivals',
    user: 'GlastoVet_UK',
    quote: '"Sem taxas ocultas no carrinho via TickPick salvou a galera que viajou pro Fuji Rock este ano."',
    artistOrEvent: 'Fuji Rock 2026',
    upvotes: 1950,
    timeAgo: 'há 6 horas',
    verifiedRealExpectation: true,
    sourceUrl: 'https://www.reddit.com/r/festivals'
  },
  {
    id: 'red-5',
    subreddit: 'r/Music',
    user: 'LiveConcertJunkie',
    quote: '"A confirmação oficial com data auditada da Billboard evitou que eu caísse na pré-venda farsa do Insta."',
    artistOrEvent: 'Auditoria de Fontes',
    upvotes: 1520,
    timeAgo: 'há 3 horas',
    verifiedRealExpectation: true,
    sourceUrl: 'https://www.reddit.com/r/music'
  }
];

export const HEATMAP_NODES: HeatmapNode[] = [
  {
    id: 'sp-01',
    city: 'São Paulo',
    country: 'Brasil',
    artist: 'Oasis World Tour 2026',
    venue: 'Estádio do MorumBIS',
    date: '22 e 23 de Novembro, 2026',
    status: 'CONFIRMADO 2026',
    coordinates: { x: 38, y: 72 },
    lat: -23.5505,
    lng: -46.6333,
    hypeIndex: 99,
    recentNews10Days: 'Anúncio oficial de datas extras na América do Sul e coletiva do Noel Gallagher sobre novos arranjos de palco.',
    upcoming6MonthsRadar: 'Expectativa de gravação de álbum ao vivo oficial no MorumBIS e documentário especial em novembro/2026.',
    sourceName: 'Billboard Music',
    sourceUrl: 'https://www.billboard.com',
    redditMentions: 4820
  },
  {
    id: 'lon-03',
    city: 'Londres',
    country: 'Reino Unido',
    artist: 'Coldplay - Music of the Spheres Tour',
    venue: 'Wembley Stadium',
    date: '18 a 31 de Agosto, 2026',
    status: 'EM TURNÊ MUNDIAL',
    coordinates: { x: 47, y: 32 },
    lat: 51.5074,
    lng: -0.1278,
    hypeIndex: 97,
    recentNews10Days: 'Show histórico em Wembley bate recorde de menor pegada de carbono da história do estádio (BBC Music).',
    upcoming6MonthsRadar: 'Anúncio de participação em festivais na Ásia e lançamento de EP beneficente com participação de artistas latinos.',
    sourceName: 'Music Business Worldwide',
    sourceUrl: 'https://www.musicbusinessww.com',
    redditMentions: 8900
  },
  {
    id: 'ny-04',
    city: 'Nova York',
    country: 'EUA',
    artist: 'Kendrick Lamar & SZA Live',
    venue: 'Madison Square Garden',
    date: '12 de Setembro, 2026',
    status: 'AGENDA 2026',
    coordinates: { x: 28, y: 38 },
    lat: 40.7128,
    lng: -74.0060,
    hypeIndex: 96,
    recentNews10Days: 'Faixa inédita tocada no soundcheck vazou no r/HipHopHeads gerando pico imediato de streaming no Spotify.',
    upcoming6MonthsRadar: 'Co-headliners no festival de outono em Austin e gravação de clipe colaborativo em Los Angeles.',
    sourceName: 'Pitchfork',
    sourceUrl: 'https://pitchfork.com',
    redditMentions: 6450
  },
  {
    id: 'la-05',
    city: 'Los Angeles',
    country: 'EUA',
    artist: 'Coachella Valley Music & Arts Festival',
    venue: 'Indio Empire Polo Club',
    date: 'Próximo Trimestre',
    status: 'PRÓXIMOS DIAS',
    coordinates: { x: 18, y: 41 },
    lat: 34.0522,
    lng: -118.2437,
    hypeIndex: 95,
    recentNews10Days: 'Organização divulga primeiros teasers de infraestrutura e tecnologias de som espacial de 360 graus.',
    upcoming6MonthsRadar: 'Revelação da grade completa com headliners surpresa de K-pop e Hip Hop global em outubro.',
    sourceName: 'Pollstar',
    sourceUrl: 'https://www.pollstar.com',
    redditMentions: 7200
  },
  {
    id: 'tok-07',
    city: 'Tóquio',
    country: 'Japão',
    artist: 'Fuji Rock Festival 2026',
    venue: 'Naeba Ski Resort / Tokyo Dome',
    date: '20 de Agosto, 2026',
    status: 'CONFIRMADO 2026',
    coordinates: { x: 84, y: 44 },
    lat: 35.6762,
    lng: 139.6503,
    hypeIndex: 93,
    recentNews10Days: 'Setlist histórico divulgado no Setlist.fm com bandas japonesas e convidados britânicos.',
    upcoming6MonthsRadar: 'Lançamento do portal de transmissões ao vivo em 4K para toda a Ásia em parceria com o YouTube Music.',
    sourceName: 'Setlist.fm',
    sourceUrl: 'https://www.setlist.fm',
    redditMentions: 4120
  },
  {
    id: 'rj-02',
    city: 'Rio de Janeiro',
    country: 'Brasil',
    artist: 'Festival de Inverno & Maracanã Live',
    venue: 'Maracanã & Quinta da Boa Vista',
    date: '02 de Dezembro, 2026',
    status: 'CONFIRMADO 2026',
    coordinates: { x: 39.5, y: 74 },
    lat: -22.9068,
    lng: -43.1729,
    hypeIndex: 92,
    recentNews10Days: 'Anúncio de transmissão aberta via streaming com áudio binaural para fones de ouvido.',
    upcoming6MonthsRadar: 'Confirmação de 4 atrações internacionais de Reggae e Pop na orla de Copacabana para o final do ano.',
    sourceName: 'Rolling Stone',
    sourceUrl: 'https://www.rollingstone.com',
    redditMentions: 3100
  },
  {
    id: 'ber-06',
    city: 'Berlim',
    country: 'Alemanha',
    artist: 'Electronic Music Summit & Tempelhof',
    venue: 'Tempelhof Field & Berghain',
    date: '05 de Setembro, 2026',
    status: 'PRÓXIMOS DIAS',
    coordinates: { x: 52, y: 31 },
    lat: 52.5200,
    lng: 13.4050,
    hypeIndex: 88,
    recentNews10Days: 'Sindicato de produtores da Alemanha aprova subsídio de tecnologia ecológica para palcos eletrônicos.',
    upcoming6MonthsRadar: 'Turnê europeia conjunta de produtores residentes por 12 capitais da União Europeia.',
    sourceName: 'NME',
    sourceUrl: 'https://www.nme.com',
    redditMentions: 2950
  },
  {
    id: 'ba-08',
    city: 'Buenos Aires',
    country: 'Argentina',
    artist: 'Primavera Sound Buenos Aires',
    venue: 'Parque Sarmiento',
    date: '25 de Outubro, 2026',
    status: 'CONFIRMADO 2026',
    coordinates: { x: 34, y: 82 },
    lat: -34.6037,
    lng: -58.3816,
    hypeIndex: 90,
    recentNews10Days: 'Line-up estendido com novas bandas de Rock Latino e Indie Ibérico adicionadas ao Palco Principal.',
    upcoming6MonthsRadar: 'Divulgação dos horários dos shows e ativações de marcas com rádios comunitárias argentinas.',
    sourceName: 'Music Week',
    sourceUrl: 'https://www.musicweek.com',
    redditMentions: 2180
  }
];

export const TICKET_PLATFORMS: TicketPlatform[] = [
  {
    id: 'ticketmaster',
    name: 'Ticketmaster',
    logoText: 'TM',
    rank: 1,
    rating: 4.5,
    feePolicy: 'Taxa Dinâmica de Conveniência (15% - 25%)',
    averageFeePercentage: 20,
    fraudGuarantee: true,
    bestFor: 'Maior inventário oficial e vendas primárias diretas',
    pros: [
      'Contrato direto com a maioria dos estádios e arenas globais',
      'Transferência digital segura entre contas oficiais',
      'Suporte a pré-vendas com cartão de crédito e fã-clube'
    ],
    cons: [
      'Preço dinâmico aumenta valores em alta demanda',
      'Filas virtuais com travamentos ocasionais'
    ],
    redditVerdict: 'Apesar de ser a mais criticada pelas taxas no Reddit, é a fonte oficial indiscutível para evitar bilhetes falsos.',
    officialUrl: 'https://www.ticketmaster.com'
  },
  {
    id: 'seatgeek',
    name: 'SeatGeek',
    logoText: 'SG',
    rank: 2,
    rating: 4.7,
    feePolicy: 'Preço Transparente (Mostra taxas no início do filtro)',
    averageFeePercentage: 18,
    fraudGuarantee: true,
    bestFor: 'Interface limpa e mapa interativo de assentos com Deal Score',
    pros: [
      'Opção "Include Fees" mostra o preço final real antes de colocar no carrinho',
      'Deal Score avalia se o ingresso está caro ou barato',
      'Excelente aplicativo mobile para transferência rápida'
    ],
    cons: [
      'Taxa do vendedor pode variar em itens raros de revenda'
    ],
    redditVerdict: 'A preferida no r/Music pela facilidade de uso e visualização real da visão do palco em cada assento.',
    officialUrl: 'https://seatgeek.com'
  },
  {
    id: 'tickpick',
    name: 'TickPick',
    logoText: 'TP',
    rank: 3,
    rating: 4.8,
    feePolicy: 'Zero Taxa para o Comprador (0% Fee to Buyer)',
    averageFeePercentage: 0,
    fraudGuarantee: true,
    bestFor: 'Ingressos de revenda sem taxas surpresa no final',
    pros: [
      'O preço exibido no card é exatamente o valor pago no checkout',
      'Garantia "BuyerTrust" 100% de reembolso ou troca por assento equivalente',
      'Algoritmo que compara preços com concorrentes'
    ],
    cons: [
      'Inventário menor em shows internacionais fora dos EUA/Europa'
    ],
    redditVerdict: 'Destaque absoluto no r/festivals por não enganar o usuário com taxas de checkout.',
    officialUrl: 'https://www.tickpick.com'
  },
  {
    id: 'stubhub',
    name: 'StubHub',
    logoText: 'SH',
    rank: 4,
    rating: 3.9,
    feePolicy: 'Taxa de Serviço Variável no Checkout (Até 40%)',
    averageFeePercentage: 35,
    fraudGuarantee: true,
    bestFor: 'Esgotados de última hora e grandes arenas globais',
    pros: [
      'Garantia FanProtect em todos os bilhetes',
      'Extenso inventário para shows 100% esgotados'
    ],
    cons: [
      'ALERTA EDITORIAL: Pode adicionar até 40% de taxas surpresa na tela final',
      'Atendimento em português reduzido fora do horário comercial'
    ],
    redFlagWarning: 'Cuidado! Verifique o preço total antes de confirmar o pagamento para evitar o susto das taxas adicionais.',
    redditVerdict: 'Excelente cobertura de segurança, mas exige atenção redobrada no valor final do carrinho.',
    officialUrl: 'https://www.stubhub.com'
  }
];

export const TOUR_APPS: TourApp[] = [
  {
    id: 'bandsintown',
    name: 'Bandsintown',
    tagline: 'Líder mundial em alertas diretos dos artistas',
    rating: 4.9,
    keyFeatures: [
      'Notificação instantânea de novas turnês',
      'Rastreamento direto dos canais oficiais do artista',
      'Suporte a pré-venda e códigos exclusivos de fã-clube'
    ],
    spotifyIntegration: 'Total',
    alertSpeed: 'Instântaneo (<1m)',
    verdict: 'Indispensável para não perder anúncios surpresa e garantir pré-venda de shows desejados.',
    iconName: 'Bell'
  },
  {
    id: 'songkick',
    name: 'Songkick',
    tagline: 'A melhor sincronicidade com suas playlists do Spotify',
    rating: 4.7,
    keyFeatures: [
      'Varredura inteligente do seu histórico do Spotify/Apple Music',
      'Filtro por raio de localização GPS preciso',
      'Alertas de festivais com line-up parcial'
    ],
    spotifyIntegration: 'Total',
    alertSpeed: 'Rápido (<1h)',
    verdict: 'O melhor para descobrir automaticamente quando qualquer artista da sua biblioteca vem para a sua cidade.',
    iconName: 'Music'
  },
  {
    id: 'jambase',
    name: 'JamBase',
    tagline: 'O portal definitivo para festivais e jam bands',
    rating: 4.6,
    keyFeatures: [
      'Grade horária detalhada por palco em festivais',
      'Histórico completo de setlists e gravações',
      'Fórum comunitário integrado'
    ],
    spotifyIntegration: 'Parcial',
    alertSpeed: 'Diário',
    verdict: 'Referência no r/jambands e r/festivals para logística avançada de festivais e palcos secundários.',
    iconName: 'Compass'
  },
  {
    id: 'pollstar',
    name: 'Pollstar',
    tagline: 'Informação direta e veloz da indústria de turnês',
    rating: 4.5,
    keyFeatures: [
      'Dados brutos de bilheteria e capacidade de arenas',
      'Anúncios corporativos da indústria da música',
      'Visualização enxuta e sem distrações'
    ],
    spotifyIntegration: 'Não possui',
    alertSpeed: 'Instântaneo (<1m)',
    verdict: 'Ideal para quem gosta de acompanhar métricas profissionais de turnês e números de arrecadação.',
    iconName: 'BarChart'
  }
];

export const INITIAL_API_METRICS: ApiStatusItem[] = [
  { id: 'ticketmaster', name: 'Ticketmaster Discovery API', status: 'operational', latencyMs: 42, rateLimitUsage: '28%' },
  { id: 'reddit', name: 'r/Music & r/festivals Sentiment Stream', status: 'operational', latencyMs: 115, rateLimitUsage: '64%' },
  { id: 'bandsintown', name: 'Bandsintown Tour Webhook', status: 'operational', latencyMs: 88, rateLimitUsage: '12%' },
  { id: 'spotify', name: 'Spotify Web API & Audio Features', status: 'operational', latencyMs: 53, rateLimitUsage: '41%' },
  { id: 'seatgeek', name: 'SeatGeek Fee Calculation Service', status: 'operational', latencyMs: 95, rateLimitUsage: '19%' },
  { id: 'sonic', name: 'Sonic Pulse Audio Alerts Engine', status: 'operational', latencyMs: 12, rateLimitUsage: '5%' }
];
