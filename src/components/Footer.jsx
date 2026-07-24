import Reveal from "./Reveal";
import SectionFloaters from "./SectionFloaters";
import "./Footer.css";

export default function Footer({ t, lang }) {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <SectionFloaters theme="dark" />
      <div className="section-inner">
        <Reveal as="p" resetKey={lang} className="section-eyebrow section-eyebrow--light">
          {t.contact.eyebrow}
        </Reveal>
        <Reveal as="h2" resetKey={lang} delay={60} className="section-title section-title--light">
          {t.contact.title}
        </Reveal>

        <div className="footer__grid">
          <Reveal as="div" resetKey={lang} delay={120} className="footer__card">
            <h3 className="footer__card-title">
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <path
                  d="M3 6l7 5 7-5M3 5h14v10H3z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
              Contact
            </h3>
            <ul className="footer__list">
              <li>
                <a href={t.contact.addressUrl} target="_blank" rel="noreferrer noopener">
                  {t.contact.address}
                </a>
              </li>
              <li>
                <a href={`tel:${t.contact.phone.replace(/\s/g, "")}`}>{t.contact.phone}</a>
              </li>
              <li>
                <a href={t.contact.instagram} target="_blank" rel="noreferrer noopener">
                  {t.contact.instagramLabel}
                </a>
              </li>
              <li>
                <a href={t.contact.tiktok} target="_blank" rel="noreferrer noopener">
                  {t.contact.tiktokLabel}
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal as="div" resetKey={lang} delay={180} className="footer__card">
            <h3 className="footer__card-title">
              <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
                <circle cx="10" cy="10" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.4" />
                <path
                  d="M10 6v4l3 2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              {t.contact.hoursTitle}
            </h3>
            <ul className="footer__list footer__list--hours">
              {t.contact.hours.map((h) => (
                <li key={h.day}>
                  <span>{h.day}</span>
                  <span>{h.time}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="footer__bottom">
          <span>Cartier Imobil © {year}</span>
          <span>{t.contact.rights}</span>
        </div>
      </div>
    </footer>
  );
}
