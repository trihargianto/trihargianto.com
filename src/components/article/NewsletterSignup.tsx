import { useEffect, useState } from "react";
import { NEWSLETTER_LINK } from "../../constants/config";

type Status = "idle" | "error" | "success" | "submitting";

const EMAIL_KEY = "trihargianto:newsletter:email";
const DISMISS_KEY = "trihargianto:newsletter:dismissed";

const NewsletterSignup = ({ slug }: { slug: string }) => {
  const [email, setEmail] = useState(() => (typeof window !== "undefined" ? window.localStorage.getItem(EMAIL_KEY) ?? "" : ""));
  const [status, setStatus] = useState<Status>("idle");
  const [visible, setVisible] = useState(true);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const dismissed = window.localStorage.getItem(`${DISMISS_KEY}:${slug}`);
    if (dismissed === "true") {
      setVisible(false);
    }
  }, [slug]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!email) {
      setStatus("error");
      setMessage("Add your email so I know where to send the next edition.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("That doesn't look like a valid email.");
      return;
    }

    setStatus("submitting");
    setMessage("Redirecting to the subscription page…");
    window.localStorage.setItem(EMAIL_KEY, email);
    window.open(`${NEWSLETTER_LINK}?utm_source=blog&utm_medium=article&utm_campaign=${slug}&email=${encodeURIComponent(email)}`, "_blank", "noopener");
    setTimeout(() => {
      setStatus("success");
      setMessage("Thanks! Keep an eye on your inbox for the next issue.");
    }, 600);
  };

  const handleClose = () => {
    setVisible(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(`${DISMISS_KEY}:${slug}`, "true");
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200/70 bg-gradient-to-br from-sky-50 via-white to-violet-50 px-6 py-8 shadow-xl ring-1 ring-slate-200/60 dark:border-slate-800/70 dark:from-slate-900 dark:via-slate-950 dark:to-indigo-950/40">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">
            Newsletter
          </p>
          <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Get productivity tactics & frontend insights before they ship.
          </h3>
          <p className="mt-2 max-w-2xl text-sm text-slate-600 dark:text-slate-300">
            One carefully curated email, twice a month. No fluff—just frameworks, debugging stories, and performance playbooks I use with engineering teams.
          </p>
        </div>
        <button
          type="button"
          onClick={handleClose}
          className="self-start rounded-full border border-slate-200/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:border-slate-300 hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-700 dark:text-slate-400"
        >
          Skip
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="flex-1">
          <span className="sr-only">Email address</span>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-2xl border border-slate-300/80 bg-white px-4 py-3 text-base font-medium text-slate-800 shadow focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:border-slate-700/70 dark:bg-slate-900/60 dark:text-slate-100"
            placeholder="you@company.com"
            autoComplete="email"
            required
          />
        </label>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center rounded-2xl bg-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 disabled:cursor-not-allowed disabled:bg-sky-400/60"
        >
          {status === "submitting" ? "Joining…" : "Join the list"}
        </button>
      </form>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
        <span>No spam. Unsubscribe any time.</span>
        <span>Be the first to get fresh experiments, job tools, and retros.</span>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
        <div className="flex -space-x-2">
          {["TH", "JR", "AK", "+8K"].map((initials) => (
            <span
              key={initials}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white bg-slate-900 text-[10px] font-bold uppercase text-white shadow dark:border-slate-900 dark:bg-slate-700"
            >
              {initials}
            </span>
          ))}
        </div>
        <span>8,400+ engineers from Tokopedia, Shopify, and Grab read it every month.</span>
      </div>

      {message && (
        <p
          className={`mt-3 rounded-2xl px-4 py-2 text-sm font-medium ${
            status === "error"
              ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-300"
              : status === "success"
                ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-300"
                : "text-slate-500 dark:text-slate-300"
          }`}
        >
          {message}
        </p>
      )}
    </section>
  );
};

export default NewsletterSignup;
