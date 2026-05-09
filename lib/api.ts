const PROD_BASE = "https://api.niroumandfitness.com";
const DEV_BASE = "http://127.0.0.1:5001";
const PATH_PREFIX = "/api/v1";

function baseUrl(): string {
  const override = process.env.CONTENT_API_URL;
  if (override) return override.replace(/\/$/, "");
  return process.env.NODE_ENV === "production" ? PROD_BASE : DEV_BASE;
}

export function apiUrl(path: string): string {
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl()}${PATH_PREFIX}${suffix}`;
}
