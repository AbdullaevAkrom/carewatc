import React from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Clock } from "lucide-react";
import { Card } from "../components";
import { COLORS, uiFont } from "../theme";
import { useT } from "../i18n";

export default function Activity({ relative }) {
  const t = useT();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{t("activityPulse")} — {relative.name}</div>
        <div style={{ fontFamily: uiFont, fontSize: 12, color: COLORS.inkSoft, margin: "4px 0 12px" }}>{t("pulseHint")}</div>
        <div style={{ height: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={relative.activityPulse} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pulseFillBig" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.teal} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={COLORS.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: `1px solid ${COLORS.line}`, background: COLORS.card, color: COLORS.ink }} />
              <Area type="monotone" dataKey="v" stroke={COLORS.teal} strokeWidth={2.5} fill="url(#pulseFillBig)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 12 }}>{t("fullEventsLog")}</div>
        {relative.events.map((e, i) => (
          <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
            <Clock size={14} color={COLORS.inkSoft} style={{ marginTop: 2 }} />
            <div>
              <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.ink }}>{e.text}</div>
              <div style={{ fontFamily: uiFont, fontSize: 11, color: COLORS.inkSoft }}>{e.time}</div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

