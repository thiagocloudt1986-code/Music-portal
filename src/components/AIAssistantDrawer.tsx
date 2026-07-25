import React, { useState, useEffect, useRef } from 'react';
import { AIChatMessage } from '../types';
import { Sparkles, X, Send, Bot, User, ShieldCheck, HelpCircle, Loader2 } from 'lucide-react';

interface AIAssistantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const AIAssistantDrawer: React.FC<AIAssistantDrawerProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Olá! Sou o assistente do LivePulse (Thiago Reed Editorial 2026).\n\nPosso ajudar você a:\n• Verificar se uma oferta de ingresso parece suspeita ou golpe.\n• Calcular taxas reais cobradas no checkout (StubHub vs TickPick vs Ticketmaster).\n• Recomendar itinerários de festivais e alertas de turnê via Bandsintown & Songkick.\n\nComo posso ajudar você hoje?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const presetQueries = [
    'Como evitar golpes de ingressos em revenda via Pix?',
    'Qual plataforma de ingresso cobra 0% de taxa no comprador?',
    'O Oasis World Tour 2026 terá mais datas na América Latina?',
    'Bandsintown vs Songkick: qual o melhor no Brasil?'
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: AIChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: text, contextType: 'Tour & Ticket Security' })
      });

      if (res.ok) {
        const data = await res.json();
        const aiMsg: AIChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: data.response || 'Sem resposta disponível no momento.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          source: data.source
        };
        setMessages((prev) => [...prev, aiMsg]);
      } else {
        throw new Error('Falha na resposta do servidor.');
      }
    } catch (err: any) {
      const errorMsg: AIChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: 'Não foi possível conectar ao servidor de IA no momento. Por favor, verifique sua conexão ou tente novamente.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery, isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-[#131316] border-l border-[#c7f300]/30 h-full flex flex-col shadow-2xl relative">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-white/10 glass-panel flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#c7f300] text-[#171e00] font-bold shadow-md">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-extrabold text-lg text-white">
                LivePulse Insights Editorial
              </h3>
              <p className="text-[11px] font-mono text-[#c5c9ac]">
                Assistente de Ingressos & Turnês 2026
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Prompt Suggestions */}
        <div className="p-3 bg-[#1b1b1e] border-b border-white/5 overflow-x-auto flex gap-2">
          {presetQueries.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-[#c7f300]/20 border border-white/10 hover:border-[#c7f300] text-[11px] font-mono text-gray-300 hover:text-[#c7f300] whitespace-nowrap transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Stream */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-[#c7f300]/10 border border-[#c7f300]/30 text-[#c7f300] flex items-center justify-center shrink-0">
                  <Sparkles className="w-4 h-4" />
                </div>
              )}

              <div className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed font-body whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-[#c7f300] text-[#171e00] font-semibold rounded-tr-none'
                  : 'bg-[#1b1b1e] text-gray-200 border border-white/10 rounded-tl-none shadow-md'
              }`}>
                {msg.text}

                <div className={`mt-2 text-[10px] font-mono flex items-center justify-between gap-2 border-t pt-1.5 ${
                  msg.sender === 'user' ? 'border-[#171e00]/20 text-[#171e00]/80' : 'border-white/5 text-gray-400'
                }`}>
                  <span>{msg.timestamp}</span>
                  {msg.source && <span className="uppercase text-[9px] font-bold">Model: {msg.source}</span>}
                </div>
              </div>

              {msg.sender === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs font-mono text-[#c7f300] bg-[#1b1b1e] p-3 rounded-xl border border-white/10 w-fit">
              <Loader2 className="w-4 h-4 animate-spin text-[#c7f300]" />
              <span>Analisando dados do LivePulse com Gemini...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-white/10 glass-panel">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua dúvida sobre ingressos ou turnês..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-[#1b1b1e] border border-white/10 text-xs font-mono text-white placeholder-gray-500 focus:outline-none focus:border-[#c7f300]"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-[#c7f300] text-[#171e00] font-bold hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
