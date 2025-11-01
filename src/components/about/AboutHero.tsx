import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import type { HeroPhoto, HeroStatement } from "../../constants/about";
import usePrefersReducedMotion from "../../hooks/usePrefersReducedMotion";

type Props = {
  statements: HeroStatement[];
  photos: HeroPhoto[];
};

const AboutHero: React.FC<Props> = ({ statements, photos }) => {
  const [activeStatementIndex, setActiveStatementIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [parallaxOffset, setParallaxOffset] = useState(0);
  const [activePhotoId, setActivePhotoId] = useState(
    () => photos[0]?.id ?? "",
  );

  const activeStatement = statements[activeStatementIndex];

  useEffect(() => {
    if (!statements.length) {
      return;
    }

    if (prefersReducedMotion) {
      setDisplayText(statements[activeStatementIndex].text);
      return;
    }

    const fullText = statements[activeStatementIndex].text;
    let timer = 0;

    if (!isDeleting && displayText.length < fullText.length) {
      timer = window.setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1));
      }, 55);
    } else if (!isDeleting && displayText.length === fullText.length) {
      timer = window.setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && displayText.length > 0) {
      timer = window.setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length - 1));
      }, 35);
    } else if (isDeleting && displayText.length === 0) {
      setIsDeleting(false);
      setActiveStatementIndex(
        (prevIndex) => (prevIndex + 1) % statements.length,
      );
    }

    return () => window.clearTimeout(timer);
  }, [
    statements,
    activeStatementIndex,
    prefersReducedMotion,
    isDeleting,
    displayText,
  ]);

  useEffect(() => {
    if (prefersReducedMotion && statements[activeStatementIndex]) {
      setDisplayText(statements[activeStatementIndex].text);
    }
  }, [prefersReducedMotion, statements, activeStatementIndex]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setParallaxOffset(0);
      return;
    }

    let ticking = false;

    const updateOffset = () => {
      const offset = window.scrollY * 0.08;
      setParallaxOffset(offset);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateOffset);
        ticking = true;
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (!photos.length) {
      return;
    }

    if (!photos.find((photo) => photo.id === activePhotoId)) {
      setActivePhotoId(photos[0].id);
    }
  }, [photos, activePhotoId]);

  const activePhoto = useMemo(
    () =>
      photos.find((photo) => photo.id === activePhotoId) ?? photos[0] ?? null,
    [photos, activePhotoId],
  );

  return (
    <section className="relative isolate overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16 text-slate-100 shadow-2xl ring-1 ring-slate-700/40 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 sm:px-10 lg:px-14 lg:py-20">
      <div className="pointer-events-none absolute -left-16 top-10 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-10 bottom-0 hidden h-72 w-72 rounded-full bg-purple-500/10 blur-3xl lg:block" />

      <div className="relative grid gap-12 lg:grid-cols-[1.05fr,0.95fr] lg:items-center">
        <div className="space-y-8">
          <span className="inline-flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.4em] text-slate-300 dark:bg-slate-800/60">
            About
            <span className="h-1 w-1 rounded-full bg-sky-400"></span>
            Tri Hargianto
          </span>

          <div className="space-y-5">
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
              <span className="block text-slate-300">Performance-minded</span>
              <span
                className="relative mt-2 inline-flex items-baseline gap-2 font-semibold text-white"
                aria-live="polite"
              >
                <span>{displayText}</span>
                <span
                  aria-hidden="true"
                  className={clsx(
                    "h-6 w-[2px] animate-pulse bg-sky-400 sm:h-8",
                    prefersReducedMotion && "hidden",
                  )}
                />
              </span>
              <span className="sr-only">
                {activeStatement ? activeStatement.text : ""}
              </span>
            </h1>

            <p className="max-w-xl text-lg leading-relaxed text-slate-200">
              I help teams build fast, resilient web experiences by blending
              performance engineering, developer experience, and people-centered
              leadership. Every project is a chance to leave users smiling and
              developers high-fiving CI.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-200/90">
            {statements.map((statement, index) => (
              <button
                key={statement.id}
                type="button"
                onClick={() => {
                  setActiveStatementIndex(index);
                  setDisplayText("");
                  setIsDeleting(false);
                }}
                className={clsx(
                  "inline-flex items-center gap-2 rounded-full border px-3 py-1 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                  activeStatementIndex === index
                    ? "border-sky-400/80 bg-sky-500/10 text-white"
                    : "border-slate-700/80 bg-slate-800/50 hover:border-sky-500/60 hover:text-white",
                )}
              >
                <span className="inline-block h-2 w-2 rounded-full bg-sky-400/90" />
                {statement.text.split(" ").slice(0, 4).join(" ")}...
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#connect"
              className="inline-flex items-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
            >
              Let's build something unforgettable
            </a>
            <a
              href="#journey"
              className="inline-flex items-center rounded-full border border-slate-600 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-sky-400 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
            >
              See the journey
            </a>
          </div>
        </div>

        {activePhoto ? (
          <div className="relative">
            <div
              className="group relative mx-auto max-w-sm overflow-hidden rounded-[2rem] border border-slate-700/80 bg-slate-900/70 shadow-2xl transition duration-500 hover:border-sky-400/60 lg:ml-auto"
              style={{
                transform: prefersReducedMotion
                  ? undefined
                  : `translateY(${parallaxOffset * -0.4}px)`,
              }}
            >
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-sky-500/10 via-transparent to-purple-500/10 opacity-0 transition group-hover:opacity-100" />
              <img
                src={activePhoto.image.src}
                alt={activePhoto.alt}
                width={activePhoto.image.width}
                height={activePhoto.image.height}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                loading="lazy"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent p-6">
                <p className="text-sm font-medium text-slate-200">
                  {activePhoto.description}
                </p>
              </div>
            </div>

            <div className="mt-4 flex justify-center gap-3 lg:justify-end">
              {photos.map((photo) => (
                <button
                  key={photo.id}
                  type="button"
                  onClick={() => setActivePhotoId(photo.id)}
                  className={clsx(
                    "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-widest transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400",
                    activePhoto?.id === photo.id
                      ? "border-sky-400/80 bg-sky-500/20 text-white"
                      : "border-slate-600 bg-slate-800/60 text-slate-300 hover:border-sky-400/60 hover:text-white",
                  )}
                >
                  {photo.label}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default AboutHero;
