/* ─── Supabase service layer ───────────────────────────────────────────────
   Single source of truth for the Supabase client and auth operations.
   window.sb is set here so all existing call sites in index.html continue
   to work. New code should use the named helpers below instead of calling
   sb.auth.* directly.
   ──────────────────────────────────────────────────────────────────────── */

const _SURL = 'https://hbdiridvkgxarsuimrtu.supabase.co';
const _SKEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhiZGlyaWR2a2d4YXJzdWltcnR1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzkxNzcxOTYsImV4cCI6MjA5NDc1MzE5Nn0.vQU7_NoFw02pEEyhSN8ZPLm69JdeV0zgwc6K10hHjdk';

window.sb = supabase.createClient(_SURL, _SKEY);

/* ── Auth helpers ── */

async function dbGetUser() {
  const { data } = await window.sb.auth.getUser();
  return data?.user ?? null;
}

async function dbGetSession() {
  const { data: { session } } = await window.sb.auth.getSession();
  return session;
}

async function dbSignIn(email, password) {
  return window.sb.auth.signInWithPassword({ email, password });
}

async function dbSignUp(email, password, fullName, username) {
  return window.sb.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName, username } }
  });
}

async function dbSignOut() {
  return window.sb.auth.signOut();
}

/* ── Storage helper ── */

function dbStorage() {
  return window.sb.storage.from('forte-media');
}

/* ── Generic table helper ── */

function db(table) {
  return window.sb.from(table);
}
