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
    farRim:   ["#d4e4f2", "#f4caa8", "#c497b6", "#3d4874"],
    farDeep:  ["#6b87ab", "#9a6f74", "#5c4474", "#1a2140"],
    snowSh:   ["#c4d6ea", "#eec4b2", "#bf92ae", "#424e7c"],
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
    lakeHi:   ["#7cc6f0", "#e2b48e", "#c27a86", "#25386a"],
    lake:     ["#3d8fd4", "#5a82ae", "#4c4f88", "#16234a"],
    lakeDeep: ["#2a6aae", "#3e5c88", "#353768", "#0d1634"],
    wetSand:  ["#c4a068", "#cb9456", "#86686e", "#2c262c"],
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

  /* The sword in its pedestal: the site owner's sprite, hand-reduced from 38×76 to 19×38 and drawn on the fine grid
     (the walker's resolution), so it stands about 1.5× his height. */
  const SWORD_ROWS = [
    ".........a.........",
    "........abc........",
    ".........b.........",
    ".........d.........",
    ".........b.........",
    ".........d.........",
    ".........b.........",
    ".........d.........",
    "........abc........",
    ".......abbbc.......",
    ".....c.abebc.b.....",
    "....bac.aec.bbc....",
    "...aba..bbc..cbc...",
    "..ba....agb....bc..",
    "........fgf........",
    ".......hgggi.......",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "........hgi........",
    "....jkkkhgilkkl....",
    "...jkkkkkkkkkkkl...",
    "..jjjjjjjjjjjjjjkl.",
    "..kkkkkkkjjkkkkkkl.",
    ".jkkkkkkjklkkkkkkl.",
    ".jkkkkkjjjjlkkkkkl.",
    "jkkkkkjklkjklkkkkkl",
    "jkkkkjjjjjjjjlkkkkl",
    "jkkkkkkkkkkkkkkkkkl"
  ];
  const SWORD_COLORS: Record<string, string> = { a: "#4c4c84", b: "#3f3f74", c: "#2f2f5d", d: "#37946e", e: "#fbf236", f: "#8f974a", g: "#9badb7", h: "#cbdbfc", i: "#8599a5", j: "#847e87", k: "#696a6a", l: "#595652" };
  // each sprite colour gets day/golden/dusk/night keys, tinted like the rest of the world
  const tint = (h: string, to: string, k: number, dark: number) => {
    const a = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)), b = [1, 3, 5].map((i) => parseInt(to.slice(i, i + 2), 16));
    return "#" + a.map((v, i) => Math.round((v + (b[i] - v) * k) * dark).toString(16).padStart(2, "0")).join("");
  };
  for (const [k, h] of Object.entries(SWORD_COLORS)) {
    const glow = k === "e"; // the gem in the guard keeps a little light at night
    ROLES["sw_" + k] = [h, tint(h, "#ffb070", 0.14, 1), tint(h, "#6a4a7a", 0.3, 0.86), glow ? tint(h, "#ffd060", 0.2, 0.8) : tint(h, "#1a2246", 0.52, 0.7)];
  }

  /* The walker: the site owner's sprite sheet, right-facing walk cycle (10 frames, 27×25),
     quantised to 16 colours plus the eye white (enclosed white kept, outside white dropped), cleaned of compression halos. Facing left mirrors these frames.
     The world is drawn at half his resolution and upscaled with EPX, so he stands at its scale. */
  const LINK_FRAMES: string[][] = [
    [".............iekfll........", "..........ikkkeknnpnl......", "......eiikkkkkekppnppl.....", ".....eiikkkkkeknnpnnnp.....", "....eiiikieekekpplfnff.....", "...aiiiiikkkekpnlmmb.......", "...aiiiiiieeippnmmmb.......", "..aeiieeieeienlpmbfb.......", "..aeieaeemmmmfnlmqjmb......", "..aeiaaaalmmmfpfmqjmb......", "...cca..ablmmnpfmqhj.......", "...dcc..fclamnnmmmhd.......", ".........mcabpfmmmb........", "........bbaedfbeear........", "........cdcigbaaiaa........", ".......brccfgfaaapka.......", "......ambedffaaaaika.......", "......aaekkkkaarraaa.......", ".......aakkkkeaffaaa.......", ".......afcekkkaaaaddbb.....", ".......afdcaaaaaaadffb.....", "........dddda....abbb......", ".........rbaa..............", "...........................", "..........................."],
    [".........iikkkgepfn........", "........ikkkkegpppnnl......", "......eikkkkeknnnnppnl.....", ".....eiikkkkeknpplnnppl....", "...maiiiikkkeknnplfnnpl....", "...maiiiiikekpnnlmmllf.....", "...aeiiiiiieipnmmmmd.......", "...aeiiiiieimlnpmbfa.......", "...aeiieeommfnlnmqjma......", "...aeieaammmfpllmqjma......", "...aeiaaabmhppllmmhj.......", "...daaaadbbjpnlmmmhd.......", "....aaa..maapfhmmma........", "........bdeamaeeebd........", "........afgigaeikpa........", ".......arafgfgmmaikd.......", "......bmaiifamrrraaab......", "......bbaekkiarrfbbdfa.....", "......afdaekkieffbbdfa.....", "......bfdaaaaaaaabddb......", "......bddb......aaaa.......", "......adda.................", ".......ba..................", "...........................", "..........................."],
    ["............ikkkeffl.......", "........eeikkkkekpnnl......", "........eikkkkeknnppnl.....", "........eikkkkekpplnpplm...", "......eiiikeekeknplfnpfm...", ".....aeiiiikkekpnlmmff.....", ".....aeiiiiiieipnmmmbf.....", ".....aeiiiiieenlpmbfbb.....", ".....aeeiieommfnlmqjmbm....", "......aeiebmmmfpfmqjmam....", "......deeaadmhppfmmhj......", "......deaamfjannmmmhd......", "......daaabmaapfmmma.......", "........aabaeamaeenf..rr...", "........radfiigaiepa..dbd..", "......daaggfigfiiaakaadfda.", "......dbgkkkffaarrfbfddfda.", ".....abccakkkkiarffbbdddd..", ".....adfdfdakkkaabbbddb....", ".....affcbaaaaaaa...ab.....", ".....addca.................", ".....addcb.................", "......dar..................", "...........................", "..........................."],
    ["...........................", "...........kkkeefn.........", "........ikkkkkekpnnl.......", "......eikkkkkkeknppnl......", ".....eikkkkkkekppnnppl.....", "....eiikkeekkeknplfnpf.....", "....eiiiikkiekpnlmmff......", "...eiiiiiieeippnmmmb.......", "...eiiiiieeeeflpmbfb.......", "..deieaaemmmffnlmmjhd......", "..aeea..mmmmffpfmqjmb......", "..aead..ajmmmppfmqjhd......", "..aaa...bbfhmppmmmba.......", "........fdaacpfmmda........", "........aaeacmaeeaa........", "........aaeigaeeiia........", "........argiggieaiga.......", "........aadggddaagpa.......", "........bgkgdarrfagaa......", ".......aagkkkkaffbbda......", ".......afbaekkarbbdb.......", ".......afdddaaaabaa........", "........bfddba.............", ".........bbbaa.............", "..........................."],
    ["...........................", ".........ikkeiffll.........", "......eikkkkeknpnnnl.......", "...eeikkkkkkeknppppnl......", ".eeiikkkkkkekpppnnnpp......", ".aiiiikkeekekpnnlllnf......", "aiiiiiiikkekpnllmm.........", "aiiiiiiiieiipnmmmma........", "iieeaeeeeieflpmhbfa........", "eeaaaaeemmhfnlmmjjhd.......", "aa....aammmfpfmmqjfa.......", "dd....dabmmfpfmmmjma.......", ".......bbhhnpfmmmma........", ".........aapfmmmmb.........", ".......aaeambeeacc.........", "........aiiaeiiica.........", "........aiaaiaeipca........", ".......aafaaaadfgga........", ".......aikarragkkab........", "........akaffbgkkaa........", ".........aaabbaaaa.........", "..........abaafffa.........", "...........aadffba.........", "............abbbba.........", "..........................."],
    ["............iekfll.........", ".........ikkkeknpnnl.......", ".....iiiikkkkekpnppnl......", "....eiiikkkkeknnpnnppl.....", "...eiiiikeekekpplfnff......", "...iiiiiiikekpnlmmb........", "..aiiiiiiiieepnmmmb........", ".aeiiiiiiieenlpmbfb........", ".aeieaeeiimmfnlmqjmb.......", ".aeiamjabmmmfpfmqjmb.......", "..cea.maadmhppfmmhj........", "..dcd..mdcjhnnfmmhd........", "........bcaapfmmmb.........", "........aagambeeabr........", ".........aigamaiafr........", ".........agaraiigara.......", "........bfaaraagpkada......", "......reiaarraffkkab.......", "......raabffraikkia........", ".......aaaffaikkkab........", "........aaadaaaaadfb.......", ".........dabaaaddffb.......", "...............abbb........", "...........................", "..........................."],
    [".........ikkkgepfn.........", ".......iikkkegpppnnl.......", ".....eikkkkeknnnnppnl......", "....eiikkkkeknpplnnppl.....", "..maeiiieekeknnplfnnpl.....", "..maiiiiikekpnnlmmllf......", "...aiiiiiieippnmmmb........", "..aeiiiieemmnnpmbfd........", "..aeiieeemmfnnlmqjma.......", "...aieaammmfpllmqjma.......", "...aeaaadmmppllmqhj........", "...dddddmbannlmmmhd........", "........maapfhmmmaa........", ".......aarakaeeeaddr.......", "........aaaaaiieerfa.......", "........aarrfiiieafa.......", ".......aarrrdeiipka........", "......bbffradffkkka........", "......bfmfagkkkkkeabb......", "......bdbbgkkkkkkabffb.....", ".......bdbaaaaaadfddfb.....", "........aa.....bbdddb......", "................dbaa.......", "...........................", "..........................."],
    [".........ikkkeffl..........", "......eikkkkekpnnl.........", "....deikkkkeknnppnl........", "....eeikkkkekppnnpppl......", "....eiikeekeknplfnppl......", "...aeiiikkekpnlmmllnl......", "...aeiiiieeipnmmmccf.......", "...aeiiieiemlpmbfbq........", "....aieeommfnlmqjmjd.......", "....aieammmfpfmqjhjd.......", "....aeaadmhppfmmhj.........", "....dadddjannmmmha.........", ".....a..maapfmmmab.........", ".......aaaaaaeeara.........", ".......aafakagiiaa.........", ".....raaebiifggpke.........", "....bbfabfraaffgkeaaaaa....", "...abffffffaikkkiaffffa....", "....bfdabbbakkiaadddffa....", "....bddabbaaaaaaadddd......", "....baa..........daaa......", "...........................", "...........................", "...........................", "..........................."],
    ["...........................", "..........ikkeifn..........", "........ikkkkekpnnl........", ".....eikkkkkkeknppnl.......", "....eikkkkkkekppnnppl......", "...eiikkkeekeknplfnpf......", "...eiiiiikkekpnlmmff.......", "..eiiiiiiieiipnmmmb........", "..eiiiiiieeeflpmbfb........", ".deieaeemmmmfnlmmjhd.......", ".aeeaadccmmmfpfmqjmb.......", ".aead..abfmhfpfmqjhd.......", ".aaa....bbhhnpfmmma........", "..........abpfmmdm.........", "........aaeamaeeaa.........", ".........aeiiaiiia.........", ".........aaaaaiiiia........", "........agdrraiifpabb......", "......regbffraffkiafb......", "......regbffaikkkadfb......", "........bbaaaaiiaddb.......", "........bddaaaaaaba........", "........aaaa...............", "...........................", "..........................."],
    ["...........................", ".........ikkeiifll.........", ".....iikkkkkeilpnnnl.......", "...eiikkkkkkellnpppnl......", "..eiikkkkkkeknppnnnpp......", "eeiiiikkeekeknnplllnf......", "aiiiiiiikkekpnnlmmd........", "aiiiiiiiieiipnmmmma........", "iieeaeeeeieflnpmbfa........", "eeaaaaeemmhfnlnmmjhd.......", "cc....aammmfpllmqjma.......", "dc....dabmmmpllmqjhd.......", ".......bbmhmplmmmma........", ".........aapfmmmma.........", ".......aaeamaeeea..........", "........aiiaeiiii..........", "........aaaiiaiin.a........", ".......aifbbrrffiia........", ".......aikarrcekkeb........", "........akaffceke..........", ".........aammraaa..........", ".........adbabddf..........", "..........bdbbbbb..........", "...........ba..............", "..........................."]
  ];
  const LINK_COLORS: Record<string, string> = { a: "#020802", b: "#0e0503", c: "#222213", d: "#423123", e: "#0b430c", f: "#67481e", g: "#2c6826", h: "#e8eef6", i: "#177929", j: "#3a5aa8", k: "#469f2f", l: "#9e7f3c", m: "#efc89c", n: "#d3b441", o: "#fff0d6", p: "#f7f234", q: "#f8f8f8", r: "#3c414c" };
  for (const [k, h] of Object.entries(LINK_COLORS)) {
    ROLES["lk_" + k] = [h, tint(h, "#ffb070", 0.14, 1), tint(h, "#6a4a7a", 0.28, 0.88), tint(h, "#1a2246", 0.45, 0.75)];
  }

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
    // crags: sharp little notches along the ridge, stronger the higher the mountain
    const crag = Math.abs(noise(x * 0.33 + 7) - 0.5) * 7 * clamp(h / 70);
    return Math.round(122 - h - fbm(x * 0.05) * 6 - crag);
  };
  const FT = new Int16Array(WW);
  for (let x = 0; x < WW; x++) FT[x] = farTop(x);
  const peaks: [number, number][] = [];
  for (let x = 0; x < WW; x++) {
    let isPeak = true;
    for (let k = -14; k <= 14 && isPeak; k++) if (k && FT[Math.min(WW - 1, Math.max(0, x + k))] < FT[x]) isPeak = false;
    if (isPeak && (!peaks.length || x - peaks[peaks.length - 1][0] > 6)) peaks.push([x, FT[x]]);
  }
  // ridged noise: thin bright lines (spurs) and thin dark lines (couloirs) running down each face
  const ridged = (u: number, v: number) => 1 - Math.abs(2 * noise(u + noise(v) * 1.6) - 1);
  for (let x = 0; x < WW; x++) {
    const t = FT[x];
    let pk = peaks[0];
    for (const q of peaks) if (Math.abs(q[0] - x) < Math.abs(pk[0] - x)) pk = q;
    const snowLine = 70 + noise(x * 0.21) * 8;
    for (let y = t; y < LH; y++) {
      const d = y - t, k = d / (LH - t);
      // the main ridge between the sunlit and shaded face slants down and away from the peak
      const split = pk[0] + (y - pk[1]) * 0.42 + (noise(y * 0.15 + pk[0]) - 0.5) * 6;
      const litFace = x < split;
      // streaks follow the fall line of each face: down-left on the lit side, down-right in shade
      const u = x * 0.19 + (litFace ? -y : y) * 0.085, r = ridged(u + pk[0] * 0.01, y * 0.05);
      const spur = r > 0.965, couloir = r < 0.26;
      const snowHere = y < snowLine + (couloir ? 9 : 0) + (litFace ? 0 : -3);
      let c: number;
      if (snowHere) {
        c = litFace ? R.farSnow : R.snowSh;
        if (spur && litFace) c = R.farRim;
        if (couloir && !litFace) c = R.farMid;
      } else {
        c = litFace ? R.farLit : R.farMid;
        // below the snow only the dark couloirs read as lines; bright spurs would break into specks
        if (couloir) c = litFace ? R.farMid : R.farDeep;
        if (!litFace && x - split < 2.2) c = R.farDeep; // a crisp shadow just under the main ridge
      }
      if (d === 0) c = litFace ? (snowHere ? R.farRim : R.farRim) : (snowHere ? R.snowSh : R.farMid); // sunlit rim on the skyline
      if (!snowHere && k > 0.5 + (noise(x * 0.06 + 3) - 0.5) * 0.16) c = R.farHaze; // haze settles in the valley, clean edge
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
      else if (d > 9 + Math.round(noise(x * 0.05 + 11) * 8)) c = R.hillDark; // a clean step into shade, no dot pattern
      put(mid, x, y, c);
    }
  }

  /* Main layer: one continuous walk. Key places (logical x):
     tower 205 · cliff 250 · waterfall 250-258 · lake 262-430 · forest 430-640 ·
     sword 545 · river + bridge 640-720 · village 720-900 · hill + camp 900-1200 */
  const WATER = 158; // lake and river surface
  const smooth01 = (t: number) => { const c = clamp(t); return c * c * (3 - 2 * c); };
  const forestG = (x: number) => Math.round(150 + Math.sin(x * 0.02) * 3 + noise(x * 0.1) * 2);
  const villageG = (x: number) => Math.round(148 + noise(x * 0.06) * 2);
  const ground = (x: number): number => {
    if (x < 246) return Math.round(112 + noise(x * 0.08) * 3);
    if (x < 258) return 174; // plunge pool at the foot of the falls
    if (x < 424) return Math.round(WATER + 20 - 12 * smooth01((x - 330) / 94) + noise(x * 0.2) * 2); // lake bed: deep by the falls, shelving to the beach
    if (x < 448) return Math.round(WATER + 8 + (forestG(448) - WATER - 8) * smooth01((x - 424) / 24)); // pebble beach
    if (x < 636) return forestG(x);
    if (x < 658) return Math.round(forestG(636) + (WATER + 4 - forestG(636)) * smooth01((x - 636) / 22)); // west bank
    if (x < 702) return Math.round(WATER + 4 + Math.sin(Math.PI * (x - 658) / 44) * 6 + noise(x * 0.3)); // river bed
    if (x < 726) return Math.round(WATER + 4 + (villageG(726) - WATER - 4) * smooth01((x - 702) / 24)); // east bank
    if (x < 900) return villageG(x);
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
      const shore = t >= WATER - 3 && !plateau;
      if (shore && d < 4) c = t >= WATER ? (hash(x * 1.7 + y) > 0.7 ? R.rock : dith(x, y, 0.5) ? R.pathDk : R.wetSand) : (d === 0 ? R.wetSand : dith(x, y, 0.4) ? R.pathDk : R.wetSand);
      else if (d === 0) c = R.grassHi;
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
    const x = Math.floor(rnd() * WW); if (G[x] >= WATER - 2 || (x > 240 && x < 264)) continue;
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
    if (G[x] >= WATER - 3 || (x > 240 && x < 264)) continue;
    const h = hash(x * 3.7);
    if (h > 0.7) put(main, x, G[x] - 1, h > 0.9 ? R.grassHi : R.grass);
    if (h > 0.94) put(main, x, G[x] - 2, R.grassHi);
  }
  // Cliff face below the tower plateau: stepped ledges, darker toward the falls
  for (let x = 232; x < 262; x++) {
    for (let y = 112; y < WATER + 2; y++) {
      const edge = 246 + Math.round(noise(y * 0.18) * 3) - Math.round((y - 112) * 0.06);
      if (x < edge) continue;
      if (x > 257 + Math.round((y - 112) / (WATER - 112) * 3)) continue; // the face ends where the falls end
      const n = noise(x * 0.5 + y * 0.31), ledge = (y + Math.round(noise(x * 0.2) * 3)) % 9 === 0;
      put(main, x, y, ledge ? R.rockHi : n > 0.55 ? R.rock : R.rockDk);
    }
  }
  // Water body: colour by depth, a bright skin at the surface, the bed showing through at the edges
  function water(x0: number, x1: number, flow: boolean) {
    for (let x = x0; x < x1; x++) {
      const bed = G[x];
      if (bed <= WATER) continue;
      for (let y = WATER; y < Math.min(bed, LH); y++) {
        const d = y - WATER, toBed = bed - y;
        let c = d < 2 ? R.lakeHi : d < 6 ? (dith(x, y, (d - 2) / 4) ? R.lake : R.lakeHi) : dith(x, y, (d - 6) / 10) ? R.lakeDeep : R.lake;
        if (toBed <= 2 && dith(x, y, 0.5)) c = toBed === 1 ? R.wetSand : R.lakeHi; // shallows
        put(main, x, y, c);
      }
      // glints: short dashes in cycle colours, horizontal for the lake, stretched for the current
      for (let row = 1; row < Math.min(bed - WATER, 14); row += 2 + (row >> 2)) {
        const seg = Math.floor((x + row * 5) / (flow ? 7 : 5));
        if (hash(seg * 13.1 + row * 7.7) > (flow ? 0.45 : 0.62)) put(main, x, WATER + row, R.water0 + (((x >> (flow ? 0 : 1)) + row) & 3));
      }
      if (hash(x * 2.3) > 0.55) put(main, x, WATER, R.water2);
    }
  }
  water(240, 450, false);
  water(636, 728, true);
  // Stream across the plateau feeding the falls
  for (let x = 239; x < 247; x++) {
    const w = 2 + ((x - 239) >> 2);
    for (let k = 0; k < w; k++) put(main, x, G[x] + k, k === 0 ? R.water2 : R.water0 + ((x + k) & 3));
    put(main, x, G[x] + w, R.rockDk);
  }
  // Waterfall: widens as it drops, lit streaks, dark edges, curling lip and splash
  for (let y = 112; y < WATER + 1; y++) {
    const t = (y - 112) / (WATER - 112);
    const l = 245 - Math.round(t * 2), r = 255 + Math.round(t * 4);
    for (let x = l; x <= r; x++) {
      const edge = x === l || x === r;
      const streak = (x - l) % 4 === 1;
      let k = ((y >> 1) - x * 3) & 3;
      if (edge) k = 3; else if (streak) k = 2;
      if (edge && dith(x, y, 0.5)) continue; // ragged, see-through edge
      put(main, x, y, R.fall0 + ((k + (y >> 1)) & 3));
    }
  }
  for (let x = 244; x < 256; x++) put(main, x, 111, R.foam); // lip
  for (let i = 0; i < 90; i++) { // splash: a mound of spray where the water lands
    const a = rnd() * Math.PI, rr = rnd() * 10;
    const x = Math.round(250 + Math.cos(a) * rr * 1.4), y = Math.round(WATER - Math.sin(a) * rr * 0.7);
    put(main, x, y, rnd() > 0.5 ? R.foam : R.fall0 + Math.floor(rnd() * 4));
  }
  for (let x = 236; x < 270; x++) if (hash(x * 4.1) > 0.35) put(main, x, WATER + 1 + (Math.abs(x - 252) > 10 ? 1 : 0), R.foam); // foam ring
  // Carved stairs from the tower plateau down toward the falls
  const stairY = (x: number) => Math.min(150, 112 + Math.ceil(Math.ceil((x - 216) / 2) * 3.5));
  for (let x = 216; x < 239; x++) {
    const sy = stairY(x);
    for (let y = G[x]; y < sy; y++) put(main, x, y, y === G[x] ? R.rock : R.rockDk); // the cut wall behind
    put(main, x, sy, R.rockHi); put(main, x, sy + 1, R.rock); // tread
    if ((x - 216) % 2 === 1) for (let k = 1; k <= 3; k++) put(main, x, sy + 1 + k, R.rockDk); // riser shadow
  }
  // Ledge behind the waterfall, then a few steps down to the dock
  for (let x = 238; x < 262; x++) { // footbridge across the face of the falls
    const y = x < 256 ? 150 : 150 + Math.ceil((x - 255) * 5 / 6), seam = (x - 238) % 3 === 0;
    put(main, x, y, seam ? R.woodDk : R.wood); put(main, x, y + 1, R.woodDk);
    if ((x - 238) % 8 === 0) for (let k = 1; k <= 5; k++) put(main, x, y - k, k === 5 ? R.wood : R.woodDk);
    put(main, x, y - 5, R.wood);
  }
  // Dock across the lake: planks, a dark edge and posts into the lake bed
  let dockEnd = 262;
  for (let x = 262; x < 460; x++) {
    if (G[x] <= 156) { dockEnd = x; break; }
    const seam = (x - 262) % 4 === 0;
    put(main, x, 155, seam ? R.woodDk : R.wood); put(main, x, 156, R.woodDk);
    if ((x - 262) % 14 === 6) for (let y = 157; y < Math.min(G[x], LH); y++) { put(main, x, y, R.woodDk); }
    dockEnd = x;
  }
  // Paths through the village and up the hill
  for (let x = 730; x < 1150; x++) {
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
  function broadleaf(x0: number, base: number, h: number, r: number, back = false, wide = false) {
    for (let y = base - h; y <= base; y++) { put(main, x0, y, back ? R.trunkDk : R.trunk); put(main, x0 + 1, y, R.trunkDk); }
    put(main, x0 - 1, base, R.trunkDk); put(main, x0 + 2, base, R.trunkDk);
    const cy = base - h - r * 0.4;
    const blobs = wide
      ? [[0, 0, r], [-r * 0.8, r * 0.3, r * 0.75], [r * 0.85, r * 0.25, r * 0.75], [-r * 0.35, -r * 0.6, r * 0.7], [r * 0.4, -r * 0.55, r * 0.65], [-r * 1.3, r * 0.55, r * 0.5], [r * 1.3, r * 0.5, r * 0.5], [0, -r * 0.95, r * 0.5]]
      : [[0, 0, r], [-r * 0.7, r * 0.35, r * 0.7], [r * 0.75, r * 0.3, r * 0.72], [-r * 0.2, -r * 0.6, r * 0.65], [r * 0.4, -r * 0.4, r * 0.55]];
    const HI = back ? R.leafMid : R.leafHi, MID = back ? R.leafLo : R.leafMid, LO = back ? R.leafOut : R.leafLo;
    const mask = new Map<string, number>();
    for (const [bx, by, br] of blobs) disc(Math.round(x0 + bx), Math.round(cy + by), Math.round(br), (x, y, lx, ly, d) => {
      const light = (-lx - ly) / br - d * 0.6 + noise(x * 0.9 + y * 0.7) * 0.5;
      const prev = mask.get(x + "," + y);
      if (prev === undefined || light > prev) mask.set(x + "," + y, light);
    });
    for (const [k, light] of mask) {
      const [x, y] = k.split(",").map(Number);
      let c = light > 0.45 ? HI : light > -0.05 ? MID : LO;
      if (c === MID && dith(x, y, (light + 0.05) * 2)) c = HI;
      put(main, x, y, c);
    }
    for (const [k] of mask) { // outline where the canopy meets something else
      const [x, y] = k.split(",").map(Number);
      for (const [dx, dy] of [[1, 0], [0, 1], [-1, 0], [0, -1]]) {
        if (!mask.has((x + dx) + "," + (y + dy))) { if (dy >= 0 || dx > 0) put(main, x, y, R.leafOut); break; }
      }
    }
  }
  function giantTree(x0: number, base: number, h: number, r: number, back = false) {
    broadleaf(x0, base, h, r, back, true);
    const top = Math.round(base - h + r * 0.45), tw = Math.max(4, Math.round(r / 3));
    for (let y = top; y <= base; y++) {
      const flare = y > base - 6 ? Math.round((y - (base - 6)) * 0.9) : 0;
      const half = (tw >> 1) + flare;
      for (let x = -half; x <= half; x++) {
        let c = (x + Math.round(noise(y * 0.3 + x0) * 2) + (y >> 2)) % 3 === 0 ? R.trunkDk : R.trunk;
        if (x <= -half + 1) c = back ? R.trunk : R.wood;
        if (x >= half - 1) c = R.trunkDk;
        if (back && c === R.trunk && dith(x0 + x, y, 0.5)) c = R.trunkDk;
        put(main, x0 + x, y, c);
      }
    }
    for (const dir of [-1, 1]) { // roots creeping along the ground
      let x = x0 + dir * ((tw >> 1) + 4), y = base;
      for (let k = 0; k < 4 + Math.floor(rnd() * 4); k++) { put(main, x, y, R.trunkDk); put(main, x, y - 1, R.trunk); x += dir; if (k % 2) y += 1; }
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
    const top = base - h;
    // coursed stone: 4-px courses, blocks of varied width, lit on the left, shaded on the right
    for (let y = top; y <= base; y++) {
      const row = base - y, course = Math.floor(row / 4);
      let joint = Math.floor(hash(course * 3.7) * 6);
      const joints = new Set<number>();
      while (joint < w) { joints.add(joint); joint += 4 + Math.floor(hash(course * 7.3 + joint) * 4); }
      for (let x = 0; x < w; x++) {
        let c = R.stone;
        if (row % 4 === 0 || joints.has(x)) c = R.stoneDk; // mortar
        if (x === 1 && row % 4 !== 0) c = R.rockHi; // sunlit edge
        if (x > w - 6 && dith(x, y, (x - (w - 6)) / 6)) c = R.stoneDk; // the far side turns away from the light
        if (x === 0 || x === w - 1) c = R.rockDk; // outline
        put(main, x0 + x, y, c);
      }
    }
    // plinth: a wider, darker base course
    for (let y = 0; y < 5; y++) for (let x = -2; x < w + 2; x++) {
      const c = y === 4 ? R.stone : (x === -2 || x === w + 1 ? R.rockDk : (y + x) % 5 === 0 ? R.stoneDk : (x > w - 4 ? R.stoneDk : R.stone));
      put(main, x0 + x, base - y, c);
    }
    // ivy climbing the lit side
    for (let i = 0; i < 70; i++) {
      const vy = base - 4 - Math.floor(hash(i * 1.9) * 26), vx = Math.floor(Math.pow(hash(i * 5.3), 1.8) * 6);
      if (vy < base - 4 - (6 - vx) * 4) continue; // thins out toward the top
      put(main, x0 + vx, vy, hash(i * 2.7) > 0.55 ? R.leafLo : R.leafMid);
      if (hash(i * 4.1) > 0.7) put(main, x0 + vx, vy - 1, R.leafHi);
    }
    // arched windows with a stone frame, a sill, and a glow ring for the night
    for (const wy of [8, 24]) {
      const wx = 7;
      for (let y = -2; y <= 6; y++) for (let x = -2; x <= 5; x++) put(main, x0 + wx + x, top + wy + y, R.glowWall);
      for (let y = -1; y <= 5; y++) for (let x = -1; x <= 4; x++) {
        const arch = y === -1 && (x === -1 || x === 4);
        if (!arch) put(main, x0 + wx + x, top + wy + y, R.stoneDk);
      }
      for (let y = 0; y < 5; y++) for (let x = 0; x < 4; x++) {
        if (y === 0 && (x === 0 || x === 3)) continue; // rounded head
        put(main, x0 + wx + x, top + wy + y, x === 1 || x === 2 ? R.glass : (y > 1 ? R.glass : R.stoneDk));
      }
      for (let y = 1; y < 5; y++) put(main, x0 + wx + 1, top + wy + y, R.woodDk); // mullion
      for (let x = -2; x <= 5; x++) put(main, x0 + wx + x, top + wy + 6, R.rockHi); // sill
    }
    // arrow slits
    for (const [sx, sy] of [[4, 38], [13, 16]]) for (let y = 0; y < 4; y++) put(main, x0 + sx, top + sy + y, R.rockDk);
    // arched door, 15 px so the walker fits, with voussoirs around it
    for (let y = 0; y < 17; y++) for (let x = 4; x <= 13; x++) {
      if (y >= 15 && (x <= 5 || x >= 12)) continue;
      if (y >= 16 && (x <= 6 || x >= 11)) continue;
      put(main, x0 + x, base - y, (x + y) % 2 ? R.stoneDk : R.rockHi);
    }
    for (let y = 0; y < 15; y++) for (let x = 6; x <= 11; x++) {
      if (y === 14 && (x === 6 || x === 11)) continue;
      const frame = x === 6 || x === 11 || y === 14;
      put(main, x0 + x, base - y, frame ? R.woodDk : x === 10 ? R.woodDk : (y % 4 === 0 ? R.woodDk : R.wood));
    }
    for (const sy of [4, 10]) for (let x = 7; x <= 10; x++) put(main, x0 + x, base - sy, R.rockDk); // iron straps
    put(main, x0 + 9, base - 7, R.gem); // handle
    // corbelled cornice under the roof
    for (let x = -2; x < w + 2; x++) {
      put(main, x0 + x, top - 1, x > w - 3 ? R.stoneDk : R.stone);
      put(main, x0 + x, top, R.rockDk);
      if ((x + 2) % 3 === 0) { put(main, x0 + x, top + 1, R.stoneDk); put(main, x0 + x, top + 2, R.rockDk); }
    }
    // conical roof: shingle rows, lit left, shaded right, a dark eave line
    for (let i = 0; i < 20; i++) {
      const y = top - 2 - i, half = Math.round(12 - i * 0.62);
      for (let x = -half; x <= half; x++) {
        let c = x < 0 ? R.roof : R.roofDk;
        if (i % 3 === 0 && (x + i) % 2 === 0) c = R.roofDk; // shingle edges
        if (i === 0) c = R.roofDk; // eave
        if (x === half) c = R.trunkDk;
        put(main, x0 + 9 + x, y, c);
      }
    }
    // finial and a banner in the wind
    for (let y = 0; y < 7; y++) put(main, x0 + 9, top - 22 - y, R.woodDk);
    put(main, x0 + 9, top - 29, R.gem);
    for (const [fx, fy] of [[1, 0], [2, 0], [3, 0], [4, 1], [1, 1], [2, 1], [3, 1], [1, 2], [2, 2], [5, 1]])
      put(main, x0 + 9 + fx, top - 28 + fy, fx > 3 ? R.roofDk : R.stripe);
  }
  const CHIMNEYS: [number, number][] = [];
  function house(x0: number, wall: "wood" | "stone") {
    const w = 34, h = 22, base = G[x0 + (w >> 1)];
    for (let y = base - h; y <= base; y++) for (let x = 0; x < w; x++) {
      let c = wall === "wood" ? ((x % 4 === 0) ? R.woodDk : R.wood) : ((base - y) % 4 === 0 ? R.stoneDk : ((x + (Math.floor((base - y) / 4) % 2) * 3) % 7 === 0 ? R.stoneDk : R.stone));
      if (x === w - 1 || x === 0) c = wall === "wood" ? R.woodDk : R.stoneDk;
      put(main, x0 + x, y, c);
    }
    for (let x = -1; x <= w; x++) put(main, x0 + x, base - h, R.woodDk); // eave beam
    for (const wx of [4, 24]) { // windows with a warm glow ring for the evening
      for (let y = -1; y <= 6; y++) for (let x = -1; x <= 6; x++) put(main, x0 + wx + x, base - 17 + y, R.glowWall);
      for (let y = 0; y < 6; y++) for (let x = 0; x < 6; x++) put(main, x0 + wx + x, base - 17 + y, x === 2 || y === 2 ? R.woodDk : R.glass);
    }
    for (let y = 0; y < 16; y++) for (let x = 14; x < 21; x++) { // door, 16 px tall
      const frame = x === 14 || x === 20 || y === 15;
      put(main, x0 + x, base - y, frame ? R.woodDk : (x === 19 ? R.woodDk : R.wood));
    }
    put(main, x0 + 18, base - 7, R.gem);
    for (let i = 0; i < 15; i++) { // roof with overhang and shingle rows
      const y = base - h - 1 - i;
      for (let x = -3 + i; x < w + 3 - i; x++) put(main, x0 + x, y, (y % 3 === 0) ? R.roofDk : ((x - i) % 4 === 0 ? R.roofDk : R.roof));
    }
    for (let y = 0; y < 9; y++) { put(main, x0 + 25, base - h - 6 - y, R.stoneDk); put(main, x0 + 26, base - h - 6 - y, R.stone); put(main, x0 + 27, base - h - 6 - y, R.stoneDk); }
    for (let x = 24; x <= 28; x++) put(main, x0 + x, base - h - 15, R.stoneDk); // chimney cap
    CHIMNEYS.push([x0 + 26, base - h - 16]);
  }
  function lampPost(x0: number) { // 22 px: taller than the walker
    const base = G[x0];
    for (let y = 1; y < 19; y++) { put(main, x0, base - y, R.woodDk); put(main, x0 + 1, base - y, y % 5 === 0 ? R.woodDk : R.wood); }
    for (let x = -1; x <= 2; x++) put(main, x0 + x, base, R.stoneDk);
    for (let y = -2; y <= 1; y++) for (let x = -1; x <= 2; x++) put(main, x0 + x, base - 20 + y, (x === -1 || x === 2) ? R.woodDk : R.lamp);
    for (let x = -2; x <= 3; x++) put(main, x0 + x, base - 23, R.roofDk);
  }
  const BRIDGE_X0 = 634, BRIDGE_X1 = 730;
  const bridgeY = (x: number) => Math.round(147 - Math.sin(Math.PI * (x - BRIDGE_X0) / (BRIDGE_X1 - BRIDGE_X0)) * 3);
  function bridge() {
    const x0 = BRIDGE_X0, x1 = BRIDGE_X1;
    const yAt = bridgeY; // gentle arch
    // stone abutments where the deck meets each bank
    for (const [ax, dir] of [[x0, 1], [x1, -1]] as const) {
      for (let i = 0; i < 6; i++) for (let y = yAt(ax) + 2; y < G[ax + dir * i] + 3; y++) put(main, ax + dir * i, y, (y + i) % 3 ? R.stone : R.stoneDk);
    }
    // piers into the river with cross bracing
    const piers = [664, 696];
    for (const px of piers) for (let y = yAt(px) + 2; y < G[px] + 1; y++) { put(main, px, y, R.wood); put(main, px + 1, y, R.woodDk); }
    for (let i = 0; i <= piers[1] - piers[0]; i++) {
      const xa = piers[0] + i, span = piers[1] - piers[0];
      const ya = yAt(xa) + 3 + Math.round((i / span) * 8), yb = yAt(xa) + 11 - Math.round((i / span) * 8);
      put(main, xa, ya, R.woodDk); put(main, xa, yb, R.woodDk);
    }
    // deck: planks with seams and a dark underside, shadow on the water below
    for (let x = x0; x <= x1; x++) {
      const y = yAt(x), seam = (x - x0) % 3 === 0;
      put(main, x, y, seam ? R.woodDk : R.wood);
      put(main, x, y + 1, seam ? R.woodDk : (x & 1 ? R.wood : R.woodDk));
      put(main, x, y + 2, R.trunkDk);
      if (G[x] > WATER) { put(main, x, WATER + 1, R.lakeDeep); put(main, x, WATER + 2, R.lakeDeep); }
    }
    // railing: posts every 8 px, top and middle rails
    for (let x = x0 + 2; x <= x1 - 2; x++) {
      const y = yAt(x);
      if ((x - x0 - 2) % 8 === 0) for (let k = 1; k <= 7; k++) put(main, x, y - k, k === 7 ? R.wood : R.woodDk);
      put(main, x, y - 7, R.wood);
      put(main, x, y - 4, R.woodDk);
    }
  }
  function tentAndFire(tx: number, fx: number) {
    const base = G[tx + 10], ax = tx + 10, ay = base - 19; // front apex
    const bx = ax - 9, by = ay - 3; // back apex: the tent recedes to the left
    // side panel (shade), from the front-left edge back toward the far apex
    // bounded by the back edge, the ridge (above the front apex) and the front-left edge, down to the ground
    const SL = 0.74, backFoot = Math.round(bx - (base - by) * SL);
    for (let y = by; y <= base; y++) {
      const xl = Math.round(bx - (y - by) * SL);
      const xr = y < ay ? Math.round(bx + ((y - by) / (ay - by)) * (ax - bx)) : Math.round(ax - (y - ay) * SL) - 1;
      for (let x = xl; x <= xr; x++) {
        let c = dith(x, y, 0.22) ? R.tent : R.tentDk; // the side away from the light
        if ((x - xl) % 6 === 3) c = R.stripe; // canvas seams running back
        if (x === xl || y === base - 1) c = R.stripe; // back edge and hem
        if (y === base) c = R.tentDk; // where it meets the ground
        put(main, x, y, c);
      }
    }
    // front face: lit canvas with an open door and a folded-back flap
    for (let i = 0; i <= 19; i++) {
      const y = base - i, half = Math.round(i === 0 ? 14 : 14 - i * 0.74);
      for (let x = -half; x <= half; x++) {
        let c = x > half - 2 ? R.tentDk : R.tent;
        const door = i < 13 && Math.abs(x - 1) <= Math.round((13 - i) * 0.42);
        if (door) c = i < 2 ? R.soilDk : R.trunkDk; // dark interior
        if (door && x - 1 > Math.round((13 - i) * 0.42) - 2 && i > 1) c = R.tentDk; // inner shadow edge
        if (x === -half || x === half) c = R.stripe; // edge seams
        if (i === 1 && !door) c = R.stripe; // hem
        put(main, ax + x, y, c);
      }
    }
    for (let i = 2; i < 12; i++) { // flap folded back to the left of the door
      const w = Math.round((12 - i) * 0.5);
      for (let k = 0; k < w; k++) put(main, ax - 4 - Math.round((13 - i) * 0.42) - k, base - i, k === 0 ? R.tentDk : R.tent);
    }
    // ridge pole, guy rope and pegs
    for (let k = 0; k <= 9; k++) put(main, ax - k, ay - Math.round(k / 3), R.woodDk);
    put(main, ax, ay - 1, R.wood); put(main, ax, ay - 2, R.woodDk);
    for (let k = 0; k <= 16; k++) if (k % 2 === 0) put(main, ax + 1 + k, ay + Math.round(k * 1.15), R.pathDk);
    put(main, ax + 17, base, R.woodDk); put(main, ax + 17, base - 1, R.wood);
    put(main, backFoot - 1, base, R.woodDk); put(main, backFoot - 1, base - 1, R.wood);

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
    // ash bed, a ring of stones and two crossed logs
    for (let x = -4; x <= 4; x++) put(main, fx + x, fb, x % 2 ? R.rockDk : R.soilDk);
    for (const [sx, sy] of [[-7, 0], [-5, -1], [5, -1], [7, 0], [-6, 1], [6, 1], [-2, 1], [2, 1]]) {
      put(main, fx + sx, fb + sy - 1, R.rockHi); put(main, fx + sx + 1, fb + sy - 1, R.rock);
      put(main, fx + sx, fb + sy, R.rock); put(main, fx + sx + 1, fb + sy, R.rockDk);
    }
    for (let k = -5; k <= 5; k++) { // logs crossing over the pit
      put(main, fx + k, fb - 1 - Math.round((k + 5) * 0.3), k === -5 || k === 5 ? R.wood : R.trunk);
      put(main, fx - k, fb - 1 - Math.round((k + 5) * 0.3), k === -5 || k === 5 ? R.wood : R.trunkDk);
    }
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
  // A giant forest: a darker back row, then huge front trees leaving a clearing for the sword
  for (let x = 452; x < 640; x += 24 + Math.floor(rnd() * 10)) giantTree(x, G[x] - 1, 32 + Math.floor(rnd() * 8), 13 + Math.floor(rnd() * 3), true);
  for (let x = 462; x < 636; x += 30 + Math.floor(rnd() * 12)) {
    if (x > 508 && x < 582) continue; // the clearing
    giantTree(x, G[x] + 1, 26 + Math.floor(rnd() * 6), 14 + Math.floor(rnd() * 4));
  }
  pine(588, G[588] + 1, 40);
  flowers(530, 560, 10);
  bridge();
  house(732, "wood"); house(780, "stone"); house(834, "wood");
  lampPost(771); lampPost(821); lampPost(876);
  broadleaf(893, G[893], 8, 9);
  flowers(720, 900, 26);
  pine(960, G[960], 24); pine(1000, G[1000], 30); pine(1150, G[1150], 22);
  tentAndFire(1032, 1088);
  flowers(900, 1180, 20);

  const SWORD_X = 545, FIRE_X = 1088, TOWER_X = 205;
  const FLAME_CORE = hex("#fff3b0");
  const pathY = (x: number): number => {
    const xi = Math.round(x);
    if (xi < 216) return G[Math.max(0, xi)];
    if (xi < 239) return stairY(xi);
    if (xi < 256) return 150;
    if (xi < 262) return 150 + Math.ceil((xi - 255) * 5 / 6);
    if (xi <= dockEnd) return 155;
    if (xi >= BRIDGE_X0 && xi <= BRIDGE_X1) return bridgeY(xi);
    return G[Math.min(WW - 1, xi)];
  };
  const LINK_FEET = LINK_FRAMES.map((f) => { let b = f.length - 1; while (b > 0 && !/[^.]/.test(f[b])) b--; return b; });

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
  let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, img: ImageData, px32: Uint32Array, fineImg: ImageData, fine32: Uint32Array, W = 0, H = 0, scale = 1;
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
  const walker = { x: TOWER_X - 5, dir: 1, dist: 0, still: -1e9 };
  /** Where the walker's head is on screen (CSS px) and whether he has sat down at the campfire. */
  const hud = { x: 0, y: 0, atFire: false };
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
      if (li === 1) { // a solid bank of valley fog in front of the far range, its top edge rolling slowly
        const haze = pal[R.farHaze], rim = pal[R.farLit], drift = reduce ? 0 : clock * 1.2;
        const mBot = 132 - off;
        for (let x = 0; x < W; x++) {
          const wx = x + camX * 0.3 + drift;
          const top = Math.round(104 - off + noise(wx * 0.03) * 7 + noise(wx * 0.09 + 5) * 2.5);
          for (let y = Math.max(0, top); y < Math.min(H, mBot); y++) px32[y * W + x] = y === top ? rim : haze;
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
    // Reflections: the lake and the river mirror whatever stands above them, rippled and faded with depth
    {
      const sy0 = WATER - off + 18, ox = Math.round(camX);
      const avg = (a: number, b: number) => pack(((a & 255) + (b & 255)) >> 1, (((a >> 8) & 255) + ((b >> 8) & 255)) >> 1, (((a >> 16) & 255) + ((b >> 16) & 255)) >> 1);
      for (let y = sy0 + 1; y < Math.min(H, sy0 + 26); y++) {
        const d = y - sy0, my = sy0 - d;
        if (my < 0) break;
        if (d % 4 === 3) continue; // ripple gaps keep the surface reading as water
        const wobble = reduce ? 0 : Math.round(Math.sin(clock * 2.2 + d * 0.9) * (d > 8 ? 2 : 1));
        for (let x = 0; x < W; x++) {
          const wx = x + ox;
          if (wx < 0 || wx >= WW || G[wx] <= WATER || y >= G[wx] - off + 18) continue;
          if (!dith(x, y, 0.82 - d * 0.03)) continue;
          const sx = Math.min(W - 1, Math.max(0, x + wobble));
          px32[y * W + x] = avg(px32[y * W + x], px32[my * W + sx]);
        }
      }
    }
    // Chimney smoke: soft puffs that rise and lean with the breeze, paler by day, dusky at night
    {
      const nt = night, sc = [Math.round(226 - 112 * nt), Math.round(228 - 112 * nt), Math.round(236 - 96 * nt)];
      for (const [hx, hy] of CHIMNEYS) {
        const cx = hx - Math.round(camX), cy = hy - off + 18;
        if (cx < -20 || cx > W + 20) continue;
        const lit = pack(sc[0], sc[1], sc[2]);
        const shade = pack(Math.round(sc[0] * 0.8), Math.round(sc[1] * 0.8), Math.round(sc[2] * 0.86));
        const SPAN = 36, N = 9; // puffs evenly spaced in age form one continuous column
        for (let i = 0; i < N; i++) {
          const age = ((reduce ? 0 : clock * 4) + i * SPAN / N + hx) % SPAN;
          const px = cx + age * 0.45 + Math.sin(age * 0.22 + (reduce ? 0 : clock * 1.3) + hx) * 1.4, py = cy - age;
          const r = 1 + age / 13, a = age < 20 ? 0.95 : 0.95 * (1 - (age - 20) / (SPAN - 20));
          for (let dy = -Math.ceil(r); dy <= Math.ceil(r); dy++) for (let dx = -Math.ceil(r); dx <= Math.ceil(r); dx++) {
            const d = Math.hypot(dx, dy); if (d > r) continue;
            const X = Math.round(px + dx), Y = Math.round(py + dy);
            if (X < 0 || X >= W || Y < 0 || Y >= H || !dith(X, Y, a * (1 - 0.35 * d / r))) continue;
            px32[Y * W + X] = dx + dy > r * 0.4 ? shade : lit; // lit from the upper left
          }
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
    // EPX 2× upscale: the world doubles in resolution, smoothing its diagonals the classic way
    const FW = W * 2;
    for (let y = 0; y < H; y++) {
      const r = y * W, ru = (y > 0 ? y - 1 : y) * W, rd = (y < H - 1 ? y + 1 : y) * W, o0 = (y * 2) * FW, o1 = o0 + FW;
      for (let x = 0; x < W; x++) {
        const P = px32[r + x], A = px32[ru + x], D = px32[rd + x];
        const C = px32[r + (x > 0 ? x - 1 : x)], B = px32[r + (x < W - 1 ? x + 1 : x)];
        let p1 = P, p2 = P, p3 = P, p4 = P;
        if (C === A && C !== D && A !== B) p1 = A;
        if (A === B && A !== C && B !== D) p2 = B;
        if (D === C && D !== B && C !== A) p3 = C;
        if (B === D && B !== A && D !== C) p4 = D;
        const o = x * 2;
        fine32[o0 + o] = p1; fine32[o0 + o + 1] = p2; fine32[o1 + o] = p3; fine32[o1 + o + 1] = p4;
      }
    }
    // The sword in its pedestal, on the fine grid so it stands half again the walker's height
    {
      const sw = SWORD_ROWS[0].length, sh = SWORD_ROWS.length, FH = H * 2;
      const cx = Math.round((SWORD_X - camX) * 2), bottom = (G[SWORD_X] + 1 - off + 18) * 2 + 1;
      for (let j = 0; j < sh; j++) {
        const y = bottom - sh + 1 + j; if (y < 0 || y >= FH) continue;
        for (let i = 0; i < sw; i++) {
          const ch = SWORD_ROWS[j][i]; if (ch === ".") continue;
          const x = cx - (sw >> 1) + i; if (x < 0 || x >= FW) continue;
          fine32[y * FW + x] = pal[R["sw_" + ch]];
        }
      }
    }
    // The Triforce constellation, on the fine grid: hairline gold lines and four-point stars that twinkle
    if (progress > 0.82 && night > 0.05) {
      const FH = H * 2, u = W < 160 ? 1 : 1.25; // a touch larger on wide screens
      const cx = (W < 160 ? Math.floor(W * 0.55) - 12 : Math.floor(W * 0.74)) * 2;
      const cy = (W < 160 ? Math.floor(H * 0.2) : Math.max(Math.floor(H * 0.07), Math.ceil(66 / scale))) * 2;
      const P = [[24, 0], [0, 40], [48, 40], [12, 20], [36, 20], [24, 40]].map(([x, y]) => [cx + Math.round(x * u), cy + Math.round(y * u)]);
      const blend = (x: number, y: number, rgb: number[], a: number) => {
        if (x < 0 || y < 0 || x >= FW || y >= FH) return;
        const k = y * FW + x, s0 = fine32[k];
        fine32[k] = pack(Math.round((s0 & 255) * (1 - a) + rgb[0] * a), Math.round(((s0 >> 8) & 255) * (1 - a) + rgb[1] * a), Math.round(((s0 >> 16) & 255) * (1 - a) + rgb[2] * a));
      };
      const gold = [212, 178, 92], spark = [255, 244, 196], vis = clamp((night - 0.05) / 0.6);
      for (const [i, j] of [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 3]]) { // Bresenham, one fine pixel wide
        let [x0, y0] = P[i]; const [x1, y1] = P[j];
        const dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1;
        let err = dx + dy;
        for (;;) {
          blend(x0, y0, gold, 0.42 * vis);
          if (x0 === x1 && y0 === y1) break;
          const e2 = 2 * err;
          if (e2 >= dy) { err += dy; x0 += sx; }
          if (e2 <= dx) { err += dx; y0 += sy; }
        }
      }
      const t = reduce ? 0 : clock;
      P.forEach(([x, y], i) => {
        const outer = i < 3, tw = 0.5 + 0.5 * Math.sin(t * 2.2 + i * 1.7);
        const arm = (outer ? 3 : 2) + (tw > 0.6 ? 1 : 0);
        for (let k = 1; k <= arm; k++) {
          const a = vis * (1 - k / (arm + 1)) * 0.95;
          blend(x + k, y, spark, a); blend(x - k, y, spark, a); blend(x, y + k, spark, a); blend(x, y - k, spark, a);
        }
        for (const [dx, dy] of [[1, 1], [-1, 1], [1, -1], [-1, -1]]) blend(x + dx, y + dy, gold, 0.45 * vis);
        blend(x, y, [255, 255, 240], vis);
      });
    }
    // The campfire flame: three flickering tongues on the fine grid, growing as the evening comes
    {
      const FH = H * 2, fx2 = Math.round((FIRE_X - camX) * 2), fb2 = (G[FIRE_X] - 2 - off + 18) * 2;
      const lit = 0.35 + 0.65 * clamp((progress - 0.5) / 0.3);
      const t = reduce ? 0 : clock;
      const tongues = [[-3, 0.7, 1.7], [0, 1, 0], [3, 0.75, 3.1]];
      const core = pack(FLAME_CORE[0], FLAME_CORE[1], FLAME_CORE[2]);
      for (const [ox, k, ph] of tongues) {
        const h = Math.max(3, Math.round((12 + 4 * Math.sin(t * 9 + ph) + 2 * Math.sin(t * 23 + ph * 2)) * k * lit));
        const sway = reduce ? 0 : Math.sin(t * 6 + ph) * 1.2;
        for (let j = 0; j < h; j++) {
          const f = j / h, half = Math.round((1 - f) * (ox === 0 ? 4 : 3));
          const cx = fx2 + ox + Math.round(sway * f * 2);
          for (let i = -half; i <= half; i++) {
            const x = cx + i, y = fb2 - j;
            if (x < 0 || x >= FW || y < 0 || y >= FH) continue;
            const edge = Math.abs(i) === half;
            const c = f > 0.72 ? pal[R.fire1] : edge ? pal[R.fire2] : (f < 0.45 && Math.abs(i) < half - 1 ? core : pal[R.fire0]);
            fine32[y * FW + x] = c;
          }
        }
      }
    }
    // The walker follows the camera along the path, stepping with the scroll, at full resolution
    {
      const lead = Math.min(24, W * focus - 30) * (1 - clamp(progress / 0.05)); // starts a little before the tower
      const target = clamp(camX + W * focus - 14 - lead, 150, FIRE_X - 11); // ends between the tent and the fire
      const moved = target - walker.x;
      if (Math.abs(moved) > 0.3) { walker.dir = moved > 0 ? 1 : -1; walker.dist += Math.abs(moved); walker.still = now; }
      walker.x = target;
      const walking = now - walker.still < 220;
      const f = walking ? Math.floor(walker.dist / 2) % LINK_FRAMES.length : 3;
      const rows = LINK_FRAMES[f], fw = rows[0].length, FH = H * 2;
      const feet = (pathY(walker.x) - off + 18) * 2;
      const sx0 = Math.round((walker.x - camX) * 2) - (fw >> 1), sy0 = feet - 1 - LINK_FEET[f];
      hud.x = (sx0 + fw / 2) * scale / 2; hud.y = sy0 * scale / 2; hud.atFire = progress >= 0.985 && !walking;
      const overWater = G[Math.round(walker.x)] > WATER;
      const wl = (WATER - off + 18) * 2; // water line on the fine grid
      for (let j = 0; j < rows.length; j++) {
        const y = sy0 + j, row = rows[j];
        for (let i = 0; i < fw; i++) {
          const ch = row[walker.dir > 0 ? i : fw - 1 - i];
          if (ch === ".") continue;
          const x = sx0 + i; if (x < 0 || x >= FW) continue;
          const c = pal[R["lk_" + ch]];
          if (y >= 0 && y < FH) fine32[y * FW + x] = c;
          if (overWater) { // his reflection, rippled and faded
            const my = 2 * wl - y + 4;
            const rwx = (x >> 1) + Math.round(camX), rwy = (my >> 1) + off - 18; // world pixel under the reflection
            const isWater = rwx >= 0 && rwx < WW && rwy > WATER && rwy < G[rwx];
            if (isWater && my > wl && my < FH && ((my + x) & 3) !== 0) {
              const k = my * FW + x, s0 = fine32[k];
              fine32[k] = pack(((s0 & 255) + (c & 255)) >> 1, (((s0 >> 8) & 255) + ((c >> 8) & 255)) >> 1, (((s0 >> 16) & 255) + ((c >> 16) & 255)) >> 1);
            }
          }
        }
      }
    }
    ctx.putImageData(fineImg, 0, 0);
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
    const fineScale = Math.max(1, Math.round(vh / 400)); // screen pixels per fine pixel
    scale = fineScale * 2; // screen pixels per world pixel
    W = Math.min(WW, Math.ceil(vw / scale)); H = Math.ceil(vh / scale);
    canvas.width = W * 2; canvas.height = H * 2;
    canvas.style.width = W * scale + "px"; canvas.style.height = H * scale + "px";
    img = ctx.createImageData(W, H);
    px32 = new Uint32Array(img.data.buffer);
    fineImg = ctx.createImageData(W * 2, H * 2);
    fine32 = new Uint32Array(fineImg.data.buffer);
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
    get scale() { return scale; },
    get walker() { return hud; }
  };
