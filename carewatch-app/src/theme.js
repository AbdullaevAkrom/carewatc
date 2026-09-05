// Design tokens. Values point at CSS variables so the whole app can flip
// light/dark by swapping the variable set on the outer wrapper.
export const COLORS = {
  bg: "var(--cw-bg)",
  card: "var(--cw-card)",
  ink: "var(--cw-ink)",
  inkSoft: "var(--cw-ink-soft)",
  teal: "var(--cw-teal)",
  tealSoft: "var(--cw-teal-soft)",
  amber: "var(--cw-amber)",
  amberSoft: "var(--cw-amber-soft)",
  coral: "var(--cw-coral)",
  coralSoft: "var(--cw-coral-soft)",
  line: "var(--cw-line)",
  navy: "var(--cw-navy)",
};

export const THEME_VARS = {
  light: {
    "--cw-bg": "#F6F3EC", "--cw-card": "#FFFFFF", "--cw-ink": "#20302B",
    "--cw-ink-soft": "#5B685F", "--cw-teal": "#0F6E56", "--cw-teal-soft": "#E1F0EA",
    "--cw-amber": "#C97A2B", "--cw-amber-soft": "#F7E9D6", "--cw-coral": "#C0432B",
    "--cw-coral-soft": "#FBE6E1", "--cw-line": "#E4DFD2", "--cw-navy": "#233B47",
  },
  dark: {
    "--cw-bg": "#141D19", "--cw-card": "#1C2723", "--cw-ink": "#ECEFEA",
    "--cw-ink-soft": "#9AAAA1", "--cw-teal": "#3FCB9C", "--cw-teal-soft": "rgba(63,203,156,0.16)",
    "--cw-amber": "#E7AC65", "--cw-amber-soft": "rgba(231,172,101,0.16)", "--cw-coral": "#E67766",
    "--cw-coral-soft": "rgba(230,119,102,0.18)", "--cw-line": "#2B3733", "--cw-navy": "#0F171C",
  },
};

export const displayFont = "'Fraunces', Georgia, serif";
export const uiFont = "'Inter', 'Segoe UI', sans-serif";

// Small reusable style helpers to avoid repeating the same object everywhere.
export const cardStyle = (extra = {}) => ({
  background: COLORS.card, borderRadius: 18, border: `1px solid ${COLORS.line}`,
  padding: "20px 22px", boxShadow: "0 1px 2px rgba(20,30,25,0.04), 0 8px 24px -12px rgba(20,30,25,0.10)",
  ...extra,
});

export const rowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${COLORS.line}` };
