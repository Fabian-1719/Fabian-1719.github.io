/* Pixel world · Fabian Aragón Arce
   An indexed-colour landscape drawn pixel by pixel. Every pixel stores a palette
   role; the time of day remaps the palette and cycle groups rotate to animate
   water, falls and fire (classic colour cycling). */
  /* ---------------- Palette roles: [day, golden, dusk, night] ---------------- */
  const ROLES: Record<string, string[]> = {
    farLit:   ["#a9c2dc", "#dcae96", "#9a77a4", "#2e3760"],
    farMid:   ["#86a2c4", "#bf9088", "#76598a", "#242c50"],
    farHaze:  ["#c3d8ea", "#efc8a6", "#b28296", "#323d68"],
    farSnow:  ["#eef6fc", "#ffe6c8", "#e2b4c0", "#55628e"],
    hillLit:  ["#6aa66c", "#9aa456", "#626076", "#1f2f40"],
    hillMid:  ["#4a8a5a", "#768448", "#4a4a62", "#182636"],
    hillDark: ["#336a4a", "#55603c", "#373750", "#111c2a"],
    leafHi:   ["#9ad86a", "#cfc85c", "#868060", "#2e5040"],
    leafMid:  ["#58a850", "#89a040", "#58604c", "#21402f"],
    leafLo:   ["#367e40", "#5e7232", "#3c463c", "#172f25"],
    leafOut:  ["#1f4c2c", "#37441f", "#262c2a", "#0b1a15"],
    pineHi:   ["#5f9e6a", "#839552", "#5a5e5a", "#1f3c34"],
    pine:     ["#3c7a52", "#5d6e3c", "#424a46", "#16302a"],
    trunk:    ["#71502e", "#744a28", "#4e3a34", "#251b1e"],
    trunkDk:  ["#4c3421", "#4f311d", "#36282e", "#171013"],
    grassHi:  ["#a4e260", "#d6cc5a", "#8e8866", "#2e4838"],
    grass:    ["#62ba4c", "#98a842", "#606c4e", "#203c2e"],
    soil:     ["#8e6742", "#8f5d36", "#604742", "#2b1f24"],
    soilDk:   ["#5f4531", "#603d25", "#44323c", "#1d151a"],
    path:     ["#dcbb7e", "#e3aa6c", "#9c7e7e", "#3c3438"],
    pathDk:   ["#b9935c", "#c48a4c", "#7c6068", "#2c262c"],
    rockHi:   ["#bdb5aa", "#d6ad8c", "#8e7e8e", "#3c405a"],
    rock:     ["#8c8682", "#a5806c", "#6a5c72", "#2b3046"],
    rockDk:   ["#5f5b5c", "#71564a", "#484252", "#1d2032"],
    stone:    ["#cdc4b2", "#e4c49a", "#9e8e9c", "#4c4c66"],
    stoneDk:  ["#9c9486", "#b49070", "#76687c", "#34364c"],
    glowWall: ["#cdc4b2", "#e4c49a", "#b98e7a", "#7a6450"],
    roof:     ["#b8553c", "#c4632f", "#8c4452", "#3c2030"],
    roofDk:   ["#813628", "#8c3f1d", "#602d3c", "#27151f"],
    wood:     ["#a3723f", "#ac6a30", "#7c5242", "#3c2824"],
    woodDk:   ["#6e4a2a", "#744420", "#553834", "#271a1a"],
    glass:    ["#2c3c54", "#3c3a4a", "#f0b25e", "#ffd27a"],
    lamp:     ["#5a5a5a", "#6a5a4a", "#e0a050", "#ffe08a"],
    grassGlowHi: ["#a4e260", "#d6cc5a", "#9a8866", "#6c5838"],
    grassGlow:   ["#62ba4c", "#98a842", "#6c6a4e", "#4a3a2a"],
    soilGlow:    ["#8e6742", "#8f5d36", "#6a4a40", "#3e2a22"],
    flowerA:  ["#ff7096", "#ff8a7a", "#c06080", "#3c2838"],
    flowerB:  ["#ffe066", "#ffd25a", "#c0a060", "#3a3a2c"],
    foam:     ["#eaf6ff", "#fff1dc", "#f0c4c4", "#6c7ca8"],
    tent:     ["#ece3c8", "#f2d2a2", "#b49ea8", "#a07a5c"],
    tentDk:   ["#c4b892", "#d0a878", "#8c7888", "#6e5040"],
    stripe:   ["#c0392b", "#c84a26", "#8c3040", "#6a2a26"],
    blade:    ["#eaf2ff", "#ffeccc", "#c8bedc", "#b4c0ec"],
    hilt:     ["#3b5bbf", "#4a5aa8", "#3c3c84", "#2a3a8a"],
    gem:      ["#f5c542", "#ffd060", "#e0a050", "#f5c542"],
    cloud:    ["#ffffff", "#ffe2c4", "#eaa4ac", "#2c3664"],
    cloudMid: ["#e6f0fa", "#f8d0b2", "#d68e9e", "#283262"],
    cloudSh:  ["#c4d6ea", "#e0a890", "#a8687e", "#1d2548"],
    // cycle groups (4 water, 4 falls, 3 fire)
    water0: ["#3e90d6", "#4f80b0", "#4b508a", "#152046"],
    water1: ["#58a9e6", "#7b9ac0", "#6b5b9a", "#1d2b58"],
    water2: ["#7fc5f2", "#eab58a", "#d27c7c", "#2e4076"],
    water3: ["#3079c2", "#40699a", "#3b4074", "#101939"],
    fall0:  ["#d2eafc", "#ffe6cc", "#e8bcc8", "#4c5c8c"],
    fall1:  ["#a8d6f4", "#e0c0b0", "#b890aa", "#34426e"],
    fall2:  ["#eef8ff", "#fff4e4", "#f6d6dc", "#6676a6"],
    fall3:  ["#88c2ec", "#c8a8a0", "#9a7896", "#2a3660"],
    fire0:  ["#6c5c52", "#e07a30", "#ff7a20", "#ff7a20"],
    fire1:  ["#8c6c52", "#ffb040", "#ffd060", "#ffd868"],
    fire2:  ["#5c4c46", "#c04a20", "#e03a10", "#e8441a"]
  };
  const SKY = [ // top → horizon: [morning, day, golden, dusk, night]
    ["#5f86c8", "#3a7bd5", "#4a6fb5", "#36387a", "#070b22"],
    ["#8eacd8", "#5c9be6", "#7f8fc8", "#68488f", "#0d1433"],
    ["#c4cfe2", "#8dc3f0", "#e0a3a0", "#c25b7a", "#151e46"],
    ["#f1d8b6", "#c0e2f7", "#f6c48a", "#f08a5d", "#1e2856"],
    ["#ffe0aa", "#e4f3fb", "#ffd9a0", "#ffb36b", "#2a3462"]
  ];

  const names = Object.keys(ROLES);
  const R: Record<string, number> = {}; names.forEach((n, i) => { R[n] = i + 1; }); // 0 = transparent
  const N = names.length + 1;
  const hex = (h: string): number[] => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
  // morning is derived: day warmed toward golden, so every role gets a soft early light
  const KEYS = names.map((n) => {
    const k = ROLES[n].map(hex);
    const m = k[0].map((v, i) => Math.round(v * 0.62 + k[1][i] * 0.38));
    return [m, ...k];
  });
  const SKYKEYS = SKY.map((b) => b.map(hex));

  /* ---------------- Helpers ---------------- */
  let seed = 1719;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  const hash = (i: number): number => { let x = Math.sin(i * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const noise = (x: number): number => { const i = Math.floor(x), f = x - i, u = f * f * (3 - 2 * f); return hash(i) * (1 - u) + hash(i + 1) * u; };
  const fbm = (x: number): number => noise(x) * 0.55 + noise(x * 2.03 + 17) * 0.28 + noise(x * 4.1 + 41) * 0.17;
  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
  const dith = (x: number, y: number, t: number): boolean => t * 16 > BAYER[(y & 3) * 4 + (x & 3)] + 0.5;
  const clamp = (v: number, a = 0, b = 1): number => Math.min(b, Math.max(a, v));

  /* ---------------- World layers ---------------- */
  const WW = 1200, LH = 200;
  const far = new Uint8Array(WW * LH), mid = new Uint8Array(WW * LH), main = new Uint8Array(WW * LH);
  const put = (buf: Uint8Array, x: number, y: number, c: number): void => { if (x >= 0 && x < WW && y >= 0 && y < LH) buf[y * WW + x] = c; };
  const get = (buf: Uint8Array, x: number, y: number): number => (x >= 0 && x < WW && y >= 0 && y < LH ? buf[y * WW + x] : 0);

  // Far range with snow, faceted light from the left, hazed base
  const PK: [number, number, number][] = [];
  for (let px = -40; px < WW + 60; px += 46 + Math.floor(rnd() * 90)) PK.push([px, 26 + rnd() * 52, 48 + rnd() * 96]);
  const farTop = (x: number): number => {
    let h = 0;
    for (const [c, a, w] of PK) { const d = Math.abs(x - c) / w; if (d < 1) h = Math.max(h, a * Math.pow(1 - d, 1.25)); }
    return Math.round(122 - h - fbm(x * 0.05) * 6);
  };
  const FT = new Int16Array(WW);
  for (let x = 0; x < WW; x++) FT[x] = farTop(x);
  const peaks = [];
  for (let x = 0; x < WW; x++) {
    let isPeak = true;
    for (let k = -14; k <= 14 && isPeak; k++) if (k && FT[Math.min(WW - 1, Math.max(0, x + k))] < FT[x]) isPeak = false;
    if (isPeak && (!peaks.length || x - peaks[peaks.length - 1][0] > 6)) peaks.push([x, FT[x]]);
  }
  for (let x = 0; x < WW; x++) {
    const t = FT[x];
    let pk = peaks[0];
    for (const q of peaks) if (Math.abs(q[0] - x) < Math.abs(pk[0] - x)) pk = q;
    for (let y = t; y < LH; y++) {
      const d = y - t, k = d / (LH - t);
      // the ridge line between the sunlit and shaded face slants down and away from the peak
      const split = pk[0] + (y - pk[1]) * 0.42 + (noise(y * 0.15 + pk[0]) - 0.5) * 6;
      const litFace = x < split;
      let c = litFace ? R.farLit : R.farMid;
      const gully = noise(x * 0.45 + y * 0.09) > 0.74 && d > 3;
      if (gully) c = litFace ? R.farMid : (dith(x, y, 0.3) ? R.farLit : R.farMid);
      if (y < 72 + noise(x * 0.21) * 7 + (litFace ? 0 : -3)) c = litFace ? R.farSnow : (hash(x * 3.1 + y * 7.7) > 0.12 ? R.farLit : R.farSnow);
      else if (dith(x, y, k * 1.7 - 0.35)) c = R.farHaze;
      put(far, x, y, c);
    }
  }
  // Mid hills: rolling, with tree-top bumps and dithered shading
  const midTop = (x: number): number => Math.round(138 - fbm(x * 0.011 + 50) * 38 - Math.abs(Math.sin(x * 0.55)) * 2.5 * noise(x * 0.2));
  for (let x = 0; x < WW; x++) {
    const t = midTop(x);
    for (let y = t; y < LH; y++) {
      const d = y - t;
      let c = R.hillMid;
      if (d < 2) c = midTop(x - 2) > t ? R.hillLit : R.hillMid;
      else if (dith(x, y, (d - 4) / 30)) c = R.hillDark;
      put(mid, x, y, c);
    }
  }

  /* Main layer: one continuous walk. Key places (logical x):
     tower 205 · cliff 250 · waterfall 250-258 · lake 262-430 · forest 430-640 ·
     sword 545 · river + bridge 640-720 · village 720-900 · hill + camp 900-1200 */
  const ground = (x: number): number => {
    if (x < 250) return Math.round(112 + noise(x * 0.08) * 3);
    if (x < 430) return 164;
    if (x < 640) return Math.round(150 + Math.sin(x * 0.02) * 3 + noise(x * 0.1) * 2);
    if (x < 720) return 160;
    if (x < 900) return Math.round(148 + noise(x * 0.06) * 2);
    return Math.round(148 - 30 * Math.sin(Math.PI * clamp((x - 900) / 330)) + noise(x * 0.08) * 2);
  };
  const G = new Int16Array(WW);
  for (let x = 0; x < WW; x++) G[x] = ground(x);

  // Earth
  for (let x = 0; x < WW; x++) {
    const t = G[x];
    const plateau = x < 250;
    for (let y = t; y < LH; y++) {
      const d = y - t;
      let c;
      const strata = noise(y * 0.35 + noise(x * 0.04) * 3);
      if (d === 0) c = R.grassHi;
      else if (d < 3 + (noise(x * 0.4) > 0.6 ? 1 : 0)) c = dith(x, y, 0.25) ? R.grassHi : R.grass;
      else if (d < 5 && dith(x, y, 0.5)) c = R.grass;
      else if (plateau && d > 5) {
        c = strata > 0.62 ? R.rockHi : strata > 0.3 ? R.rock : R.rockDk;
        if ((y + Math.round(noise(x * 0.1) * 4)) % 7 === 0) c = R.rockDk;
      } else c = dith(x, y, (d - 3) / 18 + (strata - 0.5) * 0.6) ? R.soilDk : R.soil;
      if (!plateau && d > 5 && hash(x * 7 + y * 13) > 0.985) c = R.rock;
      put(main, x, y, c);
    }
  }
  for (let i = 0; i < 300; i++) { // buried stones: varied size, lit top, dark base
    const x = Math.floor(rnd() * WW); if (x > 255 && x < 432) continue;
    const y = G[x] + 6 + Math.floor(rnd() * rnd() * 40), w = 1 + Math.floor(rnd() * rnd() * 5);
    const lit = rnd() > 0.4 ? R.rockHi : R.rock;
    for (let k = 0; k < w; k++) {
      put(main, x + k, y, k === w - 1 && w > 2 ? R.rock : lit);
      if (w > 2) put(main, x + k, y + 1, k === 0 ? R.rock : R.rockDk);
    }
  }
  for (let i = 0; i < 40; i++) { // roots under the forest and the village
    let x = 430 + Math.floor(rnd() * 470), y = G[x] + 4;
    for (let k = 0; k < 6 + rnd() * 8; k++) { put(main, x, y, R.trunkDk); x += rnd() > 0.5 ? 1 : 0; y += 1; }
  }
  for (let x = 0; x < WW; x++) { // grass tufts break the top line
    if (x > 255 && x < 432) continue;
    const h = hash(x * 3.7);
    if (h > 0.7) put(main, x, G[x] - 1, h > 0.9 ? R.grassHi : R.grass);
    if (h > 0.94) put(main, x, G[x] - 2, R.grassHi);
  }
  // Cliff face below the tower plateau
  for (let x = 236; x < 262; x++) {
    const edge = 250 + Math.round(noise(x) * 2);
    for (let y = 112; y < 168; y++) {
      if (x < edge - (y - 112) * 0.08) continue;
      if (x > edge + 4 + (y - 112) * 0.2) continue;
      const n = noise(x * 0.5 + y * 0.31);
      put(main, x, y, n > 0.62 ? R.rockHi : n > 0.32 ? R.rock : R.rockDk);
    }
  }
  // Lake with cycling ripples and a foam lip
  for (let x = 258; x < 432; x++) {
    for (let y = 158; y < LH; y++) {
      if (x < 262 && y < 160) continue;
      const band = ((x >> 2) + (y * 3) + ((y & 1) ? 2 : 0)) & 3;
      let c = R.water0 + band;
      if (y === 158 && hash(x) > 0.55) c = R.foam;
      if (y > 175 && dith(x, y, (y - 175) / 25)) c = R.water3;
      put(main, x, y, c);
    }
  }
  // Waterfall over the cliff edge (cycles downward)
  for (let y = 108; y < 160; y++) {
    for (let x = 249; x < 258; x++) {
      const k = ((y >> 1) + ((x & 1) ? 2 : 0) + (x === 249 || x === 257 ? 1 : 0)) & 3;
      put(main, x, y, R.fall0 + k);
    }
  }
  for (let i = 0; i < 40; i++) put(main, 246 + Math.floor(rnd() * 16), 155 + Math.floor(rnd() * 6), rnd() > 0.4 ? R.foam : R.fall2);
  // River under the bridge
  for (let x = 652; x < 708; x++) for (let y = 156; y < LH; y++) {
    if (y < 158 && (x < 655 || x > 704)) continue;
    put(main, x, y, R.water0 + (((x >> 1) + y * 2) & 3));
  }
  // Paths through the village and up the hill
  for (let x = 720; x < 1150; x++) {
    const t = G[x];
    for (let d = 1; d < 4; d++) {
      const edgeFade = d === 3 ? dith(x, t + d, 0.5) : true;
      if (edgeFade) put(main, x, t + d, d === 1 ? R.path : R.pathDk);
    }
  }

  /* ---------------- Sprites drawn into the main layer ---------------- */
  type PixelFn = (x: number, y: number, lx: number, ly: number, d: number) => void;
  function disc(cx: number, cy: number, r: number, fn: PixelFn) {
    for (let y = -r; y <= r; y++) for (let x = -r; x <= r; x++) {
      const d = Math.hypot(x + 0.3, y + 0.3) / r;
      if (d <= 1) fn(cx + x, cy + y, x, y, d);
    }
  }
  function broadleaf(x0: number, base: number, h: number, r: number) {
    for (let y = base - h; y <= base; y++) { put(main, x0, y, R.trunk); put(main, x0 + 1, y, R.trunkDk); }
    put(main, x0 - 1, base, R.trunkDk); put(main, x0 + 2, base, R.trunkDk);
    const cy = base - h - r * 0.4;
    const blobs = [[0, 0, r], [-r * 0.7, r * 0.35, r * 0.7], [r * 0.75, r * 0.3, r * 0.72], [-r * 0.2, -r * 0.6, r * 0.65], [r * 0.4, -r * 0.4, r * 0.55]];
    const mask = new Map<string, number>();
    for (const [bx, by, br] of blobs) disc(Math.round(x0 + bx), Math.round(cy + by), Math.round(br), (x, y, lx, ly, d) => {
      const light = (-lx - ly) / br - d * 0.6 + noise(x * 0.9 + y * 0.7) * 0.5;
      const prev = mask.get(x + "," + y);
      if (prev === undefined || light > prev) mask.set(x + "," + y, light);
    });
    for (const [k, light] of mask) {
      const [x, y] = k.split(",").map(Number);
      let c = light > 0.45 ? R.leafHi : light > -0.05 ? R.leafMid : R.leafLo;
      if (c === R.leafMid && dith(x, y, (light + 0.05) * 2)) c = R.leafHi;
      put(main, x, y, c);
    }
    for (const [k] of mask) { // outline where the canopy meets something else
      const [x, y] = k.split(",").map(Number);
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
        if (!mask.has((x + dx) + "," + (y + dy))) { if (dy >= 0 || dx > 0) put(main, x, y, R.leafOut); break; }
      }
    }
  }
  function pine(x0: number, base: number, h: number) {
    for (let y = base - 4; y <= base; y++) { put(main, x0, y, R.trunk); put(main, x0 + 1, y, R.trunkDk); }
    const tiers = Math.max(3, Math.round(h / 6));
    for (let t = 0; t < tiers; t++) {
      const tb = base - 3 - Math.round(t * h / tiers * 0.78);
      const th = Math.round(h / tiers) + 3;
      const wBot = Math.round((tiers - t) * 2.1 + 2);
      for (let i = 0; i < th; i++) {
        const y = tb - i, half = Math.max(0, Math.round(wBot * (1 - i / th)));
        for (let x = -half; x <= half + 1; x++) {
          let c = R.pine;
          if (x <= -half + 1 || (x < 0 && dith(x0 + x, y, 0.35))) c = R.pineHi;
          if (x >= half) c = R.leafOut;
          if (i === 0) c = x > 0 ? R.leafOut : (x === -half ? R.pine : R.leafLo);
          put(main, x0 + x, y, c);
        }
      }
    }
    put(main, x0, base - 4 - h, R.pineHi);
  }
  function tower(x0: number) {
    const base = G[x0 + 9], w = 18, h = 54;
    for (let y = base - h; y <= base; y++) for (let x = 0; x < w; x++) {
      const row = base - y;
      let c = R.stone;
      if (row % 5 === 0) c = R.stoneDk;
      else if ((x + (Math.floor(row / 5) % 2) * 3) % 7 === 0) c = R.stoneDk;
      if (x === 0 || x === w - 1) c = R.stoneDk;
      if (x > w - 5 && dith(x, y, 0.5)) c = R.stoneDk;
      put(main, x0 + x, y, c);
    }
    // windows with a warm glow ring that only shows at night
    for (const [wx, wy] of [[7, 14], [7, 30], [7, 44]]) {
      for (let y = -1; y <= 4; y++) for (let x = -1; x <= 3; x++) put(main, x0 + wx + x, base - h + wy + y, R.glowWall);
      for (let y = 0; y < 4; y++) for (let x = 0; x < 2; x++) put(main, x0 + wx + x, base - h + wy + y, R.glass);
    }
    put(main, x0 + 8, base, R.woodDk); put(main, x0 + 9, base, R.woodDk);
    for (let y = 1; y < 6; y++) { put(main, x0 + 8, base - y, R.wood); put(main, x0 + 9, base - y, R.woodDk); }
    // conical roof with a small spire
    for (let i = 0; i < 16; i++) {
      const y = base - h - 1 - i, half = Math.round(11 - i * 0.68);
      for (let x = -half; x <= half; x++) put(main, x0 + 9 + x, y, x < 0 ? R.roof : R.roofDk);
    }
    for (let y = 0; y < 5; y++) put(main, x0 + 9, base - h - 17 - y, R.woodDk);
    put(main, x0 + 10, base - h - 21, R.gem);
  }
  function house(x0: number, wall: "wood" | "stone") {
    const base = G[x0 + 11], w = 22, h = 13;
    for (let y = base - h; y <= base; y++) for (let x = 0; x < w; x++) {
      let c = wall === "wood" ? ((x % 4 === 0) ? R.woodDk : R.wood) : ((base - y) % 4 === 0 ? R.stoneDk : R.stone);
      if (x === w - 1) c = wall === "wood" ? R.woodDk : R.stoneDk;
      put(main, x0 + x, y, c);
    }
    for (const wx of [3, 15]) {
      for (let y = -1; y <= 3; y++) for (let x = -1; x <= 3; x++) put(main, x0 + wx + x, base - 9 + y, R.glowWall);
      for (let y = 0; y < 3; y++) for (let x = 0; x < 3; x++) put(main, x0 + wx + x, base - 9 + y, R.glass);
    }
    for (let y = 0; y < 7; y++) for (let x = 9; x < 13; x++) put(main, x0 + x, base - y, x === 12 ? R.woodDk : R.wood);
    for (let i = 0; i < 10; i++) {
      const y = base - h - 1 - i;
      for (let x = -2 + i; x < w + 2 - i; x++) put(main, x0 + x, y, (x - i) % 3 === 0 ? R.roofDk : R.roof);
    }
    for (let y = 0; y < 6; y++) { put(main, x0 + 16, base - h - 4 - y, R.stoneDk); put(main, x0 + 17, base - h - 4 - y, R.stone); }
  }
  function lampPost(x0: number) {
    const base = G[x0];
    for (let y = 1; y < 12; y++) put(main, x0, base - y, R.woodDk);
    for (let y = -1; y <= 1; y++) for (let x = -1; x <= 1; x++) put(main, x0 + x, base - 13 + y, R.lamp);
    put(main, x0, base - 15, R.woodDk);
  }
  function bridge() {
    for (let x = 646; x < 714; x++) {
      const sag = Math.round(Math.sin(Math.PI * (x - 646) / 68) * 2);
      put(main, x, 150 + sag, R.wood); put(main, x, 151 + sag, R.woodDk);
      if ((x - 646) % 7 === 0) for (let y = 143; y < 151; y++) put(main, x, y + sag, R.woodDk);
      put(main, x, 144 + sag, R.wood);
    }
  }
  function tentAndFire(tx: number, fx: number) {
    const base = G[tx + 10];
    for (let i = 0; i < 14; i++) {
      const y = base - i, half = Math.round(11 - i * 0.78);
      for (let x = -half; x <= half; x++) {
        let c = x < 0 ? R.tent : R.tentDk;
        if (x === 0 || (i === 2 && Math.abs(x) < half)) c = R.stripe;
        if (x === 1 && i < 6) c = R.soilDk;
        put(main, tx + 10 + x, y, c);
      }
    }
    // warm light on the ground around the fire, only visible at night
    const fb = G[fx];
    for (let x = fx - 22; x <= fx + 22; x++) for (let y = G[x]; y < G[x] + 6; y++) {
      const d = Math.hypot((x - fx) / 22, (y - fb) / 6);
      if (d > 1 || !dith(x, y, 1.1 - d)) continue;
      const c = get(main, x, y);
      if (c === R.grassHi) put(main, x, y, R.grassGlowHi);
      else if (c === R.grass) put(main, x, y, R.grassGlow);
      else if (c === R.soil || c === R.path || c === R.pathDk) put(main, x, y, R.soilGlow);
    }
    for (let x = -4; x <= 4; x++) { put(main, fx + x, fb, R.trunkDk); if (Math.abs(x) < 3) put(main, fx + x, fb - 1, R.trunk); }
    const flame = ["..2..", ".212.", ".101.", "21012", "20102", ".222."];
    flame.forEach((row, i) => [...row].forEach((ch, j) => { if (ch !== ".") put(main, fx - 2 + j, fb - 7 + i, R.fire0 + Number(ch)); }));
    for (const [sx, sy] of [[-5, 0], [5, 0], [-4, 1], [4, 1]]) put(main, fx + sx, fb + sy, R.rock);
  }
  function sword(x0: number) {
    const base = G[x0];
    const S = [
      "....g....",
      "...hhh...",
      "....h....",
      "..hhhhh..",
      "....b....",
      "....b....",
      "....b....",
      "....b....",
      "....b....",
      "...sbs...",
      "..sSSSs..",
      ".sSSSSSs.",
      "sSSSSSSSs"
    ];
    const map: Record<string, number> = { g: R.gem, h: R.hilt, b: R.blade, s: R.rockHi, S: R.rock };
    S.forEach((row, i) => [...row].forEach((ch, j) => { if (map[ch]) put(main, x0 - 4 + j, base - S.length + i + 1, map[ch]); }));
  }
  function flowers(x0: number, x1: number, n: number) {
    for (let i = 0; i < n; i++) {
      const x = Math.floor(x0 + rnd() * (x1 - x0));
      const c = rnd() > 0.5 ? R.flowerA : R.flowerB;
      if (get(main, x, G[x]) === R.grassHi) { put(main, x, G[x] - 1, c); put(main, x, G[x], R.grass); }
    }
  }

  // Back to front
  for (let x = 30; x < 150; x += 26 + Math.floor(rnd() * 10)) broadleaf(x, G[x], 6 + Math.floor(rnd() * 4), 7 + Math.floor(rnd() * 3));
  tower(196);
  flowers(10, 240, 40);
  const forest = [];
  for (let x = 436; x < 636; x += 9 + Math.floor(rnd() * 8)) { if (x > 528 && x < 562) continue; forest.push(x); }
  forest.forEach((x, i) => {
    if (i % 3 === 1) pine(x, G[x] + 1, 20 + Math.floor(rnd() * 10));
    else broadleaf(x, G[x] + 1, 6 + Math.floor(rnd() * 6), 7 + Math.floor(rnd() * 4));
  });
  sword(545);
  flowers(528, 562, 14);
  bridge();
  house(732, "wood"); house(784, "stone"); house(842, "wood");
  lampPost(770); lampPost(828); lampPost(880);
  broadleaf(812, G[812], 7, 8);
  flowers(720, 900, 26);
  pine(960, G[960], 24); pine(1000, G[1000], 30); pine(1150, G[1150], 22);
  tentAndFire(1040, 1088);
  flowers(900, 1180, 20);

  const SWORD_X = 545, FIRE_X = 1088, TOWER_X = 205;

  /* ---------------- Dynamic elements ---------------- */
  type Cloud = { m: [number, number, number][]; w: number; x: number; y: number; v: number };
  const clouds: Cloud[] = [];
  for (let i = 0; i < 6; i++) {
    const w = 34 + Math.floor(rnd() * 34), base = 16;
    const n = 3 + Math.floor(rnd() * 3), puffs: [number, number, number][] = [];
    for (let j = 0; j < n; j++) {
      const mid = 1 - Math.abs(j - (n - 1) / 2) / n;
      const r = Math.round(3 + rnd() * 3 + mid * 5);
      puffs.push([6 + j * (w - 12) / (n - 1) + rnd() * 3, base - r * 0.55, r]);
    }
    const m: [number, number, number][] = [];
    for (let y = 0; y <= base; y++) for (let x = 0; x < w + 4; x++) {
      let best = -1, nx = 0, ny = 0;
      for (const [cx, cy, r] of puffs) {
        const d = Math.hypot(x - cx, (y - cy) * 1.15) / r;
        if (d <= 1 && 1 - d > best) { best = 1 - d; nx = (x - cx) / r; ny = (y - cy) / r; }
      }
      if (best < 0) continue;
      const light = -nx * 0.45 - ny * 0.85;
      let tone = light > 0.32 ? 0 : light > -0.2 ? 1 : 2;
      if (tone === 0 && light < 0.44 && !dith(x, y, (light - 0.32) / 0.12)) tone = 1;
      if (y >= base - 1) tone = 2;
      m.push([x, y, tone]);
    }
    clouds.push({ m, w, x: i * 120 + rnd() * 60, y: 6 + rnd() * 34, v: 0.5 + rnd() * 0.7 });
  }
  const stars: [number, number, number, number][] = [];
  for (let i = 0; i < 160; i++) stars.push([rnd(), rnd() * 0.7, rnd(), rnd() * 6.28]);
  const birds: { x: number; y: number; v: number; ph: number }[] = [];
  for (let i = 0; i < 5; i++) birds.push({ x: rnd() * 300, y: 30 + rnd() * 40, v: 6 + rnd() * 6, ph: rnd() * 6 });
  const flies: { x: number; y: number; ph: number; r: number }[] = [];
  for (let i = 0; i < 34; i++) { const x = 430 + rnd() * 700; flies.push({ x, y: G[Math.floor(x)] - 4 - rnd() * 18, ph: rnd() * 6.28, r: 3 + rnd() * 5 }); }

  /* ---------------- Renderer ---------------- */
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: ImageData, px32: Uint32Array, W = 0, H = 0, scale = 1;
  let progress = 0, reduce = false, last = 0;
  const pal = new Uint32Array(N);
  type RGB = [number, number, number];
  const skyPal: RGB[] = new Array(SKY.length);
  const littleEndian = new Uint8Array(new Uint32Array([1]).buffer)[0] === 1;
  const pack = (r: number, g: number, b: number): number => littleEndian ? (255 << 24) | (b << 16) | (g << 8) | r : (r << 24) | (g << 16) | (b << 8) | 255;

  function timeWeights(p: number): [number, number, number] {
    // day holds until .42, then golden (.6), dusk (.76) and night from .9
    const stops = [[0, 0], [0.2, 1], [0.42, 1], [0.6, 2], [0.76, 3], [0.9, 4], [1, 4]];
    for (let i = 0; i < stops.length - 1; i++) {
      const [a, ka] = stops[i], [b, kb] = stops[i + 1];
      if (p <= b) { const t = b === a ? 0 : (p - a) / (b - a); return [ka, kb, t * t * (3 - 2 * t)]; }
    }
    return [4, 4, 0];
  }
  function mix(keys: number[][], ka: number, kb: number, t: number): RGB {
    const A = keys[ka], B = keys[kb];
    return [Math.round(A[0] + (B[0] - A[0]) * t), Math.round(A[1] + (B[1] - A[1]) * t), Math.round(A[2] + (B[2] - A[2]) * t)];
  }
  function buildPalette(p: number, clock: number) {
    const [ka, kb, t] = timeWeights(p);
    const rgb = KEYS.map((k) => mix(k, ka, kb, t));
    for (let i = 0; i < rgb.length; i++) pal[i + 1] = pack(...rgb[i]);
    // colour cycling
    const cyc = (base: number, n: number, speed: number) => {
      const ph = Math.floor(clock * speed) % n;
      for (let i = 0; i < n; i++) pal[base + i] = pack(...rgb[base - 1 + ((i + ph) % n)]);
    };
    if (!reduce) { cyc(R.water0, 4, 5); cyc(R.fall0, 4, 11); cyc(R.fire0, 3, 8); }
    for (let i = 0; i < SKY.length; i++) skyPal[i] = mix(SKYKEYS[i], ka, kb, t);
    return { night: ka === 4 ? 1 : kb === 4 ? t : 0, day: kb <= 1 ? 1 : ka <= 1 ? 1 - t : 0, rgb };
  }

  let anchors: [number, number][] | null = null, focus = 0.62;
  function camera() {
    if (anchors && anchors.length > 1) {
      let i = 0;
      while (i < anchors.length - 2 && progress > anchors[i + 1][0]) i++;
      const [p0, x0] = anchors[i], [p1, x1] = anchors[i + 1];
      const t = clamp((progress - p0) / Math.max(1e-4, p1 - p0)), e = t * t * (3 - 2 * t);
      return clamp(x0 + (x1 - x0) * e - W * focus, 0, WW - W);
    }
    const c0 = clamp(TOWER_X + 9 - W * 0.62, 0, WW - W);
    const c1 = clamp(FIRE_X - W * 0.6, 0, WW - W);
    // walk eases a little at each end so the first and last scenes hold
    const e = progress < 0.06 ? 0 : progress > 0.94 ? 1 : (progress - 0.06) / 0.88;
    return c0 + (c1 - c0) * e;
  }

  function render(now: number) {
    const clock = reduce ? 0 : now / 1000;
    const { night, day, rgb } = buildPalette(progress, clock);
    const camX = camera();
    const off = LH - H; // layers are bottom-aligned
    const horizon = Math.round(H * 0.82);

    // Sky: five dithered bands
    for (let y = 0; y < H; y++) {
      const k = clamp(y / horizon) * (SKY.length - 1);
      const i0 = Math.floor(k), f = k - i0, i1 = Math.min(i0 + 1, SKY.length - 1);
      const c0 = pack(...skyPal[i0]), c1 = pack(...skyPal[i1]);
      const row = y * W;
      for (let x = 0; x < W; x++) px32[row + x] = dith(x, y, f) ? c1 : c0;
    }
    // Stars and the three-triangle constellation at night
    if (night > 0) {
      const tw = clock * 1.3;
      for (const [sx, sy, b, ph] of stars) {
        const x = Math.floor(sx * W), y = Math.floor(sy * H);
        const a = night * (0.4 + 0.6 * b) * (reduce ? 1 : 0.6 + 0.4 * Math.sin(tw + ph * 3));
        if (dith(x, y, a)) px32[y * W + x] = pack(232, 236, 252);
      }
    }
    // Sun on its arc, moon after sunset
    const rise = clamp(progress / 0.3), set = clamp((progress - 0.3) / 0.52);
    const sunX = Math.round(W * (progress < 0.3 ? 0.82 - 0.2 * rise : 0.62 + 0.22 * set));
    const sunY = Math.round(H * (progress < 0.3 ? 0.2 - 0.12 * Math.sin(rise * Math.PI / 2) : 0.08 + 0.6 * set * set));
    const sunCol = mix([hex("#ffe2a0"), hex("#fff4c0"), hex("#ffd36a"), hex("#ff8a4a"), hex("#ff6a3a")], ...timeWeights(progress));
    if (progress < 0.84) {
      disc(sunX, sunY, 16, (x, y, _lx, _ly, d) => {
        if (x < 0 || y < 0 || x >= W || y >= H) return;
        if (d < 0.45) px32[y * W + x] = pack(...sunCol);
        else if (dith(x, y, (1 - d) * 0.55)) {
          const s = px32[y * W + x];
          px32[y * W + x] = pack(Math.min(255, ((s & 255) + sunCol[0]) >> 1), Math.min(255, (((s >> 8) & 255) + sunCol[1]) >> 1), Math.min(255, (((s >> 16) & 255) + sunCol[2]) >> 1));
        }
      });
    }
    if (progress > 0.7) {
      const mx = Math.round(W * 0.22), my = Math.round(H * 0.16), a = clamp((progress - 0.7) / 0.15);
      disc(mx, my, 6, (x, y, lx, ly) => {
        if (Math.hypot(lx - 2.5, ly + 1.5) < 5.2) return; // crescent
        if (dith(x, y, a)) px32[y * W + x] = pack(244, 233, 200);
      });
    }
    // Clouds
    for (const c of clouds) {
      const cx = Math.round(((c.x + clock * c.v - camX * 0.12) % (W + 90) + W + 90) % (W + 90)) - 75;
      for (const [x, y, sh] of c.m) {
        const X = cx + x, Y = Math.round(c.y + y);
        if (X >= 0 && X < W && Y >= 0 && Y < H) px32[Y * W + X] = pal[sh === 0 ? R.cloud : sh === 1 ? R.cloudMid : R.cloudSh];
      }
    }
    // Constellation drawn over the clouds so it is never hidden
    if (progress > 0.82) {
      const cx = W < 160 ? Math.floor(W * 0.55) - 12 : Math.floor(W * 0.74), cy = W < 160 ? Math.floor(H * 0.2) : Math.max(Math.floor(H * 0.07), Math.ceil(66 / scale));
      const pts = [[12, 0], [0, 20], [24, 20], [6, 10], [18, 10], [12, 20]];
      const lines = [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3]];
      const dim = pack(92, 84, 64);
      for (const [a, b] of lines) {
        const [x0, y0] = pts[a], [x1, y1] = pts[b];
        const steps = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
        for (let s2 = 0; s2 <= steps; s2++) {
          const x = cx + Math.round(x0 + (x1 - x0) * s2 / steps), y = cy + Math.round(y0 + (y1 - y0) * s2 / steps);
          if (x >= 0 && x < W && y >= 0 && y < H && dith(x, y, night * 0.95)) px32[y * W + x] = dim;
        }
      }
      if (night > 0.5) for (const [x, y] of pts) for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
        const X = cx + x + dx - 1, Y = cy + y + dy - 1;
        if (X >= 0 && X < W && Y >= 0 && Y < H) px32[Y * W + X] = pack(255, 236, 160);
      }
    }
    // Birds by day
    if (day > 0.4 && !reduce) {
      for (const b of birds) {
        const x = Math.round(((b.x + clock * b.v) % (W + 40)) - 20), y = Math.round(b.y + Math.sin(clock + b.ph) * 3);
        const up = Math.sin(clock * 9 + b.ph) > 0;
        const shape = up ? [[-2, -1], [-1, 0], [0, 0], [1, 0], [2, -1]] : [[-2, 1], [-1, 0], [0, 0], [1, 0], [2, 1]];
        for (const [dx, dy] of shape) { const X = x + dx, Y = y + dy; if (X >= 0 && X < W && Y >= 0 && Y < H) px32[Y * W + X] = pack(44, 52, 70); }
      }
    }
    // Layers with parallax
    const layers: [Uint8Array, number, number][] = [[far, 0.25, 0], [mid, 0.55, 6], [main, 1, 18]];
    for (const [li, [buf, k, drop]] of layers.entries()) {
      if (li === 1) { // a band of valley mist in front of the far range
        const mTop = 96 - off, mBot = 126 - off, haze = pal[R.farHaze];
        for (let y = Math.max(0, mTop); y < Math.min(H, mBot); y++) {
          const a = Math.sin(Math.PI * (y - mTop) / (mBot - mTop)) * 0.32;
          const shift = reduce ? 0 : Math.floor(clock * 2);
          for (let x = 0; x < W; x++) if (hash((x + Math.round(camX * 0.3)) * 12.9898 + y * 78.233 + shift * 0.37) < a * (0.6 + 0.4 * noise((x + camX * 0.3) * 0.04 + y * 0.2))) px32[y * W + x] = haze;
        }
      }
      const ox = Math.round(camX * k);
      for (let y = 0; y < H; y++) {
        const ly = y + off - drop;
        if (ly < 0 || ly >= LH) continue;
        const row = ly * WW, out = y * W;
        for (let x = 0; x < W; x++) {
          const c = buf[row + ((x + ox) % WW)];
          if (c) px32[out + x] = pal[c];
        }
      }
    }
    // Embers rise from the fire and smoke drifts off after sunset
    if (progress > 0.6) {
      const fx = FIRE_X - Math.round(camX), fy = G[FIRE_X] - 7 - off + 18;
      const lit = clamp((progress - 0.6) / 0.25);
      for (let i = 0; i < 7; i++) {
        const age = reduce ? (i * 3) % 20 : (clock * 9 + i * 5.3) % 20;
        const x = fx + Math.round(Math.sin(i * 2.1 + (reduce ? 0 : clock * 2)) * (1 + age * 0.15)), y = fy - Math.round(age);
        if (x >= 0 && x < W && y >= 0 && y < H && dith(x, y, lit * (1 - age / 20))) px32[y * W + x] = pal[i % 2 ? R.fire1 : R.fire0];
      }
      for (let i = 0; i < 26; i++) {
        const age = reduce ? (i * 2) % 40 : (clock * 4 + i * 1.7) % 40;
        const x = fx + Math.round(age * 0.5 + Math.sin(age * 0.3 + i) * 2), y = fy - 6 - Math.round(age * 0.9);
        if (x >= 0 && x < W && y >= 0 && y < H && dith(x, y, (1 - age / 40) * 0.7)) px32[y * W + x] = pack(148, 146, 166);
      }
    }
    // Fireflies at night
    if (night > 0) {
      for (const f of flies) {
        const x = Math.round(f.x - camX + Math.sin(clock * 0.7 + f.ph) * f.r);
        const y = Math.round(f.y - off + 18 + Math.cos(clock * 0.9 + f.ph) * 2);
        if (x < 0 || x >= W || y < 0 || y >= H) continue;
        const on = reduce ? 1 : Math.sin(clock * 2.2 + f.ph * 2) * 0.5 + 0.5;
        if (on * night > 0.35) px32[y * W + x] = pack(217, 249, 157);
      }
    }
    ctx.putImageData(img, 0, 0);
    return rgb;
  }

  /* ---------------- Public API ---------------- */
  let dirty = true;
  function loop(now: number) {
    requestAnimationFrame(loop);
    // palette cycling and sprites read best at a deliberate low frame rate
    if (!dirty && now - last < 1000 / 14) return;
    last = now; dirty = false;
    render(now);
  }
  function resize() {
    const vw = innerWidth, vh = innerHeight;
    scale = Math.max(2, Math.round(vh / 190));
    W = Math.min(WW, Math.ceil(vw / scale)); H = Math.ceil(vh / scale);
    canvas.width = W; canvas.height = H;
    canvas.style.width = W * scale + "px"; canvas.style.height = H * scale + "px";
    img = ctx.createImageData(W, H);
    px32 = new Uint32Array(img.data.buffer);
    dirty = true;
    if (reduce) render(performance.now());
  }
  export const PixelWorld = {
    init(el: HTMLCanvasElement, opts: { reduce?: boolean } = {}) {
      canvas = el; ctx = canvas.getContext("2d", { alpha: false })!;
      reduce = !!opts.reduce;
      resize();
      addEventListener("resize", resize);
      render(performance.now()); // first frame right away, not on the next animation tick
      if (!reduce) requestAnimationFrame(loop);
    },
    setProgress(p: number) {
      progress = clamp(p);
      dirty = true;
      if (reduce) render(0);
    },
    setAnchors(list: [number, number][], f?: number) { anchors = list; if (f) focus = f; dirty = true; if (reduce) render(0); },
    places: { tower: TOWER_X + 9, falls: 285, sword: SWORD_X, bridge: 680, village: 800, fire: FIRE_X },
    get scale() { return scale; }
  };
