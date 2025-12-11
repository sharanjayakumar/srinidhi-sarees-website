import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const ItemSchema = new Schema(
  {
    itemId: { type: String, required: true },
    name: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number },
    qty: { type: Number, default: 1 },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    customerName: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    notes: { type: String },
    items: { type: [ItemSchema], required: true },
    status: { type: String, default: "new" },
    waMessageId: { type: String },
    waStatus: { type: String },
  },
  { timestamps: true, bufferCommands: false },
);

OrderSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    return ret;
  },
});

export const OrderModel: mongoose.Model<any> = (models.Order as mongoose.Model<any>) || model<any>("Order", OrderSchema);
