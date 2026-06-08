/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Project {
  id: string;
  name: string;
  category: 'AI Projects' | 'Web Development' | 'Automation Systems' | 'Case Studies';
  description: string;
  image: string;
  techStack: string[];
  liveLink?: string;
  githubLink?: string;
  featured: boolean;
}

export interface KPI {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  text: string;
  icon: string;
  category: 'achievement' | 'launch' | 'career' | 'event';
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string[];
  logoBg: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'AI & Machine Learning' | 'Frontend' | 'Backend & System' | 'Tools & Workflows';
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  link?: string;
}
