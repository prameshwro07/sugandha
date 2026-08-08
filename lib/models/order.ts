import { model, models, Schema, type InferSchemaType } from "mongoose";

const orderSchema = new Schema(
  {
    customerName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, required: false, trim: true, lowercase: true },
    address: { type: String, required: true, trim: true },

    // Multi-product order items
    products: {
      type: [
        {
          id: { type: String, required: true },
          name: { type: String, required: true },
          price: { type: Number, required: true, min: 0 },
          quantity: { type: Number, required: true, min: 1 },
          images: {type: [String], required: true},
        },
      ],
      required: true,
      validate: [(v: unknown[]) => Array.isArray(v) && v.length > 0, "Cart cannot be empty"],
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: { type: String, required: true, enum: ["esewa", "cod"] },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Delivered", "Cancelled"],
      default: "Pending",
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  { timestamps: true },
);


// orderSchema.index({ timestamp: -1 });
// orderSchema.index({ customerName: "text", phone: "text", email: "text", productName: "text" });
orderSchema.index({
  "products.name": "text",
  customerName: "text",
  phone: "text",
  email: "text",
});

export type OrderDocument = InferSchemaType<typeof orderSchema> & {
  _id: { toString(): string };
  createdAt: Date;
  updatedAt: Date;
};

export const OrderModel = models.Order || model("Order", orderSchema);
