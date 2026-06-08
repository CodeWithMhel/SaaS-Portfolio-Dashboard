/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, KPI, TimelineEvent, Experience, Skill, Certification } from './types';
import avatarUrl from './assets/images/Profile.png';

export const PERSONAL_INFO = {
  name: "Romel B. Montiagodo",
  avatar: avatarUrl,
  titles: ["Junior Full-stack Developer", "UI/UX & Digital Strategy Specialist"],
  tagline: "Adaptable Junior Full-stack Developer with a background in Software Development and Network Administration. Focused on building robust, end-to-end web applications and high-performance developer dashboards with pristine UI/UX aesthetics.",
  location: "Antipolo City, Philippines",
  socials: {
    youtube: "https://youtube.com/@romelmontiagodo",
    facebook: "https://facebook.com/romel.montiagodo.1",
    linkedin: "https://linkedin.com/in/romelmontiagodo",
    instagram: "https://instagram.com/romelmontiagodo",
    tiktok: "https://tiktok.com/@romelmontiagodo"
  },
  contact: {
    email: "romelmontiagodo68@gmail.com",
    github: "https://github.com/romelmontiagodo",
    twitter: "https://twitter.com/romelmontiagodo"
  }
};

export const KPIS: KPI[] = [
  {
    id: "followers",
    label: "Total Audience Reach",
    value: "128K Followers",
    change: "+12.5% MoM",
    trend: "up",
    icon: "Users"
  },
  {
    id: "projects",
    label: "Finished Repositories",
    value: "42 Shipped Modules",
    change: "+5 this Q",
    trend: "up",
    icon: "FolderGit2"
  },
  {
    id: "clients",
    label: "System Status",
    value: "v2.0.4 - stable",
    change: "Online Node",
    trend: "up",
    icon: "Briefcase"
  },
  {
    id: "videos",
    label: "Platform Ingress",
    value: "100% Core Load",
    change: "Optimizing State",
    trend: "up",
    icon: "Activity"
  }
];

export const TRAFFIC_DATA = [
  { month: "Jan", visitors: 3500, pageViews: 10200 },
  { month: "Feb", visitors: 4800, pageViews: 12500 },
  { month: "Mar", visitors: 7900, pageViews: 18400 },
  { month: "Apr", visitors: 10400, pageViews: 28000 },
  { month: "May", visitors: 14100, pageViews: 37200 },
  { month: "Jun", visitors: 19400, pageViews: 48000 }
];

export const SOCIAL_GROWTH_DATA = [
  { month: "Jan", youtube: 32000, linkedin: 14000 },
  { month: "Feb", youtube: 38000, linkedin: 18000 },
  { month: "Mar", youtube: 49000, linkedin: 24000 },
  { month: "Apr", youtube: 64000, linkedin: 31000 },
  { month: "May", youtube: 81000, linkedin: 42000 },
  { month: "Jun", youtube: 98000, linkedin: 51200 }
];

export const PORTFOLIO_VIEWS_DATA = [
  { week: "Wk 1", aiProjects: 1000, webApps: 800, automations: 1200 },
  { week: "Wk 2", aiProjects: 1400, webApps: 1000, automations: 1600 },
  { week: "Wk 3", aiProjects: 1900, webApps: 1200, automations: 2100 },
  { week: "Wk 4", aiProjects: 2600, webApps: 1550, automations: 2840 }
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    name: "Steel Rolling Mill Simulator",
    category: "AI Projects",
    description: "A high-fidelity industrial simulation modeling the end-to-end production process of steel rebar. Implements a 7-stage heating, roughing, sizing, QA check, and sales pipeline. Features real-time industrial telemetry, Quality Radar Charts, and integrated Gemini AI for metallurgical analysis of Carbon/Manganese compositions.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    techStack: ["React 19", "TypeScript", "Gemini AI API", "Tailwind CSS", "Framer Motion"],
    liveLink: "https://steel-simulator.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/steel-rolling-mill",
    featured: true
  },
  {
    id: "project-2",
    name: "DevLogix Command Center (v2.0.4 Stable)",
    category: "Web Development",
    description: "A premium service infrastructure dashboard and project management suite designed for high-level operational visibility. Implements a Kanban-style organizational layout, automated activity log, CSV reporting exports, and real-time weighted health scoring based on milestones, tasks, and dependencies.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    techStack: ["React", "TypeScript", "Lucide React", "Framer Motion", "Node.js"],
    liveLink: "https://devlogix-command.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/devlogix-command-center",
    featured: true
  },
  {
    id: "project-3",
    name: "Dental Management & Patient Portal",
    category: "AI Projects",
    description: "A comprehensive cloud clinics manager bridging healthcare administration with client-facing patient portal controls. Includes patient Google authentication dashboard, clinic appointments scheduler, automated HTML patient email triggers, and a custom Gemini-powered chat assistant named Doc Gab answering clinic policies 24/7.",
    image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80",
    techStack: ["Node.js", "Express", "Firebase Storage", "React", "Resend API", "Gemini SDK"],
    liveLink: "https://dental-portal.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/dental-management-system",
    featured: true
  },
  {
    id: "project-4",
    name: "ArchitectAI: 3D House Designer",
    category: "Web Development",
    description: "An interactive tool for transforming 2D floorplans and layouts into immersive 3D residential models. Features a real-time reactive 3D rendering engine, toggleable roof architecture stylers (Flat, Gabled, Hip), window elevate systems, and instant volumetric property calculations.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    techStack: ["Three.js", "@react-three/fiber", "React 19", "Tailwind CSS"],
    liveLink: "https://architect-3d.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/architect-3d-designer",
    featured: false
  },
  {
    id: "project-5",
    name: "Bible Trivia Challenge",
    category: "AI Projects",
    description: "An educational trivia engine testing scriptural content through interactive gameplay. Leverages custom Google Gemini 1.5 Flash client-side APIs to dynamically generate categorized multiple-choice questions, tracks browser scores on LocalStorage, and publishes rankings to a global leaderboard.",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=800&q=80",
    techStack: ["React 19", "Node.js", "Express", "Gemini SDK", "Framer Motion"],
    liveLink: "https://bible-trivia.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/bible-trivia-challenge",
    featured: false
  },
  {
    id: "project-6",
    name: "DevLogix E-commerce (Collectibles)",
    category: "Web Development",
    description: "A high-end collectibles trading and e-commerce layout built for tracking limited-edition action figures. Supports multiple specification matrix checkers (comparing up to 4 items simultaneously), automated discount codes resolver, and live order processing progress workflows.",
    image: "https://images.unsplash.com/photo-1608889174639-414d9f692d8e?auto=format&fit=crop&w=800&q=80",
    techStack: ["React 19", "Tailwind CSS", "Gemini AI API", "Lucide React"],
    liveLink: "https://collectibles-market.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/devlogix-ecommerce",
    featured: false
  },
  {
    id: "project-7",
    name: "Lead Funnel & Relational CRM",
    category: "Automation Systems",
    description: "A robust promotional funnel tracker converting web visitors into relational SQL customer leads. Contains highly responsive high-conversion visual capture forms, automated relational schemas logs, and an administrator dashboard enabling businesses to inspect customer leads real-time.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    techStack: ["HTML5", "CSS3", "JavaScript", "PHP", "SQL RDBMS", "Node.js"],
    liveLink: "https://leadgen-crm.romel.dev",
    githubLink: "https://github.com/romelmontiagodo/lead-generation-crm",
    featured: false
  },
  {
    id: "project-8",
    name: "Case Study: Packages & Dependency Triage",
    category: "Case Studies",
    description: "An analytical engineering digest detailing the step-by-step triage of client-facing web application dependencies. Highlights resolving severe Webpack blockages, updating browserslist configuration blocks, and maintaining package integrity locks without code regressions.",
    image: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?auto=format&fit=crop&w=800&q=80",
    techStack: ["NPM Security", "Browserslist Tuning", "Audit Resolution", "Stable Deployment"],
    liveLink: "https://blog.romel.dev/dependency-triage",
    featured: false
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: "event-1",
    date: "June 2026",
    title: "Completed Associate Degree",
    text: "Received Associate in Software Development with Network Administration from Teksquad Institute of Information Technology.",
    icon: "Briefcase",
    category: "career"
  },
  {
    id: "event-2",
    date: "March 2026",
    title: "Earned Google Ads & AI Shopping Ads License",
    text: "Officially certified in advanced creative advertising strategies, campaign management, and generative AI features.",
    icon: "Award",
    category: "achievement"
  },
  {
    id: "event-3",
    date: "March 2026",
    title: "Deployed DevLogix Stable Build",
    text: "Completed DevLogix Core System v2.0.4 stable, implementing kanban-style management and dynamic performance scoring.",
    icon: "Rocket",
    category: "launch"
  },
  {
    id: "event-4",
    date: "February 2026",
    title: "Cybersecurity & C++ Credentials",
    text: "Validated skills in network hygiene, logical formulation, C++ structures, and systems safety via Cisco Academy.",
    icon: "Award",
    category: "achievement"
  }
];

export const EXPERIENCE_HISTORY: Experience[] = [
  {
    id: "exp-1",
    company: "DevLogix Core System",
    position: "Lead Developer (Project Focus)",
    duration: "March 2026",
    description: [
      "Architected and maintained a service infrastructure dashboard (Build v2.0.4 stable) using React and TypeScript.",
      "Implemented a Kanban-style organizational layout to manage categorized data and system tools efficiently.",
      "Designed a high-contrast 'dark mode' interface featuring glowing visual elements and custom hex-coded backgrounds (#050507).",
      "Managed system-wide dependency maintenance, including Browserslist and Caniuse-lite updates, to ensure cross-browser stability."
    ],
    logoBg: "bg-blue-600"
  },
  {
    id: "exp-2",
    company: "Teksquad Institute Partnership",
    position: "On-the-Job Trainee (OJT)",
    duration: "2025 - 2026",
    description: [
      "Applied academic knowledge of Logic Formulation and System Design to real-world technical troubleshooting.",
      "Assisted in network configuration and office suite management to support institutional operations.",
      "Tested database parameters and coordinated system optimization layouts for administration networks."
    ],
    logoBg: "bg-emerald-600"
  },
  {
    id: "exp-3",
    company: "Client-Connect-Hub & Funnels",
    position: "Full Stack Developer",
    duration: "2024 - Present",
    description: [
      "Architected high-conversion landing pages focusing on modern UI/UX aesthetics using HTML, CSS, and JS.",
      "Designed RDBMS (SQL) schemas to store and organize lead data for business tracking and automated notifications.",
      "Created a centralized dashboard allowing business owners to view and manage potential customer data in real-time."
    ],
    logoBg: "bg-zinc-800"
  }
];

export const SKILLS: Skill[] = [
  { name: "React (Hooks, Setup, Router)", level: 92, category: "Frontend" },
  { name: "TypeScript & State Engines", level: 85, category: "Frontend" },
  { name: "Tailwind CSS & Glassmorphism", level: 94, category: "Frontend" },
  { name: "HTML5 / CSS3 Grid Layouts", level: 95, category: "Frontend" },
  
  { name: "Node.js & Express Servers", level: 88, category: "Backend & System" },
  { name: "Python Scripting & Logics", level: 82, category: "Backend & System" },
  { name: "PHP Base Rendering", level: 80, category: "Backend & System" },
  { name: "RDBMS Database Layouts (SQL)", level: 86, category: "Backend & System" },

  { name: "Logic Formulation", level: 92, category: "AI & Machine Learning" },
  { name: "Gemini Chatbot Integrations", level: 88, category: "AI & Machine Learning" },
  { name: "API Architectures (Resend, Maps)", level: 90, category: "AI & Machine Learning" },
  { name: "AI-Powered Shopping Setup", level: 85, category: "AI & Machine Learning" },

  { name: "Git / GitHub & Security", level: 90, category: "Tools & Workflows" },
  { name: "Network Config & SysOps", level: 84, category: "Tools & Workflows" },
  { name: "Canva Prototyping & Layout", level: 88, category: "Tools & Workflows" },
  { name: "Lead Generation & SEO", level: 92, category: "Tools & Workflows" }
];

export const CERTIFICATIONS: Certification[] = [
  { id: "cert-1", name: "Google Ads Creative & AI-Powered Shopping Ads", issuer: "Google Partner Team", date: "Licensed March 2026" },
  { id: "cert-2", name: "JavaScript & Python Essentials 1 & 2", issuer: "Cisco Networking Academy", date: "Issued 2026" },
  { id: "cert-3", name: "Digital Marketing & Tech VA Certification", issuer: "Tech Sphere VA", date: "Licensed 2026" },
  { id: "cert-4", name: "C++ Essentials & Introduction to Cybersecurity", issuer: "Cisco Networking Academy", date: "Issued Feb 2026" }
];

export const RECENT_AWARDS = [
  { id: "award-1", title: "Top Software OJT Trainee", issuer: "Teksquad Institute Partnership", date: "2026" },
  { id: "award-2", title: "Dean's List / Academic Excellence", issuer: "Teksquad Institute of IT", date: "2025" }
];

export const SPEAKING_ENGAGEMENTS = [
  { id: "speak-1", eventName: "Teksquad Technical Meetup", topic: "Transitioning to Full Stack with Node & React", location: "Antipolo City" },
  { id: "speak-2", eventName: "Tech Sphere VA Summit", topic: "Automating Client Communication Workflows", location: "Virtual" }
];
