import { promises as fs } from "fs";
import path from "path";
import crypto from "crypto";
import type { CollectionItemInput, CollectionItem, OrderInput } from "@shared/api";

const __dirname = import.meta.dirname;
const collectionsPath = path.join(__dirname, "collections.json");
const ordersPath = path.join(__dirname, "orders.json");

async function readJson<T>(filePath: string, fallback: T): Promise<T> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    return JSON.parse(data) as T;
  } catch (e: any) {
    if (e?.code === "ENOENT") return fallback;
    return fallback;
  }
}

async function writeJson<T>(filePath: string, data: T): Promise<void> {
  const dir = path.dirname(filePath);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
}

export async function listCollectionsLocal(): Promise<CollectionItem[]> {
  const items = await readJson<CollectionItem[]>(collectionsPath, []);
  return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function addCollectionLocal(input: CollectionItemInput): Promise<CollectionItem> {
  const items = await readJson<CollectionItem[]>(collectionsPath, []);
  const item: CollectionItem = {
    id: crypto.randomUUID(),
    name: input.name,
    category: input.category ?? "General",
    price: typeof input.price === "number" ? input.price : undefined,
    description: input.description ?? "",
    imageUrl: input.imageUrl,
    createdAt: new Date().toISOString(),
  };
  items.unshift(item);
  await writeJson(collectionsPath, items);
  return item;
}

export async function deleteCollectionLocal(id: string): Promise<CollectionItem | null> {
  const items = await readJson<CollectionItem[]>(collectionsPath, []);
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return null;
  const [removed] = items.splice(idx, 1);
  await writeJson(collectionsPath, items);
  return removed;
}

export interface LocalOrder extends OrderInput {
  id: string;
  createdAt: string;
  status?: string;
  waMessageId?: string;
  waStatus?: string;
}

export async function addOrderLocal(input: OrderInput): Promise<LocalOrder> {
  const orders = await readJson<LocalOrder[]>(ordersPath, []);
  const order: LocalOrder = {
    ...input,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    status: "new",
  };
  orders.unshift(order);
  await writeJson(ordersPath, orders);
  return order;
}

export async function listOrdersLocal(): Promise<LocalOrder[]> {
  const orders = await readJson<LocalOrder[]>(ordersPath, []);
  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function updateOrderLocal(id: string, patch: Partial<LocalOrder>): Promise<void> {
  const orders = await readJson<LocalOrder[]>(ordersPath, []);
  const idx = orders.findIndex((x) => x.id === id);
  if (idx === -1) return;
  orders[idx] = { ...orders[idx], ...patch };
  await writeJson(ordersPath, orders);
}
