module.exports = {
  siteMetadata: {
    title: 'FrontlinersPH',
    description: 'Supporting frontliners fighting COVID-19 in the Philippines',
    author: '@frontlinersph',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'FrontlinersPH',
        short_name: 'frontlinersph',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/gatsby-icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        credentials: {
          apiKey: 'AIzaSyA_JI94Qg3aFRY09D47-PEgF49QzhQJUaE',
          authDomain: 'frontliners-ph.firebaseapp.com',
          databaseURL: 'https://frontliners-ph.firebaseio.com',
          projectId: 'frontliners-ph',
          storageBucket: 'frontliners-ph.appspot.com',
          messagingSenderId: '482280221163',
          appId: '1:482280221163:web:901d56be0c04e9fd4011ae',
          measurementId: 'G-X6G901TLVV',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-alias-imports',
      options: {
        alias: {
          '@src': 'src',
          '@components': 'src/components',
          '@layouts': 'src/layouts',
          '@styles': 'src/styles',
        },
        extensions: ['js'],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
};
