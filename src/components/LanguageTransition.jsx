import logo from "../assets/brand/logo.png";
import "./LanguageTransition.css";

export default function LanguageTransition({ active }) {
  return (
    <div className={`lang-transition ${active ? "lang-transition--active" : ""}`} aria-hidden="true">
      <div className="lang-transition__panel lang-transition__panel--a" />
      <div className="lang-transition__panel lang-transition__panel--b" />
      <div className="lang-transition__mark">
        <img src={logo} alt="" className="lang-transition__logo" />
      </div>
    </div>
  );
}
