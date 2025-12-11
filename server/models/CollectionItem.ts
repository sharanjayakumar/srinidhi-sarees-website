import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    category: { type: String, default: "General", trim: true },
    price: { type: Number },
    description: { type: String, default: "" },
    imageUrl: { type: String, required: true },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, bufferCommands: false },
);

schema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc: any, ret: any) => {
    ret.id = ret._id.toString();
    delete ret._id;
    delete ret.updatedAt;
    return ret;
  },
});

export const CollectionItemModel: mongoose.Model<any> =
  (models.CollectionItem as mongoose.Model<any>) || model<any>("CollectionItem", schema);
