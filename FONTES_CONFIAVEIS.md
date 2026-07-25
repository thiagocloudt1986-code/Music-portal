# Fontes Confiáveis de Notícias & Turnês Musicais 2026 (Firecrawl Ingestion Schema)

Este documento especifica o catálogo oficial de fontes jornalísticas e de inteligência de mercado utilizadas pelo **LivePulse Portal** para raspagem automatizada via **Firecrawl API** (`/v1/scrape`, `/v1/crawl`, `/v1/map`).

---

## 📋 Tabela de Fontes Auditadas

| ID Fonte | Nome do Portal | URL Principal / Endpoint | Frequência | Categoria | Prioridade |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `billboard` | **Billboard Music** | `https://www.billboard.com/music/concerts` | 30 min | Turnês, Bilheterias & Anúncios | `CRÍTICA` |
| `pitchfork` | **Pitchfork** | `https://pitchfork.com/news` | 1 hora | Indie, Críticas & Vazamentos | `ALTA` |
| `pollstar` | **Pollstar** | `https://www.pollstar.com/news` | 2 horas | Dados de Mercado & Arenas | `CRÍTICA` |
| `mbw` | **Music Business Worldwide** | `https://www.musicbusinessww.com` | 4 horas | Indústria, Sustentabilidade & Economia | `ALTA` |
| `nme` | **NME (New Musical Express)** | `https://www.nme.com/news/music` | 1 hora | Festivais Europeus & Turnês UK | `ALTA` |
| `rollingstone` | **Rolling Stone** | `https://www.rollingstone.com/music/music-news` | 1 hora | Cultura Pop, Festivais & Headliners | `ALTA` |
| `setlistfm` | **Setlist.fm** | `https://www.setlist.fm` | 15 min | Setlists Auditadas & Horários de Palco | `CRÍTICA` |
| `bandsintown` | **Bandsintown Live** | `https://www.bandsintown.com` | Em tempo real | Agendamento Oficial de Shows | `CRÍTICA` |
| `sceneland` | **Sceneland Mapping** | `https://github.com/skullface/sceneland.git` | Repositório | Mapeamento Geoespacial de Cenas Musicais | `ALTA` |
| `songkick_api` | **Songkick Unofficial API** | `https://github.com/Integuru-AI/Songkick-Unofficial-API.git` | Repositório | Agregação & Alertas de Concertos/Festivais | `ALTA` |

---

## 🛠️ Esquema de Raspagem Firecrawl (`structuredJsonSchema`)

Para garantir que o conteúdo raspado seja perfeitamente consumível pelo modelo de IA do LivePulse, as requisições para a API do Firecrawl aplicam o seguinte formato de extração:

```json
{
  "title": "string",
  "source": "string",
  "author": "string",
  "publishDate": "YYYY-MM-DD",
  "timeframe": "10_DAYS | 6_MONTHS",
  "importance": "CRÍTICA | ALTA | MÉDIA",
  "detectedArtists": ["string"],
  "locations": [
    {
      "city": "string",
      "country": "string",
      "venue": "string"
    }
  ],
  "summary": "string (resumo em até 3 frases em português)",
  "directUrl": "string"
}
```

---

## ⚙️ Regras de Filtro e Limpeza (Firecrawl Options)

1. **`onlyMainContent: true`**: Descarta menus laterais, anúncios, scripts de rastreamento e rodapés poluídos.
2. **`formats: ["markdown", "html"]`**: Gera Markdown limpo e estruturado para LLMs.
3. **`excludeTags: ["nav", "footer", "aside", ".ad-banner", ".comments"]`**: Garante apenas o texto jornalístico original.
4. **Respeito a Robots.txt & Rate Limits**: Requisições espaçadas em pelo menos 1,5s por domínio.

---

## 🔍 Exemplo de Requisição cURL Firecrawl API

```bash
curl -X POST "https://api.firecrawl.dev/v1/scrape" \
  -H "Authorization: Bearer $FIRECRAWL_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://www.billboard.com/music/concerts",
    "formats": ["markdown"],
    "onlyMainContent": true
  }'
```

---

*LivePulse Engine 2026 — Thiago Reed Editorial*
