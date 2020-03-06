/* -----------------------------------------------------------------------------*

FILE
/gatsby-config.js

DESCRIPTION
The file gatsby-config.js defines your site’s metadata, plugins, and other
general configuration. This file should be in the root of your Gatsby site.

READ MORE
https://www.gatsbyjs.org/docs/api-files-gatsby-config/

*----------------------------------------------------------------------------- */

module.exports = {
  siteMetadata: {
    title: `default`,
    description: `default`,
    author: `default`
  },
  plugins: [
    `gatsby-plugin-react-helmet`, {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    `gatsby-transformer-sharp`, {
      resolve: `gatsby-plugin-sass`,
      options: {
        includePaths: [require('path').resolve(__dirname, 'node_modules')]
      }
    },
    `gatsby-plugin-sharp`, {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `default`,
        short_name: `default`,
        start_url: `/`,
        icon: `src/images/favicon.svg`
      }
    }, {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `n9vko5pfggt4`,
        accessToken: `O__eLL9wTnpMxkaglEWmvEtgPn3wFPttZo4FQniIMfM`,
        host: `preview.contentful.com`,
        forceFullSync: true
      }
    }
  ]
}
