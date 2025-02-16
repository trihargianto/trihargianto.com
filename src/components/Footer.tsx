import Container from "./Container";
import clsx from "clsx";

const links = {
  sitemap: [
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/publications", label: "Publications" },
    { href: "/pet-projects", label: "Pet Projects" },
    { href: "/faq", label: "Talks" },
    { href: "/faq", label: "Uses" },
  ],
  external: [
    { href: "/contact", label: "Book Notes" },
    { href: "/faq", label: "Cheatsheets" },
    { href: "/contact", label: "Learning Notes" },
  ],
  contact: [
    { href: "/terms", label: "LinkedIn" },
    { href: "/privacy", label: "Github" },
  ],
};

const Footer = () => {
  return (
    <>
      <div className="h-[1000px] md:h-70"></div>

      <footer
        className={clsx(
          "border-t border-t-gray-300 dark:border-t-slate-800",
          "bg-theme text-sm",
          "absolute bottom-0 flex h-auto w-full flex-col items-center justify-end py-12",
        )}
      >
        <Container>
          <div className="w-full flex flex-col lg:flex-row justify-between gap-4">
            <div className="w-full md:w-2/6 pr-4 mb-6">
              <h4 className="mb-2">trihargianto.com</h4>
              <p>The personal website of Tri Hargianto</p>

              <div className="mt-8">
                Copyright &copy; {new Date().getFullYear()} Tri Hargianto
              </div>

              <p className="mt-4">
                This site was built using{" "}
                <ExternalLink href="https://astro.build/">Astro</ExternalLink>,{" "}
                <ExternalLink href="https://reactjs.org/">React</ExternalLink>.
                <br />
                Hosted on{" "}
                <ExternalLink href="https://www.netlify.com/">
                  Netlify
                </ExternalLink>
                .
              </p>
            </div>

            <div className="w-full md:w-4/6 md:flex gap-6">
              <div className="w-full md:w-2/10 mb-10">
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
              <div className="w-full md:w-2/10 mb-10">
                <h4 className="mb-2 font-bold text-base!">External</h4>
                <ul>
                  {links.external.map((link) => (
                    <li key={link.href} className="mb-2">
                      <a
                        href={link.href}
                        className="hover:underline hover:cursor-alias"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-2/10 mb-10">
                <h4 className="mb-2 font-bold text-base!">Contact</h4>
                <ul>
                  {links.contact.map((link) => (
                    <li key={link.href} className="mb-2">
                      <a href={link.href} className="hover:underline">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="w-full md:w-4/10 mb-10">
                <h4 className="mb-2">Subscribe to my newsletter</h4>
                <p>
                  Join my newsletter to get the latest articles delivered
                  directly to your inbox.
                </p>
                <button className="mt-4 w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
                  Subscribe
                </button>
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
      className="font-bold hover:underline hover:cursor-alias"
    >
      {children}
    </a>
  );
}

export default Footer;
