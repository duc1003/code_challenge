import "dotenv/config";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import connect from "./config/Connect";
import resourceRoutes from "./routes/Resource.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/resources", resourceRoutes);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;

(async () => {
  try {
    await connect(process.env.MONGODB_URI!);
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  } catch (e) {
    console.error("Failed to start server:", e);
    process.exit(1);
  }
})();
