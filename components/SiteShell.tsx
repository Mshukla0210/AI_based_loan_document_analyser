export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <div className="ambient-grid" />
      {children}
    </div>
  );
}
