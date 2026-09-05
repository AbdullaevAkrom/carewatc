import React from "react";
import { Battery, Wifi, WifiOff } from "lucide-react";
import { Card } from "../components";
import { COLORS, uiFont, rowStyle } from "../theme";
import { relatives } from "../data";

export default function Devices() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {relatives.map(r => (
        <Card key={r.family}>
          <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 12 }}>{r.family}</div>
          {r.devices.map(d => (
            <div key={d.id} style={rowStyle}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {d.online ? <Wifi size={15} color={COLORS.teal} /> : <WifiOff size={15} color={COLORS.coral} />}
                <span style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.ink }}>{d.name}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <Battery size={14} color={d.battery < 20 ? COLORS.coral : COLORS.inkSoft} />
                <span style={{ fontFamily: uiFont, fontSize: 12, color: d.battery < 20 ? COLORS.coral : COLORS.inkSoft }}>{d.battery}%</span>
              </div>
            </div>
          ))}
        </Card>
      ))}
    </div>
  );
}
