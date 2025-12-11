import { RequestHandler } from "express";
import { connectMongo } from "../db/mongo";
import { OrderModel } from "../models/Order";
import { OrderInput } from "@shared/api";
import { sendWhatsappOrder } from "../services/whatsapp";
import { addOrderLocal, listOrdersLocal, updateOrderLocal } from "../data/store";

export const createOrder: RequestHandler = async (req, res) => {
  const ok = await connectMongo();
  const body = req.body as OrderInput;
  if (!body?.customerName || !body?.phone || !body?.address || !Array.isArray(body.items) || body.items.length === 0) {
    return res.status(400).json({ error: "Invalid order payload" });
  }

  if (ok) {
    try {
      const doc = await OrderModel.create(body as any);

      // Fire and forget WhatsApp
      sendWhatsappOrder(body)
        .then(async (r) => {
          if (r.ok) await OrderModel.findByIdAndUpdate(doc.id, { waMessageId: r.messageId, waStatus: "sent" });
          else await (OrderModel as any).findByIdAndUpdate(doc.id, { waStatus: "failed" });
        })
        .catch(async () => {
          await (OrderModel as any).findByIdAndUpdate(doc.id, { waStatus: "failed" });
        });

      return res.status(201).json({ id: doc.id, success: true });
    } catch {
      // fall through to local
    }
  }

  const local = await addOrderLocal(body);
  // Fire and forget WhatsApp, update local file
  sendWhatsappOrder(body)
    .then(async (r) => {
      if (r.ok) await updateOrderLocal(local.id, { waMessageId: r.messageId, waStatus: "sent" });
      else await updateOrderLocal(local.id, { waStatus: "failed" });
    })
    .catch(async () => {
      await updateOrderLocal(local.id, { waStatus: "failed" });
    });

  return res.status(201).json({ id: local.id, success: true });
};

export const listOrders: RequestHandler = async (_req, res) => {
  const ok = await connectMongo();
  if (ok) {
    try {
      const docs = await OrderModel.find({}).sort({ createdAt: -1 }).lean();
      return res.json({ items: docs });
    } catch {
      // fall through to local store
    }
  }
  const items = await listOrdersLocal();
  return res.json({ items });
};
