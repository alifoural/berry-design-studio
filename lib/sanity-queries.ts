import { getDocuments } from "./sanity";

export interface SanityPost {
  _id: string;
  _type: "post";
  slug: { current: string };
  title: string;
  excerpt?: string;
  publishedAt?: string;
  tags?: string[];
}

export interface SanityProject {
  _id: string;
  _type: "project";
  slug: { current: string };
  title: string;
  description?: string;
  year?: string;
  tag?: string;
  color?: string;
}

export async function getPosts(): Promise<SanityPost[]> {
  return getDocuments<SanityPost[]>(
    `*[_type == "post"] | order(publishedAt desc) {
      _id, _type, slug, title, excerpt, publishedAt, tags
    }`
  );
}

export async function getProjects(): Promise<SanityProject[]> {
  return getDocuments<SanityProject[]>(
    `*[_type == "project"] | order(year desc) {
      _id, _type, slug, title, description, year, tag, color
    }`
  );
}
