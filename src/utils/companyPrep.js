// ─────────────────────────────────────────────
// COMPANY PREP — builds company guide as a chat message
// ─────────────────────────────────────────────

import { KB } from "../data/knowledge.js";

export function buildCompanyDeepDive(company) {
  const co = KB.companies[company];
  if (!co) {
    return `No data for "${company}". Available: ${Object.keys(KB.companies).join(", ")}`;
  }

  let msg = `## ${company} — Prep Guide\n\n`;
  msg += `**What to focus on:** ${co.prep.focus}\n\n`;
  msg += `**Revise first:** ${co.prep.revise}\n\n`;
  msg += `**Interview style:** ${co.prep.style}\n`;

  return msg;
}
