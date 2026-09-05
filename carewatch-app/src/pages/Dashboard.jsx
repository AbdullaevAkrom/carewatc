import React, { useMemo, useState } from "react";
import { Activity, Bell, Home, LogOut, Radio, Settings as SettingsIcon, Shield, Users } from "lucide-react";
import { NavItem, ThemeToggle } from "../components";
import { COLORS, THEME_VARS, displayFont, uiFont } from "../theme";
import { relatives, initialAlerts } from "../data";
import { useT } from "../i18n";
import AdminHome from "./AdminHome";
import Families from "./Families";
import Devices from "./Devices";
import Alerts from "./Alerts";
import UserHome from "./UserHome";
import Activity_ from "./Activity";
import UserDevices from "./UserDevices";
import Settings from "./Settings";

export default function Dashboard({ role, familyId, onLogout, isDark, onToggleTheme }) {
  const t = useT();
  const [navItem, setNavItem] = useState("dashboard");
  const [alerts, setAlerts] = useState(initialAlerts);
  const themeVars = isDark ? THEME_VARS.dark : THEME_VARS.light;
  const myRelative = role === "user" ? (relatives.find(r => r.id === familyId) || relatives[0]) : null;
  const resolveAlert = (id) => setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));

  const adminNav = [
    { key: "dashboard", label: t("navOverview"), icon: Home },
    { key: "families", label: t("navFamilies"), icon: Users },
    { key: "devices", label: t("navDevices"), icon: Radio },
    { key: "alerts", label: t("navAlerts"), icon: Bell },
    { key: "settings", label: t("navSettings"), icon: SettingsIcon },
  ];
  const userNav = [
    { key: "dashboard", label: t("navHome"), icon: Home },
    { key: "activity", label: t("navActivity"), icon: Activity },
    { key: "devices", label: t("navDevices"), icon: Radio },
    { key: "settings", label: t("navSettings"), icon: SettingsIcon },
  ];
  const navItems = useMemo(() => role === "admin" ? adminNav : userNav, [role, t]);

  const titles = role === "admin"
    ? {
      dashboard: [t("titleAdminDashboard"), t("subAdminDashboard")],
      families: [t("titleFamilies"), t("subFamilies")],
      devices: [t("titleDevicesAdmin"), t("subDevicesAdmin")],
      alerts: [t("titleAlerts"), t("subAlerts")],
      settings: [t("titleSettings"), t("subSettingsAdmin")],
    }
    : {
      dashboard: [t("titleUserDashboard"), `${t("subUserDashboard")} ${myRelative.name}`],
      activity: [t("titleActivity"), `${t("subActivity")} ${myRelative.name}`],
      devices: [t("titleUserDevices"), `${t("subUserDevices")} ${myRelative.name}`],
      settings: [t("titleSettings"), t("subSettingsUser")],
    };
  const [title, subtitle] = titles[navItem] || titles.dashboard;

  const renderPage = () => {
    if (role === "admin") {
      if (navItem === "families") return <Families />;
      if (navItem === "devices") return <Devices />;
      if (navItem === "alerts") return <Alerts alerts={alerts} onResolve={resolveAlert} />;
      if (navItem === "settings") return <Settings role="admin" />;
      return <AdminHome alerts={alerts} onResolve={resolveAlert} />;
    }
    if (navItem === "activity") return <Activity_ relative={myRelative} />;
    if (navItem === "devices") return <UserDevices relative={myRelative} />;
    if (navItem === "settings") return <Settings role="user" relative={myRelative} />;
    return <UserHome relative={myRelative} />;
  };

  return (
    <div style={{ ...themeVars, display: "flex", minHeight: "100vh", width: "100%", background: COLORS.bg, fontFamily: uiFont }}>
      <div style={{ width: 224, padding: "22px 16px", background: `linear-gradient(160deg, ${COLORS.navy}, color-mix(in srgb, ${COLORS.navy} 78%, black))`, display: "flex", flexDirection: "column", gap: 24, flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", padding: "0 6px" }}>
          <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg, ${COLORS.teal}, color-mix(in srgb, ${COLORS.teal} 40%, black))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={17} color="#fff" />
          </div>
          <span style={{ fontFamily: displayFont, fontSize: 18 }}>ХамфикрCare</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map(n => <NavItem key={n.key} icon={n.icon} label={n.label} active={navItem === n.key} onClick={() => setNavItem(n.key)} />)}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 6px", fontSize: 12, color: "rgba(255,255,255,0.55)", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 14 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.teal}, color-mix(in srgb, ${COLORS.teal} 50%, black))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "#fff", fontWeight: 700 }}>
              {role === "admin" ? "A" : "С"}
            </div>
            {role === "admin" ? t("admin") : t("familyAccount")}
          </div>
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
          <button onClick={onLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", borderRadius: 10, border: "none", cursor: "pointer", background: "transparent", color: "rgba(255,255,255,0.5)", fontFamily: uiFont, fontSize: 13, textAlign: "left" }}>
            <LogOut size={16} /> {t("logout")}
          </button>
        </div>
      </div>

      <div style={{ flex: 1, padding: "26px 30px", overflowY: "auto" }}>
        <div style={{ marginBottom: 22 }}>
          <div style={{ fontFamily: displayFont, fontSize: 25, color: COLORS.ink }}>{title}</div>
          <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.inkSoft, marginTop: 2 }}>{subtitle}</div>
        </div>
        {renderPage()}
      </div>
    </div>
  );
}

