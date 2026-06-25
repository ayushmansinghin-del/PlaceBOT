// MD — Simple inline markdown renderer
// Supports: ## headings, ### subheadings, **bold**, `code`, bullets, --- dividers
// Props: text (string), isUser (bool)

export default function MD({ text, isUser }) {
  const lines = text.split("\n");

  const renderInline = (t) =>
    t.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/).map((part, j) => {
      if (part.startsWith("**") && part.endsWith("**"))
        return <strong key={j} style={{ fontWeight: "700", color: isUser ? "#fef3c7" : "#0f172a" }}>{part.slice(2, -2)}</strong>;
      if (part.startsWith("`") && part.endsWith("`"))
        return <code key={j} style={{ fontSize: "11px", background: isUser ? "rgba(255,255,255,0.18)" : "#f1f5f9", padding: "2px 6px", borderRadius: "4px", fontFamily: "ui-monospace, monospace", color: isUser ? "#e0e7ff" : "#5b21b6" }}>{part.slice(1, -1)}</code>;
      if (part.startsWith("*") && part.endsWith("*") && part.length > 2)
        return <em key={j}>{part.slice(1, -1)}</em>;
      return <span key={j}>{part}</span>;
    });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: "5px" }} />;

        if (line.startsWith("## "))
          return <p key={i} style={{ fontSize: "14px", fontWeight: "700", color: isUser ? "#fff" : "#0f172a", margin: "6px 0 2px", letterSpacing: "-0.01em" }}>{line.slice(3)}</p>;

        if (line.startsWith("### "))
          return <p key={i} style={{ fontSize: "11px", fontWeight: "700", color: isUser ? "#c7d2fe" : "#3730a3", margin: "5px 0 2px", textTransform: "uppercase", letterSpacing: "0.07em" }}>{line.slice(4)}</p>;

        if (line === "---")
          return <hr key={i} style={{ border: "none", borderTop: `1px solid ${isUser ? "rgba(255,255,255,0.18)" : "#e8ecf0"}`, margin: "6px 0" }} />;

        const isBullet = line.startsWith("• ") || line.startsWith("- ");
        if (isBullet)
          return (
            <div key={i} style={{ display: "flex", gap: "8px", fontSize: "13px", lineHeight: "1.6" }}>
              <span style={{ color: isUser ? "#a5b4fc" : "#6366f1", marginTop: "1px", flexShrink: 0, fontSize: "11px" }}>▸</span>
              <span style={{ color: isUser ? "rgba(255,255,255,0.92)" : "#334155" }}>{renderInline(line.replace(/^[•-] /, ""))}</span>
            </div>
          );

        return <p key={i} style={{ fontSize: "13px", lineHeight: "1.6", margin: 0, color: isUser ? "rgba(255,255,255,0.95)" : "#334155" }}>{renderInline(line)}</p>;
      })}
    </div>
  );
}
