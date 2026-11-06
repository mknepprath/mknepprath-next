import { format, parseISO } from "date-fns";

/**
 * Formats an instant in UTC rather than the viewer's zone.
 *
 * Feed timestamps arrive as UTC instants and are rendered on the server, where
 * the zone is always UTC. Formatting them locally produces different text in
 * the browser, which React reports as a hydration error and Cypress fails the
 * page on.
 */
export function formatUTC(value: string | Date, pattern: string): string {
  const date = typeof value === "string" ? parseISO(value) : value;
  const utc = new Date(date.getTime() + date.getTimezoneOffset() * 60_000);
  return format(utc, pattern);
}
