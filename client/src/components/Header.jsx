import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand fw-bold" to="/">
        📦 KamisoonRepport
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/province">
              Province
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/company">
              Company
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/items">
              Items
            </Link>
          </li>
<Link className="nav-link" to="/trucktypes">
  Truck Types
</Link>
          <li className="nav-item">
            <Link className="nav-link" to="/reports">
              Reports
            </Link>
          </li>

        </ul>
      </div>
    </nav>
  );
}

export default Header;