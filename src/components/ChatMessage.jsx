// ChatMessage — single bot or user message bubble
// Props: msg { id, role, text, time }

import { User } from "lucide-react";
import MD from "./MD.jsx";

export default function ChatMessage({ msg }) {
  const isUser = msg.role === "user";

  return (
    <div style={{
      display: "flex",
      alignItems: "flex-end",
      gap: "8px",
      flexDirection: isUser ? "row-reverse" : "row",
      animation: "pb-in 0.22s ease-out",
    }}>
      {/* Avatar */}
      <div style={{
        width: "28px", height: "28px", borderRadius: "9px",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0, marginBottom: "2px",
        background: isUser
          ? "linear-gradient(135deg, #6366f1, #8b5cf6)"
          : "linear-gradient(135deg, #1e1b4b, #312e81)",
        boxShadow: `0 2px 8px ${isUser ? "rgba(99,102,241,0.3)" : "rgba(30,27,75,0.25)"}`,
      }}>
        {isUser
          ? <User size={13} color="#fff" />
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M5 4h9a5 5 0 010 10H5V4z" fill="#6366f1" />
              <path d="M5 14v6" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
        }
      </div>

      {/* Bubble */}
      <div style={{
        maxWidth: "80%",
        borderRadius: "16px",
        padding: "12px 15px",
        borderBottomRightRadius: isUser ? "4px" : "16px",
        borderBottomLeftRadius: isUser ? "16px" : "4px",
        ...(isUser
          ? { background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", boxShadow: "0 4px 14px rgba(79,70,229,0.28)" }
          : { background: "#ffffff", color: "#1e293b", border: "1px solid #e8ecf0", boxShadow: "0 1px 8px rgba(0,0,0,0.07)" }
        ),
      }}>
        <MD text={msg.text} isUser={isUser} />
        <p style={{ fontSize: "10px", textAlign: "right", marginTop: "6px", opacity: 0.35, margin: "6px 0 0" }}>
          {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
