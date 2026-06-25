// ─────────────────────────────────────────────
// CONSTANTS — chip lists and stage names
// ─────────────────────────────────────────────

import { KB } from "./data/knowledge.js";

export const S = {
  ASK_NAME:      "ask_name",
  ASK_SKILLS:    "ask_skills",
  ASK_ROLE:      "ask_role",
  ASK_COMPANIES: "ask_companies",
  SHOW_ANALYSIS: "show_analysis",
  MAIN:          "main",
  MOCK:          "mock",
};

// Skill chips for onboarding — trimmed to what actually matters
export const SKILL_CHIPS = [
  "Python", "Java", "C++", "JavaScript", "DSA",
  "SQL", "React.js", "Machine Learning", "Git",
  "HTML & CSS", "Operating Systems", "DBMS",
];

export const ROLE_CHIPS    = Object.keys(KB.roles);
export const COMPANY_CHIPS = Object.keys(KB.companies);

// Quick-action chips in the main stage
export const MAIN_CHIPS = [
  { label: "📊 Skill Gap",      q: "skill gap" },
  { label: "💻 DSA Mock",       q: "mock dsa" },
  { label: "🤝 Behavioural",    q: "behavioral mock" },
  { label: "📚 Technical",      q: "technical question" },
  { label: "🧮 Aptitude",       q: "aptitude" },
  { label: "🗺️ Roadmap",        q: "roadmap" },
  { label: "💙 Stress Support", q: "i am stressed" },
];
