import React from "react";
import { AlertTriangle } from "lucide-react";
import { Card, StatusPill } from "../components";
import { COLORS, uiFont, rowStyle } from "../theme";
import { useT } from "../i18n";

export default function Alerts({ alerts, onResolve }) {
  const t = useT();
  return (
    <Card>
      <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>{t("allAlerts")}</div>
      {alerts.map(a => (
        <div key={a.id} style={rowStyle}>
          <div style={{ display: "flex", gap: 10 }}>
            <AlertTriangle size={15} color={a.resolved ? COLORS.inkSoft : COLORS.coral} style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.ink }}>{a.type}</div>
              <div style={{ fontFamily: uiFont, fontSize: 11, color: COLORS.inkSoft }}>{a.family} · {a.time}</div>
            </div>
          </div>
          {a.resolved
            ? <StatusPill status="normal" />
            : <button onClick={() => onResolve(a.id)} style={{ fontFamily: uiFont, fontSize: 12, fontWeight: 700, color: "#fff", background: COLORS.coral, border: "none", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
                {t("resolveClose")}
              </button>}
        </div>
      ))}
    </Card>
  );
}

