import { RequestHandler } from "express";
import { CollectionItemInput } from "@shared/api";
import { CollectionItemModel } from "../models/CollectionItem";
import { connectMongo } from "../db/mongo";
import { addCollectionLocal, deleteCollectionLocal, listCollectionsLocal } from "../data/store";

export const listCollections: RequestHandler = async (_req, res) => {
  const ok = await connectMongo();
  if (ok) {
    try {
      const docs = await CollectionItemModel.find({}).sort({ createdAt: -1 }).lean();
      return res.json({ items: docs });
    } catch {
      // fall through to local store
    }
  }
  const items = await listCollectionsLocal();
  return res.json({ items });
};

export const addCollectionItem: RequestHandler = async (req, res) => {
  const ok = await connectMongo();
  const body: CollectionItemInput = req.body;
  if (!body || !body.name || !body.imageUrl) {
    return res.status(400).json({ error: "name and imageUrl are required" });
  }
  if (ok) {
    try {
      const saved = await CollectionItemModel.create({
        name: body.name,
        category: body.category ?? "General",
        price: typeof body.price === "number" ? body.price : undefined,
        description: body.description ?? "",
        imageUrl: body.imageUrl,
      } as any);
      return res.status(201).json({ item: saved.toJSON() });
    } catch {
      // fall through to local store
    }
  }
  const saved = await addCollectionLocal(body);
  return res.status(201).json({ item: saved });
};

export const deleteCollectionItem: RequestHandler = async (req, res) => {
  const ok = await connectMongo();
  const { id } = req.params as { id: string };
  if (ok) {
    try {
      const doc = await CollectionItemModel.findByIdAndDelete(id);
      if (!doc) return res.status(404).json({ error: "Not found" });
      return res.json({ item: doc.toJSON() });
    } catch {
      // fall through to local store
    }
  }
  const removed = await deleteCollectionLocal(id);
  if (!removed) return res.status(404).json({ error: "Not found" });
  return res.json({ item: removed });
};
