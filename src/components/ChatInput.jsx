// ChatInput — text input + send button
// Props: input, setInput, onSend, isTyping, stage

import { Send } from "lucide-react";
import { S } from "../constants.js";

function getPlaceholder(stage) {
  if (stage === S.ASK_NAME)      return "Type your first name…";
  if (stage === S.ASK_SKILLS)    return "Type skills, or pick from chips above…";
  if (stage === S.ASK_ROLE)      return "Type your target role…";
  if (stage === S.ASK_COMPANIES) return "Type companies, or pick from chips above…";
  return "Ask anything, or tap a chip above…";
}

export default function ChatInput({ input, setInput, onSend, isTyping, stage }) {
  const canSend = input.trim() && !isTyping;

  return (
    <div style={{ flexShrink: 0, padding: "10px 14px 14px", background: "#f8fafc" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: "8px",
        padding: "10px 14px",
        borderRadius: "14px",
        background: "#fff",
        border: `1.5px solid ${canSend ? "#a5b4fc" : "#e2e8f0"}`,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        transition: "border-color 0.2s",
      }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSend(input); } }}
          placeholder={getPlaceholder(stage)}
          style={{
            flex: 1, background: "transparent", border: "none", outline: "none",
            /* 16px prevents iOS auto-zoom on focus */
            fontSize: "16px", color: "#334155", fontFamily: "inherit",
          }}
        />
        <button
          onClick={() => onSend(input)}
          disabled={!canSend}
          style={{
            width: "36px", height: "36px", borderRadius: "10px", border: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            background: canSend ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e2e8f0",
            cursor: canSend ? "pointer" : "not-allowed",
            opacity: isTyping ? 0.55 : 1,
            transition: "all 0.15s",
            flexShrink: 0,
          }}>
          <Send size={14} color={canSend ? "#fff" : "#9ca3af"} strokeWidth={2.5} />
        </button>
      </div>
      <p style={{ textAlign: "center", fontSize: "10px", color: "#cbd5e1", marginTop: "6px" }}>
        PlaceBot · Rule-based placement prep · Not AI-generated
      </p>
    </div>
  );
}
