import client from "../apollo/client";
import Layout from "../components/layout/Layout";
import { GET_MENUS } from "../queries/get-menus";

export default function Home({ data }) {
  return (
    <Layout data={data}>
      <h1>Hello World</h1>
    </Layout>
  );
}

export async function getStaticProps() {
  const { data, loading, networkStatus } = await client.query({
    query: GET_MENUS,
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
      },
      revalidate: 1,
    },
  };
}
