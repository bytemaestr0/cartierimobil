import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNavVisibility } from "../hooks/useNavVisibility";
import { languages } from "../i18n/translations";
import logo from "../assets/brand/logo.png";
import "./Navbar.css";

export default function Navbar({ t, lang, setLang }) {
  const hidden = useNavVisibility();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const goToSection = (id) => (e) => {
    e.preventDefault();
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  return (
    <header className={`navbar ${hidden ? "navbar--hidden" : ""}`}>
      <nav className="navbar__inner">
        <a href="#top" className="navbar__brand" onClick={goToSection("top")}>
          <span className="navbar__brand-mark" aria-hidden="true">
            <img src={logo} alt="" className="navbar__brand-logo" />
          </span>
          Cartier&nbsp;Imobil
        </a>

        <div className="navbar__links">
          <a href="#deals" onClick={goToSection("deals")}>
            {t.nav.deals}
          </a>
          <a href="#story" onClick={goToSection("story")}>
            {t.nav.story}
          </a>
          <a href="#process" onClick={goToSection("process")}>
            {t.nav.process}
          </a>
          <a href="#contact" onClick={goToSection("contact")}>
            {t.nav.contact}
          </a>
        </div>

        <div className="navbar__lang" role="group" aria-label="Language switcher">
          {languages.map((code) => (
            <button
              key={code}
              type="button"
              className={`navbar__lang-btn ${lang === code ? "is-active" : ""}`}
              onClick={() => setLang(code)}
              aria-pressed={lang === code}
            >
              {t.lang[code]}
            </button>
          ))}
        </div>

        <button
          type="button"
          className="navbar__burger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {menuOpen && (
        <div className="navbar__mobile">
          <a href="#deals" onClick={goToSection("deals")}>
            {t.nav.deals}
          </a>
          <a href="#story" onClick={goToSection("story")}>
            {t.nav.story}
          </a>
          <a href="#process" onClick={goToSection("process")}>
            {t.nav.process}
          </a>
          <a href="#contact" onClick={goToSection("contact")}>
            {t.nav.contact}
          </a>
          <div className="navbar__mobile-lang">
            {languages.map((code) => (
              <button
                key={code}
                type="button"
                className={`navbar__lang-btn ${lang === code ? "is-active" : ""}`}
                onClick={() => {
                  setLang(code);
                  setMenuOpen(false);
                }}
              >
                {t.lang[code]}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
