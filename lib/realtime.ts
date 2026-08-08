import { io } from "socket.io-client";
import type { OrderDto } from "./orders";

export async function emitOrderEvent(
  event: "order:created" | "order:updated",
  order: OrderDto,
) {
  const url = process.env.SOCKET_IO_SERVER_URL;
  const token = process.env.SOCKET_IO_SERVER_TOKEN;

  if (!url) {
    return;
  }

  await new Promise<void>((resolve) => {
    const socket = io(url, {
      transports: ["websocket"],
      auth: token ? { token } : undefined,
      reconnection: false,
      timeout: 2500,
    });

    const finish = () => {
      socket.disconnect();
      resolve();
    };

    socket.on("connect", () => {
      socket.emit(event, order, finish);
      setTimeout(finish, 1200);
    });
    socket.on("connect_error", finish);
  });
}
