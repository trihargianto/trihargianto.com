module.exports = {
  siteMetadata: {
    title: `Tri Hargianto`,
    author: {
      name: `Tri Hargianto`,
      summary: `Developer yang sekarang sedang tinggal dan bekerja di Yogyakarta, Indonesia`,
    },
    description: `Website ini adalah catatan digital saya, berisi tulisan dari apa yang saya pelajari dan apapun yang ingin saya tulis. Saya harap tulisan saya bisa bermanfaat.`,
    siteUrl: `https://trihargianto.netlify.app/`,
    feedbackUrl: `https://docs.google.com/forms/d/e/1FAIpQLSc-2e4XWfd1AeFJd21dhLALLl-QiiUPt-lOe9gHU2aOQ7zf0w/viewform?usp=sf_link`,
    social: {
      twitter: `trihargianto`,
      github: `trihargianto`,
    },
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content`,
        name: `content`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              className: `table-of-contents`,
            },
          },
          {
            resolve: `gatsby-remark-autolink-headers`,
            options: {
              className: `heading-markdown`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-111795095-2",
        head: true,
        respectDNT: false,
        pageTransitionDelay: 0,
        defer: false,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tri Hargianto Website`,
        short_name: `trihargianto website`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/man-technologist.png`,
      },
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: false,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
