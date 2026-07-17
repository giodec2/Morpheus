import { useEffect } from 'react';

export const SITE_URL = 'https://morpheusink.com';
export const DEFAULT_TITLE = 'Morpheus — AI Co-Writer for Storytellers';
export const DEFAULT_DESCRIPTION =
  'Morpheus is a local-first AI co-writer for novelists and storytellers. Plan worlds, develop characters, and write with AI that learns your voice.';

export interface SeoOptions {
  title?: string;
  description?: string;
  /** Canonical path, e.g. "/faq" */
  path: string;
  /** Optional JSON-LD object injected as application/ld+json for this route */
  jsonLd?: object | null;
}

const JSONLD_ID = 'seo-route-jsonld';

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Per-route SEO: sets document title, meta description, canonical URL,
 * og:url/og:title, and optionally injects a route-specific JSON-LD block.
 * Restores site defaults on unmount.
 */
export function useSeo({ title, description, path, jsonLd }: SeoOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    const url = `${SITE_URL}${path}`;

    document.title = title ?? DEFAULT_TITLE;
    setMeta('name', 'description', description ?? DEFAULT_DESCRIPTION);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:title', title ?? DEFAULT_TITLE);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    const prevCanonical = canonical?.getAttribute('href') ?? null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', url);

    document.getElementById(JSONLD_ID)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = JSONLD_ID;
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      setMeta('name', 'description', DEFAULT_DESCRIPTION);
      setMeta('property', 'og:url', SITE_URL);
      setMeta('property', 'og:title', DEFAULT_TITLE);
      if (prevCanonical !== null) {
        document.head
          .querySelector<HTMLLinkElement>('link[rel="canonical"]')
          ?.setAttribute('href', prevCanonical);
      }
      document.getElementById(JSONLD_ID)?.remove();
    };
  }, [title, description, path, jsonLd]);
}
