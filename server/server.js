const express = require("express");
const cors = require("cors");
const pool = require("./db");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 8080;
const { isAdmin } = require("./middleware/auth");


// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());


app.get("/api/menu", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM menu_items");
        res.json(result.rows);

    } catch (err) {
        console.error("Error fetching menu from DB:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch menu items."
        })
    }
});


app.get("/api/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            success: true,
            message: "Connected to postgres successfully!",
            dbTime: result.rows[0].now
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({
            success: false,
            error: "Database connection failed."
        });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})