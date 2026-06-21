"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  available: boolean;
  image: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const categories = ["All", "Coffee", "Cold Drinks", "Food"];



const popularItems = ["Cappuccino", "Cold Brew", "Club Sandwich"];

export default function MenuPage() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [toast, setToast] = useState<string | null>(null);

 useEffect(() => {
  fetch("/api/menu")
    .then((r) => r.json())
    .then((d) => {
      if (d.success) setItems(d.data);
      setLoading(false);
    })
    .catch(() => {
      // Retry once on failure
      setTimeout(() => {
        fetch("/api/menu")
          .then((r) => r.json())
          .then((d) => {
            if (d.success) setItems(d.data);
            setLoading(false);
          })
          .catch(() => setLoading(false));
      }, 2000);
    });
}, []);

  // Load cart from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("brew-cart");
    if (saved) setCart(JSON.parse(saved));
  }, []);

  const filtered = activeCategory === "All"
    ? items
    : items.filter((i) => i.category === activeCategory);

  const addToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      const updated = existing
        ? prev.map((c) => c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c)
        : [...prev, { id: item.id, name: item.name, price: item.price, quantity: 1 }];
      localStorage.setItem("brew-cart", JSON.stringify(updated));
      return updated;
    });
    setToast(`${item.name} added to order!`);
    setTimeout(() => setToast(null), 2500);
  };

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <main>

      {/* ===== HERO ===== */}
      <section style={{
        background: "#F0EDE6",
        padding: "140px 48px 60px",
        position: "relative", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", width: "400px", height: "400px",
          borderRadius: "50%",
          background: "radial-gradient(circle, #EEF2EC 0%, transparent 70%)",
          top: "-100px", right: "-50px",
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
              marginBottom: "16px", fontWeight: 600,
            }}>
              Handcrafted With Care
            </motion.p>
            <motion.h1 variants={fadeUp} style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(40px, 5vw, 72px)",
              color: "#1E1E1E", lineHeight: 1.1,
              marginBottom: "20px",
            }}>
              Our{" "}
              <span style={{ color: "#7B9E74", fontStyle: "italic" }}>
                Offerings
              </span>
            </motion.h1>
            <motion.p variants={fadeUp} style={{
              fontSize: "18px", color: "#4A4A45",
              lineHeight: 1.8, maxWidth: "480px",
            }}>
              From bold espressos to refreshing cold brews — every item crafted
              with premium ingredients and served with pride.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ===== FILTERS ===== */}
      <section style={{
        background: "#F8F6F1",
        borderBottom: "1px solid #E8E4DC",
        padding: "0 48px",
        position: "sticky", top: "68px", zIndex: 40,
      }}>
        <div style={{
          maxWidth: "1200px", margin: "0 auto",
          display: "flex", gap: "4px",
          overflowX: "auto",
        }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "18px 24px",
                background: "transparent",
                border: "none",
                borderBottom: activeCategory === cat
                  ? "2px solid #3D5C38"
                  : "2px solid transparent",
                color: activeCategory === cat ? "#3D5C38" : "#8A8A80",
                fontSize: "14px",
                fontWeight: activeCategory === cat ? 700 : 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                transition: "all .15s",
                fontFamily: "var(--font-nunito)",
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.color = "#3D5C38";
                  e.currentTarget.style.borderBottomColor = "#7B9E74";
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== cat) {
                  e.currentTarget.style.color = "#8A8A80";
                  e.currentTarget.style.borderBottomColor = "transparent";
                }
              }}
            >
              {cat}
            </button>
          ))}

          {/* Cart button */}
          {cartCount > 0 && (
            <Link href="/order" style={{
              marginLeft: "auto",
              display: "flex", alignItems: "center", gap: "8px",
              padding: "12px 20px",
              background: "#3D5C38", color: "#F8F6F1",
              borderRadius: "6px", textDecoration: "none",
              fontSize: "13px", fontWeight: 700,
              alignSelf: "center",
              whiteSpace: "nowrap",              transition: "background 0.3s ease, transform 0.2s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2A4620";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3D5C38";
              e.currentTarget.style.transform = "scale(1)";            }}>
              � View Order ({cartCount})
            </Link>
          )}
        </div>
      </section>

      {/* ===== MENU GRID ===== */}
      <section style={{ background: "#F8F6F1", padding: "60px 48px 100px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>

          {loading ? (
            // Skeleton loading
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "20px",
            }}>
              {[...Array(6)].map((_, i) => (
                <div key={i} style={{
                  background: "#FFFFFF",
                  borderRadius: "12px",
                  height: "300px",
                  border: "1px solid #E8E4DC",
                  overflow: "hidden",
                }}>
                  <div style={{
                    height: "140px",
                    background: "linear-gradient(90deg, #F0EDE6 25%, #E8E4DC 50%, #F0EDE6 75%)",
                    animation: "shimmer 1.5s infinite",
                  }} />
                  <div style={{ padding: "20px" }}>
                    <div style={{ height: "14px", background: "#F0EDE6", borderRadius: "4px", marginBottom: "10px", width: "60%" }} />
                    <div style={{ height: "20px", background: "#F0EDE6", borderRadius: "4px", marginBottom: "10px" }} />
                    <div style={{ height: "14px", background: "#F0EDE6", borderRadius: "4px", width: "80%" }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial="hidden"
                animate="visible"
                variants={stagger}
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                  gap: "20px",
                }}
              >
                {filtered.map((item) => {
                  const isPopular = popularItems.includes(item.name);
                  const cartItem = cart.find((c) => c.id === item.id);
                  

                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      whileHover={{ y: -6, transition: { duration: 0.2 } }}
                      style={{
                        background: "#FFFFFF",
                        borderRadius: "12px",
                        overflow: "hidden",
                        border: "1px solid #E8E4DC",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                 {/* Card Image */}
<div style={{
 height:"250px",
 position:"relative",
 overflow:"hidden",
 background:"#EEF2EC",
}}>
  
<img
 src={item.image || "/menu/default.jpg"}
 alt={item.name}
 style={{
   width:"100%",
   height:"100%",
   objectFit:"cover",
 }}
/>


{isPopular && (
<span style={{
 position:"absolute",
 top:"12px",
 right:"12px",
 background:"#3D5C38",
 color:"#F8F6F1",
 fontSize:"10px",
 fontWeight:700,
 padding:"3px 10px",
 borderRadius:"100px",
}}>
★ POPULAR
</span>
)}

</div>

                      {/* Card body */}
                      <div style={{
                        padding: "24px",
                        display: "flex", flexDirection: "column",
                        flex: 1,
                      }}>
                        <span style={{
                          fontSize: "11px", fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: "#7B9E74",
                          marginBottom: "8px",
                          display: "block",
                        }}>
                          {item.category}
                        </span>
                        <h3 style={{
                          fontFamily: "var(--font-dm-serif)",
                          fontSize: "22px", color: "#1E1E1E",
                          marginBottom: "10px",
                        }}>
                          {item.name}
                        </h3>
                        <p style={{
                          fontSize: "15px", color: "#4A4A45",
                          lineHeight: 1.7, marginBottom: "24px",
                          flex: 1,
                        }}>
                          {item.description}
                        </p>

                        <div style={{
                          display: "flex", alignItems: "center",
                          justifyContent: "space-between",
                          borderTop: "1px solid #E8E4DC",
                          paddingTop: "18px",
                        }}>
                          <div>
                            <div style={{
                              fontSize: "11px", color: "#8A8A80",
                              marginBottom: "2px",
                            }}>
                              Price
                            </div>
                            <div style={{
                              fontFamily: "var(--font-dm-serif)",
                              fontSize: "22px", color: "#1E1E1E",
                            }}>
                              Rs. {item.price}
                            </div>
                          </div>

                          <button
                            onClick={() => addToCart(item)}
                            style={{
                              background: cartItem ? "#EEF2EC" : "#3D5C38",
                              color: cartItem ? "#3D5C38" : "#F8F6F1",
                              border: cartItem ? "1.5px solid #7B9E74" : "none",
                              padding: "11px 20px",
                              borderRadius: "6px",
                              fontSize: "13px", fontWeight: 700,
                              cursor: "pointer",
                              transition: "all .2s",
                              fontFamily: "var(--font-nunito)",
                            }}
                            onMouseEnter={(e) => {
                              if (cartItem) {
                                e.currentTarget.style.background = "#D8E9CF";
                                e.currentTarget.style.borderColor = "#3D5C38";
                              } else {
                                e.currentTarget.style.background = "#2A4620";
                                e.currentTarget.style.transform = "scale(1.03)";
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (cartItem) {
                                e.currentTarget.style.background = "#EEF2EC";
                                e.currentTarget.style.borderColor = "#7B9E74";
                              } else {
                                e.currentTarget.style.background = "#3D5C38";
                                e.currentTarget.style.transform = "scale(1)";
                              }
                            }}
                          >
                            {cartItem ? `In Order (${cartItem.quantity})` : "+ Add to Order"}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>☕</div>
              <h3 style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "24px", color: "#1E1E1E", marginBottom: "8px",
              }}>
                Nothing here yet
              </h3>
              <p style={{ fontSize: "16px", color: "#8A8A80" }}>
                Try a different category
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ===== CTA ===== */}
      {cartCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            position: "fixed", bottom: "24px", left: "50%",
            transform: "translateX(-50%)", zIndex: 100,
            background: "#3D5C38", color: "#F8F6F1",
            padding: "16px 32px", borderRadius: "50px",
            display: "flex", alignItems: "center", gap: "16px",
            boxShadow: "0 8px 32px rgba(61,92,56,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ fontSize: "15px", fontWeight: 600 }}>
            🛒 {cartCount} item{cartCount > 1 ? "s" : ""} in your order
          </span>
          <Link href="/order" style={{
            background: "#F8F6F1", color: "#3D5C38",
            padding: "8px 20px", borderRadius: "50px",
            textDecoration: "none", fontSize: "13px", fontWeight: 800,
          }}>
            Checkout →
          </Link>
        </motion.div>
      )}

      {/* ===== TOAST ===== */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            style={{
              position: "fixed", bottom: "90px", left: "50%",
              transform: "translateX(-50%)", zIndex: 200,
              background: "#1E1E1E", color: "#F8F6F1",
              padding: "12px 24px", borderRadius: "8px",
              fontSize: "14px", fontWeight: 600,
              boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              whiteSpace: "nowrap",
            }}
          >
            ✓ {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

    </main>
  );
}