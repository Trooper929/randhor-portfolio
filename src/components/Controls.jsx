export function Controls({ phase, foeWarning }) {
  if (phase >= 2) return null;
  if (foeWarning) return null;
  return (
    <div
      style={{
        position: "absolute",
        bottom: "72px",
        left: "50%",
        transform: "translateX(-50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "4px",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{ color: "#00ffcc22", fontSize: "9px", letterSpacing: "2px" }}
      >
        ← → MOVE • SHIFT SPRINT • E TO READ
      </div>
    </div>
  );
}

export function MobileControls({ onKey, phase }) {
  if (phase >= 2) return null;

  const baseBtn = (color = "#00ffcc") => ({
    background: "rgba(0,0,0,0.6)",
    border: `2px solid ${color}55`,
    borderRadius: "10px",
    color: color,
    fontSize: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    userSelect: "none",
    WebkitUserSelect: "none",
    cursor: "pointer",
    touchAction: "none",
  });

  const makeHandlers = (key) => ({
    onTouchStart: (e) => {
      e.preventDefault();
      onKey(key, true);
    },
    onTouchEnd: (e) => {
      e.preventDefault();
      onKey(key, false);
    },
    onMouseDown: (e) => {
      e.preventDefault();
      onKey(key, true);
    },
    onMouseUp: (e) => {
      e.preventDefault();
      onKey(key, false);
    },
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: "8px",
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        padding: "0 12px",
        zIndex: 15,
        pointerEvents: "none",
      }}
    >
      <div style={{ display: "flex", gap: "8px", pointerEvents: "all" }}>
        <div
          style={{ ...baseBtn(), width: "56px", height: "56px" }}
          {...makeHandlers("ArrowLeft")}
        >
          ◀
        </div>
        <div
          style={{ ...baseBtn(), width: "56px", height: "56px" }}
          {...makeHandlers("ArrowRight")}
        >
          ▶
        </div>
      </div>

      <div style={{ display: "flex", gap: "8px", pointerEvents: "all" }}>
        <div
          style={{
            ...baseBtn("#ffcc44"),
            width: "56px",
            height: "56px",
            fontSize: "13px",
            fontFamily: "monospace",
            fontWeight: "bold",
            letterSpacing: "1px",
          }}
          {...makeHandlers("Shift")}
        >
          ⚡<br />
          RUN
        </div>
        <div
          style={{
            ...baseBtn("#ffaa44"),
            width: "56px",
            height: "56px",
            fontSize: "13px",
            fontFamily: "monospace",
            fontWeight: "bold",
          }}
          {...makeHandlers("e")}
        >
          📋
          <br />
          READ
        </div>
      </div>
    </div>
  );
}
