export type Category = 
  | 'TODAS'
  | 'TURNÊS'
  | 'FESTIVAIS'
  | 'MERCADO'
  | 'EDITORIAL'
  | 'ALERTAS';

export interface NewsArticle {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  author: string;
  authorAvatar?: string;
  date: string;
  confirmationDate?: string; // Data oficial de confirmação por fontes confiáveis
  confirmedBySource?: string; // Nome da fonte auditada (e.g. Billboard, Live Nation, NME)
  readTime: string;
  imageUrl: string;
  featured?: boolean;
  verifiedByThiagoReed?: boolean;
  sourceUrl?: string;
  content: string;
  sources: string[];
  redditHypeScore: number;
  tags: string[];
  redditQuotes?: {
    subreddit: string;
    user: string;
    quote: string;
    upvotes: number;
    timeAgo: string;
  }[];
}

export interface RedditFanOpinion {
  id: string;
  subreddit: string;
  user: string;
  quote: string;
  artistOrEvent: string;
  upvotes: number;
  timeAgo: string;
  verifiedRealExpectation: boolean;
  sourceUrl?: string;
}

export interface HeatmapNode {
  id: string;
  city: string;
  country: string;
  artist: string;
  venue: string;
  date: string;
  status: 'AO VIVO AGORA' | 'HOJE' | 'PRÓXIMOS DIAS' | 'CONFIRMADO 2026' | 'EM TURNÊ MUNDIAL' | 'AGENDA 2026';
  coordinates: { x: number; y: number }; // percentage position on map canvas
  lat: number;
  lng: number;
  hypeIndex: number; // 0 - 100
  recentNews10Days: string; // Notícia dos últimos 10 dias
  upcoming6MonthsRadar: string; // Perspectiva para os próximos 6 meses
  sourceName: string; // e.g. "Billboard", "Pollstar", "Setlist.fm"
  sourceUrl: string; // Link direto oficial
  redditMentions: number;
}

export interface TicketPlatform {
  id: string;
  name: string;
  logoText: string;
  rank: number;
  rating: number; // out of 5
  feePolicy: string;
  averageFeePercentage: number;
  fraudGuarantee: boolean;
  bestFor: string;
  pros: string[];
  cons: string[];
  redFlagWarning?: string;
  redditVerdict: string;
  officialUrl: string;
}

export interface TourApp {
  id: string;
  name: string;
  tagline: string;
  rating: number;
  keyFeatures: string[];
  spotifyIntegration: 'Total' | 'Parcial' | 'Não possui';
  alertSpeed: 'Instântaneo (<1m)' | 'Rápido (<1h)' | 'Diário';
  verdict: string;
  iconName: string;
}

export interface ApiStatusItem {
  id: string;
  name: string;
  status: 'operational' | 'degraded' | 'maintenance';
  latencyMs: number;
  rateLimitUsage: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  source?: string;
}
