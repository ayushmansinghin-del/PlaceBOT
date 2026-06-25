// ─────────────────────────────────────────────
// STRESS / CONFIDENCE DATA
// Restructured around 4 practical situations.
// No motivational quotes. No generic advice.
// ─────────────────────────────────────────────

export const STRESS_DATA = {
  moods: [
    { id: "before",     label: "Before Interview",  emoji: "😟", desc: "Nerves before the big day" },
    { id: "during",     label: "In the Interview",  emoji: "😰", desc: "Blanking or panicking mid-interview" },
    { id: "rejected",   label: "After Rejection",   emoji: "💔", desc: "Didn't get the offer" },
    { id: "burnout",    label: "Burnt Out",         emoji: "😮‍💨", desc: "Can't study anymore" },
    { id: "overwhelmed",label: "Overwhelmed",       emoji: "🌀", desc: "Too much at once" },
    { id: "confidence", label: "Low Confidence",    emoji: "😔", desc: "Doubting yourself" },
  ],

  responses: {
    before: {
      title: "Before the Interview",
      insight: "Preparation ends the night before. The day of is only execution.",
      steps: [
        { icon: "📵", text: "Stop studying new material after 10pm the night before. Sleep is more useful." },
        { icon: "🗣️", text: "Say 'I am excited' instead of 'I am nervous.' Same feeling, better frame. It works." },
        { icon: "🧘", text: "Morning of: eat, drink water, 15-minute walk. No phone for the first 30 minutes." },
        { icon: "📋", text: "Re-read your 2 best projects before entering. Be ready to explain them clearly." },
      ],
      helpline: null,
    },

    during: {
      title: "When You Blank Mid-Interview",
      insight: "Going blank is normal. What matters is how you respond in the next 10 seconds.",
      steps: [
        { icon: "⏸️", text: "Say: 'Let me think through this for a moment.' Then pause. This is not a problem." },
        { icon: "🗺️", text: "Think out loud. Even a wrong direction shows your reasoning process." },
        { icon: "❓", text: "If the problem is unclear, ask one clarifying question. Interviewers expect this." },
        { icon: "🔁", text: "If stuck, start with a brute force answer. Then say: 'Can I optimise this?'" },
      ],
      helpline: null,
    },

    rejected: {
      title: "After a Rejection",
      insight: "Rejection is information. Use the next 48 hours well.",
      steps: [
        { icon: "⏳", text: "Take today off. Don't apply, compare, or analyse. Just let yourself feel it." },
        { icon: "📧", text: "Tomorrow: email the recruiter — 'Could you share any feedback?' Many reply. That feedback is useful." },
        { icon: "📝", text: "Write down the exact moment in the interview that felt weakest. That is your next focus area." },
        { icon: "📊", text: "Reality check: most companies accept under 2% of applicants. One rejection says nothing final about you." },
      ],
      helpline: "If this rejection triggers ongoing low mood or hopelessness, speak to someone — iCall: 9152987821.",
    },

    burnout: {
      title: "When You Can't Study Anymore",
      insight: "Burnout is depletion, not laziness. You can only recover your way out of it.",
      steps: [
        { icon: "🛑", text: "Stop completely today. No LeetCode, no LinkedIn, no prep. This is not optional." },
        { icon: "😴", text: "Sleep 8 hours. Memory consolidates during sleep. Rest is productive." },
        { icon: "🚶", text: "Tomorrow: one 25-minute work block, then a full break. Maximum three blocks. Stop after that." },
        { icon: "📅", text: "This week: protect one half-day where placement prep does not exist." },
      ],
      helpline: "If burnout has lasted several weeks with mood changes, speak to your college counsellor.",
    },

    overwhelmed: {
      title: "When Everything Feels Like Too Much",
      insight: "Overwhelm means your brain is holding too many open loops. Close them one at a time.",
      steps: [
        { icon: "✍️", text: "Write every stressor down on paper. Getting it out of your head is the first step." },
        { icon: "🎯", text: "Pick the one task that, if done today, reduces pressure on everything else. Do only that." },
        { icon: "⏱️", text: "Work in one 25-minute block. Nothing else counts today after that." },
        { icon: "🚪", text: "Close your laptop by 9pm. Recovery is part of preparation." },
      ],
      helpline: "If this has lasted weeks and affects sleep or appetite, your college counsellor is a good first call.",
    },

    confidence: {
      title: "When You're Doubting Yourself",
      insight: "Comparison uses biased data. You see their offers, not their rejections.",
      steps: [
        { icon: "🔭", text: "Log off LinkedIn for 7 days. It is not useful during active preparation." },
        { icon: "📋", text: "Write 3 specific things you know or have built this month. They exist." },
        { icon: "🏁", text: "Your only comparison is who you were last week. That is the only fair race." },
        { icon: "🌬️", text: "4-7-8 breathing when anxiety spikes: inhale 4, hold 7, exhale 8. Repeat 4 times." },
      ],
      helpline: "Persistent feelings of worthlessness need more than a study break. iCall: 9152987821.",
    },
  },

  breathingSteps: [
    { phase: "Breathe in",  duration: 4, color: "#6366f1" },
    { phase: "Hold",        duration: 7, color: "#8b5cf6" },
    { phase: "Breathe out", duration: 8, color: "#10b981" },
    { phase: "Hold",        duration: 4, color: "#f59e0b" },
  ],
};
