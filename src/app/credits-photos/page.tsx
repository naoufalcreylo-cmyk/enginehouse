import { PageHero } from "@/components/ui";
import { media, mediaLabels, type MediaSlotKey } from "@/content/media";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Crédits photos",
  description: "Auteurs et licences des photographies d’illustration utilisées sur le site Engine House Import Export.",
  path: "/credits-photos",
});

export default function CreditsPage() {
  const rows = (Object.keys(media) as MediaSlotKey[])
    .map((key) => ({ key, photo: media[key] }))
    .filter((r) => r.photo?.credit);

  return (
    <>
      <PageHero
        crumbs={[{ name: "Crédits photos", href: "/credits-photos" }]}
        label="Crédits"
        title="Crédits photos"
        intro="Les photographies marquées « Photo d’illustration » proviennent de Wikimedia Commons, sous licence libre. Elles ne représentent ni les locaux, ni le personnel, ni le stock d’Engine House."
      />
      <section className="bg-bone">
        <div className="container-eh py-14 lg:py-20">
          <ul className="divide-y divide-steel-200 border-y border-steel-200">
            {rows.map(({ key, photo }) => {
              const c = photo!.credit!;
              return (
                <li key={key} className="grid gap-2 py-5 md:grid-cols-12 md:gap-6">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-steel-600 md:col-span-3">{mediaLabels[key] ?? key}</p>
                  <p className="md:col-span-5">{photo!.alt}</p>
                  <p className="text-[0.95rem] text-steel-700 md:col-span-4">
                    {c.author} —{" "}
                    {c.licenseUrl ? (
                      <a href={c.licenseUrl} rel="license noopener" className="on-light underline decoration-signal decoration-2 underline-offset-4">
                        {c.license}
                      </a>
                    ) : (
                      c.license
                    )}{" "}
                    —{" "}
                    <a href={c.source} rel="noopener" className="on-light underline decoration-signal decoration-2 underline-offset-4">
                      source
                    </a>
                    . Recadrée et redimensionnée.
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-8 max-w-3xl text-sm text-steel-600">
            Les logos de marques (Caterpillar, Volvo, Komatsu, Doosan, Liebherr, Cummins) sont utilisés uniquement pour
            identifier les engins et moteurs concernés ; ils appartiennent à leurs propriétaires respectifs.
          </p>
        </div>
      </section>
    </>
  );
}
