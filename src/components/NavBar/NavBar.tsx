import { Link, useRouteMatch } from "react-router-dom";
import useDarkMode from "../../lib/hooks/useDarkMode";
import Logo from "../Logo";

const styles = {
  logo: {
    marginRight: 10,
  },
};

const NavBar = () => {
  const isSearch = useRouteMatch("/search");
  const isDetails = useRouteMatch("/details/:id");
  const isDarkMode = useDarkMode();

  return (
    <nav
      className={`navbar navbar-expand-lg ${
        isDarkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
      }`}
    >
      <div className="container">
        <Link className="navbar-brand" to="/">
          <Logo style={styles.logo} />
          Ameware Group Task
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${isSearch?.isExact ? "active" : ""}`}
                aria-current="page"
                to="/search"
                title="Search National Provider Identifier data"
              >
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${isDetails?.isExact ? "active" : ""}`}
                to="/details/1700104338"
                title="Show example details for 1700104338"
              >
                Details
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
