import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import { fileURLToPath } from "url";   // 👈 fix for __dirname in ESM
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// ✅ Polyfill for __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const pathUrl = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (pathUrl.startsWith("/api")) {
      let logLine = `${req.method} ${pathUrl} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  const server = await registerRoutes(app);

  // ✅ Serve widget files from /public
  app.use("/widget.js", express.static(path.join(__dirname, "../public/widget.js")));
  app.use("/widget-styles.css", express.static(path.join(__dirname, "../public/widget-styles.css")));
  app.use("/chatbot-bundle.js", express.static(path.join(__dirname, "../public/chatbot-bundle.js")));

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // only setup vite in dev mode
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Always listen on Render's provided PORT
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen(
    {
      port,
      host: "0.0.0.0",
      reusePort: true,
    },
    () => {
      log(`serving on port ${port}`);
    }
  );
})();
