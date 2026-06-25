// ─────────────────────────────────────────────
// MOCK INTERVIEW — fetches and formats questions
// Common pool + Amazon LP override.
// System design removed (too advanced for freshers).
// ─────────────────────────────────────────────

import { KB } from "../data/knowledge.js";

// Try company-specific pool first, then fall back to common pool
export function getMockQuestion(companies, questionType, index) {
  for (const co of companies) {
    const specific = KB.mockQuestions[co];
    if (specific?.[questionType]?.[index]) {
      return { company: co, q: specific[questionType][index], type: questionType };
    }
  }
  const pool = KB.mockQuestions.common?.[questionType];
  if (pool?.[index]) {
    return { company: "common", q: pool[index], type: questionType };
  }
  return null;
}

export function formatMockQuestion(mq, index, name) {
  if (!mq) {
    return `All questions for this type are done, ${name}!\n\nTry: **mock dsa**, **behavioral mock**, **technical question**, or **aptitude**.`;
  }

  const { company, q, type } = mq;
  const tag = company !== "common" ? ` — ${company}` : "";
  const header = `## Q${index + 1}${tag}\n\n`;

  if (type === "dsa") {
    let msg = `${header}**DSA** · ${q.difficulty}\n\n${q.q}\n\n**Hint:** ${q.hint}`;
    if (q.followUp) msg += `\n\n**Follow-up:** ${q.followUp}`;
    msg += `\n\n*Type **answer** to see the solution, or **next** for another question.*`;
    return msg;
  }

  if (type === "behavioral") {
    return `${header}**Behavioural** · ${q.dimension}\n\n"${q.q}"\n\n` +
      `**How to answer:** ${q.tip}\n\n` +
      `**STAR format:** Situation → Task → Action (most of your answer) → Result.\n\n` +
      `*Type **next** when ready.*`;
  }

  if (type === "technical") {
    return `${header}**Technical** · ${q.topic}\n\n${q.q}\n\n` +
      `*Answer in this order: definition → how it works → one real example. Type **next** when done.*`;
  }

  if (type === "aptitude") {
    return `${header}**Aptitude** · ${q.category}\n\n${q.q}\n\n` +
      `*Type **answer** to see the solution.*`;
  }

  if (type === "gd") {
    return `${header}**GD Practice**\n\n"${q.q}"\n\n` +
      `**GD tip:** Open with a clear stance. Use: Point → Reason → Example. Invite others. Summarise near the end.\n\n` +
      `*Practice your opening 30 seconds, then type **next**.*`;
  }

  return `${header}${q.q}\n\n*Type **next** to continue.*`;
}
