import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { addCollectionItem, deleteCollectionItem, listCollections } from "./routes/collections";
import { login, verify, requireAuth } from "./routes/auth";
import { createOrder, listOrders } from "./routes/orders";
import { whatsappVerify, whatsappWebhook } from "./routes/whatsapp-webhook";

import { connectMongo } from "./db/mongo";
import { env } from "./env";

export function createServer() {
  const app = express();
  // Kick off Mongo connection (non-blocking if URI missing)
  void connectMongo();

  // Middleware
  app.use(cors());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Example API routes
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "ping";
    res.json({ message: ping });
  });

  app.get("/api/demo", handleDemo);

  // Auth
  app.post("/api/admin/login", login);
  app.get("/api/admin/verify", verify);

  // Collections CRUD
  app.get("/api/collections", listCollections);
  app.post("/api/collections", requireAuth, addCollectionItem);
  app.delete("/api/collections/:id", requireAuth, deleteCollectionItem);

  // Orders
  app.post("/api/orders", createOrder);
  app.get("/api/orders", requireAuth, listOrders);

  // WhatsApp webhook (Meta Cloud API)
  app.get("/api/webhooks/whatsapp", whatsappVerify);
  app.post("/api/webhooks/whatsapp", whatsappWebhook);

  return app;
}
