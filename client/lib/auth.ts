let memToken: string | null = null;

export function getToken(): string | null {
  return memToken;
}

export function setToken(token: string) {
  memToken = token;
}

export async function verifyToken(): Promise<boolean> {
  const token = getToken();
  if (!token) return false;
  try {
    const res = await fetch("/api/admin/verify", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = (await res.json()) as { valid: boolean };
    return !!data.valid;
  } catch {
    return false;
  }
}

export function clearToken() {
  memToken = null;
}
