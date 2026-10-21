import { services } from "@/content/services";

export const mainNav = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-metiers", label: "Nos métiers", children: services.map((s) => ({ href: `/nos-metiers/${s.slug}`, label: s.navTitle, code: s.code, summary: s.summary })) },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/nos-moyens", label: "Nos moyens" },
  { href: "/contact", label: "Contact" },
] as const;

export function isActive(pathname: string | null, href: string) {
  if (!pathname) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}
