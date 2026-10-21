import Link from "next/link";
import { ButtonLink, SectionLabel } from "@/components/ui";
import { services } from "@/content/services";

export const metadata = { title: "Page introuvable", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="tech-grid bg-ink text-bone">
      <div className="container-eh py-24 lg:py-32">
        <SectionLabel tone="dark">Erreur 404</SectionLabel>
        <h1 className="mt-6 max-w-3xl text-5xl font-extrabold sm:text-6xl">Cette page est introuvable</h1>
        <p className="mt-6 max-w-xl text-lg text-steel-300">
          Le lien est peut-être incomplet, ou la page a été déplacée. Voici quelques points de départ.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Retour à l’accueil</ButtonLink>
          <ButtonLink href="/catalogue" variant="outline-light">
            Consulter le catalogue
          </ButtonLink>
        </div>
        <ul className="mt-14 grid gap-px border border-bone/15 bg-bone/15 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <li key={s.slug}>
              <Link href={`/nos-metiers/${s.slug}`} className="block h-full bg-ink p-5 font-semibold hover:text-signal">
                <span className="block font-mono text-[11px] tracking-[0.14em] text-steel-400">{s.code}</span>
                {s.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
