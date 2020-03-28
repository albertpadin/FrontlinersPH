import { useStaticQuery, graphql } from 'gatsby';

export const SiteTitleQuery = () =>
  useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
