"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Our Story" },
  { href: "/menu", label: "Menu" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
     <motion.nav
  initial={{ y: -80, x: "-50%", opacity: 0 }}
  animate={{ y: 0, x: "-50%", opacity: 1 }}
  transition={{ duration: 0.7 }}
  style={{
    position: "fixed",
    top: 20,
    left: "50%",
          
          width: "calc(100% - 80px)",
          maxWidth: "1200px",
          zIndex: 100,

          background: "rgba(248,246,241,0.88)",
          backdropFilter: "blur(14px)",

          border: "1px solid #E8E4DC",
          borderRadius: "18px",

          height: "76px",
          padding: "0 32px",

          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",

          boxShadow: "0 15px 40px rgba(61,92,56,0.08)",
        }}
      >

        {/* LOGO */}
        <Link
          href="/"
          style={{
            textDecoration:"none",
            display:"flex",
            alignItems:"center",
            gap:"10px"
          }}
        >

          <div
            style={{
              width:"42px",
              height:"42px",
              borderRadius:"50%",
              background:"#3D5C38",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"#F8F6F1",
              fontSize:"18px"
            }}
          >
            ☕
          </div>


          <div
            style={{
              fontFamily:"var(--font-dm-serif)",
              fontSize:"25px",
              color:"#1E1E1E",
              letterSpacing:"0.02em"
            }}
          >
            Brew 
            <span style={{color:"#7B9E74"}}>
              & 
            </span> 
            Co.
          </div>

        </Link>


        {/* LINKS */}
        <div
          style={{
            display:"flex",
            alignItems:"center",
            gap:"34px"
          }}
          className="desktop-links"
        >

          {
            links.map((link)=>(
              <Link
                key={link.href}
                href={link.href}
                style={{
                  position:"relative",
                  textDecoration:"none",
                  color:
                  pathname===link.href
                  ?
                  "#3D5C38"
                  :
                  "#4A4A45",

                  fontSize:"14px",
                  fontWeight:500,
                  padding:"8px 0"
                }}
              >

                {link.label}


                <motion.span
                  initial={false}
                  animate={{
                    width:
                    pathname===link.href
                    ?
                    "100%"
                    :
                    "0%"
                  }}

                  whileHover={{
                    width:"100%"
                  }}

                  style={{
                    position:"absolute",
                    bottom:0,
                    left:0,
                    height:"2px",
                    background:"#7B9E74",
                    borderRadius:"10px"
                  }}
                />

              </Link>
            ))
          }


          <Link
            href="/order"
            style={{
              background:"#3D5C38",
              color:"#F8F6F1",

              padding:"12px 26px",
              borderRadius:"30px",

              textDecoration:"none",
              fontSize:"14px",
              fontWeight:600,

              boxShadow:
              "0 8px 20px rgba(61,92,56,.25)",
              transition: "background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#2A4620";
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 10px 28px rgba(61,92,56,.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#3D5C38";
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(61,92,56,.25)";
            }}
          >

            Order Now →

          </Link>


        </div>


        {/* MOBILE BUTTON */}
        <button
          onClick={()=>setOpen(!open)}
          className="mobile-burger"

          style={{
            background:"none",
            border:"none",
            fontSize:"26px",
            cursor:"pointer",
            color:"#3D5C38"
          }}
        >
          {open ? "×":"☰"}
        </button>


      </motion.nav>



      {/* MOBILE MENU */}

      <AnimatePresence>

      {
        open && (

          <motion.div

          initial={{
            opacity:0,
            y:-20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          exit={{
            opacity:0,
            y:-20
          }}

          style={{
            position:"fixed",
            top:"110px",
            left:"20px",
            right:"20px",
            zIndex:90,

            background:"#F8F6F1",
            border:"1px solid #E8E4DC",
            borderRadius:"18px",

            padding:"25px",

            boxShadow:
            "0 20px 50px rgba(0,0,0,.12)"
          }}

          >

          {
            links.map(link=>(

              <Link

              key={link.href}
              href={link.href}
              onClick={()=>setOpen(false)}

              style={{
                display:"block",
                padding:"15px 0",
                borderBottom:"1px solid #E8E4DC",

                color:"#1E1E1E",
                textDecoration:"none",
                fontSize:"16px"
              }}

              >

              {link.label}

              </Link>

            ))
          }


          <Link
          href="/order"
          style={{
            display:"block",
            marginTop:"20px",

            background:"#3D5C38",
            color:"#F8F6F1",

            textAlign:"center",

            padding:"14px",
            borderRadius:"30px",

            textDecoration:"none"
          }}
          >

          Order Now

          </Link>


          </motion.div>

        )
      }

      </AnimatePresence>


      <style jsx>{`

      @media(max-width:850px){

        nav{
          width:calc(100% - 40px) !important;
          padding:0 20px !important;
        }

        .desktop-links{
          display:none !important;
        }

        .mobile-burger{
          display:block !important;
        }

      }


      @media(min-width:851px){

        .mobile-burger{
          display:none !important;
        }

      }

      `}</style>


    </>
  );
}