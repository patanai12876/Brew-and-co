"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSuccess(false), 4000);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to send. Please try again.");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    background: "#FFFFFF",
    border: "1.5px solid #E8E4DC",
    borderRadius: "8px",
    fontSize: "15px",
    color: "#1E1E1E",
    fontFamily: "var(--font-nunito)",
    outline: "none",
    transition: "border-color .15s",
  };

  return (
    <main>

      {/* ===== HERO ===== */}
      <section style={{
        background: "#1E1E1E",
        padding: "140px 48px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,158,116,0.08) 0%, transparent 70%)",
          top: "50%", right: "0",
          transform: "translateY(-50%)",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "16px", fontWeight: 600
            }}>
              Get In Touch
            </p>
            <h1 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(44px, 6vw, 80px)",
              color: "#F8F6F1", lineHeight: 1.1,
              marginBottom: "20px",
            }}>
              We'd Love to{" "}
              <span style={{ color: "#7B9E74", fontStyle: "italic" }}>
                Hear From You
              </span>
            </h1>
            <p style={{
              fontSize: "18px", color: "#F8F6F1",
              opacity: 0.6, lineHeight: 1.8,
              maxWidth: "480px",
            }}>
              Questions, feedback, or just want to say hello — we're here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN ===== */}
      <section style={{ background: "#F8F6F1", padding: "80px 48px 100px" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "80px", alignItems: "start",
        }}>

          {/* Left — Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "32px", color: "#1E1E1E",
              marginBottom: "8px",
            }}>
              Send a Message
            </h2>
            <p style={{
              fontSize: "16px", color: "#8A8A80",
              marginBottom: "36px", lineHeight: 1.7,
            }}>
              We reply within 24 hours.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={{
                  display: "block", fontSize: "13px",
                  fontWeight: 600, color: "#4A4A45",
                  marginBottom: "8px",
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#7B9E74")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E4DC")}
                />
              </div>

              <div>
                <label style={{
                  display: "block", fontSize: "13px",
                  fontWeight: 600, color: "#4A4A45",
                  marginBottom: "8px",
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#7B9E74")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E4DC")}
                />
              </div>

              <div>
                <label style={{
                  display: "block", fontSize: "13px",
                  fontWeight: 600, color: "#4A4A45",
                  marginBottom: "8px",
                }}>
                  Message
                </label>
                <textarea
                  placeholder="What's on your mind?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={6}
                  style={{
                    ...inputStyle,
                    resize: "vertical",
                    minHeight: "140px",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#7B9E74")}
                  onBlur={(e) => (e.target.style.borderColor = "#E8E4DC")}
                />
              </div>

              {error && (
                <p style={{
                  fontSize: "13px", color: "#C0392B",
                  background: "#FEF0EE", padding: "12px 16px",
                  borderRadius: "8px", fontWeight: 500,
                }}>
                  {error}
                </p>
              )}

              <button
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  background: loading ? "#8A8A80" : "#3D5C38",
                  color: "#F8F6F1",
                  padding: "16px 32px",
                  border: "none", borderRadius: "8px",
                  fontSize: "15px", fontWeight: 700,
                  cursor: loading ? "not-allowed" : "pointer",
                  fontFamily: "var(--font-nunito)",
                  transition: "background .2s ease, transform 0.1s ease",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#2A4620";
                    e.currentTarget.style.transform = "scale(0.99)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!loading) {
                    e.currentTarget.style.background = "#3D5C38";
                    e.currentTarget.style.transform = "scale(1)";
                  }
                }}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>
          </motion.div>

          {/* Right — Info */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "32px", color: "#1E1E1E",
              marginBottom: "8px",
            }}>
              Visit Us
            </h2>
            <p style={{
              fontSize: "16px", color: "#8A8A80",
              marginBottom: "40px", lineHeight: 1.7,
            }}>
              Come in for a cup — we'd love to meet you.
            </p>

            {[
              {
                icon: "📍",
                title: "Address",
                lines: ["123 MM Alam Road", "Gulberg III, Lahore", "Punjab, Pakistan"],
              },
              {
                icon: "🕐",
                title: "Hours",
                lines: [
                  "Monday – Friday: 8am – 11pm",
                  "Saturday: 9am – 12am",
                  "Sunday: 10am – 10pm",
                ],
              },
              {
                icon: "📞",
                title: "Phone",
                lines: ["+92 300 0000000"],
              },
              {
                icon: "✉️",
                title: "Email",
                lines: ["hello@brewandco.pk"],
              },
            ].map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{
                  display: "flex", gap: "20px",
                  marginBottom: "32px",
                  paddingBottom: "32px",
                  borderBottom: i < 3 ? "1px solid #E8E4DC" : "none",
                }}
              >
                <div style={{
                  width: "48px", height: "48px",
                  background: "#EEF2EC",
                  borderRadius: "10px",
                  display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: "20px",
                  flexShrink: 0,
                }}>
                  {info.icon}
                </div>
                <div>
                  <div style={{
                    fontSize: "13px", fontWeight: 700,
                    color: "#1E1E1E", marginBottom: "6px",
                    letterSpacing: "0.05em",
                  }}>
                    {info.title}
                  </div>
                  {info.lines.map((line, j) => (
                    <div key={j} style={{
                      fontSize: "15px", color: "#4A4A45",
                      lineHeight: 1.7,
                    }}>
                      {line}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SUCCESS TOAST ===== */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: "fixed", bottom: "32px", left: "50%",
              transform: "translateX(-50%)", zIndex: 200,
              background: "#3D5C38", color: "#F8F6F1",
              padding: "16px 28px", borderRadius: "10px",
              fontSize: "15px", fontWeight: 600,
              boxShadow: "0 8px 32px rgba(61,92,56,0.35)",
              display: "flex", alignItems: "center", gap: "10px",
              whiteSpace: "nowrap",
            }}
          >
            <span style={{ fontSize: "18px" }}>✓</span>
            Message sent! We'll reply within 24 hours.
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}