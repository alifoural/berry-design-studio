import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "r1uw45l0",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true,
});

export async function getDocuments<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return sanityClient.fetch(query, params);
}
