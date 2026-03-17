import { useState } from "react";

export default function VibeCodingEvent({ onChoice }) {
  const [answered, setAnswered] = useState(false);
  const [choice, setChoice] = useState(null);

  const handleChoice = (yes) => {
    setChoice(yes);
    setAnswered(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(6px)",
        padding: "20px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
          paddingBottom: "20px",
        }}
      >
        {!answered ? (
          <>
            <div
              style={{
                display: "inline-block",
                background: "linear-gradient(135deg,#cc88ff,#6644ff)",
                color: "#fff",
                fontSize: "9px",
                fontWeight: "bold",
                padding: "3px 14px",
                borderRadius: "20px",
                letterSpacing: "3px",
                marginBottom: "16px",
              }}
            >
              ⚡ SPECIAL SKILL ACQUIRED
            </div>
            <div style={{ fontSize: "48px", marginBottom: "8px" }}>🌀</div>
            <h2
              style={{
                color: "#cc88ff",
                fontFamily: "monospace",
                fontSize: "1.6rem",
                margin: "0 0 6px 0",
                letterSpacing: "2px",
                textShadow: "0 0 20px #cc88ff88",
              }}
            >
              VIBE CODING
            </h2>
            <p
              style={{
                color: "#9966cc",
                fontSize: "0.75rem",
                fontFamily: "monospace",
                marginBottom: "20px",
                letterSpacing: "1px",
              }}
            >
              The art of building alongside AI.
              <br />A new skill has appeared in the void.
            </p>
            <div
              style={{
                background: "rgba(204,136,255,0.05)",
                border: "1px solid #cc88ff33",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "24px",
              }}
            >
              <p
                style={{
                  color: "#ccaaff",
                  fontSize: "0.8rem",
                  fontFamily: "monospace",
                  lineHeight: "1.7",
                  margin: 0,
                }}
              >
                <span style={{ color: "#ffe033", fontWeight: "bold" }}>
                  Congratulations!
                </span>
                <br />
                You have discovered{" "}
                <span style={{ color: "#cc88ff" }}>Vibe Coding</span> —<br />
                the practice of wielding AI as a development partner.
                <br />
                <br />
                <span style={{ color: "#ffffff88" }}>
                  Will you accept this skill?
                </span>
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "16px", justifyContent: "center" }}
            >
              <button
                onClick={() => handleChoice(true)}
                style={{
                  background: "linear-gradient(135deg,#6644ff,#cc88ff)",
                  border: "none",
                  color: "#fff",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  letterSpacing: "2px",
                  boxShadow: "0 0 20px #cc88ff55",
                }}
              >
                ✓ YES
              </button>
              <button
                onClick={() => handleChoice(false)}
                style={{
                  background: "transparent",
                  border: "1px solid #ffffff44",
                  color: "#ffffff88",
                  padding: "12px 32px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "bold",
                  fontFamily: "monospace",
                  letterSpacing: "2px",
                }}
              >
                ✕ NO
              </button>
            </div>
          </>
        ) : (
          <>
            {choice ? (
              <>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>⚡</div>
                <div
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg,#6644ff,#cc88ff)",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: "bold",
                    padding: "3px 14px",
                    borderRadius: "20px",
                    letterSpacing: "3px",
                    marginBottom: "16px",
                  }}
                >
                  TITLE GRANTED
                </div>
                <h2
                  style={{
                    color: "#cc88ff",
                    fontFamily: "monospace",
                    fontSize: "1.4rem",
                    margin: "0 0 12px 0",
                    letterSpacing: "2px",
                    textShadow: "0 0 20px #cc88ff88",
                  }}
                >
                  "Modern Efficiency"
                </h2>
                <p
                  style={{
                    color: "#ccaaff",
                    fontSize: "0.82rem",
                    fontFamily: "monospace",
                    lineHeight: "1.8",
                    margin: "0 0 16px 0",
                  }}
                >
                  Skill accepted.
                  <br />
                  <span style={{ color: "#ffe033" }}>
                    Workload reduced by 40%.
                  </span>
                  <br />
                  You understand that AI is a tool, not a crutch —<br />
                  and you wield it with intention.
                </p>
                <p
                  style={{
                    color: "#ffffff33",
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    fontStyle: "italic",
                  }}
                >
                  "The best developers don't work harder. They work smarter."
                </p>
              </>
            ) : (
              <>
                <div style={{ fontSize: "48px", marginBottom: "12px" }}>🔥</div>
                <div
                  style={{
                    display: "inline-block",
                    background: "linear-gradient(135deg,#ff4400,#ff8800)",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: "bold",
                    padding: "3px 14px",
                    borderRadius: "20px",
                    letterSpacing: "3px",
                    marginBottom: "16px",
                  }}
                >
                  TITLE GRANTED
                </div>
                <h2
                  style={{
                    color: "#ff8800",
                    fontFamily: "monospace",
                    fontSize: "1.4rem",
                    margin: "0 0 12px 0",
                    letterSpacing: "2px",
                    textShadow: "0 0 20px #ff880088",
                  }}
                >
                  "Get With The Times"
                </h2>
                <p
                  style={{
                    color: "#ffaa66",
                    fontSize: "0.82rem",
                    fontFamily: "monospace",
                    lineHeight: "1.8",
                    margin: "0 0 16px 0",
                  }}
                >
                  Skill declined. Respect.
                  <br />
                  <span style={{ color: "#ffe033" }}>
                    Experience gain increased by 140%.
                  </span>
                  <br />
                  You trust your own hands above all else —<br />
                  and that foundation will never fail you.
                </p>
                <p
                  style={{
                    color: "#ffffff33",
                    fontSize: "0.7rem",
                    fontFamily: "monospace",
                    fontStyle: "italic",
                  }}
                >
                  "The fundamentals never go out of style."
                </p>
              </>
            )}
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={() => onChoice(choice)}
                style={{
                  background: "transparent",
                  border: `1px solid ${choice ? "#cc88ff66" : "#ff880066"}`,
                  color: choice ? "#cc88ffaa" : "#ff8800aa",
                  padding: "8px 28px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  fontSize: "11px",
                  letterSpacing: "3px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = choice
                    ? "#cc88ff11"
                    : "#ff880011";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                }}
              >
                ▶ CONTINUE
              </button>
            </div>
          </>
        )}
      </div>
      <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }`}</style>
    </div>
  );
}
