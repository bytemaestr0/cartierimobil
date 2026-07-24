import "./SectionFloaters.css";

/**
 * Decorative animated background shapes, reused across every section
 * except the hero (which now uses a photo background instead).
 *
 * `theme="light"` picks warm sand/linen tones for light sections
 * (Deals, Story, the all-deals page). `theme="dark"` picks softer
 * brass/sage tones with lower opacity for dark sections (Process, Footer).
 */
export default function SectionFloaters({ theme = "light" }) {
  return (
    <div className={`section-floaters section-floaters--${theme}`} aria-hidden="true">
      <span className="section-floater section-floater--1" />
      <span className="section-floater section-floater--2" />
      <span className="section-floater section-floater--3" />
    </div>
  );
}
