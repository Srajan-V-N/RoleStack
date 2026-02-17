import type { ExtractedSkills, RoundMapping, ChecklistRound, PlanDay } from './types';

const SKILL_MAP: Record<string, string[]> = {
  'Core CS': [
    'data structures', 'algorithms', 'dsa', 'oop', 'object oriented',
    'operating systems', 'os', 'dbms', 'computer networks', 'cn',
    'system design', 'design patterns', 'complexity', 'big o',
    'linked list', 'binary tree', 'graph', 'sorting', 'dynamic programming',
  ],
  Languages: [
    'java', 'python', 'c++', 'cpp', 'c#', 'javascript', 'typescript',
    'golang', 'go', 'rust', 'kotlin', 'swift', 'ruby', 'php', 'scala',
  ],
  Web: [
    'react', 'angular', 'vue', 'next.js', 'nextjs', 'node.js', 'nodejs',
    'express', 'html', 'css', 'tailwind', 'rest', 'restful', 'graphql',
    'api', 'frontend', 'backend', 'full stack', 'fullstack', 'django',
    'flask', 'spring', 'spring boot',
  ],
  Data: [
    'sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'nosql',
    'redis', 'elasticsearch', 'data modeling', 'database', 'orm',
    'machine learning', 'ml', 'deep learning', 'pandas', 'numpy',
    'tensorflow', 'pytorch', 'data science', 'analytics',
  ],
  'Cloud/DevOps': [
    'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s',
    'ci/cd', 'cicd', 'jenkins', 'terraform', 'ansible', 'linux',
    'git', 'github', 'gitlab', 'devops', 'cloud', 'microservices',
    'serverless', 'lambda',
  ],
  Testing: [
    'testing', 'unit test', 'jest', 'mocha', 'pytest', 'selenium',
    'cypress', 'tdd', 'bdd', 'qa', 'quality assurance', 'integration test',
    'e2e', 'end to end', 'test driven',
  ],
} as const;

const CATEGORY_KEY_MAP: Record<string, keyof ExtractedSkills> = {
  'Core CS': 'coreCS',
  'Languages': 'languages',
  'Web': 'web',
  'Data': 'data',
  'Cloud/DevOps': 'cloud',
  'Testing': 'testing',
};

const QUESTION_BANK: Record<string, string[]> = {
  'Core CS': [
    'Explain the difference between a stack and a queue with real-world examples.',
    'What is the time complexity of common sorting algorithms and when would you use each?',
    'Describe how a hash map works internally and how collisions are handled.',
    'Explain the concept of dynamic programming with an example problem.',
    'What are SOLID principles in object-oriented design?',
  ],
  Languages: [
    'What are the key differences between compiled and interpreted languages?',
    'Explain the concept of garbage collection and how it works.',
    'What is the difference between pass-by-value and pass-by-reference?',
    'How do closures work and when are they useful?',
    'What are generics/templates and why are they important?',
  ],
  Web: [
    'Explain the request-response lifecycle of a web application.',
    'What is the virtual DOM and how does it improve performance?',
    'Describe RESTful API design principles and best practices.',
    'How does authentication differ from authorization in web apps?',
    'What strategies would you use to optimize frontend performance?',
  ],
  Data: [
    'What is database normalization and why is it important?',
    'Explain the difference between SQL and NoSQL databases with use cases.',
    'What are database indexes and how do they improve query performance?',
    'Describe ACID properties in the context of database transactions.',
    'How would you design a database schema for an e-commerce application?',
  ],
  'Cloud/DevOps': [
    'What is containerization and how does Docker work?',
    'Explain the CI/CD pipeline and its benefits.',
    'What is the difference between horizontal and vertical scaling?',
    'Describe the microservices architecture and its trade-offs.',
    'How does container orchestration with Kubernetes work?',
  ],
  Testing: [
    'What is the testing pyramid and what does each level cover?',
    'Explain the difference between unit tests, integration tests, and e2e tests.',
    'What is test-driven development (TDD) and what are its benefits?',
    'How would you test an asynchronous function?',
    'What is mocking and when should you use it in tests?',
  ],
  General: [
    'Tell me about yourself and your preparation for this role.',
    'Why are you interested in this company and this position?',
    'Describe a challenging project you worked on and how you overcame obstacles.',
    'Where do you see yourself in 3-5 years?',
    'How do you stay updated with the latest technology trends?',
    'Describe your approach to debugging a production issue.',
    'How do you prioritize tasks when working on multiple things?',
    'What is your experience working in a team environment?',
  ],
};

const CHECKLIST_TEMPLATES: Record<string, Record<string, string[]>> = {
  'Core CS': {
    'Round 1: Online Assessment': [
      'Practice 50+ DSA problems on LeetCode/HackerRank',
      'Review time/space complexity for all common algorithms',
      'Practice array, string, and hash map problems',
      'Solve 10 dynamic programming problems',
    ],
    'Round 2: Technical Interview': [
      'Be ready to code on a whiteboard or shared editor',
      'Practice explaining your approach before coding',
      'Review common data structure operations and their complexities',
      'Prepare to discuss OOP concepts with examples',
    ],
    'Round 3: System Design': [
      'Study basic system design concepts (load balancing, caching)',
      'Practice designing a URL shortener, chat app, or news feed',
      'Understand database sharding and replication basics',
    ],
    'Round 4: HR / Behavioral': [
      'Prepare STAR-format answers for behavioral questions',
      'Research the company culture and recent news',
      'Prepare questions to ask the interviewer',
    ],
  },
  Web: {
    'Round 1: Online Assessment': [
      'Build a small project using the required framework',
      'Practice API integration and async handling',
    ],
    'Round 2: Technical Interview': [
      'Be ready to explain component lifecycle and state management',
      'Prepare to discuss REST API design and HTTP methods',
    ],
    'Round 3: System Design': [
      'Design a frontend architecture for a SPA',
      'Discuss caching strategies and CDN usage',
    ],
    'Round 4: HR / Behavioral': [
      'Showcase your portfolio or deployed projects',
      'Discuss your development workflow and tools',
    ],
  },
  Data: {
    'Round 1: Online Assessment': [
      'Practice complex SQL queries (joins, subqueries, window functions)',
      'Review database normalization and indexing',
    ],
    'Round 2: Technical Interview': [
      'Be ready to write and optimize SQL queries live',
      'Discuss trade-offs between SQL and NoSQL',
    ],
    'Round 3: System Design': [
      'Design a data pipeline or ETL workflow',
      'Discuss data modeling for analytics use cases',
    ],
    'Round 4: HR / Behavioral': [
      'Discuss data-driven projects you have worked on',
      'Explain how you ensure data quality and integrity',
    ],
  },
  General: {
    'Round 1: Online Assessment': [
      'Practice aptitude and logical reasoning questions',
      'Brush up on basic coding problems',
      'Complete 2-3 timed mock tests',
    ],
    'Round 2: Technical Interview': [
      'Review fundamentals of your primary programming language',
      'Practice explaining concepts clearly and concisely',
      'Prepare code samples from your projects',
    ],
    'Round 3: System Design': [
      'Learn basic system design vocabulary',
      'Understand client-server architecture',
      'Study basic scalability concepts',
    ],
    'Round 4: HR / Behavioral': [
      'Prepare STAR-format answers for common behavioral questions',
      'Research the company thoroughly',
      'Prepare 3-5 thoughtful questions to ask',
    ],
  },
};

const PLAN_TEMPLATES: Record<string, { day: string; focus: string; tasks: string[] }[]> = {
  'Core CS': [
    { day: 'Day 1', focus: 'Foundations Review', tasks: ['Review arrays, strings, and hash maps', 'Solve 5 easy-level DSA problems', 'Revise Big-O notation and complexity analysis'] },
    { day: 'Day 2', focus: 'Data Structures Deep Dive', tasks: ['Study linked lists, stacks, and queues', 'Solve 5 medium-level problems on these topics', 'Review tree and graph basics'] },
    { day: 'Day 3', focus: 'Algorithms & Patterns', tasks: ['Practice sorting and searching algorithms', 'Study two-pointer and sliding window techniques', 'Solve 3 dynamic programming problems'] },
    { day: 'Day 4', focus: 'OOP & System Design Basics', tasks: ['Review OOP principles with code examples', 'Study basic design patterns (Singleton, Factory, Observer)', 'Learn system design fundamentals'] },
    { day: 'Day 5', focus: 'Mock Interviews', tasks: ['Take a timed coding assessment (90 min)', 'Practice explaining solutions out loud', 'Review and optimize previous solutions'] },
    { day: 'Day 6', focus: 'Weak Areas & Projects', tasks: ['Revisit topics you struggled with', 'Prepare project walk-throughs', 'Practice behavioral questions using STAR format'] },
    { day: 'Day 7', focus: 'Final Prep', tasks: ['Take a full mock interview', 'Review company-specific information', 'Prepare questions for the interviewer', 'Rest and stay confident'] },
  ],
  Web: [
    { day: 'Day 1', focus: 'Frontend Fundamentals', tasks: ['Review HTML5 semantic elements and accessibility', 'Practice CSS layouts (Flexbox, Grid)', 'Build a responsive component from scratch'] },
    { day: 'Day 2', focus: 'JavaScript & Framework Deep Dive', tasks: ['Review JS closures, promises, and async/await', 'Study component lifecycle and hooks', 'Build a small CRUD app with your framework'] },
    { day: 'Day 3', focus: 'Backend & API', tasks: ['Review REST API design and HTTP methods', 'Practice building a simple API endpoint', 'Study authentication and middleware patterns'] },
    { day: 'Day 4', focus: 'Full Stack Integration', tasks: ['Connect frontend to a backend API', 'Handle loading states, errors, and edge cases', 'Practice state management patterns'] },
    { day: 'Day 5', focus: 'Performance & Testing', tasks: ['Study web performance optimization techniques', 'Write unit tests for your components', 'Learn about lighthouse audits and core web vitals'] },
    { day: 'Day 6', focus: 'System Design & Architecture', tasks: ['Design a frontend architecture for a large app', 'Study caching, CDN, and deployment strategies', 'Practice explaining architectural decisions'] },
    { day: 'Day 7', focus: 'Final Prep', tasks: ['Review your portfolio projects', 'Take a mock technical interview', 'Prepare behavioral answers and questions to ask'] },
  ],
  General: [
    { day: 'Day 1', focus: 'Self Assessment', tasks: ['Identify your strongest technical skills', 'List areas that need improvement', 'Set up your study environment and tools'] },
    { day: 'Day 2', focus: 'Core Concepts Review', tasks: ['Review fundamentals of your primary language', 'Practice 5 basic coding problems', 'Study common data structures overview'] },
    { day: 'Day 3', focus: 'Problem Solving Practice', tasks: ['Solve 5 easy-medium coding problems', 'Practice writing clean, readable code', 'Review solutions and learn optimal approaches'] },
    { day: 'Day 4', focus: 'Project Preparation', tasks: ['Choose 2 projects to discuss in interviews', 'Prepare technical walk-throughs for each', 'Document challenges faced and solutions found'] },
    { day: 'Day 5', focus: 'Mock Assessment', tasks: ['Take a full timed mock test', 'Review incorrect answers thoroughly', 'Identify remaining weak areas'] },
    { day: 'Day 6', focus: 'Company Research & Soft Skills', tasks: ['Research target company thoroughly', 'Prepare STAR-format behavioral answers', 'Practice communication and presentation skills'] },
    { day: 'Day 7', focus: 'Final Review', tasks: ['Do a light review of key concepts', 'Prepare your interview day logistics', 'Rest well and build confidence'] },
  ],
};

const KNOWN_ENTERPRISES = [
  'amazon', 'google', 'microsoft', 'apple', 'meta', 'infosys', 'tcs', 'wipro',
  'hcl', 'cognizant', 'accenture', 'ibm', 'oracle', 'sap', 'deloitte',
  'capgemini', 'tech mahindra', 'ltimindtree', 'flipkart', 'walmart',
  'goldman sachs', 'jp morgan', 'morgan stanley', 'adobe', 'salesforce',
  'cisco', 'intel', 'samsung', 'qualcomm', 'paypal', 'uber', 'airbnb', 'netflix',
];

export function getCompanyIntel(
  company: string,
  _skills: ExtractedSkills,
): { name: string; industry: string; sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise'; sizeLabel: string; hiringFocus: string } {
  const normalized = company.trim().toLowerCase();

  const sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise' = KNOWN_ENTERPRISES.includes(normalized)
    ? 'Enterprise'
    : 'Startup';

  const sizeLabel = sizeCategory === 'Enterprise' ? 'Enterprise (2000+)' : 'Startup (1-200)';

  let industry = 'Technology Services';
  if (/bank|financial|capital|goldman|morgan|jp\s?morgan/.test(normalized)) {
    industry = 'Financial Services';
  } else if (/health|pharma/.test(normalized)) {
    industry = 'Healthcare';
  }

  const hiringFocus = sizeCategory === 'Enterprise'
    ? 'Structured DSA rounds + core CS fundamentals. Expect aptitude screening, multiple technical rounds, and HR.'
    : 'Practical problem-solving + stack depth. Expect hands-on coding tasks, system design discussions, and culture fit.';

  return { name: company.trim(), industry, sizeCategory, sizeLabel, hiringFocus };
}

export function generateRoundMapping(
  sizeCategory: 'Startup' | 'Mid-size' | 'Enterprise',
  skills: ExtractedSkills,
): RoundMapping[] {
  const hasDSA = skills.coreCS.length > 0;
  const hasWeb = skills.web.length > 0;

  if (sizeCategory === 'Enterprise' && hasDSA) {
    return [
      { roundTitle: 'Round 1: Online Test', focusAreas: ['DSA', 'Aptitude'], whyItMatters: 'Companies use this round to filter candidates on problem-solving speed and accuracy.' },
      { roundTitle: 'Round 2: Technical', focusAreas: ['DSA', 'Core CS'], whyItMatters: 'This round tests depth of understanding in data structures, algorithms, and CS fundamentals.' },
      { roundTitle: 'Round 3: Tech + Projects', focusAreas: ['System Design', 'Project Discussion'], whyItMatters: 'Interviewers assess your ability to design systems and discuss real projects in depth.' },
      { roundTitle: 'Round 4: HR', focusAreas: ['Behavioral', 'Culture Fit'], whyItMatters: 'The HR round evaluates communication skills, culture alignment, and long-term motivation.' },
    ];
  }

  if (sizeCategory === 'Enterprise' && hasWeb && !hasDSA) {
    return [
      { roundTitle: 'Round 1: Online Test', focusAreas: ['Coding', 'Aptitude'], whyItMatters: 'Companies use this round to filter candidates on problem-solving speed and accuracy.' },
      { roundTitle: 'Round 2: Technical', focusAreas: ['Frontend/Backend Fundamentals'], whyItMatters: 'This round evaluates your understanding of web technologies and frameworks.' },
      { roundTitle: 'Round 3: System Design', focusAreas: ['Architecture Discussion'], whyItMatters: 'Interviewers assess your ability to reason about scalable web architectures.' },
      { roundTitle: 'Round 4: HR', focusAreas: ['Behavioral', 'Culture Fit'], whyItMatters: 'The HR round evaluates communication skills, culture alignment, and long-term motivation.' },
    ];
  }

  if (sizeCategory === 'Enterprise') {
    return [
      { roundTitle: 'Round 1: Online Test', focusAreas: ['Coding', 'Aptitude'], whyItMatters: 'Companies use this round to filter candidates on problem-solving speed and accuracy.' },
      { roundTitle: 'Round 2: Technical', focusAreas: ['Core Concepts', 'Problem Solving'], whyItMatters: 'This round tests fundamental understanding and your ability to solve problems under pressure.' },
      { roundTitle: 'Round 3: Tech + Projects', focusAreas: ['Project Discussion', 'Domain Knowledge'], whyItMatters: 'Interviewers want to see real-world application of your skills through projects.' },
      { roundTitle: 'Round 4: HR', focusAreas: ['Behavioral', 'Culture Fit'], whyItMatters: 'The HR round evaluates communication skills, culture alignment, and long-term motivation.' },
    ];
  }

  if (sizeCategory === 'Mid-size') {
    return [
      { roundTitle: 'Round 1: Online Assessment', focusAreas: ['Coding', 'Aptitude'], whyItMatters: 'Mid-size companies use online assessments to efficiently screen a large applicant pool.' },
      { roundTitle: 'Round 2: Technical Interview', focusAreas: ['Core concepts', 'Project discussion'], whyItMatters: 'This round combines technical depth with practical experience evaluation.' },
      { roundTitle: 'Round 3: HR / Managerial', focusAreas: ['Behavioral', 'Team Fit'], whyItMatters: 'This round assesses your collaboration skills and alignment with team culture.' },
    ];
  }

  // Startup
  return [
    { roundTitle: 'Round 1: Practical Coding', focusAreas: ['Hands-on coding task'], whyItMatters: 'Startups prioritize builders — this round tests if you can ship working code quickly.' },
    { roundTitle: 'Round 2: System Discussion', focusAreas: ['Architecture', 'Stack-specific questions'], whyItMatters: 'Startups need engineers who can reason about the full stack and make pragmatic trade-offs.' },
    { roundTitle: 'Round 3: Culture Fit', focusAreas: ['Team fit', 'HR'], whyItMatters: 'In small teams, culture fit matters as much as technical skill.' },
  ];
}

export function extractSkills(jdText: string): ExtractedSkills {
  const text = jdText.toLowerCase();
  const result: ExtractedSkills = {
    coreCS: [], languages: [], web: [], data: [], cloud: [], testing: [], other: [],
  };

  for (const [category, keywords] of Object.entries(SKILL_MAP)) {
    const matched = keywords.filter((kw) => text.includes(kw));
    if (matched.length > 0) {
      const key = CATEGORY_KEY_MAP[category];
      if (key) {
        result[key] = [...new Set(matched)];
      }
    }
  }

  const hasAny = result.coreCS.length > 0 || result.languages.length > 0 ||
    result.web.length > 0 || result.data.length > 0 ||
    result.cloud.length > 0 || result.testing.length > 0;

  if (!hasAny) {
    result.other = ['Communication', 'Problem solving', 'Basic coding', 'Projects'];
  }

  return result;
}

export function computeReadinessScore(
  skills: ExtractedSkills,
  company: string,
  role: string,
  jdText: string,
): number {
  let score = 35;

  const categoryCount = (['coreCS', 'languages', 'web', 'data', 'cloud', 'testing'] as const)
    .filter((k) => skills[k].length > 0).length;
  score += Math.min(categoryCount * 5, 30);

  if (company.trim().length > 0) score += 10;
  if (role.trim().length > 0) score += 10;
  if (jdText.length > 800) score += 10;

  return Math.min(score, 100);
}

export function generateChecklist(
  skills: ExtractedSkills,
): ChecklistRound[] {
  const rounds: Record<string, string[]> = {
    'Round 1: Online Assessment': [],
    'Round 2: Technical Interview': [],
    'Round 3: System Design': [],
    'Round 4: HR / Behavioral': [],
  };

  // Map typed keys to template keys
  const keyToTemplate: Record<keyof ExtractedSkills, string> = {
    coreCS: 'Core CS',
    languages: 'Core CS',
    web: 'Web',
    data: 'Data',
    cloud: 'Core CS',
    testing: 'Core CS',
    other: 'General',
  };

  const activeKeys = (Object.keys(skills) as (keyof ExtractedSkills)[])
    .filter((k) => skills[k].length > 0);

  for (const key of activeKeys) {
    const templateKey = keyToTemplate[key];
    const template = CHECKLIST_TEMPLATES[templateKey] ?? CHECKLIST_TEMPLATES['General'];
    for (const [round, items] of Object.entries(template)) {
      if (rounds[round]) {
        rounds[round].push(...items);
      }
    }
  }

  // If only other matched, use General
  if (activeKeys.length === 1 && activeKeys[0] === 'other') {
    const template = CHECKLIST_TEMPLATES['General'];
    for (const [round, items] of Object.entries(template)) {
      if (rounds[round]) {
        rounds[round] = items;
      }
    }
  }

  return Object.entries(rounds).map(([roundTitle, items]) => ({
    roundTitle,
    items: [...new Set(items)].slice(0, 8),
  }));
}

export function generatePlan(
  skills: ExtractedSkills,
): PlanDay[] {
  if (skills.web.length > 0) return PLAN_TEMPLATES['Web'];
  if (skills.coreCS.length > 0) return PLAN_TEMPLATES['Core CS'];
  return PLAN_TEMPLATES['General'];
}

export function generateQuestions(skills: ExtractedSkills): string[] {
  const questions: string[] = [];

  // Map typed keys to question bank keys
  const keyToBank: Record<keyof ExtractedSkills, string> = {
    coreCS: 'Core CS',
    languages: 'Languages',
    web: 'Web',
    data: 'Data',
    cloud: 'Cloud/DevOps',
    testing: 'Testing',
    other: 'General',
  };

  const activeKeys = (Object.keys(skills) as (keyof ExtractedSkills)[])
    .filter((k) => skills[k].length > 0);

  for (const key of activeKeys) {
    const bankKey = keyToBank[key];
    const bank = QUESTION_BANK[bankKey];
    if (bank) {
      questions.push(...bank.slice(0, Math.ceil(10 / activeKeys.length)));
    }
  }

  // Pad with general questions to reach 10
  if (questions.length < 10) {
    const general = QUESTION_BANK['General'];
    for (const q of general) {
      if (questions.length >= 10) break;
      if (!questions.includes(q)) questions.push(q);
    }
  }

  return [...new Set(questions)].slice(0, 10);
}
