// All site content lives here. Edit these values to update the page.

export interface Stat { value: string; label: string; }
export interface Project {
  title: string;
  category: 'web' | 'mobile';
  role: string;
  description: string;
  stats: Stat[];
  tech: string[];
  /** Screenshot in /public, e.g. 'projects/ashiri.webp'. */
  image?: string;
  liveUrl?: string;
  repoUrl?: string;
}
export interface Job {
  period: string;
  location: string;
  role: string;
  company: string;
  summary: string;
  achievements: string[];
  tech: string[];
}
export interface Testimonial { quote: string; name: string; title: string; project: string; }
export interface Faq { category: string; question: string; answer: string; }

export const profile = {
  name: 'Ogundipe Daniel',
  fullName: 'Ogundipe Daniel',
  initial: 'OD',
  role: 'Full-Stack Developer',
  shortRole: 'Full-Stack',
  headline: { lead: 'Building', accent: 'Secure, Scalable', tail: 'Web Products.' },
  tagline:
    'Full-stack developer with 5+ years of experience shipping fintech, blockchain and edtech products with React, Node.js and the cloud.',
  photo: 'me.jpg',
  cvUrl: 'cv.pdf',
  cvFileName: 'Ogundipe-Daniel-Resume.pdf',
  email: 'ogundipe.daniel@outlook.com',
  phone: '+234 913 258 8749',
  replyNote: 'I usually reply within 24 hours.',
  badge: { title: 'Full-Stack Developer', sub: 'React · Node.js · AWS' },
  highlight: { label: 'Experience', value: '5+', title: 'Years Building', sub: 'Fintech, blockchain & edtech' },
  coreStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'AWS'],
  metric: { value: '1,000+', label: 'Daily blockchain events handled' },
  // Shown in the contact section at the bottom of the page.
  socials: [
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/daniel-ogundipe-ab620a318/' },
    { label: 'WhatsApp', url: 'https://wa.me/2349132588749' },
  ],
  skills: [
    'React', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
    'MongoDB', 'AWS', 'GCP', 'Tailwind CSS', 'Vue', 'GraphQL', 'Python',
  ],
};

// Options in the "Let's Connect" pop-up. icon is one of: whatsapp, linkedin, email.
export const contacts = [
  { label: 'WhatsApp', sub: 'Quick chat on WhatsApp', url: 'https://wa.me/2349132588749', icon: 'whatsapp', color: '#25d366' },
  { label: 'LinkedIn', sub: 'Connect professionally', url: 'https://www.linkedin.com/in/daniel-ogundipe-ab620a318/', icon: 'linkedin', color: '#0a66c2' },
  { label: 'Email', sub: 'Send a direct email', url: 'mailto:ogundipe.daniel@outlook.com', icon: 'email', color: '#ea4335' },
];

export const clients = ['TRICODE PRO', 'AGERU', 'NITHUB', 'HNG TECH', 'UNILAG'];

export const strengths = [
  {
    title: 'Full-stack delivery',
    text: 'From MongoDB and Supabase schemas to Express APIs and React interfaces, I build and ship complete features end to end.',
    icon: '⚡',
  },
  {
    title: 'Security-minded',
    text: 'AWS Cognito auth, Row-Level Security policies, input sanitisation against XSS, and UI flows that make transactions transparent.',
    icon: '🔒',
  },
  {
    title: 'Fast & accessible',
    text: 'Lazy loading and lean bundles for sub-3s load times, built to WCAG 2.1 AA with keyboard navigation and semantic HTML.',
    icon: '🚀',
  },
];

// "Beyond Engineering" cards shown between the strengths and projects sections.
export const beyond = {
  eyebrow: 'Beyond Engineering',
  heading: 'Clean Code. Built to Scale.',
  connect: {
    title: "Let's Connect",
    text: "Have a project in mind? Let's talk about how I can help you build and ship it.",
  },
  fullstack: {
    title: 'Full-Stack + Cloud',
    text: 'From React interfaces to Node.js APIs on AWS and GCP. I build and ship features end to end.',
  },
  highlight: {
    title: 'Fintech & Blockchain',
    text: 'Secure wallet flows, real-time transaction dashboards and blockchain asset management.',
    tag: 'SUI · Real-time',
  },
};

export const projects: Project[] = [
  {
    title: 'Zora Streams',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'Discover movies, TV and anime with a personal "For You" feed, plus live scores across 10 sports.',
    stats: [
      { value: 'For You', label: 'Personal feed' },
      { value: '10', label: 'Sports live' },
      { value: 'TMDB', label: 'Movie data' },
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
    image: 'projects/zora.jpg',
    liveUrl: 'https://zorastreams.vercel.app/auth/login',
    repoUrl: 'https://github.com/stilldaniel/Moviehub',
  },
  {
    title: 'Triage System',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'Upload a lead list and it cleans, deduplicates and scores every lead, then ranks who to contact first.',
    stats: [
      { value: '495', label: 'Leads ranked' },
      { value: '5', label: 'Scoring signals' },
      { value: 'CSV', label: 'In & out' },
    ],
    tech: ['Next.js', 'TypeScript', 'Papa Parse'],
    image: 'projects/triage.webp',
    liveUrl: 'https://triage-system-taupe.vercel.app/',
    repoUrl: 'https://github.com/stilldaniel/Triage-system',
  },
  {
    title: 'HatsOFFWears',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'An online store for a streetwear brand, with collection pages, product listings and a shopping cart.',
    stats: [
      { value: 'Live', label: 'Storefront' },
      { value: 'Shop', label: 'Collections' },
      { value: 'Cart', label: 'Shopping' },
    ],
    tech: ['React', 'Vite'],
    image: 'projects/hatsoffwears.webp',
    liveUrl: 'https://www.hatoffwears.com/',
  },
  {
    title: 'Ashiri',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'An e-commerce store for an artisanal tank-top brand, with reviews, a community gallery and an admin dashboard.',
    stats: [
      { value: 'Admin', label: 'Dashboard' },
      { value: 'Reviews', label: '& gallery' },
      { value: 'Emails', label: 'Resend' },
    ],
    tech: ['React', 'Vite', 'Supabase', 'Recharts', 'Resend'],
    image: 'projects/ashiri.webp',
    liveUrl: 'https://ashiri.store/',
    repoUrl: 'https://github.com/Mammoman/Ashiri',
  },
  {
    title: 'Subscription Auditor',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'Finds recurring charges, forgotten "zombie" subscriptions and price hikes in your bank statements.',
    stats: [
      { value: 'Zombie', label: 'Subs detected' },
      { value: 'CSV/PDF', label: 'Import' },
      { value: 'Tested', label: 'Engine' },
    ],
    tech: ['Next.js', 'TypeScript', 'Prisma', 'Postgres', 'Recharts', 'Vitest'],
    image: 'projects/subscription-auditor.webp',
    liveUrl: 'https://subscription-auditor-iota.vercel.app/login',
    repoUrl: 'https://github.com/Mammoman/subscription-auditor',
  },
  {
    title: 'AlgeFox',
    category: 'web',
    role: 'Full-Stack Developer',
    description:
      'A gamified maths app that teaches algebra and fractions through quizzes, XP, streaks and a leaderboard.',
    stats: [
      { value: 'XP', label: '& streaks' },
      { value: 'Quizzes', label: 'Learning path' },
      { value: 'Ranked', label: 'Leaderboard' },
    ],
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Zustand', 'Framer Motion'],
    image: 'projects/algefox.webp',
    liveUrl: 'https://algefox.vercel.app/',
    repoUrl: 'https://github.com/stilldaniel/algefox',
  },
];

export const jobs: Job[] = [
  {
    period: 'Jan 2025 — Present',
    location: 'Remote',
    role: 'Frontend Engineer',
    company: 'Tricode Pro',
    summary:
      'Architected the frontend for the SUI Lockup App, a blockchain asset management platform, with a scalable component architecture and Redux state patterns.',
    achievements: [
      'Integrated AWS Cognito authentication and GCP Pub/Sub for real-time transaction monitoring across 1,000+ daily blockchain events',
      'Implemented secure wallet interactions and a real-time asset tracking dashboard over WebSockets',
      'Designed security-focused UI workflows that improve user trust and transaction transparency',
    ],
    tech: ['React', 'TypeScript', 'Redux', 'AWS Cognito', 'GCP Pub/Sub', 'WebSockets'],
  },
  {
    period: 'Feb 2023 — Jan 2025',
    location: 'Remote',
    role: 'Frontend Developer',
    company: 'Ageru',
    summary:
      'Shipped a responsive, mobile-first restaurant website with a real-time product catalogue.',
    achievements: [
      'Reached sub-3s load times through bundle optimisation and lazy loading',
      'Implemented WCAG 2.1 AA accessibility: ARIA labels, keyboard navigation and semantic HTML',
      'Built reusable components on REST APIs with client-side filtering, sorting and secure transaction handling',
    ],
    tech: ['React', 'Tailwind CSS', 'SCSS', 'REST APIs'],
  },
  {
    period: 'Jun 2024 — Aug 2024',
    location: 'Remote',
    role: 'Frontend Developer Intern',
    company: 'HNG Tech',
    summary:
      'Built a responsive website with a product designer in a fast-paced, deadline-driven internship.',
    achievements: [
      'Implemented React Router navigation with protected routes for authenticated users',
      'Built reusable components showing real-time product data with filtering and sorting',
      'Kept layouts consistent across pages with a mobile-first Tailwind CSS and SCSS setup',
    ],
    tech: ['React', 'React Router', 'Tailwind CSS', 'SCSS'],
  },
  {
    period: 'Oct 2021 — Dec 2022',
    location: 'On-site',
    role: 'Frontend Developer',
    company: 'NITHUB',
    summary:
      'Built dynamic web applications alongside UI/UX designers, backend developers and project managers.',
    achievements: [
      'Migrated 20+ UI components from vanilla JavaScript to React, cutting code duplication by about 25%',
      'Integrated REST APIs with client-side validation and input sanitisation against XSS and injection',
      'Improved scalability and UX through iterative feedback and agile practices',
    ],
    tech: ['React', 'JavaScript', 'REST APIs'],
  },
];

// Add real quotes from people you've worked with. The Testimonials section stays hidden while this is empty.
export const testimonials: Testimonial[] = [];

export const faqs: Faq[] = [
  { category: 'General', question: 'What services do you offer?', answer: 'Full-stack web development with React, Next.js, Node.js and Express, including cloud integrations on AWS and GCP, authentication, real-time features and accessibility improvements.' },
  { category: 'General', question: 'What kinds of products have you built?', answer: 'Fintech and blockchain dashboards, edtech learning platforms, e-commerce catalogues and content discovery apps.' },
  { category: 'Process', question: 'How do you work with teams?', answer: 'I work closely with designers, backend engineers and product managers using agile practices, code reviews and clear technical documentation.' },
  { category: 'Technical', question: 'Can you work with my existing codebase?', answer: 'Yes. I have migrated legacy JavaScript to React and joined established projects. I start by reviewing the code, then improve it as I add features.' },
  { category: 'Technical', question: 'How do you approach security?', answer: 'Managed auth such as AWS Cognito, Row-Level Security on the database, input validation and sanitisation, and UI flows that keep users informed about sensitive actions.' },
  { category: 'Policy', question: 'Do you work remotely?', answer: "Yes. I have worked remotely with teams for most of my career and I am comfortable collaborating across time zones." },
];
