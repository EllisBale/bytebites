import express, { type Express, type Request, type Response } from 'express';
import cors from "cors";
import pool from "./db.js";
// import { isAdmin } from "./middleware/auth"
import dotenv from "dotenv";
import { uploadRouter } from "./uploadthing.js"
import { createRouteHandler } from 'uploadthing/express';
import { error } from 'console';


dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 8080;


// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173"
}));

app.use(express.json());



 // UploadThing
 app.use(
    "/api/uploadthing",
    createRouteHandler({
        router: uploadRouter
    })
 );


 app.post("/api/menu", async  (req: Request, res: Response) => {
    const { name, price, image_url } = req.body;

    if (!name || !price || !image_url) {
        return res.status(400).json({
            success: false,
            error: "Name, price, and image_url are required.",
        });
    }

    try {
        const result = await pool.query(
            "INSERT INTO menu_items (name, price, image_url) VALUES (£1, £2, £3) RETURNING *",
            [name, price, image_url]
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (err) {
        console.error("Error inserting menu item:", err);
        res.status(500).json({
            success: false,
            error: "Failed to create menu item.",
        });
    }

 });


// Menu
app.get("/api/menu", async (req: Request, res: Response) => {
    try {
        const result = await pool.query("SELECT * FROM menu_items ORDER BY id ASC");
        res.json(result.rows);

    } catch (err) {
        console.error("Error fetching menu from DB:", err);
        res.status(500).json({
            success: false,
            error: "Failed to fetch menu items."
        })
    }
});


// DB test
app.get("/api/test-db", async  (req: Request, res: Response) => {
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
});