import React from "react";
import { Link} from "react-router-dom";
import { PROFILE_ROUTE, NEWS_ROUTE, USERS_ROUTE, CHAT_ROUTE} from "../../utils/consts";
import scss from "./NavBar.module.scss";

const NavBar = () => {
  return (
    <div className={scss.navWrapper}>
      <nav>
        <ul>
          <li>
            <Link to={NEWS_ROUTE}>Публікації</Link>
            <Link to={USERS_ROUTE}>Люди</Link>
            <Link to={CHAT_ROUTE}>Чат</Link>
            <Link to={PROFILE_ROUTE}>Профіль</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
