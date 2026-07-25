import { NewsArticle } from '../types';

/**
 * Article Audit Result Interface
 */
export interface ArticleAuditResult {
  articleId: string;
  isEligibleForPrimaryFeed: boolean;
  relevanceScore: number; // 0 to 100
  timeCategory: 'RECENT_10_DAYS' | 'UPCOMING_6_MONTHS' | 'OUT_OF_RANGE';
  ageInDays: number;
  isTrustedSource: boolean;
  hasSystemJargon: boolean;
  auditMessages: string[];
}

// Trusted music journalism sources according to FONTES_CONFIAVEIS.md
export const AUDITED_TRUSTED_SOURCES = [
  'Billboard',
  'Pitchfork',
  'Pollstar',
  'Music Business Worldwide',
  'NME',
  'Rolling Stone',
  'Setlist.fm',
  'Bandsintown',
  'Songkick',
  'Sceneland',
  'Live Nation Press',
  'Procon'
];

// Forbidden system/technical jargon in user-facing news articles
const FORBIDDEN_SYSTEM_TERMS = [
  'firecrawl engine',
  '200 ok',
  'status do processamento',
  'api de mapeamento',
  'rastreamento de inteligência em tempo real',
  'sonic pulse engine',
  'clean html to markdown'
];

/**
 * Parses various date formats (ISO, Portuguese string, or relative) into a Date object.
 */
export function parseArticleDate(dateStr: string, referenceDate: Date = new Date()): Date {
  if (!dateStr) return referenceDate;

  // Check if relative like "há 2 dias" or "há 3 horas"
  const relativeMatch = dateStr.match(/há\s+(\d+)\s+(dia|dias|hora|horas)/i);
  if (relativeMatch) {
    const amount = parseInt(relativeMatch[1], 10);
    const unit = relativeMatch[2].toLowerCase();
    const result = new Date(referenceDate);
    if (unit.startsWith('dia')) {
      result.setDate(result.getDate() - amount);
    } else if (unit.startsWith('hora')) {
      result.setHours(result.getHours() - amount);
    }
    return result;
  }

  // Check Portuguese months: "25 de Julho, 2026"
  const ptMonths: Record<string, number> = {
    janeiro: 0, fevereiro: 1, março: 2, abril: 3, maio: 4, junho: 5,
    julho: 6, agosto: 7, setembro: 8, outubro: 9, novembro: 10, dezembro: 11
  };

  const ptMatch = dateStr.match(/(\d{1,2})\s+de\s+([a-zA-zç]+),?\s+(\d{4})/i);
  if (ptMatch) {
    const day = parseInt(ptMatch[1], 10);
    const monthName = ptMatch[2].toLowerCase();
    const year = parseInt(ptMatch[3], 10);
    if (ptMonths[monthName] !== undefined) {
      return new Date(year, ptMonths[monthName], day);
    }
  }

  // Try standard Date parsing (ISO YYYY-MM-DD or standard RFC)
  const parsed = new Date(dateStr);
  if (!isNaN(parsed.getTime())) {
    return parsed;
  }

  // Fallback to reference date if unparseable
  return referenceDate;
}

/**
 * Validates date criteria against the 10-day past window and 6-month future outlook.
 */
export function validateDateCriteria(
  dateString: string,
  referenceDate: Date = new Date()
): {
  isValidRecent: boolean;
  isValidUpcoming: boolean;
  ageInDays: number;
  daysFromNow: number;
} {
  const targetDate = parseArticleDate(dateString, referenceDate);
  const diffMs = referenceDate.getTime() - targetDate.getTime();
  const ageInDays = diffMs / (1000 * 60 * 60 * 24);
  const daysFromNow = -ageInDays;

  // Valid Recent: Published within the last 10 days (0 to 10 days ago)
  const isValidRecent = ageInDays >= -1 && ageInDays <= 10;

  // Valid Upcoming: Scheduled/confirmed within the next 180 days (~6 months)
  const isValidUpcoming = daysFromNow >= 0 && daysFromNow <= 180;

  return {
    isValidRecent,
    isValidUpcoming,
    ageInDays: Math.round(ageInDays * 10) / 10,
    daysFromNow: Math.round(daysFromNow * 10) / 10
  };
}

/**
 * Audits a single NewsArticle object for quality, date compliance, and source authority.
 */
export function auditArticle(
  article: NewsArticle,
  referenceDate: Date = new Date()
): ArticleAuditResult {
  const auditMessages: string[] = [];
  let score = 70; // Base score

  // 1. Check Date Freshness Criteria (Past 10 days vs Next 6 months)
  const dateEval = validateDateCriteria(article.date, referenceDate);
  let timeCategory: 'RECENT_10_DAYS' | 'UPCOMING_6_MONTHS' | 'OUT_OF_RANGE' = 'OUT_OF_RANGE';

  if (dateEval.isValidRecent) {
    timeCategory = 'RECENT_10_DAYS';
    score += 15;
    auditMessages.push(`Matéria publicada no janela recente de 10 dias (${dateEval.ageInDays} dias).`);
  } else if (dateEval.isValidUpcoming) {
    timeCategory = 'UPCOMING_6_MONTHS';
    score += 10;
    auditMessages.push(`Informação dentro da perspectiva de até 6 meses (${dateEval.daysFromNow} dias à frente).`);
  } else {
    score -= 25;
    auditMessages.push(`Data fora do período prioritário (${dateEval.ageInDays} dias de diferença).`);
  }

  // 2. Check Trusted Sources (FONTES_CONFIAVEIS.md)
  const sourceName = article.confirmedBySource || (article.sources && article.sources[0]) || '';
  const isTrustedSource = AUDITED_TRUSTED_SOURCES.some(trusted =>
    sourceName.toLowerCase().includes(trusted.toLowerCase())
  );

  if (isTrustedSource) {
    score += 15;
    auditMessages.push(`Fonte auditada reconhecida: ${sourceName}`);
  } else {
    score -= 10;
    auditMessages.push(`Fonte não presente na lista auditada primária.`);
  }

  // 3. Check for System Jargon (Strict Editorial Rule)
  const fullText = `${article.title} ${article.subtitle} ${article.content}`.toLowerCase();
  const foundJargon = FORBIDDEN_SYSTEM_TERMS.filter(term => fullText.includes(term));
  const hasSystemJargon = foundJargon.length > 0;

  if (hasSystemJargon) {
    score -= 30;
    auditMessages.push(`ATENÇÃO: Contém jargões do sistema proibidos (${foundJargon.join(', ')}).`);
  } else {
    auditMessages.push(`Redação jornalística limpa, livre de termos técnicos do sistema.`);
  }

  // 4. Content Depth Check
  if (article.content.length > 300) {
    score += 5;
  }

  // Normalize score between 0 and 100
  const finalScore = Math.max(0, Math.min(100, score));
  const isEligibleForPrimaryFeed = finalScore >= 60 && !hasSystemJargon;

  return {
    articleId: article.id,
    isEligibleForPrimaryFeed,
    relevanceScore: finalScore,
    timeCategory,
    ageInDays: dateEval.ageInDays,
    isTrustedSource,
    hasSystemJargon,
    auditMessages
  };
}

/**
 * Audits and filters a collection of articles, returning them sorted by quality relevance score.
 */
export function filterAndRankArticles(
  articles: NewsArticle[],
  referenceDate: Date = new Date()
): NewsArticle[] {
  return articles
    .map(article => ({
      article,
      audit: auditArticle(article, referenceDate)
    }))
    .filter(item => item.audit.isEligibleForPrimaryFeed)
    .sort((a, b) => b.audit.relevanceScore - a.audit.relevanceScore)
    .map(item => item.article);
}

export interface PortalAuditSummary {
  totalAudited: number;
  eligibleCount: number;
  recent10DaysCount: number;
  upcoming6MonthsCount: number;
  trustedSourcesRatio: number; // percentage 0-100
  zeroJargonRatio: number; // percentage 0-100
  overallHealthScore: number; // 0-100
  referenceDateISO: string;
}

export function runFullPortalAudit(
  articles: NewsArticle[],
  referenceDate: Date = new Date('2026-07-25')
): PortalAuditSummary {
  const audits = articles.map(art => auditArticle(art, referenceDate));
  const total = audits.length;
  if (total === 0) {
    return {
      totalAudited: 0,
      eligibleCount: 0,
      recent10DaysCount: 0,
      upcoming6MonthsCount: 0,
      trustedSourcesRatio: 100,
      zeroJargonRatio: 100,
      overallHealthScore: 100,
      referenceDateISO: referenceDate.toISOString().split('T')[0]
    };
  }

  const eligible = audits.filter(a => a.isEligibleForPrimaryFeed).length;
  const recent = audits.filter(a => a.timeCategory === 'RECENT_10_DAYS').length;
  const upcoming = audits.filter(a => a.timeCategory === 'UPCOMING_6_MONTHS').length;
  const trusted = audits.filter(a => a.isTrustedSource).length;
  const cleanJargon = audits.filter(a => !a.hasSystemJargon).length;

  const avgScore = audits.reduce((sum, a) => sum + a.relevanceScore, 0) / total;

  return {
    totalAudited: total,
    eligibleCount: eligible,
    recent10DaysCount: recent,
    upcoming6MonthsCount: upcoming,
    trustedSourcesRatio: Math.round((trusted / total) * 100),
    zeroJargonRatio: Math.round((cleanJargon / total) * 100),
    overallHealthScore: Math.round(avgScore),
    referenceDateISO: referenceDate.toISOString().split('T')[0]
  };
}

