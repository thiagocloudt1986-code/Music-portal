import React, { useState } from 'react';
import {
  GLOBAL_MUSIC_SOURCES,
  REFERENCE_SOURCES_CATEGORIES,
  SourceItem
} from '../data/referenceSources';
import { FirecrawlScraperPlayground } from './FirecrawlScraperPlayground';
import {
  Globe,
  ExternalLink,
  Search,
  CheckCircle2,
  BookmarkCheck,
  Star,
  Newspaper,
  ShieldCheck,
  Building2,
  Radio
} from 'lucide-react';

export const GlobalSourcesSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('TODAS');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = GLOBAL_MUSIC_SOURCES.filter((source) => {
    const matchesCategory =
      selectedCategory === 'TODAS'
        ? true
        : selectedCategory === 'TOP 20'
        ? source.isTop20
        : source.category === selectedCategory;

    const matchesSearch =
      source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      source.url.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (source.country && source.country.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const top20Sources = GLOBAL_MUSIC_SOURCES.filter(s => s.isTop20);

  return (
    <section className="w-full mb-12 animate-fadeIn">
      {/* Header Banner */}
      <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#c7f300]/30 mb-8 bg-gradient-to-r from-[#171e00]/80 via-[#1b1b1e] to-[#131316] relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#c7f300]/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#c7f300] text-[#171e00] font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                <Globe className="w-3.5 h-3.5" /> Fontes Oficiais Auditadas
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 text-gray-300 font-mono text-xs border border-white/10">
                Curadoria Internacional 2026
              </span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-3 leading-tight">
              Os Principais Portais de Música do Mundo
            </h2>

            <p className="text-sm font-body text-gray-300 leading-relaxed">
              Diretório consolidado de portais globais com credibilidade editorial auditada. 
              Fontes oficiais para notícias, bilheteria, analytics, charts, festivais e mercado da música.
            </p>
          </div>

          <div className="glass-panel p-4 rounded-xl border border-white/10 flex flex-col gap-2 shrink-0 max-w-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-[#c7f300]">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>100% Links Diretos Oficiais</span>
            </div>
            <p className="text-[11px] font-mono text-gray-400">
              Salvo no arquivo de referência editorial <code className="text-[#ecb2ff]">fontes_confiaveis.md</code> do LivePulse.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Category Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        {/* Category Selector Scrollable */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {REFERENCE_SOURCES_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold whitespace-nowrap transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#c7f300] text-[#171e00] shadow-md'
                  : 'bg-[#1b1b1e] text-gray-300 border border-white/5 hover:border-white/20'
              }`}
            >
              {cat === 'TOP 20' ? '⭐ TOP 20' : cat}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px] shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar portal ou país..."
            className="w-full pl-10 pr-8 py-2 rounded-xl bg-[#1b1b1e] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#c7f300] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-white"
            >
              &times;
            </button>
          )}
        </div>
      </div>

      {/* Highlight: Top 20 Must Read Section (When TOP 20 category or TODAS is selected) */}
      {(selectedCategory === 'TODAS' || selectedCategory === 'TOP 20') && !searchQuery && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-[#c7f300] fill-[#c7f300]" />
            <h3 className="font-display font-bold text-xl text-white">
              ⭐ Top 20 (Leitura Obrigatória da Indústria)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {top20Sources.slice(0, 8).map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-card p-4 rounded-xl border border-[#c7f300]/20 hover:border-[#c7f300] transition-all duration-300 flex items-center justify-between gap-3 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-lg bg-[#c7f300]/10 border border-[#c7f300]/30 text-[#c7f300] font-mono font-bold text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </span>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#c7f300] transition-colors flex items-center gap-1.5">
                      {src.name}
                      {src.country && <span className="text-xs">{src.country}</span>}
                    </h4>
                    <span className="text-[10px] font-mono text-gray-400 block truncate max-w-[140px]">
                      {src.category}
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#c7f300] shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid of Portals */}
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
          <Newspaper className="w-4 h-4 text-[#c7f300]" />
          Portais Encontrados ({filteredSources.length})
        </h3>
        <span className="text-xs font-mono text-gray-400">
          Categoria: <strong className="text-[#c7f300]">{selectedCategory}</strong>
        </span>
      </div>

      {filteredSources.length === 0 ? (
        <div className="glass-panel p-8 text-center rounded-2xl border border-white/10">
          <p className="text-sm font-mono text-gray-400">
            Nenhum portal encontrado para "{searchQuery}".
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSources.map((source, idx) => (
            <a
              key={idx}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group glass-card p-4 rounded-xl border border-white/10 hover:border-[#c7f300]/60 transition-all duration-300 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#131316] border border-white/10 text-[#c7f300] group-hover:bg-[#c7f300] group-hover:text-[#171e00] transition-all shrink-0">
                  <Globe className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-display font-bold text-sm text-white group-hover:text-[#c7f300] transition-colors">
                      {source.name}
                    </h4>
                    {source.country && (
                      <span className="text-xs font-mono text-gray-400">{source.country}</span>
                    )}
                    {source.isTop20 && (
                      <span className="px-1.5 py-0.2 rounded bg-[#c7f300]/20 text-[#c7f300] text-[9px] font-mono font-bold">
                        TOP 20
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] font-mono text-gray-400 truncate max-w-[200px]">
                    {source.url.replace('https://', '').replace('www.', '')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-gray-400">
                  {source.category}
                </span>
                <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-[#c7f300] transition-colors" />
              </div>
            </a>
          ))}
        </div>
      )}

      {/* Firecrawl Interactive Scraper Playground */}
      <FirecrawlScraperPlayground />

      {/* Audit Citation Footer Notice */}
      <div className="mt-8 glass-panel p-4 rounded-xl border border-white/10 text-xs font-mono text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>
          📌 Lista consolidada a partir de publicações internacionais reconhecidas (**Billboard, Pitchfork, Pollstar, IFPI, NME, Billboard Brasil** e outros).
        </p>
        <a
          href="https://www.billboard.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#c7f300] hover:underline shrink-0 flex items-center gap-1"
        >
          Acessar Billboard Global &rarr;
        </a>
      </div>
    </section>
  );
};
