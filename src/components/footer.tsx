import Image from "next/image";
import Link from "next/link";
import { ContactDetails } from "@/components/ui";
import { site } from "@/config/site";
import { categories } from "@/content/catalogue";
import { services } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import logoNegatif from "../../public/brand/engine-house-logo-negatif.png";

const companyLinks = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/nos-metiers", label: "Tous nos métiers" },
  { href: "/catalogue", label: "Tout le catalogue" },
  { href: "/galerie", label: "Galerie" },
  { href: "/nos-moyens", label: "Nos moyens" },
  { href: "/garanties-et-livraison", label: "Garanties et livraison" },
  { href: "/contact", label: "Contact" },
  { href: quoteHref(), label: "Demander un devis" },
];

function FooterColumn({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-signal">{title}</h2>
      <ul className="mt-5 space-y-2.5">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="text-[0.95rem] text-steel-300 transition-colors hover:text-bone">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-bone">
      <div aria-hidden="true" className="h-1.5 bg-[repeating-linear-gradient(135deg,var(--color-signal)_0_14px,var(--color-ink)_14px_28px)]" />
      <div className="container-eh grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {/* Version négative du logo (fond transparent, noir passé en blanc, jaune d’origine conservé). */}
          <Link href="/" className="inline-block" aria-label="Engine House Import Export — accueil">
            <Image src={logoNegatif} alt="" className="h-16 w-auto" sizes="140px" />
          </Link>
          <p className="mt-6 max-w-sm text-[0.95rem] text-steel-300">
            Maintenance d’engins, reconditionnement d’organes majeurs et fourniture de composants pour le BTP, le
            terrassement, les mines et les carrières.
          </p>
          <div className="mt-8">
            <ContactDetails compact />
          </div>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <FooterColumn
            title="Nos métiers"
            links={services.map((s) => ({ href: `/nos-metiers/${s.slug}`, label: s.title }))}
          />
          <FooterColumn
            title="Catalogue"
            links={categories.map((c) => ({ href: `/catalogue/${c.slug}`, label: c.title }))}
          />
          <FooterColumn title="Entreprise" links={companyLinks} />
        </div>
      </div>
      <div className="border-t border-bone/10">
        <div className="container-eh flex flex-col gap-3 py-6 text-xs text-steel-400 md:flex-row md:items-center md:justify-between">
          <p>
            © {site.legalName}. Les marques citées appartiennent à leurs propriétaires respectifs et servent uniquement à
            identifier les engins sur lesquels nous intervenons.
          </p>
          <ul className="flex shrink-0 flex-wrap gap-x-5 gap-y-1">
            <li>
              <Link href="/politique-de-confidentialite" className="hover:text-bone">
                Politique de confidentialité
              </Link>
            </li>
            <li>
              <Link href="/credits-photos" className="hover:text-bone">
                Crédits photos
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
