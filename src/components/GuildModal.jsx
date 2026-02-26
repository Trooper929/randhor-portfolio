import { useState } from "react";
import { PROJECTS } from "../data/projects";
import { SKILLS, getRank } from "../data/skills";

export default function GuildModal({ onClose }) {
  const [emailClicked, setEmailClicked] = useState(false);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(4px)",
        overflowY: "auto",
        padding: "16px",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg,#1a0800,#0a0508)",
          border: "1px solid #ffaa4455",
          borderRadius: "12px",
          padding: "28px",
          maxWidth: "680px",
          width: "100%",
          position: "relative",
          boxShadow: "0 0 60px rgba(255,150,0,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "22px",
            borderBottom: "1px solid #ffffff0f",
            paddingBottom: "18px",
          }}
        >
          <div
            style={{
              color: "#ffaa44",
              fontSize: "10px",
              letterSpacing: "4px",
              marginBottom: "6px",
            }}
          >
            ⚔ ADVENTURERS GUILD ⚔
          </div>
          <h2
            style={{
              color: "#ffe0b2",
              margin: "0 0 4px 0",
              fontSize: "1.5rem",
              fontFamily: "monospace",
            }}
          >
            Official Quest Registry
          </h2>
          <p
            style={{
              color: "#88776644",
              fontSize: "0.72rem",
              margin: 0,
              fontFamily: "monospace",
            }}
          >
            All quests completed by Brandon, Slime Coder of the MERN Order
          </p>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              color: "#44ff88",
              fontSize: "10px",
              letterSpacing: "3px",
              marginBottom: "12px",
              fontFamily: "monospace",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "#44ff8822" }} />✓
            COMPLETED QUESTS
            <div style={{ flex: 1, height: "1px", background: "#44ff8822" }} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            {PROJECTS.map((p) => (
              <div
                key={p.title}
                style={{
                  background: p.featured
                    ? "rgba(0,255,204,0.04)"
                    : "rgba(255,255,255,0.02)",
                  border: p.featured
                    ? "1px solid #00ffcc33"
                    : "1px solid #ffffff0f",
                  borderRadius: "8px",
                  padding: "14px",
                  opacity: p.locked ? 0.45 : 1,
                  position: "relative",
                }}
              >
                {p.featured && (
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      left: "10px",
                      background: "linear-gradient(90deg,#00ffcc,#0088ff)",
                      color: "#000",
                      fontSize: "8px",
                      fontWeight: "bold",
                      padding: "1px 8px",
                      borderRadius: "8px",
                      letterSpacing: "2px",
                    }}
                  >
                    FEATURED
                  </div>
                )}
                <h3
                  style={{
                    color: p.featured ? "#00ffcc" : "#ffe0b2",
                    margin: "0 0 6px 0",
                    fontSize: "0.85rem",
                    fontFamily: "monospace",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    color: "#88776688",
                    fontSize: "0.72rem",
                    lineHeight: "1.4",
                    margin: "0 0 8px 0",
                    fontFamily: "monospace",
                  }}
                >
                  {p.desc}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "4px",
                    marginBottom: "8px",
                  }}
                >
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        background: "#00ffcc0d",
                        border: "1px solid #00ffcc22",
                        color: "#00ffcc",
                        fontSize: "8px",
                        padding: "1px 6px",
                        borderRadius: "3px",
                        fontFamily: "monospace",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {!p.locked && (
                  <div style={{ display: "flex", gap: "6px" }}>
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#00ffcc",
                        fontSize: "9px",
                        fontFamily: "monospace",
                        border: "1px solid #00ffcc33",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textDecoration: "none",
                      }}
                    >
                      ▶ LIVE
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        color: "#aaaaaa",
                        fontSize: "9px",
                        fontFamily: "monospace",
                        border: "1px solid #ffffff22",
                        padding: "3px 8px",
                        borderRadius: "4px",
                        textDecoration: "none",
                      }}
                    >
                      ⌨ REPO
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            background:
              "linear-gradient(135deg,rgba(255,170,0,0.07),rgba(255,80,0,0.05))",
            border: "1px solid #ffaa4444",
            borderRadius: "10px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "12px",
            }}
          >
            <div
              style={{
                background: "#ff4400",
                color: "#fff",
                fontSize: "9px",
                fontWeight: "bold",
                padding: "2px 8px",
                borderRadius: "4px",
                letterSpacing: "2px",
              }}
            >
              ⚡ ACTIVE
            </div>
            <div
              style={{
                color: "#ffaa44",
                fontSize: "10px",
                letterSpacing: "3px",
                fontFamily: "monospace",
              }}
            >
              MAIN QUEST
            </div>
          </div>
          <h3
            style={{
              color: "#ffdd88",
              margin: "0 0 8px 0",
              fontSize: "1.1rem",
              fontFamily: "monospace",
            }}
          >
            🏆 Begin Your New Career
          </h3>
          <p
            style={{
              color: "#aa9977",
              fontSize: "0.78rem",
              lineHeight: "1.7",
              margin: "0 0 14px 0",
              fontFamily: "monospace",
            }}
          >
            <b style={{ color: "#ffcc66" }}>Objective:</b> Find a team worth
            adventuring with.
            <br />
            <b style={{ color: "#ffcc66" }}>Stack:</b> React · Node · Express ·
            MongoDB · Git.
            <br />
            <b style={{ color: "#ffcc66" }}>Status:</b>{" "}
            <span style={{ color: "#ffaa44" }}>Actively seeking...</span>
          </p>
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <button
              onClick={() => {
                setEmailClicked(true);
                window.location.href =
                  "mailto:forloopforfood@gmail.com?subject=Quest%20Accepted";
              }}
              style={{
                background: emailClicked
                  ? "linear-gradient(135deg,#44ff88,#00cc66)"
                  : "linear-gradient(135deg,#ffaa00,#ff6600)",
                border: "none",
                color: "#000",
                padding: "10px 22px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "bold",
                fontFamily: "monospace",
                letterSpacing: "2px",
                transition: "all 0.3s ease",
              }}
            >
              {emailClicked ? "✓ QUEST ACCEPTED!" : "⚔ TAKE THIS QUEST"}
            </button>
            <button
              onClick={() => {
                window.location.href =
                  "mailto:forloopforfood@gmail.com?subject=Interested";
              }}
              style={{
                background: "transparent",
                border: "1px solid #ffaa4466",
                color: "#ffaa44",
                padding: "10px 16px",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "11px",
                fontFamily: "monospace",
              }}
            >
              💌 Interested?
            </button>
          </div>
        </div>

        <button
          onClick={onClose}
          style={{
            display: "block",
            margin: "18px auto 0",
            background: "transparent",
            border: "1px solid #ffaa4433",
            color: "#ffaa4466",
            padding: "7px 20px",
            borderRadius: "6px",
            cursor: "pointer",
            fontFamily: "monospace",
            fontSize: "11px",
            letterSpacing: "2px",
          }}
        >
          ✕ CLOSE BOARD
        </button>
      </div>
    </div>
  );
}
