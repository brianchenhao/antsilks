/** Ambient background: dot-grid + drifting aurora glows. Purely decorative. */
export default function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 grid-bg" />
      <div
        className="aurora"
        style={{
          top: "-12%",
          left: "8%",
          width: "42vw",
          height: "42vw",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-accent) 55%, transparent), transparent 65%)",
        }}
      />
      <div
        className="aurora"
        style={{
          top: "20%",
          right: "-6%",
          width: "38vw",
          height: "38vw",
          background:
            "radial-gradient(circle, color-mix(in oklab, var(--color-cyan) 45%, transparent), transparent 65%)",
          animationDelay: "-6s",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px hairline" />
    </div>
  );
}
