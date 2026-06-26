"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
   image:string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

export default function HomePage() {
  const [bestsellers, setBestsellers] = useState<MenuItem[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    fetch("/api/menu?limit=3")
      .then((r) => r.json())
      .then((d) => { if (d.success) setBestsellers(d.data); })
      .catch(console.error);
  }, []);

  // Force video playback
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Wait for video to be ready
      const handleCanPlay = () => {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            console.log("Autoplay prevented");
          });
        }
      };

      if (video.readyState >= 2) {
        handleCanPlay();
      } else {
        video.addEventListener("canplay", handleCanPlay, { once: true });
      }

      return () => {
        video.removeEventListener("canplay", handleCanPlay);
      };
    }
  }, []);

  return (
    <main>

{/* ===== HERO ===== */}
<section style={{
  minHeight: "100vh",
  position: "relative",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
    background: "#1a0a00",
}}>

  {/* Background Video */}
  <video
    ref={videoRef}
    autoPlay
    muted
    loop
    playsInline
    preload="metadata"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      zIndex: 0,
    }}
    onError={() => console.log("Video failed to load")}
  >
    <source src="/video2.mp4" type="video/mp4" />
  </video>

  {/* Dark overlay — video ke upar */}
  <div style={{
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.25) 100%)",
    zIndex: 1,
  }} />

  {/* Content */}
  <div style={{
    position: "relative", zIndex: 2,
    maxWidth: "1200px", margin: "0 auto",
    width: "100%", padding: "140px 48px 80px",
  }}>
    <motion.div initial="hidden" animate="visible" variants={stagger}>

      {/* Badge */}
      <motion.div variants={fadeUp} style={{ marginBottom: "28px" }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: "8px",
          background: "rgba(255,255,255,0.12)",
          border: "1px solid rgba(255,255,255,0.25)",
          borderRadius: "100px", padding: "6px 16px",
          fontSize: "12px", fontWeight: 600,
          letterSpacing: "0.1em", textTransform: "uppercase",
          color: "#fff",
          backdropFilter: "blur(8px)",
        }}>
          <span style={{
            width: "6px", height: "6px",
            borderRadius: "50%", background: "#7B9E74",
            display: "inline-block",
          }} />
          Lahore's Finest Since 2020
        </span>
      </motion.div>

      {/* Heading */}
      <motion.h1 variants={fadeUp} style={{
        fontFamily: "var(--font-dm-serif)",
        fontSize: "clamp(44px, 5.5vw, 78px)",
        fontWeight: 400, lineHeight: 1.1,
        color: "#fff", marginBottom: "24px",
        maxWidth: "640px",
      }}>
         Slow Down.
  <br />
  <span style={{ color: "#A8C5A0", fontStyle: "italic" }}>
    Sip Something
  </span>
  <br />
  Beautiful.
</motion.h1>

      {/* Description */}
      <motion.p variants={fadeUp} style={{
        fontSize: "19px", color: "rgba(255,255,255,0.75)",
        lineHeight: 1.85, marginBottom: "44px",
        maxWidth: "460px",
      }}>
       Handcrafted coffee for people who believe
  a great cup deserves a quiet moment —
  brewed fresh, served with care,
  in the heart of Lahore.
      </motion.p>

      {/* Buttons */}
      <motion.div variants={fadeUp} style={{
        display: "flex", gap: "14px", flexWrap: "wrap",
      }}>
        <Link href="/order" style={{
          background: "#3D5C38", color: "#F8F6F1",
          padding: "15px 36px", borderRadius: "6px",
          textDecoration: "none", fontSize: "17px",
          fontWeight: 700, letterSpacing: "0.04em",
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
          Order Now
        </Link>
        <Link href="/menu" style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
          color: "#fff",
          padding: "15px 36px", borderRadius: "6px",
          textDecoration: "none", fontSize: "17px",
          fontWeight: 600,
          border: "1.5px solid rgba(255,255,255,0.3)",
          transition: "background 0.3s ease, border-color 0.3s ease, transform 0.2s ease",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.15)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.5)";
          e.currentTarget.style.transform = "scale(1.02)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "rgba(255,255,255,0.1)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)";
          e.currentTarget.style.transform = "scale(1)";
        }}>
          Explore Menu
        </Link>
      </motion.div>

    </motion.div>
  </div>
</section>

    {/* ===== BRAND PILLARS ===== */}
<section style={{ background: "#F8F6F1", padding: "90px 48px 0px" }}>
  <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      style={{ textAlign: "center", marginBottom: "60px" }}
    >
      <p style={{
        fontSize: "16px", letterSpacing: "0.2em",
        textTransform: "uppercase", color: "#7B9E74",
        marginBottom: "14px", fontWeight: 600,
      }}>
        Why Choose Us
      </p>
      <h2 style={{
        fontFamily: "var(--font-dm-serif)",
        fontSize: "clamp(30px, 4vw, 50px)",
        color: "#1E1E1E", fontWeight: 400,
      }}>
        The Brew & Co. Difference
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
        gap: "1px", background: "#E8E4DC",
        borderRadius: "12px", overflow: "hidden",
        border: "1px solid #E8E4DC",
      }}
    >
      {[
        { title: "Premium Beans", desc: "Single-origin beans from Ethiopia, Colombia, and Guatemala — roasted fresh every week in Lahore." },
        { title: "Expert Baristas", desc: "Our team trains for months. Every extraction, every pour, every latte art — done with precision." },
        { title: "Delivered Fresh", desc: "Hot coffee, fresh pastries — at your door in 30–45 minutes. No compromise on quality." },
      ].map((item, i) => (
        <motion.div
          key={i}
          variants={fadeUp}
          style={{
            background: "#FFFFFF",
            padding: "44px 36px",
          }}
        >
          
          <h3 style={{
            fontFamily: "var(--font-dm-serif)",
            color: "#1E1E1E", fontSize: "22px",
            marginBottom: "14px",
          }}>
            {item.title}
          </h3>
          <p style={{
            color: "#4A4A45",
            fontSize: "17px", lineHeight: 1.8,
          }}>
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* ===== BESTSELLERS ===== */}
      <section style={{ background: "#F8F6F1", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap", gap: "16px",
              marginBottom: "52px",
            }}
          >
            <div>
              <p style={{
                fontSize: "16px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#7B9E74",
                marginBottom: "10px", fontWeight: 600,
              }}>
                Most Loved
              </p>
              <h2 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(30px, 4vw, 50px)",
                color: "#1E1E1E", fontWeight: 400,
              }}>
                Our Bestsellers
              </h2>
            </div>
            <Link href="/menu" style={{
              fontSize: "16px", color: "#4A6741",
              textDecoration: "none", fontWeight: 600,
              borderBottom: "1.5px solid #7B9E74",
              paddingBottom: "2px",
              transition: "color 0.3s ease, border-color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#7B9E74";
              e.currentTarget.style.borderBottomColor = "#3D5C38";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#4A6741";
              e.currentTarget.style.borderBottomColor = "#7B9E74";
            }}>
              Full Menu →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {bestsellers.map((item, i) => (
              <motion.div
                key={item.id}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E8E4DC",
                }}
              >
              <div style={{
  height: "180px",
  background: "#EEF2EC",
  position: "relative",
  overflow: "hidden",
}}>

  <img
    src={item.image || "/menu/default.jpg"}
    alt={item.name}
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
    }}
  />
                  {i === 1 && (
                    <span style={{
                      position: "absolute", top: "16px", right: "16px",
                      background: "#F8F6F1", color: "#3D5C38",
                      fontSize: "10px", fontWeight: 700,
                      padding: "4px 10px", borderRadius: "100px",
                      letterSpacing: "0.05em",
                    }}>
                      ★ POPULAR
                    </span>
                  )}
                </div>
                <div style={{ padding: "28px" }}>
                  <span style={{
                    fontSize: "13px", fontWeight: 700,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    color: "#7B9E74",
                  }}>
                    {item.category}
                  </span>
                  <h3 style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "20px", color: "#1E1E1E",
                    margin: "8px 0 10px",
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontSize: "17px", color: "#4A4A45",
                    lineHeight: 1.7, marginBottom: "24px",
                  }}>
                    {item.description}
                  </p>
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #E8E4DC",
                    paddingTop: "20px",
                  }}>
                    <div>
                      <div style={{ fontSize: "14px", color: "#8A8A80", marginBottom: "2px" }}>Price</div>
                      <div style={{
                        fontFamily: "var(--font-dm-serif)",
                        fontSize: "22px", color: "#1E1E1E",
                      }}>
                        Rs. {item.price}
                      </div>
                    </div>
                    <Link href="/order" style={{
                      background: "#3D5C38", color: "#F8F6F1",
                      padding: "11px 22px", borderRadius: "6px",
                      textDecoration: "none", fontSize: "13px",
                      fontWeight: 700,
                      transition: "background 0.3s ease, transform 0.2s ease",
                      cursor: "pointer",
                      display: "inline-block",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#2A4620";
                      e.currentTarget.style.transform = "scale(1.05)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#3D5C38";
                      e.currentTarget.style.transform = "scale(1)";
                    }}>
                      Order Now
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== STORY TEASER ===== */}
      <section style={{ background: "#F0EDE6", padding: "100px 48px" }}>
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
              fontSize: "16px", letterSpacing: "0.18em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "16px", fontWeight: 600,
            }}>
              Who We Are
            </p>
            <h2 style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(30px, 4vw, 50px)",
              color: "#1E1E1E", marginBottom: "24px",
              lineHeight: 1.15,
            }}>
              A Story Brewed
              <br />
              <span style={{ color: "#7B9E74", fontStyle: "italic" }}>
                With Love
              </span>
            </h2>
            <p style={{
              fontSize: "19px", color: "#4A4A45",
              lineHeight: 1.9, marginBottom: "16px",
            }}>
              Brew & Co. was born from a simple belief — that great coffee
              should be accessible to everyone in Lahore. We started with
              one espresso machine and a dream.
            </p>
            <p style={{
              fontSize: "19px", color: "#4A4A45",
              lineHeight: 1.9, marginBottom: "40px",
            }}>
              Today, we craft hundreds of cups daily with the same passion
              and precision as day one.
            </p>
            <Link href="/about" style={{
              display: "inline-flex", alignItems: "center", gap: "12px",
              color: "#3D5C38", textDecoration: "none",
              fontSize: "16px", fontWeight: 700,
              transition: "color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#7B9E74";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#3D5C38";
            }}>
              Read Our Full Story
              <span style={{
                width: "34px", height: "34px", borderRadius: "50%",
                border: "1.5px solid #3D5C38",
                display: "inline-flex", alignItems: "center",
                justifyContent: "center", fontSize: "14px",
                transition: "border-color 0.3s ease, background 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#7B9E74";
                e.currentTarget.style.background = "#F5F3EE";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#3D5C38";
                e.currentTarget.style.background = "transparent";
              }}>→</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ position: "relative" }}
          >
           <div style={{
  background: "#EEF2EC",
  borderRadius: "12px",
  height: "440px",
  position: "relative",
  overflow: "hidden",
  border: "1px solid #C8C4B8",
}}>
  
  <img
    src="coffee2.webp "
    alt="Brew & Co Coffee"
    style={{
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 0.6s ease",
    }}
  />

  {/* Dark gradient overlay */}
  <div style={{
     position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "linear-gradient(to bottom, rgba(0,0,0,0) 45%, rgba(30,30,30,0.65) 100%)",
  }} />

  {/* Quote section */}
  <div style={{
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "28px",
    zIndex: 2,
  }}>
    <div style={{
      fontFamily: "var(--font-dm-serif)",
      fontSize: "17px",
      color: "#F8F6F1",
      fontStyle: "italic",
      lineHeight: "1.5",
    }}>
      "Every cup is a moment of joy"
    </div>

    <div style={{
      fontSize: "15px",
      color: "#A8C49D",
      marginTop: "8px",
    }}>
      — Founder, Brew & Co.
    </div>
  </div>

</div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity }}
              style={{
                position: "absolute", top: "-16px", right: "-16px",
                background: "#3D5C38", borderRadius: "10px",
                padding: "14px 20px",
                boxShadow: "0 8px 24px rgba(61,92,56,0.3)",
              }}
            >
              <div style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "26px", color: "#F8F6F1",
              }}>4+</div>
              <div style={{ fontSize: "13px", color: "#7B9E74", fontWeight: 600 }}>
                Years of Craft
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ===== BLOG TEASER ===== */}
      <section style={{ background: "#F8F6F1", padding: "100px 48px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              display: "flex", alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap", gap: "16px",
              marginBottom: "52px",
            }}
          >
            <div>
              <p style={{
                fontSize: "16px", letterSpacing: "0.18em",
                textTransform: "uppercase", color: "#7B9E74",
                marginBottom: "10px", fontWeight: 600,
              }}>
                From Our Blog
              </p>
              <h2 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(30px, 4vw, 50px)",
                color: "#1E1E1E", fontWeight: 400,
              }}>
                Coffee Culture
              </h2>
            </div>
            <Link href="/blog" style={{
              fontSize: "14px", color: "#4A6741",
              textDecoration: "none", fontWeight: 600,
              borderBottom: "1.5px solid #7B9E74", paddingBottom: "2px",
              transition: "color 0.3s ease, border-color 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#7B9E74";
              e.currentTarget.style.borderBottomColor = "#3D5C38";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#4A6741";
              e.currentTarget.style.borderBottomColor = "#7B9E74";
            }}>
              All Posts →
            </Link>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              { slug: "perfect-espresso",  image: "/blog/espress.jpg", title: "The Art of the Perfect Espresso", date: "March 12, 2025", excerpt: "What separates a good espresso from a great one? We break down the science and soul behind every shot." },
              { slug: "cold-brew-lahore", image: "/blog/coldb.jpeg", title: "Why Cold Brew is Taking Over Lahore", date: "February 28, 2025", excerpt: "Lahore summers are intense. Cold brew is the answer — here's why it's becoming everyone's daily ritual." },
              { slug: "bean-sourcing", image: "/blog/beans.jpg", title: "Our Bean Sourcing Journey", date: "January 15, 2025", excerpt: "From Ethiopian highlands to your cup — the story of how we find and select our single-origin beans." },
            ].map((post, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E8E4DC",
                }}
              >
                <div
style={{
  height:"220px",
  overflow:"hidden",
}}
>
<img
  src={post.image}
  alt={post.title}
  style={{
    width:"100%",
    height:"100%",
    objectFit:"cover",
    transition:"transform .4s ease",
  }}
/>
</div>
                <div style={{ padding: "24px" }}>
                  <p style={{ fontSize: "15px", color: "#7B9E74", fontWeight: 600, marginBottom: "10px" }}>
                    {post.date}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "20px", color: "#1E1E1E",
                    marginBottom: "10px", lineHeight: 1.4,
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: "16px", color: "#4A4A45",
                    lineHeight: 1.7, marginBottom: "20px",
                  }}>
                    {post.excerpt}
                  </p>
                  <Link href={`/blog/${post.slug}`} style={{
                    fontSize: "13px", color: "#3D5C38",
                    textDecoration: "none", fontWeight: 700,
                    borderBottom: "1px solid #7B9E74",
                    paddingBottom: "2px",
                    transition: "color 0.3s ease, border-color 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#7B9E74";
                    e.currentTarget.style.borderBottomColor = "#3D5C38";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#3D5C38";
                    e.currentTarget.style.borderBottomColor = "#7B9E74";
                  }}>
                    Read More →
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section style={{
        background: "#3D5C38",
        padding: "110px 48px",
        textAlign: "center",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          borderRadius: "50%",
          border: "1px solid rgba(123,158,116,0.2)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }} />
        <div style={{
          position: "absolute", width: "300px", height: "300px",
          borderRadius: "50%",
          border: "1px solid rgba(123,158,116,0.15)",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
        }} />
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <p style={{
            fontSize: "16px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#7B9E74",
            marginBottom: "18px", fontWeight: 600,
          }}>
            Ready to Indulge?
          </p>
          <h2 style={{
            fontFamily: "var(--font-dm-serif)",
            fontSize: "clamp(36px, 5vw, 62px)",
            color: "#F8F6F1", marginBottom: "20px",
            lineHeight: 1.15,
          }}>
            Your Perfect Cup
            <br />
            <span style={{ fontStyle: "italic", color: "#EEF2EC" }}>
              Awaits You
            </span>
          </h2>
          <p style={{
            fontSize: "16px", color: "#F8F6F1",
            opacity: 0.7, marginBottom: "44px",
          }}>
            Fresh artisan coffee — delivered to your door in 30–45 minutes.
          </p>
          <Link href="/order" style={{
            background: "#F8F6F1", color: "#3D5C38",
            padding: "16px 44px", borderRadius: "6px",
            textDecoration: "none", fontSize: "17px",
            fontWeight: 800, letterSpacing: "0.05em",
            transition: "background 0.3s ease, transform 0.2s ease",
            cursor: "pointer",
            display: "inline-block",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#E8E4DC";
            e.currentTarget.style.transform = "scale(1.03)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#F8F6F1";
            e.currentTarget.style.transform = "scale(1)";
          }}>
            Order Now
          </Link>
        </motion.div>
      </section>

    </main>
  );
}