import clsx from "clsx";

import {
  // BOOK_NOTES_LINK,
  // CHEATSHEETS_LINK,
  // LEARNING_NOTES_LINK,
  NEWSLETTER_LINK,
  SOCIAL_GITHUB_LINK,
  SOCIAL_LINKEDIN_LINK,
  SOCIAL_MEDIUM_LINK,
} from "../constants/config";
import Button from "./Button";
import Container from "./Container";

const links = {
  sitemap: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/pet-projects", label: "Pet Projects" },
    { href: "/publications", label: "Publications" },
    { href: "/press-kit", label: "Press Kit" },
    // TODO: Add Guest Book feature
    // { href: "/guest-book", label: "Guest Book" },
  ],
  external: [
    // { href: BOOK_NOTES_LINK, label: "Book Notes" },
    // { href: CHEATSHEETS_LINK, label: "Cheatsheets" },
    // { href: LEARNING_NOTES_LINK, label: "Learning Notes" },
  ],
  contact: [
    { href: SOCIAL_GITHUB_LINK, label: "Github" },
    {
      href: SOCIAL_LINKEDIN_LINK,
      label: "LinkedIn",
    },
    {
      href: SOCIAL_MEDIUM_LINK,
      label: "Medium",
    },
  ],
};

const Footer = () => {
  return (
    <>
      <div className="h-[550px] sm:h-70"></div>

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
              <h4 className="mb-2">trihargianto.com</h4>
              <p className="mb-3">The personal website of Tri Hargianto.</p>

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
              {/* TODO: External links */}
              {/* <div className="w-full sm:w-1/3 mb-10">
                <h4 className="mb-2 font-bold text-base!">External</h4>
                <ul>
                  {links.external.map((link) => (
                    <li key={link.href} className="mb-2">
                      <ExternalLink href={link.href}>{link.label}</ExternalLink>
                    </li>
                  ))}
                </ul>
              </div> */}
              <div className="w-full sm:w-1/3 mb-10">
                <h4 className="mb-2 font-bold text-base!">Social Media</h4>
                <ul>
                  {links.contact.map((link) => (
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

function ExternalLink({ href, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:underline hover:cursor-alias"
    >
      {children}
    </a>
  );
}

export default Footer;
