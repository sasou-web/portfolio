import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>

const base = (props: P) => ({
  viewBox: '0 0 24 24',
  'aria-hidden': true as const,
  focusable: false as const,
  ...props,
})

/* ── Navigation principale ─────────────────────────────────────────── */

export const IconProfile = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2.2c2.7 0 4.6 2.1 4.6 4.9 0 3-2 5.7-4.6 5.7S7.4 10.1 7.4 7.1c0-2.8 1.9-4.9 4.6-4.9Z" />
    <path d="M3.2 21.8c.3-4.6 3.3-7.3 6-7.9l2.8 2.6 2.8-2.6c2.7.6 5.7 3.3 6 7.9H3.2Z" />
  </svg>
)

export const IconCollection = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M5 3.2 12 1l7 2.2v9.6c0 4.4-3.1 7.8-7 10.2-3.9-2.4-7-5.8-7-10.2V3.2Zm2 1.5v8.1c0 3.2 2.1 5.8 5 7.8V3.1L7 4.7Z" />
  </svg>
)

export const IconScroll = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M6 2h9.5L20 6.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm8.5 1.6V8H19L14.5 3.6ZM7.5 11v1.6h9V11h-9Zm0 3.4V16h9v-1.6h-9Zm0 3.4v1.6h6v-1.6h-6Z" />
  </svg>
)

export const IconChest = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M4 8.5C4 5.5 6.5 3 9.5 3h5C17.5 3 20 5.5 20 8.5V10H4V8.5Zm0 3h7v2.5h2V11.5h7V21H4v-9.5Z" />
  </svg>
)

/* ── Commandes de fenêtre ──────────────────────────────────────────── */

export const IconHelp = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
    <path d="M8.5 8.5a3.5 3.5 0 1 1 5.2 3.1c-1 .6-1.7 1.3-1.7 2.6v.6" />
    <circle cx="12" cy="19.5" r="0.6" fill="currentColor" />
  </svg>
)

export const IconMinimize = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round">
    <path d="M5 17h14" />
  </svg>
)

export const IconSettings = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M10.3 2h3.4l.5 2.7c.7.2 1.3.5 1.9.9l2.3-1.6 2.4 2.4-1.6 2.3c.4.6.7 1.2.9 1.9l2.7.5v3.4l-2.7.5c-.2.7-.5 1.3-.9 1.9l1.6 2.3-2.4 2.4-2.3-1.6c-.6.4-1.2.7-1.9.9l-.5 2.7h-3.4l-.5-2.7c-.7-.2-1.3-.5-1.9-.9l-2.3 1.6-2.4-2.4 1.6-2.3c-.4-.6-.7-1.2-.9-1.9L2 13.7v-3.4l2.7-.5c.2-.7.5-1.3.9-1.9L4 5.6 6.4 3.2l2.3 1.6c.6-.4 1.2-.7 1.9-.9l-.3-1.9Zm1.7 6.4a3.6 3.6 0 1 0 0 7.2 3.6 3.6 0 0 0 0-7.2Z" />
  </svg>
)

export const IconClose = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round">
    <path d="M5 5l14 14M19 5 5 19" />
  </svg>
)

/* ── Utilitaires ───────────────────────────────────────────────────── */

export const IconChevronDown = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M3 7h18l-9 11L3 7Z" />
  </svg>
)

export const IconChevronRight = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M7 3v18l11-9L7 3Z" />
  </svg>
)

export const IconArrowLeft = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 4 7 12l8 8" />
  </svg>
)

export const IconSearch = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
    <circle cx="10.5" cy="10.5" r="6.5" />
    <path d="m15.5 15.5 5 5" />
  </svg>
)

export const IconExternal = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5" />
  </svg>
)

export const IconLock = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M7 10V7.5a5 5 0 0 1 10 0V10h1.5v12h-13V10H7Zm2.2 0h5.6V7.5a2.8 2.8 0 0 0-5.6 0V10Z" />
  </svg>
)

export const IconCheck = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
)

export const IconPlay = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M6 3.5 20 12 6 20.5v-17Z" />
  </svg>
)

export const IconAddFriend = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M9.5 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8ZM1.5 20.5c.3-4.2 3.5-6.8 8-6.8 1.6 0 3 .3 4.2.9a6 6 0 0 0-1.2 5.9H1.5ZM18 13h1.8v3.1H23v1.8h-3.2V21H18v-3.1h-3.1v-1.8H18V13Z" />
  </svg>
)

export const IconFolder = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M2 5h7l2 2.5h11V20H2V5Zm13 6v2.2h-2.2V15H15v2.2h1.8V15H19v-1.8h-2.2V11H15Z" />
  </svg>
)

export const IconSort = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M3 5h18v2.2H3V5Zm0 5.9h12v2.2H3v-2.2Zm0 5.9h6V19H3v-2.2Z" />
  </svg>
)

export const IconChat = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M3 4h18v12.5H9.5L4.5 21v-4.5H3V4Zm4 5.2v2h2v-2H7Zm4 0v2h2v-2h-2Zm4 0v2h2v-2h-2Z" />
  </svg>
)

export const IconBell = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2.5a6 6 0 0 1 6 6v4.5l2 3.5H4l2-3.5V8.5a6 6 0 0 1 6-6Zm-2.5 15.5h5a2.5 2.5 0 0 1-5 0Z" />
  </svg>
)

/* ── Réseaux / contact ─────────────────────────────────────────────── */

export const IconMail = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M2.5 5h19v14h-19V5Zm2.6 2 6.9 5.2L18.9 7H5.1Zm14.4 1.7-7.5 5.6-7.5-5.6V17h15V8.7Z" />
  </svg>
)

export const IconLinkedin = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2 3.78-2 4.04 0 4.86 2.6 4.86 6V21h-4v-4.9c0-1.17-.02-2.68-1.64-2.68-1.64 0-1.9 1.28-1.9 2.6V21h-4V9.75Z" />
  </svg>
)

export const IconGithub = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.6 2.4 1.1 3 .9.1-.7.4-1.1.6-1.4-2.3-.3-4.7-1.1-4.7-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.7 5 .4.3.7 1 .7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8Z" />
  </svg>
)

export const IconCalendar = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M6.5 2h2v2h7V2h2v2H21v17H3V4h3.5V2ZM5 9v10h14V9H5Zm2 2.5h3v3H7v-3Z" />
  </svg>
)

export const IconPhone = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M6.6 2.5 9.4 6 7.7 8.6a12.5 12.5 0 0 0 7.7 7.7l2.6-1.7 3.5 2.8-1.7 3.6C11.5 21 3 12.5 3 4.2l3.6-1.7Z" />
  </svg>
)

export const IconDiscord = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M19.3 5.3A16.5 16.5 0 0 0 15.2 4l-.5 1a15.3 15.3 0 0 0-5.4 0l-.5-1a16.5 16.5 0 0 0-4.1 1.3C2.1 9.2 1.4 13 1.7 16.7a16.6 16.6 0 0 0 5 2.5l1.1-1.7c-.6-.2-1.2-.5-1.7-.8l.4-.3a11.8 11.8 0 0 0 10.9 0l.4.3c-.5.3-1.1.6-1.7.8l1.1 1.7a16.5 16.5 0 0 0 5-2.5c.4-4.3-.7-8-2.9-11.4ZM8.5 14.5c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm7 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" />
  </svg>
)

export const IconX = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.2-8.3L1.8 3h6.4l4.4 5.8L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z" />
  </svg>
)

export const IconBriefcase = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M8.5 3h7l1 3H21v14H3V6h4.5l1-3Zm1.4 2-.4 1h5l-.4-1H9.9ZM5 11.5V18h14v-6.5h-6v1.5h-2v-1.5H5Z" />
  </svg>
)

/* ── Rôles des projets (filtres de collection) ─────────────────────── */

export const IconRoleWeb = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={1.8}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
  </svg>
)

export const IconRoleMobile = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M7 1.5h10a1.5 1.5 0 0 1 1.5 1.5v18a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 21V3A1.5 1.5 0 0 1 7 1.5Zm.5 3V18h9V4.5h-9Zm3.5 15v1.5h2v-1.5h-2Z" />
  </svg>
)

export const IconRoleBackend = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M3 3h18v5H3V3Zm0 6.5h18v5H3v-5ZM3 16h18v5H3v-5Zm2.5-11v1.2h1.2V5H5.5Zm0 6.5v1.2h1.2v-1.2H5.5Zm0 6.5v1.2h1.2V18H5.5Z" />
  </svg>
)

export const IconRoleDesign = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 2 22 12 12 22 2 12 12 2Zm0 4.2L6.2 12 12 17.8 17.8 12 12 6.2Zm0 3.3 2.5 2.5-2.5 2.5L9.5 12 12 9.5Z" />
  </svg>
)

export const IconRoleGame = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M7 6h10a6 6 0 0 1 5.7 7.9l-1.3 3.9a2 2 0 0 1-3.4.7L15.5 16h-7L6 18.5a2 2 0 0 1-3.4-.7l-1.3-3.9A6 6 0 0 1 7 6Zm-.5 3.5V11H5v1.5h1.5V14H8v-1.5h1.5V11H8V9.5H6.5Zm9.5.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2 2.2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
  </svg>
)

export const IconRoleTool = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="m20.6 4.4-3.1 3.1-2.6-.4-.4-2.6 3.1-3.1a5.5 5.5 0 0 0-6.9 6.9l-7.6 7.6a2.1 2.1 0 1 0 3 3l7.6-7.6a5.5 5.5 0 0 0 6.9-6.9Z" />
  </svg>
)

export const IconRoleDesktop = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M2 4h20v13h-8.5v2.5H17V21H7v-1.5h3.5V17H2V4Zm2 2v9h16V6H4Z" />
  </svg>
)

export const IconRoleMedia = (p: P) => (
  <svg {...base(p)} fill="currentColor" fillRule="evenodd">
    <path d="M3 4h18v16H3V4Zm2 2v2h2V6H5Zm0 4v4h2v-4H5Zm0 6v2h2v-2H5Zm12-10v2h2V6h-2Zm0 4v4h2v-4h-2Zm0 6v2h2v-2h-2ZM10 8.5v7l5.5-3.5L10 8.5Z" />
  </svg>
)

export const IconRoleBot = (p: P) => (
  <svg {...base(p)} fill="currentColor" fillRule="evenodd">
    <path d="M11 2h2v3h5a2 2 0 0 1 2 2v3h1.5v5H20v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3H2.5v-5H4V7a2 2 0 0 1 2-2h5V2ZM8.5 9.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Zm7 0a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM8.5 15.5V17h7v-1.5h-7Z" />
  </svg>
)

export const IconRoleSchool = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M12 3 1 8.5 12 14l9-4.5V16h2V8.5L12 3Zm-6 9.3V16c0 1.9 2.7 3.5 6 3.5s6-1.6 6-3.5v-3.7l-6 3-6-3Z" />
  </svg>
)

export const IconGlobe = (p: P) => (
  <svg {...base(p)} fill="none" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.7 5.6 3.7 9s-1.2 6.4-3.7 9c-2.5-2.6-3.7-5.6-3.7-9S9.5 5.6 12 3Z" />
  </svg>
)

export const IconRoleAll = (p: P) => (
  <svg {...base(p)} fill="currentColor">
    <path d="M3 3h8v8H3V3Zm10 0h8v8h-8V3ZM3 13h8v8H3v-8Zm10 0h8v8h-8v-8Z" />
  </svg>
)

export const roleIcons: Record<string, (p: P) => React.JSX.Element> = {
  all: IconRoleAll,
  web: IconRoleWeb,
  mobile: IconRoleMobile,
  backend: IconRoleBackend,
  design: IconRoleDesign,
  game: IconRoleGame,
  tool: IconRoleTool,
  desktop: IconRoleDesktop,
  media: IconRoleMedia,
  bot: IconRoleBot,
  school: IconRoleSchool,
}

export const contactIcons: Record<string, (p: P) => React.JSX.Element> = {
  mail: IconMail,
  linkedin: IconLinkedin,
  github: IconGithub,
  calendar: IconCalendar,
  phone: IconPhone,
  discord: IconDiscord,
  x: IconX,
  briefcase: IconBriefcase,
}
