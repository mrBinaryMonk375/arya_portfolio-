import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { MessageCircle, Send, Mail, Phone, MapPin, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const WHATSAPP_NUMBER = "919073568772"; // country code + number

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in name, email, and message.");
      return;
    }
    setLoading(true);
    // Save to DB (fire and forget - non-blocking for WA redirect)
    try {
      await axios.post(`${API}/contact`, form);
    } catch (err) {
      // Non-blocking; keep going to WhatsApp
      console.warn("Contact save failed:", err?.message);
    }
    setLoading(false);

    // Build WhatsApp deep link
    const text = `Hi Arya! I'm ${form.name} (${form.email}).\n\nSubject: ${form.subject || "General enquiry"}\n\n${form.message}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    toast.success("Opening WhatsApp… I'll reply as soon as possible!");
  };

  return (
    <section id="contact" className="relative py-16 md:py-32" data-testid="contact-section">
      <div className="max-w-7xl mx-auto px-5 md:px-10 grid lg:grid-cols-12 gap-10 items-start">
        {/* Left */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-1.5 w-8 bg-brand-orange rounded-full" />
            <span className="text-xs tracking-[0.3em] text-white/60 font-semibold uppercase">Contact</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[0.95]">
            Let&apos;s build
            <br />
            <span className="font-script text-brand-orange -rotate-2 inline-block">something</span> extraordinary.
          </h2>
          <p className="text-white/60 mt-5 max-w-md">
            Send a message and it&apos;ll ping me straight on WhatsApp. I usually reply within a few hours.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-4 p-4 rounded-xl border border-white/10 hover:border-brand-orange/60 transition group"
              data-testid="contact-whatsapp-link"
            >
              <div className="w-11 h-11 grid place-items-center rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                <Phone size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/50">WhatsApp</div>
                <div className="font-semibold group-hover:text-brand-orange transition">+91 90735 68772</div>
              </div>
            </a>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10">
              <div className="w-11 h-11 grid place-items-center rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                <MapPin size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/50">Location</div>
                <div className="font-semibold">Kolkata, India</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-white/10">
              <div className="w-11 h-11 grid place-items-center rounded-lg bg-brand-orange/10 border border-brand-orange/30 text-brand-orange">
                <Mail size={18} />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-widest text-white/50">Availability</div>
                <div className="font-semibold">Open to collaborations &amp; internships</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right form */}
        <form
          onSubmit={onSubmit}
          className="lg:col-span-7 relative p-6 md:p-10 rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent"
          data-testid="contact-form"
        >
          <div className="absolute -top-3 left-6 text-[11px] font-mono tracking-widest uppercase bg-black px-3 py-1 border border-white/10 rounded-full text-white/70">
            <MessageCircle size={12} className="inline mr-1.5 -mt-0.5" />
            Direct WhatsApp
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-2">
            <Field label="Your Name" testid="contact-name">
              <input
                value={form.name}
                onChange={update("name")}
                required
                placeholder="John Doe"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-brand-orange"
                data-testid="contact-name-input"
              />
            </Field>
            <Field label="Email Address" testid="contact-email">
              <input
                type="email"
                value={form.email}
                onChange={update("email")}
                required
                placeholder="you@company.com"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-brand-orange"
                data-testid="contact-email-input"
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Subject" testid="contact-subject">
              <input
                value={form.subject}
                onChange={update("subject")}
                placeholder="Project enquiry, internship, collab…"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-brand-orange"
                data-testid="contact-subject-input"
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field label="Message" testid="contact-message">
              <textarea
                value={form.message}
                onChange={update("message")}
                required
                rows={6}
                placeholder="Tell me a bit about your project or idea…"
                className="w-full bg-white/[0.04] border border-white/10 rounded-lg px-4 py-3 focus:border-brand-orange resize-none"
                data-testid="contact-message-input"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary mt-6 w-full sm:w-auto justify-center"
            data-testid="contact-submit-btn"
          >
            {loading ? <Loader2 className="animate-spin" size={16} /> : (
              <>
                Send via WhatsApp <Send size={16} />
              </>
            )}
          </button>
          <p className="text-xs text-white/40 mt-3">
            Submitting opens WhatsApp with your message pre-filled to +91 9073568772.
          </p>
        </form>
      </div>
    </section>
  );
}

function Field({ label, testid, children }) {
  return (
    <label className="block" data-testid={`${testid}-field`}>
      <span className="block text-[11px] tracking-widest uppercase text-white/50 mb-2">{label}</span>
      {children}
    </label>
  );
}
