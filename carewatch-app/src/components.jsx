import React, { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { COLORS, cardStyle, displayFont, uiFont } from "./theme";
import { useT } from "./i18n";

export function Card({ children, style }) {
  return <div style={cardStyle(style)}>{children}</div>;
}

export function StatusPill({ status }) {
  const t = useT();
  const map = {
    normal: { bg: COLORS.tealSoft, fg: COLORS.teal, label: t("statusNormal") },
    warning: { bg: COLORS.amberSoft, fg: COLORS.amber, label: t("statusWarning") },
    sos: { bg: COLORS.coralSoft, fg: COLORS.coral, label: t("statusSOS") },
  };
  const s = map[status] || map.normal;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, background: s.bg, color: s.fg,
      fontFamily: uiFont, fontSize: 12, fontWeight: 600, padding: "5px 12px 5px 10px", borderRadius: 999,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%", background: s.fg,
        boxShadow: status === "sos" ? `0 0 0 3px color-mix(in srgb, ${s.fg} 25%, transparent)` : "none",
      }} />
      {s.label}
    </span>
  );
}

export function MetricCard({ icon: Icon, label, value, tone }) {
  const c = tone === "coral" ? COLORS.coral : tone === "amber" ? COLORS.amber : COLORS.teal;
  return (
    <Card style={{ flex: 1, minWidth: 150, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c }} />
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 36, height: 36, borderRadius: 11,
          background: `color-mix(in srgb, ${c} 16%, transparent)`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Icon size={17} color={c} />
        </div>
        <span style={{ fontFamily: uiFont, fontSize: 12.5, color: COLORS.inkSoft }}>{label}</span>
      </div>
      <div style={{ fontFamily: displayFont, fontSize: 29, color: COLORS.ink }}>{value}</div>
    </Card>
  );
}

export function Avatar({ src, name, size = 56, fontSize = 20, status }) {
  const [failed, setFailed] = useState(false);
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("");
  const ringColor = status === "sos" ? COLORS.coral : status === "warning" ? COLORS.amber : COLORS.teal;
  const ring = status ? { boxShadow: `0 0 0 3px ${COLORS.card}, 0 0 0 5px ${ringColor}` } : {};
  if (src && !failed) {
    return <img src={src} alt={name} onError={() => setFailed(true)}
      style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", ...ring }} />;
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: COLORS.tealSoft,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: displayFont, fontSize, color: COLORS.teal, ...ring,
    }}>
      {initials}
    </div>
  );
}

export function NavItem({ icon: Icon, label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      position: "relative", display: "flex", alignItems: "center", gap: 10, width: "100%",
      padding: "10px 14px", borderRadius: 10, border: "none", cursor: "pointer",
      background: active ? "rgba(255,255,255,0.1)" : "transparent",
      color: active ? "#fff" : "rgba(255,255,255,0.55)", fontFamily: uiFont, fontSize: 14, textAlign: "left",
    }}>
      {active && <span style={{ position: "absolute", left: -16, top: "50%", transform: "translateY(-50%)", width: 3, height: 16, borderRadius: 3, background: COLORS.amber }} />}
      <Icon size={17} color={active ? COLORS.amber : "currentColor"} />
      {label}
    </button>
  );
}

export function ThemeToggle({ isDark, onToggle }) {
  const t = useT();
  return (
    <button onClick={onToggle} style={{
      display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10,
      border: "1px solid rgba(255,255,255,0.08)", cursor: "pointer", background: "rgba(255,255,255,0.05)",
      color: "rgba(255,255,255,0.75)", fontFamily: uiFont, fontSize: 13, width: "100%",
    }}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
      {isDark ? t("lightTheme") : t("darkTheme")}
    </button>
  );
}

export function ToggleSwitch({ checked, onChange }) {
  return (
    <button onClick={() => onChange(!checked)} style={{
      width: 40, height: 22, borderRadius: 999, border: "none", cursor: "pointer", padding: 3,
      background: checked ? COLORS.teal : COLORS.line, display: "flex",
      justifyContent: checked ? "flex-end" : "flex-start",
    }}>
      <span style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", display: "block" }} />
    </button>
  );
}

export function SettingsRow({ label, hint, control }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${COLORS.line}` }}>
      <div>
        <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.ink }}>{label}</div>
        {hint && <div style={{ fontFamily: uiFont, fontSize: 11.5, color: COLORS.inkSoft, marginTop: 2 }}>{hint}</div>}
      </div>
      {control}
    </div>
  );
}
