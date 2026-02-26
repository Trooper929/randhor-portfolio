export default function BiomeName({ name, phase }) {
  if (phase >= 2) return null;
  return (
    <div
      style={{
        position: "absolute",
        top: "60px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#ffffff44",
        fontSize: "10px",
        letterSpacing: "4px",
        textTransform: "uppercase",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      — {name} —
    </div>
  );
}
