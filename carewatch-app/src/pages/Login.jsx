import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Shield, Square, CheckSquare, User, X } from "lucide-react";
import { COLORS, THEME_VARS, displayFont, uiFont } from "../theme";
import { relatives, accounts } from "../data";
import { useT, useLanguage } from "../i18n";

function LangSwitch() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 4, background: "rgba(255,255,255,0.06)", borderRadius: 8, padding: 3 }}>
      {["ru", "uz", "en"].map(l => (
        <button key={l} onClick={() => setLang(l)} style={{
          padding: "5px 9px", borderRadius: 6, border: "none", cursor: "pointer", fontFamily: uiFont, fontSize: 11.5, fontWeight: 600,
          background: lang === l ? COLORS.teal : "transparent", color: lang === l ? "#fff" : "rgba(255,255,255,0.5)",
        }}>
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Field({ icon: Icon, type = "text", placeholder, value, onChange, error, canToggle }) {
  const [reveal, setReveal] = useState(false);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: "11px 14px", border: `1px solid ${error ? COLORS.coral : "rgba(255,255,255,0.12)"}` }}>
        <Icon size={16} color="rgba(255,255,255,0.5)" />
        <input type={canToggle ? (reveal ? "text" : "password") : type} placeholder={placeholder} value={value} onChange={onChange}
          style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontFamily: uiFont, fontSize: 14, width: "100%" }} />
        {canToggle && (
          <button type="button" onClick={() => setReveal(v => !v)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.45)", display: "flex" }}>
            {reveal ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <div style={{ color: COLORS.coral, fontSize: 11, marginTop: 5, fontFamily: uiFont }}>{error}</div>}
    </div>
  );
}

function ForgotModal({ onClose }) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,23,20,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60 }}>
      <div style={{ background: COLORS.navy, borderRadius: 18, padding: 26, width: 300, color: "#fff", fontFamily: uiFont }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 14 }}>
          <div style={{ fontFamily: displayFont, fontSize: 17 }}>{t("forgotTitle")}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)" }}><X size={18} /></button>
        </div>
        {sent ? (
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", display: "flex", gap: 8 }}>
            <CheckCircle2 size={16} color={COLORS.teal} /> {t("forgotSent")}
          </div>
        ) : (
          <>
            <Field icon={Mail} type="email" placeholder={t("fieldEmail")} value={email} onChange={e => setEmail(e.target.value)} />
            <button onClick={() => email.trim() && setSent(true)} style={{ width: "100%", marginTop: 14, padding: "10px 0", borderRadius: 10, border: "none", cursor: "pointer", background: COLORS.teal, color: "#fff", fontFamily: uiFont, fontWeight: 700 }}>
              {t("forgotSend")}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function Login({ onAuthenticated }) {
  const t = useT();
  const [mode, setMode] = useState("login");
  const [familyId, setFamilyId] = useState("fam-1");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [forgotOpen, setForgotOpen] = useState(false);

  const validate = () => {
    const e = {};
    if (mode === "signup" && name.trim().length < 2) e.name = t("errNameShort");
    if (!email.trim()) e.email = t("errEmailRequired");
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = t("errEmailFormat");
    if (!password) e.password = t("errPasswordRequired");
    else if (mode === "signup" && password.length < 6) e.password = t("errPasswordShort");
    if (mode === "signup" && confirmPassword !== password) e.confirmPassword = t("errPasswordMismatch");
    if (mode === "signup" && !agreeTerms) e.terms = t("errTerms");
    if (mode === "signup" && accounts.some(a => a.email.toLowerCase() === email.trim().toLowerCase())) e.email = t("errEmailTaken");
    return e;
  };

  const submit = () => {
    const e = validate();
    if (mode === "login" && Object.keys(e).length === 0) {
      const account = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
      if (!account || account.password !== password) {
        e.password = t("errBadCredentials");
      }
    }
    setErrors(e);
    if (Object.keys(e).length) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (mode === "login") {
        const account = accounts.find(a => a.email.toLowerCase() === email.trim().toLowerCase());
        onAuthenticated(account.role, account.familyId);
      } else {
        // New sign-ups are always family accounts, linked to the relative
        // they picked below. Admin accounts are provisioned separately.
        accounts.push({ email: email.trim(), password, role: "user", familyId, name: name.trim() });
        onAuthenticated("user", familyId);
      }
    }, 600);
  };

  return (
    <div style={{
      ...THEME_VARS.dark, minHeight: "100vh", width: "100%", position: "relative",
      display: "flex", alignItems: "center", justifyContent: "center", fontFamily: uiFont, padding: 24,
      background: "radial-gradient(circle at 15% 10%, rgba(63,203,156,0.22), transparent 45%), radial-gradient(circle at 85% 90%, rgba(63,203,156,0.14), transparent 50%), linear-gradient(160deg, #16241F, #0E1714)",
    }}>
      <LangSwitch />
      <div style={{ width: 340 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", justifyContent: "center", marginBottom: 30 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg, ${COLORS.teal}, color-mix(in srgb, ${COLORS.teal} 40%, black))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Shield size={20} color="#fff" />
          </div>
          <span style={{ fontFamily: displayFont, fontSize: 22 }}>ХамфикрCare</span>
        </div>

        <div style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 20, padding: 22 }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 3, marginBottom: 20 }}>
            {["login", "signup"].map(m => (
              <button key={m} onClick={() => { setMode(m); setErrors({}); }} style={{
                flex: 1, padding: "8px 0", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: uiFont, fontSize: 13, fontWeight: 600,
                background: mode === m ? `linear-gradient(135deg, ${COLORS.teal}, color-mix(in srgb, ${COLORS.teal} 55%, black))` : "transparent",
                color: mode === m ? "#fff" : "rgba(255,255,255,0.55)",
              }}>
                {m === "login" ? t("tabLogin") : t("tabSignup")}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {mode === "signup" && <Field icon={User} placeholder={t("fieldName")} value={name} onChange={e => setName(e.target.value)} error={errors.name} />}
            <Field icon={Mail} type="email" placeholder={t("fieldEmail")} value={email} onChange={e => setEmail(e.target.value)} error={errors.email} />
            <Field icon={Lock} canToggle placeholder={t("fieldPassword")} value={password} onChange={e => setPassword(e.target.value)} error={errors.password} />
            {mode === "signup" && <Field icon={Lock} canToggle placeholder={t("fieldConfirmPassword")} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} error={errors.confirmPassword} />}
          </div>

          {mode === "login" && (
            <div style={{ textAlign: "right", marginTop: 8 }}>
              <button onClick={() => setForgotOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.5)", fontFamily: uiFont, fontSize: 12, textDecoration: "underline" }}>
                {t("forgotPassword")}
              </button>
            </div>
          )}

          {/* {mode === "signup" && (
            <div style={{ margin: "16px 0" }}>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 8 }}>{t("whichRelative")}</div>
              <select value={familyId} onChange={e => setFamilyId(e.target.value)} style={{
                width: "100%", padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.12)", color: "#fff", fontFamily: uiFont, fontSize: 13,
              }}>
                {relatives.map(r => <option key={r.id} value={r.id} style={{ color: "#000" }}>{r.family} — {r.name}</option>)}
              </select>
            </div>
          )} */}

          {mode === "signup" && (
            <button onClick={() => setAgreeTerms(v => !v)} style={{ display: "flex", gap: 8, background: "none", border: "none", cursor: "pointer", textAlign: "left", marginTop: 4, marginBottom: 14, padding: 0 }}>
              {agreeTerms ? <CheckSquare size={16} color={COLORS.teal} /> : <Square size={16} color={errors.terms ? COLORS.coral : "rgba(255,255,255,0.4)"} />}
              <span style={{ fontSize: 12, color: errors.terms ? COLORS.coral : "rgba(255,255,255,0.55)", fontFamily: uiFont, lineHeight: 1.4 }}>
                {t("agreeTerms")}
              </span>
            </button>
          )}

          <button onClick={submit} disabled={loading} style={{
            width: "100%", padding: "12px 0", borderRadius: 10, border: "none", cursor: loading ? "default" : "pointer",
            background: COLORS.teal, color: "#fff", fontFamily: uiFont, fontSize: 14, fontWeight: 700,
            display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.8 : 1,
            marginTop: mode === "login" ? 16 : 0,
          }}>
            {loading ? t("loading") : <>{mode === "login" ? t("submitLogin") : t("submitSignup")} <ArrowRight size={15} /></>}
          </button>

          {/* {mode === "login" && (
            <div style={{ marginTop: 16, padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", marginBottom: 4 }}>{t("testAccounts")}</div>
              <div style={{ fontSize: 11.5, color: "rgba(255,255,255,0.55)", lineHeight: 1.7, fontFamily: uiFont }}>
                {t("admin")}: admin@carewatch.uz / admin123<br />
                {t("familyAccount")}: dilnoza@carewatch.uz / password123
              </div>
            </div>
          )} */}
        </div>
      </div>

      {forgotOpen && <ForgotModal onClose={() => setForgotOpen(false)} />}
    </div>
  );
}

