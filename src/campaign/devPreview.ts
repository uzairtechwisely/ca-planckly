import "server-only";

export function isDevPreviewEnabled() {
  if (process.env.ENABLE_DEV_PREVIEW_SWITCHER === "true") return true;
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") return true;
  return process.env.NODE_ENV === "development";
}
