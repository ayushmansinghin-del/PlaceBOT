// SidePanel — wrapper for Resume and Stress panels
// On mobile: renders as a fixed full-screen overlay
// On desktop: renders beside the chat
// Props: activePanel ("resume"|"stress"|null), onClose, profile

import { FileText, Heart } from "lucide-react";
import ResumePanel from "./ResumePanel.jsx";
import StressPanel from "./StressPanel.jsx";

export default function SidePanel({ activePanel, onClose, profile }) {
  if (!activePanel) return null;

  const isResume = activePanel === "resume";
  const headerGrad = isResume
    ? "linear-gradient(135deg, #1e3a5f, #1e40af)"
    : "linear-gradient(135deg, #2d1b4b, #4c1d95)";

  return (
    // pb-side-overlay class triggers full-screen mode on mobile via index.css
    <div className="pb-side-overlay" style={{
      width: "340px",
      height: "min(94vh, 860px)",
      borderRadius: "20px",
      overflow: "hidden",
      background: "#ffffff",
      boxShadow: "0 0 0 1px rgba(99,102,241,0.12), 0 32px 64px rgba(0,0,0,0.35)",
      display: "flex",
      flexDirection: "column",
      animation: "pb-slideIn 0.25s ease-out",
      flexShrink: 0,
    }}>
      {/* Header */}
      <div style={{
        flexShrink: 0,
        padding: "14px 16px",
        background: headerGrad,
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "10px",
            background: "rgba(255,255,255,0.12)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            {isResume
              ? <FileText size={16} color={isResume ? "#93c5fd" : "#f9a8d4"} />
              : <Heart size={16} color="#f9a8d4" />
            }
          </div>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#fff", margin: 0 }}>
              {isResume ? "Resume Analyzer" : "Stress Support"}
            </p>
            <p style={{ fontSize: "10px", color: isResume ? "#93c5fd" : "#f9a8d4", margin: 0 }}>
              {isResume ? "ATS score · keyword gaps · tips" : "Breathing · CBT tools · crisis lines"}
            </p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="pb-side-close"
          style={{
            width: "30px", height: "30px", borderRadius: "8px",
            background: "rgba(255,255,255,0.1)",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.75)",
            cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "14px", fontWeight: "500",
            transition: "background 0.15s",
          }}>
          ✕
        </button>
      </div>

      {/* Scrollable content */}
      <div style={{ flex: 1, overflowY: "auto" }}>
        {isResume ? <ResumePanel profile={profile} /> : <StressPanel />}
      </div>
    </div>
  );
}
