import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "התחברות מנהלים | המפה הפיננסית" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMsg(null);
    setLoading(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) return setError(error.message);
      navigate({ to: "/admin/leads" });
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: { emailRedirectTo: `${window.location.origin}/admin/leads` },
      });
      setLoading(false);
      if (error) return setError(error.message);
      setMsg("נרשמת בהצלחה. בדוק את האימייל שלך לאישור (אם נדרש), ולאחר מכן התחבר.");
    }
  };

  const inp = "w-full h-11 px-4 rounded-xl border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-16 max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8" style={{ boxShadow: "var(--shadow-soft)" }}>
          <h1 className="text-2xl font-bold mb-2 text-center">{mode === "signin" ? "התחברות" : "הרשמה"}</h1>
          <p className="text-sm text-muted-foreground text-center mb-6">אזור מנהלים בלבד</p>

          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-1.5">אימייל</label>
              <input className={inp} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required autoComplete="email" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">סיסמה</label>
              <input className={inp} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} autoComplete={mode === "signin" ? "current-password" : "new-password"} />
            </div>
            {error && <p role="alert" className="text-sm text-destructive">{error}</p>}
            {msg && <p className="text-sm text-primary">{msg}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-full font-bold text-primary-foreground bg-primary hover:bg-primary/90 transition-all disabled:opacity-60 inline-flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {mode === "signin" ? "התחבר" : "הרשם"}
            </button>
          </form>

          <button
            onClick={() => { setMode(mode === "signin" ? "signup" : "signin"); setError(null); setMsg(null); }}
            className="w-full text-sm text-muted-foreground hover:text-foreground mt-4"
          >
            {mode === "signin" ? "אין לך חשבון? הרשם" : "יש לך חשבון? התחבר"}
          </button>

          <p className="text-xs text-muted-foreground text-center mt-6">
            <Link to="/" className="underline">חזרה לאתר</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}