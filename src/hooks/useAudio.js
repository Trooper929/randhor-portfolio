import { useRef } from "react";

export default function useAudio() {
  const audioCtx = useRef(null);
  const bossOscRef = useRef(null);
  const bossGainRef = useRef(null);

  const getCtx = () => {
    if (!audioCtx.current)
      audioCtx.current = new (
        window.AudioContext || window.webkitAudioContext
      )();
    if (audioCtx.current.state === "suspended") audioCtx.current.resume();
    return audioCtx.current;
  };

  const beep = (freq, duration, type = "square", vol = 0.08, delay = 0) => {
    try {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(vol, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + delay + duration,
      );
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {}
  };

  const playFootstep = () => {
    try {
      const ctx = getCtx();
      const buf = ctx.createBuffer(1, ctx.sampleRate * 0.04, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < data.length; i++)
        data[i] = (Math.random() * 2 - 1) * (1 - i / data.length) * 0.15;
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const gain = ctx.createGain();
      gain.gain.value = 0.3;
      src.connect(gain);
      gain.connect(ctx.destination);
      src.start();
    } catch (e) {}
  };

  const playSkillUnlock = (index) => {
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047, 1175, 1319, 1568];
    const freq = notes[index % notes.length];
    beep(freq, 0.08, "square", 0.1);
    beep(freq * 1.5, 0.12, "square", 0.06, 0.08);
    beep(freq * 2, 0.18, "sine", 0.08, 0.16);
  };

  const playBossMusic = () => {
    try {
      const ctx = getCtx();
      stopBossMusic();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.value = 55;
      gain.gain.value = 0.04;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      bossOscRef.current = osc;
      bossGainRef.current = gain;
      const pulse = () => {
        if (!bossGainRef.current) return;
        bossGainRef.current.gain.setValueAtTime(0.06, ctx.currentTime);
        bossGainRef.current.gain.linearRampToValueAtTime(
          0.02,
          ctx.currentTime + 0.5,
        );
        setTimeout(pulse, 500);
      };
      pulse();
    } catch (e) {}
  };

  const stopBossMusic = () => {
    try {
      bossOscRef.current?.stop();
    } catch (e) {}
    bossOscRef.current = null;
    bossGainRef.current = null;
  };

  const playVictoryFanfare = () => {
    const melody = [523, 659, 784, 1047, 784, 1047, 1319];
    melody.forEach((f, i) => beep(f, 0.15, "square", 0.1, i * 0.12));
  };

  const playVibeCodingJingle = () => {
    [440, 554, 659, 880, 659, 554, 440].forEach((f, i) =>
      beep(f, 0.1, "sine", 0.08, i * 0.09),
    );
  };

  const playWarning = () => {
    beep(110, 0.4, "sawtooth", 0.12);
    beep(90, 0.5, "sawtooth", 0.1, 0.4);
  };

  return {
    playFootstep,
    playSkillUnlock,
    playBossMusic,
    stopBossMusic,
    playVictoryFanfare,
    playVibeCodingJingle,
    playWarning,
  };
}
