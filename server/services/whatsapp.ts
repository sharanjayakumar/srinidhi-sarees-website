import type { OrderInput } from "@shared/api";
import { env } from "../env";

export interface WhatsAppSendResult {
  ok: boolean;
  messageId?: string;
  error?: any;
}

export async function sendWhatsappOrder(order: OrderInput): Promise<WhatsAppSendResult> {
  const token = env.WHATSAPP_TOKEN;
  const phoneNumberId = env.WHATSAPP_PHONE_NUMBER_ID;
  const to = env.WHATSAPP_TO_DEFAULT || "917012124919"; // default to order number
  if (!token || !phoneNumberId) {
    return { ok: false, error: "WhatsApp credentials missing" };
  }

  const lines = [
    "New order from Srinidhi Sarees website:",
    `Name: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Address: ${order.address}`,
    order.notes ? `Notes: ${order.notes}` : undefined,
    "",
    "Items:",
    ...order.items.map((l) => `• ${l.name}${typeof l.price === "number" ? ` - ₹${l.price}` : ""} x ${l.qty}`),
  ].filter(Boolean) as string[];

  const res = await fetch(`https://graph.facebook.com/v20.0/${phoneNumberId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: lines.join("\n") },
    }),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    return { ok: false, error: data };
  }
  const messageId: string | undefined = data?.messages?.[0]?.id;
  return { ok: true, messageId };
}
