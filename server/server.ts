import express, { type Express, type Request, type Response } from 'express';
import cors from "cors";
import pool from "./db.js";
// import { isAdmin } from "./middleware/auth"
import dotenv from "dotenv";
import { uploadRouter } from "./uploadthing.js"
import { createRouteHandler } from 'uploadthing/express';


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