import path from "path";
import { fileURLToPath } from "url";

// Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import fs from "fs";

// Now use it
const filePath = path.join(__dirname, "..", "uploads", "file-HP1754655073509-194503237.jpg");

fs.stat(filePath, (err, stats) => {
  if (err) {
    console.error("❌ File not found or permission issue");
  } else {
    console.log("✅ File size:", stats.size, "bytes");
  }
});
