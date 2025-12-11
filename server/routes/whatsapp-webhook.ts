import type { RequestHandler } from "express";
import { connectMongo } from "../db/mongo";
import { OrderModel } from "../models/Order";
import { updateOrderLocal } from "../data/store";
import { env } from "../env";

export const whatsappVerify: RequestHandler = (req, res) => {
  const mode = req.query["hub.mode"]; // subscribe
  const token = req.query["hub.verify_token"]; // must equal env
  const challenge = req.query["hub.challenge"];
  if (mode === "subscribe" && token === env.WHATSAPP_VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }
  return res.sendStatus(403);
};

export const whatsappWebhook: RequestHandler = async (req, res) => {
  try {
    const ok = await connectMongo();
    const body = req.body as any;
    const entries = body?.entry || [];
    for (const entry of entries) {
      for (const change of entry.changes || []) {
        const statuses = change?.value?.statuses || [];
        for (const st of statuses) {
          const id = st.id as string; // message id
          const status = st.status as string; // sent, delivered, read, failed
          if (id && status) {
            if (ok) await (OrderModel as any).findOneAndUpdate({ waMessageId: id }, { waStatus: status });
            else await updateOrderLocal(id, { waStatus: status });
          }
        }
      }
    }
  } catch {
    // ignore
  }
  res.sendStatus(200);
};
