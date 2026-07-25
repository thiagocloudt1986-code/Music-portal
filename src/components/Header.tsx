import React, { useState } from 'react';
import { Radio, Sparkles, ShieldCheck, Activity, Smartphone, Flame, Volume2, VolumeX, Menu, X, Newspaper, Globe } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAIAssistant: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenAIAssistant
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'heatmap', label: 'Mapa de Shows Ao Vivo', icon: Flame },
    { id: 'news', label: 'Música & Turnês', icon: Newspaper },
    { id: 'sources', label: 'Fontes Globais', icon: Globe },
    { id: 'ranking', label: 'Veredito Ingressos', icon: ShieldCheck },
    { id: 'scam-guide', label: 'Guia Anti-Golpes', icon: ShieldCheck },
    { id: 'tour-apps', label: 'Apps de Alerta', icon: Smartphone },
    { id: 'apis', label: 'Painel APIs', icon: Activity },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-white/10 px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand & Live Pulse Status */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('heatmap')}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1f1f22] border border-[#c7f300]/30 group-hover:border-[#c7f300] transition-all duration-300">
              <Radio className="w-5 h-5 text-[#c7f300] animate-pulse" />
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c7f300] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#c7f300]"></span>
              </span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-xl tracking-tight text-white group-hover:text-[#c7f300] transition-colors">
                  LIVEPULSE
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#c7f300]/10 text-[#c7f300] border border-[#c7f300]/20 font-semibold">
                  2026
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#c5c9ac] tracking-wider uppercase">
                Global Music Wire &bull; Thiago Reed Editorial
              </p>
            </div>
          </button>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden lg:flex items-center gap-1 bg-[#1b1b1e]/80 p-1 rounded-xl border border-white/5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono transition-all duration-200 ${
                  isActive
                    ? 'bg-[#c7f300] text-[#171e00] shadow-sm font-bold'
                    : 'text-[#e4e1e6]/80 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#171e00]' : 'text-[#c5c9ac]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions & Utilities */}
        <div className="flex items-center gap-2.5">
          {/* Assistant Button */}
          <button
            onClick={onOpenAIAssistant}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#c7f300] to-[#aed500] text-[#171e00] font-display font-bold text-xs shadow-md hover:brightness-110 active:scale-95 transition-all"
          >
            <Newspaper className="w-4 h-4" />
            <span>Central Editorial</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile/Tablet Horizontal Scroll Quick Tabs */}
      <div className="lg:hidden mt-2 pt-2 border-t border-white/5 flex items-center gap-2 overflow-x-auto pb-1 text-xs no-scrollbar">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-mono text-xs whitespace-nowrap shrink-0 transition-all ${
                isActive
                  ? 'bg-[#c7f300] text-[#171e00] font-bold shadow-sm'
                  : 'bg-white/5 text-gray-300 hover:text-white border border-white/5'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#171e00]' : 'text-[#c7f300]'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Mobile Menu Expanded Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-mono transition-all text-left ${
                  isActive
                    ? 'bg-[#c7f300] text-[#171e00] font-bold'
                    : 'text-[#e4e1e6] hover:bg-white/5'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#171e00]' : 'text-[#c7f300]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
