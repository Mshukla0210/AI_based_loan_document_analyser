export function GlowPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`glow-panel ${className}`.trim()}>{children}</div>;
}
