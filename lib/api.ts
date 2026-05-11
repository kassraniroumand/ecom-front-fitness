const PROD_BASE = "https://api.niroumandfitness.com";
const PATH_PREFIX = "/api/v1";

function baseUrl(): string {
  const override = process.env.CONTENT_API_URL;
  if (override) return override.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") return PROD_BASE;
  const devBase = process.env.DEV_API_URL;
  if (!devBase) {
    throw new Error("DEV_API_URL is not set. Define it in .env.local.");
  }
  return devBase.replace(/\/$/, "");
}

export function apiUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl()}${PATH_PREFIX}${suffix}`;
}
