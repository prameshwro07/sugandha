"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { io, type Socket } from "socket.io-client";
import {
  CheckCircle2,
  CircleDollarSign,
  Clock3,
  Loader2,
  LogOut,
  PackageCheck,
  Search,
  XCircle,
  type LucideIcon,
} from "lucide-react";
import { formatPrice } from "@/lib/products";
import type { OrderDto } from "@/lib/orders";
import Link from "next/link";

type Stats = {
  totalOrders: number;
  pendingOrders: number;
  deliveredOrders: number;
  todayRevenue: number;
};

type View = "all" | "today" | "month";
// type StatusFilter = "all" | "Pending" | "Delivered" | "Cancelled";
type StatusFilter =
  | "all"
  | "Pending"
  | "Confirmed"
  | "Packed"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";
type ConfirmState = { order: OrderDto; status: "Delivered" | "Cancelled" } | null;
type FilterState = { view: View; status: StatusFilter; search: string };

const socketUrl = process.env.NEXT_PUBLIC_SOCKET_IO_URL;

const tableHeadings = ["Customer", "Phone", "Email", "Address", "Product", "Price", "Payment", "Date", "Time", "Status", "Action"] as const;

function currentNepalDate() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kathmandu",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

function matchesCurrentFilters(order: OrderDto, filters: FilterState) {
  if (filters.status !== "all" && order.status !== filters.status) {
    return false;
  }

  const today = currentNepalDate();
  if (filters.view === "today" && order.date !== today) {
    return false;
  }

  if (filters.view === "month" && order.date.slice(0, 7) !== today.slice(0, 7)) {
    return false;
  }

  const search = filters.search.trim().toLowerCase();
  if (!search) {
    return true;
  }

  const productNames =
    order.products?.map((p) => p.name).join(" ") ?? order.productName ?? "";

  return [
    order.customerName,
    order.phone,
    order.email,
    order.address,
    productNames,
    order.paymentMethod,
    order.status,
  ].some(
    (value) =>
      typeof value === "string" &&
      value.toLowerCase().includes(search)
  );
}

function applyCreatedOrder(current: OrderDto[], order: OrderDto, filters: FilterState) {
  const withoutDuplicate = current.filter((item) => item.id !== order.id);
  return matchesCurrentFilters(order, filters) ? [order, ...withoutDuplicate] : withoutDuplicate;
}

function applyUpdatedOrder(current: OrderDto[], order: OrderDto, filters: FilterState) {
  const exists = current.some((item) => item.id === order.id);
  if (!matchesCurrentFilters(order, filters)) {
    return exists ? current.filter((item) => item.id !== order.id) : current;
  }

  if (!exists) {
    return [order, ...current];
  }

  return current.map((item) => (item.id === order.id ? order : item));
}

function updateStatsForCreated(current: Stats) {
  return {
    ...current,
    totalOrders: current.totalOrders + 1,
    pendingOrders: current.pendingOrders + 1,
  };
}

function updateStatsForStatusChange(current: Stats, previous: OrderDto | undefined, next: OrderDto) {
  if (!previous || previous.status === next.status) {
    return current;
  }

  const today = currentNepalDate();
  const stats = { ...current };

  if (previous.status === "Pending") stats.pendingOrders -= 1;
  if (next.status === "Pending") stats.pendingOrders += 1;

  if (previous.status === "Delivered") {
    stats.deliveredOrders -= 1;
    if (previous.date === today) stats.todayRevenue -= previous.totalPrice;
  }

  if (next.status === "Delivered") {
    stats.deliveredOrders += 1;
    if (next.date === today) stats.todayRevenue += next.totalPrice;
  }

  return {
    ...stats,
    pendingOrders: Math.max(0, stats.pendingOrders),
    deliveredOrders: Math.max(0, stats.deliveredOrders),
    todayRevenue: Math.max(0, stats.todayRevenue),
  };
}

function statusClassName(status: OrderDto["status"]) {
  if (status === "Delivered") {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }

  if (status === "Cancelled") {
    return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
  }

  return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
}

export function DashboardClient() {
  const router = useRouter();
  const [orders, setOrders] = useState<OrderDto[]>([]);
  const [stats, setStats] = useState<Stats>({
    totalOrders: 0,
    pendingOrders: 0,
    deliveredOrders: 0,
    todayRevenue: 0,
  });
  const [view, setView] = useState<View>("all");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState<ConfirmState>(null);
  const [savingId, setSavingId] = useState("");
  const [liveState, setLiveState] = useState(socketUrl ? "Connecting" : "Socket URL not configured");
  const filtersRef = useRef<FilterState>({ view, status, search });
  const ordersRef = useRef<OrderDto[]>([]);

  useEffect(() => {
    filtersRef.current = { view, status, search };
  }, [search, status, view]);

  useEffect(() => {
    ordersRef.current = orders;
  }, [orders]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setMessage("");
    const params = new URLSearchParams();
    if (view !== "all") params.set("view", view);
    if (status !== "all") params.set("status", status);
    if (search.trim()) params.set("search", search.trim());

    const response = await fetch(`/api/orders?${params.toString()}`, { cache: "no-store" });
    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.message ?? "Could not load orders.");
      return;
    }

    setOrders(result.orders);
    setStats(result.stats);
  }, [search, status, view]);

  useEffect(() => {
    queueMicrotask(() => {
      void loadOrders();
    });
  }, [loadOrders]);

  const handleCreatedOrder = useCallback((order: OrderDto) => {
    const alreadyVisible = ordersRef.current.some((item) => item.id === order.id);
    setOrders((current) => applyCreatedOrder(current, order, filtersRef.current));
    if (!alreadyVisible) {
      setStats((current) => updateStatsForCreated(current));
    }
  }, []);

  const handleUpdatedOrder = useCallback((order: OrderDto) => {
    const previous = ordersRef.current.find((item) => item.id === order.id);
    setOrders((current) => applyUpdatedOrder(current, order, filtersRef.current));
    setStats((current) => updateStatsForStatusChange(current, previous, order));
  }, []);

  useEffect(() => {
    if (!socketUrl) {
      return;
    }

    let socket: Socket | null = null;
    let cancelled = false;

    async function connectSocket() {
      const response = await fetch("/api/owner/socket-token", { method: "POST" });
      const result = await response.json();

      if (!response.ok || cancelled) {
        setLiveState("Socket auth unavailable");
        return;
      }

      socket = io(socketUrl as string, {
        transports: ["websocket"],
        reconnection: true,
        auth: { token: result.token },
      });

      socket.on("connect", () => setLiveState("Live"));
      socket.on("disconnect", () => setLiveState("Reconnecting"));
      socket.on("connect_error", () => setLiveState("Disconnected"));
      socket.on("order:created", handleCreatedOrder);
      socket.on("order:updated", handleUpdatedOrder);
    }

    void connectSocket();

    return () => {
      cancelled = true;
      socket?.disconnect();
    };
  }, [handleCreatedOrder, handleUpdatedOrder]);

  const filteredOrders = useMemo(() => orders, [orders]);

  const openStatusConfirm = useCallback((order: OrderDto, nextStatus: "Delivered" | "Cancelled") => {
    setConfirm({ order, status: nextStatus });
  }, []);

  async function finalizeOrder() {
    if (!confirm) return;
    setSavingId(confirm.order.id);
    setMessage("");

    const response = await fetch(`/api/orders/${confirm.order.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: confirm.status }),
    });
    const result = await response.json();
    setSavingId("");
    setConfirm(null);

    if (!response.ok) {
      setMessage(result.message ?? "Could not update order.");
      return;
    }

    const updatedOrder = result.order as OrderDto;
    const previousOrder = ordersRef.current.find((order) => order.id === updatedOrder.id);
    setOrders((current) => applyUpdatedOrder(current, updatedOrder, filtersRef.current));
    setStats((current) => updateStatsForStatusChange(current, previousOrder, updatedOrder));
  }

  async function logout() {
    await fetch("/api/owner/logout", { method: "POST" });
    router.replace("/owner/login");
    router.refresh();
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-col gap-4 border-b border-sky-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
            <p className="mt-1 text-sm text-slate-500">Realtime status: {liveState}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/owner/contactmessage"
              className="border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 hover:border-sky-500 hover:text-sky-600"
            >
              Contact Messages
            </Link>

            {/* Your existing button */}
            <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-sky-200 bg-white px-4 font-semibold" onClick={logout} type="button">
              <LogOut size={18} aria-hidden="true" />
              Logout
            </button>
          </div>

        </header>

        <section className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Metric icon={PackageCheck} label="Total Orders" value={stats.totalOrders.toString()} />
          <Metric icon={Clock3} label="Pending Orders" value={stats.pendingOrders.toString()} />
          <Metric icon={CheckCircle2} label="Delivered Orders" value={stats.deliveredOrders.toString()} />
          <Metric icon={CircleDollarSign} label="Today's Revenue" value={formatPrice(stats.todayRevenue)} />
        </section>

        <section className="mt-5 flex flex-col gap-3 rounded-lg border border-sky-100 bg-white p-3 shadow-sm lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} aria-hidden="true" />
            <input className="field pl-10" placeholder="Search orders" value={search} onChange={(event) => setSearch(event.target.value)} />
          </label>
          <select className="field lg:w-44" value={view} onChange={(event) => setView(event.target.value as View)}>
            <option value="all">All Orders</option>
            <option value="today">Today&apos;s Orders</option>
            <option value="month">Monthly Orders</option>
          </select>
          <select className="field lg:w-44" value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)}>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Packed">Packed</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </section>

        {message ? <p className="mt-4 rounded-md bg-sky-100 p-3 text-sm font-semibold">{message}</p> : null}

        <OrdersTable loading={loading} orders={filteredOrders} onStatusConfirm={openStatusConfirm} />
      </div>

      {confirm ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4">
          <div className="w-full max-w-md rounded-lg bg-white p-6 text-slate-800 shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <h2 className="text-xl font-bold text-slate-900">Confirm status change</h2>
            <p className="mt-3 leading-6">
              {confirm.status === "Delivered"
                ? "Are you sure you want to mark this order as Delivered?"
                : "Are you sure you want to cancel this order?"}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button className="min-h-11 rounded-md border border-sky-200 font-semibold" onClick={() => setConfirm(null)} type="button">No</button>
              <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-sky-400 px-4 font-bold text-slate-950" onClick={finalizeOrder} type="button">
                {savingId ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : null}
                {confirm.status === "Delivered" ? "Yes, Mark Delivered" : "Yes, Cancel Order"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

const OrdersTable = memo(function OrdersTable({
  loading,
  orders,
  onStatusConfirm,
}: {
  loading: boolean;
  orders: OrderDto[];
  onStatusConfirm: (order: OrderDto, status: "Delivered" | "Cancelled") => void;
}) {
  return (
    <section className="mt-5 overflow-hidden rounded-lg border border-sky-100 bg-white shadow-sm">
      {loading ? (
        <div className="flex min-h-56 items-center justify-center gap-2 text-slate-500">
          <Loader2 className="animate-spin" size={22} aria-hidden="true" />
          Loading orders
        </div>
      ) : (
        <div className="max-h-[calc(100vh-21rem)] overflow-auto scroll-smooth">
          <table className="w-full min-w-[1180px] table-fixed text-left text-[0.8125rem]">
            <colgroup>
              <col className="w-40" />
              <col className="w-30" />
              <col className="w-40" />
              <col className="w-40" />
              <col className="w-52" />
              <col className="w-24" />
              <col className="w-24" />
              <col className="w-28" />
              <col className="w-24" />
              <col className="w-28" />
              <col className="w-44" />
            </colgroup>
            <thead className="sticky top-0 z-10 bg-slate-900 text-slate-50 shadow-sm">
              <tr>
                {tableHeadings.map((heading) => (
                  <th
                    key={heading}
                    className="px-3 py-2.5 text-left text-xs font-bold uppercase tracking-wide"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-sky-50">
              {orders.map((order) => (
                <OrderRow key={order.id} order={order} onStatusConfirm={onStatusConfirm} />
              ))}
              {!orders.length ? (
                <tr>
                  <td className="px-4 py-10 text-center text-slate-500" colSpan={tableHeadings.length}>No orders found.</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
});

const OrderRow = memo(function OrderRow({
  order,
  onStatusConfirm,
}: {
  order: OrderDto;
  onStatusConfirm: (order: OrderDto, status: "Delivered" | "Cancelled") => void;
}) {
  const paymentLabel = order.paymentMethod === "esewa" ? "eSewa" : "COD";

  return (
    <tr className="h-14 align-middle transition-colors hover:bg-sky-50/45">
      <td className="px-3 py-2.5 font-semibold text-slate-900">
        <div className="truncate" title={order.customerName}>{order.customerName}</div>
        <div className="mt-0.5 truncate text-[0.7rem] font-medium text-slate-400" title={order.id}>#{order.id.slice(-6)}</div>
      </td>
      <td className="px-3 py-2.5 text-slate-700">
        <div className="truncate" title={order.phone}>{order.phone}</div>
      </td>
      <td className="px-3 py-2.5 text-slate-700">
        <div className="max-w-36 truncate" title={order.email}>{order.email}</div>
      </td>
      <td className="px-3 py-2.5 text-slate-700">
        <div className="line-clamp-2 leading-5" title={order.address}>{order.address}</div>
      </td>
      <td className="px-3 py-2.5">
        <div className="space-y-1">
          {order.products?.length ? (
            order.products.map((product) => (
              <div key={product.id} className="text-sm">
                <span className="font-medium">
                  {product.name}
                </span>

                <span className="ml-2 text-slate-500">
                  × {product.quantity}
                </span>
              </div>
            ))
          ) : (
            <span>{order.productName}</span>
          )}
        </div>
      </td>
      <td className="px-3 py-2.5 font-semibold text-slate-900">{formatPrice(order.totalPrice)}</td>
      <td className="px-3 py-2.5 text-slate-700">{paymentLabel}</td>
      <td className="px-3 py-2.5 text-slate-700">{order.date}</td>
      <td className="px-3 py-2.5 text-slate-700">{order.time}</td>
      <td className="px-3 py-2.5">
        <span className={`inline-flex min-h-7 items-center rounded-md px-2 text-xs font-bold ${statusClassName(order.status)}`}>{order.status}</span>
      </td>
      <td className="px-3 py-2.5">
        {order.status === "Pending" ? (
          <div className="flex gap-1.5">
            <button className="status-button" onClick={() => onStatusConfirm(order, "Delivered")} type="button">
              <CheckCircle2 size={15} aria-hidden="true" />
              Delivered
            </button>
            <button className="status-button" onClick={() => onStatusConfirm(order, "Cancelled")} type="button">
              <XCircle size={15} aria-hidden="true" />
              Cancel
            </button>
          </div>
        ) : (
          <span className="text-xs font-semibold text-slate-500">Locked</span>
        )}
      </td>
    </tr>
  );
});

const Metric = memo(function Metric({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="rounded-lg border border-sky-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 text-sky-500">
        <Icon size={21} aria-hidden="true" />
        <p className="text-sm font-semibold text-slate-500">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
});
