/**
 * Helpers pour les assets officiels de League of Legends.
 *  - Data Dragon (CDN public de Riot) : splash arts, icônes de champions, icônes d'invocateur
 *  - CommunityDragon : éléments d'interface du client (emblèmes, blasons de maîtrise, etc.)
 *  - Devicon : logos de technos pour les compétences
 *
 * Tu peux remplacer n'importe quelle image par un fichier à toi : mets-le dans /public
 * et utilise simplement son chemin, par ex. "projets/mon-app.jpg" pour public/projets/mon-app.jpg.
 */

export const DDRAGON_VERSION = '16.19.1'

const DD = 'https://ddragon.leagueoflegends.com/cdn'
const CD = 'https://raw.communitydragon.org/latest/plugins'

export const dd = {
  /** Splash art plein format (1215x717) */
  splash: (champion: string, skin = 0) => `${DD}/img/champion/splash/${champion}_${skin}.jpg`,
  /** Splash art recadré au centre (1280x720) */
  centered: (champion: string, skin = 0) => `${DD}/img/champion/centered/${champion}_${skin}.jpg`,
  /** Portrait vertical de l'écran de chargement (308x560) */
  loading: (champion: string, skin = 0) => `${DD}/img/champion/loading/${champion}_${skin}.jpg`,
  /** Icône carrée de champion (120x120) */
  square: (champion: string) => `${DD}/${DDRAGON_VERSION}/img/champion/${champion}.png`,
  /** Icône d'invocateur */
  profileIcon: (id: number) => `${DD}/${DDRAGON_VERSION}/img/profileicon/${id}.png`,
}

export type RankTier =
  | 'iron' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'emerald'
  | 'diamond' | 'master' | 'grandmaster' | 'challenger'

export const cd = {
  rankEmblem: (tier: RankTier) =>
    `${CD}/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${tier}.png`,
  rankMini: (tier: RankTier) =>
    `${CD}/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier}.svg`,
  /** Les défis n'ont pas de palier Émeraude dans le client : on retombe sur Platine */
  challengeCrystal: (tier: RankTier) =>
    `${CD}/rcp-fe-lol-static-assets/global/default/images/challenge-mini-crystal/${tier === 'emerald' ? 'platinum' : tier}.svg`,
  /** Blason de maîtrise, niveau 1 à 10 */
  masteryCrest: (level: number) =>
    `${CD}/rcp-fe-lol-shared-components/global/default/mastery-${Math.max(1, Math.min(10, level))}.png`,
  /** Le "L" de League of Legends */
  lolLogo: `${CD}/rcp-fe-lol-static-assets/global/default/images/lol_icon.png`,
  rpIcon: `${CD}/rcp-fe-lol-static-assets/global/default/images/currency/icons/rp.svg`,
  beIcon: `${CD}/rcp-fe-lol-static-assets/global/default/images/be-icon.png`,
}

/** Fichier d'un dépôt GitHub public (branche main) — ex: gh('Mira', 'docs/screenshots/readme-home.jpg') */
export const gh = (repo: string, path: string, user = 'sasou-web') =>
  `https://raw.githubusercontent.com/${user}/${repo}/main/${path}`

/** Icône Iconify (https://icon-sets.iconify.design) — ex: iconify('mdi:robot', '#0ac8b9') */
export const iconify = (name: string, color?: string) =>
  `https://api.iconify.design/${name.replace(':', '/')}.svg${color ? `?color=${encodeURIComponent(color)}` : ''}`

/** Logo d'une techno via Devicon (https://devicon.dev) — ex: devicon('react'), devicon('postgresql') */
export const devicon = (name: string, variant = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-${variant}.svg`
