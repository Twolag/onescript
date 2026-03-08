import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import checkoutRouter from "./routes/checkout.js";
import ordersRouter from "./routes/orders.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API Routes (AVANT les fichiers statiques)
  app.use("/api/checkout", checkoutRouter);
  app.use("/api/orders", ordersRouter);

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes (APRÈS les API routes)
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  // Error handling middleware (APRÈS tout le reste)
  app.use((err: any, _req: any, res: any, _next: any) => {
    console.error("Error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`[Server] Démarré sur http://localhost:${port}/`);
    console.log(`[Server] Routes API disponibles:`);
    console.log(`  - POST /api/checkout`);
    console.log(`  - POST /api/orders/send-emails`);
  });
}

startServer().catch((err) => {
  console.error("[Server] Erreur au démarrage:", err);
  process.exit(1);
});
