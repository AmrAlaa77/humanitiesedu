/**
 * Shared reel data + localStorage persistence.
 * The Showcase grid reads from here; the /admin page writes here.
 */
export type MediaType = 'mp4' | 'youtube' | 'vimeo';

export interface Reel {
  id: number;
  title: string;
  cat: string;
  duration: string;
  views: string;
  type: MediaType;
  src: string; // direct .mp4 URL, or YouTube/Vimeo video ID
  poster: string; // thumbnail image URL
}

export const REEL_CATEGORIES = ['Explainer', 'Tech', 'Health', 'Lifestyle'] as const;

const STORAGE_KEY = 'humantic_reels_v2';

/**
 * Default reels shipped with the site.
 * Cleared per request — a single video will be added soon via /admin.
 */
export const defaultReels: Reel[] = [];

export function loadReels(): Reel[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultReels;
    const parsed = JSON.parse(raw) as Reel[];
    if (!Array.isArray(parsed) || parsed.length === 0) return defaultReels;
    return parsed;
  } catch {
    return defaultReels;
  }
}

export function saveReels(reels: Reel[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reels));
  // notify listeners in the same tab
  window.dispatchEvent(new Event('humantic-reels-updated'));
}

export function resetReels(): void {
  localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event('humantic-reels-updated'));
}

/** Best-effort detection of media type + normalized src from a pasted URL/ID. */
export function detectMedia(input: string): { type: MediaType; src: string } {
  const v = input.trim();
  const yt = v.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/);
  if (yt) return { type: 'youtube', src: yt[1] };
  const vimeo = v.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return { type: 'vimeo', src: vimeo[1] };
  if (/\.mp4($|\?)/i.test(v) || /^https?:\/\//i.test(v)) return { type: 'mp4', src: v };
  if (/^\d+$/.test(v)) return { type: 'vimeo', src: v }; // numeric -> vimeo id
  if (/^[\w-]{11}$/.test(v)) return { type: 'youtube', src: v }; // 11 char -> youtube id
  return { type: 'mp4', src: v };
}
