import client from "../apollo/client";
import Layout from "../components/layout/Layout";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
import { GET_PAGE } from "../queries/pages/get-page";
import { GET_PAGES_URI } from "../queries/pages/get-pages";
import { sanitize } from "../utils/misc";
import { isCustomPageUri } from "../utils/slugsExcluded";

const Page = ({ data }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  return (
    <Layout data={data}>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(data?.page?.content ?? {}),
        }}
      />
    </Layout>
  );
};

export default Page;

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: GET_PAGE,
    variables: {
      uri: params?.slug.join("/"),
    },
  });
  return {
    props: {
      data: {
        header: data?.header || [],
        menus: {
          headerMenus: data?.headerMenus?.edges || [],
          footerMenus: data?.footerMenus?.edges || [],
        },
        footer: data?.footer || [],
        page: data?.page ?? {},
        path: params?.slug.join("/"),
      },
    },

    /* Revalidate means that if a new request comes to server, then every 1 sec it will check
     * if the data is changed, if it is changed then it will update the
     * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
     */

    revalidate: 1,
  };
}

export async function getStaticPaths() {
  const { data } = await client.query({ query: GET_PAGES_URI });

  const pathsData = [];

  /**
   * Since the page name uses catch-all routes,
   * for example [...slug],
   * that's why params would contain slug which is an array.
   * For example, If we need to have dynamic route '/foo/bar'
   * Then we would add paths: [ params: { slug: ['foo', 'bar'] } } ]
   * Here slug will be an array is ['foo', 'bar'], then Next.js will statically generate the page at /foo/bar
   *
   * At build time next js will will make an api call get the data and
   * generate a page bar.js inside .next/foo directory, so when the page is served on browser
   * data is already present, unlike getInitialProps which gets the page at build time but makes an api
   * call after page is served on the browser.
   *
   */

  data?.pages?.nodes &&
    data?.pages?.nodes.map((page) => {
      if (!isEmpty(page?.uri) && !isCustomPageUri(page?.uri)) {
        /*
         * if the URL has children aka dropdown pages
         * then the .split will split it from "/"
         * and the .filter will remove the empty strings
         * because the .split will return an array with everything
         * including empty strings as well
         */
        const slugs = page?.uri?.split("/").filter((pageSlug) => pageSlug);
        pathsData.push({ params: { slug: slugs } });
      }
    });

  return {
    paths: pathsData,
    fallback: true,
  };
}
