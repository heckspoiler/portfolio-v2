import { projectTexts } from './projectTexts';

/** Lifecycle of a project, surfaced as a badge over its preview image. */
export type ProjectStatus = 'production' | 'development';

export interface Project {
  slug: string;
  image: string;
  video: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  link: string | null;
  github: string;
  technologies: string[];
  status: ProjectStatus;
}

export const PROJECTS: Project[] = [
  {
    slug: 'calvaquiz',
    status: 'production',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782507513/calvaquiz_duggkd.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782507486/calvaquiz_uzw7up.mov',
    name: 'calvaquiz',
    shortDescription: projectTexts.calvaquiz.short,
    longDescription: projectTexts.calvaquiz.long,
    link: 'https://www.calvaquiz.ch/',
    github: 'https://github.com/heckspoiler/sinecloud/tree/main/sinecloud',
    technologies: [
      'TS',
      'Next.js',
      'Payload CMS',
      'Neon DB',
      'Tailwind CSS',
      'Tanstack Query',
      'Shadcn UI',
      'Zustand',
    ],
  },

  {
    slug: 'konomi',
    status: 'production',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503738/konomi_dvzclm.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782504160/konomi_thcpkx.mov',
    name: 'konomi',
    shortDescription: projectTexts.konomi.short,
    longDescription: projectTexts.konomi.long,
    link: 'https://www.konomi.ch/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'Next.js',
      'Three.js',
      'R3F',
      'CSS Modules',
      'Prismic CMS',
      'Zustand',
    ],
  },
  {
    slug: 'ozelot',
    status: 'production',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503731/ozelot_pbgrcg.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782679858/ozeloit_bkw6oz.mov',
    name: 'Ozelot Studios',
    shortDescription: projectTexts.ozelot.short,
    longDescription: projectTexts.ozelot.long,
    link: 'https://www.ozelot.ltd/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'Next.js',
      'Three.js',
      'R3F',
      'CSS Modules',
      'Prismic CMS',
      'Zustand',
    ],
  },
  {
    slug: 'piagent',
    status: 'development',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782503106/piagent_l1ujaj.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782502834/piagent_wx0wiq.mov',
    name: 'PI Agent VSX',
    shortDescription: projectTexts.piAgent.short,
    longDescription: projectTexts.piAgent.long,
    link: null,
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'React',
      'TS',
      'Bun',
      'VSCode SDK',
      'PI Agent SDK',
      'Zustand',
    ],
  },
  {
    slug: 'gahdamn',
    status: 'production',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782599247/gahdamn_eic9iu.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782599322/gahdamn_kkoibh.mov',
    name: 'Gahdamn',
    shortDescription: projectTexts.gahdamn.short,
    longDescription: projectTexts.gahdamn.long,
    link: 'https://www.youtube.com/watch?v=8ybW48rKBME',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['TS', 'VSCode SDK'],
  },
  {
    slug: 'CHOP',
    status: 'development',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782598365/chop_vxq2fw.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782598162/0627_twcdhw.mov',
    name: 'CHOP',
    shortDescription: projectTexts.chop.short,
    longDescription: projectTexts.chop.long,
    link: null,
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'TS',
      'Bun',
      'Next.js',
      'FastAPI',
      'ZOD',
      'Tanstack Query',
      'FFMPEG',
    ],
  },
  {
    slug: 'helpme',
    status: 'production',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782681480/ilonaburfday_defsba.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782681466/ilonaburfday_kctp0y.mov',
    name: 'Help me find a present',
    shortDescription: projectTexts.helpme.short,
    longDescription: projectTexts.helpme.long,
    link: 'https://ilonaburfday.vercel.app/',
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: ['Next.Js', 'Vanilla JS', 'Zustand'],
  },
  {
    slug: 'pielectron',
    status: 'development',
    image:
      'https://res.cloudinary.com/dd8brfluh/image/upload/v1782679558/imasenrornow_lokz1v.png',
    video:
      'https://res.cloudinary.com/dd8brfluh/video/upload/v1782679514/imaseniornow_vzeb7s.mov',
    name: `I'm a senior now`,
    shortDescription: projectTexts.pielectron.short,
    longDescription: projectTexts.pielectron.long,
    link: null,
    github: 'https://github.com/heckspoiler/chewstreet-1',
    technologies: [
      'TS',
      'Electron',
      'React',
      'PI Agent SDK',
      'Node',
      'Zustand',
    ],
  },
];
