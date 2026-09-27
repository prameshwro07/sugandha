import { z } from "zod";

export const paymentMethods = ["esewa", "cod"] as const;
export const orderStatuses = ["Pending", "Delivered", "Cancelled"] as const;

export const orderCreateSchema = z.object({
  // Multi-product checkout (cart)
  products: z
    .array(
      z.object({
        id: z.string().min(1).max(100),
        name: z.string().min(1).max(200),
        price: z.number().min(0),
        quantity: z.number().min(1).max(50),
        image: z.string().min(1).max(2048).optional(),
      })
    )
    .min(1, "Cart cannot be empty.")
    .max(25, "An order cannot contain more than 25 different items."),

  paymentMethod: z.enum(paymentMethods, {
    error: "Please choose a payment method.",
  }),

  customerName: z.string().trim().min(2, "Enter your full name.").max(120),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9+\-\s()]{7,20}$/, "Enter a valid phone number."),

  // optional email support (checkout UI can keep email optional)
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .trim()
    .toLowerCase()
    .optional(),

  address: z.string().trim().min(8, "Enter your complete delivery address.").max(1000),
});

export const contactMessageSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().min(1).max(254).email(),
  phone: z.string().trim().min(1).max(30),
  subject: z.string().trim().min(1).max(200),
  message: z.string().trim().min(1).max(5000),
});


export const statusUpdateSchema = z.object({
  status: z.enum(["Delivered", "Cancelled"], {
    error: "Choose a final status.",
  }),
});

export const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required."),
  password: z.string().min(1, "Password is required."),
});

export type OrderCreateInput = z.infer<typeof orderCreateSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type PaymentMethod = (typeof paymentMethods)[number];
export type OrderStatus = (typeof orderStatuses)[number];
