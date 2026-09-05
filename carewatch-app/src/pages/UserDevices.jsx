import React from "react";
import { Wifi, WifiOff } from "lucide-react";
import { Card, StatusPill } from "../components";
import { COLORS, uiFont, rowStyle } from "../theme";
import { useT } from "../i18n";

export default function UserDevices({ relative }) {
  const t = useT();
  return (
    <Card>
      <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 14 }}>{t("devicesTitle")} — {relative.name}</div>
      {relative.devices.map(d => (
        <div key={d.id} style={rowStyle}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {d.online ? <Wifi size={16} color={COLORS.teal} /> : <WifiOff size={16} color={COLORS.coral} />}
            <span style={{ fontFamily: uiFont, fontSize: 14, color: COLORS.ink }}>{d.name}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <StatusPill status={d.online ? "normal" : "sos"} />
            <span style={{ fontFamily: uiFont, fontSize: 12, color: d.battery < 20 ? COLORS.coral : COLORS.inkSoft, minWidth: 34, textAlign: "right" }}>{d.battery}%</span>
          </div>
        </div>
      ))}
    </Card>
  );
}

