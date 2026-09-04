import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <div className="logo">
        🧠 Cognitive Gaming
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/games">
          Games
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;