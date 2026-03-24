"use client";

import { useState } from "react";
import { ArrowUpRight, Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Playli",
    role: "Full-Stack Development (Laravel API + React App)",
    stack: "Laravel 12 API, PHP 8.2, Laravel Passport, MySQL, React (Vite + TypeScript), React Query",
    description:
      "Built Playli as a sports community platform with event management, team workflows, chat/conversations, user ratings, reports, and role-based admin controls. Implemented REST APIs in Laravel and integrated them with a React user application.",
    image: "/assets/playli-home.png",
    liveUrl: "https://playli-366b008138e0.herokuapp.com/",
    secondaryUrl: "https://playli-user-c572970ee529.herokuapp.com/login",
    tags: ["Laravel", "Core PHP"]
  },
  {
    title: "Brasil Planet Turismo",
    role: "Laravel Development",
    stack: "Laravel 12, PHP 8.2, Blade, MySQL, jQuery, Tailwind, Vite, Pusher",
    description:
      "Developed a tour and booking management platform with multi-step booking workflows, hotel and service management, supplier coordination, payment tracking, internal chat, notifications, and multilingual support.",
    image: "/assets/brasil-planet-dashboard.png",
    liveUrl: "https://horizon.brasilplanet.com.br/",
    tags: ["Laravel", "Core PHP"]
  },
  {
    title: "QuickCash",
    role: "Laravel Development",
    stack: "Laravel 12, PHP 8.2+, MySQL, Stripe",
    description:
      "Secure financial services platform with payment processing, money transfers, and verification workflows.",
    image: "/assets/quickcash.png",
    liveUrl: "https://quickcash.crosip.com/",
    tags: ["Laravel", "Fintech"]
  },
  {
    title: "JamPayroll",
    role: "Laravel Development",
    stack: "Laravel 11, PHP 8.2+, MySQL",
    description:
      "Complete payroll and HR system with attendance, shift management, and employee lifecycle operations.",
    image: "/assets/jampayroll.png",
    liveUrl: "https://jampayroll.crosip.com/",
    tags: ["Laravel"]
  },
  {
    title: "EstateShield",
    role: "Laravel Development",
    stack: "Laravel, Stripe, PayPal, DocuSign",
    description:
      "Estate planning platform with document workflows, trust creation flows, and secure integrations.",
    image: "/assets/estate-shield.png",
    liveUrl: "https://myestateshieldvi.com/",
    tags: ["Laravel"]
  },
  {
    title: "Berflow",
    role: "Laravel Development",
    stack: "Laravel 12, Twilio, SendGrid",
    description:
      "HMS (Hospital Management System) with appointment booking, patient records, and billing automation.",
    image: "/assets/berflow.png",
    liveUrl: "https://berflow.crosip.com/",
    tags: ["Laravel", "Healthcare"]
  },
  {
    title: "Holiday 360",
    role: "Core PHP Development",
    stack: "Core PHP, MySQL, Google Maps API",
    description:
      "Multi-vendor tourism portal with packages, bookings, payment integration, and vendor management.",
    image: "/assets/Holiday360.png",
    liveUrl: "https://holiday360.ae/",
    tags: ["Core PHP"]
  },
  {
    title: "Al Aswad",
    role: "Backend Development",
    stack: "OpenCart, MySQL, Stripe, Apple Pay",
    description:
      "E-commerce platform for modest fashion with robust checkout and product/order management.",
    image: "/assets/Al-Aswad.png",
    liveUrl: "https://alaswad.shop/",
    tags: ["OpenCart"]
  },
  {
    title: "REPs UAE",
    role: "Laravel Backend Development",
    stack: "Laravel 4.2 to 11 upgrade, MySQL, Payfort",
    description:
      "Major platform upgrade and backend enhancement for a health and fitness business platform.",
    image: "/assets/Reps-UAE.png",
    liveUrl: "https://repsuae.com/",
    tags: ["Laravel"]
  },
  {
    title: "Noir Cinema",
    role: "PHP Backend Development",
    stack: "Core PHP, MySQL, MVC, Tap Payment",
    description:
      "Cinema booking backend with authentication, seat selection, ticket booking flows, and payment integration.",
    image: "/assets/Noir-Cinema (2).png",
    liveUrl: "https://noircinema.sa/",
    tags: ["Core PHP"]
  },
  {
    title: "NeoHealth",
    role: "PHP Backend Development",
    stack: "Core PHP, MySQL, MVC, Checkout.com",
    description:
      "Healthcare platform for telemedicine, appointments, patient management, and home-care service workflows.",
    image: "/assets/NeoHealth.png",
    liveUrl: "https://neohealth.ae/",
    tags: ["Core PHP", "Healthcare"]
  },
  {
    title: "Winter Valley",
    role: "PHP and JavaScript Development",
    stack: "Core PHP, MySQL, MVC, Google Maps API",
    description:
      "Real estate platform backend with listing management, advanced search filters, and map-based discovery.",
    image: "/assets/WINTER-VALLEY.png",
    liveUrl: "https://land.wintervalley.co/",
    tags: ["Core PHP"]
  },
  {
    title: "Method By Kat",
    role: "PHP Backend Development",
    stack: "Custom OpenCart, Stripe, MySQL, API maintenance",
    description:
      "Subscription-plus-shop platform with secure checkout, account flows, and continued API maintenance work.",
    image: "/assets/Method-By-Kat.png",
    liveUrl: "https://methodbykat.com/",
    tags: ["OpenCart"]
  }
];

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } }
};

export default function HomePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <main className="site">
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />

      <motion.header
        className="hero section"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <motion.p className="eyebrow" variants={fadeUp}>
          <Sparkles size={16} /> Available for Remote Backend Roles
        </motion.p>
        <motion.h1 variants={fadeUp}>
          Faisal Ayaz
          <span>PHP & Laravel Developer</span>
        </motion.h1>
        <motion.p className="hero-copy" variants={fadeUp}>
          I build reliable, scalable, and secure web platforms with strong backend architecture and
          performance-focused development.
        </motion.p>
        <motion.div className="hero-actions" variants={fadeUp}>
          <a href="#projects" className="btn btn-primary">
            View Projects
          </a>
          <a href="/assets/Faisal Ayaz - (PHP developer).pdf" className="btn btn-ghost" target="_blank" rel="noreferrer">
            Resume <Download size={16} />
          </a>
        </motion.div>
      </motion.header>

      <section id="about" className="section card">
        <h2>About Me</h2>
        <div className="about-grid">
          <div className="about-image-wrap">
            <img src="/assets/profile.jpg" alt="Faisal Ayaz profile" className="about-image" />
          </div>
          <div>
            <p>
              I&apos;m Faisal Ayaz, a passionate and performance-driven PHP web developer with over 4 years
              of experience building scalable, secure, and user-friendly web applications. My core expertise
              includes Laravel, OpenCart, CodeIgniter, Core PHP, MySQL, REST APIs, and JavaScript.
            </p>
            <p>
              I&apos;ve delivered projects across fintech, healthcare, real estate, tourism, fitness, and
              e-commerce - including cinema booking systems, hospital management systems (HMS), multi-vendor
              tourism portals, and custom healthcare platforms.
            </p>
            <p>
              I focus on clean architecture, secure integrations, and smooth user experience. I continuously
              improve my backend practices to ship reliable products that scale and are easy to maintain.
            </p>
          </div>
        </div>
      </section>

      <section className="section card">
        <h2>Core Skills</h2>
        <div className="skills-grid">
          {[
            ["Laravel & PHP", 95],
            ["MySQL & Query Optimization", 90],
            ["REST APIs & Integrations", 92],
            ["Payment Gateways", 88],
            ["CodeIgniter / OpenCart", 86],
            ["System Architecture", 87]
          ].map(([label, percent]) => (
            <div key={label} className="skill-item">
              <div className="skill-head">
                <span>{label}</span>
                <span>{percent}%</span>
              </div>
              <div className="skill-track">
                <div className="skill-fill" style={{ width: `${percent}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section card">
        <h2>Experience Highlights</h2>
        <div className="timeline">
          <div className="timeline-item">
            <h3>Senior PHP / Laravel Developer</h3>
            <p>Built and scaled backend systems across fintech, healthcare, and enterprise SaaS.</p>
          </div>
          <div className="timeline-item">
            <h3>Backend Integrations Specialist</h3>
            <p>Integrated Stripe, PayPal, Twilio, SendGrid, DocuSign, and map/payment APIs.</p>
          </div>
          <div className="timeline-item">
            <h3>Legacy to Modern Upgrade Work</h3>
            <p>Migrated and upgraded older platforms to modern Laravel versions and secure workflows.</p>
          </div>
        </div>
      </section>

      <motion.section
        id="projects"
        className="section"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <h2 className="section-title">Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <motion.article key={project.title} className="project-card" variants={fadeUp}>
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-image-wrap">
                <img src={project.image} alt={project.title} className="project-image" />
              </a>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p className="meta">
                  <strong>Role:</strong> {project.role}
                </p>
                <p className="meta">
                  <strong>Stack:</strong> {project.stack}
                </p>
                <p>{project.description}</p>
                {project.liveUrl ? (
                  <div className="project-links">
                    <a href={project.liveUrl} target="_blank" rel="noreferrer" className="text-link">
                      User App <ArrowUpRight size={15} />
                    </a>
                    {project.secondaryUrl ? (
                      <a href={project.secondaryUrl} target="_blank" rel="noreferrer" className="text-link">
                        Global/Login <ArrowUpRight size={15} />
                      </a>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-link text-link--muted">Private Project (Demo not public)</p>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </motion.section>

      <section id="contact" className="section card contact">
        <h2>Let&apos;s Work Together</h2>
        <p>Have a backend-heavy project or need Laravel expertise? I can help you ship faster.</p>
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
          <button type="submit" className="btn btn-primary">
            Send Message <Mail size={16} />
          </button>
          {submitted ? <p className="success-text">Thanks! Your email app should open now.</p> : null}
        </form>
        <div className="social-links">
          <a
            href="https://github.com/ayazfaisal449"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="social-link"
          >
            <Github size={18} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/faisal-ayaz-239a16177"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="social-link"
          >
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </section>
    </main>
  );
}
