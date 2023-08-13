import { Link } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link className="btn btn-ghost normal-case text-xl" to="/">
          GG-PLAY
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/populate">Populate</Link>
          </li>
          <li>
            {user ? (
              <Link to="/logout">{user.username} (Logout)</Link>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
