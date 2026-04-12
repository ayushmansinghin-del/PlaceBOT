import { useState, useEffect, useRef, useCallback } from "react";
import {
  Send, Bot, User, Briefcase, FileText, Brain, TrendingUp,
  CheckCircle, AlertCircle, Heart, Sparkles, Building2,
  GraduationCap, Target, Code2, BookOpen, BarChart3,
  ChevronDown, ChevronUp, RotateCcw, Star, Shield, Zap,
  Clock, Award, TrendingDown, Smile, Frown, Meh
} from "lucide-react";

// ═══════════════════════════════════════════════════════════════
// MASTER KNOWLEDGE BASE
// ═══════════════════════════════════════════════════════════════
const KB = {
  roles: {
    "Software Engineer (SDE)": {
      coreSkills: ["Data Structures & Algorithms", "Object-Oriented Programming", "System Design", "Databases (SQL/NoSQL)", "Operating Systems", "Computer Networks"],
      languageSkills: ["C++", "Java", "Python"],
      toolSkills: ["Git", "Linux/Unix", "REST APIs"],
      niceToHave: ["Docker", "Kubernetes", "CI/CD", "Cloud (AWS/GCP/Azure)"],
    },
    "Data Scientist / ML Engineer": {
      coreSkills: ["Machine Learning", "Statistics & Probability", "Data Analysis", "Python", "Linear Algebra"],
      languageSkills: ["Python", "R", "SQL"],
      toolSkills: ["Pandas", "NumPy", "Scikit-learn", "TensorFlow or PyTorch", "Jupyter", "Git"],
      niceToHave: ["Spark", "Hadoop", "MLOps", "Deep Learning", "NLP", "Computer Vision"],
    },
    "Frontend Developer": {
      coreSkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Browser APIs"],
      languageSkills: ["JavaScript", "TypeScript"],
      toolSkills: ["React.js", "Git", "Webpack/Vite", "REST APIs", "Chrome DevTools"],
      niceToHave: ["Next.js", "GraphQL", "Testing (Jest/Cypress)", "Accessibility (a11y)", "Performance Optimization"],
    },
    "Backend Developer": {
      coreSkills: ["System Design", "Databases (SQL + NoSQL)", "REST API Design", "Authentication & Security", "OS Fundamentals"],
      languageSkills: ["Node.js", "Java", "Python", "Go"],
      toolSkills: ["Docker", "Git", "Redis", "Message Queues (Kafka/RabbitMQ)", "Linux"],
      niceToHave: ["Microservices", "Kubernetes", "CI/CD Pipelines", "GraphQL", "gRPC"],
    },
    "Full Stack Developer": {
      coreSkills: ["HTML/CSS/JavaScript", "React.js or Vue.js", "Node.js or Django", "SQL Databases", "REST API Design", "Authentication"],
      languageSkills: ["JavaScript", "TypeScript", "Python"],
      toolSkills: ["Git", "Docker", "MongoDB", "PostgreSQL", "Postman"],
      niceToHave: ["Next.js", "GraphQL", "Redis", "Cloud deployment", "CI/CD"],
    },
    "DevOps / Cloud Engineer": {
      coreSkills: ["Linux Administration", "Networking Fundamentals", "CI/CD Pipelines", "Infrastructure as Code", "Containerization"],
      languageSkills: ["Bash/Shell Scripting", "Python", "YAML/JSON"],
      toolSkills: ["Docker", "Kubernetes", "Jenkins/GitHub Actions", "Terraform", "AWS/GCP/Azure"],
      niceToHave: ["Ansible", "Prometheus/Grafana", "ELK Stack", "Security (DevSecOps)", "GitOps"],
    },
    "Business Analyst / Consultant": {
      coreSkills: ["Problem Structuring", "Data Analysis", "SQL", "Excel & PowerPoint", "Communication", "Stakeholder Management"],
      languageSkills: ["SQL", "Excel / Google Sheets"],
      toolSkills: ["Tableau or Power BI", "JIRA", "Confluence", "MS Office Suite"],
      niceToHave: ["Python for analysis", "Process Mapping (BPMN)", "Agile", "Consulting Frameworks (MECE, SWOT, Porter's 5)"],
    },
  },

  companies: {
    Google: {
      tier: "FAANG", ctc: "₹40–55 LPA (SDE-1, IDC Bangalore)",
      roles: ["Software Engineer L3", "SRE", "Data Scientist", "PM"],
      cgpa: "7.0+ preferred, no strict cutoff", backlogs: "Zero active backlogs",
      rounds: [
        { name: "Online Assessment", details: "2 DSA problems on Google's own platform, 90 min. Difficulty: 1 Medium + 1 Hard. No IDE autocomplete. Must write clean code from scratch." },
        { name: "Technical Phone Screen", details: "45 min with a Googler. 1–2 coding problems + CS fundamentals. Done via collaborative coding doc." },
        { name: "Virtual Onsite – Coding #1", details: "45 min. Arrays, Trees, Graphs, DP. Think-aloud is mandatory — they evaluate your reasoning, not just your answer." },
        { name: "Virtual Onsite – Coding #2", details: "45 min. Complex problem + follow-up variants. Interviewers probe your edge-case thinking." },
        { name: "Virtual Onsite – System Design", details: "45 min. Design a real system (URL shortener, YouTube, Maps). Required for L3+ roles." },
        { name: "Googliness (Behavioral)", details: "45 min. Leadership, team conflicts, failure stories. Values tested: Psychological safety, Bias for action, Intellectual humility." },
      ],
      requiredSkills: ["DSA (LeetCode Medium/Hard)", "System Design", "CS Fundamentals", "OOP", "Distributed Systems basics"],
      prep: {
        dsa: "Solve 250+ LeetCode. Focus: Dynamic Programming, Graph traversals (BFS/DFS), Trees, Sliding Window. Google heavily tests DP.",
        system: "Study: Consistent Hashing, Sharding, CAP theorem, Google Spanner, Bigtable. Read 'Designing Data-Intensive Applications' (DDIA).",
        behavioral: "Prepare STAR stories for: 'Biggest failure', 'Conflict in team', 'Impact you created'. Google values intellectual humility above all.",
        timeline: "8–12 weeks: 4 weeks DSA grind → 2 weeks System Design → 2 weeks mock interviews → 2 weeks review.",
      },
    },
    Microsoft: {
      tier: "FAANG", ctc: "₹35–45 LPA (SDE-1, IDC Hyderabad / Bangalore)",
      roles: ["SDE-1", "Data Scientist", "Program Manager", "Cloud Advocate"],
      cgpa: "7.5+ preferred", backlogs: "Zero active backlogs",
      rounds: [
        { name: "Online Coding Test", details: "3 problems on HackerRank, 90 min. 1 Easy + 1 Medium + 1 Hard." },
        { name: "Technical Round 1", details: "DSA problems (Trees, Graphs, Arrays) + OOP design questions. 60 min." },
        { name: "Technical Round 2", details: "DSA + Project deep-dive. 'How would you scale your college project?' is common." },
        { name: "Hiring Manager Round", details: "Growth mindset assessment, teamwork, leadership. Some technical problem-solving mixed in." },
      ],
      requiredSkills: ["DSA", "OOP Design", "OS & Networking basics", "DBMS", "Growth Mindset (behavioral)"],
      prep: {
        dsa: "Master Trees (all traversals), Graphs (Dijkstra, Union Find), Arrays, String manipulation. OOP design patterns: Singleton, Factory, Observer.",
        system: "For SDE-1: Light system design. Know REST vs GraphQL, SQL vs NoSQL trade-offs, caching strategies.",
        behavioral: "Microsoft's core value: Growth Mindset. Every answer should show learning from failure. Prepare for 'Tell me about a time you had to learn something quickly.'",
        timeline: "6–10 weeks: 3 weeks DSA → 2 weeks OOP + DBMS → 2 weeks projects prep → 1 week mock interviews.",
      },
    },
    Amazon: {
      tier: "FAANG", ctc: "₹28–44 LPA (SDE-1 base + RSU + joining bonus)",
      roles: ["SDE-1", "Data Engineer", "Business Analyst", "Cloud Support Engineer"],
      cgpa: "6.5+ (more lenient than Google/MS)", backlogs: "No active backlogs",
      rounds: [
        { name: "Online Assessment", details: "2 coding problems (60 min) + 14 Work Simulation behavioral questions. Both are timed and scored." },
        { name: "Technical Interview 1", details: "DSA (Arrays, DP, Graphs) + 2 Leadership Principle (LP) behavioral questions. 60 min." },
        { name: "Technical Interview 2", details: "Advanced DSA or System Design + 2 more LP questions." },
        { name: "Bar Raiser Round", details: "Conducted by a specially trained Bar Raiser (not from your team). LP behavioral deep-dives. Can veto the hire." },
      ],
      requiredSkills: ["DSA (DP, Sliding Window, Two Pointers)", "Amazon's 16 Leadership Principles", "System Design basics", "DBMS/SQL"],
      prep: {
        dsa: "Focus: Two Pointers, Sliding Window, Dynamic Programming, Heap, Backtracking. Amazon loves DP and arrays. Use LeetCode Amazon tag list.",
        system: "For freshers: Know S3, EC2, DynamoDB, SQS at a high level. Show AWS awareness during system design.",
        behavioral: "CRITICAL: Memorize all 16 Amazon Leadership Principles. Prepare 2 STAR stories for each. Most tested: Customer Obsession, Deliver Results, Invent & Simplify, Dive Deep, Earn Trust.",
        timeline: "6–8 weeks: 2 weeks DSA → 2 weeks LP stories → 2 weeks mixed practice → OA mock.",
      },
    },
    "Goldman Sachs": {
      tier: "Finance-Tech", ctc: "₹20–32 LPA (Technology Analyst, Bangalore/Hyderabad)",
      roles: ["Technology Analyst", "Quantitative Analyst", "Summer Analyst (Intern)", "Risk Technology"],
      cgpa: "7.0+ required", backlogs: "Zero backlogs",
      rounds: [
        { name: "HackerRank Online Test", details: "3 coding problems + 15 aptitude (numerical/logical) questions. 120 min total." },
        { name: "Technical Interview 1", details: "DSA (moderate difficulty) + OS, DBMS, Networking concepts. 60 min." },
        { name: "Technical Interview 2", details: "CS fundamentals depth + problem-solving approach. May include basic finance concepts." },
        { name: "HR / Fit Round", details: "Motivation for GS, teamwork stories, career goals, 'Why Finance + Technology?'" },
      ],
      requiredSkills: ["DSA", "DBMS (SQL, ACID, Transactions)", "OS (Processes, Threads, Memory)", "Networking (TCP/IP, HTTP, DNS)", "Aptitude (Quantitative)"],
      prep: {
        dsa: "GS tests at Medium difficulty. Master: Sorting algorithms, Trees, Graphs, String problems. Review time complexity analysis.",
        system: "Know relational databases deeply — query optimization, indexing, transactions, ACID properties. SQL is heavily tested.",
        behavioral: "GS values: Excellence, Partnership, Client Focus. Be ready to discuss 'Why Finance + Technology?' convincingly.",
        timeline: "6–8 weeks: 3 weeks DSA + CS fundamentals → 2 weeks SQL deep dive → 1 week aptitude + HR prep.",
      },
    },
    Salesforce: {
      tier: "SaaS", ctc: "₹22–38 LPA (MTS — Member of Technical Staff)",
      roles: ["MTS – Software Engineer", "Salesforce Developer", "Solution Engineer"],
      cgpa: "6.5+", backlogs: "No active backlogs preferred",
      rounds: [
        { name: "Online Assessment", details: "2 LeetCode Easy/Medium problems. 60 min. Focus on arrays, strings, hashmaps." },
        { name: "Technical Interview 1", details: "DSA + OOP design. May ask to design a simple class hierarchy." },
        { name: "Technical Interview 2", details: "System design basics + Salesforce platform/CRM awareness questions." },
        { name: "Behavioral Interview", details: "Salesforce values: Trust, Customer Success, Innovation, Equality. Prepare stories around each." },
      ],
      requiredSkills: ["DSA (Medium level)", "OOP", "Java or Python", "Basic System Design", "Cloud/SaaS understanding"],
      prep: {
        dsa: "LeetCode 100 Mediums is sufficient. Focus: Hashmaps, Trees, Sliding Window, BFS/DFS.",
        system: "Study SaaS architecture patterns, multi-tenancy, REST API design. Complete 2–3 free Salesforce Trailhead modules.",
        behavioral: "Salesforce has 'Ohana' culture (family). Emphasize collaboration, inclusivity, and customer impact.",
        timeline: "4–6 weeks: 3 weeks DSA → 1 week OOP + System Design → 1 week Trailhead + Behavioral prep.",
      },
    },
    "Morgan Stanley": {
      tier: "Finance-Tech", ctc: "₹18–28 LPA (Technology Analyst)",
      roles: ["Technology Analyst", "Quantitative Analyst", "Risk Technology", "Data Engineer"],
      cgpa: "7.5+ strongly preferred", backlogs: "Zero backlogs",
      rounds: [
        { name: "Online Assessment", details: "Coding (2 problems) + Verbal Reasoning + Numerical Reasoning. 90 min." },
        { name: "Technical Interview 1", details: "DSA + DBMS + Core CS (OS, Networking). 60 min." },
        { name: "Superday", details: "3 back-to-back interviews: Technical #2, Behavioral, and Fit/Culture. Most demanding round." },
      ],
      requiredSkills: ["DSA", "DBMS (advanced SQL)", "OS Concepts", "Networking", "Numerical Aptitude"],
      prep: {
        dsa: "Similar to Goldman Sachs level. Medium difficulty. Master sorting, searching, trees, and graphs.",
        system: "Focus on databases: complex SQL queries, stored procedures, query optimization.",
        behavioral: "MS values: Reliability, Attention to Detail, Long-term thinking. Avoid 'move fast and break things' language.",
        timeline: "6–8 weeks: 3 weeks DSA → 2 weeks SQL + CS fundamentals → 1 week numerical aptitude → Superday prep.",
      },
    },
    Deloitte: {
      tier: "Consulting", ctc: "₹7–12 LPA (Analyst / UST) + performance bonus",
      roles: ["Business Technology Analyst", "Technology Analyst", "Consultant", "Data Analyst"],
      cgpa: "6.0+", backlogs: "1 backlog may be acceptable",
      rounds: [
        { name: "Aptitude Test", details: "Quantitative + Verbal + Logical Reasoning. 60 questions, 60 min. IndiaBix level." },
        { name: "Group Discussion (GD)", details: "10–12 students, 15 min on a tech/business topic. Assessed on communication, leadership, listening." },
        { name: "Technical Interview", details: "Basic CS questions, project discussion. Not DSA-heavy at all." },
        { name: "HR Interview", details: "Motivation, teamwork, relocation willingness, salary expectations, career goals." },
      ],
      requiredSkills: ["Aptitude (Quant + Verbal)", "Communication & GD skills", "Basic CS fundamentals", "Project Knowledge", "SQL basics"],
      prep: {
        dsa: "Deloitte does NOT test heavy DSA. Focus on aptitude and puzzle-style reasoning instead.",
        system: "Know ERP basics, cloud computing concepts, and digital transformation at a high level.",
        behavioral: "GD topics: AI in Healthcare, Remote Work Future, Sustainability in Tech. Practice: Point → Reason → Example → Link back.",
        timeline: "3–4 weeks: 2 weeks aptitude practice → 1 week GD practice → 1 week project storytelling.",
      },
    },
    TCS: {
      tier: "Mass Recruiter", ctc: "₹3.36–7 LPA (Ninja / Digital / Prime tracks)",
      roles: ["Assistant System Engineer (Ninja)", "Digital Engineer", "Prime (Research/ML roles)"],
      cgpa: "6.0+ (60% throughout academics)", backlogs: "Zero backlogs throughout academics",
      rounds: [
        { name: "TCS NQT", details: "Cognitive (Numerical + Verbal + Reasoning) + Coding (2 problems, 30 min). Digital track has harder problems." },
        { name: "Technical Interview", details: "1 CS topic in depth (you choose: DBMS / OS / Networks / OOP). Basic coding question." },
        { name: "HR Interview", details: "Introduction, strengths/weaknesses, bond agreement (2-year bond for some tracks)." },
      ],
      requiredSkills: ["Aptitude (Quantitative + Verbal)", "Any 1 language (C/C++/Java/Python)", "DBMS or OS fundamentals", "Basic coding"],
      prep: {
        dsa: "For Ninja: Easy LeetCode / basic patterns. For Digital: Medium level. TCS Prime: Medium-Hard DSA + ML basics.",
        system: "Choose ONE CS subject and master it completely — DBMS or OS. That's what gets you through the tech interview.",
        behavioral: "TCS has a 2-year bond for some tracks. Keep HR answers crisp and positive. Practice self-introduction.",
        timeline: "2–3 weeks: 1 week NQT aptitude mock tests → 1 week deep CS subject → 3 days coding basics.",
      },
    },
    Infosys: {
      tier: "Mass Recruiter", ctc: "₹3.6–6.5 LPA (Systems Engineer / Specialist Programmer track)",
      roles: ["Systems Engineer", "Specialist Programmer (SP Track)", "Digital Specialist Engineer"],
      cgpa: "6.0+", backlogs: "Max 1–2 backlogs for SE track; zero for SP",
      rounds: [
        { name: "InfyTQ / Infosys Online Test", details: "Aptitude (10 Q) + Logical (15 Q) + Verbal (20 Q) + Pseudocode (5 Q). 95 min." },
        { name: "Technical Interview", details: "CS fundamentals, 1 basic coding problem, project discussion. 30–45 min." },
        { name: "HR Interview", details: "Behavioral, relocation agreement, salary discussion." },
      ],
      requiredSkills: ["Aptitude basics", "1 Programming Language (C/Java/Python)", "DBMS basics", "CS fundamentals", "Good communication"],
      prep: {
        dsa: "Focus on basic array, string, pattern problems. Infosys does NOT test advanced DSA.",
        system: "Know basic DBMS (SELECT queries, JOINs), OOP concepts, and your college projects well.",
        behavioral: "Practice introducing yourself clearly. Willingness to relocate is a common filter question.",
        timeline: "2–3 weeks: 1 week aptitude + pseudocode practice → 1 week core CS concepts → GFG Infosys prep set.",
      },
    },
    Wipro: {
      tier: "Mass Recruiter", ctc: "₹3.5–6.5 LPA (Project Engineer / Turbo tracks)",
      roles: ["Project Engineer", "Turbo (elite track)", "Data Engineer"],
      cgpa: "6.0+", backlogs: "Max 1 active backlog",
      rounds: [
        { name: "NLTH Test", details: "Aptitude + Essay Writing + Coding (2 problems). 3 hours total." },
        { name: "Technical Interview", details: "CS basics + project discussion. May ask to write code on paper." },
        { name: "HR Interview", details: "Behavioral + willingness to relocate + bond confirmation." },
      ],
      requiredSkills: ["Aptitude basics", "Written communication (essay)", "Basic coding", "CS fundamentals", "Project explanation"],
      prep: {
        dsa: "Easy coding problems only. Wipro does not test advanced DSA.",
        system: "Know your college projects extremely well. Be able to explain architecture, challenges, and what you'd improve.",
        behavioral: "Essay writing is unique to Wipro. Practice 200-word essays on 'Impact of AI on Jobs' in under 15 minutes.",
        timeline: "2 weeks: 1 week aptitude + essay practice → 1 week CS basics + project storytelling.",
      },
    },
  },

  skillResources: {
    "Data Structures & Algorithms": { free: "NeetCode.io, LeetCode free tier, Striver's A-Z DSA Sheet (GFG)", paid: "AlgoExpert (₹3k)", time: "6–10 weeks" },
    "System Design": { free: "Gaurav Sen YouTube, System Design Primer (GitHub free)", paid: "Alex Xu's book (₹500), ByteByteGo", time: "4–6 weeks" },
    "Object-Oriented Programming": { free: "GeeksForGeeks OOP series, NPTEL Java course", paid: "Udemy OOP + Design Patterns course", time: "2–3 weeks" },
    "Databases (SQL/NoSQL)": { free: "SQLZoo, Mode Analytics SQL Tutorial, MongoDB University (free)", paid: "Udemy SQL Bootcamp by Jose Portilla", time: "2–4 weeks" },
    "Operating Systems": { free: "GATE Smashers OS playlist (YouTube), OSTEP free book", paid: "Arjun Suresh OS notes", time: "3–4 weeks" },
    "Computer Networks": { free: "Gate Smashers CN playlist, Kurose & Ross textbook PDF", paid: "Ravindrababu Ravula GATE playlist", time: "2–3 weeks" },
    "Machine Learning": { free: "Andrew Ng's ML Course (Coursera audit), Kaggle Learn (free)", paid: "Coursera ML Specialization (₹2k/mo)", time: "8–12 weeks" },
    "Python": { free: "Python.org tutorial, CS50P Harvard free, Automate the Boring Stuff (free book)", paid: "Udemy 100 Days of Python by Angela Yu", time: "3–4 weeks" },
    "React.js": { free: "react.dev official docs, The Odin Project (free)", paid: "Scrimba React course, Udemy React by Maximilian", time: "3–5 weeks" },
    "Docker": { free: "Docker's official 'Get Started' guide, TechWorld with Nana YouTube", paid: "Udemy Docker & Kubernetes by Bret Fisher", time: "1–2 weeks" },
    "Git": { free: "Pro Git book (free online), GitHub Learning Lab", paid: "Not needed – free resources are sufficient", time: "3–5 days" },
    "Cloud (AWS/GCP/Azure)": { free: "AWS Free Tier + official docs, Google Cloud Skills Boost (some free)", paid: "A Cloud Guru, Linux Foundation courses", time: "4–6 weeks per platform" },
    "Communication": { free: "Toastmasters club (free/low-cost), Coursera Communication courses", paid: "Coursera Communication specialization", time: "Ongoing" },
    "Aptitude (Quant + Verbal)": { free: "IndiaBix.com, PrepInsta free mock tests", paid: "RS Aggarwal book (₹300)", time: "3–4 weeks" },
    "HTML/CSS": { free: "The Odin Project, freeCodeCamp, MDN Web Docs", paid: "Udemy Web Developer Bootcamp", time: "2–3 weeks" },
    "JavaScript": { free: "javascript.info (best free resource), Eloquent JavaScript (free book)", paid: "Udemy JavaScript by Jonas Schmedtmann", time: "4–6 weeks" },
    "SQL": { free: "SQLZoo, W3Schools SQL, LeetCode Database problems", paid: "Udemy SQL Bootcamp", time: "2–3 weeks" },
  },

  mockQuestions: {
    Google: {
      dsa: [
        { q: "Given an array of integers, find the length of the longest subarray with sum equal to K.", difficulty: "Medium", hint: "Use prefix sum with a HashMap. Store first occurrence of each prefix sum. Time: O(n).", answer: "Create a map of {prefixSum: firstIndex}. Iterate, add to running sum. If (sum-K) exists in map, update maxLen = max(maxLen, i - map[sum-K]).", followUp: "What if all values are positive? Can you solve it with two pointers instead?" },
        { q: "Serialize and deserialize a Binary Tree. Your algorithm should handle any binary tree, including irregular shapes.", difficulty: "Hard", hint: "Use level-order BFS with null markers. Choose a delimiter (e.g. ',') to separate values.", answer: "Serialize: BFS, push 'null' for missing children. Deserialize: split string, use a queue to rebuild level by level.", followUp: "How would you handle very large trees that don't fit in memory?" },
        { q: "Find the K-th largest element in an unsorted array without fully sorting it.", difficulty: "Medium", hint: "QuickSelect algorithm — partition like QuickSort but only recurse on the relevant side. Average O(n).", answer: "QuickSelect: randomly pick a pivot, partition array. If pivot index == k-1 from right, return it. Else recurse on left or right half only.", followUp: "What is the worst-case of QuickSelect? How would you guarantee O(n log n) worst-case?" },
        { q: "Implement a trie that supports insert, search, and startsWith. Then extend it to return all words with a given prefix.", difficulty: "Medium", hint: "TrieNode has children[26] and isEnd. DFS from the prefix node to collect all complete words.", answer: "Build TrieNode with Map<char, TrieNode>. startsWith: traverse nodes. getAllWords: DFS collecting isEnd nodes.", followUp: "How would you rank results by frequency of search? Add a frequency counter per node." },
        { q: "Given a 2D grid of '1's (land) and '0's (water), count the number of islands.", difficulty: "Medium", hint: "BFS or DFS flood-fill. When you hit a '1', BFS outward marking all connected '1's as visited.", answer: "Iterate grid. On unvisited '1', increment count and BFS in 4 directions, marking visited. Return count.", followUp: "What if the grid is distributed across multiple machines?" },
        { q: "Implement LRU Cache with O(1) get and O(1) put. Capacity is fixed.", difficulty: "Hard", hint: "HashMap + Doubly Linked List. HashMap for O(1) lookup. DLL for O(1) order updates.", answer: "HashMap maps key→node. DLL: head is MRU, tail is LRU. On get: move to head. On put: add at head, if over capacity remove tail.", followUp: "How would you make this distributed and thread-safe?" },
      ],
      behavioral: [
        { q: "Tell me about a time you had to push back on a decision you disagreed with. How did you handle it?", dimension: "Courage + Communication" },
        { q: "Describe your biggest technical failure. What happened, what did you learn, and what did you change afterward?", dimension: "Self-awareness + Growth Mindset" },
        { q: "Tell me about a time you simplified a very complex problem for a non-technical audience.", dimension: "Communication + Clarity" },
        { q: "Describe a time you identified a problem that no one else had noticed. What did you do?", dimension: "Proactiveness + Initiative" },
        { q: "Tell me about a project you're genuinely proud of. Why? What would you do differently?", dimension: "Ownership + Reflection" },
      ],
      system: [
        { q: "Design a URL shortening service like bit.ly. Handle 100M URLs and 10B reads per month.", difficulty: "Classic", hint: "Start with: API design → DB schema → hashing strategy (Base62) → read optimization with caching (Redis).", answer: "Write path: generate 6-char Base62 hash of long URL, store in DB. Read path: look up Redis cache first (LRU), then DB. CDN for global distribution. Rate limit writes." },
        { q: "Design Google's type-ahead autocomplete search bar.", difficulty: "Hard", hint: "Consider: Trie data structure + Top-K frequencies per node + Distributed Trie for massive scale.", answer: "Trie stores prefixes. Each node keeps top-K words by frequency. On query, traverse to prefix node and return top-K. Update frequency asynchronously via Kafka consumer." },
        { q: "Design a system like Google Drive. Focus on file uploads, sharing, and consistency.", difficulty: "Hard", hint: "Chunk files into 4MB blocks. Deduplicate identical chunks. Use metadata service + blob storage.", answer: "Client chunks file → uploads to block server → metadata DB stores chunk hashes + file tree. Sharing: ACL table. Sync: websocket push of diff events to other clients." },
      ],
    },
    Amazon: {
      dsa: [
        { q: "Design a data structure supporting push(), pop(), and getMin() all in O(1) time.", difficulty: "Medium", hint: "Two stacks: one main, one tracking running min. Or encode the delta from current min into stored values.", answer: "Stack2 tracks minimums. On push: push to stack1, push min(val, stack2.top()) to stack2. On pop: pop both. getMin = stack2.top().", followUp: "Can you do it with O(1) extra space (not O(n))? Store encoded value = val - prevMin." },
        { q: "Given a stream of integers, implement a MedianFinder class with addNum() and findMedian().", difficulty: "Hard", hint: "Two heaps: max-heap for lower half, min-heap for upper half. After each insert, rebalance so sizes differ by at most 1.", answer: "maxHeap (lower), minHeap (upper). addNum: always add to maxHeap first, then rebalance. findMedian: if sizes equal → average tops, else → top of larger heap.", followUp: "What if the stream is infinite and you can't store all elements?" },
        { q: "Given a matrix of 1s and 0s, find the number of distinct islands.", difficulty: "Medium", hint: "BFS/DFS. Each unvisited '1' starts a new island. Mark visited by setting to '0'.", answer: "Double loop. On unvisited '1', increment counter, start DFS in 4 directions marking cells '0'. Return counter.", followUp: "How would you do this for a 1 billion × 1 billion matrix?" },
        { q: "Trapping Rain Water: given heights of bars, find how much water is trapped after rain.", difficulty: "Hard", hint: "Two pointer approach: track leftMax and rightMax. Water at position i = min(leftMax, rightMax) - height[i].", answer: "left=0, right=n-1, leftMax=rightMax=0. While l<r: if height[l]<height[r], update leftMax or add water, move l++. Else update rightMax or add water, move r--.", followUp: "How would you solve it for a 2D elevation map?" },
        { q: "Find the longest increasing subsequence (LIS) in an array.", difficulty: "Medium", hint: "DP solution: O(n²). Optimized with binary search + patience sorting: O(n log n).", answer: "tails[] array. For each num: binary search in tails for first value ≥ num. Replace it or extend tails. Length of tails = LIS length.", followUp: "How would you reconstruct the actual subsequence, not just its length?" },
        { q: "Given a list of meeting intervals, merge all overlapping intervals.", difficulty: "Easy-Medium", hint: "Sort by start time. Merge greedily: if current start ≤ last merged end, extend end. Else start new interval.", answer: "Sort intervals by start. result=[intervals[0]]. For each next: if overlap → extend result.last.end. Else append. Return result.", followUp: "What if meetings arrive in a stream, not all at once?" },
      ],
      behavioral: [
        { q: "Tell me about a time you delivered results under extreme time pressure. What trade-offs did you make? (LP: Deliver Results)", dimension: "Deliver Results" },
        { q: "Describe a time you invented a new approach or simplified a process others had accepted as 'just the way it is'. (LP: Invent & Simplify)", dimension: "Invent & Simplify" },
        { q: "Tell me about a situation where you disagreed with your manager. What did you do? (LP: Have Backbone; Disagree and Commit)", dimension: "Have Backbone" },
        { q: "Give me an example of a time you took initiative on a project without being asked. (LP: Bias for Action)", dimension: "Bias for Action" },
        { q: "Describe a situation where you had to earn the trust of a skeptical stakeholder. (LP: Earn Trust)", dimension: "Earn Trust" },
        { q: "Tell me about a time you dove deep into data to solve a problem. What did you find? (LP: Dive Deep)", dimension: "Dive Deep" },
      ],
      system: [
        { q: "Design Amazon's product recommendation engine. Millions of users, billions of products, real-time personalization.", difficulty: "Hard", hint: "Collaborative filtering + content-based hybrid. Offline batch training vs. real-time serving layer. Feature store for user embeddings.", answer: "Offline: matrix factorization on user-item interactions → embeddings stored in feature store. Online: nearest-neighbor lookup on embeddings (Faiss). A/B test ranking models. Cache top-N recs per user in Redis." },
        { q: "Design Amazon's order management system. Handle millions of orders with status tracking.", difficulty: "Medium", hint: "Event-driven: order events flow through queues. Each status change is an event. Optimistic locking for concurrency.", answer: "Orders table (id, status, timestamps). Status changes publish to Kafka. Consumers update inventory, notify user, update analytics. Outbox pattern for guaranteed delivery." },
      ],
    },
    Microsoft: {
      dsa: [
        { q: "Given a BST, find the K-th smallest element.", difficulty: "Easy-Medium", hint: "In-order traversal of a BST gives sorted order. Use a counter.", answer: "In-order DFS with counter. When counter reaches K, record the node value. Return it. For follow-up: augment BST with subtree size at each node for O(log n).", followUp: "What if K is very large and you need O(log n) time? Augment the BST." },
        { q: "Implement an LRU Cache with O(1) get() and O(1) put() operations.", difficulty: "Medium", hint: "HashMap for O(1) lookup + Doubly Linked List for O(1) ordering. Head = MRU, Tail = LRU.", answer: "HashMap: key→DLL node. DLL: add to head on access, remove tail when capacity exceeded. get: O(1) map lookup + O(1) move to head.", followUp: "How would you make this cache distributed and thread-safe?" },
        { q: "Find all unique paths from top-left to bottom-right of an M×N grid. Some cells are obstacles.", difficulty: "Medium", hint: "DP. dp[i][j] = dp[i-1][j] + dp[i][j-1]. Set obstacle cells to 0.", answer: "Initialize dp[0][0]=1 if not obstacle. Fill row 0 and col 0. For rest: dp[i][j] = (obstacle? 0 : dp[i-1][j]+dp[i][j-1]). Return dp[m-1][n-1].", followUp: "What if the grid is huge (1 billion × 1 billion)?" },
        { q: "Check if a string is a valid palindrome, ignoring non-alphanumeric characters.", difficulty: "Easy", hint: "Two pointers from both ends, skip non-alphanumeric.", answer: "left=0, right=n-1. Skip non-alnum on both sides. Compare lowercased chars. If mismatch → false. Return true.", followUp: "What is the minimum number of deletions to make a string a palindrome?" },
        { q: "Given a binary tree, find its maximum depth.", difficulty: "Easy", hint: "DFS: depth = 1 + max(depth(left), depth(right)). BFS: count levels.", answer: "Recursive: if node is null return 0. Return 1 + max(maxDepth(left), maxDepth(right)). Iterative BFS: use queue, count levels.", followUp: "How would you find the minimum depth instead?" },
      ],
      behavioral: [
        { q: "Tell me about a time you learned something completely new in a short period of time. (Growth Mindset)", dimension: "Growth Mindset" },
        { q: "Describe a time you mentored or helped a struggling teammate. What did you do?", dimension: "Empathy + Leadership" },
        { q: "Tell me about a time you improved a process or system you inherited.", dimension: "Ownership + Continuous Improvement" },
        { q: "Describe a time you had to make a decision with incomplete information.", dimension: "Judgement + Risk" },
      ],
      system: [
        { q: "Design Microsoft Teams' real-time messaging system. Focus on message delivery guarantees, presence detection, and notifications at scale.", difficulty: "Hard", hint: "WebSockets for real-time, message queues (Kafka) for delivery guarantees, fanout for group messaging, Redis for presence.", answer: "WebSocket connections via load-balanced servers. Message queued in Kafka on send. Consumer delivers + stores in Cosmos DB. Presence: Redis pub/sub with TTL heartbeats. Offline: push via APNS/FCM." },
      ],
    },
    "Goldman Sachs": {
      dsa: [
        { q: "Write a SQL query to find the second highest salary from an Employee table. Handle the case where it doesn't exist.", difficulty: "Easy", hint: "Use LIMIT with OFFSET, or DENSE_RANK() window function, or a subquery with NOT IN MAX.", answer: "SELECT MAX(salary) FROM Employee WHERE salary < (SELECT MAX(salary) FROM Employee). Or: SELECT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) rnk FROM Employee) t WHERE rnk=2.", followUp: "Now write a generic query to find the Nth highest salary." },
        { q: "Given N stock prices for consecutive days, find the maximum profit from at most 2 non-overlapping transactions.", difficulty: "Hard", hint: "DP with states: transactions completed (0,1,2), currently holding or not. Alternatively: prefix max-profit + suffix max-profit arrays.", answer: "left[i] = max profit from 0..i using 1 transaction. right[i] = max profit from i..n-1. Answer = max over all i of left[i] + right[i].", followUp: "Generalize: find maximum profit from at most K transactions." },
        { q: "Implement a thread-safe Singleton class in Java.", difficulty: "Medium", hint: "Use double-checked locking with volatile keyword. Or use static inner class (Bill Pugh pattern).", answer: "volatile static instance. synchronized block only when instance==null (double-check). Or: private static class Holder { static final X = new X(); } — JVM guarantees thread-safe class loading.", followUp: "Why do you need volatile? Explain memory reordering." },
        { q: "Given a sorted array, find the first and last position of a target element. Time: O(log n).", difficulty: "Medium", hint: "Two binary searches: one for leftmost occurrence, one for rightmost.", answer: "Binary search for leftmost: when mid==target, record and continue searching left. For rightmost: when mid==target, record and search right.", followUp: "What if the array has duplicates but you only want unique elements' positions?" },
      ],
      behavioral: [
        { q: "Why do you want to work at the intersection of Finance and Technology? Be specific about GS.", dimension: "Motivation + Industry Awareness" },
        { q: "Tell me about a time you caught a critical error before it went to production. How did you find it?", dimension: "Attention to Detail + Quality" },
        { q: "Describe a time you had to meet an extremely tight deadline without compromising accuracy.", dimension: "Precision under Pressure" },
      ],
      system: [
        { q: "Design a real-time stock price alert system for millions of traders. Each trader can set price thresholds. Latency: under 10ms.", difficulty: "Hard", hint: "Event-driven: market data feed → Kafka topic → consumer groups per price range → WebSocket push to clients.", answer: "Market feed → Kafka partitioned by ticker. Consumers check Redis sorted-set of thresholds per ticker. On threshold breach, push via WebSocket. Redis pub/sub for cross-server delivery." },
      ],
    },
    Deloitte: {
      aptitude: [
        { q: "A train 120m long crosses a platform 180m long in 15 seconds. Find the speed in km/h.", difficulty: "Medium", answer: "Distance = 120+180 = 300m. Speed = 300/15 = 20 m/s = 20×(18/5) = 72 km/h", category: "Speed-Distance-Time" },
        { q: "In how many ways can a committee of 4 be formed from a group of 6 people?", difficulty: "Easy", answer: "C(6,4) = 6!/(4!×2!) = (6×5)/(2×1) = 15 ways", category: "Permutations & Combinations" },
        { q: "A can finish a work in 12 days, B in 18 days. Together, how many days to finish?", difficulty: "Easy", answer: "A+B per day = 1/12 + 1/18 = 3/36 + 2/36 = 5/36. Days = 36/5 = 7.2 days", category: "Work & Time" },
        { q: "If the ratio of A:B is 3:4 and B:C is 2:3, find A:B:C.", difficulty: "Medium", answer: "A:B = 3:4, B:C = 2:3 → scale B: A:B = 6:8, B:C = 8:12. A:B:C = 6:8:12 = 3:4:6", category: "Ratio & Proportion" },
        { q: "A sum of money triples itself in 8 years at simple interest. Find the rate of interest.", difficulty: "Medium", answer: "SI = 3P - P = 2P. Rate = (SI × 100) / (P × T) = (2P × 100) / (P × 8) = 25% per annum", category: "Simple Interest" },
      ],
      gd: [
        { q: "'Artificial Intelligence will create more jobs than it destroys.' Discuss and argue both sides.", dimension: "Balanced reasoning + communication + listening" },
        { q: "'Remote work is more productive than office work.' Take a position and defend it.", dimension: "Structured argument + confidence + data use" },
        { q: "'Social media does more harm than good to society.' Debate this.", dimension: "Critical thinking + balanced view" },
        { q: "'Engineering students should be mandatorily taught entrepreneurship.' Agree or disagree?", dimension: "Structured opinion + real examples" },
      ],
      behavioral: [
        { q: "Tell me about a team project where there was conflict. How did you resolve it?", dimension: "Teamwork + Conflict Resolution" },
        { q: "Where do you see yourself in 5 years, and how does Deloitte fit into that plan?", dimension: "Goal clarity + motivation fit" },
      ],
      technical: [
        { q: "What is cloud computing and explain IaaS, PaaS, and SaaS with examples.", topic: "Cloud / Technology Awareness" },
        { q: "What is the difference between SQL and NoSQL? Give use cases for each.", topic: "Databases" },
      ],
    },
    TCS: {
      aptitude: [
        { q: "A boat travels 24 km upstream in 6 hours and 20 km downstream in 4 hours. Speed of stream?", difficulty: "Medium", answer: "Upstream = 24/6 = 4 km/h. Downstream = 20/4 = 5 km/h. Stream = (5−4)/2 = 0.5 km/h", category: "Boats & Streams" },
        { q: "If 20% of a number is 80, what is 35% of that number?", difficulty: "Easy", answer: "100% = 80/0.2 = 400. 35% of 400 = 140", category: "Percentages" },
        { q: "A sells a product to B at 20% profit. B sells it to C at 10% loss. C pays ₹1080. What did A pay?", difficulty: "Hard", answer: "C pays 1080 = B's cost × 0.9. B's cost = 1200. B's cost = A's SP = A's cost × 1.2. A's cost = 1000.", category: "Profit & Loss" },
      ],
      technical: [
        { q: "Explain the difference between a process and a thread. When would you prefer one over the other?", topic: "Operating Systems" },
        { q: "What is normalization in databases? Explain 1NF, 2NF, and 3NF with a concrete example.", topic: "DBMS" },
        { q: "Write a function to reverse a linked list in-place. What is the time and space complexity?", topic: "DSA", difficulty: "Easy" },
        { q: "What are the four pillars of OOP? Give a real-world example for each.", topic: "OOP" },
        { q: "What is ACID in databases? Why is it important for banking systems?", topic: "DBMS" },
      ],
    },
    Infosys: {
      aptitude: [
        { q: "A does work in 15 days, B in 20 days. Together for 6 days, then B leaves. Days for A to finish rest?", difficulty: "Medium", answer: "Together = 1/15+1/20 = 7/60 per day. In 6 days: 7/10 done. Remaining 3/10. A alone: (3/10)/(1/15) = 4.5 days", category: "Work & Time" },
        { q: "Average of 5 numbers is 28. If one number is excluded, average becomes 24. Excluded number?", difficulty: "Easy", answer: "Sum = 5×28 = 140. New sum = 4×24 = 96. Excluded = 140−96 = 44", category: "Averages" },
      ],
      technical: [
        { q: "What is polymorphism? Explain compile-time vs runtime polymorphism with real-world examples.", topic: "OOP" },
        { q: "What is the difference between SQL and NoSQL databases? Give use cases for each.", topic: "DBMS" },
        { q: "Explain the concept of virtual memory.", topic: "Operating Systems" },
      ],
    },
  },

  roadmaps: {
    "Software Engineer (SDE)": {
      weeks: 12,
      phases: [
        { phase: "Foundation (Weeks 1–2)", tasks: ["Master Big-O notation analysis (time + space)", "Arrays, Strings, HashMaps — solve 50 Easy LeetCode", "Pick ONE language: C++/Java/Python, revise syntax & standard library"] },
        { phase: "Core DSA (Weeks 3–6)", tasks: ["Linked Lists, Stacks, Queues, Monotonic Stack", "Trees (BST, BT, all traversals, LCA, diameter)", "Graphs (BFS, DFS, Dijkstra, Union Find, Topological Sort)", "Dynamic Programming (knapsack, LCS, longest subsequences, interval DP)", "Target: 150 LeetCode total (100 Medium, 50 Hard)"] },
        { phase: "CS Fundamentals (Weeks 7–8)", tasks: ["OS: Processes, Threads, Mutex, Memory Management, Virtual Memory, Deadlocks", "DBMS: Normalization (1NF–3NF–BCNF), Indexing, Transactions, ACID, SQL queries", "CN: TCP/IP model, HTTP/HTTPS, DNS, Load Balancers, CDNs"] },
        { phase: "System Design (Weeks 9–10)", tasks: ["Read System Design Primer on GitHub (free)", "Design 10 classic systems: URL Shortener, Twitter Feed, Netflix, Uber, WhatsApp, Google Drive", "Study: CAP theorem, Consistent Hashing, Sharding, Caching (Redis, Memcached)"] },
        { phase: "Mock Interviews & Polish (Weeks 11–12)", tasks: ["2 mock interviews per week on Pramp.com (free)", "Finalize 5–7 STAR behavioral stories for different companies", "Apply to companies, track applications on a spreadsheet or Notion", "Negotiate — know your market value"] },
      ],
    },
    "Data Scientist / ML Engineer": {
      weeks: 14,
      phases: [
        { phase: "Math & Stats Foundation (Weeks 1–2)", tasks: ["Linear Algebra: matrices, eigenvalues, SVD, PCA", "Statistics: distributions, hypothesis testing, p-values, confidence intervals, Bayes' theorem", "Python essentials: NumPy, Pandas, Matplotlib, Seaborn"] },
        { phase: "Core ML (Weeks 3–6)", tasks: ["Supervised: Linear/Logistic Regression, Decision Trees, Random Forest, Gradient Boosting, SVM, KNN", "Unsupervised: K-Means, DBSCAN, PCA, Autoencoders", "Model evaluation: Cross-validation, AUC-ROC, Precision-Recall, F1, confusion matrix", "Complete Andrew Ng's ML Specialization on Coursera (audit free)"] },
        { phase: "Deep Learning (Weeks 7–9)", tasks: ["Neural Networks: forward/backprop, activation functions, optimizers (Adam, SGD, RMSProp)", "CNNs for computer vision, RNNs/LSTMs/Transformers for NLP", "Master either PyTorch or TensorFlow — complete 2 Kaggle competitions"] },
        { phase: "MLOps & SQL (Weeks 10–11)", tasks: ["SQL: Window functions, CTEs, complex JOINs — LeetCode DB problems", "Model deployment: Flask/FastAPI + Docker", "Feature engineering, A/B testing design, defining metrics"] },
        { phase: "Interview Prep (Weeks 12–14)", tasks: ["ML system design: recommendation engine, fraud detection, search ranking", "150+ statistics and probability interview questions", "Portfolio: 2–3 end-to-end ML projects on GitHub with clear README"] },
      ],
    },
    "Frontend Developer": {
      weeks: 10,
      phases: [
        { phase: "Core Web (Weeks 1–2)", tasks: ["HTML5 semantics, accessibility (a11y), SEO basics", "CSS3: Flexbox, Grid, animations, custom properties, responsive design", "JavaScript ES6+: closures, promises, async/await, event loop, prototypes"] },
        { phase: "React & TypeScript (Weeks 3–5)", tasks: ["React: JSX, hooks (useState, useEffect, useContext, useMemo, useCallback)", "TypeScript: types, interfaces, generics, type narrowing", "State management: Context API, then Zustand or Redux Toolkit", "Build 3 real projects: portfolio, weather app, e-commerce UI"] },
        { phase: "Advanced Topics (Weeks 6–7)", tasks: ["Next.js: SSR vs SSG vs ISR, file-based routing, API routes", "Performance: Core Web Vitals, lazy loading, code splitting, bundle analysis", "Testing: Jest for unit tests, React Testing Library, Cypress for e2e"] },
        { phase: "Interview Prep (Weeks 8–10)", tasks: ["JavaScript 50 tricky questions (closures, 'this', event delegation, promises)", "Frontend system design: design an autocomplete, infinite scroll, real-time chat", "Build impressive GitHub portfolio — quality over quantity"] },
      ],
    },
  },
};

// Resume keyword maps by role
const RESUME_KEYWORDS = {
  "Software Engineer (SDE)": {
    critical: ["data structures", "algorithms", "object-oriented", "system design", "sql", "git", "api", "java", "python", "c++", "complexity", "arrays", "trees", "graphs", "linked list", "dynamic programming"],
    good: ["docker", "kubernetes", "microservices", "aws", "distributed", "ci/cd", "redis", "kafka", "rest", "agile"],
    soft: ["teamwork", "communication", "problem-solving", "leadership", "collaboration"],
  },
  "Data Scientist / ML Engineer": {
    critical: ["machine learning", "python", "pandas", "numpy", "statistics", "sql", "data analysis", "scikit-learn", "model", "tensorflow", "pytorch", "regression", "classification", "neural"],
    good: ["spark", "hadoop", "deep learning", "nlp", "computer vision", "a/b testing", "feature engineering", "kaggle", "mlops"],
    soft: ["analytical", "research", "communication", "collaboration", "curiosity"],
  },
  "Frontend Developer": {
    critical: ["html", "css", "javascript", "react", "responsive", "git", "typescript", "dom", "es6", "component"],
    good: ["next.js", "webpack", "testing", "accessibility", "performance", "graphql", "figma", "ux", "jest"],
    soft: ["attention to detail", "design sense", "communication", "user empathy"],
  },
  "Full Stack Developer": {
    critical: ["react", "node", "sql", "api", "javascript", "html", "css", "git", "database", "authentication", "backend", "frontend"],
    good: ["typescript", "next.js", "docker", "mongodb", "redis", "aws", "graphql", "postgresql"],
    soft: ["versatility", "ownership", "end-to-end thinking", "problem solving"],
  },
  "Business Analyst / Consultant": {
    critical: ["sql", "excel", "powerpoint", "stakeholder", "requirements", "analysis", "communication", "data", "reporting", "process", "documentation"],
    good: ["tableau", "power bi", "jira", "agile", "python", "statistics", "consulting", "crm"],
    soft: ["communication", "problem-solving", "business acumen", "presentation", "listening"],
  },
};

// ═══════════════════════════════════════════════════════════════
// STRESS SUPPORT DATA
// ═══════════════════════════════════════════════════════════════
const STRESS_DATA = {
  moods: [
    { id: "overwhelmed", label: "Overwhelmed", emoji: "😰", desc: "Too much, can't focus" },
    { id: "anxious", label: "Pre-Interview", emoji: "😟", desc: "Upcoming interview nerves" },
    { id: "burnout", label: "Burned Out", emoji: "😮‍💨", desc: "Can't study anymore" },
    { id: "rejected", label: "After Rejection", emoji: "💔", desc: "Didn't get the offer" },
    { id: "compare", label: "Comparing Myself", emoji: "😔", desc: "Everyone seems ahead" },
    { id: "ok", label: "Generally Anxious", emoji: "🌀", desc: "Low-level constant worry" },
  ],

  responses: {
    overwhelmed: {
      title: "When everything feels like too much",
      insight: "Overwhelm is not weakness — it's what happens when your brain is holding too many open loops at once. The solution isn't to 'try harder.' It's to close loops.",
      steps: [
        { icon: "✍️", text: "Write every single stressor down. Get it out of your head onto paper — mind dumps reduce cognitive load by 30–40%." },
        { icon: "🎯", text: "Circle the ONE thing that, if solved today, would reduce pressure on everything else." },
        { icon: "⏱️", text: "Do only that one thing. Give yourself a hard 25-minute focused block (Pomodoro). Nothing else counts today." },
        { icon: "🚪", text: "Close your laptop at 9pm tonight. Recovery is not laziness — it is preparation." },
      ],
      quote: "You don't need to do everything. You need to do the next right thing.",
      professional: "If this feeling persists for weeks and affects your sleep, appetite, or daily function, that's your body asking for support. Talking to a counsellor is a sign of intelligence, not weakness.",
    },
    anxious: {
      title: "Before a big interview",
      insight: "Pre-interview anxiety is physiologically identical to excitement — same heart rate, same adrenaline. Harvard research (Alison Wood Brooks, 2014) showed that saying 'I am excited' before a performance task improved results by 22% compared to trying to calm down.",
      steps: [
        { icon: "🗣️", text: "Say out loud right now: 'I am excited for this.' Not 'I am calm.' Your brain will start to shift within 60 seconds." },
        { icon: "📵", text: "Stop reviewing new material after 10pm the night before. Sleep gives 10× more than last-minute cramming." },
        { icon: "🧘", text: "Morning of: 20-minute walk, drink water, eat something. No screen first thing." },
        { icon: "⏳", text: "In the interview: If you're stuck, say 'Let me think through this.' Pause. Breathe. They're evaluating your thinking, not just the answer." },
      ],
      quote: "Confidence is not the absence of fear. It's deciding that something else matters more than the fear.",
      professional: "If anxiety is so intense it's affecting your sleep or physical health regularly, please reach out to a mental health professional. NIMHANS helpline: 080-46110007. iCall: 9152987821.",
    },
    burnout: {
      title: "When you can't study anymore",
      insight: "Burnout isn't laziness — it's depletion. You cannot study your way out of burnout. You have to recover your way out. Pushing through doesn't work; it deepens the hole.",
      steps: [
        { icon: "🛑", text: "Stop for today. Completely. No LeetCode, no company research, no LinkedIn. This is not optional." },
        { icon: "😴", text: "Sleep 8 hours tonight. Your hippocampus consolidates learning during sleep — rest IS studying." },
        { icon: "🚶", text: "Tomorrow: start with just 25 minutes of work, then a full 10-minute break. Do not push through. Repeat 3 times maximum." },
        { icon: "📅", text: "This week: schedule one half-day where placements don't exist. Do something you genuinely enjoy." },
      ],
      quote: "The students who handle placement season best are not the ones who study the most — they're the ones who recover the fastest.",
      professional: "Burnout that lasts more than 2–3 weeks, especially with mood changes or loss of interest in things you previously enjoyed, is worth discussing with a counsellor. Your college counselling cell is a good first step.",
    },
    rejected: {
      title: "After a rejection",
      insight: "Rejection stings — let's not pretend otherwise. A rejection is emotional data with a performance signal buried inside it. The next 24 hours matter a lot.",
      steps: [
        { icon: "⏳", text: "Give yourself today. Don't analyze, don't apply, don't compare. Just feel it and let it be." },
        { icon: "📧", text: "Tomorrow: email the recruiter — 'Could you share any feedback on my performance?' Many will reply. That feedback is worth more than any prep material." },
        { icon: "📝", text: "Write down specifically: what round did it go wrong? What moment felt weakest? That becomes your next 2-week focus." },
        { icon: "📊", text: "Context check: Google's acceptance rate is ~0.2%. Amazon's for SDE-1 is ~1–2%. Every engineer you follow on LinkedIn has rejection stories they don't post." },
      ],
      quote: "Rejection is not a verdict. It's redirection with feedback.",
      professional: "If a rejection leads to persistent low mood, hopelessness, or feeling like 'you'll never be enough,' please talk to someone — a friend, a parent, or a counsellor. That level of response deserves care, not just motivation.",
    },
    compare: {
      title: "When everyone else seems ahead",
      insight: "Comparison is your brain's attempt to assess threat — but it's using biased data. You see everyone's highlight reel (LinkedIn offers, internship posts) and your own behind-the-scenes. That comparison is mathematically unfair.",
      steps: [
        { icon: "🔭", text: "Log off LinkedIn for the next 7 days. Not forever — just while you're preparing. It is not useful right now." },
        { icon: "📋", text: "Write down 3 things you've learned or done this week. They exist, even if they feel small." },
        { icon: "🏁", text: "Your only competitor is who you were last week. That's the only race that's fair." },
        { icon: "💬", text: "Talk to ONE trusted friend about how you're feeling. Saying it out loud reduces its power significantly." },
      ],
      quote: "Comparison is the thief of joy — and in placement season, it's also the thief of focus.",
      professional: "If comparison is leading to persistent feelings of worthlessness or inadequacy, that's beyond normal stress. Talking to a psychologist can genuinely help you build a healthier relationship with your self-worth. iCall: 9152987821.",
    },
    ok: {
      title: "The low-level hum of anxiety",
      insight: "Low-level constant worry is exhausting in a different way — it's always there in the background, draining you without a clear cause. This is extremely common in placement season and does not mean something is wrong with you.",
      steps: [
        { icon: "🌬️", text: "Try 4-7-8 breathing: Inhale 4 counts, hold 7, exhale 8. Do this 4 times. It activates your parasympathetic nervous system within 90 seconds." },
        { icon: "📒", text: "Keep a 'worry journal': 10 minutes each evening, write your anxious thoughts. This externalizes them so your brain stops rehearsing them at 3am." },
        { icon: "🏃", text: "20 minutes of physical movement daily is clinically proven to reduce baseline anxiety more than many medications." },
        { icon: "🔋", text: "Protect your sleep. Anxiety and sleep deprivation feed each other. Same sleep time every night — even weekends." },
      ],
      quote: "You are not your anxious thoughts. You are the one noticing them.",
      professional: "Chronic low-level anxiety is treatable. If it's been months and nothing helps, please consider speaking to a mental health professional. It is a real medical concern, not a personality flaw. Vandrevala Foundation: 1860-2662-345 (24/7, free, confidential).",
    },
  },

  quotes: [
    "One placement doesn't define a career. Your work ethic, curiosity, and resilience do.",
    "You are not behind. You are on your own timeline — and preparation compounds.",
    "Every senior developer has a stack of rejections they never talk about. Keep going.",
    "The goal of placement prep is not to be perfect. It's to be better than you were yesterday.",
    "Anxiety means you care. That caring, channelled right, is your biggest asset.",
    "The only way out is through — one problem, one company, one day at a time.",
    "Your CGPA is a number. Your thinking, your attitude, your persistence — those are not.",
    "A rejection from a company is not rejection from the profession. Different things entirely.",
  ],

  breathingSteps: [
    { phase: "Breathe in", duration: 4, color: "#6366f1" },
    { phase: "Hold", duration: 7, color: "#8b5cf6" },
    { phase: "Breathe out", duration: 8, color: "#10b981" },
    { phase: "Hold", duration: 4, color: "#f59e0b" },
  ],
};

// ═══════════════════════════════════════════════════════════════
// RESUME ANALYSIS ENGINE
// ═══════════════════════════════════════════════════════════════
function analyzeResumeText(text, role) {
  const lower = text.toLowerCase();
  const kw = RESUME_KEYWORDS[role] || RESUME_KEYWORDS["Software Engineer (SDE)"];

  const foundCritical = kw.critical.filter(k => lower.includes(k));
  const missingCritical = kw.critical.filter(k => !lower.includes(k));
  const foundGood = kw.good.filter(k => lower.includes(k));
  const foundSoft = kw.soft.filter(k => lower.includes(k));

  const hasEmail = /[\w.+-]+@[\w.-]+\.\w+/.test(text);
  const hasPhone = /[\d]{10}|[\d]{3}[-.\s][\d]{3}[-.\s][\d]{4}/.test(text);
  const hasLinkedIn = lower.includes("linkedin");
  const hasGitHub = lower.includes("github");
  const hasQuantified = /\d+\s*%|reduced\s+by|improved\s+by|increased\s+by|\d+\s*(users|customers|requests|ms|seconds|hours|days|projects|teams)/i.test(text);
  const hasActionVerbs = /\b(developed|implemented|designed|optimized|led|created|built|deployed|architected|automated|reduced|improved|increased|delivered|collaborated|engineered|maintained|refactored)\b/i.test(text);
  const bulletCount = (text.match(/[•\-\*▸▹→]/g) || []).length;
  const wordCount = text.trim().split(/\s+/).length;
  const sectionHeaders = (text.match(/\b(experience|education|skills|projects|achievements|summary|objective|certifications|awards|publications)\b/gi) || []).length;

  const mustScore = Math.round((foundCritical.length / kw.critical.length) * 55);
  const goodScore = Math.round((foundGood.length / kw.good.length) * 20);
  const structureScore = [hasEmail, hasPhone, hasLinkedIn, hasGitHub, hasQuantified, hasActionVerbs, bulletCount >= 5, wordCount >= 300].filter(Boolean).length * 2 + (sectionHeaders >= 4 ? 5 : 0);
  const totalScore = Math.min(100, mustScore + goodScore + structureScore);

  const suggestions = [];
  if (missingCritical.length > 0) suggestions.push(`Add these critical keywords (naturally, in context): **${missingCritical.slice(0, 5).join(", ")}**`);
  if (!hasQuantified) suggestions.push("Quantify your impact — e.g., 'Reduced load time by 40%' or 'Served 10,000+ users'. Numbers make bullets 3× more memorable.");
  if (!hasGitHub) suggestions.push("Add your GitHub profile link. For tech roles, this is as important as your email.");
  if (!hasLinkedIn) suggestions.push("Add your LinkedIn URL. Recruiters cross-check.");
  if (bulletCount < 5) suggestions.push("Use bullet points for experience entries. They're easier to scan than paragraphs.");
  if (!hasActionVerbs) suggestions.push("Start each bullet with a strong action verb: Built, Designed, Optimized, Led, Deployed.");
  if (wordCount < 300) suggestions.push("Your resume seems brief. Aim for 400–700 words for a fresher resume (1 page, content-rich).");
  if (foundGood.length < 3) suggestions.push(`Add relevant tools: ${kw.good.slice(0, 4).join(", ")} — weave them into project descriptions.`);
  if (!hasEmail || !hasPhone) suggestions.push("Ensure your email and phone number are clearly visible at the top.");

  return {
    score: totalScore,
    foundCritical, missingCritical, foundGood, foundSoft,
    checks: { hasEmail, hasPhone, hasLinkedIn, hasGitHub, hasQuantified, hasActionVerbs, bulletCount, wordCount, sectionHeaders },
    suggestions,
    level: totalScore >= 75 ? "Strong" : totalScore >= 50 ? "Moderate" : "Needs Work",
    levelColor: totalScore >= 75 ? "#10b981" : totalScore >= 50 ? "#f59e0b" : "#ef4444",
  };
}

// ═══════════════════════════════════════════════════════════════
// SKILL GAP ENGINE
// ═══════════════════════════════════════════════════════════════
function analyzeSkillGap(userSkills, targetRole, targetCompanies) {
  const roleData = KB.roles[targetRole];
  if (!roleData) return null;
  const allRequired = [...roleData.coreSkills, ...roleData.languageSkills, ...roleData.toolSkills];
  const userSkillsLower = userSkills.map(s => s.toLowerCase().trim());
  const matchSkill = (req) => userSkillsLower.some(us => us.includes(req.toLowerCase().split(/[\s(]/)[0]) || req.toLowerCase().includes(us.split(/[\s(]/)[0]));
  const haveSkills = allRequired.filter(s => matchSkill(s));
  const missingCritical = allRequired.filter(s => !matchSkill(s));
  const missingNiceToHave = roleData.niceToHave.filter(s => !matchSkill(s));
  const companyGaps = {};
  targetCompanies.forEach(co => {
    const coData = KB.companies[co];
    if (!coData) return;
    const gaps = coData.requiredSkills.filter(s => !matchSkill(s));
    if (gaps.length > 0) companyGaps[co] = gaps;
  });
  return { haveSkills, missingCritical, missingNiceToHave, companyGaps };
}

function buildSkillGapMessage(name, gap, role, companies) {
  if (!gap) return `I need your target role to generate a skill gap analysis.`;
  const readiness = gap.haveSkills.length / (gap.haveSkills.length + gap.missingCritical.length);
  const pct = Math.round(readiness * 100);
  const level = pct >= 70 ? "Strong" : pct >= 40 ? "Developing" : "Foundational";
  let msg = `## Skill Gap Report — ${name}\n\n**Role:** ${role}  |  **Companies:** ${companies.join(", ")}\n**Readiness:** ${level} (${pct}% core skills covered)\n\n---\n\n`;
  if (gap.haveSkills.length > 0) { msg += `### Strengths (${gap.haveSkills.length})\n`; gap.haveSkills.forEach(s => { msg += `• ${s}\n`; }); msg += `\n`; }
  if (gap.missingCritical.length > 0) {
    msg += `### Critical Gaps (${gap.missingCritical.length})\n`;
    gap.missingCritical.forEach(s => {
      const res = KB.skillResources[s];
      if (res) { msg += `\n**${s}** — ${res.time}\n  Free: ${res.free}\n  Paid: ${res.paid}\n`; }
      else { msg += `• ${s}\n`; }
    });
    msg += `\n`;
  }
  if (gap.missingNiceToHave.length > 0) { msg += `### Nice-to-Have Gaps\n`; gap.missingNiceToHave.slice(0, 4).forEach(s => { msg += `• ${s}\n`; }); msg += `\n`; }
  if (Object.keys(gap.companyGaps).length > 0) { msg += `### Company-Specific Gaps\n`; Object.entries(gap.companyGaps).forEach(([co, gaps]) => { msg += `**${co}:** ${gaps.join(", ")}\n`; }); }
  return msg;
}

function buildCompanyDeepDive(company, userName) {
  const co = KB.companies[company];
  if (!co) return `No data on "${company}". Available: ${Object.keys(KB.companies).join(", ")}`;
  let msg = `## ${company} — Placement Guide\n\n**CTC:** ${co.ctc}  |  **Tier:** ${co.tier}\n**CGPA:** ${co.cgpa}\n**Backlogs:** ${co.backlogs}\n\n---\n\n### Interview Rounds\n`;
  co.rounds.forEach((r, i) => { msg += `\n**Round ${i + 1}: ${r.name}**\n${r.details}\n`; });
  msg += `\n---\n\n### Required Skills\n`;
  co.requiredSkills.forEach(s => { msg += `• ${s}\n`; });
  msg += `\n---\n\n### Prep Strategy\n\n**DSA:** ${co.prep.dsa}\n\n**System Design:** ${co.prep.system}\n\n**Behavioral:** ${co.prep.behavioral}\n\n**Timeline:** ${co.prep.timeline}`;
  return msg;
}

function getMockQuestion(companies, questionType, index) {
  for (const co of companies) {
    const mq = KB.mockQuestions[co];
    if (!mq) continue;
    const pool = mq[questionType];
    if (pool && pool[index]) return { company: co, q: pool[index], type: questionType };
  }
  for (const co of Object.keys(KB.mockQuestions)) {
    const mq = KB.mockQuestions[co];
    const pool = mq[questionType];
    if (pool && pool[index]) return { company: co, q: pool[index], type: questionType };
  }
  return null;
}

function formatMockQuestion(mq, index, name) {
  if (!mq) return `All questions for this type done, ${name}! Try another: **mock dsa**, **behavioral mock**, **system design**, or **aptitude**.`;
  const { company, q, type } = mq;
  let msg = `## Q${index + 1} — ${company}\n\n`;
  if (type === "dsa") {
    msg += `**DSA** · ${q.difficulty}\n\n${q.q}\n\n**Hint:** ${q.hint}`;
    if (q.followUp) msg += `\n\n**Follow-up:** ${q.followUp}`;
    msg += `\n\n*Type **answer** to see the solution, or **next** for another.*`;
  } else if (type === "behavioral") {
    msg += `**Behavioral** · Dimension: ${q.dimension}\n\n"${q.q}"\n\n**STAR Structure:**\n• **S**ituation — 1–2 sentences of context\n• **T**ask — your specific responsibility\n• **A**ction — what YOU did (60% of your answer)\n• **R**esult — quantify if possible\n\n*Type **next** when ready.*`;
  } else if (type === "system") {
    msg += `**System Design** · ${q.difficulty}\n\n${q.q}\n\n**Framework:** Clarify → Estimate scale → High-level design → Deep dive → Trade-offs\n\n**Hint:** ${q.hint}\n\n*Type **answer** for model answer, or **next** to continue.*`;
  } else if (type === "aptitude") {
    msg += `**Aptitude** · ${q.category} · ${q.difficulty}\n\n${q.q}\n\n*Type **answer** to see the solution.*`;
  } else if (type === "technical") {
    msg += `**Technical/CS** · ${q.topic}\n\n${q.q}\n\n*Answer in your own words: definition → how it works → real example. Type **next** when done.*`;
  } else if (type === "gd") {
    msg += `**Group Discussion Practice**\n\nTopic: "${q.q}"\n\n**GD Strategy:** Open with a clear stance → use PRELed (Point-Reason-Example-Link) → invite others → summarize near the end.\n\n*Practice your opening 30 seconds. Type **next** for another topic.*`;
  }
  return msg;
}

// ═══════════════════════════════════════════════════════════════
// CONSTANTS
// ═══════════════════════════════════════════════════════════════
const SKILL_CHIPS = [
  "Python", "Java", "C++", "JavaScript", "DSA", "SQL", "React.js", "Node.js",
  "Machine Learning", "System Design", "Docker", "Git", "HTML/CSS",
  "TypeScript", "MongoDB", "AWS", "Operating Systems", "DBMS", "Computer Networks", "OOP",
];

const ROLE_CHIPS = Object.keys(KB.roles);

const COMPANY_CHIPS = Object.keys(KB.companies);

const MAIN_CHIPS = [
  { label: "📊 Skill Gap", q: "skill gap" },
  { label: "💻 DSA Mock", q: "mock dsa" },
  { label: "🤝 Behavioral", q: "behavioral mock" },
  { label: "🏗️ System Design", q: "system design" },
  { label: "🧮 Aptitude", q: "aptitude" },
  { label: "🗺️ Roadmap", q: "roadmap" },
  { label: "💙 Stress Support", q: "i am stressed" },
];

const S = {
  ASK_NAME: "ask_name",
  ASK_SKILLS: "ask_skills",
  ASK_ROLE: "ask_role",
  ASK_COMPANIES: "ask_companies",
  SHOW_ANALYSIS: "show_analysis",
  MAIN: "main",
  MOCK: "mock",
};

// ═══════════════════════════════════════════════════════════════
// MARKDOWN RENDERER
// ═══════════════════════════════════════════════════════════════
function MD({ text, isUser }) {
  const lines = text.split("\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
      {lines.map((line, i) => {
        if (!line.trim()) return <div key={i} style={{ height: "4px" }} />;
        if (line.startsWith("## ")) return <p key={i} style={{ fontSize: "13px", fontWeight: "700", color: isUser ? "#fff" : "#0f172a", margin: "6px 0 2px", letterSpacing: "0.01em" }}>{line.slice(3)}</p>;
        if (line.startsWith("### ")) return <p key={i} style={{ fontSize: "11.5px", fontWeight: "700", color: isUser ? "#e0e7ff" : "#1e40af", margin: "5px 0 1px", textTransform: "uppercase", letterSpacing: "0.06em" }}>{line.slice(4)}</p>;
        if (line === "---") return <hr key={i} style={{ border: "none", borderTop: `1px solid ${isUser ? "rgba(255,255,255,0.2)" : "#e2e8f0"}`, margin: "6px 0" }} />;

        const renderInline = (t) => t.split(/(\*\*[^*]+\*\*|`[^`]+`)/).map((p, j) => {
          if (p.startsWith("**") && p.endsWith("**")) return <strong key={j} style={{ fontWeight: "700", color: isUser ? "#fef3c7" : "#0f172a" }}>{p.slice(2, -2)}</strong>;
          if (p.startsWith("`") && p.endsWith("`")) return <code key={j} style={{ fontSize: "10.5px", background: isUser ? "rgba(255,255,255,0.15)" : "#f1f5f9", padding: "1px 5px", borderRadius: "3px", fontFamily: "monospace", color: isUser ? "#e0e7ff" : "#6366f1" }}>{p.slice(1, -1)}</code>;
          return <span key={j}>{p}</span>;
        });

        const isBullet = line.startsWith("• ") || line.startsWith("- ");
        if (isBullet) return (
          <div key={i} style={{ display: "flex", gap: "7px", fontSize: "11.5px", lineHeight: "1.55" }}>
            <span style={{ color: isUser ? "#a5b4fc" : "#6366f1", marginTop: "2px", flexShrink: 0 }}>▸</span>
            <span>{renderInline(line.replace(/^[•-] /, ""))}</span>
          </div>
        );
        return <p key={i} style={{ fontSize: "11.5px", lineHeight: "1.55", margin: 0 }}>{renderInline(line)}</p>;
      })}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// RESUME ANALYSIS PANEL
// ═══════════════════════════════════════════════════════════════
function ResumePanel({ profile }) {
  const [view, setView] = useState("input"); // input | results
  const [text, setText] = useState("");
  const [selectedRole, setSelectedRole] = useState(profile.role || "Software Engineer (SDE)");
  const [results, setResults] = useState(null);

  const handleAnalyze = () => {
    if (text.trim().length < 80) return;
    const r = analyzeResumeText(text, selectedRole);
    setResults(r);
    setView("results");
  };

  const circumference = 2 * Math.PI * 42;
  const strokeDash = results ? (circumference * results.score / 100) : 0;

  if (view === "results" && results) {
    return (
      <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontSize: "14px", fontWeight: "700", color: "#0f172a", margin: 0 }}>Resume Analysis</p>
            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{selectedRole}</p>
          </div>
          <button onClick={() => setView("input")} style={{ fontSize: "11px", color: "#6366f1", background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: "8px", padding: "5px 11px", cursor: "pointer", fontWeight: "600" }}>← Re-analyze</button>
        </div>

        {/* Score ring */}
        <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "16px", display: "flex", alignItems: "center", gap: "20px", border: "1px solid #e2e8f0" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)", flexShrink: 0 }}>
            <circle cx="50" cy="50" r="42" fill="none" stroke="#e2e8f0" strokeWidth="9" />
            <circle cx="50" cy="50" r="42" fill="none" stroke={results.levelColor} strokeWidth="9"
              strokeDasharray={`${strokeDash} ${circumference}`} strokeLinecap="round"
              style={{ transition: "stroke-dasharray 1s ease" }} />
          </svg>
          <div style={{ position: "relative", marginLeft: "-120px", width: "100px", textAlign: "center", pointerEvents: "none" }}>
            <p style={{ fontSize: "26px", fontWeight: "800", color: results.levelColor, margin: 0, lineHeight: 1 }}>{results.score}</p>
            <p style={{ fontSize: "10px", color: "#64748b", margin: 0 }}>/100</p>
          </div>
          <div style={{ marginLeft: "12px" }}>
            <p style={{ fontSize: "18px", fontWeight: "700", margin: "0 0 4px", color: results.levelColor }}>{results.level}</p>
            <p style={{ fontSize: "11.5px", color: "#475569", margin: 0, lineHeight: 1.5 }}>
              {results.foundCritical.length}/{results.missingCritical.length + results.foundCritical.length} critical keywords<br />
              {results.foundGood.length} bonus skills found
            </p>
          </div>
        </div>

        {/* Keyword grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "12px", padding: "12px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#15803d", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>✅ Found ({results.foundCritical.length})</p>
            {results.foundCritical.slice(0, 6).map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
                <p style={{ fontSize: "11px", margin: 0, color: "#166534" }}>{k}</p>
              </div>
            ))}
            {results.foundCritical.length === 0 && <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>None found yet</p>}
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "12px", padding: "12px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#c2410c", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>⚠️ Missing ({results.missingCritical.length})</p>
            {results.missingCritical.slice(0, 6).map(k => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "4px" }}>
                <div style={{ width: "5px", height: "5px", borderRadius: "50%", background: "#f97316", flexShrink: 0 }} />
                <p style={{ fontSize: "11px", margin: 0, color: "#7c2d12" }}>{k}</p>
              </div>
            ))}
            {results.missingCritical.length === 0 && <p style={{ fontSize: "11px", color: "#15803d", margin: 0 }}>All critical keywords present! 🎉</p>}
          </div>
        </div>

        {/* Structure checks */}
        <div style={{ background: "#f8fafc", borderRadius: "12px", padding: "12px", border: "1px solid #e2e8f0" }}>
          <p style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Structure Checklist</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4px" }}>
            {[
              [results.checks.hasEmail, "Email present"],
              [results.checks.hasPhone, "Phone present"],
              [results.checks.hasLinkedIn, "LinkedIn linked"],
              [results.checks.hasGitHub, "GitHub linked"],
              [results.checks.hasQuantified, "Quantified impact"],
              [results.checks.hasActionVerbs, "Action verbs used"],
              [results.checks.bulletCount >= 5, `Bullet points (${results.checks.bulletCount})`],
              [results.checks.wordCount >= 300, `Word count (~${results.checks.wordCount})`],
            ].map(([ok, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <span style={{ fontSize: "11px", color: ok ? "#22c55e" : "#ef4444" }}>{ok ? "✓" : "✗"}</span>
                <p style={{ fontSize: "11px", color: ok ? "#374151" : "#9ca3af", margin: 0 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        {results.suggestions.length > 0 && (
          <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.05), rgba(139,92,246,0.05))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px", padding: "12px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#6366f1", margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>💡 Improvements</p>
            {results.suggestions.slice(0, 5).map((s, i) => (
              <div key={i} style={{ display: "flex", gap: "7px", marginBottom: "6px" }}>
                <span style={{ color: "#6366f1", flexShrink: 0, fontSize: "11px", marginTop: "1px" }}>→</span>
                <MD text={s} isUser={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // Input view
  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>
      <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.05))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "12px", padding: "14px" }}>
        <p style={{ fontSize: "13px", fontWeight: "700", margin: "0 0 5px", color: "#0f172a" }}>📄 Resume Analyzer</p>
        <p style={{ fontSize: "11.5px", color: "#475569", margin: 0, lineHeight: 1.6 }}>Paste your resume text below. Get an instant ATS score, keyword gap analysis, and specific improvement tips — no upload needed.</p>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: "600", color: "#374151", margin: "0 0 6px" }}>Target role for keyword matching:</p>
        <select value={selectedRole} onChange={e => setSelectedRole(e.target.value)} style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #d1d5db", fontSize: "12px", color: "#374151", background: "#fff", outline: "none" }}>
          {Object.keys(RESUME_KEYWORDS).map(r => <option key={r} value={r}>{r}</option>)}
        </select>
      </div>
      <div>
        <p style={{ fontSize: "11px", fontWeight: "600", color: "#374151", margin: "0 0 6px" }}>Paste your resume text:</p>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Copy your entire resume and paste it here — education, skills, experience, projects, achievements. The more complete, the better the analysis."
          style={{ width: "100%", minHeight: "160px", padding: "10px 12px", borderRadius: "10px", border: "1px solid #d1d5db", fontSize: "11.5px", color: "#374155", resize: "vertical", outline: "none", lineHeight: 1.6, fontFamily: "inherit", boxSizing: "border-box" }}
        />
        <p style={{ fontSize: "10px", color: "#94a3b8", margin: "4px 0 0" }}>{text.trim().split(/\s+/).filter(Boolean).length} words</p>
      </div>
      <button
        onClick={handleAnalyze}
        disabled={text.trim().length < 80}
        style={{ width: "100%", padding: "11px", borderRadius: "10px", border: "none", background: text.trim().length >= 80 ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e2e8f0", color: text.trim().length >= 80 ? "#fff" : "#9ca3af", fontSize: "13px", fontWeight: "700", cursor: text.trim().length >= 80 ? "pointer" : "not-allowed", transition: "all 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
        <FileText size={14} /> Analyze Resume
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// STRESS SUPPORT PANEL
// ═══════════════════════════════════════════════════════════════
function StressPanel() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [breathing, setBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState(0);
  const [breathCount, setBreathCount] = useState(0);
  const [quoteIdx, setQuoteIdx] = useState(0);
  const breathTimerRef = useRef(null);

  const startBreathing = () => {
    setBreathing(true);
    setBreathPhase(0);
    setBreathCount(0);
    runBreath(0, 0);
  };

  const runBreath = (phase, count) => {
    const step = STRESS_DATA.breathingSteps[phase];
    breathTimerRef.current = setTimeout(() => {
      const nextPhase = (phase + 1) % STRESS_DATA.breathingSteps.length;
      const nextCount = nextPhase === 0 ? count + 1 : count;
      if (nextCount >= 4) { setBreathing(false); setBreathPhase(0); return; }
      setBreathPhase(nextPhase);
      setBreathCount(nextCount);
      runBreath(nextPhase, nextCount);
    }, step.duration * 1000);
  };

  useEffect(() => () => { if (breathTimerRef.current) clearTimeout(breathTimerRef.current); }, []);

  const mood = selectedMood ? STRESS_DATA.responses[selectedMood] : null;
  const currentBreathStep = STRESS_DATA.breathingSteps[breathPhase];

  return (
    <div style={{ padding: "16px", display: "flex", flexDirection: "column", gap: "14px", paddingBottom: "24px" }}>
      {/* Mood selector */}
      <div>
        <p style={{ fontSize: "12px", fontWeight: "700", color: "#374151", margin: "0 0 10px" }}>How are you feeling right now?</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "7px" }}>
          {STRESS_DATA.moods.map(m => (
            <button key={m.id} onClick={() => setSelectedMood(selectedMood === m.id ? null : m.id)}
              style={{ padding: "10px 6px", borderRadius: "10px", border: `1.5px solid ${selectedMood === m.id ? "#6366f1" : "#e2e8f0"}`, background: selectedMood === m.id ? "rgba(99,102,241,0.08)" : "#f8fafc", cursor: "pointer", textAlign: "center", transition: "all 0.15s" }}>
              <div style={{ fontSize: "20px", marginBottom: "4px" }}>{m.emoji}</div>
              <p style={{ fontSize: "9.5px", fontWeight: "600", color: selectedMood === m.id ? "#6366f1" : "#374151", margin: 0, lineHeight: 1.3 }}>{m.label}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Mood response */}
      {mood && (
        <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "14px", border: "1px solid #e2e8f0", display: "flex", flexDirection: "column", gap: "10px" }}>
          <p style={{ fontSize: "13px", fontWeight: "700", color: "#0f172a", margin: 0 }}>{mood.title}</p>
          <p style={{ fontSize: "11.5px", color: "#475569", lineHeight: 1.65, margin: 0 }}>{mood.insight}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
            {mood.steps.map((step, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "16px", flexShrink: 0, marginTop: "1px" }}>{step.icon}</span>
                <p style={{ fontSize: "11.5px", color: "#374151", lineHeight: 1.6, margin: 0 }}>{step.text}</p>
              </div>
            ))}
          </div>
          <div style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.06), rgba(139,92,246,0.04))", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "10px", padding: "10px 12px" }}>
            <p style={{ fontSize: "11px", fontStyle: "italic", color: "#6366f1", margin: 0 }}>"{mood.quote}"</p>
          </div>
          <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: "10px", padding: "10px 12px" }}>
            <p style={{ fontSize: "10px", fontWeight: "700", color: "#c2410c", margin: "0 0 4px", textTransform: "uppercase", letterSpacing: "0.05em" }}>🤝 When to seek professional support</p>
            <p style={{ fontSize: "11px", color: "#7c2d12", margin: 0, lineHeight: 1.6 }}>{mood.professional}</p>
          </div>
        </div>
      )}

      {/* Breathing exercise */}
      <div style={{ background: "#f8fafc", borderRadius: "14px", padding: "14px", border: "1px solid #e2e8f0" }}>
        <p style={{ fontSize: "12px", fontWeight: "700", color: "#0f172a", margin: "0 0 5px" }}>🌬️ 4-7-8 Breathing Exercise</p>
        <p style={{ fontSize: "11px", color: "#64748b", margin: "0 0 12px", lineHeight: 1.5 }}>Activates your parasympathetic nervous system. Used by Navy SEALs before high-stress situations. Takes under 2 minutes.</p>
        {breathing ? (
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <div style={{ width: "90px", height: "90px", borderRadius: "50%", background: `radial-gradient(circle, ${currentBreathStep.color}22, ${currentBreathStep.color}11)`, border: `2px solid ${currentBreathStep.color}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px", animation: breathPhase === 0 ? "expand 4s ease-in-out" : breathPhase === 2 ? "contract 8s ease-in-out" : "none" }}>
              <p style={{ fontSize: "12px", fontWeight: "700", color: currentBreathStep.color, margin: 0 }}>{currentBreathStep.phase}</p>
            </div>
            <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>{currentBreathStep.duration}s · Cycle {breathCount + 1}/4</p>
            <button onClick={() => { clearTimeout(breathTimerRef.current); setBreathing(false); }} style={{ marginTop: "10px", fontSize: "11px", color: "#94a3b8", background: "none", border: "none", cursor: "pointer" }}>Stop</button>
          </div>
        ) : (
          <button onClick={startBreathing} style={{ width: "100%", padding: "9px", borderRadius: "9px", border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
            ▶ Start Breathing Exercise
          </button>
        )}
      </div>

      {/* Motivational quote rotator */}
      <div style={{ background: "linear-gradient(135deg, #1e1b4b, #312e81)", borderRadius: "14px", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <p style={{ fontSize: "10px", fontWeight: "700", color: "#a5b4fc", margin: 0, textTransform: "uppercase", letterSpacing: "0.08em" }}>Thought of the Moment</p>
        <p style={{ fontSize: "13px", fontStyle: "italic", color: "#e0e7ff", margin: 0, lineHeight: 1.7 }}>"{STRESS_DATA.quotes[quoteIdx]}"</p>
        <button onClick={() => setQuoteIdx((quoteIdx + 1) % STRESS_DATA.quotes.length)}
          style={{ alignSelf: "flex-start", fontSize: "10px", color: "#818cf8", background: "none", border: "1px solid rgba(129,140,248,0.3)", borderRadius: "6px", padding: "4px 10px", cursor: "pointer" }}>
          Next thought →
        </button>
      </div>

      {/* Crisis resources */}
      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "12px", padding: "12px" }}>
        <p style={{ fontSize: "10px", fontWeight: "700", color: "#dc2626", margin: "0 0 6px", textTransform: "uppercase", letterSpacing: "0.05em" }}>🆘 If you're in crisis right now</p>
        <p style={{ fontSize: "11px", color: "#7f1d1d", margin: 0, lineHeight: 1.8 }}>
          iCall (free, confidential): <strong>9152987821</strong><br />
          Vandrevala Foundation (24/7): <strong>1860-2662-345</strong><br />
          NIMHANS Helpline: <strong>080-46110007</strong><br />
          Snehi (English/Hindi): <strong>044-24640050</strong>
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// MAIN APP
// ═══════════════════════════════════════════════════════════════
export default function PlaceBot() {
  const [stage, setStage] = useState(S.ASK_NAME);
  const [activePanel, setActivePanel] = useState(null); // null | 'resume' | 'stress'
  const [messages, setMessages] = useState([{
    id: 1, role: "bot", time: new Date(),
    text: `## Welcome to PlaceBot\n\nI'm your placement coach — built for students preparing for campus and off-campus drives.\n\nI'll tailor everything to **your skills, your target role, and your target companies.**\n\nWhat's your name?`,
  }]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [profile, setProfile] = useState({ name: "", skills: [], role: "", companies: [] });
  const [selSkills, setSelSkills] = useState([]);
  const [selCompanies, setSelCompanies] = useState([]);
  const [mockType, setMockType] = useState("dsa");
  const [mockIdx, setMockIdx] = useState(0);
  const bottomRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, isTyping]);

  const addBot = useCallback((text, delay = 650) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages(p => [...p, { id: Date.now(), role: "bot", text, time: new Date() }]);
      setIsTyping(false);
    }, delay);
  }, []);

  const addUser = useCallback((text) => {
    setMessages(p => [...p, { id: Date.now(), role: "user", text, time: new Date() }]);
  }, []);

  const handle = useCallback((rawText) => {
    const text = rawText.trim();
    if (!text || isTyping) return;
    setInput("");
    setActivePanel(null);
    addUser(text);
    const lower = text.toLowerCase();

    // STRESS — highest priority
    if (/\b(stress|stressed|overwhelm|anxious|anxiety|depressed|panic|suicidal|give up|hopeless|can't take|burnout|burned out|exhausted)\b/.test(lower)) {
      setActivePanel("stress");
      addBot(`I hear you, ${profile.name || "friend"}. Let's work through this together. 💙\n\nI've opened the **Stress Support** panel on the right — it has breathing exercises, mood-based guidance, and real insights based on what you're feeling.\n\nYou're not alone in this. Placement season is genuinely hard, and asking for support is the smartest thing you can do.`, 600);
      return;
    }
    if (/\b(rejected|rejection|didn't get|failed interview|no offer|got rejected)\b/.test(lower)) {
      addBot(`A rejection hurts — don't rush past that feeling, ${profile.name || "friend"}.\n\n**After 24 hours:** Email the recruiter: *"Could you share any feedback on my performance?"* — many reply, and that feedback is worth more than any prep guide.\n\nThen: write down specifically what moment felt weakest. That becomes your next 2-week focus.\n\nRejection is redirection with data inside it. You're still in the game.`, 750);
      return;
    }
    if (/\b(nervous|scared|butterflies|trembling|fear of interview)\b/.test(lower)) {
      addBot(`Pre-interview nerves = your brain saying "this matters." That's a feature, not a bug.\n\n**Harvard research tip:** Say "I'm excited" instead of "I'm nervous." Same physiology — 22% better performance.\n\n**Pre-interview ritual:** No new material 2 hours before → power pose 2 min → 4-7-8 breathing → water + food → smile when you enter.\n\nWhich company? I'll give you a specific checklist.`, 700);
      return;
    }

    // RESUME panel trigger
    if (/\b(resume|cv|ats|resume analysis|analyze resume|check resume)\b/.test(lower)) {
      setActivePanel("resume");
      addBot(`I've opened the **Resume Analyzer** on the right, ${profile.name || ""}.\n\nPaste your resume text there and select your target role — you'll get an ATS score, keyword gap report, and specific improvement tips instantly.`, 500);
      return;
    }

    // STAGE FLOW
    if (stage === S.ASK_NAME) {
      const n = text.split(" ")[0].replace(/[^a-zA-Z]/g, "");
      if (n.length < 2) { addBot("Please enter a valid first name to get started!", 400); return; }
      setProfile(p => ({ ...p, name: n }));
      setStage(S.ASK_SKILLS);
      addBot(`Great to meet you, **${n}**! 🙌\n\nSelect the skills you already have from the chips below (or type them). Be honest — the more accurate you are, the better your personalized plan.`, 600);
      return;
    }

    if (stage === S.ASK_SKILLS) {
      const typed = text.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
      const combined = [...new Set([...selSkills, ...typed])];
      setProfile(p => ({ ...p, skills: combined }));
      setSelSkills([]);
      setStage(S.ASK_ROLE);
      addBot(`Got it — **${combined.length} skill${combined.length !== 1 ? "s" : ""}** noted.\n\nWhat role are you targeting? Select from below or type it.`, 600);
      return;
    }

    if (stage === S.ASK_ROLE) {
      const matched = Object.keys(KB.roles).find(r =>
        lower.includes(r.toLowerCase().split(" ")[0]) || r.toLowerCase().includes(lower.split(" ")[0])
      ) || text;
      setProfile(p => ({ ...p, role: matched }));
      setStage(S.ASK_COMPANIES);
      addBot(`**${matched}** — great target. Which companies are you aiming for?\n\nSelect from the chips (you can pick multiple) or type them.`, 600);
      return;
    }

    if (stage === S.ASK_COMPANIES) {
      const typed = text.split(/[,;]+/).map(s => s.trim()).filter(Boolean);
      const all = [...new Set([...selCompanies, ...typed])];
      const matched = all.map(c => Object.keys(KB.companies).find(k =>
        k.toLowerCase().includes(c.toLowerCase().split(" ")[0]) || c.toLowerCase().includes(k.toLowerCase().split(" ")[0])
      ) || c);
      const finalProfile = { ...profile, companies: matched };
      setProfile(finalProfile);
      setSelCompanies([]);
      setStage(S.SHOW_ANALYSIS);
      addBot(`Analyzing your profile...`, 300);
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const gap = analyzeSkillGap(finalProfile.skills, finalProfile.role, matched);
          const gapMsg = buildSkillGapMessage(finalProfile.name, gap, finalProfile.role, matched);
          setMessages(p => [...p, { id: Date.now(), role: "bot", text: gapMsg, time: new Date() }]);
          setIsTyping(false);
          setTimeout(() => {
            addBot(`Profile set! Use the chips below to start.\n\n**Available:** Skill Gap · DSA Mock · Behavioral · System Design · Aptitude · Roadmap · Any company name · Stress Support`, 800);
            setStage(S.MAIN);
          }, 1000);
        }, 1800);
      }, 500);
      return;
    }

    // MAIN STAGE
    if (stage === S.MAIN || stage === S.MOCK) {
      const dsaTrigger = /\b(dsa|coding question|coding mock|algorithm|leetcode|data structure)\b/.test(lower);
      const behaviorTrigger = /\b(behavioral|behaviour|star|hr question|behavioral mock)\b/.test(lower);
      const systemTrigger = /\b(system design|architecture|design question|design mock)\b/.test(lower);
      const aptitudeTrigger = /\b(aptitude|reasoning|quant|verbal|logical|gd|group discussion|technical question)\b/.test(lower);
      const nextTrigger = /\b(next|next question|continue|another|more)\b/.test(lower);
      const answerTrigger = /\b(show answer|answer|solution|reveal)\b/.test(lower);

      if (dsaTrigger && !nextTrigger) {
        setStage(S.MOCK); setMockType("dsa"); setMockIdx(0);
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), "dsa", 0);
        addBot(formatMockQuestion(mq, 0, profile.name), 700);
        return;
      }
      if (behaviorTrigger && !nextTrigger) {
        setStage(S.MOCK); setMockType("behavioral"); setMockIdx(0);
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), "behavioral", 0);
        addBot(formatMockQuestion(mq, 0, profile.name), 700);
        return;
      }
      if (systemTrigger && !nextTrigger) {
        setStage(S.MOCK); setMockType("system"); setMockIdx(0);
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), "system", 0);
        addBot(formatMockQuestion(mq, 0, profile.name), 700);
        return;
      }
      if (aptitudeTrigger && !nextTrigger) {
        const t = lower.includes("gd") || lower.includes("group") ? "gd" : lower.includes("technical") ? "technical" : "aptitude";
        setStage(S.MOCK); setMockType(t); setMockIdx(0);
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), t, 0);
        addBot(formatMockQuestion(mq, 0, profile.name), 700);
        return;
      }
      if (nextTrigger && stage === S.MOCK) {
        const newIdx = mockIdx + 1;
        setMockIdx(newIdx);
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), mockType, newIdx);
        addBot(formatMockQuestion(mq, newIdx, profile.name), 500);
        return;
      }
      if (answerTrigger) {
        const mq = getMockQuestion(profile.companies.length > 0 ? profile.companies : Object.keys(KB.mockQuestions), mockType, mockIdx);
        if (mq && (mq.q.answer || mq.q.hint)) {
          addBot(`## Answer\n\n${mq.q.answer || mq.q.hint}\n\n**Key takeaway:** ${mq.type === "aptitude" ? "Practice this category until you solve it in under 45 seconds." : "Interviewers want your reasoning, not just the answer."}\n\nType **next** to continue.`, 600);
        } else {
          addBot(`No single answer here — the process is what's evaluated. Type **next** to continue.`, 500);
        }
        return;
      }
      if (/\b(skill gap|gap analysis|what to learn|missing skills|analyze my skills)\b/.test(lower)) {
        const gap = analyzeSkillGap(profile.skills, profile.role, profile.companies);
        addBot(buildSkillGapMessage(profile.name, gap, profile.role, profile.companies), 800);
        return;
      }
      if (/\b(roadmap|study plan|plan|week by week|schedule|timeline)\b/.test(lower)) {
        const rm = KB.roadmaps[profile.role];
        if (rm) {
          let msg = `## ${profile.name}'s Roadmap — ${profile.role}\n\n**Total:** ${rm.weeks} weeks\n\n`;
          rm.phases.forEach(p => { msg += `### ${p.phase}\n`; p.tasks.forEach(t => { msg += `• ${t}\n`; }); msg += `\n`; });
          addBot(msg, 800);
        } else {
          addBot(`No specific roadmap for "${profile.role}" yet. Your skill gap analysis above is your effective roadmap — work through critical gaps in order.`, 600);
        }
        return;
      }
      const foundCo = Object.keys(KB.companies).find(co => lower.includes(co.toLowerCase()));
      if (foundCo) { addBot(buildCompanyDeepDive(foundCo, profile.name), 900); return; }
      if (/\b(my companies|target companies|company overview)\b/.test(lower)) {
        if (profile.companies.length > 0) {
          addBot(buildCompanyDeepDive(profile.companies[0], profile.name), 800);
          profile.companies.slice(1).forEach((co, i) => {
            setTimeout(() => setMessages(p => [...p, { id: Date.now() + i, role: "bot", text: buildCompanyDeepDive(co, profile.name), time: new Date() }]), (i + 1) * 900);
          });
        } else { addBot("Which companies are you interested in?", 400); }
        return;
      }

      // Fallback — show chips guidance
      addBot(`Use the quick-action chips below, ${profile.name}:\n\n• **Skill Gap** — personalized gap analysis\n• **DSA Mock** — coding questions from your target companies\n• **Behavioral** — STAR method practice\n• **System Design** — architecture questions\n• **Roadmap** — week-by-week plan\n• **[Company name]** — full guide for any company\n\nOr type "resume" or "stress support" to open those tools.`, 600);
    }
  }, [stage, profile, selSkills, selCompanies, mockType, mockIdx, isTyping, addBot, addUser]);

  const stageOrder = [S.ASK_NAME, S.ASK_SKILLS, S.ASK_ROLE, S.ASK_COMPANIES, S.SHOW_ANALYSIS, S.MAIN];
  const stageIdx = stageOrder.indexOf(stage);

  // ──────────────────────────────────────────────
  // RENDER
  // ──────────────────────────────────────────────
  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      padding: "12px",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
    }}>
      {/* Ambient glow */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-100px", left: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-100px", right: "10%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)" }} />
      </div>

      {/* OUTER WRAPPER — chat + optional side panel */}
      <div style={{ position: "relative", display: "flex", gap: "14px", width: "100%", maxWidth: activePanel ? "960px" : "680px", transition: "max-width 0.3s ease", alignItems: "flex-start" }}>

        {/* MAIN CHAT CONTAINER */}
        <div style={{
          flex: 1, height: "min(94vh, 860px)", display: "flex", flexDirection: "column",
          borderRadius: "20px", overflow: "hidden",
          background: "#ffffff",
          boxShadow: "0 0 0 1px rgba(99,102,241,0.15), 0 40px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.9)",
        }}>

          {/* HEADER */}
          <div style={{
            flexShrink: 0, padding: "14px 18px 12px",
            background: "linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #1e1b4b 100%)",
            borderBottom: "1px solid rgba(99,102,241,0.3)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
                {/* LOGO */}
                <div style={{ position: "relative" }}>
                  <div style={{
                    width: "42px", height: "42px", borderRadius: "12px",
                    background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 24px rgba(99,102,241,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                    flexShrink: 0,
                  }}>
                    {/* Custom P logo */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M5 4h9a5 5 0 010 10H5V4z" fill="white" fillOpacity="0.9"/>
                      <path d="M5 14v6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                      <circle cx="18" cy="3" r="2.5" fill="#fbbf24"/>
                      <path d="M17 1.5l1 1.5-1 1.5" stroke="#1e1b4b" strokeWidth="1" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div style={{ position: "absolute", bottom: "-1px", right: "-1px", width: "11px", height: "11px", borderRadius: "50%", background: "#34d399", border: "2px solid #1e1b4b", animation: "pb-pulse 2s infinite" }} />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                    <h1 style={{ fontSize: "19px", fontWeight: "800", color: "#ffffff", letterSpacing: "-0.02em", margin: 0 }}>PlaceBot</h1>
                    <span style={{ fontSize: "9px", fontWeight: "700", color: "#a5b4fc", background: "rgba(99,102,241,0.2)", padding: "2px 7px", borderRadius: "999px", border: "1px solid rgba(99,102,241,0.3)" }}>BETA</span>
                  </div>
                  <p style={{ fontSize: "10px", color: "#a5b4fc", letterSpacing: "0.08em", margin: 0 }}>AI PLACEMENT COACH</p>
                </div>
              </div>

              {/* Header right */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <button onClick={() => setActivePanel(activePanel === "resume" ? null : "resume")}
                  style={{ padding: "5px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "600", color: activePanel === "resume" ? "#6366f1" : "#a5b4fc", background: activePanel === "resume" ? "rgba(99,102,241,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${activePanel === "resume" ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.15s" }}>
                  <FileText size={11} />Resume
                </button>
                <button onClick={() => setActivePanel(activePanel === "stress" ? null : "stress")}
                  style={{ padding: "5px 10px", borderRadius: "8px", fontSize: "10px", fontWeight: "600", color: activePanel === "stress" ? "#f87171" : "#a5b4fc", background: activePanel === "stress" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)", border: `1px solid ${activePanel === "stress" ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.1)"}`, cursor: "pointer", display: "flex", alignItems: "center", gap: "4px", transition: "all 0.15s" }}>
                  <Heart size={11} />Stress
                </button>
                {profile.name && (
                  <span style={{ padding: "4px 10px", borderRadius: "999px", fontSize: "11px", fontWeight: "700", color: "#c7d2fe", background: "rgba(99,102,241,0.15)", border: "1px solid rgba(99,102,241,0.25)" }}>
                    {profile.name}
                  </span>
                )}
              </div>
            </div>

            {/* Progress bar */}
            {profile.name && (
              <div style={{ marginTop: "10px", display: "flex", gap: "3px", alignItems: "center" }}>
                {["Name", "Skills", "Role", "Companies", "Analysis", "Ready"].map((step, i) => {
                  const done = i < stageIdx || stageIdx >= 5;
                  const active = i === stageIdx && stageIdx < 5;
                  return (
                    <div key={step} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
                      <div style={{ height: "3px", width: "100%", borderRadius: "2px", background: done ? "#6366f1" : active ? "rgba(99,102,241,0.4)" : "rgba(255,255,255,0.08)", transition: "background 0.4s" }} />
                      <span style={{ fontSize: "7.5px", color: done ? "#a5b4fc" : "#4b5563", letterSpacing: "0.05em" }}>{step}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CHAT MESSAGES */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: "10px", background: "linear-gradient(180deg, #f1f5f9 0%, #f8fafc 100%)" }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", alignItems: "flex-end", gap: "7px", flexDirection: msg.role === "user" ? "row-reverse" : "row", animation: "pb-in 0.25s ease-out" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginBottom: "2px", background: msg.role === "bot" ? "linear-gradient(135deg, #1e1b4b, #312e81)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", boxShadow: `0 2px 8px ${msg.role === "bot" ? "rgba(30,27,75,0.3)" : "rgba(99,102,241,0.35)"}` }}>
                  {msg.role === "bot"
                    ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 4h9a5 5 0 010 10H5V4z" fill="#6366f1"/><path d="M5 14v6" stroke="#a5b4fc" strokeWidth="2.5" strokeLinecap="round"/></svg>
                    : <User size={12} color="#fff" />}
                </div>
                <div style={{
                  maxWidth: "82%", borderRadius: "16px", padding: "11px 14px",
                  borderBottomRightRadius: msg.role === "user" ? "4px" : "16px",
                  borderBottomLeftRadius: msg.role === "bot" ? "4px" : "16px",
                  ...(msg.role === "user"
                    ? { background: "linear-gradient(135deg, #4f46e5, #7c3aed)", color: "#fff", boxShadow: "0 4px 16px rgba(79,70,229,0.3)" }
                    : { background: "#ffffff", color: "#1e293b", border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }
                  ),
                }}>
                  <MD text={msg.text} isUser={msg.role === "user"} />
                  <p style={{ fontSize: "9px", textAlign: "right", marginTop: "5px", opacity: 0.4 }}>
                    {msg.time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: "flex", alignItems: "flex-end", gap: "7px", animation: "pb-in 0.25s ease-out" }}>
                <div style={{ width: "26px", height: "26px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #1e1b4b, #312e81)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M5 4h9a5 5 0 010 10H5V4z" fill="#6366f1"/></svg>
                </div>
                <div style={{ padding: "11px 14px", borderRadius: "16px", borderBottomLeftRadius: "4px", background: "#fff", border: "1px solid rgba(226,232,240,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                  <div style={{ display: "flex", gap: "4px", padding: "1px 0" }}>
                    {[0, 1, 2].map(i => <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", animation: `pb-bounce 1.2s ease-in-out ${i * 0.18}s infinite` }} />)}
                  </div>
                  <p style={{ fontSize: "9px", color: "#94a3b8", marginTop: "3px" }}>PlaceBot is thinking…</p>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* CHIPS */}
          {stage !== S.ASK_NAME && (
            <div style={{ flexShrink: 0, padding: "9px 14px 6px", background: "#f8fafc", borderTop: "1px solid rgba(226,232,240,0.8)" }}>
              {stage === S.ASK_SKILLS && (
                <div>
                  <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px", fontWeight: "600" }}>Select your skills:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", maxHeight: "88px", overflowY: "auto" }}>
                    {SKILL_CHIPS.map(s => (
                      <button key={s} onClick={() => setSelSkills(p => p.includes(s) ? p.filter(x => x !== s) : [...p, s])}
                        style={{ padding: "4px 9px", borderRadius: "999px", fontSize: "10.5px", fontWeight: "500", cursor: "pointer", border: `1px solid ${selSkills.includes(s) ? "#6366f1" : "rgba(99,102,241,0.25)"}`, background: selSkills.includes(s) ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#fff", color: selSkills.includes(s) ? "#fff" : "#6366f1", transition: "all 0.12s" }}>
                        {selSkills.includes(s) ? `✓ ${s}` : s}
                      </button>
                    ))}
                  </div>
                  {selSkills.length > 0 && (
                    <button onClick={() => handle(selSkills.join(", "))} style={{ marginTop: "7px", width: "100%", padding: "7px", borderRadius: "9px", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <CheckCircle size={12} /> Confirm {selSkills.length} Skills
                    </button>
                  )}
                </div>
              )}

              {stage === S.ASK_ROLE && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                  {ROLE_CHIPS.map(r => (
                    <button key={r} onClick={() => handle(r)} style={{ padding: "5px 10px", borderRadius: "999px", fontSize: "10.5px", fontWeight: "500", cursor: "pointer", background: "#fff", color: "#6366f1", border: "1px solid rgba(99,102,241,0.25)", display: "flex", alignItems: "center", gap: "4px" }}>
                      <Target size={9} />{r}
                    </button>
                  ))}
                </div>
              )}

              {stage === S.ASK_COMPANIES && (
                <div>
                  <p style={{ fontSize: "10px", color: "#64748b", marginBottom: "6px", fontWeight: "600" }}>Select target companies:</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", maxHeight: "76px", overflowY: "auto" }}>
                    {COMPANY_CHIPS.map(c => (
                      <button key={c} onClick={() => setSelCompanies(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c])}
                        style={{ padding: "4px 9px", borderRadius: "999px", fontSize: "10.5px", fontWeight: "500", cursor: "pointer", border: `1px solid ${selCompanies.includes(c) ? "#6366f1" : "rgba(99,102,241,0.25)"}`, background: selCompanies.includes(c) ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#fff", color: selCompanies.includes(c) ? "#fff" : "#6366f1" }}>
                        {selCompanies.includes(c) ? `✓ ${c}` : c}
                      </button>
                    ))}
                  </div>
                  {selCompanies.length > 0 && (
                    <button onClick={() => handle(selCompanies.join(", "))} style={{ marginTop: "7px", width: "100%", padding: "7px", borderRadius: "9px", fontSize: "11.5px", fontWeight: "700", cursor: "pointer", border: "none", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: "5px" }}>
                      <Building2 size={12} /> Confirm {selCompanies.length} Companies
                    </button>
                  )}
                </div>
              )}

              {(stage === S.MAIN || stage === S.MOCK) && (
                <div style={{ display: "flex", gap: "5px", overflowX: "auto", paddingBottom: "3px" }}>
                  {MAIN_CHIPS.map(chip => (
                    <button key={chip.label} onClick={() => handle(chip.q)} style={{ display: "flex", alignItems: "center", gap: "4px", padding: "5px 11px", borderRadius: "999px", fontSize: "10.5px", fontWeight: "600", whiteSpace: "nowrap", flexShrink: 0, cursor: "pointer", background: "#fff", color: "#6366f1", border: "1px solid rgba(99,102,241,0.25)", transition: "all 0.12s" }}>
                      {chip.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* INPUT */}
          <div style={{ flexShrink: 0, padding: "9px 14px 14px", background: "#f8fafc" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "7px", padding: "9px 12px", borderRadius: "12px", background: "#ffffff", border: "1.5px solid #e2e8f0", boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "border-color 0.2s" }}>
              <input
                type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && !e.shiftKey && (e.preventDefault(), handle(input))}
                placeholder={
                  stage === S.ASK_NAME ? "Type your first name…" :
                  stage === S.ASK_SKILLS ? "Type skills or use chips above…" :
                  stage === S.ASK_ROLE ? "Type your target role…" :
                  stage === S.ASK_COMPANIES ? "Type companies or use chips above…" :
                  "Use chips above, or type any question…"
                }
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: "12.5px", color: "#334155", fontFamily: "inherit" }}
              />
              <button
                onClick={() => handle(input)}
                disabled={!input.trim() || isTyping}
                style={{ width: "32px", height: "32px", borderRadius: "9px", display: "flex", alignItems: "center", justifyContent: "center", cursor: input.trim() && !isTyping ? "pointer" : "not-allowed", border: "none", background: input.trim() && !isTyping ? "linear-gradient(135deg, #6366f1, #8b5cf6)" : "#e2e8f0", opacity: isTyping ? 0.5 : 1, transition: "all 0.15s", flexShrink: 0 }}>
                <Send size={13} color={input.trim() && !isTyping ? "#fff" : "#9ca3af"} strokeWidth={2.5} />
              </button>
            </div>
            <p style={{ textAlign: "center", fontSize: "9px", color: "#94a3b8", marginTop: "5px" }}>
              PlaceBot · Real placement data · Always improving
            </p>
          </div>
        </div>

        {/* SIDE PANEL */}
        {activePanel && (
          <div style={{
            width: "340px", flexShrink: 0, height: "min(94vh, 860px)",
            borderRadius: "20px", overflow: "hidden",
            background: "#ffffff",
            boxShadow: "0 0 0 1px rgba(99,102,241,0.12), 0 40px 80px rgba(0,0,0,0.4)",
            display: "flex", flexDirection: "column",
            animation: "pb-slideIn 0.25s ease-out",
          }}>
            {/* Panel header */}
            <div style={{
              flexShrink: 0, padding: "14px 16px",
              background: activePanel === "resume"
                ? "linear-gradient(135deg, #1e3a5f, #1e40af)"
                : "linear-gradient(135deg, #1e1b4b, #4c1d95)",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "9px" }}>
                {activePanel === "resume" ? <FileText size={16} color="#93c5fd" /> : <Heart size={16} color="#f9a8d4" />}
                <div>
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#fff", margin: 0 }}>
                    {activePanel === "resume" ? "Resume Analyzer" : "Stress Support"}
                  </p>
                  <p style={{ fontSize: "9.5px", color: activePanel === "resume" ? "#93c5fd" : "#f9a8d4", margin: 0 }}>
                    {activePanel === "resume" ? "ATS scoring + keyword gaps" : "Breathing · CBT tools · Resources"}
                  </p>
                </div>
              </div>
              <button onClick={() => setActivePanel(null)} style={{ width: "26px", height: "26px", borderRadius: "7px", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.7)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px" }}>✕</button>
            </div>

            {/* Panel content */}
            <div style={{ flex: 1, overflowY: "auto" }}>
              {activePanel === "resume" && <ResumePanel profile={profile} />}
              {activePanel === "stress" && <StressPanel />}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        @keyframes pb-bounce { 0%,60%,100%{transform:translateY(0)} 30%{transform:translateY(-5px)} }
        @keyframes pb-in { from{opacity:0;transform:translateY(7px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pb-pulse { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes pb-slideIn { from{opacity:0;transform:translateX(18px)} to{opacity:1;transform:translateX(0)} }
        @keyframes expand { from{transform:scale(0.85);opacity:0.6} to{transform:scale(1.1);opacity:1} }
        @keyframes contract { from{transform:scale(1.1);opacity:1} to{transform:scale(0.85);opacity:0.6} }
        ::-webkit-scrollbar{width:4px;height:4px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:rgba(99,102,241,0.2);border-radius:2px}
        input::placeholder{color:#94a3b8}
        select:focus{outline:none;border-color:#6366f1}
        button:active{transform:scale(0.97)}
      `}</style>
    </div>
  );
}