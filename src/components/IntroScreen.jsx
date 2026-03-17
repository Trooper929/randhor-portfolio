import { useEffect, useMemo, useState } from "react";

/**
 * Intro / Greeting page for your interactive portfolio.
 * - Detects "mobile-ish" screens
 * - Shows a "Tilt for best experience" suggestion in portrait
 * - Still lets the user continue in portrait (no hard block)
 *
 * Usage:
 * <IntroScreen onStart={() => setStarted(true)} />
 */
export default function IntroScreen({ onStart }) {
  const [viewport, setViewport] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 0,
    h: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const onResize = () =>
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const isPortrait = viewport.h > viewport.w;
  const isMobile = useMemo(() => {
    // pragmatic: small width OR coarse pointer (touch screens)
    const coarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    return viewport.w <= 900 || coarse;
  }, [viewport.w]);

  const showTiltSuggestion = isMobile && isPortrait;

  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "grid",
        margin: 0,
        placeItems: "center",
        padding: "24px",
        background:
          "radial-gradient(ellipse at top, rgba(0,255,204,0.14), transparent 55%), radial-gradient(ellipse at bottom, rgba(255,170,0,0.10), transparent 55%), linear-gradient(180deg,#05070c,#02030a)",
        color: "#e9fff9",
        fontFamily: "monospace",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* subtle stars */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#ffffff88 1px, transparent 1px)",
          backgroundSize: "120px 120px, 180px 180px",
          backgroundPosition: "0 0, 60px 70px",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      />

      {/* Mobile Tilt Overlay (non-blocking) */}
      {showTiltSuggestion && (
        <div
          style={{
            position: "absolute",
            inset: "16px 16px auto 16px",
            display: "flex",
            justifyContent: "center",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          <div
            style={{
              maxWidth: 560,
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(0,255,204,0.25)",
              background: "rgba(0,0,0,0.55)",
              backdropFilter: "blur(6px)",
              boxShadow: "0 0 20px rgba(0,255,204,0.12)",
              color: "rgba(233,255,249,0.92)",
              display: "flex",
              gap: 10,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 16 }}>📱↔️</span>
            <div style={{ lineHeight: 1.3 }}>
              <div
                style={{
                  fontWeight: 800,
                  letterSpacing: 1,
                  fontSize: "clamp(11px, 3.2vw, 13px)",
                }}
              >
                Mobile Mode
              </div>
              <div
                style={{
                  opacity: 0.85,
                  fontSize: "clamp(11px, 3.2vw, 13px)",
                }}
              >
                Tilt to landscape for the best experience. (Works in portrait
                too—just a bit more zoomed.)
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main card */}
      <div
        style={{
          width: "min(720px, 100%)",
          borderRadius: 16,
          border: "1px solid rgba(0,255,204,0.25)",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(10px)",
          boxShadow:
            "0 0 50px rgba(0,255,204,0.10), inset 0 0 30px rgba(0,0,0,0.35)",
          padding: "clamp(18px, 4vw, 28px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "center",
            marginBottom: 14,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: "50%",
              border: "2px solid rgba(0,255,204,0.55)",
              display: "grid",
              placeItems: "center",
              boxShadow: "0 0 18px rgba(0,255,204,0.20)",
              background:
                "radial-gradient(circle at 30% 30%, rgba(0,255,204,0.22), rgba(0,80,60,0.10))",
              fontSize: 18,
            }}
          >
            ⚔️
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                letterSpacing: 3,
                opacity: 0.75,
                fontSize: "clamp(10px, 2.6vw, 12px)",
              }}
            >
              INTERACTIVE PORTFOLIO
            </div>
            <h1
              style={{
                margin: 0,
                fontSize: "clamp(18px, 5vw, 34px)",
                lineHeight: 1.1,
              }}
            >
              Welcome, Adventurer.
            </h1>
          </div>
        </div>

        <p
          style={{
            margin: "0 0 14px 0",
            opacity: 0.9,
            lineHeight: 1.6,
            fontSize: "clamp(12px, 3.3vw, 15px)",
          }}
        >
          This is a playable portfolio—move through the world. Please Enjoy.
        </p>

        <div
          style={{
            display: "grid",
            gap: 10,
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            marginBottom: 16,
          }}
        >
          <InfoPill
            title={isMobile ? "Touch Controls" : "Keyboard Controls"}
            text={
              isMobile
                ? "Tap on-screen prompts and buttons. (Landscape recommended.)"
                : "← → move • Shift sprint • E to read"
            }
          />
          <InfoPill
            title="Guild Board"
            text="Browse projects, open links, and contact me when you’re ready to party up."
          />
        </div>

        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <button
            onClick={onStart}
            style={{
              border: "none",
              cursor: "pointer",
              borderRadius: 10,
              padding: "12px 18px",
              fontWeight: 900,
              letterSpacing: 2,
              fontFamily: "monospace",
              fontSize: "clamp(12px, 3.4vw, 14px)",
              color: "#00130f",
              background: "linear-gradient(135deg,#00ffcc,#33a6ff)",
              boxShadow: "0 0 26px rgba(0,255,204,0.22)",
            }}
          >
            ▶ START QUEST
          </button>
        </div>

        <div
          style={{
            marginTop: 14,
            opacity: 0.7,
            fontSize: "clamp(10px, 2.8vw, 12px)",
            letterSpacing: 1,
          }}
        >
          Tip: If you’re on mobile, landscape makes the text and world feel
          better—portrait still works.
        </div>
      </div>
    </div>
  );
}

function InfoPill({ title, text }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.10)",
        background: "rgba(255,255,255,0.03)",
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div
        style={{
          fontWeight: 900,
          letterSpacing: 2,
          fontSize: "clamp(10px, 2.7vw, 12px)",
          opacity: 0.85,
          marginBottom: 6,
        }}
      >
        {title}
      </div>
      <div style={{ opacity: 0.85, fontSize: "clamp(12px, 3.3vw, 14px)" }}>
        {text}
      </div>
    </div>
  );
}
