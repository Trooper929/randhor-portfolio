import { SKILLS, getRank } from "../data/skills";

export default function RoyalDecree({
  emailClicked,
  setEmailClicked,
  vibeCodingChoice,
}) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "radial-gradient(ellipse at center,#1a0a00,#050201)",
        zIndex: 90,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        overflowY: "auto",
      }}
    >
      <div
        style={{
          background: "linear-gradient(180deg,#2a1800,#1a0f00,#2a1800)",
          border: "2px solid #ffaa4488",
          borderRadius: "8px",
          padding: "32px",
          maxWidth: "560px",
          width: "100%",
          position: "relative",
          boxShadow:
            "0 0 60px rgba(255,170,0,0.15),inset 0 0 40px rgba(0,0,0,0.5)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "8px" }}>
          <span style={{ color: "#ffcc44", fontSize: "24px" }}>👑</span>
        </div>
        <div
          style={{
            textAlign: "center",
            color: "#ffcc44",
            fontSize: "9px",
            letterSpacing: "6px",
            marginBottom: "4px",
          }}
        >
          ✦ ROYAL PROCLAMATION ✦
        </div>
        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,#ffaa44,transparent)",
            marginBottom: "20px",
          }}
        />

        {vibeCodingChoice !== undefined && (
          <div style={{ marginBottom: "16px", textAlign: "center" }}>
            <div
              style={{
                display: "inline-block",
                background: vibeCodingChoice
                  ? "linear-gradient(135deg,#6644ff,#cc88ff)"
                  : "linear-gradient(135deg,#ff4400,#ff8800)",
                color: "#fff",
                fontSize: "9px",
                fontWeight: "bold",
                padding: "3px 14px",
                borderRadius: "20px",
                letterSpacing: "3px",
              }}
            >
              {vibeCodingChoice
                ? "⚡ TITLE: Modern Efficiency"
                : "🔥 TITLE: Get With The Times"}
            </div>
          </div>
        )}

        <h2
          style={{
            color: "#ffeecc",
            fontFamily: "monospace",
            textAlign: "center",
            fontSize: "clamp(1.1rem,3vw,1.6rem)",
            margin: "0 0 8px 0",
            letterSpacing: "2px",
          }}
        >
          The Adaptive Slime Mind
          <br />
          Awaits His Next Quest
        </h2>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,#ffaa4466,transparent)",
            margin: "16px 0",
          }}
        />

        <p
          style={{
            color: "#ccaa77",
            fontFamily: "monospace",
            fontSize: "0.78rem",
            lineHeight: "1.8",
            textAlign: "center",
            margin: "0 0 20px 0",
          }}
        >
          Having slain THE JOB MARKET in glorious combat
          <br />
          and claimed the Slime Throne as his rightful seat,
          <br />
          <span style={{ color: "#ffdd88", fontWeight: "bold" }}>
            Brandon
          </span>{" "}
          — Junior Full-Stack Developer,
          <br />
          wielder of the MERN stack, seeker of great teams —<br />
          hereby declares himself{" "}
          <span style={{ color: "#00ffcc" }}>open for hire.</span>
          <br />
          <span style={{ color: "#888866", fontSize: "0.7rem" }}>
            Early-to-mid Junior • Eager to learn • Building every day
          </span>
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "6px",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          {SKILLS.map((s) => {
            const r = getRank(s.level);
            return (
              <span
                key={s.name}
                style={{
                  background: "rgba(0,0,0,0.4)",
                  border: `1px solid ${r.color}44`,
                  color: r.color,
                  fontSize: "18px",
                  padding: "3px 8px",
                  borderRadius: "4px",
                  fontFamily: "monospace",
                }}
              >
                {s.name} — {r.label}
              </span>
            );
          })}
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,#ffaa4466,transparent)",
            margin: "0 0 20px 0",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <button
            onClick={() => {
              setEmailClicked(true);
              window.location.href =
                "mailto:forloopforfood@gmail.com?subject=Quest%20Accepted%3A%20Junior%20Dev%20Role&body=Hey%20Brandon%2C%20your%20portfolio%20just%20defeated%20me.%20I%27m%20interested%20in%20connecting.";
            }}
            style={{
              background: emailClicked
                ? "linear-gradient(135deg,#44ff88,#00cc66)"
                : "linear-gradient(135deg,#ffaa00,#cc5500)",
              border: "none",
              color: emailClicked ? "#001a00" : "#000",
              padding: "12px 26px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "bold",
              fontFamily: "monospace",
              letterSpacing: "2px",
              boxShadow: emailClicked
                ? "0 0 25px #44ff8877"
                : "0 0 25px #ffaa0077",
              transition: "all 0.3s ease",
            }}
          >
            {emailClicked ? "✓ QUEST ACCEPTED!" : "⚔ TAKE THIS QUEST"}
          </button>
          <button
            onClick={() => {
              window.location.href =
                "mailto:forloopforfood@gmail.com?subject=Interested%20in%20your%20work";
            }}
            style={{
              background: "transparent",
              border: "1px solid #ffaa4466",
              color: "#ffaa44",
              padding: "12px 20px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
              fontFamily: "monospace",
              letterSpacing: "1px",
            }}
          >
            💌 Interested?
          </button>
        </div>

        {emailClicked && (
          <p
            style={{
              color: "#44ff8888",
              fontSize: "10px",
              fontFamily: "monospace",
              textAlign: "center",
              margin: "0 0 16px 0",
              letterSpacing: "1px",
            }}
          >
            ✓ Email client opening... the Slime King is pleased.
          </p>
        )}

        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          {[
            {
              label: "GitHub",
              icon: "⌨️",
              color: "#ffffff",
              href: "https://github.com/Trooper929",
            },
            {
              label: "LinkedIn",
              icon: "💼",
              color: "#0088ff",
              href: "https://www.linkedin.com/in/forloopforfood",
            },
            {
              label: "Resume",
              icon: "📄",
              color: "#ffaa44",
              href: `${import.meta.env.BASE_URL}Brandon-Valentine-Resume.pdf`,
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  background: "transparent",
                  border: `1px solid ${l.color}33`,
                  color: l.color,
                  padding: "6px 14px",
                  borderRadius: "6px",
                  fontSize: "10px",
                  letterSpacing: "1px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                }}
              >
                {l.icon} {l.label}
              </button>
            </a>
          ))}
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,#ffaa4466,transparent)",
            margin: "20px 0 8px 0",
          }}
        />
        <div
          style={{
            textAlign: "center",
            color: "#ffcc4466",
            fontSize: "9px",
            letterSpacing: "4px",
            marginBottom: "16px",
          }}
        >
          ✦ END OF QUEST LOG ✦
        </div>

        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => {
              window.location.reload();
            }}
            style={{
              background: "transparent",
              border: "1px solid #00ffcc44",
              color: "#00ffcc88",
              padding: "8px 24px",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "monospace",
              fontSize: "11px",
              letterSpacing: "3px",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#00ffcc11";
              e.currentTarget.style.color = "#00ffcc";
              e.currentTarget.style.boxShadow = "0 0 15px #00ffcc22";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#00ffcc88";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            ↺ PLAY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
}
