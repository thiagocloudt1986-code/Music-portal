import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveHeatmapHero } from './components/LiveHeatmapHero';
import { NewsFeedSection } from './components/NewsFeedSection';
import { GlobalSourcesSection } from './components/GlobalSourcesSection';
import { TicketRankingSection } from './components/TicketRankingSection';
import { AntiScamGuide } from './components/AntiScamGuide';
import { TourDiscoveryApps } from './components/TourDiscoveryApps';
import { ApiControlPanel } from './components/ApiControlPanel';
import { AIAssistantDrawer } from './components/AIAssistantDrawer';
import { ArticleReaderModal } from './components/ArticleReaderModal';

import {
  INITIAL_NEWS_ARTICLES,
  HEATMAP_NODES,
  TICKET_PLATFORMS,
  TOUR_APPS,
  INITIAL_API_METRICS
} from './data/mockData';
import { HeatmapNode, NewsArticle } from './types';
import { Radio, ShieldCheck, Zap, RefreshCw, Database } from 'lucide-react';

const LOCAL_STORAGE_NEWS_KEY = 'livepulse_firecrawl_news_cache_v1';
const LOCAL_STORAGE_TIME_KEY = 'livepulse_firecrawl_cache_timestamp';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('heatmap');
  const [aiDrawerOpen, setAiDrawerOpen] = useState<boolean>(false);
  const [aiQuery, setAiQuery] = useState<string>('');
  const [previewArticle, setPreviewArticle] = useState<NewsArticle | null>(null);

  // LocalStorage Cache for Firecrawl & News Articles
  const [newsArticles, setNewsArticles] = useState<NewsArticle[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar cache do localStorage:', e);
    }
    return INITIAL_NEWS_ARTICLES;
  });

  const [cacheTimestamp, setCacheTimestamp] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_TIME_KEY);
    } catch {
      return null;
    }
  });

  const [cacheNotification, setCacheNotification] = useState<string | null>(null);

  // Initialize and validate cache on mount
  useEffect(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_NEWS_KEY);
      if (!cached) {
        localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(INITIAL_NEWS_ARTICLES));
        const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        localStorage.setItem(LOCAL_STORAGE_TIME_KEY, now);
        setCacheTimestamp(now);
      } else {
        setCacheNotification('Notícias e feed do Firecrawl carregados do cache do navegador.');
        setTimeout(() => setCacheNotification(null), 4000);
      }
    } catch (e) {
      console.warn('Erro na inicialização do localStorage:', e);
    }
  }, []);

  // Update news articles and persist to localStorage
  const handleUpdateArticles = (updated: NewsArticle[]) => {
    setNewsArticles(updated);
    try {
      localStorage.setItem(LOCAL_STORAGE_NEWS_KEY, JSON.stringify(updated));
      const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      localStorage.setItem(LOCAL_STORAGE_TIME_KEY, now);
      setCacheTimestamp(now);
      setCacheNotification(`Cache atualizado com sucesso (${now}).`);
      setTimeout(() => setCacheNotification(null), 4000);
    } catch (e) {
      console.warn('Erro ao persistir no localStorage:', e);
    }
  };

  // Reset cache back to defaults
  const handleClearCache = () => {
    try {
      localStorage.removeItem(LOCAL_STORAGE_NEWS_KEY);
      localStorage.removeItem(LOCAL_STORAGE_TIME_KEY);
      setNewsArticles(INITIAL_NEWS_ARTICLES);
      setCacheTimestamp(null);
      setCacheNotification('Cache do localStorage restaurado para os padrões iniciais.');
      setTimeout(() => setCacheNotification(null), 4000);
    } catch (e) {
      console.warn('Erro ao limpar cache:', e);
    }
  };

  const handleOpenAIAssistantWithQuery = (query: string) => {
    setAiQuery(query);
    setAiDrawerOpen(true);
  };

  const handleSelectHeatmapNode = (_node: HeatmapNode) => {
    // Node selection logic
  };

  return (
    <div className="min-h-screen bg-[#131316] text-[#e4e1e6] flex flex-col selection:bg-[#c7f300] selection:text-[#171e00]">
      
      {/* Sticky Glassmorphic Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAIAssistant={() => {
          setAiQuery('');
          setAiDrawerOpen(true);
        }}
      />

      {/* Cache status toast notification */}
      {cacheNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1b1b1e]/95 backdrop-blur-md px-4 py-3 rounded-2xl border border-[#c7f300]/40 text-xs font-mono text-white shadow-2xl flex items-center gap-3 animate-fadeInUp">
          <Database className="w-4 h-4 text-[#c7f300]" />
          <span>{cacheNotification}</span>
          {cacheTimestamp && (
            <span className="text-[10px] text-gray-400">({cacheTimestamp})</span>
          )}
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        
        {/* Tab 1: Live Heatmap Hero & Overview */}
        {activeTab === 'heatmap' && (
          <div>
            <LiveHeatmapHero
              nodes={HEATMAP_NODES}
              onSelectNode={handleSelectHeatmapNode}
              onOpenAIAssistantWithQuery={handleOpenAIAssistantWithQuery}
            />

            {/* Quick Preview Sections below hero */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                    <Radio className="w-5 h-5 text-[#c7f300]" /> Notícias em Destaque
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-[#c5c9ac] bg-white/5 px-2 py-0.5 rounded border border-white/10 flex items-center gap-1">
                      <Zap className="w-3 h-3 text-[#c7f300]" /> Cache Local
                    </span>
                    <button
                      onClick={() => setActiveTab('news')}
                      className="text-xs font-mono text-[#c7f300] hover:underline"
                    >
                      Ver Tudo &rarr;
                    </button>
                  </div>
                </div>
                <p className="text-xs text-gray-300 font-body mb-4">
                  Acompanhe em tempo real as novidades sobre o Oasis Tour 2026, Coachella, guias anti-golpes e o ranking de ingressos da edição Thiago Reed.
                </p>
                <div className="space-y-3">
                  {newsArticles.slice(0, 2).map((art) => (
                    <div
                      key={art.id}
                      onClick={() => setPreviewArticle(art)}
                      className="p-3 rounded-xl bg-[#131316] hover:bg-white/5 border border-white/5 cursor-pointer transition-all flex items-center justify-between gap-3 group"
                    >
                      <div>
                        <span className="text-[10px] font-mono text-[#c7f300] font-bold block">{art.category}</span>
                        <h4 className="font-display font-bold text-sm text-white line-clamp-1 group-hover:text-[#c7f300] transition-colors">{art.title}</h4>
                      </div>
                      <span className="text-xs font-mono text-[#c7f300] font-bold shrink-0 group-hover:translate-x-1 transition-transform">Ler &rarr;</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-white flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-[#c7f300]" /> Veredito de Ingressos
                  </h3>
                  <button
                    onClick={() => setActiveTab('ranking')}
                    className="text-xs font-mono text-[#c7f300] hover:underline"
                  >
                    Ver Ranking &rarr;
                  </button>
                </div>
                <p className="text-xs text-gray-300 font-body mb-4">
                  Confira as taxas reais cobradas no checkout pela Ticketmaster, SeatGeek, TickPick (0% taxa) e os alertas sobre a StubHub.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-[#131316] p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-gray-400 block">Top 1 Recomendado</span>
                    <span className="font-bold text-sm text-white font-display">Ticketmaster</span>
                  </div>
                  <div className="bg-[#131316] p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] font-mono text-gray-400 block">Melhor Sem Taxas</span>
                    <span className="font-bold text-sm text-[#c7f300] font-display">TickPick (0% Fee)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: News Feed */}
        {activeTab === 'news' && (
          <NewsFeedSection
            articles={newsArticles}
            onOpenAIAssistantWithQuery={handleOpenAIAssistantWithQuery}
          />
        )}

        {/* Tab 3: Global Music Sources */}
        {activeTab === 'sources' && (
          <GlobalSourcesSection />
        )}

        {/* Tab 4: Ticket Ranking */}
        {activeTab === 'ranking' && (
          <TicketRankingSection platforms={TICKET_PLATFORMS} />
        )}

        {/* Tab 4: Anti-Scam Guide */}
        {activeTab === 'scam-guide' && (
          <AntiScamGuide onOpenAIAssistantWithQuery={handleOpenAIAssistantWithQuery} />
        )}

        {/* Tab 5: Tour Discovery Apps */}
        {activeTab === 'tour-apps' && (
          <TourDiscoveryApps apps={TOUR_APPS} />
        )}

        {/* Tab 6: API Control Panel */}
        {activeTab === 'apis' && (
          <ApiControlPanel initialMetrics={INITIAL_API_METRICS} />
        )}

      </main>

      {/* Global Article Reader Modal for Dashboard Quick Preview */}
      <ArticleReaderModal
        article={previewArticle}
        onClose={() => setPreviewArticle(null)}
        onOpenAIAssistantWithQuery={handleOpenAIAssistantWithQuery}
      />

      {/* Gemini AI Assistant Drawer */}
      <AIAssistantDrawer
        isOpen={aiDrawerOpen}
        onClose={() => setAiDrawerOpen(false)}
        initialQuery={aiQuery}
      />

      {/* Footer */}
      <footer className="w-full glass-panel border-t border-white/10 py-8 px-4 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#c5c9ac]">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-[#c7f300]" />
            <span className="font-bold text-white font-display text-sm">LIVEPULSE MUSIC PORTAL 2026</span>
            <span>&bull; Edição Editorial Thiago Reed</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <span>Fontes Auditadas: r/Music &bull; r/festivals &bull; Bandsintown API &bull; Songkick &bull; Ticketmaster</span>
          </div>

          <p className="text-[11px] text-gray-500">
            Powered by Google AI Studio & Gemini 2.5
          </p>
        </div>
      </footer>

    </div>
  );
}
