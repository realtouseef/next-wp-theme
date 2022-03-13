import Link from "next/link";
import Head from "next/head";
import styles from "./nav.module.scss";
import { isEmpty } from "lodash";

const Nav = ({ header, headerMenus }) => {
  if (isEmpty(headerMenus)) {
    return null;
  }

  return (
    <>
      <Head>
        <title>{header?.siteTitle}</title>
      </Head>
      <nav className={styles.nav}>
        <Link href="/" className={styles.logo}>
          <div className={styles.logo_inner}>
            <img
              className={styles.image}
              src={header?.siteLogoUrl}
              alt={header?.siteTitle}
            />
            <div className={styles.logo_text}>
              <h3>{header?.siteTitle}</h3>
              <p>{header?.siteTagLine}</p>
            </div>
          </div>
        </Link>

        {headerMenus?.length ? (
          <ul>
            {headerMenus.map((menu) => (
              <li key={menu?.node?.id}>
                <Link href={menu?.node?.path}>{menu?.node?.label}</Link>
              </li>
            ))}
          </ul>
        ) : null}
      </nav>
    </>
  );
};

export default Nav;
