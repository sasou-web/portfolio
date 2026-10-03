# Portfolio de Samir Moghrabi — style client League of Legends

Portfolio en React + Vite qui reproduit l'interface du client LoL, en français et en anglais.
Destiné à être publié sur **moghrabi.fr**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # génère /dist (site statique, déployable partout)
```

## Modifier le contenu

**Tout le contenu est dans `src/data/portfolio.ts`.** Le reste du site s'adapte automatiquement.

| Dans le client LoL       | Dans le portfolio                       | Variable                   |
| ------------------------ | --------------------------------------- | -------------------------- |
| Bouton JOUER             | Écran de contact                        | `contactModes`             |
| Accueil → Aperçu         | Bannière + cartes                       | `heroSlides`, `homeCards`  |
| Accueil → Notes de patch | Actualités                              | `patchNotes`               |
| Historique de parties    | Recherche en cours, expériences, études | `experiences`, `education` |
| Profil                   | Présentation, recherche, langues, rang  | `profile`, `profileStats`  |
| Maîtrise des champions   | Compétences                             | `skills`                   |
| Défis                    | Réalisations                            | `achievements`             |
| Collection → Champions   | Projets (fiche détaillée)               | `projects`, `projectRoles` |
| Panneau d'amis           | Réseaux + stack du moment               | `friendGroups`             |
| RP / Essence bleue       | Chiffres clés                           | `currencies`               |

### Français / anglais

- Un texte bilingue s'écrit `L('texte français', 'english text')`. Une simple chaîne = identique dans les deux langues.
- Les textes de l'interface (boutons, onglets…) sont dans `src/i18n/ui.ts`.
- Le visiteur change de langue avec le bouton **FR / EN** (panneau social, ou barre du haut sur mobile) ou dans
  Paramètres. Son choix est mémorisé. Un lien `https://moghrabi.fr/?lang=en` ouvre directement le site en anglais.

### Images

- Ta propre image : dépose-la dans `public/` (ex. `public/images/moi.jpg`) et mets `'/images/moi.jpg'`.
- Fichiers de tes dépôts GitHub : `gh('Mira', 'docs/screenshots/readme-home.jpg')`.
- Assets LoL : `dd.splash('Nunu', 26)`, `dd.square('Ahri')`, `dd.profileIcon(4405)`…
- Logos de technos : `devicon('python')` (https://devicon.dev) ou `iconify('mdi:robot', '#0ac8b9')` (https://icon-sets.iconify.design).

### CV

Le CV n'est pas publié pour l'instant (il contient ton numéro de téléphone et ton adresse). Pour l'ajouter :
dépose-le dans `public/cv.pdf` et mets `cvUrl: '/cv.pdf'` dans `profile` — l'icône CV apparaît dans la barre du haut.

### Projets

- `owned: false` → le projet apparaît grisé avec un cadenas (« bientôt disponible »).
- `abilities` → les 5 sorts P/Q/W/E/R de la fiche (technos ou fonctionnalités clés).
- `skins` → la galerie de captures en bas à droite de la fiche.
- `mastery` (1–10) → le blason de maîtrise affiché sur la vignette.

### Logo, sons et easter egg

- Le logo en haut à gauche est le « L » de League (`site.logo`).
- Les effets sonores du client sont définis dans `src/lib/sfx.ts` (liste `RULES`). Le visiteur peut les couper ou
  régler le volume dans Paramètres (⚙). Les navigateurs n'autorisent le son qu'après un premier clic sur la page.
- Code Konami (↑ ↑ ↓ ↓ ← → ← → B A) : affiche `public/easter-egg.png`.

### Polices

Le client utilise *Beaufort for LOL* et *Spiegel*. Si elles sont installées sur la machine,
elles sont utilisées automatiquement ; sinon le site retombe sur Cinzel et Source Sans 3 (Google Fonts).

## Mise en ligne sur moghrabi.fr (GitHub Pages)

Tout est prêt : `.github/workflows/deploy.yml` construit et publie le site à chaque push sur `main`,
et `public/CNAME` rattache le site au domaine.

1. Crée un dépôt GitHub (ex. `sasou-web/portfolio`) et pousse le projet.
2. Dans le dépôt : **Settings → Pages → Source : GitHub Actions**.
3. Chez ton registrar, fais pointer `moghrabi.fr` vers GitHub Pages :
   enregistrements `A` vers `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   (et `CNAME` de `www` vers `sasou-web.github.io`).
4. Dans **Settings → Pages**, coche **Enforce HTTPS** une fois le certificat généré.

## Mentions

Projet de fan non officiel. Les images de champions et d'interface proviennent de Data Dragon (Riot)
et de CommunityDragon. Ce portfolio n'est ni approuvé ni sponsorisé par Riot Games. Riot Games et toutes
les propriétés associées sont des marques ou des marques déposées de Riot Games, Inc.
