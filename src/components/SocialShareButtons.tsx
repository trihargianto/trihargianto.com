interface SocialShareButtonsProps {
  socialConfig: {
    config: {
      url: string;
      title: string;
      description: string;
    };
    twitter: string;
  };
}

const SocialShareButtons = ({ socialConfig }: SocialShareButtonsProps) => {
  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(socialConfig.config.url)}`;
    window.open(facebookUrl, "_blank");
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/share?url=${encodeURIComponent(socialConfig.config.url)}&text=${encodeURIComponent(socialConfig.config.title)}&via=${socialConfig.twitter}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnLinkedin = () => {
    const linkedinUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(socialConfig.config.url)}`;
    window.open(linkedinUrl, "_blank");
  };

  return (
    <div className="mb-10 flex h-12 items-center md:mb-5 gap-1">
      <span>Share: &nbsp;</span>
      <button onClick={shareOnFacebook} aria-label="Share on Facebook">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 320 512"
          >
            {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
            <path d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z" />
          </svg>
        </span>
      </button>
      &nbsp;
      <button onClick={shareOnTwitter} aria-label="Share on Twitter">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 512 512"
          >
            {/*Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.*/}
            <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
          </svg>
        </span>
      </button>
      &nbsp;
      <button onClick={shareOnLinkedin} aria-label="Share on LinkedIn">
        <span className="[&>svg]:h-5 [&>svg]:w-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 448 512"
          >
            {/* Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
            <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
          </svg>
        </span>
      </button>
    </div>
  );
};

export default SocialShareButtons;
