import { Link } from "react-router-dom";

function Header() {
  return (
       <div dir="rtl">
<nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 sticky-top">
      <Link className="navbar-brand fw-bold" to="/">
        📦 بین الولایتی ترمینل
      </Link>

      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">

          <li className="nav-item">
            <Link className="nav-link" to="/">کور</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/province">ولایت</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/company">شرکت</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/items">جنس</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/trucktypes">واسطه ډول</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/reports">مجموعه</Link>
          </li>

        </ul>
      </div>
    </nav>
    </div>
  );
}

export default Header;
