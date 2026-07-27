import { render, screen } from '@testing-library/react';
import { beforeAll, describe, expect, it, vi } from 'vitest';

beforeAll(() => {
  // jsdom lacks these browser APIs used by the landing page components
  window.matchMedia = window.matchMedia ?? ((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }) as MediaQueryList);

  class IO {
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    takeRecords = vi.fn(() => []);
  }
  window.IntersectionObserver = window.IntersectionObserver ?? (IO as unknown as typeof IntersectionObserver);
});

import LandingPage from './LandingPage';
import { useSettingsStore } from '@/stores/settingsStore';

describe('LandingPage', () => {
  it('renders all chapters in English', () => {
    useSettingsStore.setState({ uiLocale: 'en' });
    render(<LandingPage />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/remembers/);
    expect(screen.getAllByText('Chapter I').length).toBeGreaterThan(0);
    expect(screen.getAllByText('Chapter V').length).toBeGreaterThan(0);
    expect(screen.getByText('Touch a name. The lore answers.')).toBeInTheDocument();
    expect(screen.getByText('We sign this in public.')).toBeInTheDocument();
    // Pricing tiers
    expect(screen.getByText('Novelist')).toBeInTheDocument();
    expect(screen.getAllByText('Maestro', { exact: false }).length).toBeGreaterThan(0);
  });

  it('renders in Italian', () => {
    useSettingsStore.setState({ uiLocale: 'it' });
    render(<LandingPage />);
    expect(screen.getAllByText('Capitolo I').length).toBeGreaterThan(0);
    expect(screen.getByText('Sfiora un nome. La lore risponde.')).toBeInTheDocument();
    expect(screen.getByText('La pagina bianca ti aspetta.')).toBeInTheDocument();
  });
});
