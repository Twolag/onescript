import "dotenv/config";
import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import checkoutRouter from "./routes/checkout.js";
import stripeWebhookRouter from "./routes/stripeWebhook.js";
import ordersRouter from "./routes/orders.js";
import sumupRouter from "./routes/sumup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Stripe webhook needs raw body for signature verification
  app.use(
    "/api/checkout/webhook",
    express.raw({ type: "application/json" }),
    stripeWebhookRouter,
  );

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/checkout", checkoutRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/sumup", sumupRouter);

  app.post("/api/test", (_req, res) => {
    res.json({ success: true, message: "Test route works" });
  });

  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
    console.log(`  - POST /api/checkout/create-checkout-session`);
    console.log(`  - POST /api/checkout/webhook`);
  });
}

startServer().catch(console.error);
