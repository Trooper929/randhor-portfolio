export const SKILLS = [
  { name: "HTML", level: 73, slimeColor: "#ff6b3d" },
  { name: "CSS", level: 68, slimeColor: "#4d79ff" },
  { name: "JavaScript", level: 63, slimeColor: "#ffe033" },
  { name: "React", level: 68, slimeColor: "#61dafb" },
  { name: "Node/Express", level: 63, slimeColor: "#7fcf78" },
  { name: "MongoDB", level: 58, slimeColor: "#5de04a" },
  { name: "Git/GitHub", level: 68, slimeColor: "#ff7055" },
  { name: "AI Prompting", level: 78, slimeColor: "#ff88cc" },
  { name: "Charisma", level: 99, slimeColor: "#ffdd00" },
  { name: "Adaptability", level: 99, slimeColor: "#ffffff" },
  { name: "Communication", level: 99, slimeColor: "#cc88ff" },
];

export function getRank(level) {
  if (level >= 90) return { label: "S Rank", stars: "★★★★★", color: "#ffdd00" };
  if (level >= 75) return { label: "A Rank", stars: "★★★★", color: "#00ffcc" };
  if (level >= 60) return { label: "B Rank", stars: "★★★", color: "#4d79ff" };
  if (level >= 45) return { label: "C Rank", stars: "★★", color: "#ff7055" };
  return { label: "D Rank", stars: "★", color: "#888888" };
}

export const SKILL_ZONES = SKILLS.map((s, i) => ({
  ...s,
  worldX: 700 + i * 360,
}));
