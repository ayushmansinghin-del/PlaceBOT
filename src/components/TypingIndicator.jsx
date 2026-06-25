// TypingIndicator — animated dots while PlaceBot is "thinking"

export default function TypingIndicator() {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "8px", animation: "pb-in 0.22s ease-out" }}>
      <div style={{
        width: "28px", height: "28px", borderRadius: "9px",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "linear-gradient(135deg, #1e1b4b, #312e81)",
        boxShadow: "0 2px 8px rgba(30,27,75,0.25)",
      }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M5 4h9a5 5 0 010 10H5V4z" fill="#6366f1" />
        </svg>
      </div>
      <div style={{
        padding: "12px 16px", borderRadius: "16px", borderBottomLeftRadius: "4px",
        background: "#fff", border: "1px solid #e8ecf0",
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
      }}>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#818cf8",
              animation: `pb-bounce 1.2s ease-in-out ${i * 0.2}s infinite`,
            }} />
          ))}
        </div>
        <p style={{ fontSize: "10px", color: "#94a3b8", margin: "4px 0 0" }}>Thinking…</p>
      </div>
    </div>
  );
}
