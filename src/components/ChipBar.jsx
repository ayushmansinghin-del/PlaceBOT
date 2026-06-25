// ChipBar — contextual chip buttons shown below the chat
// Props: stage, selSkills, setSelSkills, selCompanies, setSelCompanies, onSend

import { CheckCircle, Target, Building2 } from "lucide-react";
import { S, SKILL_CHIPS, ROLE_CHIPS, COMPANY_CHIPS, MAIN_CHIPS } from "../constants.js";

// Reusable chip component so styles stay consistent
function Chip({ label, selected, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={selected ? "pb-chip-selected" : "pb-chip"}
      style={{
        display: "inline-flex", alignItems: "center", gap: "4px",
        padding: "6px 12px",
        borderRadius: "999px",
        fontSize: "12px",
        fontWeight: selected ? "600" : "500",
        cursor: "pointer",
        border: `1.5px solid ${selected ? "#6366f1" : "rgba(99,102,241,0.22)"}`,
        background: selected ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#fff",
        color: selected ? "#fff" : "#4f46e5",
        transition: "border-color 0.15s, background 0.15s",
        whiteSpace: "nowrap",
        flexShrink: 0,
        lineHeight: 1,
      }}>
      {icon && icon}
      {selected ? `✓ ${label}` : label}
    </button>
  );
}

// Confirm/submit button shown after selecting skills or companies
function ConfirmBtn({ count, label, icon, onClick }) {
  return (
    <button onClick={onClick} style={{
      marginTop: "8px", width: "100%", padding: "10px",
      borderRadius: "10px", border: "none",
      background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
      color: "#fff", fontSize: "13px", fontWeight: "700",
      cursor: "pointer",
      display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
    }}>
      {icon} {label} {count} {count === 1 ? label.slice(-1) === "s" ? label.slice(0,-1) : label : label}
    </button>
  );
}

export default function ChipBar({ stage, selSkills, setSelSkills, selCompanies, setSelCompanies, onSend }) {
  if (stage === S.ASK_NAME) return null;

  const toggleSkill = (s) => setSelSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s]);
  const toggleCo    = (c) => setSelCompanies(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);

  return (
    <div style={{
      flexShrink: 0,
      padding: "10px 14px 8px",
      background: "#f8fafc",
      borderTop: "1px solid #e8ecf0",
    }}>

      {/* SKILLS */}
      {stage === S.ASK_SKILLS && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", margin: "0 0 8px" }}>
            Tap to select your skills:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "100px", overflowY: "auto" }}>
            {SKILL_CHIPS.map(s => (
              <Chip key={s} label={s} selected={selSkills.includes(s)} onClick={() => toggleSkill(s)} />
            ))}
          </div>
          {selSkills.length > 0 && (
            <button onClick={() => onSend(selSkills.join(", "))} style={{
              marginTop: "8px", width: "100%", padding: "10px",
              borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontSize: "13px", fontWeight: "700",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}>
              <CheckCircle size={14} /> Confirm {selSkills.length} skill{selSkills.length !== 1 ? "s" : ""}
            </button>
          )}
        </div>
      )}

      {/* ROLES */}
      {stage === S.ASK_ROLE && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {ROLE_CHIPS.map(r => (
            <Chip key={r} label={r} selected={false} onClick={() => onSend(r)} icon={<Target size={10} />} />
          ))}
        </div>
      )}

      {/* COMPANIES */}
      {stage === S.ASK_COMPANIES && (
        <div>
          <p style={{ fontSize: "11px", fontWeight: "600", color: "#64748b", margin: "0 0 8px" }}>
            Select target companies:
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", maxHeight: "88px", overflowY: "auto" }}>
            {COMPANY_CHIPS.map(c => (
              <Chip key={c} label={c} selected={selCompanies.includes(c)} onClick={() => toggleCo(c)} />
            ))}
          </div>
          {selCompanies.length > 0 && (
            <button onClick={() => onSend(selCompanies.join(", "))} style={{
              marginTop: "8px", width: "100%", padding: "10px",
              borderRadius: "10px", border: "none",
              background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
              color: "#fff", fontSize: "13px", fontWeight: "700",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", gap: "6px",
            }}>
              <Building2 size={14} /> Confirm {selCompanies.length} compan{selCompanies.length !== 1 ? "ies" : "y"}
            </button>
          )}
        </div>
      )}

      {/* MAIN / MOCK — quick actions */}
      {(stage === S.MAIN || stage === S.MOCK) && (
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "2px" }}>
          {MAIN_CHIPS.map(chip => (
            <Chip key={chip.label} label={chip.label} selected={false} onClick={() => onSend(chip.q)} />
          ))}
        </div>
      )}
    </div>
  );
}
