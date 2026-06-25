// ─────────────────────────────────────────────
// RESUME KEYWORDS — used by the resume analyzer
// Matches the 3 roles in knowledge.js
// ─────────────────────────────────────────────

export const RESUME_KEYWORDS = {
  "Software Engineer": {
    critical: ["data structures", "algorithms", "object-oriented", "sql", "git", "java", "python", "c++", "arrays", "trees", "graphs", "api", "database"],
    good:     ["docker", "aws", "redis", "ci/cd", "rest", "nosql", "linux"],
    soft:     ["teamwork", "problem-solving", "communication"],
  },
  "Data Scientist / ML Engineer": {
    critical: ["machine learning", "python", "pandas", "numpy", "sql", "statistics", "model", "regression", "classification", "data analysis"],
    good:     ["tensorflow", "pytorch", "deep learning", "nlp", "feature engineering", "kaggle", "tableau"],
    soft:     ["analytical", "research", "communication"],
  },
  "Frontend Developer": {
    critical: ["html", "css", "javascript", "react", "responsive", "git", "dom", "es6", "api"],
    good:     ["typescript", "next.js", "testing", "accessibility", "webpack", "vite"],
    soft:     ["attention to detail", "user empathy"],
  },
};
