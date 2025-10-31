import type { CollectionEntry } from "astro:content";

type ContentEntry = CollectionEntry<"pages"> | CollectionEntry<"groups"> | CollectionEntry<"series">;

/**
 * Check if we should show draft content based on the environment
 * @returns true if we're in development mode, false in production
 */
export function shouldShowDrafts(): boolean {
  return import.meta.env.DEV;
}

/**
 * Filter out draft content in production
 * @param entries - Array of content entries
 * @returns Filtered array with drafts removed in production
 */
export function filterDrafts<T extends ContentEntry>(entries: T[]): T[] {
  if (shouldShowDrafts()) {
    return entries;
  }
  return entries.filter(entry => !entry.data.draft);
}

/**
 * Check if a single content entry should be visible
 * @param entry - Content entry to check
 * @returns true if the entry should be visible
 */
export function isVisible(entry: ContentEntry | undefined): boolean {
  if (!entry) return false;
  if (shouldShowDrafts()) return true;
  return !entry.data.draft;
}
