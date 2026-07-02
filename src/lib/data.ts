/**
 * All portfolio content lives in ./data.json — edit that file to change copy,
 * projects, images, links, etc. This module only adds types + helpers on top.
 */
import rawData from "./data.json";

export type ProjectCategory = "Real Project" | "Exploration";

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  /** Short blurb used on the work cards. */
  description: string;
  /** Longer, structured write-up shown on the detail page. */
  overview: string;
  challenge: string;
  solution: string;
  /** Bullet-point feature/result highlights. */
  highlights: string[];
  tags: string[];
  studio: string;
  year: string;
  role: string;
  stack: string[];
  /** Accent used for the placeholder gradient + detail hero. */
  accent: string;
  /** Cover image (path under /public). */
  image: string;
  /** Additional screenshots for the detail gallery. */
  gallery: string[];
  /** Live/hosted deployment — enables the "View Project" button when set. */
  liveUrl: string | null;
  /** Public source repository, if any. */
  repoUrl: string | null;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
}

export interface Service {
  title: string;
  description: string;
  meta: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "twitter" | "dribbble" | "mail";
}

export interface Person {
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  yearsExperience: string;
  available: boolean;
  email: string;
}

export interface NavLink {
  label: string;
  href: string;
  count: string | null;
}

interface PortfolioData {
  person: Person;
  navLinks: NavLink[];
  socials: SocialLink[];
  services: Service[];
  experiences: Experience[];
  projects: Project[];
}

const data = rawData as PortfolioData;

export const person = data.person;
export const navLinks = data.navLinks;
export const socials = data.socials;
export const services = data.services;
export const experiences = data.experiences;
export const projects = data.projects;

export function getProject(id: string): Project | undefined {
  return projects.find((project) => project.id === id);
}
