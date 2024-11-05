export const theme = {
  colors: {
    primary: {
      DEFAULT: "#0284c7",
      foreground: "#ffffff",
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    secondary: {
      DEFAULT: "#6b7280",
      foreground: "#ffffff",
    },
    background: {
      DEFAULT: "#ffffff",
      secondary: "#f9fafb",
    },
    foreground: {
      DEFAULT: "#020817",
      secondary: "#64748b",
    },
    card: {
      DEFAULT: "#ffffff",
      foreground: "#020817",
    },
    border: "#e2e8f0",
    ring: "#0ea5e9",
  },
  fonts: {
    sans: "Inter",
  },
  radii: {
    sm: 4,
    md: 6,
    lg: 8,
    xl: 12,
    "2xl": 16,
    "3xl": 24,
    full: 9999,
  },
  spacing: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    8: 32,
    10: 40,
    12: 48,
    16: 64,
    20: 80,
    24: 96,
  },
};

export const shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
};

export const gradients = {
  primary: ["#0ea5e9", "#0284c7"],
  secondary: ["#6b7280", "#4b5563"],
  accent: ["#8b5cf6", "#6d28d9"],
};
