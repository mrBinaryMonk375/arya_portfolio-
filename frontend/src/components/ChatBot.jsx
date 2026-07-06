import React, { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const SUGGESTIONS = [
  "What does Arya do?",
  "Show me a project he's proud of.",
  "What are his top skills?",
  "How can I hire him?",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I'm Arya's AI assistant. Ask me anything — his skills, projects, achievements, or how to work with him.",
    },
  ]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open]);

  const send = async (text) => {
    const trimmed = (text ?? input).trim();
    if (!trimmed || sending) return;
    setInput("");
    setSending(true);
    setMessages((m) => [...m, { role: "user", content: trimmed }, { role: "assistant", content: "" }]);

    try {
      const res = await fetch(`${API}/chat/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, session_id: sessionId }),
      });
      if (!res.ok || !res.body) throw new Error("Chat request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let buffer = "";

      // Read SSE stream
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const chunks = buffer.split("\n\n");
        buffer = chunks.pop() || "";
        for (const chunk of chunks) {
          if (!chunk.startsWith("data:")) continue;
          const payload = chunk.replace(/^data:\s?/, "").trim();
          if (!payload) continue;
          try {
            const evt = JSON.parse(payload);
            if (evt.session_id && !sessionId) setSessionId(evt.session_id);
            if (evt.delta) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") {
                  last.content = (last.content || "") + evt.delta;
                }
                return copy;
              });
            }
            if (evt.error) {
              setMessages((m) => {
                const copy = [...m];
                const last = copy[copy.length - 1];
                if (last && last.role === "assistant") {
                  last.content = "Sorry, I ran into an error. Try again in a moment.";
                }
                return copy;
              });
            }
          } catch (e) {
            // ignore malformed frames
          }
        }
      }
    } catch (err) {
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") {
          last.content = "Sorry, I couldn't reach the server. Please try again.";
        }
        return copy;
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      {/* FAB */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-24 right-6 z-40 w-14 h-14 rounded-full bg-brand-orange text-black grid place-items-center shadow-[0_15px_40px_-10px_rgba(255,107,26,0.7)] hover:scale-105 transition"
        aria-label="Open chat"
        data-testid="chatbot-toggle"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {/* Panel */}
      {open && (
        <div
          className="fixed bottom-44 right-4 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[380px] h-[540px] max-h-[70vh] bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          data-testid="chatbot-panel"
        >
          {/* Header */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10 bg-black/60">
            <div className="w-9 h-9 rounded-lg bg-brand-orange/15 border border-brand-orange/30 grid place-items-center text-brand-orange">
              <Sparkles size={16} />
            </div>
            <div className="flex-1">
              <div className="font-display font-semibold text-sm">Ask about Arya</div>
              <div className="text-[10px] text-white/50">Powered by Gemini · usually replies instantly</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3" data-testid="chatbot-messages">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3.5 py-2.5 text-sm rounded-2xl leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-brand-orange text-black rounded-br-sm"
                    : "bg-white/[0.04] border border-white/10 rounded-bl-sm"
                }`}
                data-testid={`chatbot-msg-${m.role}-${i}`}
              >
                {m.content || (m.role === "assistant" && sending ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  ""
                ))}
              </div>
            ))}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.03] hover:border-brand-orange hover:text-brand-orange transition"
                  data-testid="chatbot-suggestion"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            className="p-3 border-t border-white/10 bg-black/60 flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your question…"
              className="flex-1 bg-white/[0.04] border border-white/10 rounded-full px-4 py-2.5 text-sm focus:border-brand-orange placeholder:text-white/40"
              data-testid="chatbot-input"
            />
            <button
              type="submit"
              disabled={sending || !input.trim()}
              className="w-10 h-10 rounded-full bg-brand-orange text-black grid place-items-center disabled:opacity-50"
              data-testid="chatbot-send"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
