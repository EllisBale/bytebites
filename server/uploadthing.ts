import { createUploadthing, type FileRouter } from "uploadthing/express";
import pool from "./db";
const f = createUploadthing();
export const uploadRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({
    image: {
      /**
       * For full list of options and defaults, see the File Route API reference
       * @see https://docs.uploadthing.com/file-routes#route-config
       */
      maxFileSize: "4MB",
      maxFileCount: 1,
    },
  }).onUploadComplete(async (data) => {
    const imageUrl = data.file.url;
    console.log("upload completed", data);

    try {
      await pool.query(
        "INSERT INTO menu_items",
        ["New Item", [imageUrl]]
      );
      console.log("Successfully saved image URL to DB.")
    } catch (err) {
      console.error("DB save failed:", err);
    }
  }),
} satisfies FileRouter;
export type OurFileRouter = typeof uploadRouter;