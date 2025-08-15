import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { createHireMeTable } from "./model/hiremeModel.js";
import { createTestimonialTable } from "./model/testimonialModel.js";
import { createAdminTable } from "./model/adminModel.js";

import hireRouter from "./routes/hiremeRoute.js";
import testimonialRouter from "./routes/testimonialRoute.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT;
app.use(express.json());

// Serve uploads folder
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
console.log("Serving uploads from: ", path.join(__dirname, "..", "uploads"));

await createHireMeTable();
await createTestimonialTable();
await createAdminTable();

app.use("/api/hires", hireRouter);
app.use("/api/comments", testimonialRouter);
app.use("/api/admin", adminRouter);

app.get("/test-upload", (req, res) => {
  res.sendFile(
    path.join(__dirname, "..", "uploads", "file-HP1754655073509-194503237.jpg")
  );
});

app.get("/", (req, res) => {
  console.log("hello world");
  return res.status(200).json({ message: "Hey harold" });
});

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
});
