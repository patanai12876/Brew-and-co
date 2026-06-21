import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "#3D5C38",
      color: "#F8F6F1",
      padding: "60px 48px 32px",
    }}>
      <div style={{
        maxWidth: "1200px", margin: "0 auto",
      }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "48px", marginBottom: "48px",
        }}>
          {/* Brand */}
          <div>
            <div style={{
              fontFamily: "var(--font-dm-serif)",
              fontSize: "28px", marginBottom: "16px",
            }}>
              Brew <span style={{ color: "#7B9E74" }}>&</span> Co.
            </div>
            <p style={{
              fontSize: "14px", lineHeight: 1.8,
              opacity: 0.75, maxWidth: "280px",
            }}>
              Lahore's finest artisan coffee. Handcrafted with passion, delivered with pride.
            </p>
          </div>

          {/* Links */}
          <div>
            <div style={{
              fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              opacity: 0.5, marginBottom: "20px",
            }}>
              Navigate
            </div>
            {[
              { href: "/", label: "Home" },
              { href: "/about", label: "Our Story" },
              { href: "/menu", label: "Offerings" },
              { href: "/blog", label: "Blog" },
              { href: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{
                display: "block", color: "#F8F6F1",
                textDecoration: "none", fontSize: "14px",
                marginBottom: "12px", opacity: 0.8,
              }}>
                {l.label}
              </Link>
            ))}
          </div>

          {/* Contact */}
          <div>
            <div style={{
              fontSize: "12px", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              opacity: 0.5, marginBottom: "20px",
            }}>
              Visit Us
            </div>
            <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: 1.8, marginBottom: "12px" }}>
              123 MM Alam Road<br />
              Gulberg III, Lahore
            </p>
            <p style={{ fontSize: "14px", opacity: 0.8, lineHeight: 1.8 }}>
              Mon–Sun: 8am – 11pm<br />
              +92 300 0000000
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(248,246,241,0.15)",
          paddingTop: "24px",
          display: "flex", alignItems: "center",
          justifyContent: "space-between", flexWrap: "wrap", gap: "12px",
        }}>
          <p style={{ fontSize: "13px", opacity: 0.5 }}>
            © 2025 Brew & Co. · Lahore · All rights reserved
          </p>
          <p style={{ fontSize: "13px", opacity: 0.5 }}>
            Crafted with ♥ in Lahore
          </p>
        </div>
      </div>
    </footer>
  );
}