import { defineConfig } from "sanity";
import { deskTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { config } from "./src/sanity/config";

export default defineConfig({
  name: "default",
  title: "Shiva Mizani Portfolio",
  projectId: config.projectId,
  dataset: config.dataset,
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  basePath: "/studio",
});
