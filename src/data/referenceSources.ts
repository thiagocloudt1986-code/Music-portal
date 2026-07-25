export interface SourceItem {
  name: string;
  country?: string;
  url: string;
  category: string;
  isTop20?: boolean;
}

export const REFERENCE_SOURCES_CATEGORIES = [
  'TODAS',
  'TOP 20',
  'APIs & Scraping',
  'Notícias, Indústria e Mercado',
  'Shows e Turnês',
  'Analytics e Streaming',
  'Charts Oficiais',
  'Música Eletrônica',
  'Rock / Metal',
  'Hip-Hop / Rap',
  'Descoberta Musical',
  'Música Clássica',
  'Jazz',
  'World Music',
  'J-Pop',
  'K-Pop',
  'Brasil'
] as const;

export const GLOBAL_MUSIC_SOURCES: SourceItem[] = [
  // APIs & Scraping
  { name: 'Firecrawl (Web Scraper / LLM Ingestion)', url: 'https://github.com/firecrawl/firecrawl.git', category: 'APIs & Scraping', isTop20: true },
  { name: 'Sceneland (Music Scene & Event Mapping Engine)', url: 'https://github.com/skullface/sceneland.git', category: 'APIs & Scraping', isTop20: true },
  { name: 'Songkick Unofficial API (Concerts & Festivals Data)', url: 'https://github.com/Integuru-AI/Songkick-Unofficial-API.git', category: 'APIs & Scraping', isTop20: true },
  { name: 'Spotify Web API', url: 'https://developer.spotify.com', category: 'APIs & Scraping' },
  { name: 'MusicBrainz API', url: 'https://musicbrainz.org/doc/MusicBrainz_API', category: 'APIs & Scraping' },
  { name: 'Last.fm API', url: 'https://www.last.fm/api', category: 'APIs & Scraping' },
  { name: 'Discogs API', url: 'https://www.discogs.com/developers', category: 'APIs & Scraping' },
  { name: 'Ticketmaster Discovery API', url: 'https://developer.ticketmaster.com', category: 'APIs & Scraping' },
  { name: 'Genius API', url: 'https://docs.genius.com', category: 'APIs & Scraping' },
  { name: 'Setlist.fm API', url: 'https://api.setlist.fm', category: 'APIs & Scraping' },

  // Top 20 & Main Portals
  { name: 'Billboard', country: '🇺🇸 EUA', url: 'https://www.billboard.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Rolling Stone', country: '🇺🇸 EUA', url: 'https://www.rollingstone.com/music', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Pitchfork', country: '🇺🇸 EUA', url: 'https://pitchfork.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'NME', country: '🇬🇧 Reino Unido', url: 'https://www.nme.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Music Business Worldwide', country: '🇬🇧 Reino Unido', url: 'https://www.musicbusinessworldwide.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Music Week', country: '🇬🇧 Reino Unido', url: 'https://www.musicweek.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Variety Music', country: '🇺🇸 EUA', url: 'https://variety.com/v/music', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Digital Music News', country: '🇺🇸 EUA', url: 'https://www.digitalmusicnews.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Music Ally', country: '🇬🇧 Reino Unido', url: 'https://musically.com', category: 'Notícias, Indústria e Mercado', isTop20: true },
  { name: 'Hypebot', country: '🇺🇸 EUA', url: 'https://www.hypebot.com', category: 'Notícias, Indústria e Mercado', isTop20: true },

  // Shows e Turnês
  { name: 'Pollstar', url: 'https://news.pollstar.com', category: 'Shows e Turnês', isTop20: true },
  { name: 'Songkick', url: 'https://www.songkick.com', category: 'Shows e Turnês', isTop20: true },
  { name: 'Bandsintown', url: 'https://www.bandsintown.com', category: 'Shows e Turnês' },
  { name: 'Live Nation', url: 'https://www.livenation.com', category: 'Shows e Turnês' },
  { name: 'AXS', url: 'https://www.axs.com', category: 'Shows e Turnês' },

  // Analytics e Streaming
  { name: 'Chartmetric', url: 'https://chartmetric.com', category: 'Analytics e Streaming', isTop20: true },
  { name: 'Songstats', url: 'https://songstats.com', category: 'Analytics e Streaming' },
  { name: 'Viberate', url: 'https://www.viberate.com', category: 'Analytics e Streaming' },
  { name: 'Luminate', url: 'https://luminatedata.com', category: 'Analytics e Streaming' },
  { name: 'Kworb', url: 'https://kworb.net', category: 'Analytics e Streaming' },
  { name: 'Soundcharts', url: 'https://soundcharts.com', category: 'Analytics e Streaming' },

  // Charts Oficiais
  { name: 'Billboard Charts', url: 'https://www.billboard.com/charts', category: 'Charts Oficiais' },
  { name: 'Official Charts (UK)', url: 'https://www.officialcharts.com', category: 'Charts Oficiais' },
  { name: 'IFPI', url: 'https://www.ifpi.org', category: 'Charts Oficiais', isTop20: true },
  { name: 'ARIA Charts', url: 'https://www.aria.com.au/charts', category: 'Charts Oficiais' },
  { name: 'Oricon (Japão)', url: 'https://www.oricon.co.jp', category: 'Charts Oficiais' },
  { name: 'Circle Chart (Coreia)', url: 'https://circlechart.kr', category: 'Charts Oficiais' },
  { name: 'Spotify Charts', url: 'https://charts.spotify.com', category: 'Charts Oficiais', isTop20: true },
  { name: 'Apple Music Charts', url: 'https://music.apple.com/charts', category: 'Charts Oficiais' },
  { name: 'YouTube Charts', url: 'https://charts.youtube.com', category: 'Charts Oficiais' },

  // Música Eletrônica
  { name: 'Resident Advisor', url: 'https://ra.co', category: 'Música Eletrônica', isTop20: true },
  { name: 'DJ Mag', url: 'https://djmag.com', category: 'Música Eletrônica', isTop20: true },
  { name: 'Mixmag', url: 'https://mixmag.net', category: 'Música Eletrônica' },
  { name: 'EDM.com', url: 'https://edm.com', category: 'Música Eletrônica' },
  { name: 'Beatportal', url: 'https://www.beatportal.com', category: 'Música Eletrônica' },

  // Rock / Metal
  { name: 'Loudwire', url: 'https://loudwire.com', category: 'Rock / Metal' },
  { name: 'Metal Injection', url: 'https://metalinjection.net', category: 'Rock / Metal' },
  { name: 'Blabbermouth', url: 'https://blabbermouth.net', category: 'Rock / Metal' },
  { name: 'Kerrang!', url: 'https://www.kerrang.com', category: 'Rock / Metal' },
  { name: 'Revolver Magazine', url: 'https://www.revolvermag.com', category: 'Rock / Metal' },
  { name: 'Ultimate Classic Rock', url: 'https://ultimateclassicrock.com', category: 'Rock / Metal' },

  // Hip-Hop / Rap
  { name: 'HipHopDX', url: 'https://hiphopdx.com', category: 'Hip-Hop / Rap' },
  { name: 'XXL Magazine', url: 'https://www.xxlmag.com', category: 'Hip-Hop / Rap' },
  { name: 'Complex Music', url: 'https://www.complex.com/music', category: 'Hip-Hop / Rap' },
  { name: 'The Source', url: 'https://thesource.com', category: 'Hip-Hop / Rap' },
  { name: 'Genius', url: 'https://genius.com', category: 'Hip-Hop / Rap', isTop20: true },

  // Descoberta Musical
  { name: 'AllMusic', url: 'https://www.allmusic.com', category: 'Descoberta Musical', isTop20: true },
  { name: 'Discogs', url: 'https://www.discogs.com', category: 'Descoberta Musical', isTop20: true },
  { name: 'Rate Your Music', url: 'https://rateyourmusic.com', category: 'Descoberta Musical' },
  { name: 'Album of the Year', url: 'https://www.albumoftheyear.org', category: 'Descoberta Musical' },
  { name: 'Bandcamp Daily', url: 'https://daily.bandcamp.com', category: 'Descoberta Musical' },

  // Música Clássica
  { name: 'Gramophone', url: 'https://gramophone.co.uk', category: 'Música Clássica' },
  { name: 'BBC Music Magazine', url: 'https://www.classical-music.com', category: 'Música Clássica' },

  // Jazz
  { name: 'JazzTimes', url: 'https://jazztimes.com', category: 'Jazz' },
  { name: 'DownBeat', url: 'https://downbeat.com', category: 'Jazz' },
  { name: 'All About Jazz', url: 'https://www.allaboutjazz.com', category: 'Jazz' },

  // World Music
  { name: 'Songlines', url: 'https://www.songlines.co.uk', category: 'World Music' },
  { name: 'World Music Central', url: 'https://worldmusiccentral.org', category: 'World Music' },
  { name: 'World Music Network', url: 'https://worldmusic.net', category: 'World Music' },

  // J-Pop
  { name: 'Oricon', url: 'https://www.oricon.co.jp', category: 'J-Pop' },
  { name: 'Natalie Music', url: 'https://natalie.mu/music', category: 'J-Pop' },
  { name: 'Anime News Network', url: 'https://www.animenewsnetwork.com', category: 'J-Pop' },

  // K-Pop
  { name: 'Soompi', url: 'https://www.soompi.com', category: 'K-Pop' },
  { name: 'Allkpop', url: 'https://www.allkpop.com', category: 'K-Pop' },
  { name: 'Koreaboo', url: 'https://www.koreaboo.com', category: 'K-Pop' },

  // Brasil
  { name: 'Billboard Brasil', url: 'https://billboard.com.br', category: 'Brasil' },
  { name: 'POPline', url: 'https://portalpopline.com.br', category: 'Brasil' },
  { name: 'Tenho Mais Discos Que Amigos', url: 'https://www.tenhomaisdiscosqueamigos.com', category: 'Brasil' },
  { name: 'Whiplash', url: 'https://whiplash.net', category: 'Brasil' },
  { name: 'Tracklist', url: 'https://tracklist.com.br', category: 'Brasil' },
  { name: 'Portal Sucesso', url: 'https://portalsucesso.com.br', category: 'Brasil' }
];
