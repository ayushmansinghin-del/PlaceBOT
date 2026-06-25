// StressPanel — practical situation-based support
// 6 moods: Before/During/After/Burnout/Overwhelmed/Confidence
// No motivational quotes. No generic paragraphs.

import { useState, useEffect, useRef } from "react";
import { STRESS_DATA } from "../data/stressData.js";

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

export default function StressPanel() {
  const [mood, setMood]           = useState(null);
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setPhase]   = useState(0);
  const [breathCycle, setCycle]   = useState(0);
  const timerRef = useRef(null);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const runBreath = (phase, cycle) => {
    const step = STRESS_DATA.breathingSteps[phase];
    timerRef.current = setTimeout(() => {
      const nextPhase = (phase + 1) % STRESS_DATA.breathingSteps.length;
      const nextCycle = nextPhase === 0 ? cycle + 1 : cycle;
      if (nextCycle >= 4) { setBreathing(false); setPhase(0); return; }
      setPhase(nextPhase);
      setCycle(nextCycle);
      runBreath(nextPhase, nextCycle);
    }, step.duration * 1000);
  };

  const startBreathing = () => {
    setBreathing(true); setPhase(0); setCycle(0);
    runBreath(0, 0);
  };

  const stopBreathing = () => { clearTimeout(timerRef.current); setBreathing(false); };

  const moodData   = mood ? STRESS_DATA.responses[mood] : null;
  const breathStep = STRESS_DATA.breathingSteps[breathPhase];

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "16px" }}>

      {/* Mood selector */}
      <div>
        <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", margin: "0 0 10px" }}>
          What's going on right now?
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
          {STRESS_DATA.moods.map(m => {
            const selected = mood === m.id;
            return (
              <button key={m.id} onClick={() => setMood(selected ? null : m.id)} style={{
                padding: "12px 6px", borderRadius: "12px",
                border: `2px solid ${selected ? "#6366f1" : "#e8ecf0"}`,
                background: selected ? "rgba(99,102,241,0.06)" : "#f8fafc",
                cursor: "pointer", textAlign: "center",
                transition: "border-color 0.15s",
              }}>
                <div style={{ fontSize: "20px", marginBottom: "4px" }}>{m.emoji}</div>
                <p style={{ fontSize: "10px", fontWeight: "600", color: selected ? "#4f46e5" : "#374151", margin: "0 0 2px", lineHeight: 1.3 }}>
                  {m.label}
                </p>
                <p style={{ fontSize: "9px", color: "#94a3b8", margin: 0, lineHeight: 1.3 }}>
                  {m.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Situation-specific steps */}
      {moodData && (
        <div style={{
          background: "#f8fafc", borderRadius: "14px", border: "1px solid #e8ecf0",
          padding: "16px", display: "flex", flexDirection: "column", gap: "12px",
          animation: "pb-in 0.2s ease-out",
        }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
              {moodData.title}
            </p>
            <p style={{ fontSize: "12px", color: "#475569", margin: 0, lineHeight: 1.6 }}>
              {moodData.insight}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {moodData.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "17px", flexShrink: 0, lineHeight: 1.3 }}>{step.icon}</span>
                <p style={{ fontSize: "12.5px", color: "#334155", lineHeight: 1.65, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>

          {/* Helpline — only shown when relevant */}
          {moodData.helpline && (
            <div style={{
              background: "#fff7ed", border: "1px solid #fed7aa",
              borderRadius: "10px", padding: "10px 12px",
            }}>
              <p style={{ fontSize: "11px", color: "#92400e", margin: 0, lineHeight: 1.6 }}>
                {moodData.helpline}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Breathing exercise */}
      <div style={{
        background: "#f8fafc", borderRadius: "14px",
        border: "1px solid #e8ecf0", padding: "16px",
      }}>
        <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", margin: "0 0 4px" }}>
          🌬️ 4-7-8 Breathing
        </p>
        <p style={{ fontSize: "11.5px", color: "#64748b", margin: "0 0 14px", lineHeight: 1.6 }}>
          Slows your heart rate within 90 seconds. Takes under 2 minutes for 4 cycles.
        </p>

        {breathing ? (
          <div style={{ textAlign: "center" }}>
            <div style={{
              width: "96px", height: "96px", borderRadius: "50%",
              border: `3px solid ${breathStep.color}`,
              background: `${breathStep.color}18`,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              margin: "0 auto 12px",
              animation: breathPhase === 0 ? "expand 4s ease-in-out" : breathPhase === 2 ? "contract 8s ease-in-out" : "none",
              transition: "border-color 0.5s",
            }}>
              <p style={{ fontSize: "13px", fontWeight: "700", color: breathStep.color, margin: 0 }}>{breathStep.phase}</p>
              <p style={{ fontSize: "11px", color: breathStep.color, opacity: 0.7, margin: "2px 0 0" }}>{breathStep.duration}s</p>
            </div>
            <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 10px" }}>
              Cycle {breathCycle + 1} of 4
            </p>
            <button onClick={stopBreathing} style={{
              fontSize: "11px", color: "#94a3b8",
              background: "none", border: "1px solid #e2e8f0",
              borderRadius: "6px", padding: "5px 12px", cursor: "pointer",
            }}>Stop</button>
          </div>
        ) : (
          <button onClick={startBreathing} style={{
            width: "100%", padding: "11px", borderRadius: "10px", border: "none",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer",
          }}>
            ▶ Start Exercise
          </button>
        )}
      </div>

      {/* Crisis lines — always visible at bottom */}
      <div style={{
        background: "#fef2f2", border: "1px solid #fecaca",
        borderRadius: "12px", padding: "14px",
      }}>
        <p style={{
          fontSize: "10px", fontWeight: "700", color: "#dc2626",
          textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 10px",
        }}>
          🆘 If you're in crisis
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
          {[
            ["iCall (free, confidential)",    "9152987821"],
            ["Vandrevala Foundation (24/7)",  "1860-2662-345"],
            ["NIMHANS Helpline",              "080-46110007"],
          ].map(([label, num]) => (
            <div key={num} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <p style={{ fontSize: "11px", color: "#7f1d1d", margin: 0 }}>{label}</p>
              <p style={{ fontSize: "12px", fontWeight: "700", color: "#dc2626", margin: 0 }}>{num}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
