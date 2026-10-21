import Image from "next/image";
import Link from "next/link";
import { ContactDetails } from "@/components/ui";
import { site } from "@/config/site";
import { categories } from "@/content/catalogue";
import { services } from "@/content/services";
import { quoteHref } from "@/lib/quote";
import logo from "../../public/brand/engine-house-logo.png";

const companyLinks = [
  { href: "/a-propos", label: "À propos" },
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
          {/* Le logo fourni a un fond blanc : il est présenté sur une plaque claire. */}
          <Link href="/" className="inline-block bg-white p-4" aria-label="Engine House Import Export — accueil">
            <Image src={logo} alt="" className="h-14 w-auto" sizes="130px" />
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
          <Link href="/politique-de-confidentialite" className="shrink-0 hover:text-bone">
            Politique de confidentialité
          </Link>
        </div>
      </div>
    </footer>
  );
}
