"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const dynamic = 'force-dynamic';

interface OrderDetails {
  id: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  items: Array<{
    name: string;
    quantity: number;
    unitPrice: number;
  }>;
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

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      fetch(`/api/orders/${orderId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setOrderDetails(data.data);
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching order:", err);
          setLoading(false);
        });
    }
  }, [orderId]);

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <main style={{ background: colors.bg, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* HERO SECTION */}
      <section style={{ padding: "140px 48px 80px", position: "relative", overflow: "hidden", flex: 1 }}>
        <div
          style={{
            position: "absolute",
            width: "560px",
            height: "560px",
            borderRadius: "50%",
            background: "radial-gradient(circle, #EEF2EC 0%, transparent 70%)",
            top: "-150px",
            right: "-200px",
          }}
        />
        <div style={{ maxWidth: "700px", margin: "0 auto", position: "relative", zIndex: 1, textAlign: "center" }}>
          {/* CHECKMARK ANIMATION */}
          <motion.svg
            style={{
              width: "100px",
              height: "100px",
              margin: "0 auto 32px",
              color: colors.accent,
            }}
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
              d="M 20 50 L 40 70 L 80 30"
            />
          </motion.svg>

          {/* HEADING */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "clamp(44px, 8vw, 80px)",
              color: colors.text,
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            Order Confirmed!
          </motion.h1>

          {/* SUBHEADING */}
          <motion.p
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.2 } } }}
            style={{
              fontSize: "18px",
              color: colors.textMuted,
              lineHeight: 1.8,
              maxWidth: "480px",
              margin: "0 auto 40px",
            }}
          >
            Your delicious coffee is being prepared and will arrive in 30–45 minutes.
          </motion.p>

          {/* CONFIRMATION BOX */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.4 } } }}
            style={{
              background: colors.card,
              padding: "32px",
              borderRadius: "12px",
              border: `1px solid ${colors.border}`,
              marginBottom: "32px",
            }}
          >
            {orderId && (
              <div style={{ marginBottom: "12px" }}>
                <p style={{ fontSize: "12px", color: colors.textMuted, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
                  Order ID
                </p>
                <p style={{ fontSize: "22px", fontWeight: 600, color: colors.accent, fontFamily: "monospace" }}>
                  {orderId}
                </p>
              </div>
            )}
            <p style={{ fontSize: "14px", color: colors.textMuted, marginTop: "16px" }}>
              A confirmation email has been sent to your registered email address with tracking details.
            </p>
          </motion.div>

          {/* ORDER DETAILS */}
          {loading ? (
            <motion.p
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              style={{ color: colors.textMuted }}
            >
              Loading order details...
            </motion.p>
          ) : orderDetails ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.6 } } }}
              style={{
                background: colors.card,
                padding: "32px",
                borderRadius: "12px",
                border: `1px solid ${colors.border}`,
                marginBottom: "48px",
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-dm-serif)",
                  fontSize: "22px",
                  color: colors.text,
                  marginBottom: "24px",
                }}
              >
                Order Summary
              </h3>
              <div style={{ marginBottom: "24px" }}>
                {orderDetails.items?.map((item, idx) => (
                  <div
                    key={idx}
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
                    <span>Rs. {(item.unitPrice * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "12px",
                  borderTop: `2px solid ${colors.border}`,
                  fontSize: "18px",
                  fontWeight: 600,
                  color: colors.text,
                }}
              >
                <span>Total:</span>
                <span>Rs. {orderDetails.totalPrice.toFixed(2)}</span>
              </div>
            </motion.div>
          ) : null}

          {/* ACTION BUTTONS */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 0.8 } } }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <Link
              href="/"
              style={{
                display: "inline-block",
                padding: "16px 40px",
                background: colors.accent,
                color: colors.bg,
                fontWeight: 600,
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                transition: "background 0.3s",
                border: "none",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = colors.accentDark)}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.accent)}
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              style={{
                display: "inline-block",
                padding: "16px 40px",
                background: colors.border,
                color: colors.text,
                fontWeight: 600,
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "16px",
                transition: "background 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#DDD5CC")}
              onMouseLeave={(e) => (e.currentTarget.style.background = colors.border)}
            >
              Continue Shopping
            </Link>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={{ ...fadeUp, visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: 1.0 } } }}
            style={{
              fontSize: "14px",
              color: colors.textMuted,
              marginTop: "32px",
            }}
          >
            Have questions?{" "}
            <Link
              href="/contact"
              style={{
                color: colors.accent,
                fontWeight: 600,
                textDecoration: "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.accentDark)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.accent)}
            >
              Contact Us
            </Link>
          </motion.p>
        </div>
      </section>
    </main>
  );
}
