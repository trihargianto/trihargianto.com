import profilePicPng from "../img/profile-pic-v3.png";
import profilePicWebp from "../img/profile-pic-v3.webp";

const GreetingCard = ({ children }) => {
  return (
    <div className="flex flex-row items-center gap-8 sm:flex-row md:w-full md:gap-0 lg:w-5/6">
      <picture className="w-1/4">
        <source srcSet={profilePicWebp.src} type="image/webp" />
        <img
          src={profilePicPng.src}
          alt="Tri Hargianto"
          className="aspect-[2/3] sm:w-72 md:w-40"
        />
      </picture>

      <div className="w-3/4">
        <h2 className="h-15 text-xl sm:h-auto sm:text-2xl mb-2 sm:mb-5">
          {children}
        </h2>

        <p className="mb-5">
          I&apos;m{" "}
          <span className="font-bold text-blue-700 dark:text-blue-400">
            Tri Hargianto
          </span>
          , a Software Engineer&nbsp;
          <a href="https://maps.app.goo.gl/p1eF4Amvin6GGofB6" target="__blank">
            <span className="mt-1 inline-block sm:mt-0 sm:inline">
              from Indonesia&nbsp;
            </span>{" "}
          </a>
          🇮🇩
        </p>
        <p className="hidden sm:block">
          This site is a place where I share{" "}
          <span className="hidden sm:inline">
            my projects, tutorials, thoughts, and
          </span>{" "}
          everything <span className="hidden sm:inline">else I want to </span>
          the world.
        </p>
      </div>
    </div>
  );
};

export default GreetingCard;
