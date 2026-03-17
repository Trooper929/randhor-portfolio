import {
  GROUND_Y,
  PLAYER_W,
  PLAYER_H,
  VIEWPORT_W,
  VIEWPORT_H,
} from "../data/constants";
import { SKILLS, getRank } from "../data/skills";

export function drawPixelCharacter(ctx, x, y, frame, facing) {
  ctx.save();
  if (facing === -1) {
    ctx.translate(x + PLAYER_W, y);
    ctx.scale(-1, 1);
    ctx.translate(-x, -y);
  }
  const f = frame % 4;
  const legOffset = [0, 5, 0, -5][f],
    armOffset = [0, -4, 0, 4][f],
    bodyBob = [0, -1, 0, 1][f];
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.beginPath();
  ctx.ellipse(x + PLAYER_W / 2, y + PLAYER_H + 2, 16, 5, 0, 0, Math.PI * 2);
  ctx.fill();
  const grd = ctx.createRadialGradient(
    x + 24,
    y + 36 + bodyBob,
    5,
    x + 24,
    y + 36 + bodyBob,
    28,
  );
  grd.addColorStop(0, "rgba(0,200,255,0.15)");
  grd.addColorStop(1, "rgba(0,200,255,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(x - 10, y + 10, PLAYER_W + 20, PLAYER_H);
  ctx.fillStyle = "#00aadd88";
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 18 + bodyBob);
  ctx.lineTo(x - 6, y + 55 + bodyBob);
  ctx.lineTo(x + 4, y + 52 + bodyBob);
  ctx.lineTo(x + 6, y + 65 + bodyBob);
  ctx.lineTo(x + 10, y + 54 + bodyBob);
  ctx.lineTo(x + 40, y + 54 + bodyBob);
  ctx.lineTo(x + 44, y + 65 + bodyBob);
  ctx.lineTo(x + 46, y + 52 + bodyBob);
  ctx.lineTo(x + 54, y + 52 + bodyBob);
  ctx.lineTo(x + 40, y + 18 + bodyBob);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(x + 12, y + 22 + bodyBob, 24, 36);
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(x + 12, y + 22 + bodyBob, 24, 2);
  ctx.fillRect(x + 22, y + 22 + bodyBob, 4, 36);
  ctx.fillStyle = "#333";
  ctx.fillRect(x + 12, y + 48 + bodyBob, 24, 5);
  ctx.fillStyle = "#888";
  ctx.fillRect(x + 20, y + 49 + bodyBob, 8, 3);
  ctx.fillStyle = "#111122";
  ctx.fillRect(x + 13, y + 57 + bodyBob + legOffset, 9, 14);
  ctx.fillRect(x + 26, y + 57 + bodyBob - legOffset, 9, 14);
  ctx.fillStyle = "#00aacc";
  ctx.fillRect(x + 12, y + 69 + bodyBob + legOffset, 11, 4);
  ctx.fillRect(x + 25, y + 69 + bodyBob - legOffset, 11, 4);
  ctx.fillStyle = "#1a1a2e";
  ctx.fillRect(x + 4, y + 24 + bodyBob + armOffset, 8, 20);
  ctx.fillRect(x + 36, y + 24 + bodyBob - armOffset, 8, 20);
  ctx.fillStyle = "#222233";
  ctx.fillRect(x + 4, y + 42 + bodyBob + armOffset, 8, 8);
  ctx.fillRect(x + 36, y + 42 + bodyBob - armOffset, 8, 8);
  ctx.fillStyle = "#00ccff";
  ctx.fillRect(x + 4, y + 42 + bodyBob + armOffset, 8, 2);
  ctx.fillRect(x + 36, y + 42 + bodyBob - armOffset, 8, 2);
  const orb = ctx.createRadialGradient(
    x + 2,
    y + 46 + bodyBob + armOffset,
    1,
    x + 6,
    y + 50 + bodyBob + armOffset,
    7,
  );
  orb.addColorStop(0, "#aaffff");
  orb.addColorStop(0.5, "#00aaff88");
  orb.addColorStop(1, "#0044ff22");
  ctx.fillStyle = orb;
  ctx.beginPath();
  ctx.arc(x + 4, y + 50 + bodyBob + armOffset, 7, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#00ffcc";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.fillStyle = "#c87941";
  ctx.fillRect(x + 19, y + 14 + bodyBob, 10, 10);
  ctx.fillRect(x + 13, y + bodyBob, 22, 18);
  ctx.fillStyle = "#44aaff";
  ctx.fillRect(x + 11, y - 4 + bodyBob, 26, 8);
  ctx.fillRect(x + 9, y + bodyBob, 8, 6);
  ctx.fillRect(x + 31, y + bodyBob, 6, 4);
  ctx.fillRect(x + 13, y - 6 + bodyBob, 8, 4);
  ctx.fillRect(x + 21, y - 8 + bodyBob, 6, 6);
  ctx.fillRect(x + 27, y - 5 + bodyBob, 6, 3);
  ctx.fillStyle = "#88ccff";
  ctx.fillRect(x + 16, y - 5 + bodyBob, 4, 2);
  ctx.fillRect(x + 22, y - 7 + bodyBob, 3, 2);
  ctx.fillStyle = "#00ffcc";
  ctx.fillRect(x + 16, y + 6 + bodyBob, 5, 4);
  ctx.fillRect(x + 27, y + 6 + bodyBob, 5, 4);
  ctx.fillStyle = "#003322";
  ctx.fillRect(x + 17, y + 7 + bodyBob, 3, 2);
  ctx.fillRect(x + 28, y + 7 + bodyBob, 3, 2);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 19, y + 6 + bodyBob, 1, 1);
  ctx.fillRect(x + 30, y + 6 + bodyBob, 1, 1);
  ctx.fillStyle = "#a0522d";
  ctx.fillRect(x + 20, y + 13 + bodyBob, 6, 1);
  ctx.fillRect(x + 25, y + 12 + bodyBob, 2, 2);
  ctx.restore();
}

export function drawSlime(ctx, x, y, color, size, bounce) {
  const b = Math.sin(bounce) * 2;
  ctx.save();
  ctx.fillStyle = color + "99";
  ctx.beginPath();
  ctx.ellipse(x, y + b, size * 0.9, size * 0.7, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color + "cc";
  ctx.beginPath();
  ctx.ellipse(x, y - size * 0.2 + b, size * 0.7, size * 0.55, 0, 0, Math.PI);
  ctx.fill();
  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.ellipse(
    x - size * 0.2,
    y - size * 0.1 + b,
    size * 0.13,
    size * 0.16,
    -0.2,
    0,
    Math.PI * 2,
  );
  ctx.ellipse(
    x + size * 0.2,
    y - size * 0.1 + b,
    size * 0.13,
    size * 0.16,
    0.2,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.fillStyle = "#000033";
  ctx.beginPath();
  ctx.ellipse(
    x - size * 0.18,
    y - size * 0.1 + b,
    size * 0.07,
    size * 0.09,
    -0.2,
    0,
    Math.PI * 2,
  );
  ctx.ellipse(
    x + size * 0.22,
    y - size * 0.1 + b,
    size * 0.07,
    size * 0.09,
    0.2,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.beginPath();
  ctx.ellipse(
    x - size * 0.1,
    y - size * 0.3 + b,
    size * 0.15,
    size * 0.1,
    -0.5,
    0,
    Math.PI * 2,
  );
  ctx.fill();
  ctx.restore();
}

export function drawBackground(ctx, cameraX, biome, time) {
  const sky = ctx.createLinearGradient(0, 0, 0, VIEWPORT_H);
  sky.addColorStop(0, biome.sky[0]);
  sky.addColorStop(1, biome.sky[1]);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, VIEWPORT_W, VIEWPORT_H);

  for (let i = 0; i < 60; i++) {
    const sx =
      (((i * 137 + 50) % VIEWPORT_W) + ((cameraX * 0.1) % VIEWPORT_W)) %
      VIEWPORT_W;
    const sy = (i * 73 + 20) % (VIEWPORT_H * 0.6);
    ctx.globalAlpha = (Math.sin(time * 0.02 + i) * 0.5 + 0.5) * 0.8;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(sx, sy, 1, 1);
  }
  ctx.globalAlpha = 1;

  const mx =
    (VIEWPORT_W * 0.8 - ((cameraX * 0.05) % VIEWPORT_W) + VIEWPORT_W) %
    VIEWPORT_W;
  const mg = ctx.createRadialGradient(mx, 60, 5, mx, 60, 35);
  mg.addColorStop(0, "#ffffcc");
  mg.addColorStop(0.4, "#ffeeaa88");
  mg.addColorStop(1, "rgba(255,220,100,0)");
  ctx.fillStyle = mg;
  ctx.fillRect(0, 0, VIEWPORT_W, VIEWPORT_H);
  ctx.fillStyle = "#ffffdd";
  ctx.beginPath();
  ctx.arc(mx, 60, 18, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = biome.sky[1] + "cc";
  for (let i = 0; i < 12; i++) {
    const tx =
      ((((i * 180 - cameraX * 0.2) % (VIEWPORT_W + 200)) + VIEWPORT_W + 200) %
        (VIEWPORT_W + 200)) -
      100;
    const th = 60 + (i % 3) * 30;
    ctx.beginPath();
    ctx.moveTo(tx, GROUND_Y - 20);
    ctx.lineTo(tx + 50, GROUND_Y - 20 - th);
    ctx.lineTo(tx + 100, GROUND_Y - 20);
    ctx.fill();
  }
  ctx.fillStyle = "#0a1a08cc";
  for (let i = 0; i < 8; i++) {
    const tx =
      ((((i * 220 + 60 - cameraX * 0.4) % (VIEWPORT_W + 300)) +
        VIEWPORT_W +
        300) %
        (VIEWPORT_W + 300)) -
      100;
    const th = 80 + (i % 4) * 25;
    ctx.beginPath();
    ctx.moveTo(tx, GROUND_Y);
    ctx.lineTo(tx + 30, GROUND_Y - th);
    ctx.lineTo(tx + 60, GROUND_Y);
    ctx.fill();
    ctx.fillStyle = "#3a2a0a";
    ctx.fillRect(tx + 25, GROUND_Y - 20, 10, 22);
    ctx.fillStyle = "#0a1a08cc";
  }

  const gg = ctx.createLinearGradient(0, GROUND_Y, 0, VIEWPORT_H);
  gg.addColorStop(0, biome.ground);
  gg.addColorStop(0.3, "#0a0a0a");
  gg.addColorStop(1, "#050505");
  ctx.fillStyle = gg;
  ctx.fillRect(0, GROUND_Y, VIEWPORT_W, VIEWPORT_H - GROUND_Y);
  ctx.strokeStyle = biome.accent + "44";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y);
  ctx.lineTo(VIEWPORT_W, GROUND_Y);
  ctx.stroke();

  const bname = biome.name;

  if (bname === "TAVERN DISTRICT") {
    for (let i = 0; i < 12; i++) {
      const fx =
        ((((i * 173 + time * 0.8 - cameraX * 0.6) % (VIEWPORT_W + 100)) +
          VIEWPORT_W +
          100) %
          (VIEWPORT_W + 100)) -
        50;
      const fy =
        GROUND_Y - 40 - (i % 5) * 30 + Math.sin(time * 0.05 + i * 1.3) * 15;
      const fa = (Math.sin(time * 0.06 + i) * 0.5 + 0.5) * 0.9;
      ctx.globalAlpha = fa;
      ctx.fillStyle = "#ffcc44";
      ctx.beginPath();
      ctx.arc(fx, fy, 2, 0, Math.PI * 2);
      ctx.fill();
      const fg = ctx.createRadialGradient(fx, fy, 0, fx, fy, 8);
      fg.addColorStop(0, "rgba(255,200,50,0.4)");
      fg.addColorStop(1, "rgba(255,200,50,0)");
      ctx.fillStyle = fg;
      ctx.beginPath();
      ctx.arc(fx, fy, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  if (bname === "WHISPERING FOREST") {
    for (let i = 0; i < 20; i++) {
      const fx =
        ((((i * 97 + time * 0.4 - cameraX * 0.7) % (VIEWPORT_W + 100)) +
          VIEWPORT_W +
          100) %
          (VIEWPORT_W + 100)) -
        50;
      const fy =
        GROUND_Y - 20 - (i % 8) * 25 + Math.sin(time * 0.04 + i * 0.9) * 20;
      ctx.globalAlpha = (Math.sin(time * 0.05 + i * 1.1) * 0.5 + 0.5) * 0.8;
      ctx.fillStyle = "#44ff88";
      ctx.beginPath();
      ctx.arc(fx, fy, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    for (let i = 0; i < 5; i++) {
      const mx2 =
        ((((i * 220 + time * 0.3 - cameraX * 0.5) % (VIEWPORT_W + 200)) +
          VIEWPORT_W +
          200) %
          (VIEWPORT_W + 200)) -
        100;
      ctx.globalAlpha = 0.06;
      ctx.fillStyle = "#aaffcc";
      ctx.fillRect(mx2, GROUND_Y - 12, 140, 14);
      ctx.globalAlpha = 1;
    }
  }

  if (bname === "MURK SWAMP") {
    for (let i = 0; i < 15; i++) {
      const bx =
        ((((i * 151 + time * 0.5 - cameraX * 0.6) % (VIEWPORT_W + 100)) +
          VIEWPORT_W +
          100) %
          (VIEWPORT_W + 100)) -
        50;
      const by = GROUND_Y - ((time * 0.4 + i * 40) % 120);
      ctx.globalAlpha = Math.max(0, (1 - (GROUND_Y - by) / 120) * 0.25);
      ctx.fillStyle = "#88ff44";
      ctx.beginPath();
      ctx.arc(bx, by, 3 + (i % 4), 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "#44ff88";
    ctx.fillRect(0, GROUND_Y - 60, VIEWPORT_W, 60);
    ctx.globalAlpha = 1;
  }

  if (bname === "SCORCHED DESERT") {
    for (let i = 0; i < 6; i++) {
      const hx =
        ((((i * 180 - cameraX * 0.5) % (VIEWPORT_W + 100)) + VIEWPORT_W + 100) %
          (VIEWPORT_W + 100)) -
        50;
      const hy = GROUND_Y - 8 - i * 3;
      ctx.globalAlpha = 0.08 + Math.sin(time * 0.1 + i) * 0.04;
      ctx.fillStyle = "#ffcc44";
      ctx.fillRect(hx, hy, 80 + i * 10, 2);
      ctx.globalAlpha = 1;
    }
    for (let i = 0; i < 18; i++) {
      const sx =
        ((((i * 113 + time * 1.2 - cameraX * 0.9) % (VIEWPORT_W + 80)) +
          VIEWPORT_W +
          80) %
          (VIEWPORT_W + 80)) -
        40;
      const sy = GROUND_Y - 5 - (i % 6) * 6;
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = "#ffcc88";
      ctx.fillRect(sx, sy, 2, 1);
      ctx.globalAlpha = 1;
    }
  }

  if (bname === "GUILD DISTRICT") {
    for (let i = 0; i < 10; i++) {
      const ex =
        ((((i * 167 + time * 0.6 - cameraX * 0.7) % (VIEWPORT_W + 100)) +
          VIEWPORT_W +
          100) %
          (VIEWPORT_W + 100)) -
        50;
      const ey = GROUND_Y - ((time * 0.8 + i * 35) % 200);
      ctx.globalAlpha = Math.max(0, (1 - (GROUND_Y - ey) / 200) * 0.7);
      ctx.fillStyle = "#ff4488";
      ctx.beginPath();
      ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  if (bname === "THE VOID") {
    for (let i = 0; i < 25; i++) {
      const vx =
        ((((i * 89 + time * 1.5 - cameraX * 0.8) % (VIEWPORT_W + 100)) +
          VIEWPORT_W +
          100) %
          (VIEWPORT_W + 100)) -
        50;
      const vy = (time * 0.6 + i * 28) % VIEWPORT_H;
      ctx.globalAlpha = (Math.sin(time * 0.08 + i) * 0.5 + 0.5) * 0.5;
      ctx.fillStyle = "#cc00ff";
      ctx.fillRect(vx, vy, 2, 2);
      ctx.globalAlpha = 1;
    }
    ctx.globalAlpha = 0.03 + Math.sin(time * 0.08) * 0.02;
    ctx.fillStyle = "#8800ff";
    ctx.fillRect(0, 0, VIEWPORT_W, VIEWPORT_H);
    ctx.globalAlpha = 1;
  }

  for (let i = 0; i < 6; i++) {
    const px =
      ((((i * 180 + time * 0.3 - cameraX * 0.8) % (VIEWPORT_W + 100)) +
        VIEWPORT_W +
        100) %
        (VIEWPORT_W + 100)) -
      50;
    ctx.fillStyle = biome.accent + "33";
    ctx.beginPath();
    ctx.arc(px, GROUND_Y + 10 + (i % 3) * 8, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawTavern(ctx, worldX, cameraX) {
  const x = worldX - cameraX;
  if (x < -400 || x > VIEWPORT_W + 100) return;
  ctx.fillStyle = "#2a1a0a";
  ctx.fillRect(x - 120, GROUND_Y - 140, 200, 140);
  ctx.fillStyle = "#3a1a08";
  ctx.beginPath();
  ctx.moveTo(x - 140, GROUND_Y - 140);
  ctx.lineTo(x - 20, GROUND_Y - 200);
  ctx.lineTo(x + 100, GROUND_Y - 140);
  ctx.fill();
  ctx.fillStyle = "#4a2a10";
  ctx.fillRect(x - 70, GROUND_Y - 122, 130, 40);
  ctx.strokeStyle = "#aa6622";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 70, GROUND_Y - 122, 130, 40);
  ctx.fillStyle = "#ffcc66";
  ctx.font = "bold 10px monospace";
  ctx.textAlign = "center";
  ctx.fillText("🍺 THE JOBLESS INN 🍺", x - 5, GROUND_Y - 106);
  ctx.fillStyle = "#cc9944";
  ctx.font = "8px monospace";
  ctx.fillText("Est. Bootcamp Day 1", x - 5, GROUND_Y - 93);
  ctx.fillStyle = "#1a0a00";
  ctx.fillRect(x - 25, GROUND_Y - 55, 30, 55);
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 25, GROUND_Y - 55, 30, 55);
  ctx.fillStyle = "#ffcc4422";
  ctx.fillRect(x - 95, GROUND_Y - 112, 32, 26);
  ctx.fillRect(x + 42, GROUND_Y - 112, 32, 26);
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 1;
  ctx.strokeRect(x - 95, GROUND_Y - 112, 32, 26);
  ctx.strokeRect(x + 42, GROUND_Y - 112, 32, 26);
  for (let i = 0; i < 2; i++) {
    const lx = x - 105 + i * 195;
    ctx.fillStyle = "#ffcc44";
    ctx.beginPath();
    ctx.arc(lx, GROUND_Y - 158, 6, 0, Math.PI * 2);
    ctx.fill();
    const lg = ctx.createRadialGradient(
      lx,
      GROUND_Y - 158,
      1,
      lx,
      GROUND_Y - 158,
      25,
    );
    lg.addColorStop(0, "rgba(255,200,50,0.3)");
    lg.addColorStop(1, "rgba(255,200,50,0)");
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.arc(lx, GROUND_Y - 158, 25, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawSkillZone(ctx, zone, cameraX, unlocked, time) {
  const x = zone.worldX - cameraX;
  if (x < -200 || x > VIEWPORT_W + 200) return;
  const rankSlimes = {
    "S Rank": 8,
    "A Rank": 6,
    "B Rank": 4,
    "C Rank": 2,
    "D Rank": 1,
  };
  const rank = getRank(zone.level);
  const maxCount = rankSlimes[rank.label];
  const count = Math.floor(maxCount * unlocked);

  for (let i = 0; i < count; i++) {
    const size = 18 + (i % 3) * 3;
    drawSlime(
      ctx,
      x,
      GROUND_Y - i * 32 - size,
      zone.slimeColor,
      size,
      time * 0.05 + i * 0.8,
    );
  }

  if (count > 0) {
    ctx.save();
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "center";
    ctx.fillStyle = rank.color;
    ctx.shadowColor = rank.color;
    ctx.shadowBlur = 6;
    ctx.fillText(`${rank.stars} ${rank.label}`, x, GROUND_Y - count * 32 - 22);
    ctx.restore();
  }

  ctx.save();
  ctx.font = "bold 16px monospace";
  ctx.textAlign = "center";
  if (count > 0) {
    ctx.fillStyle = rank.color;
    ctx.shadowColor = rank.color;
    ctx.shadowBlur = 6;
    ctx.fillText(zone.name, x, GROUND_Y + 20);
    ctx.font = "14px monospace";
    ctx.shadowBlur = 0;
    ctx.fillStyle = rank.color + "99";
    ctx.fillText(rank.label, x, GROUND_Y + 38);
    ctx.font = "16px monospace";
    ctx.fillText(rank.stars, x, GROUND_Y + 56);
  } else {
    ctx.fillStyle = zone.slimeColor + "55";
    ctx.fillText(zone.name, x, GROUND_Y + 20);
    ctx.fillStyle = "#ffffff33";
    ctx.fillText("???", x, GROUND_Y + 38);
  }
  ctx.restore();
}

export function drawGuildBuilding(ctx, worldX, cameraX) {
  const x = worldX - cameraX;
  if (x < -500 || x > VIEWPORT_W + 200) return;
  ctx.fillStyle = "#1a0a08";
  ctx.fillRect(x - 180, GROUND_Y - 220, 320, 220);
  ctx.fillStyle = "#2a0a08";
  ctx.beginPath();
  ctx.moveTo(x - 200, GROUND_Y - 220);
  ctx.lineTo(x - 20, GROUND_Y - 320);
  ctx.lineTo(x + 160, GROUND_Y - 220);
  ctx.fill();
  ctx.fillStyle = "#3a1a10";
  ctx.fillRect(x - 140, GROUND_Y - 190, 240, 60);
  ctx.strokeStyle = "#cc6622";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 140, GROUND_Y - 190, 240, 60);
  ctx.fillStyle = "#ffaa44";
  ctx.font = "bold 13px monospace";
  ctx.textAlign = "center";
  ctx.fillText("⚔ ADVENTURERS GUILD ⚔", x - 20, GROUND_Y - 165);
  ctx.fillStyle = "#cc8833";
  ctx.font = "9px monospace";
  ctx.fillText("Quest Board • Est. Unknown", x - 20, GROUND_Y - 150);
  ctx.fillStyle = "#0a0500";
  ctx.fillRect(x - 30, GROUND_Y - 90, 50, 90);
  ctx.strokeStyle = "#8B4513";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 30, GROUND_Y - 90, 50, 90);
  for (let i = 0; i < 3; i++) {
    ctx.fillStyle = "#ffcc4411";
    ctx.fillRect(x - 160 + i * 100, GROUND_Y - 180, 50, 40);
    ctx.strokeStyle = "#8B4513";
    ctx.lineWidth = 1;
    ctx.strokeRect(x - 160 + i * 100, GROUND_Y - 180, 50, 40);
  }
  for (let i = 0; i < 3; i++) {
    const lx = x - 160 + i * 150;
    ctx.fillStyle = "#ffaa33";
    ctx.beginPath();
    ctx.arc(lx, GROUND_Y - 230, 7, 0, Math.PI * 2);
    ctx.fill();
    const lg = ctx.createRadialGradient(
      lx,
      GROUND_Y - 230,
      1,
      lx,
      GROUND_Y - 230,
      30,
    );
    lg.addColorStop(0, "rgba(255,160,30,0.3)");
    lg.addColorStop(1, "rgba(255,160,30,0)");
    ctx.fillStyle = lg;
    ctx.beginPath();
    ctx.arc(lx, GROUND_Y - 230, 30, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function drawBoss(ctx, bossX, bossHP, maxHP, time, shake) {
  const x = bossX + (shake ? (Math.random() - 0.5) * 8 : 0);
  const y = GROUND_Y - 200;
  const hpRatio = bossHP / maxHP;
  const bobY = Math.sin(time * 0.04) * 5;

  ctx.fillStyle = "rgba(0,0,0,0.4)";
  ctx.beginPath();
  ctx.ellipse(x + 50, GROUND_Y + 2, 55, 12, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#1a1a2a";
  ctx.fillRect(x, y + 40 + bobY, 100, 110);
  ctx.fillStyle = "#0a0a18";
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 50 + bobY);
  ctx.lineTo(x + 30, y + 40 + bobY);
  ctx.lineTo(x + 20, y + 110 + bobY);
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(x + 50, y + 50 + bobY);
  ctx.lineTo(x + 70, y + 40 + bobY);
  ctx.lineTo(x + 80, y + 110 + bobY);
  ctx.fill();
  ctx.fillStyle = "#cc0000";
  ctx.beginPath();
  ctx.moveTo(x + 44, y + 52 + bobY);
  ctx.lineTo(x + 56, y + 52 + bobY);
  ctx.lineTo(x + 52, y + 120 + bobY);
  ctx.lineTo(x + 44, y + 120 + bobY);
  ctx.fill();
  const bcSwing = Math.sin(time * 0.06) * 20;
  ctx.fillStyle = "#8B4513";
  ctx.fillRect(x - 30 + bcSwing, y + 100 + bobY, 35, 25);
  ctx.strokeStyle = "#5a2d0a";
  ctx.lineWidth = 2;
  ctx.strokeRect(x - 30 + bcSwing, y + 100 + bobY, 35, 25);
  ctx.fillStyle = "#ffcc44";
  ctx.fillRect(x - 18 + bcSwing, y + 96 + bobY, 12, 6);
  ctx.fillStyle = "#cc9944";
  ctx.font = "6px monospace";
  ctx.textAlign = "center";
  ctx.fillText("REJECT", x - 13 + bcSwing, y + 116 + bobY);
  ctx.fillStyle = "#1a1a2a";
  ctx.fillRect(x - 25 + bcSwing * 0.5, y + 60 + bobY, 25, 45);
  ctx.fillRect(x + 100, y + 60 + bobY, 25, 45);
  ctx.fillStyle = "#c87941";
  ctx.beginPath();
  ctx.arc(x - 12 + bcSwing * 0.5, y + 107 + bobY, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(x + 112, y + 107 + bobY, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#c87941";
  ctx.fillRect(x + 38, y + 28 + bobY, 24, 16);
  ctx.fillStyle = "#dda060";
  ctx.fillRect(x + 18, y + bobY, 64, 52);
  ctx.fillStyle = "#111";
  ctx.fillRect(x + 15, y - 8 + bobY, 70, 18);
  ctx.fillRect(x + 15, y - 2 + bobY, 8, 20);
  ctx.fillRect(x + 77, y - 2 + bobY, 8, 14);
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(x + 26, y + 14 + bobY, 16, 10);
  ctx.fillRect(x + 58, y + 14 + bobY, 16, 10);
  ctx.fillStyle = "#880000";
  ctx.fillRect(x + 30, y + 16 + bobY, 8, 6);
  ctx.fillRect(x + 62, y + 16 + bobY, 8, 6);
  ctx.fillStyle = "#111";
  ctx.fillRect(x + 24, y + 10 + bobY, 20, 4);
  ctx.fillRect(x + 56, y + 10 + bobY, 20, 4);
  ctx.fillStyle = "#330000";
  ctx.fillRect(x + 28, y + 34 + bobY, 44, 10);
  ctx.fillStyle = "#ffffff";
  for (let i = 0; i < 5; i++) ctx.fillRect(x + 30 + i * 8, y + 34 + bobY, 6, 8);
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 23, y + 12 + bobY, 22, 14);
  ctx.strokeRect(x + 55, y + 12 + bobY, 22, 14);
  ctx.beginPath();
  ctx.moveTo(x + 45, y + 19 + bobY);
  ctx.lineTo(x + 55, y + 19 + bobY);
  ctx.stroke();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x + 58, y + 80 + bobY, 38, 20);
  ctx.fillStyle = "#cc0000";
  ctx.font = "bold 6px monospace";
  ctx.textAlign = "left";
  ctx.fillText("THE", x + 62, y + 88 + bobY);
  ctx.fillText("JOB MKT", x + 60, y + 96 + bobY);

  const bw = 320,
    bh = 16;
  const bx = VIEWPORT_W / 2 - bw / 2,
    by = VIEWPORT_H - 52;
  ctx.save();
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ff3300";
  ctx.shadowColor = "#ff0000";
  ctx.shadowBlur = 16;
  ctx.fillText("💼 THE JOB MARKET", VIEWPORT_W / 2, by - 14);
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "#ff660088";
  ctx.shadowBlur = 0;
  ctx.fillText("LV 99  ✦  FINAL BOSS", VIEWPORT_W / 2, by - 1);
  ctx.restore();
  ctx.fillStyle = "rgba(0,0,0,0.8)";
  ctx.fillRect(bx - 6, by - 2, bw + 12, bh + 8);
  ctx.fillStyle = "#330000";
  ctx.fillRect(bx, by, bw, bh);
  ctx.fillStyle =
    hpRatio > 0.5 ? "#cc3300" : hpRatio > 0.2 ? "#ff6600" : "#ff0000";
  ctx.fillRect(bx, by, bw * hpRatio, bh);
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.fillRect(bx, by, bw * hpRatio, bh / 2);
  ctx.strokeStyle = "#ff440088";
  ctx.lineWidth = 1;
  ctx.strokeRect(bx, by, bw, bh);
  const aura = ctx.createRadialGradient(
    x + 50,
    y + 60,
    10,
    x + 50,
    y + 60,
    120,
  );
  aura.addColorStop(0, "rgba(200,0,0,0.12)");
  aura.addColorStop(1, "rgba(200,0,0,0)");
  ctx.fillStyle = aura;
  ctx.fillRect(x - 70, y - 40, 240, 280);
}

export function drawSlimeArmy(ctx, time, armyProgress) {
  const colors = SKILLS.map((s) => s.slimeColor);
  const count = Math.floor(armyProgress * colors.length * 3);
  for (let i = 0; i < count; i++) {
    const col = colors[i % colors.length];
    const baseX = 80 + i * 45;
    const marchX = baseX - (1 - armyProgress) * 600;
    const size = 16 + (i % 3) * 4;
    drawSlime(ctx, marchX, GROUND_Y - size, col, size, time * 0.06 + i * 0.7);
  }
}

export function drawSlimeThrone(ctx, time, buildProgress) {
  const cx = VIEWPORT_W / 2;
  const colors = SKILLS.map((s) => s.slimeColor);
  if (buildProgress > 0.1)
    for (let i = 0; i < 7; i++)
      drawSlime(
        ctx,
        cx - 138 + i * 46,
        GROUND_Y - 18,
        colors[i % colors.length],
        22,
        time * 0.04 + i,
      );
  if (buildProgress > 0.3)
    for (let i = 0; i < 5; i++)
      drawSlime(
        ctx,
        cx - 92 + i * 46,
        GROUND_Y - 52,
        colors[(i + 2) % colors.length],
        20,
        time * 0.04 + i * 0.9,
      );
  if (buildProgress > 0.5)
    for (let i = 0; i < 3; i++)
      drawSlime(
        ctx,
        cx - 46 + i * 46,
        GROUND_Y - 84,
        colors[(i + 4) % colors.length],
        20,
        time * 0.04 + i * 1.1,
      );
  if (buildProgress > 0.65)
    drawSlime(ctx, cx, GROUND_Y - 116, "#00ffcc", 26, time * 0.04);
  if (buildProgress > 0.75) {
    drawSlime(ctx, cx - 60, GROUND_Y - 96, "#61dafb", 18, time * 0.04 + 1);
    drawSlime(ctx, cx + 60, GROUND_Y - 96, "#ff7055", 18, time * 0.04 + 2);
  }
  if (buildProgress > 0.85)
    for (let j = 0; j < 4; j++) {
      drawSlime(
        ctx,
        cx - 70 + j * 46,
        GROUND_Y - 140,
        colors[j],
        16,
        time * 0.04 + j * 0.8,
      );
      drawSlime(
        ctx,
        cx - 70 + j * 46,
        GROUND_Y - 168,
        colors[(j + 3) % colors.length],
        14,
        time * 0.04 + j * 0.9,
      );
    }
  if (buildProgress > 0.95) {
    drawSlime(ctx, cx, GROUND_Y - 186, "#ffe033", 14, time * 0.05);
    drawSlime(ctx, cx - 36, GROUND_Y - 178, "#00ffcc", 11, time * 0.05 + 1);
    drawSlime(ctx, cx + 36, GROUND_Y - 178, "#ff6b3d", 11, time * 0.05 + 2);
  }
}
