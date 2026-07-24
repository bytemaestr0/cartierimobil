import Reveal from "./Reveal";
import SectionFloaters from "./SectionFloaters";
import "./SplitSection.css";

export default function Story({ t, lang }) {
  return (
    <section id="story" className="split-section split-section--story">
      <SectionFloaters theme="light" />
      <div className="section-inner split-section__inner">
        <Reveal as="div" resetKey={lang} className="split-section__text">
          <p className="section-eyebrow">{t.story.eyebrow}</p>
          <h2 className="section-title">{t.story.title}</h2>
          <p className="split-section__body">{t.story.body}</p>
          <div className="split-section__stats">
            <div className="stat-card">
              <span className="stat-card__value">{t.story.stat1.value}</span>
              <span className="stat-card__label">{t.story.stat1.label}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{t.story.stat2.value}</span>
              <span className="stat-card__label">{t.story.stat2.label}</span>
            </div>
            <div className="stat-card">
              <span className="stat-card__value">{t.story.stat3.value}</span>
              <span className="stat-card__label">{t.story.stat3.label}</span>
            </div>
          </div>
        </Reveal>

        <Reveal as="div" resetKey={lang} delay={120} className="split-section__media">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
            alt=""
            loading="lazy"
            className="split-section__image split-section__image--main"
          />
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=500&q=80"
            alt=""
            loading="lazy"
            className="split-section__image split-section__image--accent"
          />
        </Reveal>
      </div>
    </section>
  );
}
