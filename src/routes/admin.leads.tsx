import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { Loader2, LogOut, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [
      { title: "ניהול לידים | המפה הפיננסית" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLeadsPage,
});

type Lead = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string;
  domain: string;
  source_page: string | null;
  quiz_result: string | null;
  status: string;
  notes: string | null;
  assigned_to: string | null;
};

type LeadAnswer = {
  question_label: string;
  answer_label: string | null;
  answer_value: string;
  step_index: number | null;
};

const STATUSES = ["new", "contacted", "qualified", "sent_to_partner", "closed", "not_relevant"] as const;
const STATUS_LABELS: Record<string, string> = {
  new: "חדש",
  contacted: "נוצר קשר",
  qualified: "כשיר",
  sent_to_partner: "הועבר לשותף",
  closed: "נסגר",
  not_relevant: "לא רלוונטי",
};

function AdminLeadsPage() {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<"loading" | "unauthorized" | "no-role" | "ready">("loading");
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [answersById, setAnswersById] = useState<Record<string, LeadAnswer[]>>({});

  const checkAuth = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data.user) {
      setAuthState("unauthorized");
      return;
    }
    setUserEmail(data.user.email ?? null);
    const { data: roleRow } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", data.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleRow) {
      setAuthState("no-role");
      return;
    }
    setAuthState("ready");
  }, []);

  const loadLeads = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("id, created_at, name, phone, email, domain, source_page, quiz_result, status, notes, assigned_to")
      .order("created_at", { ascending: false })
      .limit(500);
    setLoading(false);
    if (error) {
      console.error(error);
      return;
    }
    setLeads(data || []);
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (authState === "ready") loadLeads();
  }, [authState, loadLeads]);

  const toggleAnswers = async (id: string) => {
    if (openId === id) {
      setOpenId(null);
      return;
    }
    setOpenId(id);
    if (!answersById[id]) {
      const { data } = await supabase
        .from("lead_answers")
        .select("question_label, answer_label, answer_value, step_index")
        .eq("lead_id", id)
        .order("step_index", { ascending: true });
      setAnswersById((prev) => ({ ...prev, [id]: data || [] }));
    }
  };

  const updateStatus = async (id: string, status: string) => {
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status } : l)));
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) {
      console.error(error);
      setLeads(prev);
    }
  };

  const updateNotes = async (id: string, notes: string) => {
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, notes } : l)));
    await supabase.from("leads").update({ notes }).eq("id", id);
  };

  const logout = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  };

  if (authState === "loading") {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (authState === "unauthorized") {
    return (
      <div dir="rtl" className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 max-w-md text-center">
          <h1 className="text-2xl font-bold mb-3">נדרשת התחברות</h1>
          <p className="text-muted-foreground mb-6">אזור זה מיועד למנהלים בלבד.</p>
          <Link to="/login" className="inline-block h-11 px-6 rounded-full font-bold text-primary-foreground bg-primary hover:bg-primary/90 leading-[2.75rem]">
            לעמוד התחברות
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  if (authState === "no-role") {
    return (
      <div dir="rtl" className="min-h-screen bg-background text-foreground flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-16 max-w-lg text-center">
          <h1 className="text-2xl font-bold mb-3">אין לך הרשאת מנהל</h1>
          <p className="text-muted-foreground mb-2">המשתמש <span className="font-mono">{userEmail}</span> מחובר אך אינו מנהל.</p>
          <p className="text-sm text-muted-foreground mb-6">פנה לבעל המערכת כדי שיוסיף לך הרשאת admin.</p>
          <button onClick={logout} className="inline-flex items-center gap-2 h-10 px-5 rounded-full border border-border hover:bg-muted">
            <LogOut className="w-4 h-4" /> התנתק
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">ניהול לידים</h1>
            <p className="text-sm text-muted-foreground">{leads.length} רשומות · מחובר כ-{userEmail}</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={loadLeads} disabled={loading} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border hover:bg-muted disabled:opacity-50">
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCw className="w-4 h-4" />}
              רענן
            </button>
            <button onClick={logout} className="inline-flex items-center gap-2 h-10 px-4 rounded-full border border-border hover:bg-muted">
              <LogOut className="w-4 h-4" /> התנתק
            </button>
          </div>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-border bg-card" style={{ boxShadow: "var(--shadow-soft)" }}>
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-right">
              <tr>
                <th className="p-3 font-semibold">תאריך</th>
                <th className="p-3 font-semibold">שם</th>
                <th className="p-3 font-semibold">טלפון</th>
                <th className="p-3 font-semibold">אימייל</th>
                <th className="p-3 font-semibold">תחום</th>
                <th className="p-3 font-semibold">תוצאת שאלון</th>
                <th className="p-3 font-semibold">מקור</th>
                <th className="p-3 font-semibold">סטטוס</th>
                <th className="p-3 font-semibold">הערות</th>
              </tr>
            </thead>
            <tbody>
              {leads.length === 0 && !loading && (
                <tr><td colSpan={9} className="p-8 text-center text-muted-foreground">אין לידים עדיין</td></tr>
              )}
              {leads.map((l) => (
                <>
                  <tr key={l.id} className="border-t border-border hover:bg-muted/30">
                    <td className="p-3 whitespace-nowrap text-xs text-muted-foreground">
                      {new Date(l.created_at).toLocaleString("he-IL")}
                    </td>
                    <td className="p-3 font-medium">{l.name}</td>
                    <td className="p-3 font-mono text-xs"><a href={`tel:${l.phone}`} className="hover:underline">{l.phone}</a></td>
                    <td className="p-3 text-xs"><a href={`mailto:${l.email}`} className="hover:underline">{l.email}</a></td>
                    <td className="p-3">{l.domain}</td>
                    <td className="p-3">
                      {l.quiz_result ? (
                        <button onClick={() => toggleAnswers(l.id)} className="text-primary hover:underline text-xs">
                          {l.quiz_result} {openId === l.id ? "▲" : "▼"}
                        </button>
                      ) : (
                        <span className="text-muted-foreground text-xs">—</span>
                      )}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground">{l.source_page || "—"}</td>
                    <td className="p-3">
                      <select
                        value={l.status}
                        onChange={(e) => updateStatus(l.id, e.target.value)}
                        className="h-8 px-2 rounded-md border border-input bg-background text-xs"
                      >
                        {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
                      </select>
                    </td>
                    <td className="p-3">
                      <input
                        type="text"
                        defaultValue={l.notes || ""}
                        onBlur={(e) => {
                          if (e.target.value !== (l.notes || "")) updateNotes(l.id, e.target.value);
                        }}
                        placeholder="הוסף הערה…"
                        className="h-8 px-2 rounded-md border border-input bg-background text-xs w-44"
                      />
                    </td>
                  </tr>
                  {openId === l.id && (
                    <tr key={`${l.id}-answers`} className="bg-muted/20">
                      <td colSpan={9} className="p-4">
                        <div className="text-xs font-semibold mb-2">תשובות שאלון:</div>
                        {answersById[l.id]?.length ? (
                          <ul className="space-y-1 text-xs">
                            {answersById[l.id].map((a, i) => (
                              <li key={i}>
                                <span className="text-muted-foreground">{a.question_label}:</span>{" "}
                                <span className="font-medium">{a.answer_label || a.answer_value}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <span className="text-xs text-muted-foreground">טוען / אין נתונים</span>
                        )}
                      </td>
                    </tr>
                  )}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </div>
  );
}