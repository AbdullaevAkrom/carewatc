import React, { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Activity, AlertTriangle, Battery, ChevronRight, Clock, Cpu, Heart, MapPin, PhoneCall, PhoneOff, Video, Wifi, WifiOff } from "lucide-react";
import { Card, MetricCard, StatusPill, Avatar } from "../components";
import { COLORS, displayFont, uiFont, rowStyle } from "../theme";
import { useT } from "../i18n";

export default function UserHome({ relative, onBack }) {
  const t = useT();
  const [callOpen, setCallOpen] = useState(false);
  const isSOS = relative.status === "sos";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      {onBack && (
        <button onClick={onBack} style={{ display: "flex", alignItems: "center", gap: 6, alignSelf: "flex-start", background: "none", border: "none", cursor: "pointer", color: COLORS.inkSoft, fontFamily: uiFont, fontSize: 13 }}>
          <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} /> {t("backToFamilies")}
        </button>
      )}

      {isSOS && (
        <div style={{ background: COLORS.coral, color: "#fff", borderRadius: 16, padding: "18px 22px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <AlertTriangle size={22} />
            <div>
              <div style={{ fontFamily: uiFont, fontWeight: 700 }}>{t("sosFrom")} {relative.name}</div>
              <div style={{ fontFamily: uiFont, fontSize: 13, opacity: 0.9 }}>{t("sosHint")}</div>
            </div>
          </div>
          <button onClick={() => setCallOpen(true)} style={{ background: "#fff", color: COLORS.coral, border: "none", borderRadius: 10, padding: "10px 18px", fontFamily: uiFont, fontWeight: 700, cursor: "pointer", display: "flex", gap: 8 }}>
            <Video size={16} /> {t("answer")}
          </button>
        </div>
      )}

      <Card>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
          <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
            <Avatar src={relative.avatar} name={relative.name} status={relative.status} />
            <div>
              <div style={{ fontFamily: displayFont, fontSize: 22, color: COLORS.ink }}>{relative.name}</div>
              <div style={{ fontFamily: uiFont, fontSize: 13, color: COLORS.inkSoft, display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                <MapPin size={13} /> {relative.address}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <StatusPill status={relative.status} />
            <button onClick={() => setCallOpen(true)} style={{ background: COLORS.teal, color: "#fff", border: "none", borderRadius: 10, padding: "10px 16px", fontFamily: uiFont, fontWeight: 600, cursor: "pointer", display: "flex", gap: 8 }}>
              <PhoneCall size={16} /> {t("callNow")}
            </button>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <MetricCard icon={Activity} label={t("lastActivity")} value={relative.lastSeen} />
        <MetricCard icon={Cpu} label={t("devicesOnline")} value={`${relative.devices.filter(d => d.online).length}/${relative.devices.length}`} />
        <MetricCard icon={Heart} label={t("homeStatus")} value={isSOS ? t("alarm") : t("calm")} tone={isSOS ? "coral" : "teal"} />
      </div>

      <Card>
        <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{t("activityPulse")}</div>
        <div style={{ fontFamily: uiFont, fontSize: 12, color: COLORS.inkSoft, margin: "4px 0 12px" }}>{t("pulseHint")}</div>
        <div style={{ height: 190 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={relative.activityPulse} margin={{ top: 8, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="pulseFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.teal} stopOpacity={0.32} />
                  <stop offset="100%" stopColor={COLORS.teal} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke={COLORS.line} vertical={false} />
              <XAxis dataKey="t" tick={{ fontSize: 11, fill: COLORS.inkSoft }} interval={2} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: COLORS.inkSoft }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, border: `1px solid ${COLORS.line}`, background: COLORS.card, color: COLORS.ink }} />
              <Area type="monotone" dataKey="v" stroke={COLORS.teal} strokeWidth={2.5} fill="url(#pulseFill)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
        <Card style={{ flex: "1 1 280px" }}>
          <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 12 }}>{t("devicesTitle")}</div>
          {relative.devices.map(d => (
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

        <Card style={{ flex: "1 1 280px" }}>
          <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink, marginBottom: 12 }}>{t("eventsLog")}</div>
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

      {callOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(32,48,43,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 50 }}>
          <div style={{ background: COLORS.navy, borderRadius: 20, padding: 30, width: 320, textAlign: "center", color: "#fff" }}>
            <div style={{ margin: "0 auto 16px", width: 72 }}>
              <Avatar src={relative.avatar} name={relative.name} size={72} fontSize={24} />
            </div>
            <div style={{ fontFamily: displayFont, fontSize: 18 }}>{relative.name}</div>
            <div style={{ fontFamily: uiFont, fontSize: 13, opacity: 0.7, margin: "4px 0 24px" }}>{t("connecting")}</div>
            <button onClick={() => setCallOpen(false)} style={{ width: 48, height: 48, borderRadius: "50%", border: "none", cursor: "pointer", background: COLORS.coral, color: "#fff" }}>
              <PhoneOff size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

