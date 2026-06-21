"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ContactQueryType {
  id: string;
  name: string;
  email: string;
  message: string;
  status: string;
  createdAt: string;
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

export default function AdminContactPage() {
  const [queries, setQueries] = useState<ContactQueryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [selectedQuery, setSelectedQuery] = useState<ContactQueryType | null>(null);

  useEffect(() => {
    fetchQueries();
  }, []);

  const fetchQueries = async () => {
    try {
      const res = await fetch("/api/admin/contact");
      const data = await res.json();
      if (data.success) {
        setQueries(data.data);
      }
    } catch (err) {
      console.error("Error fetching queries:", err);
    } finally {
      setLoading(false);
    }
  };

  const updateQueryStatus = async (queryId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/contact/${queryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setQueries(queries.map((q) => (q.id === queryId ? { ...q, status: newStatus } : q)));
        if (selectedQuery?.id === queryId) {
          setSelectedQuery({ ...selectedQuery, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating query:", err);
    }
  };

  const deleteQuery = async (queryId: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      const res = await fetch(`/api/admin/contact/${queryId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setQueries(queries.filter((q) => q.id !== queryId));
        if (selectedQuery?.id === queryId) {
          setSelectedQuery(null);
        }
      }
    } catch (err) {
      console.error("Error deleting query:", err);
    }
  };

  const filteredQueries =
    filter === "all" ? queries : queries.filter((q) => q.status === filter);

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
            Contact Form Queries
          </h1>
          <p style={{ fontSize: "16px", color: colors.textMuted, marginBottom: "32px" }}>
            Manage customer messages and inquiries
          </p>
        </motion.div>

        {/* FILTER BUTTONS */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "32px" }}>
          {["all", "unread", "read", "replied"].map((status) => (
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
              {status}
            </motion.button>
          ))}
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
              Total Queries
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: colors.accent }}>
              {queries.length}
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
              Unread
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: "#FFA500" }}>
              {queries.filter((q) => q.status === "unread").length}
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
              Replied
            </p>
            <p style={{ fontSize: "28px", fontWeight: 600, color: "#228B22" }}>
              {queries.filter((q) => q.status === "replied").length}
            </p>
          </div>
        </div>

        {/* QUERIES LIST AND DETAILS */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: "24px" }}>
          {/* QUERIES LIST */}
          <div
            style={{
              background: colors.card,
              borderRadius: "8px",
              border: `1px solid ${colors.border}`,
              overflow: "hidden",
            }}
          >
            {loading ? (
              <div style={{ padding: "24px", color: colors.textMuted }}>Loading...</div>
            ) : filteredQueries.length === 0 ? (
              <div style={{ padding: "24px", color: colors.textMuted }}>No queries found</div>
            ) : (
              <div>
                {filteredQueries.map((query, idx) => (
                  <motion.div
                    key={query.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedQuery(query)}
                    style={{
                      padding: "16px",
                      borderBottom: idx < filteredQueries.length - 1 ? `1px solid ${colors.border}` : "none",
                      cursor: "pointer",
                      background:
                        selectedQuery?.id === query.id ? colors.bg : "transparent",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedQuery?.id !== query.id) {
                        e.currentTarget.style.background = "#F5F5F5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedQuery?.id !== query.id) {
                        e.currentTarget.style.background = "transparent";
                      }
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "start",
                        marginBottom: "8px",
                      }}
                    >
                      <div>
                        <p style={{ fontWeight: 600, color: colors.text, margin: "0 0 4px 0" }}>
                          {query.name}
                        </p>
                        <p style={{ fontSize: "12px", color: colors.textMuted, margin: 0 }}>
                          {query.email}
                        </p>
                      </div>
                      <span
                        style={{
                          background:
                            query.status === "unread"
                              ? "#FFA500"
                              : query.status === "replied"
                              ? "#228B22"
                              : "#4A4A45",
                          color: "white",
                          padding: "4px 8px",
                          borderRadius: "3px",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {query.status}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "13px",
                        color: colors.textMuted,
                        margin: "8px 0 4px 0",
                        lineHeight: 1.4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {query.message}
                    </p>
                    <p style={{ fontSize: "11px", color: colors.border, margin: 0 }}>
                      {new Date(query.createdAt).toLocaleString()}
                    </p>
                  </motion.div>
                ))}
              </div>
            )}
          </div>

          {/* DETAILS PANEL */}
          {selectedQuery ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: colors.card,
                borderRadius: "8px",
                border: `1px solid ${colors.border}`,
                padding: "20px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "4px" }}>
                  FROM
                </p>
                <p style={{ fontSize: "16px", fontWeight: 600, color: colors.text, marginBottom: "4px" }}>
                  {selectedQuery.name}
                </p>
                <p style={{ fontSize: "13px", color: colors.textMuted }}>{selectedQuery.email}</p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "8px" }}>
                  MESSAGE
                </p>
                <p
                  style={{
                    fontSize: "13px",
                    color: colors.textMid,
                    lineHeight: 1.6,
                    background: colors.bg,
                    padding: "12px",
                    borderRadius: "6px",
                  }}
                >
                  {selectedQuery.message}
                </p>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <p style={{ fontSize: "12px", color: colors.textMuted, marginBottom: "8px" }}>
                  STATUS
                </p>
                <select
                  value={selectedQuery.status}
                  onChange={(e) => updateQueryStatus(selectedQuery.id, e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: colors.text,
                    background: colors.card,
                    cursor: "pointer",
                  }}
                >
                  <option value="unread">Unread</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                </select>
              </div>

              <div style={{ marginBottom: "12px" }}>
                <p style={{ fontSize: "12px", color: colors.textMuted }}>
                  {new Date(selectedQuery.createdAt).toLocaleString()}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => deleteQuery(selectedQuery.id)}
                style={{
                  padding: "8px 16px",
                  background: "#DC143C",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  marginTop: "auto",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#A81919";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#DC143C";
                }}
              >
                Delete
              </motion.button>
            </motion.div>
          ) : (
            <div
              style={{
                background: colors.card,
                borderRadius: "8px",
                border: `1px solid ${colors.border}`,
                padding: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: colors.textMuted,
                minHeight: "400px",
              }}
            >
              Select a query to view details
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
