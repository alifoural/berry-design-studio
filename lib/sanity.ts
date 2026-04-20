import { createClient } from "@sanity/client";

function getSanityClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "r1uw45l0",
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    apiVersion: "2024-01-01",
    useCdn: true,
  });
}

export async function getDocuments<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  return getSanityClient().fetch(query, params);
}
