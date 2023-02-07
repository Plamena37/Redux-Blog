import { Link } from "react-router-dom";
import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header__link--special">
        <h1>Redux Blog</h1>
      </Link>
      <nav className="header__navigation">
        <ul className="header__list">
          <li>
            <Link className="header__link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header__link" to="post">
              Post
            </Link>
          </li>
          <li>
            <Link className="header__link" to="user">
              Users
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
