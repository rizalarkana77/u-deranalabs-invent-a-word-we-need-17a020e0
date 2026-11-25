// Invent a Word We Need — entry program (Node 22, stdlib only).
// Emits one coined word plus its one-line definition to
// $MAKEFUN_OUTPUT_DIR/entry.txt, checks the bounty gate, then
// re-reads the file and compares it byte-for-byte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "yawncatch";
const DEFINITION = "a yawn you catch from watching someone else yawn";
const ENTRY = `${WORD} (n.) — ${DEFINITION}.`;

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

const saved = readFileSync(outPath, "utf8");

// Gate from the bounty description: one new English word, defined in
// one clear line of at most 140 characters.
if (!/^[a-z]+$/.test(WORD)) {
  throw new Error(`gate failed: coined word "${WORD}" is not a single lowercase token`);
}
if (DEFINITION.length === 0 || DEFINITION.length > 140) {
  throw new Error(`gate failed: definition is ${DEFINITION.length} chars (need 1-140)`);
}
if (saved.includes("\n") || saved.includes("\r")) {
  throw new Error("gate failed: entry must be exactly one line");
}
if (saved.trim().length === 0) {
  throw new Error("gate failed: entry is empty");
}
if (!saved.startsWith(`${WORD} (n.) — `)) {
  throw new Error("gate failed: entry must open with the coined word");
}
if (saved.includes("  ")) {
  throw new Error("gate failed: entry contains a double space");
}
if (!saved.endsWith(".")) {
  throw new Error("gate failed: entry must end with a period");
}
if (saved !== ENTRY) {
  throw new Error("verification failed: file contents differ from the entry");
}
console.log(`word: ${WORD} (${WORD.length} chars)`);
console.log(`definition: ${DEFINITION} (${DEFINITION.length}/140 chars)`);
console.log(`entry verified (${saved.length} chars): ${saved}`);
