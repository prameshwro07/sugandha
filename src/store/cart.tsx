import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/lib/products";
import { toast } from "sonner";

export interface CartItem extends Product {
  quantity: number;
}

interface CartStore {
  items: CartItem[];

  addToCart: (product: Product) => void;

  removeFromCart: (id: string) => void;

  increaseQuantity: (id: string) => void;

  decreaseQuantity: (id: string) => void;

  clearCart: () => void;

  totalItems: () => number;

  totalPrice: () => number;

  setCart: (products: Product[]) => void;

  cartAnimationKey: number;

  triggerCartAnimation: () => void;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      cartAnimationKey: 0,

      triggerCartAnimation: () =>
        set((state) => ({
          cartAnimationKey: state.cartAnimationKey + 1,
        })),

      addToCart: (product) => {
  if (product.stockStatus === "out-of-stock") {
    return;
  }

  set((state) => {
    const existing = state.items.find(
      (item) => item.id === product.id
    );

    if (existing) {
      get().triggerCartAnimation();

      return {
        items: state.items.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        ),
      };
    }

    get().triggerCartAnimation();

    return {
      items: [
        ...state.items,
        {
          ...product,
          quantity: 1,
        },
      ],
    };
  });
},
      removeFromCart: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                ...item,
                quantity: item.quantity + 1,
              }
              : item
          ),
        })),

      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === id
                ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
                : item
            )
            .filter((item) => item.quantity > 0),
        })),

      clearCart: () => set({ items: [] }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),

      totalPrice: () =>
        get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),

      setCart: (products) =>
        set({
          items: products.map((product) => ({
            ...product,
            quantity: 1,
          })),
        }),
    }),


    {
      name: "cart-storage",
    }
  )
);