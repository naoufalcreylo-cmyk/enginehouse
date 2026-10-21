import { PageHero } from "@/components/ui";
import { formatAddress, site } from "@/config/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Utilisation des données transmises via le formulaire de demande de devis d’Engine House Import Export.",
  path: "/politique-de-confidentialite",
});

export default function PrivacyPage() {
  const address = formatAddress();
  return (
    <>
      <PageHero
        crumbs={[{ name: "Politique de confidentialité", href: "/politique-de-confidentialite" }]}
        label="Données personnelles"
        title="Politique de confidentialité"
      />
      <section className="bg-bone">
        <div className="container-eh py-16 lg:py-20">
          <div className="max-w-3xl space-y-10 text-lg leading-relaxed text-steel-700 [&_h2]:mb-3 [&_h2]:text-2xl [&_h2]:font-extrabold [&_h2]:text-ink">
            <div>
              <h2>Responsable du traitement</h2>
              <p>
                {site.legalName}
                {address ? `, ${address}` : ""}.
              </p>
            </div>
            <div>
              <h2>Données collectées</h2>
              <p>
                Lorsque vous utilisez le formulaire de demande de devis, nous recevons les informations que vous saisissez :
                nom, société, adresse e-mail, téléphone, informations techniques sur votre engin ou votre besoin, ainsi
                que les fichiers que vous choisissez de joindre.
              </p>
            </div>
            <div>
              <h2>Finalité</h2>
              <p>
                Ces données servent uniquement à étudier votre demande, à vous recontacter et à établir une proposition
                commerciale. Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.
              </p>
            </div>
            <div>
              <h2>Transmission</h2>
              <p>
                Les demandes sont acheminées par e-mail à nos équipes au moyen d’un prestataire technique d’envoi. Aucun
                cookie publicitaire ni outil de mesure d’audience n’est utilisé par ce site.
              </p>
            </div>
            <div>
              <h2>Vos droits</h2>
              <p>
                Conformément à la loi n° 09-08 relative à la protection des personnes physiques à l’égard du traitement
                des données à caractère personnel, vous disposez d’un droit d’accès, de rectification et d’opposition.
                Pour l’exercer, contactez-nous
                {site.contact.email ? ` à l’adresse ${site.contact.email}` : " via la page Contact"}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
