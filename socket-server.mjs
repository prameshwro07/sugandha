import { createServer } from "node:http";
import nextEnv from "@next/env";
import { jwtVerify } from "jose";
import { Server } from "socket.io";

const { loadEnvConfig } = nextEnv;

loadEnvConfig(process.cwd());

const port = Number(process.env.SOCKET_IO_PORT ?? process.env.PORT ?? 4001);
const ownerSecret = process.env.OWNER_JWT_SECRET;
const serverToken = process.env.SOCKET_IO_SERVER_TOKEN;
const corsOrigin = process.env.SOCKET_IO_CORS_ORIGIN ?? process.env.NEXT_PUBLIC_SITE_URL;

if (!ownerSecret || ownerSecret.length < 32) {
  throw new Error("OWNER_JWT_SECRET must be configured for the socket server.");
}

if (!serverToken) {
  throw new Error("SOCKET_IO_SERVER_TOKEN must be configured for trusted API emits.");
}

const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: corsOrigin ? corsOrigin.split(",") : false,
    methods: ["GET", "POST"],
  },
});

const secretKey = new TextEncoder().encode(ownerSecret);

io.use(async (socket, next) => {
  const token = socket.handshake.auth?.token;

  if (token === serverToken) {
    socket.data.trustedServer = true;
    next();
    return;
  }

  try {
    const { payload } = await jwtVerify(token, secretKey, { audience: "socket" });
    if (payload.role === "owner" && payload.scope === "orders:read") {
      socket.join("owners");
      next();
      return;
    }
  } catch {
    // Fall through to the shared unauthorized error below.
  }

  next(new Error("Unauthorized."));
});

io.on("connection", (socket) => {
  if (!socket.data.trustedServer) {
    return;
  }

  socket.on("order:created", (order, ack) => {
    io.to("owners").emit("order:created", order);
    if (typeof ack === "function") ack();
  });

  socket.on("order:updated", (order, ack) => {
    io.to("owners").emit("order:updated", order);
    if (typeof ack === "function") ack();
  });
});

httpServer.listen(port, () => {
  console.log(`Socket.IO relay listening on ${port}`);
});
