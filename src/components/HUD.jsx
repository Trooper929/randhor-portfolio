import { WORLD_WIDTH } from "../data/constants";
import { SKILLS } from "../data/skills";

export default function HUD({
  playerX,
  unlockedSkills,
  currentBiome,
  sprinting,
  phase,
}) {
  if (phase >= 4) return null;
  const progress = Math.min(playerX / (WORLD_WIDTH - 200), 1);
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        padding: "10px 16px",
        background: "linear-gradient(180deg,rgba(0,0,0,0.85),rgba(0,0,0,0))",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        pointerEvents: "none",
        zIndex: 10,
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: "2px solid #00ffcc",
          background: "radial-gradient(#1a4a3a,#0a2a1a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          boxShadow: "0 0 10px #00ffcc44",
          flexShrink: 0,
        }}
      >
        ⚔️
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "3px",
          }}
        >
          <span
            style={{
              color: "#00ffcc",
              fontSize: "11px",
              fontWeight: "bold",
              letterSpacing: "2px",
            }}
          >
            RANDOHR • {currentBiome}
            {sprinting && (
              <span style={{ color: "#ffcc44", marginLeft: "8px" }}>
                ⚡ SPRINT
              </span>
            )}
          </span>
          <span style={{ color: "#00ffcc88", fontSize: "10px" }}>
            Skills: {unlockedSkills}/{SKILLS.length}
          </span>
        </div>
        <div
          style={{
            height: "5px",
            background: "#1a1a1a",
            borderRadius: "3px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress * 100}%`,
              background: "linear-gradient(90deg,#003366,#0055aa,#00ffcc)",
              borderRadius: "3px",
              boxShadow: "0 0 8px #00ffcc66",
              transition: "width 0.1s ease",
            }}
          />
        </div>
      </div>
      <div
        style={{
          color: "#ffcc44",
          fontSize: "10px",
          letterSpacing: "1px",
          textAlign: "right",
          flexShrink: 0,
        }}
      >
        <div style={{ fontWeight: "bold" }}>XP</div>
        <div>{Math.floor(progress * 9999).toLocaleString()}</div>
      </div>
    </div>
  );
}
