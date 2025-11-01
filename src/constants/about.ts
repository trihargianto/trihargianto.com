import type { StaticImageMetadata } from "astro";

import casualPhoto from "../img/me-taking-a-sip.jpg";
import profilePhoto from "../img/profile-pic-v3.webp";

export type HeroStatement = {
  id: string;
  text: string;
};

export type HeroPhoto = {
  id: string;
  label: string;
  description: string;
  image: StaticImageMetadata;
  alt: string;
};

export const heroStatements: HeroStatement[] = [
  {
    id: "ship-faster",
    text: "I make slow websites fast and help teams ship faster.",
  },
  {
    id: "obsessed-ms",
    text: "I've saved teams 1,000+ developer hours by obsessing over milliseconds.",
  },
  {
    id: "builds-too-long",
    text: "If your builds take 20 minutes, we need to talk.",
  },
];

export const heroPhotos: HeroPhoto[] = [
  {
    id: "professional",
    label: "Studio mode",
    description: "Ready for your leadership stand-ups.",
    image: profilePhoto,
    alt: "Tri Hargianto smiling with a coffee shop background.",
  },
  {
    id: "casual",
    label: "Casual mode",
    description: "Coffee in hand, ideas flowing.",
    image: casualPhoto,
    alt: "Tri Hargianto taking a sip of coffee with a relaxed vibe.",
  },
];

export type QuickStat = {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  playfulCaption?: string;
  icon: string;
};

export const quickStats: QuickStat[] = [
  {
    id: "experience",
    label: "Years shipping web experiences",
    value: 12,
    suffix: "+",
    icon: "AcademicCapIcon",
  },
  {
    id: "projects",
    label: "Production launches I still brag about",
    value: 48,
    suffix: "+",
    icon: "SparklesIcon",
  },
  {
    id: "mentored",
    label: "Developers mentored into their next role",
    value: 18,
    suffix: "",
    icon: "UserGroupIcon",
  },
  {
    id: "build-improvement",
    label: "Build time improvements (max)",
    value: 93,
    suffix: "%",
    icon: "BoltIcon",
  },
  {
    id: "lines-written",
    label: "Lines of code written (and deleted)",
    value: 500,
    suffix: "K",
    playfulCaption: "Mostly deleted. That's the secret.",
    icon: "CodeBracketIcon",
  },
  {
    id: "coffee",
    label: "Coffees consumed while debugging",
    value: 999,
    suffix: "+",
    playfulCaption: "☕ Coffee consumed: technically ∞",
    icon: "BeakerIcon",
  },
];

export type JourneyMilestone = {
  id: string;
  year: string;
  title: string;
  headline: string;
  story: string;
  detail: string;
  icon: string;
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    id: "first-line",
    year: "2004",
    title: "Geocities & Glitter",
    headline: "Hand-coded websites so my band looked cooler online.",
    story:
      "My first line of code lived inside a <marquee>. It was chaotic, but it taught me how design, copy, and performance shape the same story.",
    detail:
      "That ridiculous fan site turned into weekend gigs fixing friends' blogs. I learned fast that people remember how fast a page loads more than how many drop shadows it has.",
    icon: "SparklesIcon",
  },
  {
    id: "first-ship",
    year: "2011",
    title: "First Production Launch",
    headline: "Shipped an e-commerce rebuild that doubled conversions.",
    story:
      "I joined a startup with a 12-second checkout. We cut it to 2.1 seconds by tearing out blocking scripts and rebuilding the front-end pipeline.",
    detail:
      "That launch taught me to measure everything: build time, largest contentful paint, the number of developer sighs per deploy. We shipped twice as fast, and I was hooked on performance.",
    icon: "RocketLaunchIcon",
  },
  {
    id: "dx-moment",
    year: "2016",
    title: "DX Awakening",
    headline: "Built an internal tool that saved the team 20 hours every week.",
    story:
      "We were waiting 18 minutes per build. I automated the release process, added preview builds, and introduced linting that actually helped.",
    detail:
      "The tool was just Node scripts and some thoughtful docs, but it unlocked a culture shift. Suddenly the juniors were leading deploys, QA stopped shipping regressions, and we reclaimed weekends.",
    icon: "CommandLineIcon",
  },
  {
    id: "today",
    year: "Now",
    title: "Technical Leadership",
    headline: "Helping teams scale products (and the people building them).",
    story:
      "I lead frontend teams, run architecture reviews, and obsess over performance budgets. The mission is simple: empower people to ship delightful experiences fast.",
    detail:
      "Lately that's meant mentoring tech leads, building design systems, and slashing build times for distributed teams. I still fix flaky tests because no one deserves a red CI badge.",
    icon: "GlobeAltIcon",
  },
];

export type SkillCategory = {
  id: string;
  label: string;
  description: string;
  skills: Array<{
    id: string;
    name: string;
    tagline: string;
    experience: string;
    highlight: string;
    icon: string;
  }>;
};

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    label: "Frontend Engineering",
    description:
      "Interfaces that feel effortless, backed by systems that can scale with your roadmap.",
    skills: [
      {
        id: "react",
        name: "React & Ecosystem",
        tagline: "I dream in components.",
        experience: "9 yrs",
        highlight: "Led migration of a 250+ component design system to React 18.",
        icon: "Squares2X2Icon",
      },
      {
        id: "next",
        name: "Next.js / Astro",
        tagline: "Static, hybrid, edge — use what fits the story.",
        experience: "6 yrs",
        highlight: "Delivered sub-second TTFB for a global SaaS product.",
        icon: "CubeTransparentIcon",
      },
      {
        id: "typescript",
        name: "TypeScript",
        tagline: "Type-safety with pragmatism.",
        experience: "7 yrs",
        highlight: "Introduced a type-first culture that dropped bugs 32%.",
        icon: "DocumentCheckIcon",
      },
    ],
  },
  {
    id: "performance",
    label: "Performance Engineering",
    description:
      "Speed isn't vanity. It's user trust, revenue, and happy engineering teams.",
    skills: [
      {
        id: "profiling",
        name: "Profiling & Audits",
        tagline: "Find and fix the millisecond leaks.",
        experience: "10 yrs",
        highlight: "Cut bundle size 48% with code splitting and image budgets.",
        icon: "ChartBarIcon",
      },
      {
        id: "tooling",
        name: "Build Tooling",
        tagline: "Tamed webpack and made it purr.",
        experience: "8 yrs",
        highlight: "93% build time reduction with Turbopack + thoughtful caching.",
        icon: "WrenchIcon",
      },
      {
        id: "monitoring",
        name: "Monitoring",
        tagline: "Dashboards devs actually check.",
        experience: "6 yrs",
        highlight: "Rolled out Real User Monitoring across 4 product squads.",
        icon: "ChartPieIcon",
      },
    ],
  },
  {
    id: "leadership",
    label: "Leadership & Enablement",
    description:
      "Teams ship faster when they feel safe to experiment and supported to grow.",
    skills: [
      {
        id: "mentorship",
        name: "Mentorship",
        tagline: "Turned juniors into seniors.",
        experience: "8 yrs",
        highlight: "Coached 12 devs into senior roles with growth roadmaps.",
        icon: "LightBulbIcon",
      },
      {
        id: "strategy",
        name: "Technical Strategy",
        tagline: "Roadmaps that blend velocity with stability.",
        experience: "7 yrs",
        highlight: "Architected migration plan touching 6 micro-frontends.",
        icon: "MapIcon",
      },
      {
        id: "communication",
        name: "Executive Communication",
        tagline: "Translate tech into outcomes.",
        experience: "9 yrs",
        highlight:
          "Aligned exec stakeholders with narrative dashboards and demos.",
        icon: "MegaphoneIcon",
      },
    ],
  },
  {
    id: "tools",
    label: "Favorite Tools",
    description:
      "A curated kit that keeps teams humming without reinventing the wheel.",
    skills: [
      {
        id: "storybook",
        name: "Storybook",
        tagline: "Specs, docs, and UI reviews in one hub.",
        experience: "5 yrs",
        highlight: "Hosted design tokens + interactive prototypes for 4 squads.",
        icon: "BookOpenIcon",
      },
      {
        id: "playwright",
        name: "Playwright",
        tagline: "Test like the users do.",
        experience: "4 yrs",
        highlight: "Stabilized regression suite to 99% pass rate overnight.",
        icon: "ShieldCheckIcon",
      },
      {
        id: "figma",
        name: "Figma",
        tagline: "Design handoff without the telephone game.",
        experience: "6 yrs",
        highlight: "Built shared libraries that cut rework cycles in half.",
        icon: "PaintBrushIcon",
      },
    ],
  },
];

export type ImpactMetric = {
  id: string;
  label: string;
  metric: string;
  description: string;
  before: number;
  after: number;
  unit: string;
};

export const impactMetrics: ImpactMetric[] = [
  {
    id: "build-time",
    label: "Build Time",
    metric: "-93%",
    description:
      "Reduced build pipeline from 18 minutes to 1m14s by slicing bundles, caching intelligently, and removing legacy steps.",
    before: 18,
    after: 1.2,
    unit: "minutes",
  },
  {
    id: "lcp",
    label: "Largest Contentful Paint",
    metric: "1.9s → 0.8s",
    description:
      "Re-architected image delivery and prioritized critical CSS to halve LCP on a high-traffic marketing site.",
    before: 1.9,
    after: 0.8,
    unit: "seconds",
  },
  {
    id: "dev-hours",
    label: "Developer Hours Saved",
    metric: "20 hrs / week",
    description:
      "Automated release tooling and preview deployments so engineers focus on solving problems, not waiting on CI.",
    before: 0,
    after: 20,
    unit: "hours saved",
  },
];

export const callToActionCopy = {
  headline: "Ready to build something fast, resilient, and unforgettable?",
  subheadline:
    "I partner with teams who care about performance, developer experience, and the humans on both sides of the screen.",
  primaryCta: {
    label: "Book a discovery call",
    href: "https://cal.com/trihargianto/30min",
  },
  secondaryCta: {
    label: "Email me directly",
    href: "mailto:hello@trihargianto.com",
  },
  availability: "🟢 Currently partnering with teams on performance-led initiatives.",
  responseTime: "Replies within 1-2 business days, timezone GMT+7.",
};

export type CallToActionCopy = typeof callToActionCopy;
