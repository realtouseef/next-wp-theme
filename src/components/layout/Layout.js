import Head from "next/head";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "./layout.module.scss";
// import { isEmpty } from "lodash";
import { sanitize } from "../../utils/misc";
import { Seo } from "../seo/Seo";

const Layout = ({ data, children }) => {
  // if (isEmpty(data?.page)) {
  //   return null;
  // }

  const { page, header, footer, menus } = data || {};

  return (
    <>
      <Seo seo={page?.seo} uri={page?.uri} />
      <Head>
        <title>{header?.siteTitle}</title>
        <meta name="description" content={header?.siteTagLine} />
        <link rel="icon" type="image/x-icon" href={header?.favicon} />

        {page?.seo?.schemaDetails && (
          <script
            type="application/ld+json"
            className="yoast-schema-graph"
            key="yoastSchema"
            dangerouslySetInnerHTML={{
              __html: sanitize(page?.seo?.schemaDetails),
            }}
          />
        )}
      </Head>

      <Header header={header} headerMenus={menus?.headerMenus} />
      <div className={styles.children_section}>{children}</div>
      <Footer footer={footer} footerMenus={menus?.footerMenus} />
    </>
  );
};

export default Layout;
