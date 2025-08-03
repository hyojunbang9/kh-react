import { Link, useLocation } from "react-router-dom";
import "./Header.css"; // Header.css import

export default function Header() {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? "active-nav-link" : "";
  };

  const getDropdownNavLinkClass = (basePath) => {
    return location.pathname.startsWith(basePath) ? "active-nav-link" : "";
  };

  return (
    <nav className="header-nav">
      <div className="header-nav-left">
        <ul className="header-nav-list">
          <li className="header-nav-item">
            <Link to="/" className={getNavLinkClass("/")}>MAIN</Link>
          </li>
          <li className="header-nav-item">
            <a href="#" className={getDropdownNavLinkClass("/diary")}>DIARY</a>
            <div className="header-dropdown-menu">
              <Link to="/diary/list" className={getNavLinkClass("/diary/list")}>LIST</Link>
              <Link to="/diary/add" className={getNavLinkClass("/diary/add")}>ADD</Link>
            </div>
          </li>
          <li className="header-nav-item">
            <a href="#" className={getDropdownNavLinkClass("/moment")}>MOMENT</a>
            <div className="header-dropdown-menu">
              <Link to="/moment/list" className={getNavLinkClass("/moment/list")}>LIST</Link>
              <Link to="/moment/add" className={getNavLinkClass("/moment/add")}>ADD</Link>
            </div>
          </li>
          <li className="header-nav-item">
            <a href="#" className={getDropdownNavLinkClass("/todo")}>TODO</a>
            <div className="header-dropdown-menu">
              <Link to="/todo/list" className={getNavLinkClass("/todo/list")}>LIST</Link>
              <Link to="/todo/add" className={getNavLinkClass("/todo/add")}>ADD</Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="header-right-nav">
        <Link to={"/member/login"} className={getNavLinkClass("/member/login")}>Login</Link>
      </div>
    </nav>
  );
}
