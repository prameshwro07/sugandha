import type { OrderDocument } from "./models/order";

export type OrderProduct = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string | undefined;
};

export type OrderStatus =
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type OrderDto = {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;

  // Multi-product
  products: OrderProduct[];

  // Compatibility fields for old orders
  productId?: string;
  productName?: string;
  price?: number;
  quantity?: number;

  totalPrice: number;
  paymentMethod: "esewa" | "cod";
  status: OrderStatus;
  date: string;
  time: string;
  timestamp: string;
};

export function serializeOrder(order: OrderDocument): OrderDto {
const products = Array.isArray(order.products)
  ? order.products.map((p) => ({
      id: p.id,
      name: p.name,
      price: typeof p.price === "number" ? p.price : 0,
      quantity: typeof p.quantity === "number" ? p.quantity : 1,
      image: p.images?.[0] ?? undefined,
    }))
  : [];


  const totalPrice =
    typeof order.totalPrice === "number"
      ? order.totalPrice
      : products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return {
    id: order._id.toString(),
    customerName: order.customerName,
    phone: order.phone,
    email: typeof order.email === "string" ? order.email : undefined,
    address: order.address,
    products,

    totalPrice,
    paymentMethod: order.paymentMethod,
    status: order.status,
    date: order.date,
    time: order.time,
    timestamp: order.timestamp.toISOString(),
  };
}


export function orderDateParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const timeFormatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Kathmandu",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formatter.format(date),
    time: timeFormatter.format(date),
    timestamp: date,
  };
}
