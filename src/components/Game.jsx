import { useState, useEffect, useRef, useCallback } from "react";
import {
  WORLD_WIDTH,
  GROUND_Y,
  PLAYER_W,
  PLAYER_H,
  WALK_SPEED,
  SPRINT_SPEED,
  VIEWPORT_W,
  VIEWPORT_H,
} from "../data/constants";
import { SKILLS, SKILL_ZONES } from "../data/skills";
import { BIOMES } from "../data/biomes";
import {
  drawPixelCharacter,
  drawBackground,
  drawTavern,
  drawSkillZone,
  drawGuildBuilding,
  drawBoss,
  drawSlimeArmy,
  drawSlimeThrone,
} from "../utils/drawing";
import useAudio from "../hooks/useAudio";
import HUD from "./HUD";
import { Controls, MobileControls } from "./Controls";
import BiomeName from "./BiomeName";
import { WarningOverlay, VictoryFlash } from "./Overlays";
import VibeCodingEvent from "./VibeCodingEvent";
import GuildModal from "./GuildModal";
import RoyalDecree from "./RoyalDecree";

export default function PortfolioGame() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    playerX: 80,
    cameraX: 0,
    facing: 1,
    moving: false,
    time: 0,
    keys: {},
  });
  const spritePixelRef = useRef(null);
  const spriteSheetRef = useRef(null);
  const audio = useAudio();
  const lastSkillCountRef = useRef(0);
  const bossStartedRef = useRef(false);
  const victoryPlayedRef = useRef(false);
  const warningPlayedRef = useRef(false);

  // Preload + strip white background from sprites
  useEffect(() => {
    const stripWhite = (img, ref) => {
      const off = document.createElement("canvas");
      off.width = img.naturalWidth;
      off.height = img.naturalHeight;
      const offCtx = off.getContext("2d");
      offCtx.drawImage(img, 0, 0);
      const imageData = offCtx.getImageData(0, 0, off.width, off.height);
      const d = imageData.data;
      for (let i = 0; i < d.length; i += 4) {
        if (d[i] > 230 && d[i + 1] > 230 && d[i + 2] > 230) d[i + 3] = 0;
      }
      offCtx.putImageData(imageData, 0, 0);
      ref.current = off;
    };
    const img1 = new Image();
    img1.src = "/assets/randhor-16bit.png";
    img1.onload = () => stripWhite(img1, spritePixelRef);

    const img2 = new Image();
    img2.src = "/assets/randhor-chibi.png";
    img2.onload = () => stripWhite(img2, spriteSheetRef);
  }, []);

  const endingRef = useRef({
    phase: 0,
    phaseTimer: 0,
    bossHP: 300,
    shake: false,
    armyProgress: 0,
    throneProgress: 0,
    flashOpacity: 0,
  });

  const [phase, setPhase] = useState(0);
  const [flashOpacity, setFlashOpacity] = useState(0);
  const [showGuild, setShowGuild] = useState(false);
  const [showVibeCoding, setShowVibeCoding] = useState(false);
  const [emailClicked, setEmailClicked] = useState(false);
  const [uiState, setUiState] = useState({
    currentBiome: "TAVERN DISTRICT",
    unlockedSkills: 0,
    playerX: 80,
    sprinting: false,
    foeWarning: false,
  });

  const handleKeyDown = useCallback((e) => {
    stateRef.current.keys[e.key] = true;
    if (
      ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(e.key)
    )
      e.preventDefault();
  }, []);
  const handleKeyUp = useCallback((e) => {
    stateRef.current.keys[e.key] = false;
  }, []);
  const handleMobileKey = useCallback((key, pressed) => {
    stateRef.current.keys[key] = pressed;
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [handleKeyDown, handleKeyUp]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = true;

    let spriteError = false;
    let chibiError = false;

    function drawSprite(x, y, facing, moving, frame) {
      const spritePixel = spritePixelRef.current;
      if (!spritePixel || spriteError) {
        drawPixelCharacter(ctx, x, y - PLAYER_H, frame, facing);
        return;
      }
      try {
        ctx.save();
        const w = PLAYER_W * 1.4;
        const h = PLAYER_H * 1.75;
        const bob = moving ? Math.sin(frame * 1.5) * 1.5 : 0;
        const drawY = y - h + bob;
        const srcW = spritePixel.naturalWidth || spritePixel.width;
        const srcH = spritePixel.naturalHeight || spritePixel.height;
        if (!srcW || !srcH) {
          drawPixelCharacter(ctx, x, y - PLAYER_H, frame, facing);
          ctx.restore();
          return;
        }
        if (facing === 1) {
          ctx.translate(x + w, drawY);
          ctx.scale(-1, 1);
          ctx.drawImage(spritePixel, 0, 0, w, h);
        } else {
          ctx.drawImage(spritePixel, x, drawY, w, h);
        }
        ctx.fillStyle = "rgba(0,0,0,0.2)";
        ctx.beginPath();
        ctx.ellipse(x + w / 2, y + 4, w / 3, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } catch (err) {
        spriteError = true;
        drawPixelCharacter(ctx, x, y - PLAYER_H, frame, facing);
      }
    }

    function getSpriteHeadPos(x, y) {
      const w = PLAYER_W * 1.4;
      const h = PLAYER_H * 1.75;
      return { hx: x + w / 2, hy: y - h + 14 };
    }

    function drawChibi(headX, groundY, expression, facing = 1, size = 160) {
      const spriteSheet = spriteSheetRef.current;
      if (!spriteSheet || chibiError) return;
      try {
        const sw = (spriteSheet.naturalWidth || spriteSheet.width) / 2;
        const sh = (spriteSheet.naturalHeight || spriteSheet.height) / 2;
        if (!sw || !sh) return;
        const col = expression % 2;
        const row = Math.floor(expression / 2);
        const dx = headX - size / 2;
        const dy = groundY - size;
        ctx.save();
        if (facing === 1) {
          ctx.translate(dx + size, dy);
          ctx.scale(-1, 1);
          ctx.drawImage(
            spriteSheet,
            col * sw,
            row * sh,
            sw,
            sh,
            0,
            0,
            size,
            size,
          );
        } else {
          ctx.drawImage(
            spriteSheet,
            col * sw,
            row * sh,
            sw,
            sh,
            dx,
            dy,
            size,
            size,
          );
        }
        ctx.restore();
      } catch (err) {
        chibiError = true;
      }
    }

    let walkFrame = 0,
      walkTick = 0,
      frameCount = 0,
      animRef;

    const loop = () => {
      const s = stateRef.current;
      const e = endingRef.current;
      s.time++;
      e.phaseTimer++;

      // ── PHASE 0: Normal game ────────────────────────────────
      if (e.phase === 0 && !e.vibeCodingActive) {
        const left = s.keys["ArrowLeft"] || s.keys["a"];
        const right = s.keys["ArrowRight"] || s.keys["d"];
        const sprint = s.keys["Shift"];
        const moving = (left || right) && !(left && right);
        const speed = sprint && moving ? SPRINT_SPEED : WALK_SPEED;
        s.moving = moving;
        if (right && !left && s.playerX < WORLD_WIDTH - 80) {
          s.playerX += speed;
          s.facing = 1;
        }
        if (left && !right && s.playerX > 40) {
          s.playerX -= speed;
          s.facing = -1;
        }
        if (s.moving) {
          walkTick++;
          if (walkTick % (sprint && moving ? 5 : 8) === 0)
            walkFrame = (walkFrame + 1) % 4;
        } else {
          walkFrame = 0;
        }

        const lastSkillX = 700 + (SKILL_ZONES.length - 1) * 360 + 200;
        if (s.playerX >= lastSkillX && !e.vibeCodingShown) {
          e.vibeCodingShown = true;
          e.vibeCodingActive = true;
          setShowVibeCoding(true);
          audio.playVibeCodingJingle();
        }

        if (s.playerX >= 5200 && !e.warningShown) e.warningShown = true;

        if (s.playerX >= 5700 && e.phase === 0) {
          e.phase = 1;
          e.phaseTimer = 0;
          setPhase(1);
        }
      }

      // ── PHASE 1: Boss intro ─────────────────────────────────
      if (e.phase === 1) {
        s.moving = false;
        if (e.phaseTimer > 150) {
          e.phase = 2;
          e.phaseTimer = 0;
          setPhase(2);
        }
      }

      // ── PHASE 2: Boss fight ─────────────────────────────────
      if (e.phase === 2) {
        s.moving = false;
        e.armyProgress = Math.min(e.armyProgress + 0.005, 1);
        if (e.armyProgress > 0.3 && e.phaseTimer % 40 === 0 && e.bossHP > 0) {
          e.bossHP = Math.max(0, e.bossHP - 18);
          e.shake = true;
          setTimeout(() => {
            endingRef.current.shake = false;
          }, 150);
        }
        if (e.bossHP <= 0 && e.phase === 2) {
          e.phase = 3;
          e.phaseTimer = 0;
          setPhase(3);
        }
      }

      // ── PHASE 3: Victory flash ──────────────────────────────
      if (e.phase === 3) {
        const fo =
          e.phaseTimer < 30
            ? e.phaseTimer / 30
            : Math.max(0, 1 - (e.phaseTimer - 30) / 60);
        e.flashOpacity = fo;
        setFlashOpacity(fo);
        if (e.phaseTimer > 120) {
          e.phase = 4;
          e.phaseTimer = 0;
          setPhase(4);
        }
      }

      // ── PHASE 4: Throne builds ──────────────────────────────
      if (e.phase === 4) {
        e.throneProgress = Math.min(e.throneProgress + 0.008, 1);
        if (e.throneProgress >= 1 && e.phaseTimer > 320) {
          e.phase = 5;
          e.phaseTimer = 0;
          setPhase(5);
        }
      }

      // Camera smooth follow
      if (e.phase <= 1) {
        const targetCam = s.playerX - VIEWPORT_W / 3;
        s.cameraX +=
          (Math.max(0, Math.min(targetCam, WORLD_WIDTH - VIEWPORT_W)) -
            s.cameraX) *
          0.1;
      }

      const biome =
        BIOMES.find((b) => s.playerX >= b.start && s.playerX < b.end) ||
        BIOMES[0];
      const unlockedSkills = SKILL_ZONES.filter(
        (z) => s.playerX > z.worldX - 80,
      ).length;
      const skillProgress = SKILL_ZONES.map((z) =>
        Math.min(Math.max((s.playerX - (z.worldX - 80)) / 80, 0), 1),
      );
      const nearGuild = s.playerX > 4500 && s.playerX < 4800;

      // ── AUDIO TRIGGERS ──────────────────────────────────────
      if (s.moving && s.time % 18 === 0) audio.playFootstep();
      if (unlockedSkills > lastSkillCountRef.current) {
        audio.playSkillUnlock(unlockedSkills - 1);
        lastSkillCountRef.current = unlockedSkills;
      }
      if (e.warningShown && !warningPlayedRef.current) {
        warningPlayedRef.current = true;
        audio.playWarning();
      }
      if (e.phase === 2 && !bossStartedRef.current) {
        bossStartedRef.current = true;
        audio.playBossMusic();
      }
      if (e.phase === 3 && !victoryPlayedRef.current) {
        victoryPlayedRef.current = true;
        audio.stopBossMusic();
        audio.playVictoryFanfare();
      }

      // ── DRAW ────────────────────────────────────────────────
      if (e.phase <= 1) {
        drawBackground(ctx, s.cameraX, biome, s.time);
        drawTavern(ctx, 200, s.cameraX);
        SKILL_ZONES.forEach((z, i) =>
          drawSkillZone(ctx, z, s.cameraX, skillProgress[i], s.time),
        );
        drawGuildBuilding(ctx, 4680, s.cameraX);
        if (nearGuild) {
          ctx.save();
          ctx.fillStyle = "rgba(0,0,0,0.55)";
          ctx.fillRect(VIEWPORT_W / 2 - 140, GROUND_Y - 50, 280, 26);
          ctx.fillStyle = "#ffcc44";
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.fillText(
            "Press  E  to read the Guild Board",
            VIEWPORT_W / 2,
            GROUND_Y - 33,
          );
          ctx.restore();
        }
        const psx = s.playerX - s.cameraX - PLAYER_W / 2;
        drawSprite(psx, GROUND_Y, s.facing, s.moving, walkFrame);
      }

      if (e.phase === 1) {
        const voidBiome = {
          sky: ["#0a0005", "#1a000a"],
          ground: "#1a0010",
          accent: "#cc00ff",
        };
        drawBackground(ctx, s.cameraX, voidBiome, s.time);
        const psx = s.playerX - s.cameraX - PLAYER_W / 2;
        drawSprite(psx, GROUND_Y, 1, false, 0);
        const { hx } = getSpriteHeadPos(psx, GROUND_Y);
        drawChibi(hx, GROUND_Y, 0, 1);
      }

      if (e.phase === 2) {
        const voidBiome = {
          sky: ["#0a0005", "#1a0008"],
          ground: "#1a0010",
          accent: "#cc0044",
        };
        drawBackground(ctx, s.cameraX, voidBiome, s.time);
        ctx.strokeStyle = "#ff000033";
        ctx.lineWidth = 3;
        for (let i = 0; i < 5; i++) {
          ctx.beginPath();
          ctx.moveTo(VIEWPORT_W / 2 + (i - 2) * 60, GROUND_Y);
          ctx.lineTo(VIEWPORT_W / 2 + (i - 2) * 60 + 20, GROUND_Y + 30);
          ctx.stroke();
        }
        drawSlimeArmy(ctx, s.time, e.armyProgress);
        drawSprite(80, GROUND_Y, 1, false, s.time % 4 < 2 ? 0 : 1);
        const chibiExp = e.bossHP > 150 ? 1 : 2;
        const { hx: phx } = getSpriteHeadPos(80, GROUND_Y);
        drawChibi(phx, GROUND_Y, chibiExp, 1);
        if (e.bossHP > 0) drawBoss(ctx, 480, e.bossHP, 300, s.time, e.shake);
        if (e.armyProgress > 0.3) {
          const orbPhase = (s.time * 0.04) % 1;
          const orbX = 150 + orbPhase * (480 - 150);
          const orbY = GROUND_Y - 80 - Math.sin(orbPhase * Math.PI) * 80;
          const og = ctx.createRadialGradient(orbX, orbY, 2, orbX, orbY, 14);
          og.addColorStop(0, "#ffffff");
          og.addColorStop(0.4, "#00ffcc");
          og.addColorStop(1, "rgba(0,255,204,0)");
          ctx.fillStyle = og;
          ctx.beginPath();
          ctx.arc(orbX, orbY, 14, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.save();
        ctx.font = "bold 20px monospace";
        ctx.textAlign = "center";
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 62, VIEWPORT_W, 32);
        ctx.fillStyle = "#ff3300bb";
        ctx.shadowColor = "#ff0000";
        ctx.shadowBlur = 18;
        ctx.fillText(
          "⚔  THE BATTLE AGAINST THE JOB MARKET  ⚔",
          VIEWPORT_W / 2,
          84,
        );
        ctx.restore();
      }

      if (e.phase === 4) {
        const throneBiome = {
          sky: ["#1a0f00", "#2a1800"],
          ground: "#2a1800",
          accent: "#ffcc44",
        };
        drawBackground(ctx, 0, throneBiome, s.time);
        drawSlimeThrone(ctx, s.time, e.throneProgress);
        if (e.throneProgress > 0.7) {
          const tsx = VIEWPORT_W / 2 - PLAYER_W * 0.7;
          drawSprite(tsx, GROUND_Y - 90, 1, false, 0);
          const { hx: thx } = getSpriteHeadPos(tsx, GROUND_Y - 90);
          drawChibi(thx, GROUND_Y - 90, 3, 1);
          ctx.save();
          ctx.font = "28px monospace";
          ctx.textAlign = "center";
          ctx.fillText("👑", thx, GROUND_Y - 90 - PLAYER_H * 1.75 - 10);
          ctx.restore();
        }
        if (e.throneProgress > 0.9) {
          ctx.save();
          ctx.fillStyle = "rgba(0,0,0,0.5)";
          ctx.fillRect(0, 20, VIEWPORT_W, 50);
          ctx.font = "bold 16px monospace";
          ctx.textAlign = "center";
          ctx.fillStyle = "#ffdd66";
          ctx.shadowColor = "#ffcc44";
          ctx.shadowBlur = 15;
          ctx.fillText("✦ THE SLIME KING IS CROWNED ✦", VIEWPORT_W / 2, 38);
          ctx.font = "10px monospace";
          ctx.fillStyle = "#cc9944aa";
          ctx.shadowBlur = 0;
          ctx.fillText(
            "The Adaptive Slime Mind awaits his next quest...",
            VIEWPORT_W / 2,
            58,
          );
          ctx.restore();
        }
        for (let i = 0; i < 12; i++) {
          const cx2 =
            ((i * 137 + s.time * 2) % (VIEWPORT_W + 100)) % VIEWPORT_W;
          const cy = ((s.time * 1.5 + i * 60) % (VIEWPORT_H + 50)) % VIEWPORT_H;
          ctx.fillStyle = SKILLS[i % SKILLS.length].slimeColor;
          ctx.fillRect(cx2, cy, 4, 4);
        }
      }

      // Scanlines
      ctx.fillStyle = "rgba(0,0,0,0.025)";
      for (let y = 0; y < VIEWPORT_H; y += 2) ctx.fillRect(0, y, VIEWPORT_W, 1);

      frameCount++;
      if (frameCount % 6 === 0) {
        setUiState({
          currentBiome: biome.name,
          unlockedSkills,
          playerX: s.playerX,
          sprinting: !!s.keys["Shift"],
          foeWarning: !!e.warningShown,
        });
      }
      animRef = requestAnimationFrame(loop);
    };

    animRef = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animRef);
    };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "e" || e.key === "E") {
        const px = stateRef.current.playerX;
        if (px > 4500 && px < 4800) setShowGuild((v) => !v);
      }
      if (e.key === "Escape") setShowGuild(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: "#050505",
        fontFamily: "monospace",
        padding: "20px",
      }}
    >
      <div style={{ marginBottom: "12px", textAlign: "center" }}>
        <h1
          style={{
            color: "#00ffcc",
            fontSize: "clamp(1rem,3vw,1.4rem)",
            fontWeight: "900",
            margin: 0,
            letterSpacing: "4px",
            textShadow: "0 0 20px #00ffcc66",
          }}
        >
          BRANDON • FULL-STACK DEVELOPER
        </h1>
        <p
          style={{
            color: "#ffffff22",
            fontSize: "10px",
            margin: "4px 0 0 0",
            letterSpacing: "3px",
          }}
        >
          JUNIOR DEV • MERN STACK • V SCHOOL 2025
        </p>
      </div>

      <div
        style={{
          position: "relative",
          border: "1px solid #00ffcc22",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 0 40px #00ffcc11,0 0 80px rgba(0,0,0,0.8)",
          maxWidth: "100%",
        }}
      >
        <canvas
          ref={canvasRef}
          width={VIEWPORT_W}
          height={VIEWPORT_H}
          style={{
            display: "block",
            maxWidth: "100%",
            imageRendering: "pixelated",
          }}
        />

        <HUD
          playerX={uiState.playerX}
          unlockedSkills={uiState.unlockedSkills}
          currentBiome={uiState.currentBiome}
          sprinting={uiState.sprinting}
          phase={phase}
        />
        <Controls phase={phase} foeWarning={uiState.foeWarning} />
        <MobileControls onKey={handleMobileKey} phase={phase} />
        <BiomeName name={uiState.currentBiome} phase={phase} />
        <WarningOverlay
          visible={phase === 1}
          foeWarning={phase === 0 && uiState.foeWarning}
        />
        <VictoryFlash visible={phase === 3} opacity={flashOpacity} />

        {showVibeCoding && (
          <VibeCodingEvent
            onChoice={(yes) => {
              setShowVibeCoding(false);
              endingRef.current.vibeCodingChoice = yes;
              endingRef.current.vibeCodingActive = false;
            }}
          />
        )}
        {phase === 5 && (
          <RoyalDecree
            emailClicked={emailClicked}
            setEmailClicked={setEmailClicked}
            vibeCodingChoice={endingRef.current.vibeCodingChoice}
          />
        )}
        {showGuild && phase < 2 && (
          <GuildModal onClose={() => setShowGuild(false)} />
        )}
      </div>

      {phase < 5 && (
        <div
          style={{
            marginTop: "20px",
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            justifyContent: "center",
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
              label: "Email",
              icon: "✉️",
              color: "#00ffcc",
              href: "mailto:forloopforfood@gmail.com",
            },
            {
              label: "Resume",
              icon: "📄",
              color: "#ffaa44",
              href: "/Brandon-Valentine-Resume.pdf",
            },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  background: "transparent",
                  border: `1px solid ${link.color}33`,
                  color: link.color,
                  padding: "8px 20px",
                  borderRadius: "6px",
                  fontSize: "11px",
                  letterSpacing: "2px",
                  cursor: "pointer",
                  fontFamily: "monospace",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `${link.color}11`;
                  e.currentTarget.style.boxShadow = `0 0 15px ${link.color}22`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {link.icon} {link.label}
              </button>
            </a>
          ))}
        </div>
      )}

      {phase < 2 && (
        <p
          style={{
            color: "#ffffff15",
            fontSize: "10px",
            letterSpacing: "2px",
            marginTop: "10px",
            textAlign: "center",
          }}
        >
          Walk right to the Guild Hall • Press E to read the board • Shift to
          sprint
        </p>
      )}
    </div>
  );
}
