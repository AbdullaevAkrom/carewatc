import React, { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { LanguageContext } from "./i18n";

export default function App() {
  const [session, setSession] = useState(null); // null | { role, familyId }
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("ru");

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {!session ? (
        <Login onAuthenticated={(role, familyId) => setSession({ role, familyId })} />
      ) : (
        <Dashboard
          role={session.role}
          familyId={session.familyId}
          onLogout={() => setSession(null)}
          isDark={isDark}
          onToggleTheme={() => setIsDark(v => !v)}
        />
      )}
    </LanguageContext.Provider>
  );
}

