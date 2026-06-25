// ─────────────────────────────────────────────
// KNOWLEDGE BASE
// Edit content here. No UI logic in this file.
// ─────────────────────────────────────────────

export const KB = {

  // ── ROLES ─────────────────────────────────────────────────────
  // 3 roles. Each has a description, max 5 skills, max 3 build goals, max 3 interview focus points.

  roles: {
    "Software Engineer": {
      description: "Build and maintain software systems. Most campus drives hire for this role.",
      skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "SQL / Databases", "Operating Systems", "Git"],
      build: [
        "One project that uses a database and has a working backend.",
        "Solve 80–100 LeetCode problems. Prioritise arrays, trees, and graphs.",
        "Push all projects to GitHub with a clear README.",
      ],
      interviewFocus: [
        "DSA: arrays, strings, trees, graphs, basic DP.",
        "CS subjects: OS (processes, threads), DBMS (SQL, normalization), CN (HTTP, TCP).",
        "OOP concepts and one design pattern you can explain clearly.",
      ],
    },

    "Data Scientist / ML Engineer": {
      description: "Analyse data and build models. Hired at product companies and analytics teams.",
      skills: ["Python", "Machine Learning basics", "SQL", "Statistics", "Pandas & NumPy"],
      build: [
        "One end-to-end ML project: data → model → result (push to GitHub).",
        "One EDA project showing clear insights from a public dataset.",
        "Solve 20–30 SQL problems on LeetCode or SQLZoo.",
      ],
      interviewFocus: [
        "ML concepts: regression, classification, overfitting, bias-variance.",
        "SQL: JOINs, GROUP BY, window functions.",
        "Stats basics: mean/variance, normal distribution, hypothesis testing.",
      ],
    },

    "Frontend Developer": {
      description: "Build the visual and interactive parts of web applications.",
      skills: ["HTML & CSS", "JavaScript (ES6+)", "React.js", "Responsive Design", "Git"],
      build: [
        "A portfolio site with at least two projects linked.",
        "One React app that fetches and displays data from a public API.",
        "One UI clone of an app you use (any: Zomato, YouTube, etc.).",
      ],
      interviewFocus: [
        "JS fundamentals: closures, promises, async/await, event loop.",
        "React hooks: useState, useEffect, and how re-renders work.",
        "CSS: Flexbox, Grid, and how to make a layout responsive.",
      ],
    },
  },

  // ── COMPANIES ─────────────────────────────────────────────────
  // 3 prep fields only. No CTC, no stats, no round-by-round breakdown.

  companies: {
    Google: {
      prep: {
        focus: "DSA is the main filter. DP and Graph problems come up the most.",
        revise: "Dynamic Programming, BFS/DFS, Trees, Sliding Window.",
        style: "Think aloud in every round. They score your reasoning, not just the answer.",
      },
    },
    Microsoft: {
      prep: {
        focus: "DSA plus OOP. Project deep-dives are very common in later rounds.",
        revise: "Trees, Graphs, Arrays, OOP patterns (Singleton, Factory).",
        style: "Show how you learn from mistakes. Growth Mindset is their core value.",
      },
    },
    Amazon: {
      prep: {
        focus: "Leadership Principles matter as much as DSA. Prepare both equally.",
        revise: "Two Pointers, Sliding Window, Dynamic Programming, Heaps.",
        style: "Every round has 2 LP questions. Use STAR format. Be specific about your role.",
      },
    },
    "Goldman Sachs": {
      prep: {
        focus: "CS fundamentals and SQL are tested more deeply here than at product companies.",
        revise: "SQL (ACID, indexing, joins), OS (processes, threads), sorting and trees.",
        style: "Accuracy matters more than speed. Show precision in your answers.",
      },
    },
    Deloitte: {
      prep: {
        focus: "Aptitude and communication are the main filters, not DSA.",
        revise: "Aptitude (IndiaBix), GD topics, your college project.",
        style: "GD: make a point, give a reason, give an example, link back. Lead calmly.",
      },
    },
    TCS: {
      prep: {
        focus: "Pick one CS subject and master it. That gets you through the tech round.",
        revise: "DBMS (normalization, SQL) or OS (processes, memory management).",
        style: "Be confident, speak clearly, keep answers short. Self-introduction matters.",
      },
    },
    Infosys: {
      prep: {
        focus: "Know your projects deeply. That is the easiest way to impress the interviewer.",
        revise: "OOP concepts, basic SQL, your project architecture and tech choices.",
        style: "Practice introducing yourself. Communication is scored as much as knowledge.",
      },
    },
    Wipro: {
      prep: {
        focus: "Essay writing is unique to Wipro. Practice writing 200 words in 15 minutes.",
        revise: "Aptitude (IndiaBix), essay drafts, project explanation.",
        style: "Explain your project clearly: what you built, why, and what you would change.",
      },
    },
  },

  // ── SKILL RESOURCES ──────────────────────────────────────────
  // Free resources only. 8 skills.

  skillResources: {
    "Data Structures & Algorithms": { free: "NeetCode.io, Striver's A-Z Sheet (GFG)", time: "6–10 weeks" },
    "Object-Oriented Programming":  { free: "GFG OOP series, NPTEL Java course", time: "2–3 weeks" },
    "SQL / Databases":              { free: "SQLZoo, LeetCode Database problems", time: "2–3 weeks" },
    "Operating Systems":            { free: "GATE Smashers OS (YouTube), OSTEP (free book)", time: "3–4 weeks" },
    "Machine Learning":             { free: "Andrew Ng ML course (Coursera audit), Kaggle Learn", time: "8–12 weeks" },
    "Python":                       { free: "python.org docs, CS50P by Harvard (free)", time: "3–4 weeks" },
    "React.js":                     { free: "react.dev official docs, The Odin Project", time: "3–5 weeks" },
    "Aptitude (Quant + Verbal)":    { free: "IndiaBix.com, PrepInsta free mock tests", time: "3–4 weeks" },
  },

  // ── MOCK QUESTIONS ───────────────────────────────────────────
  // One unified pool. No system design (too advanced for freshers).
  // Amazon LP behavioral kept separate.

  mockQuestions: {
    common: {

      dsa: [
        {
          q: "Count the number of islands in a 2D grid of 1s (land) and 0s (water).",
          difficulty: "Medium",
          hint: "Use BFS or DFS. Each time you find an unvisited 1, start a flood-fill and mark all connected 1s as visited.",
          answer: "Loop through the grid. On each unvisited 1: increment count, then BFS in 4 directions marking cells visited. Return count.",
          followUp: "What changes if the grid is very large and can't fit in memory?",
        },
        {
          q: "Given a list of meeting time intervals, merge all overlapping meetings.",
          difficulty: "Easy-Medium",
          hint: "Sort by start time. Then walk through and merge if the current meeting starts before the last one ends.",
          answer: "Sort intervals by start. result = [first interval]. For each next: if start ≤ result.last.end → extend end. Else push new interval.",
          followUp: "How would you handle meetings arriving one by one as a stream?",
        },
        {
          q: "Find two numbers in a sorted array that add up to a target sum.",
          difficulty: "Easy",
          hint: "Use two pointers starting from both ends. Move them inward based on whether the sum is too high or too low.",
          answer: "left=0, right=n-1. While left < right: if arr[left]+arr[right]==target → return them. If sum < target → left++. If sum > target → right--.",
          followUp: "How would you solve this if the array was not sorted?",
        },
      ],

      behavioral: [
        {
          q: "Tell me about a project you are proud of. What did you build, what was hard, and what would you change?",
          dimension: "Technical depth + self-awareness",
          tip: "Pick one project. Be specific about the technical challenge. Show that you can reflect on your own work.",
        },
        {
          q: "Describe a time you had a conflict with a teammate. How did you handle it?",
          dimension: "Collaboration + maturity",
          tip: "Focus on what YOU did. Do not blame the other person. Show that you listened and stayed constructive.",
        },
        {
          q: "Tell me about a time you failed or made a mistake. What happened and what did you do next?",
          dimension: "Self-awareness + growth",
          tip: "Pick a real failure. The recovery matters far more than the mistake. Show what changed afterward.",
        },
        {
          q: "Give an example of a time you learned something new quickly because you had to.",
          dimension: "Learning ability",
          tip: "Show why you had to learn fast, how you did it, and what you produced. Avoid vague or generic answers.",
        },
        {
          q: "Why this company? What specifically makes you want to work here?",
          dimension: "Motivation + research",
          tip: "Name something specific. A product, a team, a project. Generic answers like 'great culture' do not work.",
        },
      ],

      technical: [
        {
          q: "What is the difference between a process and a thread?",
          topic: "Operating Systems",
          answer: "Process: independent program with its own memory. Thread: a unit inside a process that shares memory with other threads. Threads are faster to create but can cause race conditions.",
        },
        {
          q: "What are the four pillars of OOP? Give one real-world example for each.",
          topic: "OOP",
          answer: "Encapsulation (BankAccount hides balance). Inheritance (Dog extends Animal). Polymorphism (Shape.draw() works differently for Circle and Square). Abstraction (Car hides engine details behind a Drive method).",
        },
        {
          q: "What is normalization? Explain 1NF, 2NF, and 3NF briefly.",
          topic: "DBMS",
          answer: "1NF: atomic values, no repeating groups. 2NF: no partial dependency on a composite key. 3NF: no transitive dependency. Goal: reduce redundancy and prevent update anomalies.",
        },
        {
          q: "What is ACID in databases and why does it matter?",
          topic: "DBMS",
          answer: "Atomicity (all or nothing), Consistency (always valid state), Isolation (transactions don't interfere), Durability (committed data survives crashes). Critical for banking and payment systems.",
        },
        {
          q: "What happens when you type a URL in the browser and press Enter?",
          topic: "Computer Networks",
          answer: "DNS resolves domain to IP → TCP connection (3-way handshake) → browser sends HTTP GET → server returns HTML → browser parses and renders. HTTPS adds a TLS handshake before HTTP.",
        },
      ],

      aptitude: [
        {
          q: "A train 120m long crosses a 180m platform in 15 seconds. Find its speed in km/h.",
          category: "Speed-Distance-Time",
          answer: "Total distance = 300m. Speed = 300/15 = 20 m/s = 72 km/h.",
        },
        {
          q: "A and B can finish a job in 12 and 18 days respectively. How long will they take together?",
          category: "Work & Time",
          answer: "Combined rate = 1/12 + 1/18 = 5/36 per day. Days = 36/5 = 7.2 days.",
        },
        {
          q: "A sum triples itself in 8 years under simple interest. Find the rate of interest.",
          category: "Simple Interest",
          answer: "Interest earned = 2P. Rate = (2P × 100) / (P × 8) = 25% per year.",
        },
        {
          q: "The average of 5 numbers is 28. If one number is removed, the average drops to 24. Find the removed number.",
          category: "Averages",
          answer: "Original sum = 140. New sum = 96. Removed number = 140 − 96 = 44.",
        },
      ],

      gd: [
        {
          q: "AI will create more jobs than it destroys. Argue both sides.",
          dimension: "Balanced reasoning + listening",
        },
        {
          q: "Remote work is more productive than office work. Take a position and defend it.",
          dimension: "Structured argument + use of examples",
        },
        {
          q: "Social media does more harm than good to society. Debate this.",
          dimension: "Critical thinking + fairness",
        },
      ],
    },

    // Amazon LP questions — unique enough to keep separate
    Amazon: {
      behavioral: [
        {
          q: "Tell me about a time you delivered results under extreme time pressure. (Deliver Results)",
          dimension: "Deliver Results",
          tip: "Name what was at stake, what you cut or kept, and what the actual outcome was.",
        },
        {
          q: "Give an example of when you simplified something others accepted as unnecessarily complex. (Invent & Simplify)",
          dimension: "Invent & Simplify",
          tip: "Explain why the old approach was wasteful. Show the impact of your simplification.",
        },
      ],
    },
  },

  // ── ROADMAP ───────────────────────────────────────────────────
  // SDE-focused. 4 phases, 3 tasks each. No system design for freshers.

  roadmap: {
    weeks: 10,
    phases: [
      {
        phase: "Weeks 1–2 — Foundation",
        tasks: [
          "Pick one language: C++, Java, or Python. Revise syntax and basic collections.",
          "Understand Big-O. Solve 30 Easy LeetCode problems on arrays, strings, hashmaps.",
          "Set up GitHub. Commit your practice code. Get into the habit.",
        ],
      },
      {
        phase: "Weeks 3–6 — DSA Core",
        tasks: [
          "Linked Lists, Stacks, Queues. Then Trees (traversals, BST, LCA).",
          "Graphs: BFS, DFS, shortest path. Sliding Window and Two Pointer patterns.",
          "Basic Dynamic Programming: longest subsequence, 0/1 knapsack, coin change.",
        ],
      },
      {
        phase: "Weeks 7–8 — CS Fundamentals",
        tasks: [
          "OS: processes, threads, memory management, deadlocks.",
          "DBMS: normalization, indexing, SQL queries (JOINs, GROUP BY, subqueries).",
          "CN: how HTTP works, TCP vs UDP, what DNS does.",
        ],
      },
      {
        phase: "Weeks 9–10 — Interview Prep",
        tasks: [
          "Do 2 mock interviews on Pramp.com (free, peer-to-peer).",
          "Prepare 4 STAR stories covering: a failure, a conflict, something you built, something you learned fast.",
          "Apply broadly. Track every application. Follow up after 7 days.",
        ],
      },
    ],
  },
};
