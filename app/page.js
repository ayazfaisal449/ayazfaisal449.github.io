"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import AnimatedBackground from "./components/AnimatedBackground";
import BackToTop from "./components/BackToTop";
import WhatsAppFloat from "./components/WhatsAppFloat";
import CounterStat from "./components/CounterStat";
import Navbar from "./components/Navbar";
import PageLoader from "./components/PageLoader";
import MotionSection, { MotionItem } from "./components/MotionSection";
import RotatingRole from "./components/RotatingRole";
import ScrollProgress from "./components/ScrollProgress";
import SkillsTabs, { skillCategories } from "./components/SkillsTabs";
import ProjectsCube from "./components/ProjectsCube";
import { ease, fadeUp, stagger } from "./lib/motion";
import { WHATSAPP_DISPLAY, WHATSAPP_SHARE_URL } from "./lib/whatsapp";

const projects = [
  {
    title: "Playli",
    role: "Full-Stack Development (Laravel API + React App)",
    stack: "Laravel 12 API, PHP 8.2, Laravel Passport, MySQL, React (Vite + TypeScript), React Query",
    description:
      "Built Playli as a sports community platform with event management, team workflows, chat/conversations, user ratings, reports, and role-based admin controls. Implemented REST APIs in Laravel and integrated them with a React user application.",
    image: "/assets/playli-home.png",
    liveUrl: "https://playli-366b008138e0.herokuapp.com/",
    secondaryUrl: "https://playli-user-c572970ee529.herokuapp.com/login"
  },
  {
    title: "Brasil Planet Turismo",
    role: "Laravel Development",
    stack: "Laravel 12, PHP 8.2, Blade, MySQL, jQuery, Tailwind, Vite, Pusher",
    description:
      "Developed a tour and booking management platform with multi-step booking workflows, hotel and service management, supplier coordination, payment tracking, internal chat, notifications, and multilingual support.",
    image: "/assets/brasil-planet-dashboard.png",
    liveUrl: "https://horizon.brasilplanet.com.br/"
  },
  {
    title: "QuickCash",
    role: "Laravel Development",
    stack: "Laravel 12, PHP 8.2+, MySQL, Stripe",
    description:
      "Secure financial services platform with payment processing, money transfers, and verification workflows.",
    image: "/assets/quickcash.png",
    liveUrl: "https://quickcash.crosip.com/"
  },
  {
    title: "JamPayroll",
    role: "Laravel Development",
    stack: "Laravel 11, PHP 8.2+, MySQL",
    description:
      "Complete payroll and HR system with attendance, shift management, and employee lifecycle operations.",
    image: "/assets/jampayroll.png",
    liveUrl: "https://jampayroll.crosip.com/"
  },
  {
    title: "EstateShield",
    role: "Laravel Development",
    stack: "Laravel, Stripe, PayPal, DocuSign",
    description:
      "Estate planning platform with document workflows, trust creation flows, and secure integrations.",
    image: "/assets/estate-shield.png",
    liveUrl: "https://myestateshieldvi.com/"
  },
  {
    title: "Berflow",
    role: "Laravel Development",
    stack: "Laravel 12, Twilio, SendGrid",
    description:
      "HMS (Hospital Management System) with appointment booking, patient records, and billing automation.",
    image: "/assets/berflow.png",
    liveUrl: "https://berflow.crosip.com/"
  },
  {
    title: "Holiday 360",
    role: "Core PHP Development",
    stack: "Core PHP, MySQL, Google Maps API",
    description:
      "Multi-vendor tourism portal with packages, bookings, payment integration, and vendor management.",
    image: "/assets/Holiday360.png",
    liveUrl: "https://holiday360.ae/"
  },
  {
    title: "Al Aswad",
    role: "Backend Development",
    stack: "OpenCart, MySQL, Stripe, Apple Pay",
    description:
      "E-commerce platform for modest fashion with robust checkout and product/order management.",
    image: "/assets/Al-Aswad.png",
    liveUrl: "https://alaswad.shop/"
  },
  {
    title: "REPs UAE",
    role: "Laravel Backend Development",
    stack: "Laravel 4.2 to 11 upgrade, MySQL, Payfort",
    description:
      "Major platform upgrade and backend enhancement for a health and fitness business platform.",
    image: "/assets/Reps-UAE.png",
    liveUrl: "https://repsuae.com/"
  },
  {
    title: "Noir Cinema",
    role: "PHP Backend Development",
    stack: "Core PHP, MySQL, MVC, Tap Payment",
    description:
      "Cinema booking backend with authentication, seat selection, ticket booking flows, and payment integration.",
    image: "/assets/Noir-Cinema (2).png",
    liveUrl: "https://noircinema.sa/"
  },
  {
    title: "NeoHealth",
    role: "PHP Backend Development",
    stack: "Core PHP, MySQL, MVC, Checkout.com",
    description:
      "Healthcare platform for telemedicine, appointments, patient management, and home-care service workflows.",
    image: "/assets/NeoHealth.png",
    liveUrl: "https://neohealth.ae/"
  },
  {
    title: "Winter Valley",
    role: "PHP and JavaScript Development",
    stack: "Core PHP, MySQL, MVC, Google Maps API",
    description:
      "Real estate platform backend with listing management, advanced search filters, and map-based discovery.",
    image: "/assets/WINTER-VALLEY.png",
    liveUrl: "https://land.wintervalley.co/"
  },
  {
    title: "Method By Kat",
    role: "PHP Backend Development",
    stack: "Custom OpenCart, Stripe, MySQL, API maintenance",
    description:
      "Subscription-plus-shop platform with secure checkout, account flows, and continued API maintenance work.",
    image: "/assets/Method-By-Kat.png",
    liveUrl: "https://methodbykat.com/"
  }
];


const stats = [
  { value: 4, suffix: "+", label: "Years Experience" },
  { value: 13, suffix: "+", label: "Live Projects" },
  { value: 10, suffix: "+", label: "Industries Served" }
];

const experience = [
  {
    title: "Full Stack PHP Laravel Developer",
    company: "eSquall Technologies",
    period: "May 2025 – Present",
    location: "Islamabad, PK",
    points: [
      "Architected enterprise applications using Laravel 12 and PHP 8.2+ with clean architecture and SOLID principles, delivering 15+ production modules with zero critical bugs.",
      "Optimized API and MySQL performance via Redis caching, Laravel Queues, indexing, and eager loading, cutting response times and query execution by 35%.",
      "Achieved 80%+ PHPUnit test coverage; implemented GitHub Actions CI/CD with zero-downtime deployments, and mentored junior developers."
    ]
  },
  {
    title: "PHP Backend Developer",
    company: "Sigma Digital Solution",
    period: "Sep 2021 – May 2025",
    location: "Islamabad, PK",
    points: [
      "Architected and delivered 10+ production REST APIs for web and mobile apps across fintech, healthcare, and real estate.",
      "Integrated 9 payment gateways (Checkout.com, Stripe, Tap, MPGS, Tabby, PayPal, Apple Pay, Payfort, Affirm) and implemented JWT auth with Spatie RBAC.",
      "Optimized Eloquent and raw MySQL queries, reducing API response times by up to 40%, while collaborating in Agile/Scrum sprints."
    ]
  }
];

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);

  return (
    <>
      <PageLoader />
      <ScrollProgress />
      <AnimatedBackground />
      <Navbar />
      <BackToTop />
      <WhatsAppFloat />

      <main className="site">
        <header className="hero-wrap" ref={heroRef}>
          <motion.div
            className="hero"
            variants={stagger}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="eyebrow" variants={fadeUp}>
              <Sparkles size={15} /> Available for Remote Backend Roles
            </motion.p>

            <motion.div className="hero-heading" variants={fadeUp}>
              <h1 className="hero-title">Faisal Ayaz</h1>
              <p className="hero-role">
                <RotatingRole />
              </p>
            </motion.div>

            <motion.p className="hero-copy" variants={fadeUp}>
              I build reliable, scalable, and secure web platforms with strong backend
              architecture and performance-focused development.
            </motion.p>

            <motion.div className="hero-actions" variants={fadeUp}>
              <motion.a
                href="#projects"
                className="btn btn-primary"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                View Projects
              </motion.a>
              <motion.a
                href="/assets/Faisal Ayaz - (PHP developer).pdf"
                className="btn btn-ghost"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                Resume <Download size={16} />
              </motion.a>
            </motion.div>

            <motion.div className="hero-stats" variants={fadeUp}>
              {stats.map((stat) => (
                <CounterStat
                  key={stat.label}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={stat.label}
                />
              ))}
            </motion.div>
          </motion.div>
        </header>

        <MotionSection id="about" className="section card" bgVariant="about">
          <MotionItem>
            <p className="section-label">About</p>
            <h2>About Me</h2>
          </MotionItem>
          <MotionItem>
            <div className="about-grid">
              <motion.div
                className="about-image-wrap"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                whileHover={{ scale: 1.03, rotate: 1 }}
                transition={{ duration: 0.5, ease }}
              >
                <img src="/assets/profile.jpg" alt="Faisal Ayaz profile" className="about-image" />
              </motion.div>
              <div>
                <p>
                  I&apos;m Faisal Ayaz, a passionate and performance-driven PHP web developer with over 4
                  years of experience building scalable, secure, and user-friendly web applications. My
                  core expertise includes Laravel, OpenCart, CodeIgniter, Core PHP, MySQL, REST APIs,
                  AWS, AI integration, and production deployment on VPS, shared hosting, and cloud platforms.
                </p>
                <p>
                  I&apos;ve delivered projects across fintech, healthcare, real estate, tourism, fitness,
                  and e-commerce — including cinema booking systems, hospital management systems (HMS),
                  multi-vendor tourism portals, and custom healthcare platforms.
                </p>
                <p>
                  I focus on clean architecture, secure integrations, and smooth user experience. I also
                  handle production deployment across AWS, Hostinger VPS, shared hosting, Netlify, and
                  other environments — plus AI-powered features through API integrations.
                </p>
              </div>
            </div>
          </MotionItem>
        </MotionSection>

        <MotionSection id="skills" className="section card" bgVariant="skills">
          <MotionItem>
            <p className="section-label">Expertise</p>
            <h2>Core Skills</h2>
          </MotionItem>
          <MotionItem>
            <SkillsTabs categories={skillCategories} />
          </MotionItem>
        </MotionSection>

        <MotionSection id="experience" className="section card" bgVariant="experience">
          <MotionItem>
            <p className="section-label">Experience</p>
            <h2>Professional Experience</h2>
          </MotionItem>
          <div className="timeline">
            {experience.map((item) => (
              <MotionItem key={`${item.company}-${item.period}`}>
                <article className="timeline-item">
                  <div className="timeline-head">
                    <span className="timeline-period">{item.period}</span>
                    <span className="timeline-context">{item.location}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <ul className="timeline-points">
                    {item.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              </MotionItem>
            ))}
          </div>
        </MotionSection>

        <MotionSection id="projects" className="section" bgVariant="projects">
          <MotionItem>
            <p className="section-label">Portfolio</p>
            <h2 className="section-title">Selected Projects</h2>
          </MotionItem>
          <MotionItem>
            <ProjectsCube projects={projects} />
          </MotionItem>
        </MotionSection>

        <MotionSection id="contact" className="section card contact" bgVariant="contact">
          <MotionItem>
            <p className="section-label">Contact</p>
            <h2>Let&apos;s Work Together</h2>
            <p className="contact-lead">
              Have a backend-heavy project or need Laravel expertise? I can help you ship faster.
            </p>
          </MotionItem>
          <MotionItem>
            <form
              className="contact-form"
              onSubmit={(event) => {
                event.preventDefault();
                const form = event.currentTarget;
                const data = new FormData(form);
                const name = data.get("name");
                const email = data.get("email");
                const message = data.get("message");
                const subject = `Portfolio Inquiry from ${name}`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
                window.location.href = `mailto:ayazfaisal449@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                setSubmitted(true);
                form.reset();
              }}
            >
              <input name="name" type="text" placeholder="Your name" required />
              <input name="email" type="email" placeholder="Your email" required />
              <textarea name="message" placeholder="Tell me about your project..." rows={5} required />
              <motion.button
                type="submit"
                className="btn btn-primary"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                Send Message <Mail size={16} />
              </motion.button>
              {submitted ? (
                <motion.p
                  className="success-text"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease }}
                >
                  Thanks! Your email app should open now.
                </motion.p>
              ) : null}
            </form>
          </MotionItem>
          <MotionItem>
            <div className="social-links">
              <motion.a
                href="https://github.com/ayazfaisal449"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="social-link"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Github size={18} /> GitHub
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/faisal-ayaz-239a16177"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn Profile"
                className="social-link"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Linkedin size={18} /> LinkedIn
              </motion.a>
              <motion.a
                href={WHATSAPP_SHARE_URL}
                target="_blank"
                rel="noreferrer"
                aria-label={`WhatsApp ${WHATSAPP_DISPLAY}`}
                className="social-link social-link--whatsapp"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                  <path
                    fill="currentColor"
                    d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                  />
                </svg>
                WhatsApp
              </motion.a>
            </div>
          </MotionItem>
        </MotionSection>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Faisal Ayaz. All rights reserved.</p>
        </footer>
      </main>
    </>
  );
}
