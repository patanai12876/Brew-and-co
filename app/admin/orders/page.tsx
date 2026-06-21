"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface OrderWithDetails {
  id: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  user: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    menuItem: { name: string };
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

const statusColors: Record<string, string> = {
  pending: "#FFA500",
  confirmed: "#4169E1",
  preparing: "#FF6347",
  out_for_delivery: "#32CD32",
  delivered: "#228B22",
  cancelled: "#DC143C",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
      }
    } catch (err) {
      console.error("Error updating order:", err);
    }
  };

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <main style={{ background: colors.bg, minHeight: "100vh", padding: "100px 48px 80px" }}>
      <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <h1
            style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "48px",
              color: colors.text,
              marginBottom: "8px",
            }}
          >
            Orders Management
          </h1>
          <p style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "32px" }}>
            View and manage all customer orders
          </p>
        </motion.div>

        {/* FILTER BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px", flexWrap: "wrap" }}>
          {["all", "pending", "confirmed", "preparing", "out_for_delivery", "delivered"].map(
            (status) => (
              <motion.button
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(status)}
                style={{
                  padding: "8px 16px",
                  background: filter === status ? colors.accent : colors.border,
                  color: filter === status ? colors.bg : colors.text,
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  textTransform: "capitalize",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  if (filter !== status) {
                    e.currentTarget.style.background = colors.accent;
                    e.currentTarget.style.color = colors.bg;
                  }
                }}
                onMouseLeave={(e) => {
                  if (filter !== status) {
                    e.currentTarget.style.background = colors.border;
                    e.currentTarget.style.color = colors.text;
                  }
                }}
              >
                {status.replace(/_/g, " ")}
              </motion.button>
            )
          )}
        </div>

        {/* STATS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px",
          }}
        >
          <div
            style={{
              background: colors.card,
              padding: "16px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
              Total Orders
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: colors.accent }}>
              {orders.length}
            </p>
          </div>
          <div
            style={{
              background: colors.card,
              padding: "16px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
              Pending
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: "#FFA500" }}>
              {orders.filter((o) => o.status === "pending").length}
            </p>
          </div>
          <div
            style={{
              background: colors.card,
              padding: "16px",
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
            }}
          >
            <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
              Total Revenue
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: colors.accent }}>
              Rs. {orders.reduce((sum, o) => sum + o.totalPrice, 0).toFixed(0)}
            </p>
          </div>
        </div>

        {/* ORDERS TABLE */}
        {loading ? (
          <p style={{ color: colors.textMuted }}>Loading orders...</p>
        ) : filteredOrders.length === 0 ? (
          <p style={{ color: colors.textMuted }}>No orders found</p>
        ) : (
          <div
            style={{
              background: colors.card,
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                overflowX: "auto",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "14px",
                }}
              >
                <thead>
                  <tr style={{ background: colors.bg, borderBottom: `1px solid ${colors.border}` }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Order ID
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Customer
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Items
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Total
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Status
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Date
                    </th>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600 }}>
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, idx) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      style={{
                        borderBottom: `1px solid ${colors.border}`,
                        background: idx % 2 === 0 ? colors.bg : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "12px 16px",
                          fontFamily: "monospace",
                          fontSize: "12px",
                          color: colors.accent,
                        }}
                      >
                        {order.id.slice(0, 8)}...
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div>
                          <p style={{ fontWeight: 600, margin: "0 0 4px 0" }}>{order.user.name}</p>
                          <p style={{ fontSize: "12px", color: colors.textMuted, margin: 0 }}>
                            {order.user.phone}
                          </p>
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ fontSize: "12px", color: colors.textMuted }}>
                          {order.items.length} item{order.items.length !== 1 ? "s" : ""}
                        </div>
                      </td>
                      <td style={{ padding: "12px 16px", fontWeight: 600 }}>
                        Rs. {order.totalPrice.toFixed(2)}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <span
                          style={{
                            background: statusColors[order.status] || colors.border,
                            color: "white",
                            padding: "4px 12px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "capitalize",
                          }}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: "12px", color: colors.textMuted }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </td>
                      <td style={{ padding: "12px 16px" }}>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: "6px 8px",
                            border: `1px solid ${colors.border}`,
                            borderRadius: "4px",
                            fontSize: "12px",
                            color: colors.text,
                            background: colors.card,
                            cursor: "pointer",
                          }}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="preparing">Preparing</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
