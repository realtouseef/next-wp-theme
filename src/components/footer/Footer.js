import { isEmpty } from "lodash";
import { sanitize } from "../../utils/misc";
import styles from "./footer.module.scss";

const Footer = ({ footer, footerMenus }) => {
  if (isEmpty(footerMenus)) {
    return null;
  }
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_inner}>
        <div
          className={styles.footer_left}
          dangerouslySetInnerHTML={{ __html: sanitize(footer?.sidebarOne) }}
        />
        <div
          className={styles.footer_right}
          dangerouslySetInnerHTML={{ __html: sanitize(footer?.sidebarTwo) }}
        />
        {/* <div className={styles.footer_social}>
          {footer?.socialLinks?.map((link) => (
            <a
              className={styles.footer_social_link}
              href={link.iconUrl}
              key={link.iconName}
            >
              {link.iconName}
            </a>
          ))}
        </div> */}
      </div>
      <p className={styles.copyright}>
        {footer?.copyrightText}
        {" " + new Date().getFullYear()}
      </p>
    </footer>
  );
};

export default Footer;
