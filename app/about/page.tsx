"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const values = [
  {

    title: "Quality",
    desc: "We source only the finest single-origin beans from Ethiopia, Colombia, and Guatemala. Every batch is roasted fresh in Lahore to preserve its unique flavor profile.",
  },
  {
    
    title: "Craft",
    desc: "Our baristas train for months before serving their first cup. Every extraction, every pour, every latte art design is executed with precision and passion.",
  },
  {
   
    title: "Community",
    desc: "Brew & Co. is more than a cafe — it's a gathering place for Lahore's coffee lovers. We host events, support local artists, and give back to our neighborhood.",
  },
];

const timeline = [
  { year: "2020", title: "Founded", desc: "Brew & Co. started in a small kitchen with one espresso machine and a big dream." },
  { year: "2021", title: "First Location", desc: "We opened our first cafe on MM Alam Road, Gulberg — and Lahore fell in love." },
  { year: "2023", title: "Delivery Launch", desc: "We brought Brew & Co. to your doorstep — fresh coffee delivered in 30–45 minutes." },
  { year: "2025", title: "Growing Strong", desc: "Hundreds of cups daily, a loyal community, and the same passion as day one." },
];

export default function AboutPage() {
  return (
    <main>

      {/* ===== HERO ===== */}
      <section style={{
        background: "#1E1E1E",
        padding: "140px 48px 100px",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "600px", height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,158,116,0.08) 0%, transparent 70%)",
          top: "50%", right: "-100px",
          transform: "translateY(-50%)",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
          >
            <motion.p variants={fadeUp} style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "20px", fontWeight: 600,
            }}>
              Who We Are
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(44px, 6vw, 84px)",
              color: "#F8F6F1", lineHeight: 1.1,
              marginBottom: "24px", maxWidth: "700px",
            }}>
              A Story Brewed{" "}
              <span style={{ color: "#7B9E74", fontStyle: "italic" }}>
                With Love
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontSize: "19px", color: "#F8F6F1",
              opacity: 0.65, lineHeight: 1.85,
              maxWidth: "560px",
            }}>
              From a single espresso machine in Lahore to hundreds of cups daily —
              this is the story of Brew & Co.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== FOUNDING STORY ===== */}
      <section style={{ background: "#F8F6F1", padding: "100px 48px" }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "80px", alignItems: "center",
        }}>
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "16px", fontWeight: 600,
            }}>
              How It All Started
            </p>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "#1E1E1E", marginBottom: "24px",
              lineHeight: 1.2,
            }}>
              One Machine,
              <br />
              One Dream
            </h2>
            <p style={{
              fontSize: "18px", color: "#4A4A45",
              lineHeight: 1.9, marginBottom: "20px",
            }}>
              Brew & Co. was born from a simple but powerful belief — that
              Lahore deserved world-class coffee. Not imported, not pretentious,
              but honest, handcrafted coffee made with care and served with pride.
            </p>
            <p style={{
              fontSize: "18px", color: "#4A4A45",
              lineHeight: 1.9, marginBottom: "20px",
            }}>
              Our founder started with one espresso machine, a small kitchen,
              and a handful of loyal friends willing to taste every experiment.
              The coffee was good. The feedback was honest. The dream grew.
            </p>
            <p style={{
              fontSize: "18px", color: "#4A4A45",
              lineHeight: 1.9,
            }}>
              Today, Brew & Co. crafts hundreds of cups daily — each one made
              with the same intention and precision as that very first shot.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
            <div
  style={{
    borderRadius: "12px",
    height: "440px",
    overflow: "hidden",
    position: "relative",
  }}
>
  <Image
    src="/machine.jpg"
    alt="Coffee Shop"
    fill
    style={{
      objectFit: "cover"
    }}
  />
</div>

            {/* Floating stat */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              style={{
                position: "absolute", top: "-16px", right: "-16px",
                background: "#3D5C38", borderRadius: "10px",
                padding: "16px 20px",
                boxShadow: "0 8px 24px rgba(61,92,56,0.3)",
              }}
            >
              <div style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "28px", color: "#F8F6F1",
              }}>5K+</div>
              <div style={{ fontSize: "12px", color: "#7B9E74", fontWeight: 600 }}>
                Daily Cups
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== VALUES ===== */}
      <section style={{ background: "#F0EDE6", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <p style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "14px", fontWeight: 600,
            }}>
              What We Stand For
            </p>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "#1E1E1E",
            }}>
              Our Values
            </h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
            }}
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  padding: "40px 32px",
                  border: "1px solid #E8E4DC",
                }}
              >
              
                <h3 style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "24px", color: "#1E1E1E",
                  marginBottom: "14px",
                }}>
                  {v.title}
                </h3>
                <p style={{
                  fontSize: "18px", color: "#4A4A45",
                  lineHeight: 1.8,
                }}>
                  {v.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section style={{ background: "#1E1E1E", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: "center", marginBottom: "64px" }}
          >
            <p style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "14px", fontWeight: 600,
            }}>
              Our Journey
            </p>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(30px, 4vw, 48px)",
              color: "#F8F6F1",
            }}>
              Milestones
            </h2>
          </motion.div>

          <div style={{ position: "relative" }}>
            {/* Vertical line */}
            <div style={{
              position: "absolute",
              left: "50%", top: 0, bottom: 0,
              width: "1px",
              background: "rgba(123,158,116,0.3)",
              transform: "translateX(-50%)",
            }} />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{
                  display: "flex",
                  justifyContent: i % 2 === 0 ? "flex-start" : "flex-end",
                  marginBottom: "48px",
                  position: "relative",
                }}
              >
                {/* Center dot */}
                <div style={{
                  position: "absolute",
                  left: "50%", top: "24px",
                  width: "12px", height: "12px",
                  borderRadius: "50%",
                  background: "#7B9E74",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }} />

                <div style={{
                  width: "45%",
                  background: "#2A2A2A",
                  borderRadius: "12px",
                  padding: "28px 32px",
                  border: "1px solid rgba(123,158,116,0.15)",
                }}>
                  <div style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "32px", color: "#7B9E74",
                    marginBottom: "8px",
                  }}>
                    {item.year}
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "20px", color: "#F8F6F1",
                    marginBottom: "10px",
                  }}>
                    {item.title}
                  </h3>
                  <p style={{
                    fontSize: "16px", color: "#F8F6F1",
                    opacity: 0.6, lineHeight: 1.7,
                  }}>
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{
        background: "#F8F6F1",
        padding: "100px 48px",
        textAlign: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p style={{
            fontSize: "12px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#7B9E74",
            marginBottom: "16px", fontWeight: 600,
          }}>
            Taste The Story
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(30px, 4vw, 52px)",
            color: "#1E1E1E", marginBottom: "20px",
          }}>
            Experience Brew & Co.
          </h2>
          <p style={{
            fontSize: "18px", color: "#4A4A45",
            marginBottom: "40px", lineHeight: 1.8,
          }}>
            Every cup carries our story. Come taste it for yourself.
          </p>
          <div style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/menu" style={{
              background: "#3D5C38", color: "#F8F6F1",
              padding: "15px 36px", borderRadius: "6px",
              textDecoration: "none", fontSize: "15px", fontWeight: 700,
              transition: "background 0.3s ease, transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2A4620";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3D5C38";
              e.currentTarget.style.transform = "scale(1)";
            }}>
              View Our Menu
            </Link>
            <Link href="/order" style={{
              background: "transparent", color: "#1E1E1E",
              padding: "15px 36px", borderRadius: "6px",
              textDecoration: "none", fontSize: "15px", fontWeight: 600,
              border: "1.5px solid #C8C4B8",
              transition: "background 0.3s ease, color 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#3D5C38";
              e.currentTarget.style.color = "#F8F6F1";
              e.currentTarget.style.borderColor = "#3D5C38";
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#1E1E1E";
              e.currentTarget.style.borderColor = "#C8C4B8";
              e.currentTarget.style.transform = "scale(1)";
            }}>
              Order Now
            </Link>
          </div>
        </motion.div>
      </section>

    </main>
  );
}