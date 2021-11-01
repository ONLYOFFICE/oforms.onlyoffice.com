import React from "react";
import { graphql } from "gatsby";

const Error404Page = () => {
    return(
        <div>
            ERROR 404!
        </div>
    );
}

export default Error404Page;

export const query = graphql`
  query($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;