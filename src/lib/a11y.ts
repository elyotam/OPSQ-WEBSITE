// Accessibility widget state: what the visitor turned on, and the <html> classes that express it.
// The same classes are re-applied by an inline script in the layout before first paint.

export type CursorMode = 0 | 1 | 2; // off · big · big high-contrast

export type A11yState = {
  fontStep: number; // 0–3 → 100% / 110% / 120% / 130%
  spacing: boolean;
  contrast: boolean;
  invert: boolean;
  grayscale: boolean;
  links: boolean;
  headings: boolean;
  readable: boolean;
  noMotion: boolean;
  mask: boolean;
  targets: boolean;
  cursor: CursorMode;
};

export const A11Y_DEFAULTS: A11yState = {
  fontStep: 0,
  spacing: false,
  contrast: false,
  invert: false,
  grayscale: false,
  links: false,
  headings: false,
  readable: false,
  noMotion: false,
  mask: false,
  targets: false,
  cursor: 0,
};

export const A11Y_STORAGE_KEY = "opsq-a11y";
/** Classes only, read by the pre-paint script in the layout. */
export const A11Y_CLASSES_KEY = "opsq-a11y-classes";
export const FONT_STEPS = [100, 110, 120, 130];

// Contact details shown in the accessibility summary. Empty values are hidden.
export const A11Y_CONTACT = {
  brand: "OpsQ",
  phone: "",
  email: "",
  updated: "2026-09-24",
};

export function a11yClasses(s: A11yState): string[] {
  const c: string[] = [];
  if (s.fontStep > 0) c.push(`a11y-fs-${s.fontStep}`);
  if (s.spacing) c.push("a11y-spacing");
  if (s.contrast) c.push("a11y-contrast");
  if (s.invert) c.push("a11y-invert");
  if (s.grayscale) c.push("a11y-gray");
  if (s.contrast || s.invert || s.grayscale) c.push("a11y-filter");
  if (s.links) c.push("a11y-links");
  if (s.headings) c.push("a11y-headings");
  if (s.readable) c.push("a11y-readable");
  if (s.noMotion) c.push("a11y-no-motion");
  if (s.targets) c.push("a11y-targets");
  if (s.cursor === 1) c.push("a11y-cursor");
  if (s.cursor === 2) c.push("a11y-cursor-dark");
  return c;
}

const ALL_CLASSES = [
  "a11y-fs-1", "a11y-fs-2", "a11y-fs-3", "a11y-spacing", "a11y-contrast", "a11y-invert", "a11y-gray",
  "a11y-filter", "a11y-links", "a11y-headings", "a11y-readable", "a11y-no-motion", "a11y-targets",
  "a11y-cursor", "a11y-cursor-dark",
];

export function applyA11y(s: A11yState) {
  const root = document.documentElement;
  root.classList.remove(...ALL_CLASSES);
  root.classList.add(...a11yClasses(s));
  // Lets animated parts of the page react right away (e.g. stop or resume when motion is toggled).
  window.dispatchEvent(new Event(A11Y_EVENT));
}

export const A11Y_EVENT = "opsq-a11y-change";

export function loadA11y(): A11yState {
  try {
    const raw = localStorage.getItem(A11Y_STORAGE_KEY);
    return raw ? { ...A11Y_DEFAULTS, ...JSON.parse(raw) } : A11Y_DEFAULTS;
  } catch {
    return A11Y_DEFAULTS;
  }
}

export function saveA11y(s: A11yState) {
  try {
    localStorage.setItem(A11Y_STORAGE_KEY, JSON.stringify(s));
    localStorage.setItem(A11Y_CLASSES_KEY, a11yClasses(s).join(" "));
  } catch {
    /* storage can be blocked (private mode); settings then last for this visit only */
  }
}

export function clearA11y() {
  try {
    localStorage.removeItem(A11Y_STORAGE_KEY);
    localStorage.removeItem(A11Y_CLASSES_KEY);
  } catch {
    /* ignore */
  }
}

/** True when the OS asks for reduced motion or the visitor stopped animations in the widget. */
export function prefersReducedMotion() {
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.classList.contains("a11y-no-motion")
  );
}
