import React, { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Card, SettingsRow, ToggleSwitch, Avatar } from "../components";
import { COLORS, uiFont } from "../theme";
import { useT, useLanguage } from "../i18n";

export default function Settings({ role, relative }) {
  const t = useT();
  const { lang, setLang } = useLanguage();
  const [sosPush, setSosPush] = useState(true);
  const [lowBattery, setLowBattery] = useState(true);
  const [emailDigest, setEmailDigest] = useState(false);
  const [inactivityAlerts, setInactivityAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const save = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };
  const selectStyle = { padding: "6px 10px", borderRadius: 8, border: `1px solid ${COLORS.line}`, background: COLORS.card, color: COLORS.ink, fontFamily: uiFont, fontSize: 12.5 };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, maxWidth: 560 }}>
      {role === "user" && relative && (
        <Card>
          <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>{t("relativeProfile")}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Avatar src={relative.avatar} name={relative.name} size={48} fontSize={16} status={relative.status} />
            <div>
              <div style={{ fontFamily: uiFont, fontSize: 14, color: COLORS.ink, fontWeight: 600 }}>{relative.name}</div>
              <div style={{ fontFamily: uiFont, fontSize: 12, color: COLORS.inkSoft }}>{relative.address}</div>
            </div>
          </div>
        </Card>
      )}

      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 4 }}>{t("notifications")}</div>
        <SettingsRow label={t("notifySOS")} hint={t("notifySOSHint")} control={<ToggleSwitch checked={sosPush} onChange={setSosPush} />} />
        <SettingsRow label={t("notifyInactivity")} hint={t("notifyInactivityHint")} control={<ToggleSwitch checked={inactivityAlerts} onChange={setInactivityAlerts} />} />
        <SettingsRow label={t("notifyBattery")} hint={t("notifyBatteryHint")} control={<ToggleSwitch checked={lowBattery} onChange={setLowBattery} />} />
        <SettingsRow label={t("notifyDigest")} control={<ToggleSwitch checked={emailDigest} onChange={setEmailDigest} />} />
      </Card>

      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 4 }}>{role === "admin" ? t("platform") : t("general")}</div>
        <SettingsRow label={t("uiLanguage")} control={
          <select value={lang} onChange={e => setLang(e.target.value)} style={selectStyle}>
            <option value="ru">Русский</option>
            <option value="uz">Oʻzbekcha</option>
            <option value="en">English</option>
          </select>
        } />
        {role === "admin" && (
          <SettingsRow label={t("pollInterval")} hint={t("pollHint")} control={
            <select defaultValue="60" style={selectStyle}>
              <option value="30">30 сек</option>
              <option value="60">1 мин</option>
              <option value="300">5 мин</option>
            </select>
          } />
        )}
      </Card>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={save} style={{ padding: "10px 20px", borderRadius: 10, border: "none", cursor: "pointer", background: COLORS.teal, color: "#fff", fontFamily: uiFont, fontSize: 13, fontWeight: 700 }}>
          {t("save")}
        </button>
        {saved && <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: uiFont, fontSize: 12.5, color: COLORS.teal }}><CheckCircle2 size={15} /> {t("saved")}</span>}
      </div>
    </div>
  );
}

