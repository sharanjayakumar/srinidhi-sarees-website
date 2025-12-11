import type { RequestHandler } from "express";
import crypto from "crypto";
import { env } from "../env";

const SECRET = env.ADMIN_PASSWORD;

function base64url(input: Buffer | string) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function sign(payload: Record<string, any>) {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify(payload));
  const signature = base64url(
    crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest(),
  );
  return `${header}.${body}.${signature}`;
}

function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [header, body, sig] = parts;
  const expected = base64url(
    crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest(),
  );
  if (expected !== sig) return false;
  try {
    const json = JSON.parse(Buffer.from(body, "base64").toString("utf8"));
    if (typeof json.exp === "number" && Date.now() > json.exp) return false;
    return true;
  } catch {
    return false;
  }
}

export const login: RequestHandler = (req, res) => {
  const { password } = req.body as { password?: string };
  if (!password) return res.status(400).json({ error: "Password required" });
  if (password !== SECRET) return res.status(401).json({ error: "Invalid password" });
  const token = sign({ iat: Date.now(), exp: Date.now() + 1000 * 60 * 60 * 24 * 7 });
  res.json({ token });
};

export const verify: RequestHandler = (req, res) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
  res.json({ valid: verifyToken(token) });
};

export const requireAuth: RequestHandler = (req, res, next) => {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : undefined;
  if (!verifyToken(token)) return res.status(401).json({ error: "Unauthorized" });
  next();
};
