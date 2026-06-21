"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

interface MenuItem {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

interface CartItem extends MenuItem {
  quantity: number;
}

const colors = {
  bg: "#F8F6F1",
  card: "#FFFFFF",
  accent: "#7B9E74",
  accentDark: "#4A6741",
  text: "#1E1E1E",
  textMid: "#4A4A45",
  textMuted: "#8A8A80",
  border: "#E8E4DC",
};

export default function OrderPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    note: "",
  });

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setMenu(data.data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching menu:", err);
        setLoading(false);
      });

    const savedCart = localStorage.getItem("brew-cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  const toggleCart = (item: MenuItem) => {
  const existing = cart.find((c) => c.id === item.id);
  let updated;
  if (existing) {
    updated = cart.map((c) => (c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c));
  } else {
    updated = [...cart, { ...item, quantity: 1 }];
  }
  setCart(updated);
  localStorage.setItem("brew-cart", JSON.stringify(updated));
};

  const removeFromCart = (id: string) => {
  const updated = cart.filter((c) => c.id !== id);
  setCart(updated);
  localStorage.setItem("brew-cart", JSON.stringify(updated));
};

  const updateQuantity = (id: string, quantity: number) => {
  if (quantity <= 0) {
    removeFromCart(id);
  } else {
    const updated = cart.map((c) => (c.id === id ? { ...c, quantity } : c));
    setCart(updated);
    localStorage.setItem("brew-cart", JSON.stringify(updated));
  }
};
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleFormChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert("Please fill in all fields");
      return;
    }

    if (cart.length === 0) {
      alert("Please add items to your order");
      return;
    }

    setOrderLoading(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
          },
          items: cart.map((item) => ({
            menuItemId: item.id,
            quantity: item.quantity,
          })),
          note: formData.note,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        localStorage.removeItem("brew-cart");
        router.push(`/order/success?orderId=${data.data.id}`);
      } else {
        alert(data.error || "Error placing order. Please try again.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Error placing order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  const stepVariants = {
    enter: { x: 60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: -60, opacity: 0 },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main style={{ background: colors.bg, minHeight: "100vh" }}>
      {/* HERO SECTION */}
      <section style={{ padding: "140px 48px 80px", position: "relative", overflow: "hidden" }}>
        <div
          style={{
            position: "absolute",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #EEF2EC 0%, transparent 70%)",
            top: "50%",
            right: "-200px",
            transform: "translateY(-50%)",
          }}
        />
        <div style={{ maxWidth: "1200px", margin: "0 auto", position: "relative", zIndex: 1 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p
              style={{
                fontSize: "12px",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: colors.accent,
                marginBottom: "16px",
                fontWeight: 600,
              }}
            >
              Order Ahead
            </p>
            <h1
              style={{
                fontFamily: "var(--font-dm-serif)",
                fontSize: "clamp(48px, 7vw, 80px)",
                color: colors.text,
                lineHeight: 1.1,
                marginBottom: "20px",
              }}
            >
              Your Perfect Brew,{" "}
              <span style={{ color: colors.accent, fontStyle: "italic" }}>Delivered Fresh</span>
            </h1>
            <p
              style={{
                fontSize: "18px",
                color: colors.textMuted,
                lineHeight: 1.8,
                maxWidth: "500px",
              }}
            >
              Handpicked coffee, delivered to your door in 30–45 minutes. Order now and enjoy
              Brew & Co.'s finest.
            </p>
          </motion.div>
        </div>
      </section>

      {/* STEPS CONTAINER */}
      <section style={{ padding: "60px 48px 100px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          {/* STEP INDICATOR */}
          <div style={{ display: "flex", gap: "12px", marginBottom: "60px" }}>
            {[1, 2, 3].map((s) => (
              <motion.div
                key={s}
                style={{
                  flex: 1,
                  height: "4px",
                  borderRadius: "2px",
                  background: s <= step ? colors.accent : colors.border,
                  transition: "background 0.3s",
                }}
              />
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* STEP 1: SELECT ITEMS */}
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "44px",
                    color: colors.text,
                    marginBottom: "8px",
                  }}
                >
                  Select Your Items
                </h2>
                <p style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "48px" }}>
                  Browse our menu and add your favorites to your order.
                </p>

                {loading ? (
                  <p style={{ color: colors.textMuted }}>Loading menu...</p>
                ) : (
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                      gap: "24px",
                      marginBottom: "48px",
                    }}
                  >
                    {menu.map((item) => (
                      <motion.div
                        key={item.id}
                        whileHover={{ y: -8 }}
                        style={{
                          background: colors.card,
                          padding: "24px",
                          borderRadius: "12px",
                          border: `1px solid ${colors.border}`,
                          cursor: "pointer",
                        }}
                      >
                        <div style={{ marginBottom: "12px" }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "start",
                              marginBottom: "8px",
                            }}
                          >
                            <h3
                              style={{
                                fontFamily: "var(--font-dm-serif)",
                                fontSize: "18px",
                                color: colors.text,
                              }}
                            >
                              {item.name}
                            </h3>
                            <span style={{ fontSize: "18px", fontWeight: 600, color: colors.accent }}>
                              Rs. {item.price}
                            </span>
                          </div>
                          <p style={{ fontSize: "12px", color: colors.accent, fontWeight: 500 }}>
                            {item.category}
                          </p>
                        </div>
                        <p style={{ fontSize: "14px", color: colors.textMuted, marginBottom: "16px", lineHeight: 1.6 }}>
                          {item.description}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => toggleCart(item)}
                          style={{
                            width: "100%",
                            padding: "12px 16px",
                            background: colors.accent,
                            color: colors.bg,
                            border: "none",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "background 0.2s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = colors.accentDark)
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = colors.accent)
                          }
                        >
                          Add to Order
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}

                {/* CART SUMMARY */}
                <div
                  style={{
                    background: colors.card,
                    padding: "32px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    marginBottom: "32px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-dm-serif)",
                      fontSize: "24px",
                      color: colors.text,
                      marginBottom: "24px",
                    }}
                  >
                    Order Summary
                  </h3>

                  {cart.length === 0 ? (
                    <p style={{ color: colors.textMuted }}>No items added yet</p>
                  ) : (
                    <>
                      <div style={{ marginBottom: "24px" }}>
                        {cart.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              paddingBottom: "16px",
                              borderBottom: `1px solid ${colors.border}`,
                              marginBottom: "16px",
                            }}
                          >
                            <div>
                              <p style={{ fontWeight: 600, color: colors.text, marginBottom: "4px" }}>
                                {item.name}
                              </p>
                              <p style={{ fontSize: "13px", color: colors.textMuted }}>
                                Rs. {item.price} each
                              </p>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) =>
                                  updateQuantity(item.id, parseInt(e.target.value) || 1)
                                }
                                style={{
                                  width: "50px",
                                  padding: "6px 8px",
                                  border: `1px solid ${colors.border}`,
                                  borderRadius: "6px",
                                  textAlign: "center",
                                  fontSize: "14px",
                                }}
                              />
                              <button
                                onClick={() => removeFromCart(item.id)}
                                style={{
                                  background: "none",
                                  border: "none",
                                  color: "#D32F2F",
                                  cursor: "pointer",
                                  fontSize: "14px",
                                  fontWeight: 600,
                                  transition: "color 0.2s ease",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.color = "#A81919";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.color = "#D32F2F";
                                }}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          paddingTop: "16px",
                          borderTop: `2px solid ${colors.border}`,
                          fontSize: "18px",
                          fontWeight: 600,
                          color: colors.text,
                        }}
                      >
                        <span>Total:</span>
                        <span>Rs. {total.toFixed(2)}</span>
                      </div>
                    </>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  disabled={cart.length === 0}
                  style={{
                    width: "100%",
                    padding: "16px 24px",
                    background: cart.length === 0 ? "#CCCCCC" : colors.accent,
                    color: colors.bg,
                    border: "none",
                    borderRadius: "8px",
                    fontSize: "16px",
                    fontWeight: 600,
                    cursor: cart.length === 0 ? "not-allowed" : "pointer",
                  }}
                  onMouseEnter={(e) => {
                    if (cart.length > 0) e.currentTarget.style.background = colors.accentDark;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = cart.length === 0 ? "#CCCCCC" : colors.accent;
                  }}
                >
                  Continue to Delivery →
                </motion.button>
              </motion.div>
            )}

            {/* STEP 2: DELIVERY DETAILS */}
            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "44px",
                    color: colors.text,
                    marginBottom: "8px",
                  }}
                >
                  Delivery Information
                </h2>
                <p style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "48px" }}>
                  Tell us where to deliver your coffee.
                </p>

                <div
                  style={{
                    background: colors.card,
                    padding: "32px",
                    borderRadius: "12px",
                    border: `1px solid ${colors.border}`,
                    marginBottom: "32px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "24px",
                  }}
                >
                  {[
                    { label: "Full Name", name: "name", type: "text", placeholder: "Your name" },
                    {
                      label: "Email Address",
                      name: "email",
                      type: "email",
                      placeholder: "your@email.com",
                    },
                    {
                      label: "Phone Number",
                      name: "phone",
                      type: "tel",
                      placeholder: "+92 300 0000000",
                    },
                    {
                      label: "Delivery Address",
                      name: "address",
                      type: "text",
                      placeholder: "123 Main Street, Lahore",
                    },
                  ].map((field) => (
                    <div key={field.name}>
                      <label
                        style={{
                          display: "block",
                          fontSize: "13px",
                          fontWeight: 600,
                          color: colors.textMid,
                          marginBottom: "8px",
                        }}
                      >
                        {field.label}
                      </label>
                      <input
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name as keyof typeof formData]}
                        onChange={handleFormChange}
                        style={{
                          width: "100%",
                          padding: "12px 14px",
                          border: `1.5px solid ${colors.border}`,
                          borderRadius: "8px",
                          fontSize: "14px",
                          color: colors.text,
                          fontFamily: "var(--font-nunito)",
                          outline: "none",
                          transition: "border-color 0.2s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = colors.accent)}
                        onBlur={(e) => (e.target.style.borderColor = colors.border)}
                      />
                    </div>
                  ))}

                  <div style={{ gridColumn: "1 / -1" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "13px",
                        fontWeight: 600,
                        color: colors.textMid,
                        marginBottom: "8px",
                      }}
                    >
                      Special Notes (Optional)
                    </label>
                    <textarea
                      name="note"
                      placeholder="Any special instructions? (e.g., 'Extra hot', 'Extra sugar')"
                      value={formData.note}
                      onChange={handleFormChange}
                      rows={4}
                      style={{
                        width: "100%",
                        padding: "12px 14px",
                        border: `1.5px solid ${colors.border}`,
                        borderRadius: "8px",
                        fontSize: "14px",
                        color: colors.text,
                        fontFamily: "var(--font-nunito)",
                        outline: "none",
                        resize: "vertical",
                        transition: "border-color 0.2s",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = colors.accent)}
                      onBlur={(e) => (e.target.style.borderColor = colors.border)}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: colors.border,
                      color: colors.text,
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#D3CFBF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = colors.border)}
                  >
                    ← Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(3)}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: colors.accent,
                      color: colors.bg,
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = colors.accentDark)}
                    onMouseLeave={(e) => (e.currentTarget.style.background = colors.accent)}
                  >
                    Review Order →
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* STEP 3: REVIEW & CONFIRM */}
            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    fontFamily: "var(--font-dm-serif)",
                    fontSize: "44px",
                    color: colors.text,
                    marginBottom: "8px",
                  }}
                >
                  Review Your Order
                </h2>
                <p style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "48px" }}>
                  Everything looks good? Confirm to place your order.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                    gap: "24px",
                    marginBottom: "32px",
                  }}
                >
                  {/* ITEMS */}
                  <div
                    style={{
                      background: colors.card,
                      padding: "24px",
                      borderRadius: "12px",
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-dm-serif)",
                        fontSize: "20px",
                        color: colors.text,
                        marginBottom: "20px",
                      }}
                    >
                      Items
                    </h3>
                    <div style={{ marginBottom: "16px" }}>
                      {cart.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            paddingBottom: "12px",
                            marginBottom: "12px",
                            borderBottom: `1px solid ${colors.border}`,
                            fontSize: "14px",
                            color: colors.textMuted,
                          }}
                        >
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                          <span>Rs. {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: `2px solid ${colors.border}`,
                        fontSize: "16px",
                        fontWeight: 600,
                        color: colors.text,
                      }}
                    >
                      <span>Total:</span>
                      <span>Rs. {total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* DELIVERY INFO */}
                  <div
                    style={{
                      background: colors.card,
                      padding: "24px",
                      borderRadius: "12px",
                      border: `1px solid ${colors.border}`,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "var(--font-dm-serif)",
                        fontSize: "20px",
                        color: colors.text,
                        marginBottom: "20px",
                      }}
                    >
                      Delivery To
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
                          Name
                        </p>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>
                          {formData.name}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
                          Phone
                        </p>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>
                          {formData.phone}
                        </p>
                      </div>
                      <div>
                        <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
                          Address
                        </p>
                        <p style={{ fontSize: "14px", fontWeight: 600, color: colors.text }}>
                          {formData.address}
                        </p>
                      </div>
                      {formData.note && (
                        <div>
                          <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
                            Notes
                          </p>
                          <p style={{ fontSize: "13px", color: colors.textMuted, fontStyle: "italic" }}>
                            {formData.note}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "16px" }}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(2)}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: colors.border,
                      color: colors.text,
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "background 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#D3CFBF")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = colors.border)}
                  >
                    ← Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handlePlaceOrder}
                    disabled={orderLoading}
                    style={{
                      flex: 1,
                      padding: "16px 24px",
                      background: orderLoading ? "#CCCCCC" : colors.accent,
                      color: colors.bg,
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "16px",
                      fontWeight: 600,
                      cursor: orderLoading ? "not-allowed" : "pointer",
                    }}
                    onMouseEnter={(e) => {
                      if (!orderLoading) e.currentTarget.style.background = colors.accentDark;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = orderLoading ? "#CCCCCC" : colors.accent;
                    }}
                  >
                    {orderLoading ? "Placing Order..." : "Place Order"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
