import { NavLink } from "react-router-dom";
import { FaBook } from "react-icons/fa";

import links from "../utils/links";

const NavLinks = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { text, path, id, icon } = link;
        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? "nav-link active" : "nav-link";
            }}
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
      {/* add link for swagger documentation */}
      <NavLink
        to="/api/v1/docs"
        className={({ isActive }) => {
          return isActive ? "nav-link active" : "nav-link";
        }}
        target="_blank"
        rel="noopener noreferrer"
        onClick={toggleSidebar}
      >
        <span className="icon">{<FaBook />}</span>
        Docs
      </NavLink>
    </div>
  );
};
export default NavLinks;
