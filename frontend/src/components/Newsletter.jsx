import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Mail, ArrowUpRight, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email");
    setLoading(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success("You're in! Thanks for subscribing 🎉");
      setEmail("");
    } catch (err) {
      const msg = err?.response?.data?.detail || "Something went wrong. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-14 md:py-28" data-testid="newsletter-section">
      <div className="max-w-5xl mx-auto px-5 md:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#1a1a1a] to-black p-8 md:p-14">
          <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-brand-orange/30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Mail size={16} className="text-brand-orange" />
                <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Newsletter</span>
              </div>
              <h3 className="font-display font-black text-3xl md:text-4xl leading-tight">
                Occasional notes on <span className="font-script text-brand-orange -rotate-2 inline-block">tech &amp; growth</span>
              </h3>
              <p className="text-white/60 mt-3 text-sm md:text-base">
                No spam. Just experiments, launches, and lessons — straight to your inbox.
              </p>
            </div>

            <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3" data-testid="newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-5 py-3.5 text-sm focus:border-brand-orange placeholder:text-white/40"
                data-testid="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={loading}
                className="btn-primary justify-center disabled:opacity-60"
                data-testid="newsletter-submit"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <>Subscribe <ArrowUpRight size={16} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
