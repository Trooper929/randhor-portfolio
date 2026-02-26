export function WarningOverlay({ visible, foeWarning }) {
  if (!visible && !foeWarning) return null;

  if (foeWarning && !visible)
    return (
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: "80px",
          gap: "8px",
        }}
      >
        <div
          style={{
            color: "#ff9900cc",
            fontSize: "clamp(0.8rem,2vw,1rem)",
            fontWeight: "bold",
            fontFamily: "monospace",
            letterSpacing: "3px",
            textAlign: "center",
            textShadow: "0 0 16px #ff990088",
            animation: "warningFlash 1.2s ease-in-out infinite",
          }}
        >
          ⚠ You sense a strong foe ahead...
        </div>
        <style>{`@keyframes warningFlash { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
      </div>
    );

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "12px",
      }}
    >
      <div
        style={{
          color: "#ff3300",
          fontSize: "clamp(1rem,3vw,1.5rem)",
          fontWeight: "900",
          fontFamily: "monospace",
          letterSpacing: "4px",
          animation: "warningFlash 0.4s ease-in-out infinite",
          textAlign: "center",
          textShadow: "0 0 20px #ff330088",
        }}
      >
        ⚠ WARNING ⚠
      </div>
      <div
        style={{
          color: "#ff6600",
          fontSize: "clamp(0.7rem,2vw,1rem)",
          fontFamily: "monospace",
          letterSpacing: "2px",
          textAlign: "center",
          textShadow: "0 0 10px #ff660066",
        }}
      >
        SOMETHING STIRS BEYOND THE VOID...
      </div>
      <style>{`@keyframes warningFlash { 0%,100%{opacity:1} 50%{opacity:0.2} }`}</style>
    </div>
  );
}

export function VictoryFlash({ visible, opacity }) {
  if (!visible) return null;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `rgba(255,255,255,${opacity})`,
        pointerEvents: "none",
        zIndex: 50,
        transition: "background 0.1s",
      }}
    />
  );
}
