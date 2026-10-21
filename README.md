# Engine House Import Export — site web

Site vitrine B2B avec catalogue sur cotation : maintenance d’engins, reconditionnement d’organes majeurs, injection diesel, pièces de rechange et location de pelles hydrauliques.

**Stack :** Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4. Aucune base de données : tout le contenu est versionné dans `src/content/` et `src/config/`.

## Démarrage local

```bash
npm install
cp .env.example .env.local   # puis compléter
npm run dev                  # http://localhost:3000
```

Vérifications :

```bash
npm run lint
npx tsc --noEmit
npm run build && npm start
```

## Déploiement

Le site nécessite un hébergement Node.js (formulaire de devis côté serveur). Vercel est le plus simple :

1. Importer le dépôt dans Vercel (framework détecté automatiquement).
2. Définir les variables d’environnement ci-dessous (Production).
3. Déployer, puis rattacher le domaine.

Sur un serveur Node classique : `npm ci && npm run build && npm start` (port configurable avec `-p`).

| Variable | Rôle |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domaine de production, ex. `https://www.exemple.ma`. **Tant qu’il est vide, `robots.txt` interdit l’indexation** et les URL canoniques, le sitemap et l’Open Graph pointent sur localhost. |
| `RESEND_API_KEY` | Clé API Resend pour l’envoi des demandes. |
| `QUOTE_TO_EMAIL` | Adresse(s) qui reçoivent les demandes, séparées par des virgules. |
| `QUOTE_FROM_EMAIL` | Expéditeur sur un domaine vérifié dans Resend. |

## Formulaire de devis et e-mail

- Route : `POST /api/devis` (`src/app/api/devis/route.ts`). Le schéma partagé est dans `src/lib/quote.ts`, et la même validation tourne dans le navigateur et sur le serveur.
- Les demandes partent par e-mail via [Resend](https://resend.com). Le champ « Répondre à » contient l’adresse du demandeur. L’objet inclut une référence unique (`EH-AAAAMMJJ-XXXX`), qui est aussi affichée au client.
- **Sans configuration e-mail, le serveur répond 503.** Le formulaire affiche alors clairement que la demande n’a pas été transmise et propose les numéros de téléphone. Aucun faux message de succès n’est affiché, et les données saisies sont conservées.
- Anti-spam : champ piège invisible, délai minimal de 3 s entre l’affichage et l’envoi, et limite de 5 envois par IP sur 10 minutes. Cette limite est en mémoire, par instance : pour un trafic important, la remplacer par un stockage partagé (Upstash, etc.) ou ajouter Cloudflare Turnstile.
- Pièces jointes : 3 fichiers au maximum (JPG, PNG, WEBP ou PDF), 4 Mo au total, ce qui reste sous la limite de 4,5 Mo des fonctions serverless. Le type réel est vérifié par signature binaire côté serveur.

Mise en service de Resend :
1. Créer un compte, puis ajouter et vérifier le domaine (enregistrements DNS SPF/DKIM).
2. Créer une clé API (permission « Sending access »).
3. Renseigner les trois variables, redéployer, puis envoyer une demande de test.

Pour utiliser un autre fournisseur (SMTP, Brevo, etc.), il suffit de remplacer `sendMail()` dans `src/lib/mail.ts`.

## Où modifier le contenu

| Contenu | Fichier |
| --- | --- |
| Coordonnées, réseaux, historique, mentions | `src/config/site.ts` |
| Les 5 métiers (textes, étapes, SEO) | `src/content/services.ts` |
| Les 6 familles du catalogue | `src/content/catalogue.ts` |
| Produits vérifiés (vide au lancement) | `src/content/products.ts` |
| Secteurs, démarche, sites, équipe, livraison | `src/content/company.ts` |
| Photos (emplacements) | `src/content/media.ts` + `public/photos/` |
| Navigation | `src/content/navigation.ts` |

**Règle d’affichage :** une coordonnée (e-mail, WhatsApp, lien carte, horaires, réseaux) n’apparaît sur le site que si elle est renseignée dans `site.ts`.

**Photos :** 15 photos d’illustration sous licence libre (Wikimedia Commons, CC0 / CC BY / CC BY-SA / domaine public) sont en place dans `public/photos/`. Elles portent la mention « Photo d’illustration » et leurs auteurs et licences sont publiés sur `/credits-photos`, ce qu’exigent les licences CC BY et CC BY-SA. Pour remplacer une photo par une photo authentique d’Engine House : déposer le fichier dans `public/photos/`, mettre à jour `src`, `alt`, `width` et `height` dans `media.ts`, et retirer `credit` et `isIllustrative`. Une entrée à `null` réaffiche la planche technique dessinée.

**Logos de marques :** `public/marques/` contient les logos Caterpillar et Volvo (Simple Icons, CC0) et Komatsu, Doosan, Liebherr et Cummins (Wikimedia Commons, domaine public au titre du droit d’auteur). Ce sont des marques déposées : ils sont affichés en niveaux de gris, avec une mention précisant qu’ils servent à identifier les engins et n’impliquent aucun partenariat. Faire valider leur usage si Engine House a des accords particuliers avec ces marques.

**Logo sur fond sombre :** `public/brand/engine-house-logo-negatif.png`, généré à partir du logo fourni (fond transparent, noir passé en blanc, jaune #FDB916 conservé). Une version vectorielle officielle reste préférable.

**Produits :** n’ajouter que des articles réellement disponibles (voir le modèle commenté dans `products.ts`). Chaque fiche publiée crée sa page `/catalogue/produit/<slug>`, s’ajoute au sitemap et active la recherche et les filtres. Les filtres n’apparaissent que si les données les justifient. Les données structurées `Product` ne sont générées que pour une fiche complète (référence, marque, image, description), sans prix. Ne renseigner `compatibility` qu’avec des compatibilités confirmées.

## Informations et éléments à fournir

À confirmer :
- **Téléphones et adresse** (+212 808 667 335, +212 600 665 669, Lot 236, Zone industrielle, 28800 Mohammedia) : repris de la capture d’annuaire fournie. À confirmer, et à préciser : cette adresse correspond-elle au site de 1 000 m², à celui de 750 m², ou au siège ?
- Le numéro mobile est-il joignable sur WhatsApp ?

Manquants (laissés vides, donc non affichés) :
- Adresse e-mail de contact, et e-mail de réception des demandes (`QUOTE_TO_EMAIL`)
- Domaine de production
- Lien Google Maps exact, horaires d’ouverture
- Pages LinkedIn, Facebook, Instagram
- Mentions légales : RC, ICE, IF, forme juridique, capital, représentant légal. Une page « Mentions légales » sera à créer avec ces éléments.
- Durée de conservation des données, et validation juridique de la politique de confidentialité (loi 09-08, déclaration éventuelle à la CNDP)
- Document de conditions de garantie (le site indique qu’il est « disponible sur demande »)
- Inventaire produits vérifié (références, état, photos réelles)

Visuels authentiques :
- Logo en version vectorielle (SVG) et version transparente ou négative pour les fonds sombres. Le logo fourni a un fond blanc : il est présenté sur des surfaces claires.
- Photos réelles : façades et ateliers des deux sites, banc d’essai, station de charge, lavage industriel, magasin, techniciens en intervention, moteurs et pompes reconditionnés, pelles 20–30 t proposées à la location. Les 10 emplacements sont listés dans `media.ts`.

## Choix éditoriaux à connaître

- « Depuis 2013 » désigne l’activité de l’entreprise. « Plus de 15 ans » désigne l’expérience cumulée dans les moteurs thermiques. Le site ne présente pas ces chiffres comme une date de fondation.
- Les marques (Caterpillar, Volvo, Komatsu, Doosan, Liebherr, Cummins, Bosch, Poclain…) sont citées comme engins ou références sur lesquels intervenir ou consulter. Le site ne revendique ni concession, ni agrément, ni partenariat.
- Les références moteurs du document (C7…C32, 3408, 3508…) apparaissent comme « références sur lesquelles nous consulter ». Elles ne signifient ni disponibilité, ni compatibilité.
- La garantie est toujours formulée de façon conditionnelle : « certains moteurs reconditionnés peuvent bénéficier d’une garantie allant jusqu’à 12 mois, selon les conditions applicables ».
- Aucun prix, panier, avis client, statistique de performance ou délai chiffré n’est affiché.
- L’organisation de l’équipe reprend uniquement les fonctions et effectifs du document, sans noms ni portraits.

## Notes techniques

- `src/proxy.ts` renvoie un vrai statut 404 pour les identifiants inconnus. Avec Cache Components, ces pages seraient sinon servies en streaming avec un statut 200.
- `robots.txt` bloque l’indexation tant que `NEXT_PUBLIC_SITE_URL` n’est pas défini.
- Polices : Archivo (titres, axe de largeur), IBM Plex Sans (texte), IBM Plex Mono (repères techniques), chargées via `next/font`.
- Accessibilité : lien d’évitement, menus utilisables au clavier (Échap, focus restitué), focus visible renforcé sur fonds clairs et jaunes, prise en compte de `prefers-reduced-motion`, récapitulatif d’erreurs focalisé dans le formulaire.
