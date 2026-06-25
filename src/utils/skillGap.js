// ─────────────────────────────────────────────
// SKILL GAP — compares user skills against role + companies
// ─────────────────────────────────────────────

import { KB } from "../data/knowledge.js";

export function analyzeSkillGap(userSkills, targetRole, targetCompanies) {
  const roleData = KB.roles[targetRole];
  if (!roleData) return null;

  const userLower = userSkills.map(s => s.toLowerCase().trim());

  const match = (req) =>
    userLower.some(us =>
      us.includes(req.toLowerCase().split(/[\s(/]/)[0]) ||
      req.toLowerCase().includes(us.split(/[\s(/]/)[0])
    );

  const have    = roleData.skills.filter(s => match(s));
  const missing = roleData.skills.filter(s => !match(s));

  return { have, missing };
}

export function buildSkillGapMessage(name, gap, role, companies) {
  if (!gap) return `Set your target role first and I'll run your skill gap.`;

  const total   = gap.have.length + gap.missing.length;
  const pct     = Math.round((gap.have.length / total) * 100);
  const level   = pct >= 80 ? "Strong" : pct >= 50 ? "Developing" : "Foundational";
  const roleData = KB.roles[role];

  let msg = `## Skill Gap — ${name}\n\n`;
  msg += `**Role:** ${role}\n`;
  if (companies.length) msg += `**Companies:** ${companies.join(", ")}\n`;
  msg += `**Readiness:** ${level} (${pct}% of core skills)\n\n---\n\n`;

  if (gap.have.length) {
    msg += `### You already have\n`;
    gap.have.forEach(s => { msg += `• ${s}\n`; });
    msg += `\n`;
  }

  if (gap.missing.length) {
    msg += `### Build these next\n`;
    gap.missing.forEach(s => {
      const res = KB.skillResources[s];
      if (res) {
        msg += `\n**${s}** — ${res.time}\n  → ${res.free}\n`;
      } else {
        msg += `• ${s}\n`;
      }
    });
    msg += `\n`;
  }

  if (roleData?.interviewFocus?.length) {
    msg += `### Interview focus for ${role}\n`;
    roleData.interviewFocus.forEach(f => { msg += `• ${f}\n`; });
  }

  return msg;
}
