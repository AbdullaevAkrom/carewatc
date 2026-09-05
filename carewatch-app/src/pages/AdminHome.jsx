import React from "react";
import { AlertTriangle, CheckCircle2, Cpu, Users } from "lucide-react";
import { Card, MetricCard } from "../components";
import { COLORS, uiFont, rowStyle } from "../theme";
import { allUsers, deviceFleet } from "../data";
import { useT } from "../i18n";

export default function AdminHome({ alerts, onResolve }) {
  const t = useT();
  const onlineDevices = deviceFleet.filter(d => d.online).length;
  const openAlerts = alerts.filter(a => !a.resolved).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <MetricCard icon={Users} label={t("familiesOnCount")} value={allUsers.length} />
        <MetricCard icon={Cpu} label={t("devicesOnline")} value={`${onlineDevices}/${deviceFleet.length}`} />
        <MetricCard icon={AlertTriangle} label={t("openAlertsCount")} value={openAlerts} tone={openAlerts ? "coral" : "teal"} />
      </div>

      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>{t("recentAlerts")}</div>
        {alerts.slice(0, 5).map(a => (
          <div key={a.id} style={rowStyle}>
            <div style={{ display: "flex", gap: 10 }}>
              <AlertTriangle size={14} color={a.resolved ? COLORS.inkSoft : COLORS.coral} style={{ marginTop: 2 }} />
              <div>
                <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.ink }}>{a.type}</div>
                <div style={{ fontFamily: uiFont, fontSize: 11, color: COLORS.inkSoft }}>{a.family} · {a.time}</div>
              </div>
            </div>
            {a.resolved
              ? <CheckCircle2 size={16} color={COLORS.teal} />
              : <button onClick={() => onResolve(a.id)} style={{ fontFamily: uiFont, fontSize: 11, color: COLORS.coral, fontWeight: 600, background: "none", border: "none", cursor: "pointer" }}>{t("resolveOpen")}</button>}
          </div>
        ))}
      </Card>
    </div>
  );
}

