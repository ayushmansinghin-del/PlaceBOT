// ─────────────────────────────────────────────
// RESUME ANALYZER — takes pasted resume text + role, returns score + suggestions
// Pure function. No UI. No state.
// ─────────────────────────────────────────────

import { RESUME_KEYWORDS } from "../data/resumeKeywords.js";

export function analyzeResumeText(text, role) {
  const lower = text.toLowerCase();
  const kw = RESUME_KEYWORDS[role] || RESUME_KEYWORDS["Software Engineer (SDE)"];

  // Keyword matching
  const foundCritical = kw.critical.filter(k => lower.includes(k));
  const missingCritical = kw.critical.filter(k => !lower.includes(k));
  const foundGood = kw.good.filter(k => lower.includes(k));
  const foundSoft = kw.soft.filter(k => lower.includes(k));

  // Structure checks
  const hasEmail = /[\w.+-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /[\d]{10}|[\d]{3}[-.\s][\d]{3}[-.\s][\d]{4}/.test(text);
  const hasLinkedIn = lower.includes("linkedin");
  const hasGitHub = lower.includes("github");
  const hasQuantified = /\d+\s*%|reduced\s+by|improved\s+by|increased\s+by|\d+\s*(users|customers|requests|ms|seconds|hours|days|projects|teams)/i.test(text);
  const hasActionVerbs = /\b(developed|implemented|designed|optimized|led|created|built|deployed|architected|automated|reduced|improved|increased|delivered|collaborated|engineered|maintained|refactored)\b/i.test(text);
  const bulletCount = (text.match(/[•\-\*▸▹→]/g) || []).length;
  const wordCount = text.trim().split(/\s+/).length;
  const sectionHeaders = (text.match(/\b(experience|education|skills|projects|achievements|summary|objective|certifications|awards|publications)\b/gi) || []).length;

  // Score calculation
  const mustScore = Math.round((foundCritical.length / kw.critical.length) * 55);
  const goodScore = Math.round((foundGood.length / kw.good.length) * 20);
  const structureScore =
    [hasEmail, hasPhone, hasLinkedIn, hasGitHub, hasQuantified, hasActionVerbs, bulletCount >= 5, wordCount >= 300]
      .filter(Boolean).length * 2 + (sectionHeaders >= 4 ? 5 : 0);
  const totalScore = Math.min(100, mustScore + goodScore + structureScore);

  // Improvement suggestions
  const suggestions = [];
  if (missingCritical.length > 0) suggestions.push(`Add these critical keywords (naturally, in context): **${missingCritical.slice(0, 5).join(", ")}**`);
  if (!hasQuantified) suggestions.push("Quantify your impact — e.g., 'Reduced load time by 40%' or 'Served 10,000+ users'. Numbers make bullets 3× more memorable.");
  if (!hasGitHub) suggestions.push("Add your GitHub profile link. For tech roles, this is as important as your email.");
  if (!hasLinkedIn) suggestions.push("Add your LinkedIn URL. Recruiters cross-check.");
  if (bulletCount < 5) suggestions.push("Use bullet points for experience entries. They're easier to scan than paragraphs.");
  if (!hasActionVerbs) suggestions.push("Start each bullet with a strong action verb: Built, Designed, Optimized, Led, Deployed.");
  if (wordCount < 300) suggestions.push("Your resume seems brief. Aim for 400–700 words for a fresher resume (1 page, content-rich).");
  if (foundGood.length < 3) suggestions.push(`Add relevant tools: ${kw.good.slice(0, 4).join(", ")} — weave them into project descriptions.`);
  if (!hasEmail || !hasPhone) suggestions.push("Ensure your email and phone number are clearly visible at the top.");

  return {
    score: totalScore,
    foundCritical,
    missingCritical,
    foundGood,
    foundSoft,
    checks: { hasEmail, hasPhone, hasLinkedIn, hasGitHub, hasQuantified, hasActionVerbs, bulletCount, wordCount, sectionHeaders },
    suggestions,
    level: totalScore >= 75 ? "Strong" : totalScore >= 50 ? "Moderate" : "Needs Work",
    levelColor: totalScore >= 75 ? "#10b981" : totalScore >= 50 ? "#f59e0b" : "#ef4444",
  };
}
