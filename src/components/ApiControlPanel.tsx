import React, { useState, useEffect } from 'react';
import { ApiStatusItem } from '../types';
import { Activity, RefreshCw, CheckCircle2, AlertTriangle, Radio, Server, Zap, Globe, Cpu } from 'lucide-react';

interface ApiControlPanelProps {
  initialMetrics: ApiStatusItem[];
}

export const ApiControlPanel: React.FC<ApiControlPanelProps> = ({ initialMetrics }) => {
  const [metrics, setMetrics] = useState<ApiStatusItem[]>(initialMetrics);
  const [loading, setLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>(new Date().toLocaleTimeString());
  const [globalStats, setGlobalStats] = useState({
    activeNodes: 1420,
    hourlyHype: 384,
    scansToday: 8912
  });

  const fetchStatus = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/livepulse/status');
      if (res.ok) {
        const data = await res.json();
        if (data.apis) setMetrics(data.apis);
        if (data.activeHeatmapNodes) {
          setGlobalStats({
            activeNodes: data.activeHeatmapNodes,
            hourlyHype: data.hourlyHypeArticlesProcessed,
            scansToday: data.antiScamScansToday
          });
        }
        setLastRefreshed(new Date().toLocaleTimeString());
      }
    } catch (e) {
      console.error('Erro ao buscar status do painel:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate small jitter in latencies
      setMetrics((prev) =>
        prev.map((item) => ({
          ...item,
          latencyMs: Math.max(10, item.latencyMs + Math.floor(Math.random() * 9) - 4)
        }))
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="w-full mb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[#c7f300]/10 border border-[#c7f300]/30 text-[#c7f300]">
            <Activity className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
              Painel de Controle de APIs LivePulse 2026
            </h2>
            <p className="text-xs font-mono text-[#c5c9ac]">
              Monitoramento da Infraestrutura de Streaming, Webhooks e Verificação de Ingressos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-gray-400">
            Última Sincronização: <strong className="text-white">{lastRefreshed}</strong>
          </span>
          <button
            onClick={fetchStatus}
            disabled={loading}
            className="p-2.5 rounded-xl bg-[#1b1b1e] hover:bg-white/10 border border-white/10 text-xs font-mono text-white flex items-center gap-2 transition-all active:scale-95"
            title="Atualizar Status das APIs"
          >
            <RefreshCw className={`w-4 h-4 text-[#c7f300] ${loading ? 'animate-spin' : ''}`} />
            <span>Atualizar Ping</span>
          </button>
        </div>
      </div>

      {/* Global Processing Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#c7f300]/10 text-[#c7f300] border border-[#c7f300]/30">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Nós de Heatmap Ativos</span>
            <span className="font-display font-extrabold text-2xl text-white">{globalStats.activeNodes.toLocaleString()}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-[#cf5cff]/10 text-[#ecb2ff] border border-[#cf5cff]/30">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Notícias/Hype Processados/h</span>
            <span className="font-display font-extrabold text-2xl text-white">{globalStats.hourlyHype}</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-white/10 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 uppercase block">Scans Anti-Golpe Hoje</span>
            <span className="font-display font-extrabold text-2xl text-white">{globalStats.scansToday.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* APIs Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((api) => (
          <div
            key={api.id}
            className="p-5 rounded-2xl glass-card border border-white/10 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-bold text-base text-white">
                  {api.name}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[11px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Operacional
                </span>
              </div>

              <div className="space-y-2 font-mono text-xs bg-[#131316] p-3 rounded-xl border border-white/5 my-3">
                <div className="flex justify-between">
                  <span className="text-gray-400">Latência do Servidor:</span>
                  <span className={`font-bold ${api.latencyMs < 50 ? 'text-[#c7f300]' : 'text-emerald-300'}`}>
                    {api.latencyMs} ms
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Cota Rate-Limit:</span>
                  <span className="text-gray-200 font-bold">{api.rateLimitUsage}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-gray-400 flex items-center justify-between">
              <span>Protocolo: HTTPS / WebSocket</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
};
