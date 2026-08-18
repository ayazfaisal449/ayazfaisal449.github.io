"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ease, fadeIn } from "../lib/motion";

const links = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  
  const { scrollY } = useScroll();
  const navOpacity = useTransform(scrollY, [0, 100], [0.85, 0.95]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30);
      
      // Track active section
      const sections = links.map(link => link.href.substring(1));
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom >= 120) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      className={`nav ${scrolled ? "nav--scrolled" : ""}`}
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease }}
      style={{ opacity: scrolled ? navOpacity : 1 }}
    >
      <div className="nav-inner">
        <a href="#" className="nav-brand">
          FA<span>.</span>
        </a>
        <nav className="nav-links">
          {links.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              className={activeSection === link.href.substring(1) ? "active" : ""}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="btn btn-primary btn-sm">
          Hire Me
        </a>
      </div>
    </motion.header>
  );
}
