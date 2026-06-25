// App.jsx — PlaceBot main component
// Holds: state, handle() message router, top-level layout
// UI pieces → /components | Data → /data | Logic → /utils

import { useState, useEffect, useRef, useCallback } from "react";
import { FileText, Heart, RotateCcw } from "lucide-react";

import { S } from "./constants.js";
import { KB } from "./data/knowledge.js";
import { analyzeSkillGap, buildSkillGapMessage } from "./utils/skillGap.js";
import { buildCompanyDeepDive } from "./utils/companyPrep.js";
import { getMockQuestion, formatMockQuestion } from "./utils/mockInterview.js";

import ChatMessage from "./components/ChatMessage.jsx";
import TypingIndicator from "./components/TypingIndicator.jsx";
import ChipBar from "./components/ChipBar.jsx";
import ChatInput from "./components/ChatInput.jsx";
import SidePanel from "./components/SidePanel.jsx";

const WELCOME_MSG = {
  id: 1, role: "bot", time: new Date(),
  text: `## Welcome to PlaceBot 👋\n\nI'm your placement prep coach — built for engineering students targeting campus and off-campus drives.\n\nI'll guide you through **skills → target role → companies → your personal prep plan**.\n\nLet's start. **What's your first name?**`,
};

const STAGE_STEPS = [
  { key: S.ASK_NAME,      label: "Name" },
  { key: S.ASK_SKILLS,    label: "Skills" },
  { key: S.ASK_ROLE,      label: "Role" },
  { key: S.ASK_COMPANIES, label: "Companies" },
  { key: S.SHOW_ANALYSIS, label: "Analysis" },
  { key: S.MAIN,          label: "Ready ✓" },
];

// Simple hook: returns true when window width ≤ 640px
function useMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth <= 640);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const onChange = (e) => setMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return mobile;
}

export default function PlaceBot() {
  const isMobile = useMobile();

  const [stage, setStage]               = useState(S.ASK_NAME);
  const [activePanel, setActivePanel]   = useState(null);
  const [messages, setMessages]         = useState([WELCOME_MSG]);
  const [input, setInput]               = useState("");
  const [isTyping, setIsTyping]         = useState(false);
  const [profile, setProfile]           = useState({ name: "", skills: [], role: "", companies: [] });
  const [selSkills, setSelSkills]       = useState([]);
  const [selCompanies, setSelCompanies] = useState([]);
  const [mockType, setMockType]         = useState("dsa");
  const [mockIdx, setMockIdx]           = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const addBot = useCallback((text, delay = 650) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now(), role: "bot", text, time: new Date() }]);
      setIsTyping(false);
    }, delay);
  }, []);

  const addUser = useCallback((text) => {
    setMessages(prev => [...prev, { id: Date.now(), role: "user", text, time: new Date() }]);
  }, []);

  const resetAll = useCallback(() => {
    setStage(S.ASK_NAME);
    setProfile({ name: "", skills: [], role: "", companies: [] });
    setSelSkills([]);
    setSelCompanies([]);
    setMockType("dsa");
    setMockIdx(0);
    setMessages([WELCOME_MSG]);
    setActivePanel(null);
  }, []);

  const handle = useCallback((rawText) => {
    const text = rawText.trim();
    if (!text || isTyping) return;
    setInput("");
    if (isMobile) setActivePanel(null); // close panel on mobile when user sends
    addUser(text);
    const lower = text.toLowerCase();

    // ── Stress triggers (always available) ──
    if (/\b(stress|stressed|overwhelm|anxious|anxiety|depressed|panic|suicidal|give up|hopeless|burnout|burned out|exhausted)\b/.test(lower)) {
      setActivePanel("stress");
      addBot(`I hear you${profile.name ? `, ${profile.name}` : ""}. 💙\n\nI've opened the **Stress Support** panel — breathing exercises, mood guidance, and helpline numbers are all there.\n\nYou're not alone in this. Placement season is hard, and reaching out is the smart move.`, 600);
      return;
    }
    if (/\b(rejected|rejection|didn't get|failed interview|no offer|got rejected)\b/.test(lower)) {
      addBot(`A rejection stings — and that's okay to feel.\n\n**Within 24 hours:** Email the recruiter: "Could you share any feedback?" Many do reply, and that feedback is gold.\n\n**Then:** Write down the exact moment that felt weakest. That becomes your next two-week focus.\n\nRejection is redirection with data inside it. You're still in this.`, 750);
      return;
    }
    if (/\b(nervous|scared|butterflies|fear of interview)\b/.test(lower)) {
      addBot(`Pre-interview nerves = your brain saying "this matters." That's a feature.\n\n**Harvard tip:** Say "I'm excited" not "I'm calm." Same adrenaline, 22% better output.\n\n**Night before:** No new material after 10pm → sleep → morning walk → water → eat.\n\n**In the room:** If stuck, say "Let me think through this." Pause. Breathe. They're watching your process, not just your answer.\n\nWhich company is the interview with? I'll give you a specific checklist.`, 700);
      return;
    }

    // ── Resume trigger ──
    if (/\b(resume|cv|ats|analyze resume|check resume)\b/.test(lower)) {
      setActivePanel("resume");
      addBot(`I've opened the **Resume Analyzer**${profile.name ? `, ${profile.name}` : ""}.\n\nPaste your resume text there and pick your target role — you'll get an ATS score, keyword gaps, and improvement tips instantly.`, 500);
      return;
    }

    // ── Onboarding flow ──
    if (stage === S.ASK_NAME) {
      const n = text.split(" ")[0].replace(/[^a-zA-Z]/g, "");
      if (n.length < 2) { addBot("Please enter a valid first name to continue.", 400); return; }
      setProfile(p => ({ ...p, name: n }));
      setStage(S.ASK_SKILLS);
      addBot(`Nice to meet you, **${n}**! 🙌\n\nNow — which skills do you currently have? Tap the chips below or type them.\n\n*Be honest here. The more accurate, the better your prep plan.*`, 600);
      return;
    }

    if (stage === S.ASK_SKILLS) {
      const typed = text.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
      const combined = [...new Set([...selSkills, ...typed])];
      setProfile(p => ({ ...p, skills: combined }));
      setSelSkills([]);
      setStage(S.ASK_ROLE);
      addBot(`Got it — **${combined.length} skill${combined.length !== 1 ? "s" : ""}** saved.\n\nWhat's your **target role**? Tap a chip below or type it.`, 600);
      return;
    }

    if (stage === S.ASK_ROLE) {
      const matched = Object.keys(KB.roles).find(r =>
        lower.includes(r.toLowerCase().split(" ")[0]) || r.toLowerCase().includes(lower.split(" ")[0])
      ) || text;
      setProfile(p => ({ ...p, role: matched }));
      setStage(S.ASK_COMPANIES);
      addBot(`**${matched}** — solid choice.\n\nWhich companies are you targeting? You can pick multiple from the chips below.`, 600);
      return;
    }

    if (stage === S.ASK_COMPANIES) {
      const typed = text.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
      const all = [...new Set([...selCompanies, ...typed])];
      const matched = all.map(c =>
        Object.keys(KB.companies).find(k =>
          k.toLowerCase().includes(c.toLowerCase().split(" ")[0]) ||
          c.toLowerCase().includes(k.toLowerCase().split(" ")[0])
        ) || c
      );
      const fp = { ...profile, companies: matched };
      setProfile(fp);
      setSelCompanies([]);
      setStage(S.SHOW_ANALYSIS);
      addBot(`Building your plan…`, 300);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const gap = analyzeSkillGap(fp.skills, fp.role, matched);
          const msg = buildSkillGapMessage(fp.name, gap, fp.role, matched);
          setMessages(prev => [...prev, { id: Date.now(), role: "bot", text: msg, time: new Date() }]);
          setIsTyping(false);
          setTimeout(() => {
            addBot(`Your profile is ready, **${fp.name}**! 🎯\n\nUse the chips below to navigate:\n• **Skill Gap** — updated gap analysis\n• **DSA / Behavioural / Technical / Aptitude** — mock questions\n• **Roadmap** — week-by-week study plan\n• **[Company name]** — full prep guide for any company\n• **Resume** or **Stress** buttons in the header anytime`, 900);
            setStage(S.MAIN);
          }, 1000);
        }, 1800);
      }, 400);
      return;
    }

    // ── Main stage ──
    if (stage === S.MAIN || stage === S.MOCK) {
      const targets = profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions);
      const dsaTrig      = /\b(dsa|coding|algorithm|leetcode|data structure)\b/.test(lower);
      const behaviorTrig = /\b(behavioral|behaviour|star|hr question)\b/.test(lower);
      const aptTrig      = /\b(aptitude|reasoning|quant|verbal|logical|gd|group discussion|technical question)\b/.test(lower);
      const nextTrig     = /\b(next|continue|another|more)\b/.test(lower);
      const ansTrig      = /\b(answer|solution|reveal|show)\b/.test(lower);

      if (dsaTrig && !nextTrig) {
        setStage(S.MOCK); setMockType("dsa"); setMockIdx(0);
        addBot(formatMockQuestion(getMockQuestion(targets, "dsa", 0), 0, profile.name), 700);
        return;
      }
      if (behaviorTrig && !nextTrig) {
        setStage(S.MOCK); setMockType("behavioral"); setMockIdx(0);
        addBot(formatMockQuestion(getMockQuestion(targets, "behavioral", 0), 0, profile.name), 700);
        return;
      }

      if (aptTrig && !nextTrig) {
        const t = lower.includes("gd") || lower.includes("group") ? "gd"
                : lower.includes("technical") ? "technical" : "aptitude";
        setStage(S.MOCK); setMockType(t); setMockIdx(0);
        addBot(formatMockQuestion(getMockQuestion(targets, t, 0), 0, profile.name), 700);
        return;
      }
      if (nextTrig && stage === S.MOCK) {
        const ni = mockIdx + 1; setMockIdx(ni);
        addBot(formatMockQuestion(getMockQuestion(targets, mockType, ni), ni, profile.name), 500);
        return;
      }
      if (ansTrig) {
        const mq = getMockQuestion(targets, mockType, mockIdx);
        if (mq?.q?.answer) {
          addBot(`## Answer\n\n${mq.q.answer}\n\n**Key takeaway:** ${mq.type === "aptitude" ? "Practice until you can solve this category in under 45 seconds." : "Interviewers assess your reasoning, not just the final answer."}\n\nType **next** to continue.`, 600);
        } else {
          addBot("No single correct answer — your structured reasoning is what's evaluated. Type **next** to continue.", 500);
        }
        return;
      }
      if (/\b(skill gap|gap analysis|what to learn|missing skills)\b/.test(lower)) {
        const gap = analyzeSkillGap(profile.skills, profile.role, profile.companies);
        addBot(buildSkillGapMessage(profile.name, gap, profile.role, profile.companies), 800);
        return;
      }
      if (/\b(roadmap|study plan|week by week|schedule|timeline)\b/.test(lower)) {
        const rm = KB.roadmap;
        let msg = `## ${profile.name}'s Prep Roadmap\n\n**Total:** ${rm.weeks} weeks\n\n`;
        rm.phases.forEach(p => {
          msg += `### ${p.phase}\n`;
          p.tasks.forEach(t => { msg += `• ${t}\n`; });
          msg += `\n`;
        });
        addBot(msg, 800);
        return;
      }
      const foundCo = Object.keys(KB.companies).find(co => lower.includes(co.toLowerCase()));
      if (foundCo) { addBot(buildCompanyDeepDive(foundCo), 900); return; }
      if (/\b(restart|reset|start over)\b/.test(lower)) { resetAll(); return; }

      // Fallback
      addBot(`Here's what I can help with, ${profile.name}:\n\n• **DSA Mock** — coding questions\n• **Behavioural** — STAR practice\n• **Technical** — CS fundamentals\n• **Aptitude** — quant and logical\n• **Skill Gap** — gap analysis\n• **Roadmap** — study plan\n• **[Company name]** — e.g. type "Google" or "TCS"\n\nOr tap a chip above.`, 600);
    }
  }, [stage, profile, selSkills, selCompanies, mockType, mockIdx, isTyping, isMobile, addBot, addUser, resetAll]);

  const stageIdx = STAGE_STEPS.findIndex(s => s.key === stage);

  // ── Layout values ──
  const chatMaxW   = activePanel && !isMobile ? "580px" : "680px";
  const outerMaxW  = activePanel && !isMobile ? "940px" : "680px";

  return (
    <div style={{
      minHeight: "100svh",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: isMobile ? "0" : "12px",
      background: "linear-gradient(150deg, #0f0c29 0%, #302b63 55%, #1a1a2e 100%)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Ambient glow — desktop only */}
      {!isMobile && (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "-120px", left: "8%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
          <div style={{ position: "absolute", bottom: "-120px", right: "8%", width: "450px", height: "450px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)" }} />
        </div>
      )}

      {/* Outer flex wrapper */}
      <div style={{
        position: "relative",
        display: "flex", gap: "14px", alignItems: "flex-start",
        width: "100%", maxWidth: outerMaxW,
        transition: "max-width 0.3s ease",
      }}>

        {/* ── CHAT PANEL ── */}
        <div style={{
          flex: 1, maxWidth: chatMaxW,
          height: isMobile ? "100svh" : "min(94vh, 860px)",
          display: "flex", flexDirection: "column",
          borderRadius: isMobile ? "0" : "20px",
          overflow: "hidden",
          background: "#ffffff",
          boxShadow: isMobile ? "none" : "0 0 0 1px rgba(99,102,241,0.12), 0 32px 72px rgba(0,0,0,0.45)",
          transition: "max-width 0.3s ease",
        }}>

          {/* ── HEADER ── */}
          <div style={{
            flexShrink: 0,
            padding: isMobile ? "12px 14px 10px" : "14px 18px 12px",
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 65%, #1e1b4b 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.25)",
          }}>
            {/* Top row: logo + actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "8px" }}>

              {/* Logo */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px", minWidth: 0 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: isMobile ? "36px" : "42px",
                    height: isMobile ? "36px" : "42px",
                    borderRadius: "11px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 20px rgba(99,102,241,0.45)",
                  }}>
                    <svg width={isMobile ? "20" : "24"} height={isMobile ? "20" : "24"} viewBox="0 0 24 24" fill="none">
                      <path d="M5 4h9a5 5 0 010 10H5V4z" fill="white" fillOpacity="0.92" />
                      <path d="M5 14v6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                      <circle cx="18" cy="3" r="2.5" fill="#fbbf24" />
                    </svg>
                  </div>
                  {/* Online dot */}
                  <div style={{
                    position: "absolute", bottom: "-1px", right: "-1px",
                    width: "10px", height: "10px", borderRadius: "50%",
                    background: "#34d399", border: "2px solid #1e1b4b",
                    animation: "pb-pulse 2.5s infinite",
                  }} />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <h1 style={{
                      fontSize: isMobile ? "17px" : "19px",
                      fontWeight: "800", color: "#fff",
                      letterSpacing: "-0.02em", margin: 0,
                    }}>PlaceBot</h1>
                    <span style={{
                      fontSize: "9px", fontWeight: "700", color: "#a5b4fc",
                      background: "rgba(99,102,241,0.2)", padding: "2px 6px",
                      borderRadius: "999px", border: "1px solid rgba(99,102,241,0.3)",
                    }}>BETA</span>
                  </div>
                  <p style={{ fontSize: "9.5px", color: "#818cf8", letterSpacing: "0.07em", margin: 0 }}>
                    PLACEMENT COACH
                  </p>
                </div>
              </div>

              {/* Right actions */}
              <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 0 }}>
                {/* Resume button */}
                <button
                  onClick={() => setActivePanel(p => p === "resume" ? null : "resume")}
                  className="pb-header-btn"
                  title="Resume Analyzer"
                  style={{
                    padding: isMobile ? "6px 8px" : "6px 10px",
                    borderRadius: "8px", border: `1px solid ${activePanel === "resume" ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.12)"}`,
                    background: activePanel === "resume" ? "rgba(99,102,241,0.18)" : "rgba(255,255,255,0.06)",
                    color: activePanel === "resume" ? "#c7d2fe" : "#a5b4fc",
                    fontSize: "11px", fontWeight: "600",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
                    transition: "all 0.15s",
                  }}>
                  <FileText size={12} />
                  {!isMobile && "Resume"}
                </button>

                {/* Stress button */}
                <button
                  onClick={() => setActivePanel(p => p === "stress" ? null : "stress")}
                  className="pb-header-btn"
                  title="Stress Support"
                  style={{
                    padding: isMobile ? "6px 8px" : "6px 10px",
                    borderRadius: "8px", border: `1px solid ${activePanel === "stress" ? "rgba(239,68,68,0.35)" : "rgba(255,255,255,0.12)"}`,
                    background: activePanel === "stress" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
                    color: activePanel === "stress" ? "#fca5a5" : "#a5b4fc",
                    fontSize: "11px", fontWeight: "600",
                    cursor: "pointer", display: "flex", alignItems: "center", gap: "4px",
                    transition: "all 0.15s",
                  }}>
                  <Heart size={12} />
                  {!isMobile && "Stress"}
                </button>

                {/* Name badge — hidden on mobile */}
                {profile.name && !isMobile && (
                  <span style={{
                    padding: "5px 10px", borderRadius: "999px",
                    fontSize: "11px", fontWeight: "700",
                    color: "#c7d2fe", background: "rgba(99,102,241,0.15)",
                    border: "1px solid rgba(99,102,241,0.25)",
                  }}>
                    {profile.name}
                  </span>
                )}

                {/* Reset button — only visible after onboarding */}
                {profile.name && (
                  <button
                    onClick={resetAll}
                    className="pb-header-btn"
                    title="Start over"
                    style={{
                      width: isMobile ? "30px" : "28px",
                      height: isMobile ? "30px" : "28px",
                      borderRadius: "7px", border: "1px solid rgba(255,255,255,0.1)",
                      background: "rgba(255,255,255,0.05)",
                      color: "#94a3b8", cursor: "pointer",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      transition: "all 0.15s",
                    }}>
                    <RotateCcw size={11} />
                  </button>
                )}
              </div>
            </div>

            {/* Progress bar — visible after entering name */}
            {profile.name && (
              <div style={{ marginTop: "10px", display: "flex", gap: "3px" }}>
                {STAGE_STEPS.map((step, i) => {
                  const done   = i < stageIdx || stageIdx >= STAGE_STEPS.length - 1;
                  const active = i === stageIdx && stageIdx < STAGE_STEPS.length - 1;
                  return (
                    <div key={step.key} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                      <div style={{
                        height: "3px", width: "100%", borderRadius: "2px",
                        background: done ? "#6366f1" : active ? "rgba(99,102,241,0.45)" : "rgba(255,255,255,0.1)",
                        transition: "background 0.35s ease",
                      }} />
                      <span style={{
                        fontSize: "9px", letterSpacing: "0.04em",
                        color: done ? "#a5b4fc" : active ? "#818cf8" : "rgba(255,255,255,0.25)",
                        fontWeight: active || done ? "600" : "400",
                      }}>
                        {step.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── CHAT MESSAGES ── */}
          <div style={{
            flex: 1, overflowY: "auto",
            padding: "16px",
            display: "flex", flexDirection: "column", gap: "12px",
            background: "#f4f6fb",
          }}>
            {messages.map(msg => <ChatMessage key={msg.id} msg={msg} />)}
            {isTyping && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>

          {/* ── CHIPS ── */}
          <ChipBar
            stage={stage}
            selSkills={selSkills}
            setSelSkills={setSelSkills}
            selCompanies={selCompanies}
            setSelCompanies={setSelCompanies}
            onSend={handle}
          />

          {/* ── INPUT ── */}
          <ChatInput
            input={input}
            setInput={setInput}
            onSend={handle}
            isTyping={isTyping}
            stage={stage}
          />
        </div>

        {/* ── SIDE PANEL ── */}
        <SidePanel
          activePanel={activePanel}
          onClose={() => setActivePanel(null)}
          profile={profile}
        />
      </div>
    </div>
  );
}
