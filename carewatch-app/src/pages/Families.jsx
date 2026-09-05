import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card, StatusPill } from "../components";
import { COLORS, uiFont } from "../theme";
import { allUsers, relatives } from "../data";
import { useT } from "../i18n";
import UserHome from "./UserHome";

export default function Families() {
  const t = useT();
  const [selectedId, setSelectedId] = useState(null);

  if (selectedId) {
    const relative = relatives.find(r => r.id === selectedId);
    return <UserHome relative={relative} onBack={() => setSelectedId(null)} />;
  }

  return (
    <Card>
      <div style={{ fontFamily: uiFont, fontSize: 14, fontWeight: 600, color: COLORS.ink }}>{t("allFamilies")}</div>
      <div style={{ fontFamily: uiFont, fontSize: 12, color: COLORS.inkSoft, margin: "4px 0 14px" }}>{t("clickFamilyHint")}</div>
      <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: uiFont, fontSize: 13 }}>
        <thead>
          <tr style={{ textAlign: "left", color: COLORS.inkSoft, borderBottom: `1px solid ${COLORS.line}` }}>
            <th style={{ padding: "8px 6px" }}>{t("colFamily")}</th>
            <th style={{ padding: "8px 6px" }}>{t("colRelative")}</th>
            <th style={{ padding: "8px 6px" }}>{t("colCity")}</th>
            <th style={{ padding: "8px 6px" }}>{t("colDevices")}</th>
            <th style={{ padding: "8px 6px" }}>{t("colStatus")}</th>
            <th style={{ padding: "8px 6px" }} />
          </tr>
        </thead>
        <tbody>
          {allUsers.map(u => (
            <tr key={u.id} onClick={() => setSelectedId(u.familyId)} style={{ borderBottom: `1px solid ${COLORS.line}`, cursor: "pointer" }}>
              <td style={{ padding: "10px 6px", color: COLORS.ink }}>{u.family}</td>
              <td style={{ padding: "10px 6px", color: COLORS.ink }}>{u.relative}</td>
              <td style={{ padding: "10px 6px", color: COLORS.inkSoft }}>{u.city}</td>
              <td style={{ padding: "10px 6px", color: COLORS.inkSoft }}>{u.devices}</td>
              <td style={{ padding: "10px 6px" }}><StatusPill status={u.status} /></td>
              <td style={{ padding: "10px 6px", textAlign: "right", color: COLORS.inkSoft }}><ChevronRight size={16} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

