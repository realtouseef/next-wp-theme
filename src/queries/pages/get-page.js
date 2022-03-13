/*
 * for rendering single page
 */

import { gql } from "@apollo/client";
import MenuFragment from "../fragments/menu";
import { headerFooter } from "../get-menus";
import SeoFragment from "../fragments/seo/SeoFragment";

export const GET_PAGE = gql`
query GET_PAGE($uri: String) {
  ${headerFooter}
  page: pageBy(uri: $uri) {
    id 
    title
    content
    slug
    uri
    seo {
      ...SeoFragment
    }
  }
}
${MenuFragment}
${SeoFragment}
`;
