/**
 * ============================================================================
 *  CONTENU DU PORTFOLIO — Samir Moghrabi
 * ============================================================================
 *  Tout le texte et toutes les images du site sont ici.
 *  Textes bilingues : L('français', 'english'). Une simple chaîne = identique dans les deux langues.
 *
 *  Images : une URL, ou un fichier déposé dans /public (ex: public/images/moi.jpg → "images/moi.jpg").
 *  Helpers : dd.* (Data Dragon, Riot), cd.* (CommunityDragon), gh() (tes dépôts GitHub),
 *  devicon() et iconify() (logos de technos).
 * ============================================================================
 */
import { L } from '../i18n'
import { cd, dd, devicon, gh, iconify } from '../lib/assets'
import type {
  Achievement, ContactMode, Currency, FriendGroup, HeroSlide, HomeCard,
  MatchEntry, PatchNote, Profile, Project, Skill, Stat,
} from './types'

const GITHUB = 'https://github.com/sasou-web'
const LINKEDIN = 'https://www.linkedin.com/in/moghrabisamir/'
const EMAIL = 'samir@moghrabi.fr'

const kiroIcon = 'https://kiro.dev/icon.svg'
const excelIcon = iconify('vscode-icons:file-type-excel')
const vbaIcon = iconify('vscode-icons:file-type-vba')
const monitoringIcon = iconify('mdi:monitor-dashboard', '#0ac8b9')

/* ──────────────────────────────── SITE ──────────────────────────────── */

export const site = {
  /** Titre de l'onglet du navigateur */
  title: L('Samir Moghrabi — Portfolio', 'Samir Moghrabi — Portfolio'),
  /** Logo en haut à gauche (le "L" de League par défaut, ou "mon-logo.png" déposé dans public/) */
  logo: cd.lolLogo,
  /** Texte du gros bouton en haut à gauche ("JOUER" dans le vrai client) */
  playLabel: L('Contact', 'Contact'),
  /** Écran de chargement au premier affichage */
  intro: true,
  /** Version affichée en bas du panneau social */
  version: 'v26.10',
}

/* ─────────────────────────────── PROFIL ─────────────────────────────── */

export const profile: Profile = {
  name: 'Samir M',
  fullName: 'Samir Moghrabi',
  tag: 'EUW',
  title: L('Étudiant MCSI', 'MCSI student'),
  level: 23,
  levelHint: L('Niveau = âge. Prochain niveau : bientôt.', 'Level = age. Next level: soon.'),
  avatar: dd.profileIcon(4405), // Nunu & Willump Champie
  status: 'online',
  statusMessage: L('Cherche une alternance', 'Seeking a work-study'),
  location: L('Paris, France', 'Paris, France'),
  email: EMAIL,
  bio: [
    L(
      'Étudiant en Mastère Management et Conseil en SI à l’ESGI, je fais le lien entre la technique et le métier : cadrer un besoin, coordonner un déploiement, automatiser tout ce qui peut l’être. Après deux ans en infogérance chez Capgemini, je cherche une alternance de deux ans en gestion de projet SI.',
      'Master’s student in IT Management & Consulting at ESGI, I bridge the gap between tech and business: scoping a need, coordinating a rollout, automating whatever can be automated. After two years in managed IT services at Capgemini, I’m looking for a two-year work-study position in IT project management.',
    ),
    L(
      'Le soir, je code mes propres outils : un client Jellyfin, un lecteur audio, une médiathèque et un bot Discord. Hors écran : cinéma, sorties et balades dans Paris, tout ce qui touche au cyberpunk… et League of Legends, évidemment.',
      'In the evenings, I build my own tools: a Jellyfin client, an audio player, a media library and a Discord bot. Off screen: movies, nights out and walks around Paris, anything cyberpunk… and League of Legends, obviously.',
    ),
  ],
  background: dd.splash('Nunu', 26), // Nunu & Beelump
  backgroundPosition: 'center 30%',
  rank: {
    tier: 'diamond',
    queue: L('Classé solo/duo', 'Ranked solo/duo'),
    label: L('Diamant', 'Diamond'),
    detail: L('3 ans d’expérience', '3 years of experience'),
  },
  lookingFor: [
    { label: L('Poste', 'Role'), value: L('Assistant chef de projet SI', 'IT project manager assistant') },
    { label: L('Contrat', 'Contract'), value: L('Alternance · 2 ans', 'Work-study · 2 years') },
    { label: L('Début', 'Start'), value: L('Dès maintenant', 'Right now') },
    { label: L('Rythme', 'Schedule'), value: L('3 sem. entreprise / 1 sem. école', '3 weeks at work / 1 week at school') },
    { label: L('Lieu', 'Location'), value: L('Paris + télétravail', 'Paris + remote') },
  ],
  languages: [
    { name: L('Français', 'French'), level: L('Natif', 'Native') },
    { name: L('Anglais', 'English'), level: 'B2' },
    { name: L('Arabe littéraire', 'Modern Standard Arabic'), level: 'B2' },
  ],
  // Mets ton CV dans public/cv.pdf puis remplace par 'cv.pdf' pour afficher l'icône CV
  cvUrl: undefined,
}

/* ──────────────────────────── PANNEAU SOCIAL ──────────────────────────── */

export const friendGroups: FriendGroup[] = [
  {
    name: L('Réseaux', 'Links'),
    members: [
      { name: 'GitHub', status: 'online', activity: 'github.com/sasou-web', avatar: 'icon:github', href: GITHUB },
      { name: 'LinkedIn', status: 'online', activity: L('En ligne', 'Online'), avatar: 'icon:linkedin', href: LINKEDIN },
      { name: 'E-mail', status: 'ingame', activity: L('Répond en moins de 24 h', 'Replies within 24 h'), avatar: 'icon:mail', href: `mailto:${EMAIL}` },
    ],
  },
  {
    name: L('Stack du moment', 'Current stack'),
    members: [
      { name: 'C# / .NET', status: 'ingame', activity: L('En jeu — Mira', 'In game — Mira'), avatar: devicon('csharp') },
      { name: 'Rust', status: 'ingame', activity: L('En jeu — Qobee & Kyro', 'In game — Qobee & Kyro'), avatar: devicon('rust') },
      { name: 'Kiro', status: 'online', activity: L('Dev assisté par IA', 'AI-assisted dev'), avatar: kiroIcon },
      { name: 'Python', status: 'online', activity: L('En ligne', 'Online'), avatar: devicon('python') },
      { name: 'Node.js', status: 'away', activity: L('Absent — XK Bot tourne seul', 'Away — XK Bot runs on its own'), avatar: devicon('nodejs') },
    ],
  },
  {
    name: L('Hors ligne', 'Offline'),
    members: [
      { name: 'VBA', status: 'offline', activity: L('Vu pour la dernière fois en 2025', 'Last seen in 2025'), avatar: vbaIcon },
      { name: 'Nagios', status: 'offline', activity: L('Vu pour la dernière fois en 2022', 'Last seen in 2022'), avatar: monitoringIcon },
    ],
  },
]

/* ─────────────────────── ÉCRAN "JOUER" (CONTACT) ─────────────────────── */

export const contactModes: ContactMode[] = [
  {
    id: 'email',
    name: 'E-mail',
    subtitle: L('Faille de l’invocateur', 'Summoner’s Rift'),
    image: dd.splash('Nunu', 26),
    icon: 'mail',
    href: `mailto:${EMAIL}`,
    options: [
      { label: L('Proposition d’alternance', 'Work-study offer'), subject: L('Proposition d’alternance', 'Work-study offer') },
      { label: L('Proposition de poste', 'Job offer'), subject: L('Proposition de poste', 'Job offer') },
      { label: L('Projet / collaboration', 'Project / collaboration'), subject: L('Projet / collaboration', 'Project / collaboration') },
      { label: L('Juste dire bonjour', 'Just saying hi'), subject: L('Bonjour Samir !', 'Hi Samir!') },
    ],
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    subtitle: L('Classé flexible', 'Ranked flex'),
    image: dd.splash('Nunu', 35),
    icon: 'linkedin',
    href: LINKEDIN,
  },
  {
    id: 'github',
    name: 'GitHub',
    subtitle: L('Mode entraînement', 'Practice tool'),
    image: dd.splash('Nunu', 4),
    icon: 'github',
    href: GITHUB,
  },
]

/* ──────────────────────────────── ACCUEIL ──────────────────────────────── */

export const heroSlides: HeroSlide[] = [
  {
    eyebrow: L('Portfolio 2026', 'Portfolio 2026'),
    title: L('Bienvenue, invocateur', 'Welcome, summoner'),
    description: L(
      'Je suis Samir, étudiant en Management et Conseil en SI à l’ESGI. Je cherche une alternance de 2 ans en gestion de projet SI, dès maintenant.',
      'I’m Samir, an IT Management & Consulting student at ESGI. I’m looking for a two-year work-study position in IT project management, starting now.',
    ),
    image: dd.splash('Nunu', 26),
    imagePosition: 'center 30%',
    cta: { label: L('Me contacter', 'Contact me'), to: 'jouer' },
    secondary: { label: L('Mon profil', 'My profile'), to: 'profil/apercu' },
  },
  {
    eyebrow: L('Projet à la une', 'Featured project'),
    title: 'Mira',
    description: L(
      'Un client Jellyfin natif pour Windows : interface cinéma, lecteur mpv intégré et synchronisation fiable.',
      'A native Jellyfin client for Windows: cinema-style interface, built-in mpv player and reliable sync.',
    ),
    image: gh('Mira', 'docs/screenshots/readme-home.jpg'),
    imagePosition: 'center 30%',
    cta: { label: L('Découvrir', 'Discover'), to: 'collection/projets/mira' },
  },
  {
    eyebrow: L('Historique', 'Match history'),
    title: L('3 ans d’expérience', '3 years of experience'),
    description: L(
      'Infogérance chez Capgemini, automatisation chez Mehad : chaque mission est présentée comme une partie classée.',
      'Managed IT services at Capgemini, automation at Mehad: every role is shown as a ranked game.',
    ),
    image: dd.splash('Nunu', 16),
    imagePosition: 'center 25%',
    cta: { label: L('Voir l’historique', 'View match history'), to: 'parcours/experiences' },
  },
]

export const homeCards: HomeCard[] = [
  { eyebrow: L('Profil', 'Profile'), title: L('Qui suis-je ?', 'Who am I?'), image: dd.splash('Nunu', 35), imagePosition: 'center 25%', to: 'profil/apercu' },
  { eyebrow: L('Maîtrise', 'Mastery'), title: L('Mes compétences', 'My skills'), image: dd.splash('Nunu', 8), imagePosition: 'center 30%', to: 'profil/maitrise' },
  { eyebrow: L('Contact', 'Contact'), title: L('Lancer une partie', 'Start a game'), image: dd.splash('Nunu', 4), imagePosition: 'center 30%', to: 'jouer' },
]

export const patchNotes: PatchNote[] = [
  {
    version: '26.10',
    date: L('3 octobre 2026', 'October 3, 2026'),
    title: L('Lancement du portfolio', 'Portfolio launch'),
    image: dd.splash('Nunu', 16),
    summary: L(
      'Le portfolio passe sous le client LoL : projets, parcours, compétences et contact, en français et en anglais.',
      'The portfolio now runs in the LoL client: projects, career, skills and contact, in French and English.',
    ),
    items: [
      L('Ajout : la Collection regroupe Mira, XK Bot, Qobee et Kyro.', 'New: the Collection features Mira, XK Bot, Qobee and Kyro.'),
      L('Ajout : l’historique retrace Capgemini, Mehad et mes études.', 'New: the match history covers Capgemini, Mehad and my studies.'),
      L('Ajout : bascule FR / EN en un clic.', 'New: one-click FR / EN switch.'),
    ],
  },
  {
    version: 'Mira',
    date: L('2 octobre 2026', 'October 2, 2026'),
    title: L('Mira 0.5.7 est disponible', 'Mira 0.5.7 is out'),
    image: gh('Mira', 'docs/screenshots/readme-library.jpg'),
    summary: L(
      'Nouvelle préversion du client Jellyfin pour Windows.',
      'New preview release of the Jellyfin client for Windows.',
    ),
    items: [
      L('Mises à jour téléchargées en arrière-plan et vérifiées (signature, SHA-256).', 'Updates are downloaded in the background and verified (signature, SHA-256).'),
      L('Guide de démarrage intégré (bouton ? ou touche F1).', 'Built-in getting-started guide (? button or F1).'),
    ],
    href: 'https://github.com/sasou-web/Mira/releases/tag/v0.5.7',
  },
  {
    version: 'ESGI',
    date: L('25 septembre 2026', 'September 25, 2026'),
    title: L('Rentrée en Mastère MCSI', 'Starting my MCSI Master’s'),
    image: dd.splash('Heimerdinger', 0),
    summary: L(
      'Entrée en Bac+4 Management et Conseil en Systèmes d’Information à l’ESGI.',
      'Starting the 4th year of the IT Management & Consulting program at ESGI.',
    ),
    items: [
      L('Recherche d’une alternance de 2 ans en gestion de projet SI.', 'Looking for a two-year work-study position in IT project management.'),
    ],
  },
  {
    version: 'Kyro',
    date: L('17 mai 2026', 'May 17, 2026'),
    title: L('Kyro 1.0.0', 'Kyro 1.0.0'),
    image: gh('Kyro', 'kyro-logo.png'),
    imagePosition: 'center',
    summary: L(
      'Première version stable de la médiathèque 100 % locale pour Windows.',
      'First stable release of the 100% local media library for Windows.',
    ),
    items: [
      L('Lecture via mpv.net avec reprise exacte.', 'Playback through mpv.net with exact resume.'),
      L('568 tests automatisés.', '568 automated tests.'),
    ],
    href: 'https://github.com/sasou-web/Kyro/releases/tag/v1.0.0',
  },
]

/* ──────────────────────── PARCOURS (HISTORIQUE) ──────────────────────── */

export const experiences: MatchEntry[] = [
  {
    result: 'queue',
    resultLabel: L('En file', 'In queue'),
    org: L('Ton entreprise ?', 'Your company?'),
    logo: dd.profileIcon(4405),
    role: L('Assistant chef de projet SI', 'IT project manager assistant'),
    mode: L('Alternance · 2 ans', 'Work-study · 2 years'),
    location: L('Paris + télétravail', 'Paris + remote'),
    period: L('Dès maintenant', 'Starting now'),
    stats: [
      { label: L('Rythme', 'Schedule'), value: L('3 sem. / 1 sem.', '3 wks / 1 wk') },
      { label: L('École', 'School'), value: 'ESGI · MCSI' },
    ],
    items: [
      { name: 'Excel', icon: excelIcon },
      { name: 'VBA', icon: vbaIcon },
      { name: 'Jira', icon: devicon('jira') },
      { name: 'Python', icon: devicon('python') },
      { name: 'Git', icon: devicon('git') },
      { name: 'Kiro', icon: kiroIcon },
    ],
    description: [
      L('Je cherche une alternance de 2 ans en gestion de projet SI, disponible dès maintenant.', 'I’m looking for a two-year work-study position in IT project management, available right now.'),
      L('Ce que j’apporte : coordination de déploiements, reporting automatisé, support utilisateurs et scripts Python / Bash.', 'What I bring: deployment coordination, automated reporting, user support and Python / Bash scripting.'),
    ],
    cta: { label: L('Me contacter', 'Contact me'), to: 'jouer' },
  },
  {
    result: 'victory',
    resultLabel: L('Victoire', 'Victory'),
    org: 'Capgemini',
    logo: dd.square('Jayce'),
    role: L('Assistant chef de projet infogérance', 'Managed services project assistant'),
    mode: L('Infogérance', 'Managed IT services'),
    location: 'Issy-les-Moulineaux',
    period: '2023 — 2025',
    duration: L('2 ans', '2 years'),
    stats: [
      { label: L('Domaine', 'Field'), value: L('Infogérance', 'Managed services') },
      { label: L('Spécialité', 'Focus'), value: L('Reporting automatisé', 'Automated reporting') },
    ],
    items: [
      { name: 'Excel', icon: excelIcon },
      { name: 'VBA', icon: vbaIcon },
      { name: 'Git', icon: devicon('git') },
    ],
    description: [
      L('Coordonner les déploiements et apporter un support technique aux utilisateurs finaux.', 'Coordinated deployments and provided technical support to end users.'),
      L('Automatiser les rapports de performance sous Excel VBA : génération et consolidation des données.', 'Automated performance reports with Excel VBA: data generation and consolidation.'),
      L('Développer des macros et exploiter les formules avancées et tableaux croisés dynamiques pour le traitement des données.', 'Built macros and used advanced formulas and pivot tables to process data.'),
      L('Participer à l’intégration des scripts VBA aux processus de livraison et de versionnement.', 'Helped integrate VBA scripts into the delivery and versioning processes.'),
    ],
  },
  {
    result: 'victory',
    resultLabel: L('Victoire', 'Victory'),
    org: 'Mehad',
    logo: dd.square('Blitzcrank'),
    role: L('Développeur maintenance et automatisation', 'Maintenance & automation developer'),
    mode: L('Automatisation', 'Automation'),
    location: 'Paris',
    period: '2022',
    stats: [
      { label: L('Domaine', 'Field'), value: L('Maintenance SI', 'IT maintenance') },
      { label: L('Supervision', 'Monitoring'), value: 'Nagios · Zabbix' },
    ],
    items: [
      { name: 'Python', icon: devicon('python') },
      { name: 'Bash', icon: devicon('bash') },
      { name: 'Linux', icon: devicon('linux') },
      { name: 'Git', icon: devicon('git') },
      { name: 'Nagios · Zabbix', icon: monitoringIcon },
    ],
    description: [
      L('Automatiser la maintenance des serveurs et postes de travail en Python et Bash ; planifier les mises à jour et correctifs avec cron.', 'Automated server and workstation maintenance with Python and Bash; scheduled updates and patches with cron.'),
      L('Rédiger et versionner les procédures dans Git pour faciliter les restaurations et les retours arrière.', 'Wrote and versioned procedures in Git to make restores and rollbacks easier.'),
      L('Contribuer à l’intégration des outils de supervision Nagios et Zabbix avec les équipes support.', 'Helped integrate the Nagios and Zabbix monitoring tools with the support teams.'),
    ],
  },
]

export const education: MatchEntry[] = [
  {
    result: 'ongoing',
    resultLabel: L('En cours', 'Ongoing'),
    org: 'ESGI',
    logo: dd.square('Heimerdinger'),
    role: L('Mastère Management et Conseil en SI', 'Master’s in IT Management & Consulting'),
    mode: L('Bac+4 / Bac+5', '4th–5th year'),
    location: 'Paris',
    period: '2026 — 2028',
    duration: L('Depuis le 25 sept. 2026', 'Since Sept. 25, 2026'),
    stats: [
      { label: L('Format', 'Format'), value: L('Alternance', 'Work-study') },
      { label: L('Rythme', 'Schedule'), value: L('3 sem. / 1 sem.', '3 wks / 1 wk') },
    ],
    items: [
      { name: 'Jira', icon: devicon('jira') },
      { name: 'Trello', icon: devicon('trello') },
      { name: 'Excel', icon: excelIcon },
    ],
    description: [
      L('Entrée en Bac+4 le 25 septembre 2026, à la recherche d’une alternance.', 'Started the 4th year on September 25, 2026, looking for a work-study position.'),
      L('Gestion de projet SI, conseil, gouvernance et pilotage de la transformation numérique.', 'IT project management, consulting, governance and digital transformation.'),
    ],
  },
  {
    result: 'victory',
    resultLabel: L('Victoire', 'Victory'),
    org: 'ESGI',
    logo: dd.square('Viktor'),
    role: L('Bachelor Management et Conseil en SI', 'Bachelor’s in IT Management & Consulting'),
    mode: L('Bac+3', 'Bachelor'),
    location: 'Paris',
    period: '2024 — 2026',
    duration: L('2 ans', '2 years'),
    stats: [
      { label: L('Spécialité', 'Major'), value: 'MCSI' },
      { label: L('En parallèle', 'Alongside'), value: 'Capgemini' },
    ],
    items: [
      { name: 'Jira', icon: devicon('jira') },
      { name: 'Excel', icon: excelIcon },
      { name: 'Python', icon: devicon('python') },
    ],
    description: [
      L('Bachelor Management et Conseil en Systèmes d’Information.', 'Bachelor’s degree in IT Management & Consulting.'),
    ],
  },
  {
    result: 'victory',
    resultLabel: L('Victoire', 'Victory'),
    org: 'CNAM',
    logo: dd.square('Ezreal'),
    role: L('DEUST Informatique', 'DEUST in Computer Science'),
    mode: L('Bac+2', '2-year degree'),
    location: 'Paris',
    period: '2021 — 2023',
    duration: L('2 ans', '2 years'),
    stats: [
      { label: L('Niveau', 'Level'), value: L('Bac+2', '2-year degree') },
      { label: L('En parallèle', 'Alongside'), value: 'Mehad' },
    ],
    items: [
      { name: 'Linux', icon: devicon('linux') },
      { name: 'Python', icon: devicon('python') },
      { name: 'Bash', icon: devicon('bash') },
    ],
    description: [
      L('Les bases de l’informatique : développement, systèmes et réseaux.', 'Computer science fundamentals: development, systems and networks.'),
    ],
  },
]

/* ─────────────────────────── MAÎTRISE (SKILLS) ─────────────────────────── */

const PM = L('Gestion de projet', 'Project management')
const REPORTING = L('Reporting & données', 'Reporting & data')
const AUTOMATION = L('Automatisation', 'Automation')
const SYSTEMS = L('Systèmes & supervision', 'Systems & monitoring')
const DEV = L('Développement', 'Development')
const AI = L('IA appliquée', 'Applied AI')

export const skills: Skill[] = [
  { name: 'Excel', icon: excelIcon, level: 9, points: 171200, category: REPORTING, detail: L('TCD, formules avancées', 'Pivot tables, advanced formulas') },
  { name: L('Coordination SI', 'IT coordination'), icon: iconify('mdi:account-group', '#c8aa6e'), level: 8, points: 142300, category: PM, detail: L('Déploiements, support, doc', 'Rollouts, support, docs') },
  { name: 'VBA', icon: vbaIcon, level: 8, points: 133600, category: REPORTING, detail: L('Macros, consolidation', 'Macros, consolidation') },
  { name: 'Git', icon: devicon('git'), level: 8, points: 119300, category: AUTOMATION, detail: L('Versionnement', 'Version control') },
  { name: 'Kiro', icon: kiroIcon, level: 8, points: 97400, category: AI, detail: L('Dev assisté par IA', 'AI-assisted dev') },
  { name: 'Python', icon: devicon('python'), level: 7, points: 102500, category: AUTOMATION, detail: L('Scripts de maintenance', 'Maintenance scripts') },
  { name: 'Linux', icon: devicon('linux'), level: 7, points: 93100, category: SYSTEMS, detail: L('Serveurs et postes', 'Servers & workstations') },
  { name: L('Bash & cron', 'Bash & cron'), icon: devicon('bash'), level: 7, points: 88700, category: AUTOMATION, detail: L('Tâches planifiées', 'Scheduled jobs') },
  { name: 'Jira', icon: devicon('jira'), level: 7, points: 81400, category: PM, detail: L('Suivi de projet', 'Project tracking') },
  { name: 'C# / .NET', icon: devicon('csharp'), level: 7, points: 76200, category: DEV, detail: 'Mira · WPF · .NET 8' },
  { name: 'Trello', icon: devicon('trello'), level: 7, points: 64800, category: PM, detail: L('Organisation des tâches', 'Task boards') },
  { name: 'Rust', icon: devicon('rust'), level: 6, points: 58400, category: DEV, detail: 'Qobee · Kyro' },
  { name: 'Node.js', icon: devicon('nodejs'), level: 6, points: 55600, category: DEV, detail: 'XK Bot · discord.js' },
  { name: 'TypeScript', icon: devicon('typescript'), level: 6, points: 52100, category: DEV, detail: L('Interfaces Svelte', 'Svelte front-ends') },
  { name: L('LLM en local', 'Local LLMs'), icon: iconify('logos:qwen-icon'), level: 6, points: 49300, category: AI, detail: 'Qwen' },
  { name: 'Svelte', icon: devicon('svelte'), level: 6, points: 47900, category: DEV, detail: 'Qobee · Kyro' },
  { name: 'Nagios & Zabbix', icon: monitoringIcon, level: 5, points: 41800, category: SYSTEMS, detail: L('Supervision', 'Monitoring') },
]

/* ──────────────────────────── DÉFIS (ACHIEVEMENTS) ──────────────────────────── */

export const achievements: Achievement[] = [
  {
    name: L('Créateur d’applis', 'App maker'),
    description: L('4 applications publiées en open source sur GitHub : Mira, Qobee, Kyro et XK Bot.', '4 apps released as open source on GitHub: Mira, Qobee, Kyro and XK Bot.'),
    tier: 'challenger', category: L('Projets', 'Projects'), value: L('4 applis', '4 apps'), date: '2026',
  },
  {
    name: L('Testeur acharné', 'Relentless tester'),
    description: L('Kyro est couvert par 568 tests automatisés (348 Rust + 220 front-end).', 'Kyro is covered by 568 automated tests (348 Rust + 220 front-end).'),
    tier: 'diamond', category: L('Qualité', 'Quality'), value: '568 tests', date: '2026',
  },
  {
    name: L('Release machine', 'Release machine'),
    description: L('Mira : 5 versions publiées en 3 jours, de la 0.5.3 à la 0.5.7.', 'Mira: 5 releases shipped in 3 days, from 0.5.3 to 0.5.7.'),
    tier: 'master', category: L('Livraison', 'Delivery'), value: L('5 versions', '5 releases'), date: '2026',
  },
  {
    name: L('Gardien du serveur', 'Server guardian'),
    description: L('XK Bot gère les ranks, niveaux, tournois et tickets du serveur Discord Xray Kaya.', 'XK Bot runs ranks, levels, tournaments and tickets on the Xray Kaya Discord server.'),
    tier: 'platinum', category: L('Communauté', 'Community'), value: L('En service', 'Live'), date: '2026',
  },
  {
    name: L('Automatiseur', 'Automator'),
    description: L('Reporting de performance automatisé en Excel VBA chez Capgemini.', 'Automated performance reporting with Excel VBA at Capgemini.'),
    tier: 'emerald', category: L('Pro', 'Work'), value: 'VBA', date: '2025',
  },
  {
    name: L('Réparateur', 'Fixer'),
    description: L('Fork de tiktok-rss-flat remis en marche en passant sur yt-dlp.', 'Got a fork of tiktok-rss-flat working again by switching it to yt-dlp.'),
    tier: 'gold', category: 'Open source', value: '1 fork', date: '2026',
  },
  {
    name: L('Polyglotte', 'Polyglot'),
    description: L('Anglais B2 et arabe littéraire B2, en plus du français.', 'English B2 and Modern Standard Arabic B2, on top of French.'),
    tier: 'silver', category: L('Langues', 'Languages'), value: L('3 langues', '3 languages'),
  },
]

/* ───────────────────────── COLLECTION (PROJETS) ───────────────────────── */

/** Filtres de la collection (équivalent des rôles de champions) */
export const projectRoles = [
  { id: 'desktop', label: L('Bureau', 'Desktop'), icon: 'desktop' },
  { id: 'media', label: L('Multimédia', 'Media'), icon: 'media' },
  { id: 'bot', label: L('Bot Discord', 'Discord bot'), icon: 'bot' },
  { id: 'web', label: 'Web', icon: 'web' },
  { id: 'tool', label: L('Outil', 'Tool'), icon: 'tool' },
  { id: 'school', label: L('Études', 'School'), icon: 'school' },
]

const SOURCE = L('Code source', 'Source code')
const DOWNLOAD = L('Télécharger', 'Download')

export const projects: Project[] = [
  {
    id: 'mira',
    name: 'Mira',
    title: L('Le client Jellyfin cinéma', 'The cinema Jellyfin client'),
    roles: ['desktop', 'media'],
    year: '2026',
    difficulty: 3,
    thumbnail: gh('Mira', 'src/Mira.Desktop/Assets/mira.png'),
    splash: gh('Mira', 'docs/screenshots/readme-home.jpg'),
    splashPosition: 'center 30%',
    owned: true,
    mastery: 9,
    description: [
      L(
        'Mira garde Jellyfin comme bibliothèque et lui ajoute une vraie application Windows centrée sur le visionnage : on parcourt ses films et séries, on retrouve sa dernière lecture et on regarde directement dans la même fenêtre.',
        'Mira keeps Jellyfin as the library and adds a real Windows app built for watching: browse your movies and shows, pick up where you left off and watch right in the same window.',
      ),
      L(
        'Développé en C# / .NET 8 avec WPF et libmpv. Préversion 0.5.7, licence MIT.',
        'Built with C# / .NET 8, WPF and libmpv. Preview 0.5.7, MIT license.',
      ),
    ],
    abilities: [
      { key: 'P', name: L('Natif Windows', 'Native Windows'), description: L('Passif — C# / .NET 8 et WPF : raccourci Démarrer, icône de notification, contrôles dans la barre des tâches.', 'Passive — C# / .NET 8 and WPF: Start menu shortcut, tray icon, taskbar controls.'), icon: devicon('csharp') },
      { key: 'Q', name: L('Lecteur mpv intégré', 'Built-in mpv player'), description: L('La lecture se fait dans la fenêtre grâce à libmpv : chapitres, pistes audio, sous-titres, vitesse, épisode suivant.', 'Playback happens in the window with libmpv: chapters, audio tracks, subtitles, speed, next episode.'), icon: iconify('mdi:play-circle', '#f0e6d2') },
      { key: 'W', name: L('Bibliothèque visuelle', 'Visual library'), description: L('Bandeau panoramique, couleur adaptée à l’affiche, recherche, filtres, favoris et fiches détaillées.', 'Panoramic banner, colors matched to the artwork, search, filters, favorites and detailed pages.'), icon: iconify('mdi:view-grid', '#c8aa6e') },
      { key: 'E', name: L('Reprise fiable', 'Reliable resume'), description: L('Progression locale, statut vu et file d’envoi persistante qui reprend la synchronisation après une coupure.', 'Local progress, watched status and a persistent upload queue that resumes syncing after a dropout.'), icon: iconify('mdi:sync', '#0ac8b9') },
      { key: 'R', name: L('Mises à jour signées', 'Signed updates'), description: L('Ultime — chaque version est téléchargée en arrière-plan, vérifiée (signature, SHA-256) et installée à la fermeture.', 'Ultimate — every release is downloaded in the background, verified (signature, SHA-256) and installed on exit.'), icon: iconify('mdi:shield-check', '#c8aa6e') },
    ],
    skins: [
      { name: L('Accueil', 'Home'), image: gh('Mira', 'docs/screenshots/readme-home.jpg') },
      { name: L('Bibliothèque', 'Library'), image: gh('Mira', 'docs/screenshots/readme-library.jpg') },
      { name: L('Sous-titres', 'Subtitles'), image: gh('Mira', 'docs/screenshots/readme-subtitles.jpg') },
      { name: L('Fiche film', 'Movie page'), image: gh('Mira', 'docs/screenshots/06-film-details.png') },
    ],
    links: [
      { label: DOWNLOAD, href: 'https://github.com/sasou-web/Mira/releases/tag/v0.5.7' },
      { label: SOURCE, href: 'https://github.com/sasou-web/Mira' },
    ],
  },
  {
    id: 'xk-bot',
    name: 'XK Bot',
    title: L('Le bot Discord de Xray Kaya', 'The Xray Kaya Discord bot'),
    roles: ['bot', 'web'],
    year: '2026',
    difficulty: 3,
    thumbnail: gh('brawlhalla-rank-bot', 'src/web/public/icon-512.png'),
    splash: dd.splash('Blitzcrank', 0),
    owned: true,
    mastery: 8,
    description: [
      L(
        'Le bot Discord du serveur Xray Kaya : rôles de rank Brawlhalla, niveaux et récompenses, tournois, modération, tickets, salons vocaux temporaires et dashboard web.',
        'The Discord bot of the Xray Kaya server: Brawlhalla rank roles, levels and rewards, tournaments, moderation, tickets, temporary voice channels and a web dashboard.',
      ),
      L(
        'Les membres lient leur compte avec /lier ; le bot interroge l’API officielle Brawlhalla et met leurs rôles 1v1 et 2v2 à jour tout seul.',
        'Members link their account with /lier; the bot queries the official Brawlhalla API and keeps their 1v1 and 2v2 roles up to date on its own.',
      ),
    ],
    abilities: [
      { key: 'P', name: 'Node.js', description: L('Passif — Node.js et discord.js v14, en commandes slash.', 'Passive — Node.js and discord.js v14, with slash commands.'), icon: devicon('nodejs') },
      { key: 'Q', name: '/lier', description: L('Lie un compte Brawlhalla via l’API officielle v1, avec confirmation en cas d’homonymes.', 'Links a Brawlhalla account through the official v1 API, with a confirmation step for duplicate names.'), icon: devicon('discordjs') },
      { key: 'W', name: L('Rôles de rank', 'Rank roles'), description: L('Attribue et rafraîchit les rôles de tier 1v1 et 2v2, de Tin à Valhallan.', 'Assigns and refreshes 1v1 and 2v2 tier roles, from Tin to Valhallan.'), icon: iconify('mdi:trophy', '#c8aa6e') },
      { key: 'E', name: L('Vie du serveur', 'Server life'), description: L('Niveaux, succès, tournois, tickets et vocaux temporaires.', 'Levels, achievements, tournaments, tickets and temporary voice channels.'), icon: iconify('mdi:account-group', '#0ac8b9') },
      { key: 'R', name: 'Dashboard', description: L('Ultime — un dashboard web pour configurer le bot.', 'Ultimate — a web dashboard to configure the bot.'), icon: iconify('mdi:monitor-dashboard', '#f0e6d2') },
    ],
    skins: [
      { name: L('Classique', 'Classic'), image: dd.splash('Blitzcrank', 0) },
      { name: 'Nunu Bot', image: dd.splash('Nunu', 4) },
    ],
    links: [{ label: SOURCE, href: 'https://github.com/sasou-web/brawlhalla-rank-bot' }],
  },
  {
    id: 'qobee',
    name: 'Qobee',
    title: L('Le lecteur audio fidèle', 'The high-fidelity audio player'),
    roles: ['desktop', 'media'],
    year: '2026',
    difficulty: 3,
    thumbnail: gh('qobee', 'src-tauri/icons/128x128@2x.png'),
    splash: dd.splash('Sona', 6),
    owned: true,
    mastery: 8,
    description: [
      L(
        'Lecteur audio local pour Windows, pensé pour la fidélité : il indexe tes dossiers de musique et lit le FLAC et les autres formats sans perte.',
        'A local audio player for Windows built for fidelity: it indexes your music folders and plays FLAC and other lossless formats.',
      ),
      L(
        'Moteur audio en Rust, interface Tauri 2 + Svelte 5. Le lecteur indique honnêtement si la chaîne de lecture est bit-perfect ou non.',
        'Rust audio engine, Tauri 2 + Svelte 5 interface. The player honestly tells you whether the playback chain is bit-perfect.',
      ),
    ],
    abilities: [
      { key: 'P', name: 'Rust', description: L('Passif — moteur audio en Rust (Symphonia, CPAL).', 'Passive — Rust audio engine (Symphonia, CPAL).'), icon: devicon('rust') },
      { key: 'Q', name: 'WASAPI Exclusive', description: L('Sortie strictement bit-perfect quand le périphérique accepte le format source.', 'Strictly bit-perfect output when the device accepts the source format.'), icon: iconify('mdi:waveform', '#0ac8b9') },
      { key: 'W', name: L('Égaliseur', 'Equalizer'), description: L('Égaliseur 10 bandes, ReplayGain et lecture sans blanc (gapless).', '10-band equalizer, ReplayGain and gapless playback.'), icon: iconify('mdi:equalizer', '#c8aa6e') },
      { key: 'E', name: 'Tauri + Svelte', description: L('Interface sombre : albums, artistes, playlists, favoris et file d’attente.', 'Dark interface: albums, artists, playlists, favorites and queue.'), icon: devicon('svelte') },
      { key: 'R', name: L('Paroles & Discord', 'Lyrics & Discord'), description: L('Ultime — paroles synchronisées, mini-lecteur et Discord Rich Presence avec la pochette.', 'Ultimate — synced lyrics, mini player and Discord Rich Presence with album art.'), icon: iconify('mdi:music-note', '#f0e6d2') },
    ],
    skins: [
      { name: L('Classique', 'Classic'), image: dd.splash('Sona', 6) },
      { name: L('Astro-groove', 'Space Groove'), image: dd.splash('Nunu', 16) },
      { name: L('Abeille', 'Bee'), image: dd.splash('Nunu', 26) },
    ],
    links: [
      { label: DOWNLOAD, href: 'https://github.com/sasou-web/qobee/releases/tag/v0.5.2' },
      { label: SOURCE, href: 'https://github.com/sasou-web/qobee' },
    ],
  },
  {
    id: 'kyro',
    name: 'Kyro',
    title: L('La médiathèque 100 % locale', 'The 100% local media library'),
    roles: ['desktop', 'media', 'tool'],
    year: '2026',
    difficulty: 3,
    thumbnail: gh('Kyro', 'kyro-logo.png'),
    splash: dd.splash('Ryze', 0),
    owned: true,
    mastery: 7,
    description: [
      L(
        'Bibliothèque de films, séries et animes pour Windows : tout reste sur ta machine, sans compte, sans télémétrie et sans requête réseau.',
        'A movie, TV and anime library for Windows: everything stays on your machine, with no account, no telemetry and no network requests.',
      ),
      L(
        'Backend Rust + Tauri 2 (SQLite WAL), interface SvelteKit, lecture déléguée à mpv.net avec reprise exacte.',
        'Rust + Tauri 2 backend (SQLite WAL), SvelteKit interface, playback handed off to mpv.net with exact resume.',
      ),
    ],
    abilities: [
      { key: 'P', name: L('100 % local', '100% local'), description: L('Passif — zéro requête réseau, aucun compte, aucune télémétrie.', 'Passive — zero network requests, no account, no telemetry.'), icon: iconify('mdi:lock', '#c8aa6e') },
      { key: 'Q', name: 'mpv.net', description: L('Lecture externe avec reprise exacte : un script Lua parle à Kyro par named pipe.', 'External playback with exact resume: a Lua script talks to Kyro over a named pipe.'), icon: iconify('mdi:play-circle', '#f0e6d2') },
      { key: 'W', name: L('Recherche instantanée', 'Instant search'), description: L('Recherche FTS5 insensible à la casse et aux accents.', 'FTS5 search, case- and accent-insensitive.'), icon: devicon('sqlite') },
      { key: 'E', name: 'Watcher', description: L('Détecte les ajouts, suppressions et renommages, et lit les métadonnées avec ffprobe.', 'Detects additions, deletions and renames, and reads metadata with ffprobe.'), icon: iconify('mdi:folder-eye', '#0ac8b9') },
      { key: 'R', name: L('568 tests', '568 tests'), description: L('Ultime — 348 tests Rust et 220 tests front-end, dont des tests property-based.', 'Ultimate — 348 Rust tests and 220 front-end tests, including property-based tests.'), icon: devicon('rust') },
    ],
    skins: [],
    links: [
      { label: DOWNLOAD, href: 'https://github.com/sasou-web/Kyro/releases/tag/v1.0.0' },
      { label: SOURCE, href: 'https://github.com/sasou-web/Kyro' },
    ],
  },
  {
    id: 'projets-esgi',
    name: L('Projets ESGI', 'ESGI projects'),
    title: L('Cadrage et conseil SI', 'IT scoping & consulting'),
    roles: ['school'],
    year: '2026',
    difficulty: 2,
    thumbnail: dd.square('Heimerdinger'),
    splash: dd.splash('Heimerdinger', 0),
    owned: true,
    mastery: 6,
    description: [
      L(
        'Les projets d’études du Bachelor MCSI à l’ESGI : des cas concrets menés en équipe, du cadrage d’un besoin jusqu’à la recommandation.',
        'Study projects from the MCSI Bachelor’s at ESGI: real-world cases handled as a team, from scoping a need to the final recommendation.',
      ),
      L('Le détail des projets arrive bientôt.', 'Project details coming soon.'),
    ],
    abilities: [
      { key: 'P', name: L('Analyse des besoins', 'Needs analysis'), description: L('Passif — recueillir et formaliser le besoin du métier.', 'Passive — gather and formalize business needs.'), icon: iconify('mdi:clipboard-text', '#c8aa6e') },
      { key: 'Q', name: L('Planification', 'Planning'), description: L('Découper le projet en lots, jalons et livrables.', 'Break the project down into work packages, milestones and deliverables.'), icon: iconify('mdi:calendar-check', '#0ac8b9') },
      { key: 'W', name: L('Budget', 'Budget'), description: L('Estimer les coûts et la valeur attendue.', 'Estimate costs and expected value.'), icon: iconify('mdi:cash', '#c8aa6e') },
      { key: 'E', name: L('Risques', 'Risks'), description: L('Identifier les risques et prévoir les plans de repli.', 'Identify risks and plan fallbacks.'), icon: iconify('mdi:alert-decagram', '#e84057') },
      { key: 'R', name: L('Soutenance', 'Final pitch'), description: L('Ultime — défendre la recommandation devant un jury.', 'Ultimate — defend the recommendation in front of a panel.'), icon: iconify('mdi:presentation', '#f0e6d2') },
    ],
    skins: [],
    links: [],
  },
]

/* ─────────────────────────── CHIFFRES CLÉS ─────────────────────────── */

const publishedProjects = projects.filter((p) => p.owned).length

/** Les deux "monnaies" en haut à droite (RP / Essence bleue) */
export const currencies: Currency[] = [
  { kind: 'rp', value: String(publishedProjects), label: L('Projets', 'Projects'), hint: L('Projets publiés dans la Collection', 'Projects published in the Collection') },
  { kind: 'be', value: L('3 ANS', '3 YRS'), label: L('Expérience', 'Experience'), hint: L('Années d’expérience professionnelle (Capgemini, Mehad)', 'Years of work experience (Capgemini, Mehad)') },
]

/** Les 4 statistiques du profil */
export const profileStats: Stat[] = [
  { value: String(publishedProjects), label: L('Projets livrés', 'Projects shipped') },
  { value: '3', label: L('Années d’XP', 'Years of XP') },
  { value: String(skills.length), label: L('Compétences', 'Skills') },
  { value: '∞', label: L('Canettes de Red Bull', 'Cans of Red Bull') },
]

/* Raccourcis utilisés dans l'UI */
export const assets = { rpIcon: cd.rpIcon, beIcon: cd.beIcon }
