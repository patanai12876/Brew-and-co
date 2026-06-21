"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const posts = [
  {
    slug: "perfect-espresso",
    image: "/blog/espress.jpg",
    category: "Craft",
    title: "The Art of the Perfect Espresso",
    date: "March 12, 2025",
    readTime: "4 min read",
    excerpt:
      "What separates a good espresso from a great one? We break down the science and soul behind every shot — from grind size to extraction time.",
    color: "#EEF2EC",
  },
  {
    slug: "cold-brew-lahore",
    image: "/blog/coldb.jpeg",
    category: "Culture",
    title: "Why Cold Brew is Taking Over Lahore",
    date: "February 28, 2025",
    readTime: "5 min read",
    excerpt:
      "Lahore summers are intense. Cold brew is the answer. Here's why it's becoming everyone's daily ritual — and how we make ours differently.",
    color: "#E8F0F8",
  },
  {
    slug: "bean-sourcing",
     image: "/blog/beans.jpg",
    category: "Sourcing",
    title: "Our Bean Sourcing Journey",
    date: "January 15, 2025",
    readTime: "6 min read",
    excerpt:
      "From Ethiopian highlands to your cup — the story of how we find, select, and roast our single-origin beans every week in Lahore.",
    color: "#F5ECD7",
  },
  {
    slug: "latte-art-guide",
  image:  "/blog/latte.jpg",
    category: "Craft",
    title: "Latte Art: More Than Just Pretty",
    date: "December 10, 2024",
    readTime: "3 min read",
    excerpt:
      "Latte art isn't decoration — it's a signal. If the art is clean, the milk is steamed right. Here's what your barista is really telling you.",
    color: "#EEF2EC",
  },
  {
    slug: "coffee-health",
    image: "/blog/milk.jpg",
    category: "Wellness",
    title: "Coffee & Your Health: What the Science Says",
    date: "November 5, 2024",
    readTime: "7 min read",
    excerpt:
      "Is coffee good or bad for you? We cut through the noise and share what research actually says about your daily cup.",
    color: "#F0EDE6",
  },
  {
    slug: "brewing-at-home",
    image: "/blog/brew.avif",
    category: "Guide",
    title: "Brewing Cafe-Quality Coffee at Home",
    date: "October 20, 2024",
    readTime: "8 min read",
    excerpt:
      "You don't need a Rs. 200,000 machine. With the right technique and decent equipment, you can brew something special at home.",
    color: "#E8F0F8",
  },
];

export default function BlogPage() {
  return (
    <main>

      {/* ===== HERO ===== */}
      <section style={{
        background: "#1E1E1E",
        padding: "140px 48px 80px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "500px", height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(123,158,116,0.07) 0%, transparent 70%)",
          top: "50%", right: "-80px", transform: "translateY(-50%)",
        }} />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.p variants={fadeUp} style={{
              fontSize: "12px", letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#7B9E74",
              marginBottom: "16px",  fontWeight: 600,
            }}>
              Stories & Insights
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(44px, 6vw, 80px)",
              color: "#F8F6F1", lineHeight: 1.1,
              marginBottom: "20px",
            }}>
              Coffee{" "}
              <span style={{ color: "#7B9E74", fontStyle: "italic" }}>
                Culture
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontSize: "18px", color: "#F8F6F1",
              opacity: 0.6, lineHeight: 1.8, maxWidth: "500px",
            }}>
              Brewing knowledge, one post at a time. From craft and culture
              to science and sourcing.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== FEATURED POST ===== */}
      <section style={{ background: "#F8F6F1", padding: "80px 48px 0" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{
            fontSize: "12px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#7B9E74",
            marginBottom: "20px", fontWeight: 600,
          }}>
            Featured
          </p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{ y: -4 }}
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #E8E4DC",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
            }}
          >
          <div style={{
  minHeight: "200px",
  overflow: "hidden",
}}>
  <img
    src="/blog/espress.jpg"
    alt="Perfect Espresso"
    style={{
      width:"100%",
      height:"100%",
      objectFit:"cover",
      display:"block",
    }}
  />
</div>
            <div style={{ padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <span style={{
                  fontSize: "11px", fontWeight: 700,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#7B9E74",
                }}>
                  Craft
                </span>
                <span style={{ fontSize: "11px", color: "#8A8A80" }}>·</span>
                <span style={{ fontSize: "11px", color: "#8A8A80" }}>4 min read</span>
              </div>
              <h2 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(24px, 3vw, 36px)",
                color: "#1E1E1E", marginBottom: "16px",
                lineHeight: 1.2,
              }}>
                The Art of the Perfect Espresso
              </h2>
              <p style={{
                fontSize: "16px", color: "#4A4A45",
                lineHeight: 1.8, marginBottom: "32px",
              }}>
                What separates a good espresso from a great one? We break down
                the science and soul behind every shot — from grind size to
                extraction time.
              </p>
              <Link href="/blog/perfect-espresso" style={{
                display: "inline-flex", alignItems: "center", gap: "10px",
                color: "#3D5C38", textDecoration: "none",
                fontSize: "14px", fontWeight: 700,
                transition: "color 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#7B9E74";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#3D5C38";
              }}>
                Read Article
                <span style={{
                  width: "30px", height: "30px", borderRadius: "50%",
                  border: "1.5px solid #3D5C38",
                  display: "inline-flex", alignItems: "center",
                  justifyContent: "center", fontSize: "12px",
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
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== ALL POSTS ===== */}
      <section style={{ background: "#F8F6F1", padding: "60px 48px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <p style={{
            fontSize: "12px", letterSpacing: "0.2em",
            textTransform: "uppercase", color: "#7B9E74",
            marginBottom: "32px", fontWeight: 600,
          }}>
            All Posts
          </p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}
          >
            {posts.map((post, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid #E8E4DC",
                  display: "flex", flexDirection: "column",
                }}
              >
               <div style={{
  height: "280px",
  overflow:"hidden",
  background: post.color,
}}>

  <img
    src={post.image}
    alt={post.title}
    style={{
      width:"100%",
      height:"100%",
      objectFit:"cover",
      display:"block",
      transition:"transform .4s ease",
    }}
  />

</div>
                <div style={{
                  padding: "24px",
                  display: "flex", flexDirection: "column", flex: 1,
                }}>
                  <div style={{
                    display: "flex", alignItems: "center",
                    gap: "10px", marginBottom: "12px",
                  }}>
                    <span style={{
                      fontSize: "11px", fontWeight: 700,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      color: "#7B9E74",
                    }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: "11px", color: "#C8C4B8" }}>·</span>
                    <span style={{ fontSize: "11px", color: "#8A8A80" }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "20px", color: "#1E1E1E",
                    marginBottom: "10px", lineHeight: 1.3,
                  }}>
                    {post.title}
                  </h3>
                  <p style={{
                    fontSize: "14px", color: "#4A4A45",
                    lineHeight: 1.7, marginBottom: "24px", flex: 1,
                  }}>
                    {post.excerpt}
                  </p>
                  <div style={{
                    display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid #E8E4DC",
                    paddingTop: "16px",
                  }}>
                    <span style={{ fontSize: "12px", color: "#8A8A80" }}>
                      {post.date}
                    </span>
                    <Link href={`/blog/${post.slug}`} style={{
                      fontSize: "13px", color: "#3D5C38",
                      textDecoration: "none", fontWeight: 700,
                      borderBottom: "1px solid #7B9E74",
                      paddingBottom: "1px",
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
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

    </main>
  );
}