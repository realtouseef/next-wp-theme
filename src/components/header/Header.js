import Nav from "./Nav";
import { isEmpty } from "lodash";

const Header = ({ header, headerMenus }) => {
  if (isEmpty(headerMenus)) {
    return null;
  }

  return (
    <div>
      <Nav header={header} headerMenus={headerMenus} />
    </div>
  );
};

export default Header;
