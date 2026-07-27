import { useEffect, useMemo, useState } from 'react';
import type { DemoSegment } from './demoScript';

interface UseTypewriterOptions {
  /** Milliseconds per character. */
  msPerChar?: number;
  /** Pause before restarting when loop is true. */
  loopPauseMs?: number;
  loop?: boolean;
}

export interface VisibleSegment {
  text: string;
  entity?: string;
}

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Types out a list of text segments character by character.
 * Returns per-segment visible text (so callers can style entity spans),
 * the entity currently being typed, and whether typing finished.
 * With prefers-reduced-motion everything is returned fully typed.
 */
export function useTypewriter(
  segments: DemoSegment[],
  { msPerChar = 34, loopPauseMs = 5000, loop = true }: UseTypewriterOptions = {}
) {
  const totalChars = useMemo(
    () => segments.reduce((sum, s) => sum + s.text.length, 0),
    [segments]
  );

  const initialCount = () => (prefersReducedMotion() ? totalChars : 0);
  const [state, setState] = useState<{ segments: DemoSegment[]; charCount: number }>(() => ({
    segments,
    charCount: initialCount(),
  }));

  // Restart when the script changes (locale switch, genre pick) — render-time
  // adjustment, the React-endorsed alternative to a reset effect.
  if (state.segments !== segments) {
    setState({ segments, charCount: initialCount() });
  }
  const charCount = state.segments === segments ? state.charCount : 0;

  useEffect(() => {
    if (charCount >= totalChars) {
      if (!loop || prefersReducedMotion()) return;
      const pause = setTimeout(
        () => setState({ segments, charCount: 0 }),
        loopPauseMs
      );
      return () => clearTimeout(pause);
    }
    const tick = setTimeout(
      () => setState((s) => ({ segments, charCount: s.charCount + 1 })),
      msPerChar
    );
    return () => clearTimeout(tick);
  }, [charCount, totalChars, msPerChar, loop, loopPauseMs, segments]);

  const { visible, activeEntity } = useMemo(() => {
    let remaining = charCount;
    let active: string | undefined;
    const out: VisibleSegment[] = [];
    for (const seg of segments) {
      if (remaining <= 0) break;
      const take = Math.min(seg.text.length, remaining);
      out.push({ text: seg.text.slice(0, take), entity: seg.entity });
      remaining -= take;
      // The entity being typed (or most recently typed) stays lit
      if (seg.entity) active = seg.entity;
    }
    return { visible: out, activeEntity: active };
  }, [segments, charCount]);

  return {
    visible,
    activeEntity,
    done: charCount >= totalChars,
    fullText: segments.map((s) => s.text).join(''),
  };
}
