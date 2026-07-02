import { Github, Linkedin, Twitter, Dribbble, Mail } from "lucide-react";
import type { SocialLink } from "@/lib/data";

const ICONS = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  dribbble: Dribbble,
  mail: Mail,
} as const;

export function SocialIcon({
  icon,
  className,
}: {
  icon: SocialLink["icon"];
  className?: string;
}) {
  const Icon = ICONS[icon];
  return <Icon className={className} aria-hidden />;
}
