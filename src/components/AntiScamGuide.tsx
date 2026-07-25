import React, { useState } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle2, AlertOctagon, Sparkles, Lock, CreditCard, ExternalLink, HelpCircle } from 'lucide-react';

interface AntiScamGuideProps {
  onOpenAIAssistantWithQuery: (query: string) => void;
}

export const AntiScamGuide: React.FC<AntiScamGuideProps> = ({ onOpenAIAssistantWithQuery }) => {
  const [testUrl, setTestUrl] = useState('');
  const [testMethod, setTestMethod] = useState<'CARD' | 'PIX_DIRECT' | 'ESCROW'>('PIX_DIRECT');
  const [testResult, setTestResult] = useState<{
    riskLevel: 'BAIXO' | 'MÉDIO' | 'CRÍTICO';
    score: number;
    title: string;
    description: string;
    recommendations: string[];
  } | null>(null);

  const handleRunSecurityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testUrl.trim()) return;

    const lower = testUrl.toLowerCase();
    
    // Check known official domains
    const isOfficialDomain = lower.includes('ticketmaster.com') || lower.includes('seatgeek.com') || lower.includes('tickpick.com') || lower.includes('eventim.com.br') || lower.includes('sympla.com.br');

    if (isOfficialDomain && testMethod !== 'PIX_DIRECT') {
      setTestResult({
        riskLevel: 'BAIXO',
        score: 98,
        title: 'Domínio Oficial e Seguro Detectado',
        description: 'A URL corresponde a um parceiro de bilheteria primária ou secundária verificado. Transações nesta plataforma possuem proteção ao comprador.',
        recommendations: [
          'Confirme se o cadeado SSL do navegador está ativo.',
          'Utilize cartão de crédito para facilidade de estorno em caso de cancelamento do evento.'
        ]
      });
    } else if (testMethod === 'PIX_DIRECT' || lower.includes('instagram') || lower.includes('whatsapp') || lower.includes('telegram')) {
      setTestResult({
        riskLevel: 'CRÍTICO',
        score: 15,
        title: 'Alto Risco de Fraude / Venda Não Intermediada',
        description: 'ATENÇÃO CRÍTICA: Vendas via Pix direto ou negociações em redes sociais sem intermediação de plataforma não possuem garantia de recebimento.',
        recommendations: [
          'NUNCA transfira valores diretamente para pessoas físicas sem usar plataformas com garantia (TickPick, Ticketmaster, StubHub).',
          'Exija que o vendedor liste o ingresso em uma plataforma com estorno garantido antes de pagar.'
        ]
      });
    } else {
      setTestResult({
        riskLevel: 'MÉDIO',
        score: 55,
        title: 'Plataforma Não Verificada Automaticamente',
        description: 'Este link/plataforma não consta na lista primária de bilheterias oficiais. Recomenda-se cautela adicional.',
        recommendations: [
          'Verifique a reputação no Reclame Aqui e fóruns como o r/festivals.',
          'Consulte o assistente de IA do LivePulse para análise detalhada do domínio.'
        ]
      });
    }
  };

  return (
    <section className="w-full mb-12">
      
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
            Guia de Segurança Anti-Golpes em Ingressos 2026
          </h2>
          <p className="text-xs font-mono text-[#c5c9ac]">
            Auditado pelo LivePulse Security Lab &bull; Dicas de Prevenção e Diagnóstico em Tempo Real
          </p>
        </div>
      </div>

      {/* Interactive Link Diagnostic Tool */}
      <div className="p-6 lg:p-8 rounded-2xl glass-panel border border-[#c7f300]/30 mb-8">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#c7f300]" />
          <h3 className="font-display font-bold text-lg text-white">
            Verificador Rápido de Segurança de Ingressos & Vendedores
          </h3>
        </div>

        <form onSubmit={handleRunSecurityCheck} className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8">
              <label className="block text-xs font-mono text-gray-400 mb-1">
                Link do Anúncio ou Perfil do Vendedor (ex: ticketmaster.com, perfil do Instagram, etc.)
              </label>
              <input
                type="text"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                placeholder="Cole o link ou nome da plataforma aqui..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#131316] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#c7f300]"
                required
              />
            </div>

            <div className="md:col-span-4">
              <label className="block text-xs font-mono text-gray-400 mb-1">
                Método de Pagamento Exigido
              </label>
              <select
                value={testMethod}
                onChange={(e) => setTestMethod(e.target.value as any)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#131316] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#c7f300]"
              >
                <option value="PIX_DIRECT">Pix / Transferência Direta (Sem Mediação)</option>
                <option value="CARD">Cartão de Crédito com Checkout Seguro</option>
                <option value="ESCROW">Plataforma com Retenção de Pagamento</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#c7f300] text-[#171e00] font-display font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <ShieldCheck className="w-4 h-4" />
            Executar Diagnóstico de Segurança
          </button>
        </form>

        {/* Diagnostic Results Box */}
        {testResult && (
          <div className={`p-5 rounded-xl border transition-all ${
            testResult.riskLevel === 'BAIXO'
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-200'
              : testResult.riskLevel === 'CRÍTICO'
              ? 'bg-rose-500/10 border-rose-500/40 text-rose-200'
              : 'bg-amber-500/10 border-amber-500/40 text-amber-200'
          }`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {testResult.riskLevel === 'BAIXO' ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <AlertOctagon className="w-5 h-5 text-rose-400" />
                )}
                <h4 className="font-display font-bold text-base text-white">
                  {testResult.title}
                </h4>
              </div>
              <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-black/40 border border-white/10">
                Score de Segurança: {testResult.score}/100
              </span>
            </div>

            <p className="text-xs font-body mb-4 text-white/90 leading-relaxed">
              {testResult.description}
            </p>

            <div className="space-y-1.5 pt-3 border-t border-white/10 text-xs font-mono">
              <span className="font-bold text-white uppercase block">Recomendações Imediatas:</span>
              {testResult.recommendations.map((rec, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span>&bull;</span>
                  <span>{rec}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenAIAssistantWithQuery(`Gostaria de ajuda para analisar se esta oferta de ingresso é confiável: "${testUrl}" com pagamento via ${testMethod}.`)}
              className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-bold flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c7f300]" /> Pedir Segunda Opinião à IA LivePulse
            </button>
          </div>
        )}
      </div>

      {/* Anti-Scam Rules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">
            1. Transparência de Transferência
          </h3>
          <p className="text-xs font-body text-gray-300 leading-relaxed">
            Ingressos digitais modernos (Ticketmaster, Eventim) utilizam QR codes dinâmicos que mudam periodicamente. Prints estáticos de PDF enviadas por e-mail têm alta taxa de falsificação.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#c7f300]/10 border border-[#c7f300]/30 flex items-center justify-center text-[#c7f300]">
            <CreditCard className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">
            2. Proteção do Comprador
          </h3>
          <p className="text-xs font-body text-gray-300 leading-relaxed">
            Sempre utilize plataformas que retêm o pagamento do vendedor até que o evento aconteça (ex: TickPick, SeatGeek, StubHub FanProtect). Isso garante reembolso integral em caso de fraude.
          </p>
        </div>

        <div className="p-6 rounded-2xl glass-card border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertOctagon className="w-5 h-5" />
          </div>
          <h3 className="font-display font-bold text-lg text-white">
            3. Cuidado com Pressão Psicológica
          </h3>
          <p className="text-xs font-body text-gray-300 leading-relaxed">
            Golpistas costumam inventar estórias de urgência ("vários compradores interessados", "preciso vender nos próximos 10 minutos"). Mantenha a calma e siga os protocolos de verificação.
          </p>
        </div>
      </div>

    </section>
  );
};
