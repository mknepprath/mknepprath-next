export const FILM_PALETTE = [
  { bg: "#e8833a", text: "#2a1400", accent: "#ffecd6" }, // orange
  { bg: "#c9b896", text: "#2a2014", accent: "#f0e8d8" }, // tan
  { bg: "#b898c0", text: "#2a1430", accent: "#f0e0f4" }, // lavender
  { bg: "#7ea888", text: "#0a2014", accent: "#d8f0e0" }, // green
  { bg: "#8abcc8", text: "#0a2030", accent: "#d0eaf0" }, // blue
  { bg: "#d4a04a", text: "#2a1a00", accent: "#f8ecd0" }, // gold
];

export function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
}

export function getFilmColors(id: string) {
  return FILM_PALETTE[hashString(id) % FILM_PALETTE.length];
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(parseInt(n, 10)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

export function clamp(val: number, max: number): number {
  return Math.max(-max, Math.min(max, val));
}
