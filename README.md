<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# LivePulse Music Portal v1.0.0

Portal global de notícias musicais em tempo real, com mapas de calor de turnês, rankings de plataformas de ingressos, guias anti-golpe e insights de turnês com IA.

## Sobre o Projeto

O **LivePulse** é um portal completo para fãs de música que oferece:

- **Notícias em Tempo Real**: Cobertura de turnês, festivais e lançamentos musicais globais
- **Mapas de Calor de Turnês**: Visualização interativa de shows e eventos por região
- **Rankings de Ingressos**: Comparativo das melhores plataformas de compra
- **Guias Anti-Golpe**: Dicas de segurança para compra segura de ingressos
- **Insights com IA**: Assistente virtual para descoberta de turnês e eventos
- **Fontes Confiáveis**: Dados de Billboard, Pitchfork, Pollstar, NME, Rolling Stone e mais

## Funcionalidades

- Heatmap global de shows em tempo real
- Sistema de scraping automatizado via Firecrawl API
- Integração com Google Gemini para insights de IA
- Player de áudio integrado para trailers de shows
- Dashboard de controle de APIs
- Design responsivo para mobile e desktop

## Tecnologias

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Express.js, Vite
- **IA**: Google Gemini API (@google/genai)
- **Scraping**: Firecrawl API
- **Animações**: Motion (Framer Motion)

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key
3. Run the app:
   `npm run dev`

## Versionamento

Este projeto usa versionamento semântico (Semantic Versioning):

- **Major** (X.0.0): Mudanças incompatíveis com versões anteriores
- **Minor** (0.X.0): Novas funcionalidades compatíveis
- **Patch** (0.0.X): Correções de bugs

Para atualizar a versão, edite:
- `package.json` → `"version"`
- `metadata.json` → `"version"`

## Links

- **Portal ao vivo**: https://ai.studio/apps/199260d3-74e2-4327-949f-666522931db4
- **Repositório**: https://github.com/thiagocloudt1986-code/Music-portal

---

*LivePulse Engine 2026 — Thiago Reed Editorial*
