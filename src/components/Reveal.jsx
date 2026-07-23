import { useRevealOnce } from "../hooks/useRevealOnce";

export default function Reveal({
  as: Tag = "div",
  resetKey,
  className = "",
  delay = 0,
  children,
  ...rest
}) {
  const [ref, visible] = useRevealOnce(resetKey);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "reveal--visible" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms`, ...rest.style }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
