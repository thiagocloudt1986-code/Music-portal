import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, Radio, Flame, Sparkles } from 'lucide-react';

interface SonicAudioPlayerProps {
  muted: boolean;
  onToggleMute: () => void;
  activeCityAlert?: string;
}

export const SonicAudioPlayer: React.FC<SonicAudioPlayerProps> = ({
  muted,
  onToggleMute,
  activeCityAlert
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

  const startSonicPulse = () => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // Create a soft ambient pulse sound
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5);

      gain.gain.setValueAtTime(0.01, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 2.1);

      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 2100);
    } catch (err) {
      console.log('Web Audio indisponível:', err);
    }
  };

  useEffect(() => {
    if (activeCityAlert && !muted) {
      startSonicPulse();
    }
  }, [activeCityAlert, muted]);

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 glass-panel p-3.5 rounded-2xl border border-[#c7f300]/30 shadow-2xl flex items-center justify-between gap-4">
      
      {/* Pulse Visualizer Animation */}
      <div className="flex items-center gap-3">
        <button
          onClick={startSonicPulse}
          className="p-2.5 rounded-xl bg-[#c7f300] text-[#171e00] font-bold hover:brightness-110 active:scale-95 transition-all shadow-md shrink-0"
          title="Tocar Pulso Sonoro"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        <div>
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-[#c7f300] animate-pulse" />
            <span className="font-display font-bold text-xs text-white">
              SONIC PULSE 2026
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-[#cf5cff]/20 text-[#ecb2ff]">
              Web Audio
            </span>
          </div>
          <p className="text-[10px] font-mono text-gray-400 truncate max-w-[180px]">
            {activeCityAlert ? `Alerta ativo: ${activeCityAlert}` : 'Alertas sonoros de turnês e festivais em standby'}
          </p>
        </div>
      </div>

      {/* Audio Waveform Animation graphic */}
      <div className="flex items-center gap-1 h-6 shrink-0">
        {[40, 70, 30, 90, 50, 80, 40].map((height, i) => (
          <span
            key={i}
            style={{ height: isPlaying ? `${height}%` : '20%' }}
            className="w-1 rounded-full bg-[#c7f300] transition-all duration-300"
          />
        ))}
      </div>

      {/* Mute toggle */}
      <button
        onClick={onToggleMute}
        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-all shrink-0"
        title={muted ? "Desmutar Alertas Sonoros" : "Mutar Alertas Sonoros"}
      >
        {muted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#c7f300]" />}
      </button>

    </div>
  );
};
