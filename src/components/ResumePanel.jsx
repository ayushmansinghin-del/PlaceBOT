// ResumePanel — paste resume text → ATS score + keyword gap + improvement tips
// Props: profile { role }

import { useState } from "react";
import { FileText, AlertCircle, CheckCircle2 } from "lucide-react";
import { RESUME_KEYWORDS } from "../data/resumeKeywords.js";
import { analyzeResumeText } from "../utils/resumeAnalyzer.js";
import MD from "./MD.jsx";

const ROLES = Object.keys(RESUME_KEYWORDS);

// Small reusable section card
function Card({ children, style }) {
  return (
    <div style={{
      background: "#f8fafc", borderRadius: "12px",
      padding: "14px", border: "1px solid #e8ecf0",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color }) {
  return (
    <p style={{
      fontSize: "10px", fontWeight: "700",
      color: color || "#64748b",
      textTransform: "uppercase", letterSpacing: "0.07em",
      margin: "0 0 10px",
    }}>
      {children}
    </p>
  );
}

export default function ResumePanel({ profile }) {
  const [view, setView]               = useState("input");
  const [text, setText]               = useState("");
  const [role, setRole]               = useState(profile.role || ROLES[0]);
  const [results, setResults]         = useState(null);

  const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
  const canAnalyze = text.trim().length >= 80;

  const handleAnalyze = () => {
    if (!canAnalyze) return;
    setResults(analyzeResumeText(text, role));
    setView("results");
  };

  // ── Results view ─────────────────────────────────────────────
  if (view === "results" && results) {
    const circumference = 2 * Math.PI * 40;
    const filled = circumference * (results.score / 100);

    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>

        {/* Header row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "15px", fontWeight: "700", color: "#0f172a", margin: 0 }}>ATS Score</p>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "2px 0 0" }}>{role}</p>
          </div>
          <button onClick={() => setView("input")} style={{
            fontSize: "11px", color: "#6366f1", fontWeight: "600",
            background: "rgba(99,102,241,0.07)", border: "1px solid rgba(99,102,241,0.18)",
            borderRadius: "8px", padding: "5px 12px", cursor: "pointer",
          }}>← Re-analyze</button>
        </div>

        {/* Score ring */}
        <Card style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ position: "relative", flexShrink: 0 }}>
            <svg width="96" height="96" viewBox="0 0 96 96" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="48" cy="48" r="40" fill="none" stroke="#e8ecf0" strokeWidth="9" />
              <circle cx="48" cy="48" r="40" fill="none" stroke={results.levelColor} strokeWidth="9"
                strokeDasharray={`${filled} ${circumference}`} strokeLinecap="round"
                style={{ transition: "stroke-dasharray 1s ease" }}
              />
            </svg>
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            }}>
              <p style={{ fontSize: "22px", fontWeight: "800", color: results.levelColor, margin: 0, lineHeight: 1 }}>{results.score}</p>
              <p style={{ fontSize: "10px", color: "#94a3b8", margin: 0 }}>/100</p>
            </div>
          </div>
          <div>
            <p style={{ fontSize: "20px", fontWeight: "700", color: results.levelColor, margin: "0 0 4px" }}>{results.level}</p>
            <p style={{ fontSize: "12px", color: "#475569", lineHeight: 1.6, margin: 0 }}>
              {results.foundCritical.length} of {results.foundCritical.length + results.missingCritical.length} critical keywords found<br />
              {results.foundGood.length} bonus keywords present
            </p>
          </div>
        </Card>

        {/* Keywords grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px" }}>
            <SectionLabel color="#15803d">✅ Found ({results.foundCritical.length})</SectionLabel>
            {results.foundCritical.length === 0
              ? <p style={{ fontSize: "11px", color: "#64748b" }}>None yet</p>
              : results.foundCritical.slice(0, 7).map(k => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                  <p style={{ fontSize: "11px", color: "#166534", margin: 0 }}>{k}</p>
                </div>
              ))
            }
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "12px", padding: "12px" }}>
            <SectionLabel color="#c2410c">⚠️ Missing ({results.missingCritical.length})</SectionLabel>
            {results.missingCritical.length === 0
              ? <p style={{ fontSize: "11px", color: "#15803d" }}>All present 🎉</p>
              : results.missingCritical.slice(0, 7).map(k => (
                <div key={k} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                  <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#f97316", flexShrink: 0 }} />
                  <p style={{ fontSize: "11px", color: "#7c2d12", margin: 0 }}>{k}</p>
                </div>
              ))
            }
          </div>
        </div>

        {/* Structure checklist */}
        <Card>
          <SectionLabel>Structure Checklist</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px" }}>
            {[
              [results.checks.hasEmail,        "Email present"],
              [results.checks.hasPhone,        "Phone number"],
              [results.checks.hasLinkedIn,     "LinkedIn linked"],
              [results.checks.hasGitHub,       "GitHub linked"],
              [results.checks.hasQuantified,   "Impact quantified"],
              [results.checks.hasActionVerbs,  "Action verbs"],
              [results.checks.bulletCount >= 5,`Bullets (${results.checks.bulletCount})`],
              [results.checks.wordCount >= 300, `Words (~${results.checks.wordCount})`],
            ].map(([ok, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                {ok
                  ? <CheckCircle2 size={13} color="#22c55e" />
                  : <AlertCircle size={13} color="#f97316" />
                }
                <p style={{ fontSize: "11.5px", color: ok ? "#374151" : "#9ca3af", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Improvement tips */}
        {results.suggestions.length > 0 && (
          <div style={{
            background: "rgba(99,102,241,0.04)", border: "1px solid rgba(99,102,241,0.14)",
            borderRadius: "12px", padding: "14px",
          }}>
            <SectionLabel color="#4f46e5">💡 Improvements ({results.suggestions.length})</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {results.suggestions.slice(0, 5).map((s, i) => (
                <div key={i} style={{ display: "flex", gap: "8px", alignItems: "flex-start" }}>
                  <span style={{ color: "#6366f1", flexShrink: 0, marginTop: "1px", fontSize: "12px" }}>→</span>
                  <MD text={s} isUser={false} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ── Input view ────────────────────────────────────────────────
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px" }}>
      {/* Explainer */}
      <div style={{
        background: "linear-gradient(135deg, rgba(30,58,95,0.06), rgba(30,64,175,0.04))",
        border: "1px solid rgba(99,102,241,0.14)", borderRadius: "12px", padding: "14px",
      }}>
        <p style={{ fontSize: "14px", fontWeight: "700", margin: "0 0 6px", color: "#0f172a" }}>📄 Resume Analyzer</p>
        <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.65 }}>
          Paste your resume below. Get an instant ATS score, keyword gap, and actionable tips — no upload or account needed.
        </p>
      </div>

      {/* Role selector */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: "600", color: "#374151", margin: "0 0 6px" }}>
          Target role (for keyword matching):
        </p>
        <select value={role} onChange={e => setRole(e.target.value)} style={{
          width: "100%", padding: "9px 11px", borderRadius: "9px",
          border: "1.5px solid #e2e8f0", fontSize: "13px", color: "#334155",
          background: "#fff", cursor: "pointer",
        }}>
          {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>

      {/* Text area */}
      <div>
        <p style={{ fontSize: "11px", fontWeight: "600", color: "#374151", margin: "0 0 6px" }}>
          Paste your resume text:
        </p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Copy your entire resume — education, skills, experience, projects, achievements — and paste it here. The more complete, the more accurate the analysis."
          style={{
            width: "100%", minHeight: "170px", padding: "11px 13px",
            borderRadius: "10px", border: `1.5px solid ${canAnalyze ? "#a5b4fc" : "#e2e8f0"}`,
            fontSize: "13px", color: "#334155", resize: "vertical",
            lineHeight: 1.6, fontFamily: "inherit",
            outline: "none", boxSizing: "border-box",
            transition: "border-color 0.2s",
          }}
        />
        <p style={{ fontSize: "10px", color: wordCount >= 300 ? "#22c55e" : "#94a3b8", margin: "4px 0 0" }}>
          {wordCount} words {wordCount < 300 ? "— aim for 300–700" : "✓"}
        </p>
      </div>

      {/* Analyze button */}
      <button onClick={handleAnalyze} disabled={!canAnalyze} style={{
        width: "100%", padding: "12px",
        borderRadius: "10px", border: "none",
        background: canAnalyze ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e2e8f0",
        color: canAnalyze ? "#fff" : "#9ca3af",
        fontSize: "14px", fontWeight: "700",
        cursor: canAnalyze ? "pointer" : "not-allowed",
        transition: "all 0.15s",
        display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
      }}>
        <FileText size={15} />
        {canAnalyze ? "Analyze Resume" : "Paste your resume to begin"}
      </button>
    </div>
  );
}
