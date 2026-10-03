import type { Text } from '../i18n'
import type { RankTier } from '../lib/assets'

export type { Text }

export type Status = 'online' | 'ingame' | 'away' | 'offline' | 'mobile'

/** Lien interne (route du portfolio, ex: "collection/projets") ou externe (https://, mailto:) */
export interface Link {
  label: Text
  to?: string
  href?: string
}

export interface Profile {
  /** Nom affiché (comme un Riot ID) */
  name: string
  /** Nom complet (titre de l'onglet, mentions) */
  fullName: string
  /** Tag affiché après le # */
  tag: string
  /** Titre sous le nom, comme un titre de défi */
  title: Text
  /** "Niveau" d'invocateur */
  level: number
  levelHint: Text
  /** Photo / avatar (rond) */
  avatar: string
  status: Status
  statusMessage: Text
  location: Text
  email: string
  bio: Text[]
  /** Image de fond de la page Profil */
  background: string
  backgroundPosition?: string
  /** "Classement" affiché sur le profil */
  rank: {
    tier: RankTier
    queue: Text
    label: Text
    detail: Text
  }
  /** Bloc "Recherche" du profil (laisser vide pour le masquer) */
  lookingFor?: { label: Text; value: Text }[]
  languages: { name: Text; level: Text }[]
  cvUrl?: string
}

export interface Stat {
  value: string
  label: Text
}

export interface Currency {
  kind: 'rp' | 'be'
  value: Text
  label: Text
  hint: Text
}

export interface Friend {
  name: string
  status: Status
  activity: Text
  avatar: string
  href?: string
}

export interface FriendGroup {
  name: Text
  members: Friend[]
  collapsed?: boolean
}

export interface ContactOption {
  label: Text
  /** Sujet pré-rempli pour les liens mailto: */
  subject?: Text
}

export interface ContactMode {
  id: string
  name: Text
  subtitle: Text
  image: string
  icon: 'mail' | 'linkedin' | 'github' | 'calendar' | 'phone' | 'discord' | 'x'
  href: string
  options?: ContactOption[]
}

export interface HeroSlide {
  eyebrow: Text
  title: Text
  description: Text
  image: string
  /** Position CSS de l'image (ex: "center 20%") */
  imagePosition?: string
  cta: Link
  secondary?: Link
}

export interface HomeCard {
  eyebrow: Text
  title: Text
  image: string
  imagePosition?: string
  to?: string
  href?: string
}

export interface PatchNote {
  version: string
  date: Text
  title: Text
  image: string
  imagePosition?: string
  summary: Text
  items: Text[]
  href?: string
}

/** queue = "en file d'attente" (recherche en cours) */
export type MatchResult = 'victory' | 'defeat' | 'ongoing' | 'queue'

export interface MatchEntry {
  result: MatchResult
  resultLabel: Text
  org: Text
  logo: string
  role: Text
  /** Type : CDI, Alternance, Diplôme… */
  mode: Text
  location: Text
  period: Text
  duration?: Text
  /** Gros chiffre façon KDA (facultatif : sinon la durée est affichée) */
  kda?: string
  kdaLabel?: Text
  stats: { label: Text; value: Text }[]
  /** Icônes "objets" (technos utilisées) */
  items: { name: string; icon: string }[]
  description: Text[]
  cta?: Link
}

export interface Skill {
  name: Text
  icon: string
  /** Niveau de maîtrise 1 → 10 */
  level: number
  points: number
  category: Text
  detail: Text
}

export interface Achievement {
  name: Text
  description: Text
  tier: RankTier
  category: Text
  value: Text
  date?: string
}

export type AbilityKey = 'P' | 'Q' | 'W' | 'E' | 'R'

export interface Project {
  id: string
  name: Text
  title: Text
  /** Catégories = rôles des champions (filtres de la collection) */
  roles: string[]
  year: string
  /** Difficulté / complexité 1 → 3 */
  difficulty: 1 | 2 | 3
  /** Vignette carrée de la grille */
  thumbnail: string
  /** Grande image de fond de la fiche */
  splash: string
  splashPosition?: string
  /** Possédé = publié. false = grisé "Bientôt disponible" */
  owned: boolean
  mastery: number
  description: Text[]
  abilities: { key: AbilityKey; name: Text; description: Text; icon: string }[]
  /** Galerie = "skins" */
  skins: { name: Text; image: string }[]
  links: Link[]
}
