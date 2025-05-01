import { pgTable, text } from "drizzle-orm/pg-core";

export const images = pgTable("images", {
  id: text("id").primaryKey(),
  url: text("url").notNull(),
  processedImageUrl: text("processed_image_url").notNull(),
});
