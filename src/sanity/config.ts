import { env } from "@/lib/env";

export const config = {
  projectId: env.sanity.projectId,
  dataset: env.sanity.dataset,
  apiVersion: env.sanity.apiVersion,
  useCdn: process.env.NODE_ENV === "production",
};
