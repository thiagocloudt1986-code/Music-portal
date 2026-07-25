import React, { useState } from 'react';
import { TicketPlatform } from '../types';
import { ShieldCheck, Award, AlertTriangle, CheckCircle, ExternalLink, Calculator, DollarSign, ArrowRight } from 'lucide-react';

interface TicketRankingSectionProps {
  platforms: TicketPlatform[];
}

export const TicketRankingSection: React.FC<TicketRankingSectionProps> = ({ platforms }) => {
  const [basePrice, setBasePrice] = useState<number>(500);

  return (
    <section className="w-full mb-12">
      
      {/* Title & Editorial Intro */}
      <div className="mb-8 p-6 lg:p-8 rounded-2xl glass-panel border border-[#c7f300]/30 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-60 h-60 bg-[#c7f300]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-[#c7f300] text-[#171e00] font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                <Award className="w-4 h-4" /> Veredito Editorial Thiago Reed 2026
              </span>
              <span className="text-xs font-mono text-gray-400">Ranking Top Mundial</span>
            </div>
            
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white mb-2">
              Comparativo das Melhores Plataformas de Ingressos
            </h2>
            <p className="text-sm font-body text-gray-300 max-w-3xl leading-relaxed">
              Comparamos transparência de taxas, velocidade de entrega digital e garantias antifraude entre as maiores bilheterias oficiais e sites de revenda de ingressos do mundo.
            </p>
          </div>

          {/* Key Rule Callout */}
          <div className="bg-[#1b1b1e] p-4 rounded-xl border border-white/10 shrink-0 max-w-xs">
            <div className="flex items-center gap-2 text-rose-400 font-mono text-xs font-bold mb-1">
              <AlertTriangle className="w-4 h-4" /> Alerta de Taxa Oculta
            </div>
            <p className="text-xs text-gray-300 font-body">
              Sites como StubHub podem adicionar até <strong className="text-white">40% em taxas adicionais</strong> na tela final. Sempre verifique o valor total antes de pagar.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Fee Simulator */}
      <div className="mb-8 p-6 rounded-2xl bg-[#1b1b1e] border border-white/10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#c7f300]" />
            <h3 className="font-display font-bold text-lg text-white">
              Simulador de Taxas Reais no Checkout
            </h3>
          </div>
          
          <div className="flex items-center gap-2 bg-[#131316] px-3 py-1.5 rounded-lg border border-white/10">
            <span className="text-xs font-mono text-gray-400">Valor Base do Ingresso:</span>
            <div className="flex items-center text-xs font-mono font-bold text-[#c7f300]">
              <span>R$ / $</span>
              <input
                type="number"
                value={basePrice}
                onChange={(e) => setBasePrice(Math.max(10, Number(e.target.value)))}
                className="w-20 bg-transparent text-right text-[#c7f300] font-bold focus:outline-none border-b border-[#c7f300]/50 ml-1"
              />
            </div>
          </div>
        </div>

        {/* Simulator Results Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {platforms.map((p) => {
            const estimatedFee = (basePrice * p.averageFeePercentage) / 100;
            const totalPrice = basePrice + estimatedFee;
            const isZeroFee = p.averageFeePercentage === 0;

            return (
              <div 
                key={p.id}
                className={`p-4 rounded-xl border transition-all ${
                  isZeroFee 
                    ? 'bg-[#c7f300]/10 border-[#c7f300] shadow-md' 
                    : 'bg-[#131316] border-white/5'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-display font-bold text-sm text-white">{p.name}</span>
                  <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded ${
                    isZeroFee ? 'bg-[#c7f300] text-[#171e00]' : 'bg-white/10 text-gray-300'
                  }`}>
                    {p.averageFeePercentage}% Taxa
                  </span>
                </div>

                <div className="space-y-1 mb-2 font-mono">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span>Taxa Estimada:</span>
                    <span>+ R$/$ {estimatedFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-white pt-1 border-t border-white/10">
                    <span>Custo Total:</span>
                    <span className={isZeroFee ? 'text-[#c7f300]' : 'text-white'}>
                      R$/$ {totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-gray-400 font-mono truncate">{p.feePolicy}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Ranking Cards */}
      <div className="space-y-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            className={`p-6 lg:p-8 rounded-2xl glass-card border transition-all duration-300 ${
              platform.rank === 1
                ? 'border-[#c7f300] shadow-lg bg-gradient-to-r from-[#1b1b1e] via-[#1b1b1e] to-[#c7f300]/5'
                : 'border-white/10 hover:border-white/20'
            }`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Rank Badge & Logo */}
              <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-xl shadow-inner ${
                    platform.rank === 1
                      ? 'bg-[#c7f300] text-[#171e00]'
                      : 'bg-[#2a2a2d] text-white border border-white/10'
                  }`}>
                    #{platform.rank}
                  </div>
                  <div>
                    <h3 className="font-display font-extrabold text-2xl text-white">
                      {platform.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#c5c9ac]">
                      <span>★ {platform.rating} / 5.0</span>
                      <span>&bull;</span>
                      <span>{platform.fraudGuarantee ? 'Garantia Antifraude' : 'Sem Garantia'}</span>
                    </div>
                  </div>
                </div>

                <a
                  href={platform.officialUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white font-bold flex items-center gap-2 transition-all"
                >
                  Visitar Site <ExternalLink className="w-3.5 h-3.5 text-[#c7f300]" />
                </a>
              </div>

              {/* Main Features & Policy */}
              <div className="lg:col-span-6 space-y-4">
                <div>
                  <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
                    Melhor Para:
                  </span>
                  <p className="text-sm font-semibold text-white font-body">
                    {platform.bestFor}
                  </p>
                </div>

                {/* Pros list */}
                <div className="space-y-1.5">
                  <span className="text-[11px] font-mono text-[#c7f300] uppercase font-bold block">
                    Pontos Fortes:
                  </span>
                  {platform.pros.map((pro, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-body text-gray-300">
                      <CheckCircle className="w-4 h-4 text-[#c7f300] shrink-0 mt-0.5" />
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>

                {/* Cons & Warning */}
                {platform.cons.length > 0 && (
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-mono text-rose-400 uppercase font-bold block">
                      Pontos de Atenção:
                    </span>
                    {platform.cons.map((con, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs font-body text-gray-300">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                        <span>{con}</span>
                      </div>
                    ))}
                  </div>
                )}

                {platform.redFlagWarning && (
                  <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-xs text-rose-200 font-mono flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{platform.redFlagWarning}</span>
                  </div>
                )}
              </div>

              {/* Verdict Side Box */}
              <div className="lg:col-span-3 bg-[#131316] p-4 rounded-xl border border-white/5 space-y-3">
                <span className="text-[11px] font-mono text-[#ecb2ff] uppercase font-bold block">
                  Veredito da Comunidade Reddit:
                </span>
                <p className="text-xs font-body text-gray-300 italic leading-relaxed">
                  "{platform.redditVerdict}"
                </p>

                <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-gray-400">
                  Política de Taxa: <strong className="text-white block">{platform.feePolicy}</strong>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
