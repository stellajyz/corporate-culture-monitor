import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

// ---------- ResizeObserver polyfill ----------
class ResizeObserver {
  constructor(_callback) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined') {
  window.ResizeObserver = window.ResizeObserver || ResizeObserver;
}
if (typeof global !== 'undefined') {
  // @ts-ignore
  global.ResizeObserver = global.ResizeObserver || ResizeObserver;
}
if (typeof globalThis !== 'undefined') {
  globalThis.ResizeObserver = globalThis.ResizeObserver || ResizeObserver;
}

// ---------- IntersectionObserver polyfill ----------
class IntersectionObserver {
  constructor(_callback, _options) {}
  observe() {}
  unobserve() {}
  disconnect() {}
}

if (typeof window !== 'undefined') {
  window.IntersectionObserver =
    window.IntersectionObserver || IntersectionObserver;
}
if (typeof global !== 'undefined') {
  // @ts-ignore
  global.IntersectionObserver =
    global.IntersectionObserver || IntersectionObserver;
}
if (typeof globalThis !== 'undefined') {
  globalThis.IntersectionObserver =
    globalThis.IntersectionObserver || IntersectionObserver;
}

// ---------- Mock fetch ----------
const mockFetch = vi.fn(async (_url, _options) => {
  return {
    ok: true,
    status: 200,
    json: async () => ([]),
    text: async () => '',
  };
});

if (typeof globalThis !== 'undefined') {
  // @ts-ignore
  globalThis.fetch = mockFetch;
}
