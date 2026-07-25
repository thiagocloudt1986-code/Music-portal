import React, { useState } from 'react';
import { TourApp } from '../types';
import { Smartphone, Bell, Music, Compass, BarChart, CheckCircle2, Sparkles, Calendar, Radio } from 'lucide-react';

interface TourDiscoveryAppsProps {
  apps: TourApp[];
}

export const TourDiscoveryApps: React.FC<TourDiscoveryAppsProps> = ({ apps }) => {
  const [selectedArtistToSync, setSelectedArtistToSync] = useState('Oasis World Tour 2026');
  const [syncedArtist, setSyncedArtist] = useState<string | null>(null);

  const iconMap: Record<string, any> = {
    Bell,
    Music,
    Compass,
    BarChart
  };

  const handleSyncSimulator = (e: React.FormEvent) => {
    e.preventDefault();
    setSyncedArtist(selectedArtistToSync);
    setTimeout(() => {
      setSyncedArtist(null);
    }, 4000);
  };

  return (
    <section className="w-full mb-12">
      
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-[#cf5cff]/10 border border-[#cf5cff]/30 text-[#ecb2ff]">
          <Smartphone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="font-display font-extrabold text-2xl lg:text-3xl text-white">
            Descoberta de Turnês & Aplicativos de Alertas 2026
          </h2>
          <p className="text-xs font-mono text-[#c5c9ac]">
            Análise e Comparação Prática dos Principais Rastreadores de Shows
          </p>
        </div>
      </div>

      {/* Sync Simulator Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-[#cf5cff]/30 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Radio className="w-4 h-4 text-[#ecb2ff] animate-pulse" />
            <span className="font-mono text-xs font-bold text-[#ecb2ff] uppercase">Simulador de Sincronização em Tempo Real</span>
          </div>
          <h3 className="font-display font-bold text-lg text-white mb-1">
            Teste os Alertas do Bandsintown & Songkick
          </h3>
          <p className="text-xs font-body text-gray-300">
            Selecione uma turnê e simule a velocidade com que o alerta de pré-venda chega ao seu telefone.
          </p>
        </div>

        <form onSubmit={handleSyncSimulator} className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
          <select
            value={selectedArtistToSync}
            onChange={(e) => setSelectedArtistToSync(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#131316] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-[#cf5cff]"
          >
            <option value="Oasis World Tour 2026">Oasis World Tour 2026</option>
            <option value="Coldplay & Guests 2026">Coldplay & Guests 2026</option>
            <option value="Kendrick Lamar & SZA">Kendrick Lamar & SZA</option>
            <option value="Coachella Valley 2026">Coachella Valley 2026</option>
          </select>

          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-2 rounded-xl bg-[#secondary-container] text-[#480063] bg-[#cf5cff] font-display font-extrabold text-xs flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            <Bell className="w-3.5 h-3.5" /> Ativar Alerta Teste
          </button>
        </form>
      </div>

      {/* Notification Toast Confirmation */}
      {syncedArtist && (
        <div className="mb-6 p-4 rounded-xl bg-[#cf5cff]/20 border border-[#cf5cff] text-[#ecb2ff] text-xs font-mono flex items-center gap-3 animate-bounce">
          <Bell className="w-5 h-5 text-[#cf5cff] animate-spin" />
          <div>
            <strong>ALERTA SIMULADO:</strong> Alerta de pré-venda enviado com sucesso para "{syncedArtist}" via Bandsintown Webhook (&lt; 0,8s latência)!
          </div>
        </div>
      )}

      {/* Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {apps.map((app) => {
          const IconComponent = iconMap[app.iconName] || Smartphone;

          return (
            <div
              key={app.id}
              className="p-6 rounded-2xl glass-card border border-white/10 hover:border-[#cf5cff]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#1f1f22] border border-white/10 text-[#ecb2ff]">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-[#cf5cff]/10 text-[#ecb2ff] border border-[#cf5cff]/30">
                    ★ {app.rating} / 5.0
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-xl text-white mb-1">
                  {app.name}
                </h3>
                <p className="text-xs font-mono text-[#c5c9ac] mb-4">
                  {app.tagline}
                </p>

                <div className="space-y-2 mb-4 text-xs font-mono bg-[#131316] p-3 rounded-xl border border-white/5">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Velocidade de Alerta:</span>
                    <span className="text-[#c7f300] font-bold">{app.alertSpeed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Integração Spotify:</span>
                    <span className="text-white font-bold">{app.spotifyIntegration}</span>
                  </div>
                </div>

                <div className="space-y-1.5 mb-6">
                  <span className="text-[11px] font-mono text-gray-400 uppercase font-bold block">
                    Recursos Chave:
                  </span>
                  {app.keyFeatures.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs font-body text-gray-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#cf5cff] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 text-xs font-body text-gray-300 italic">
                "{app.verdict}"
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
