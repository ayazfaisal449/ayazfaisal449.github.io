"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SkillBrandIcon from "./SkillBrandIcon";
import { hasPaymentBrandLogo } from "../lib/paymentBrandIcons";
import {
  BrainCircuit,
  Boxes,
  Braces,
  Cloud,
  Code2,
  CreditCard,
  Database,
  FileCode,
  FileSignature,
  GitBranch,
  Calendar,
  LayoutTemplate,
  MapPin,
  Layers,
  Mail,
  Network,
  Plug,
  Palette,
  Server,
  ShoppingCart,
  Wind,
  Workflow
} from "lucide-react";

const ease = [0.22, 1, 0.36, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 22, scale: 0.97 },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease, delay: index * 0.07 }
  }),
  exit: { opacity: 0, y: -12, scale: 0.98, transition: { duration: 0.25, ease } }
};

const panelVariants = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.45, ease } },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3, ease } }
};

const subPanelVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease, staggerChildren: 0.07 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease } }
};

const skillIcons = {
  Laravel: Server,
  OpenCart: ShoppingCart,
  CodeIgniter: Boxes,
  "Core MVC PHP Framework": Code2,
  HTML: FileCode,
  CSS: Palette,
  JavaScript: Braces,
  "Vue.js": LayoutTemplate,
  jQuery: Code2,
  "Tailwind CSS": Wind,
  "REST APIs & Integrations": Workflow,
  "SOAP APIs": Network,
  "System Architecture": Layers,
  "MySQL & Query Optimization": Database,
  PostgreSQL: Database,
  MongoDB: Database,
  "AWS Cloud Services": Cloud,
  "Amazon S3": Cloud,
  "Amazon RDS": Database,
  "Deployment (VPS, Shared, Netlify)": GitBranch,
  Hostinger: Cloud,
  GoDaddy: Cloud,
  Hetzner: Cloud,
  Stripe: CreditCard,
  PayPal: CreditCard,
  "Checkout.com": CreditCard,
  Tap: CreditCard,
  MPGS: CreditCard,
  Tabby: CreditCard,
  "Apple Pay": CreditCard,
  Payfort: CreditCard,
  Affirm: CreditCard,
  "Google Email (Gmail API)": Mail,
  "Google Calendar (Google API)": Calendar,
  "Google Maps (Google API)": MapPin,
  DocuSign: FileSignature,
  "AI Integration (OpenAI / APIs)": BrainCircuit
};

const skillDetails = {
  Laravel: "Laravel 12, PHP 8.2+, SOLID, PHPUnit, and production APIs",
  OpenCart: "Custom stores, modules, themes, and e-commerce integrations",
  CodeIgniter: "MVC applications, legacy systems, and maintainable PHP codebases",
  "Core MVC PHP Framework": "Custom MVC architecture, routing, controllers, and core PHP apps",
  HTML: "Semantic markup, accessibility, and responsive page structure",
  CSS: "Layouts, flexbox, grid, animations, and responsive design",
  JavaScript: "DOM manipulation, ES6+, async flows, and interactive UI logic",
  "Vue.js": "Component-based UI development and frontend integrations",
  jQuery: "Legacy UI interactions, AJAX, and plugin-based frontends",
  "Tailwind CSS": "Utility-first styling, responsive design, and modern UI builds",
  "REST APIs & Integrations": "Production REST APIs for web and mobile apps",
  "SOAP APIs": "Legacy and enterprise SOAP web services and XML integrations",
  "System Architecture": "Clean architecture and scalable module design",
  "MySQL & Query Optimization": "Indexing, eager loading, and query tuning",
  PostgreSQL: "Relational schemas, joins, and performance tuning",
  MongoDB: "Document modeling, aggregation, and NoSQL queries",
  "AWS Cloud Services": "EC2, IAM, CloudWatch, and core AWS infrastructure",
  "Amazon S3": "Object storage, file uploads, buckets, and asset delivery",
  "Amazon RDS": "Managed MySQL/PostgreSQL databases on AWS",
  "Deployment (VPS, Shared, Netlify)": "VPS, shared hosting, and static deploys",
  Hostinger: "Shared hosting, VPS setup, and domain deployment",
  GoDaddy: "Shared hosting, DNS, and production site management",
  Hetzner: "VPS provisioning, server hardening, and cloud deploys",
  Stripe: "Checkout flows, webhooks, and subscription billing",
  PayPal: "Payment capture, refunds, and merchant integrations",
  "Checkout.com": "Card payments and secure checkout workflows",
  Tap: "Middle East payment processing and checkout integration",
  MPGS: "Mastercard Payment Gateway Services integration",
  Tabby: "Buy now, pay later checkout and order flows",
  "Apple Pay": "Wallet payments and mobile checkout integration",
  Payfort: "Regional card processing and payment authorization",
  Affirm: "Installment and financing payment integration",
  "Google Email (Gmail API)": "Gmail API, OAuth, and automated email workflows",
  "Google Calendar (Google API)": "Calendar API, events, scheduling, and OAuth integration",
  "Google Maps (Google API)": "Maps API, geocoding, locations, and map-based features",
  DocuSign: "E-signature workflows and document signing APIs",
  "AI Integration (OpenAI / APIs)": "OpenAI and third-party API integrations"
};

function levelFromPercent(percent) {
  if (percent >= 92) return "Expert";
  if (percent >= 86) return "Advanced";
  return "Strong";
}

function countSkills(category) {
  return category.subcategories.reduce((total, subcategory) => total + subcategory.skills.length, 0);
}

function SkillCard({ name, percent, index }) {
  const Icon = skillIcons[name] || Plug;
  const level = levelFromPercent(percent);
  const useBrandLogo = hasPaymentBrandLogo(name);

  return (
    <motion.article
      className="skill-card"
      custom={index}
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.25 } }}
    >
      <div className={`skill-card-icon ${useBrandLogo ? "skill-card-icon--brand" : ""}`} aria-hidden="true">
        {useBrandLogo ? <SkillBrandIcon name={name} className="skill-brand-logo" /> : <Icon size={18} />}
      </div>
      <div className="skill-card-body">
        <div className="skill-card-head">
          <h3>{name}</h3>
          <span className={`skill-level skill-level--${level.toLowerCase()}`}>{level}</span>
        </div>
        <p>{skillDetails[name]}</p>
        <div className="skill-meter" aria-hidden="true">
          <motion.span
            className="skill-meter-fill"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: percent / 100 }}
            transition={{ duration: 1, ease, delay: 0.15 + index * 0.06 }}
          />
        </div>
      </div>
    </motion.article>
  );
}

export default function SkillsTabs({ categories }) {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [activeSubId, setActiveSubId] = useState(categories[0]?.subcategories[0]?.id);

  const activeCategory = categories.find((category) => category.id === activeId) || categories[0];
  const activeSubcategory =
    activeCategory.subcategories.find((subcategory) => subcategory.id === activeSubId) ||
    activeCategory.subcategories[0];

  useEffect(() => {
    setActiveSubId(activeCategory.subcategories[0]?.id);
  }, [activeCategory.id]);

  return (
    <div className="skills-tabs">
      <div className="skills-tab-list" role="tablist" aria-label="Skill categories">
        {categories.map((category) => {
          const Icon = category.icon;
          const isActive = category.id === activeId;

          return (
            <button
              key={category.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`skills-tab ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveId(category.id)}
            >
              <Icon size={16} />
              <span>{category.label}</span>
              {isActive ? (
                <motion.span layoutId="skills-tab-indicator" className="skills-tab-indicator" transition={{ duration: 0.35, ease }} />
              ) : null}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={activeCategory.id}
          className="skills-panel"
          role="tabpanel"
          variants={reduce ? undefined : panelVariants}
          initial={reduce ? false : "hidden"}
          animate={reduce ? undefined : "visible"}
          exit={reduce ? undefined : "exit"}
        >
          <div className="skills-panel-head">
            <p>{activeCategory.description}</p>
            <span>{countSkills(activeCategory)} skills</span>
          </div>

          <div className="skills-subtab-list" role="tablist" aria-label={`${activeCategory.label} subcategories`}>
            {activeCategory.subcategories.map((subcategory) => {
              const isActive = subcategory.id === activeSubcategory.id;

              return (
                <button
                  key={subcategory.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`skills-subtab ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveSubId(subcategory.id)}
                >
                  <span>{subcategory.label}</span>
                  <em>{subcategory.skills.length}</em>
                  {isActive ? (
                    <motion.span
                      layoutId={`skills-subtab-indicator-${activeCategory.id}`}
                      className="skills-subtab-indicator"
                      transition={{ duration: 0.3, ease }}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${activeCategory.id}-${activeSubcategory.id}`}
              className="skills-subpanel"
              role="tabpanel"
              variants={reduce ? undefined : subPanelVariants}
              initial={reduce ? false : "hidden"}
              animate={reduce ? undefined : "visible"}
              exit={reduce ? undefined : "exit"}
            >
              {activeSubcategory.description ? (
                <p className="skills-subpanel-desc">{activeSubcategory.description}</p>
              ) : null}

              <div className={`skills-cards ${activeSubcategory.skills.length > 4 ? "is-scrollable" : ""}`}>
                {activeSubcategory.skills.map(([name, percent], index) => (
                  <SkillCard key={name} name={name} percent={percent} index={index} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export const skillCategories = [
  {
    id: "backend",
    label: "Backend",
    icon: Server,
    description: "Core backend engineering with Laravel, APIs, and scalable architecture.",
    subcategories: [
      {
        id: "frameworks",
        label: "Frameworks",
        description: "PHP frameworks used across production web applications.",
        skills: [
          ["Laravel", 95],
          ["OpenCart", 86],
          ["CodeIgniter", 86],
          ["Core MVC PHP Framework", 88]
        ]
      },
      {
        id: "architecture",
        label: "Architecture & APIs",
        description: "API design, integrations, and system architecture patterns.",
        skills: [
          ["REST APIs & Integrations", 92],
          ["SOAP APIs", 85],
          ["System Architecture", 87]
        ]
      }
    ]
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: LayoutTemplate,
    description: "Frontend fundamentals, JavaScript, Vue, jQuery, and Tailwind-based UI development.",
    subcategories: [
      {
        id: "core-web",
        label: "Core Web",
        description: "Foundational frontend technologies for web interfaces.",
        skills: [
          ["HTML", 88],
          ["CSS", 86],
          ["JavaScript", 87]
        ]
      },
      {
        id: "ui-tools",
        label: "Frameworks & Styling",
        description: "JavaScript libraries, Vue, jQuery, and Tailwind CSS.",
        skills: [
          ["Vue.js", 84],
          ["jQuery", 85],
          ["Tailwind CSS", 86]
        ]
      }
    ]
  },
  {
    id: "database",
    label: "Database",
    icon: Database,
    description: "Relational and NoSQL databases with optimization and scalable data design.",
    subcategories: [
      {
        id: "relational",
        label: "Relational",
        description: "SQL databases, schema design, and query performance.",
        skills: [
          ["MySQL & Query Optimization", 90],
          ["PostgreSQL", 84]
        ]
      },
      {
        id: "nosql",
        label: "NoSQL",
        description: "Document databases and flexible data modeling.",
        skills: [["MongoDB", 82]]
      }
    ]
  },
  {
    id: "devops",
    label: "Cloud & DevOps",
    icon: Cloud,
    description: "Cloud deployment, hosting platforms, CI/CD, and production server workflows.",
    subcategories: [
      {
        id: "cloud",
        label: "Cloud & Deployment",
        description: "AWS services, cloud infrastructure, and deployment pipelines.",
        skills: [
          ["AWS Cloud Services", 84],
          ["Amazon S3", 85],
          ["Amazon RDS", 84],
          ["Deployment (VPS, Shared, Netlify)", 86]
        ]
      },
      {
        id: "hosting",
        label: "Hosting Providers",
        description: "Shared hosting and VPS platforms used in production.",
        skills: [
          ["Hostinger", 86],
          ["GoDaddy", 85],
          ["Hetzner", 84]
        ]
      }
    ]
  },
  {
    id: "integrations",
    label: "Integrations",
    icon: Plug,
    description: "Payment gateways, Google APIs, DocuSign, and AI service integrations.",
    subcategories: [
      {
        id: "payments",
        label: "Payment Gateways",
        description: "Payment gateways integrated across fintech and e-commerce projects.",
        skills: [
          ["Stripe", 90],
          ["PayPal", 90],
          ["Checkout.com", 88],
          ["Tap", 87],
          ["MPGS", 86],
          ["Tabby", 86],
          ["Apple Pay", 87],
          ["Payfort", 86],
          ["Affirm", 85]
        ]
      },
      {
        id: "google-docs",
        label: "Google & Documents",
        description: "Google API integrations and document signing workflows.",
        skills: [
          ["Google Email (Gmail API)", 86],
          ["Google Calendar (Google API)", 85],
          ["Google Maps (Google API)", 86],
          ["DocuSign", 87]
        ]
      },
      {
        id: "ai",
        label: "AI Services",
        description: "AI APIs and intelligent feature integrations.",
        skills: [["AI Integration (OpenAI / APIs)", 85]]
      }
    ]
  }
];
