import React, { useEffect } from 'react';
import { NewsArticle } from '../types';
import { X, Clock, ShieldCheck, CheckCircle, ExternalLink, Tag, Sparkles, ArrowLeft } from 'lucide-react';
import { calculateArticleStats } from '../utils/readingTime';

interface ArticleReaderModalProps {
  article: NewsArticle | null;
  onClose: () => void;
  onOpenAIAssistantWithQuery?: (query: string) => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onOpenAIAssistantWithQuery
}) => {
  // Prevent background body scroll when modal is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  if (!article) return null;

  const stats = calculateArticleStats(article.content);
  const targetSourceUrl = article.sourceUrl || (
    article.confirmedBySource?.toLowerCase().includes('pitchfork') ? 'https://pitchfork.com/' :
    article.confirmedBySource?.toLowerCase().includes('nme') ? 'https://www.nme.com/' :
    article.confirmedBySource?.toLowerCase().includes('pollstar') ? 'https://www.pollstar.com/' :
    'https://www.billboard.com/music/'
  );

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md p-2 sm:p-4 md:p-6 flex justify-center items-start animate-fadeIn cursor-pointer"
      onClick={(e) => {
        // Close if clicking the backdrop outside the card
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="relative w-full max-w-3xl glass-panel rounded-2xl border border-[#c7f300]/30 overflow-hidden my-4 sm:my-8 bg-[#131316] shadow-2xl cursor-default animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Bar for easy closing & reading original anytime */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-3 sm:px-4 py-3 bg-[#131316]/95 backdrop-blur-md border-b border-white/10 gap-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c7f300] font-bold">
            <span className="w-2 h-2 rounded-full bg-[#c7f300] animate-pulse" />
            <span className="hidden sm:inline">Leitura Completa</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={targetSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-[#c7f300] text-white hover:text-black border border-white/20 font-display font-bold text-xs transition-all shadow-md active:scale-95"
              title="Abrir matéria original na fonte externa"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Ler no Site Original</span>
            </a>

            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#c7f300] text-[#171e00] hover:bg-white font-display font-bold text-xs transition-all shadow-lg active:scale-95"
              title="Fechar Notícia"
              aria-label="Fechar Notícia"
            >
              <X className="w-4 h-4" />
              <span className="hidden sm:inline">Fechar</span>
            </button>
          </div>
        </div>

        {/* Modal Header Image with Gradient Overlay */}
        <div className="relative h-48 sm:h-64 md:h-72 overflow-hidden w-full">
          <img
            src={article.imageUrl || 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'}
            alt={article.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#131316] via-[#131316]/50 to-transparent" />
          
          <div className="absolute bottom-3 left-4 right-4 sm:left-6 sm:right-6">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="px-2.5 py-1 rounded bg-[#c7f300] text-[#171e00] font-mono text-xs font-bold shadow-md">
                {article.category}
              </span>
              <span className="px-2.5 py-1 rounded bg-[#181e05]/95 text-[#c7f300] border border-[#c7f300]/40 font-mono text-xs flex items-center gap-1 font-bold backdrop-blur-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c7f300]" />
                {article.confirmationDate || 'Confirmado'}
              </span>
              {article.verifiedByThiagoReed && (
                <span className="px-2.5 py-1 rounded bg-[#131316]/95 text-[#c7f300] border border-[#c7f300]/40 font-mono text-xs flex items-center gap-1 backdrop-blur-sm">
                  <CheckCircle className="w-3.5 h-3.5" /> Verified
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Modal Content Body */}
        <div className="p-4 sm:p-6 md:p-8 space-y-6 font-body text-sm leading-relaxed text-gray-200">
          
          {/* Article Title & Source */}
          <div className="space-y-3">
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
              {article.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              {article.confirmedBySource && (
                <p className="text-xs font-mono text-[#c7f300] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#c7f300]" /> Fonte Auditada: <strong className="text-gray-200">{article.confirmedBySource}</strong>
                </p>
              )}

              {/* Direct Call-to-action Button to read original article */}
              <a
                href={targetSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#c7f300] text-[#171e00] font-display font-bold text-xs hover:bg-white transition-all shadow-md active:scale-95 shrink-0"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Ler Artigo Original Completo em {article.confirmedBySource || 'Fonte Oficial'} &rarr;</span>
              </a>
            </div>
          </div>

          {/* Subtitle / Key Takeaway */}
          {article.subtitle && (
            <p className="text-base sm:text-lg font-semibold text-white/90 border-l-4 border-[#c7f300] pl-4 italic bg-white/5 py-3 pr-3 rounded-r leading-relaxed">
              {article.subtitle}
            </p>
          )}

          {/* Author and Date Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-gray-300 py-3 px-4 bg-[#18181c] rounded-xl border border-white/10">
            <div className="flex flex-wrap items-center gap-3">
              <span>Autor: <strong className="text-white">{article.author}</strong></span>
              <span>&bull;</span>
              <span>Publicado: <strong className="text-white">{article.date}</strong></span>
            </div>
            <span className="flex items-center gap-1.5 text-[#c7f300] font-bold">
              <Clock className="w-4 h-4" />
              {stats.readingTimeLabel} ({stats.wordCount} palavras)
            </span>
          </div>

          {/* Main Article Body */}
          <div className="whitespace-pre-line space-y-4 text-gray-200 text-base leading-relaxed sm:leading-loose font-body border-y border-white/5 py-4">
            {article.content}
          </div>

          {/* Reddit Fan Reactions */}
          {article.redditQuotes && article.redditQuotes.length > 0 && (
            <div className="p-4 rounded-xl bg-[#18181c] border border-orange-500/30 space-y-3">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-orange-400 flex items-center gap-2">
                Reações da Comunidade Reddit (Real-time)
              </h4>
              <div className="space-y-2">
                {article.redditQuotes.map((rq, idx) => (
                  <div key={idx} className="text-xs font-body italic text-gray-300 bg-black/30 p-3 rounded-lg border border-white/5">
                    <span className="text-orange-400 font-mono font-bold not-italic mr-2">{rq.subreddit}:</span>
                    "{rq.quote}"
                    <span className="block mt-1 font-mono text-[10px] text-gray-400 not-italic">
                      — {rq.user} ({rq.timeAgo}) &bull; {rq.upvotes} upvotes
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sources & Tags */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-1">
                <ExternalLink className="w-3.5 h-3.5 text-[#c7f300]" /> Fontes Verificadas:
              </span>
              {article.sources?.map((src, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-[#1f1f23] border border-white/10 text-xs font-mono text-gray-300">
                  {src}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono font-bold text-gray-400 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#ecb2ff]" /> Tags:
              </span>
              {article.tags?.map((tag, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-[#cf5cff]/10 text-[#ecb2ff] text-xs font-mono font-semibold">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Assistance Prompt Box */}
          {onOpenAIAssistantWithQuery && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#1b1b1e] border border-[#c7f300]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg">
              <div className="flex items-center gap-3">
                <Sparkles className="w-6 h-6 text-[#c7f300] shrink-0" />
                <div>
                  <h5 className="font-display font-bold text-sm text-white">Dúvidas sobre este evento ou show?</h5>
                  <p className="text-xs text-gray-400 font-mono">Pergunte à IA do LivePulse sobre ingressos, preços ou datas extras.</p>
                </div>
              </div>
              <button
                onClick={() => {
                  onClose();
                  onOpenAIAssistantWithQuery(`Gostaria de saber mais detalhes e conselhos de compra sobre: ${article.title}`);
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-[#c7f300] text-[#171e00] font-display font-bold text-xs shrink-0 hover:brightness-110 transition-all shadow-md text-center active:scale-95"
              >
                Perguntar à IA
              </button>
            </div>
          )}

          {/* Bottom Dual Action Buttons for Lay Users */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={targetSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3.5 px-4 rounded-xl bg-[#c7f300] hover:bg-white text-[#171e00] font-display font-bold text-sm transition-all border border-[#c7f300] flex items-center justify-center gap-2 shadow-lg active:scale-98 text-center"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Acessar Artigo Original na Fonte ({article.confirmedBySource || 'Oficial'})</span>
            </a>

            <button
              onClick={onClose}
              className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-display font-bold text-sm transition-all border border-white/10 flex items-center justify-center gap-2 shadow-lg active:scale-98"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Voltar</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

