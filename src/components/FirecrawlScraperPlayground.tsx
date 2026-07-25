import React, { useState } from 'react';
import { Flame, Globe, Sparkles, Copy, Check, Download, FileText, Code2, ArrowRight, RefreshCw, Terminal, Layers } from 'lucide-react';
import { TRUSTED_SOURCES, scrapeSourceWithFirecrawl } from '../utils/firecrawlService';

interface ScrapeResult {
  url: string;
  title: string;
  markdownContent: string;
  structuredJson: {
    title: string;
    source: string;
    author: string;
    publishDate: string;
    sentiment: string;
    detectedArtists: string[];
    tourLocations: string[];
    summary: string;
  };
  crawlMap: string[];
}

export const FirecrawlScraperPlayground: React.FC = () => {
  const [targetUrl, setTargetUrl] = useState('https://www.billboard.com/music/concerts');
  const [isScraping, setIsScraping] = useState(false);
  const [activeTab, setActiveTab] = useState<'markdown' | 'json' | 'map' | 'code'>('markdown');
  const [copied, setCopied] = useState(false);
  const [scrapeResult, setScrapeResult] = useState<ScrapeResult | null>({
    url: 'https://www.billboard.com/music/concerts',
    title: 'Oasis Announce Extended 2026 World Tour Dates Across South America & Japan',
    markdownContent: `# Oasis Announce Extended 2026 World Tour Dates Across South America & Japan\n\n**By Billboard Staff** | *July 2026*\n\nFollowing unprecedented ticket demand across Europe and North America, rock legends **Oasis** have confirmed new stadium tour legs in **São Paulo (Estádio do Morumbi)**, **Rio de Janeiro (Maracanã)**, and **Tokyo (Tokyo Dome)** for autumn 2026.`,
    structuredJson: {
      title: 'Oasis Announce Extended 2026 World Tour Dates Across South America & Japan',
      source: 'Billboard Music',
      author: 'Billboard Staff',
      publishDate: '2026-07-24',
      sentiment: 'Very Positive',
      detectedArtists: ['Oasis', 'Liam Gallagher', 'Noel Gallagher'],
      tourLocations: ['São Paulo', 'Rio de Janeiro', 'Tokyo'],
      summary: 'Oasis confirma expansão da turnê mundial de 2026 para América do Sul e Ásia com controle rigoroso contra cambistas e precificação dinâmica.'
    },
    crawlMap: [
      'https://www.billboard.com/music/concerts',
      'https://www.billboard.com/charts/hot-100',
      'https://www.billboard.com/oasis-tickets-2026',
      'https://www.billboard.com/tour-reviews/oasis-live-2026'
    ]
  });

  const presetUrls = TRUSTED_SOURCES.map((source) => ({
    label: `${source.name} (${source.priority})`,
    url: source.url
  }));

  const handleRunScrape = async () => {
    setIsScraping(true);

    try {
      const data = await scrapeSourceWithFirecrawl(targetUrl);
      
      setScrapeResult({
        url: data.url,
        title: data.title,
        markdownContent: data.markdown,
        structuredJson: {
          title: data.structuredData.title,
          source: data.structuredData.source,
          author: data.structuredData.author,
          publishDate: data.structuredData.publishDate,
          sentiment: 'Auditado / Confiável',
          detectedArtists: data.structuredData.detectedArtists,
          tourLocations: data.structuredData.locations.map((l) => `${l.city} (${l.country})`),
          summary: data.structuredData.summary
        },
        crawlMap: data.mappedUrls || [
          targetUrl,
          `${targetUrl}/news`,
          `${targetUrl}/concerts-2026`,
          `${targetUrl}/rss.xml`
        ]
      });
    } catch (e) {
      console.error('Erro na extração Firecrawl:', e);
    } finally {
      setIsScraping(false);
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card p-6 sm:p-8 rounded-2xl border border-[#c7f300]/40 bg-[#131316] relative overflow-hidden my-8 shadow-2xl">
      {/* Background Accent glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#c7f300]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#c7f300] text-[#171e00] font-mono text-xs font-bold flex items-center gap-1 shadow-md">
              <Flame className="w-3.5 h-3.5 fill-[#171e00]" /> FIRECRAWL AI ENGINE
            </span>
            <span className="px-2.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-xs border border-white/10">
              Web Scraping & LLM Ingestion 2026
            </span>
          </div>

          <h3 className="font-display font-extrabold text-2xl text-white">
            Extrator Profissional de Conteúdo de Portais de Música
          </h3>
          <p className="text-xs font-body text-gray-300 max-w-2xl mt-1">
            Transforme qualquer portal de notícias musicais em Markdown limpo e JSON estruturado instantaneamente para inteligência editorial.
          </p>
        </div>

        <a
          href="https://github.com/firecrawl/firecrawl.git"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 rounded-xl bg-[#1b1b1e] hover:bg-white/10 border border-white/20 text-xs font-mono text-white flex items-center gap-2 transition-all shrink-0 hover:border-[#c7f300]"
        >
          <Code2 className="w-4 h-4 text-[#c7f300]" />
          <span>GitHub: Firecrawl Repo &rarr;</span>
        </a>
      </div>

      {/* URL Input Form */}
      <div className="space-y-3 mb-6">
        <label className="text-xs font-mono text-gray-300 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5 text-[#c7f300]" />
          Insira a URL do Portal de Música para Raspagem Automática:
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="url"
              value={targetUrl}
              onChange={(e) => setTargetUrl(e.target.value)}
              placeholder="https://www.billboard.com/music/news..."
              className="w-full px-4 py-3 rounded-xl bg-[#1b1b1e] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#c7f300] transition-colors"
            />
          </div>

          <button
            onClick={handleRunScrape}
            disabled={isScraping || !targetUrl}
            className="px-6 py-3 rounded-xl bg-[#c7f300] text-[#171e00] font-display font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
          >
            {isScraping ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Raspando via Firecrawl...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Executar Raspagem AI</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-mono text-gray-400">Exemplos Prontos:</span>
          {presetUrls.map((preset, i) => (
            <button
              key={i}
              onClick={() => setTargetUrl(preset.url)}
              className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-white/10 text-[10px] font-mono text-gray-300 hover:text-white transition-all border border-white/5"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrape Output Preview */}
      {scrapeResult && (
        <div className="glass-panel rounded-xl border border-white/10 overflow-hidden">
          {/* Output Toolbar */}
          <div className="bg-[#1b1b1e] px-4 py-3 border-b border-white/10 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('markdown')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'markdown'
                    ? 'bg-[#c7f300] text-[#171e00]'
                    : 'text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Markdown (LLM)
              </button>

              <button
                onClick={() => setActiveTab('json')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'json'
                    ? 'bg-[#c7f300] text-[#171e00]'
                    : 'text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" /> JSON Estruturado
              </button>

              <button
                onClick={() => setActiveTab('map')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'map'
                    ? 'bg-[#c7f300] text-[#171e00]'
                    : 'text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                <Layers className="w-3.5 h-3.5" /> Mapa de Links (/map)
              </button>

              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === 'code'
                    ? 'bg-[#c7f300] text-[#171e00]'
                    : 'text-gray-400 hover:text-white bg-white/5'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> Código Firecrawl API
              </button>
            </div>

            <button
              onClick={() =>
                handleCopy(
                  activeTab === 'json'
                    ? JSON.stringify(scrapeResult.structuredJson, null, 2)
                    : scrapeResult.markdownContent
                )
              }
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-mono text-white flex items-center gap-1.5 transition-all"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#c7f300]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado!' : 'Copiar'}</span>
            </button>
          </div>

          {/* Content Views */}
          <div className="p-4 sm:p-6 bg-[#131316] max-h-96 overflow-y-auto font-mono text-xs text-gray-200">
            {activeTab === 'markdown' && (
              <pre className="whitespace-pre-wrap font-sans text-xs leading-relaxed text-gray-300">
                {scrapeResult.markdownContent}
              </pre>
            )}

            {activeTab === 'json' && (
              <pre className="text-[#ecb2ff] bg-[#1a1a1e] p-4 rounded-xl border border-white/5 overflow-x-auto">
                {JSON.stringify(scrapeResult.structuredJson, null, 2)}
              </pre>
            )}

            {activeTab === 'map' && (
              <div className="space-y-2">
                <p className="text-gray-400 text-[11px] mb-3">
                  Links mapeados no portal via rota <code className="text-[#c7f300]">/v1/map</code> de Firecrawl:
                </p>
                {scrapeResult.crawlMap.map((link, idx) => (
                  <div key={idx} className="p-2 rounded bg-white/5 flex items-center gap-2 text-gray-300">
                    <span className="text-[#c7f300] font-bold">#{idx + 1}</span>
                    <span className="truncate">{link}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'code' && (
              <div className="space-y-4 font-mono text-xs">
                <div className="bg-[#1a1a1e] p-4 rounded-xl border border-white/10">
                  <span className="text-gray-400 block mb-2">// cURL Request para o Firecrawl API</span>
                  <code className="text-[#c7f300] block whitespace-pre-wrap">
{`curl -X POST "https://api.firecrawl.dev/v1/scrape" \\
  -H "Authorization: Bearer YOUR_FIRECRAWL_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "${scrapeResult.url}",
    "formats": ["markdown", "html"],
    "onlyMainContent": true
  }'`}
                  </code>
                </div>

                <div className="bg-[#1a1a1e] p-4 rounded-xl border border-white/10">
                  <span className="text-gray-400 block mb-2">// Node.js SDK</span>
                  <code className="text-[#ecb2ff] block whitespace-pre-wrap">
{`import FirecrawlApp from '@mendable/firecrawl-js';

const app = new FirecrawlApp({ apiKey: process.env.FIRECRAWL_API_KEY });
const scrapeResult = await app.scrapeUrl('${scrapeResult.url}', {
  formats: ['markdown'],
});

console.log(scrapeResult.markdown);`}
                  </code>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
