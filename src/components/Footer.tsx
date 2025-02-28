import type { ReactNode } from "react";
import clsx from "clsx";

import {
  // BOOK_NOTES_LINK,
  // CHEATSHEETS_LINK,
  // LEARNING_NOTES_LINK,
  NEWSLETTER_LINK,
  SOCIAL_GITHUB_LINK,
  SOCIAL_LINKEDIN_LINK,
  SOCIAL_MEDIUM_LINK,
  RESUME_LINK,
  BOOK_SHELF_LINK,
  MENTORSHIP_LINK,
  BOOKMARKS_LINK,
} from "../constants/config";
import Button from "./Button";
import Container from "./Container";

const links = {
  sitemap: [
    { href: "/about/", label: "About" },
    { href: "/blog/", label: "Blog" },
    { href: "/media-kit/", label: "Media Kit" },
    { href: "/pet-projects/", label: "Pet Projects" },
    { href: "/publications/", label: "Publications" },
    { href: "/speaking/", label: "Speaking" },

    // TODO: Add Guest Book feature
    // { href: "/guest-book", label: "Guest Book" },
  ],
  external: [
    { href: BOOK_SHELF_LINK, label: "Book Shelf" },
    { href: BOOKMARKS_LINK, label: "Bookmarks" },
    { href: MENTORSHIP_LINK, label: "Mentorship" },
    { href: RESUME_LINK, label: "Resume" },
    // { href: BOOK_NOTES_LINK, label: "Book Notes" },
    // { href: CHEATSHEETS_LINK, label: "Cheatsheets" },
    // { href: LEARNING_NOTES_LINK, label: "Learning Notes" },
  ],
  contact: [
    {
      href: SOCIAL_GITHUB_LINK,
      label: "Github",
      icon: (
        <span class="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 496 512"
          >
            {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
          </svg>
        </span>
      ),
    },
    {
      href: SOCIAL_LINKEDIN_LINK,
      label: "LinkedIn",
      icon: (
        <span class="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg>
        </span>
      ),
    },
    {
      href: SOCIAL_MEDIUM_LINK,
      label: "Medium",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="icon icon-tabler icons-tabler-outline icon-tabler-brand-medium"
          style={{ marginTop: "-2px" }}
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
          <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
          <path d="M8 9h1l3 3l3 -3h1" />
          <path d="M8 15l2 0" />
          <path d="M14 15l2 0" />
          <path d="M9 9l0 6" />
          <path d="M15 9l0 6" />
        </svg>
      ),
    },
  ],
  insights: [
    { href: "https://inspect.trihargianto.com", label: "Performance" },
    { href: "/rss.xml", label: "RSS" },
  ],
};

const Footer = () => {
  return (
    <>
      <div className="h-[850px] sm:h-70"></div>

      <footer
        className={clsx(
          "border-t border-t-gray-300 dark:border-t-slate-800",
          "bg-theme text-sm",
          "absolute bottom-0 flex h-auto w-full flex-col items-center justify-end pt-10 pb-3",
        )}
      >
        <Container>
          <div className="w-full flex flex-col sm:flex-row justify-between gap-4">
            <div className="w-full sm:w-2/6 pr-4 mb-6">
              <h4 className="mb-2 font-bold">
                <a href="/" className="hover:underline">
                  trihargianto.com
                </a>
              </h4>
              <p className="mb-3">The personal website of Tri Hargianto.</p>

              <div className="flex gap-2 my-4">
                {links.contact.map((link) => (
                  <ExternalLink
                    href={link.href}
                    key={link.href}
                    title={link.label}
                  >
                    {link.icon}
                  </ExternalLink>
                ))}
              </div>

              <p>
                Join my newsletter to get the latest articles delivered directly
                to your inbox.
              </p>

              <Button
                variant="secondary"
                className="mt-5"
                as="a"
                href={`${NEWSLETTER_LINK}?utm_source=trihargianto`}
                target="_blank"
              >
                Subscribe
              </Button>

              <div className="mt-8">
                Copyright &copy; {new Date().getFullYear()} Tri Hargianto
              </div>
            </div>

            <div className="w-full sm:w-4/6 md:w-3/6 lg:w-2/6 sm:flex gap-6 justify-end">
              <div className="w-full sm:w-1/3 mb-10">
                <h4 className="mb-2 font-bold text-base!">Sitemap</h4>
                <ul>
                  {links.sitemap.map((link) => (
                    <li key={link.href} className="mb-2">
                      <a href={link.href} className="hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:w-1/3 mb-10">
                <h4 className="mb-2 font-bold text-base!">Resources</h4>
                <ul>
                  {links.external.map((link) => (
                    <li key={link.href} className="mb-2">
                      <ExternalLink href={link.href}>{link.label}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full sm:w-1/3 mb-10">
                <h4 className="mb-2 font-bold text-base!">The Website</h4>
                <ul>
                  {links.insights.map((link) => (
                    <li key={link.href} className="mb-2">
                      <ExternalLink href={link.href}>{link.label}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}

function ExternalLink({ href, children, ...props }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline hover:cursor-alias"
      {...props}
    >
      {children}
    </a>
  );
}

export default Footer;
