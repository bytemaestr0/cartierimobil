import Reveal from "./Reveal";
import "./SplitSection.css";

export default function Process({ t, lang }) {
  return (
    <section id="process" className="split-section split-section--process split-section--reverse">
      <div className="section-inner split-section__inner">
        <Reveal as="div" resetKey={lang} className="split-section__media">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=80"
            alt=""
            loading="lazy"
            className="split-section__image split-section__image--main"
          />
          <img
            src="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=500&q=80"
            alt=""
            loading="lazy"
            className="split-section__image split-section__image--accent"
          />
        </Reveal>

        <Reveal as="div" resetKey={lang} delay={120} className="split-section__text">
          <p className="section-eyebrow">{t.process.eyebrow}</p>
          <h2 className="section-title">{t.process.title}</h2>
          <p className="split-section__body">{t.process.body}</p>
          <ol className="process-list">
            {t.process.items.map((item, i) => (
              <li className="process-list__item" key={item.title}>
                <span className="process-list__index">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
