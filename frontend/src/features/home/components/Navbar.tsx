import { useState } from "react";
import { Menu, X } from "lucide-react";
import "./Navbar.css";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-inner">
          {/* Brand Logo */}
          <a href="/" className="navbar-brand">
            <img
              src="/dealio-logo.png"
              alt="Dealio"
              className="navbar-logo"
            />
          </a>

          {/* Desktop Navigation Links */}
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

          {/* Desktop Auth & CTA Buttons */}
          <div className="navbar-actions">
            <a href="/login" className="btn-login">
              Login
            </a>
            <a href="#ready-to-start" className="btn-get-started">
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="navbar-mobile-toggle">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="btn-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="icon-menu" /> : <Menu className="icon-menu" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="navbar-mobile-menu">
          <a
            href="#how-it-works"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            How It Works
          </a>
          <a
            href="#for-customers"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            For Customers
          </a>
          <a
            href="#for-enterprises"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-nav-link"
          >
            For Enterprises
          </a>
          <div className="mobile-actions">
            <a href="/login" className="btn-mobile-login">
              Login
            </a>
            <a
              href="#ready-to-start"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-mobile-get-started"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
