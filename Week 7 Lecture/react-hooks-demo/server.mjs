import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/specialoffers/all", (req, res) => {
    res.json([
        { id: 1, details: "20% off laptops", startDate: "2026-04-01", endDate: "2026-04-30" },
        { id: 2, details: "Buy 1 get 1 free headphones", startDate: "2026-04-10", endDate: "2026-04-25" }
    ]);
});

app.use(express.static(path.join(__dirname, "dist")));

app.get("/*splat", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});