import "./Navbar.css";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <Link to="/" className="navbar-brand">
            <img
              src="/dealio-logo.png"
              alt="Dealio"
              className="navbar-logo"
            />
          </Link>

          {/* Navigation Links */}
          <nav className="navbar-nav-links">
            <a href="#how-it-works" className="nav-link">
              How It Works
            </a>
            <a href="#for-customers" className="nav-link">
              For Customers
            </a>
            <a href="#for-enterprises" className="nav-link">
              For Enterprises
            </a>
          </nav>

          {/* Auth & CTA Buttons */}
          <div className="navbar-actions">
            <Link to="/login" className="btn-login">
              Login
            </Link>
            <a href="#ready-to-start" className="btn-get-started">
              Get Started
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
