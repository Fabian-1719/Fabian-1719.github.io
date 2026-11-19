/* Small pixel sprites used by the text boxes. One character per pixel, "." is empty. */

export const FAIRY = {
  rows: [".ww.....ww.", "wwww...wwww", "wwwww.wwwww", ".wwwyyywww.", "..yyYYYyy..", ".yyYYWYYyy.", "..yyYYYyy..", "...yyyyy...", "....y.y...."],
  colors: { w: "#bfe3ff", y: "#ffe08f", Y: "#fff3c4", W: "#ffffff" }
};

/** Wax seal with a small Triforce pressed into it. */
export const SEAL = {
  rows: ["...rrrrrr...", ".rrRRRRRRrr.", ".rRRRRRRRRr.", "rRRRRyyRRRRr", "rRRRyyyyRRRr", "rRRyyRRyyRRr", "rRyyyyyyyyRr", "rRRRRRRRRRRr", ".rRRRRRRRRr.", ".rrRRRRRRrr.", "...rrrrrr..."],
  colors: { r: "#8e2a1e", R: "#c8432f", y: "#ffcf5c" }
};

/** Map pin for a quest's place in the world. */
export const PIN = {
  rows: [".rrr.", "rRRRr", "rRwRr", "rRRRr", ".rRr.", "..r.."],
  colors: { r: "#5a1e14", R: "#b23c22", w: "#fff3d0" }
};
