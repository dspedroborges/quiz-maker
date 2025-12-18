export function randomInRange(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function normalizeString(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

import katex from "katex";
import "katex/dist/katex.min.css";

export function parseRichText(input: string): string {
  let output = input;

  // Strip bold/italic wrappers around LaTeX blocks (robust)
  output = output.replace(
    /(?:__|\*)\s*(\$[^$]+\$)\s*(?:__|\*)/g,
    "$1"
  );

  // Line breaks
  output = output.replace(/\n/g, "<br />");

  // Inline LaTeX: $...$
  output = output.replace(/\$([^$]+)\$/g, (_, expr) => {
    try {
      return katex.renderToString(expr, {
        throwOnError: false,
        displayMode: false,
      });
    } catch {
      return _;
    }
  });

  // Bold (non-LaTeX only)
  output = output.replace(/\*(?!\$)(.+?)(?<!\$)\*/g, `<span class="font-bold">$1</span>`);

  // Italic (non-LaTeX only)
  output = output.replace(/__(?!\$)(.+?)(?<!\$)__/g, `<span class="italic">$1</span>`);

  return output;
}

export const playSound = (sound: string) => {
  const audio = new Audio(`/sound_effects/${sound}.wav`);
  audio.play();
};