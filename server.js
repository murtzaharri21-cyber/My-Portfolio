import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Ensure data directory exists for contact messages
const DATA_DIR = path.join(__dirname, "data");
if (!existsSync(DATA_DIR)) {
  mkdirSync(DATA_DIR, { recursive: true });
}
const MESSAGES_FILE = path.join(DATA_DIR, "messages.json");
const INBOX_KEY = process.env.INBOX_KEY;

// Middlewares
app.use(
  helmet({
    contentSecurityPolicy: false, // Allow Three.js CDN, Google Fonts, and FontAwesome icons
    crossOriginEmbedderPolicy: false,
  }),
);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// Profile Data
const profileData = {
  name: "Ghulam Murtaza",
  title: "Full Stack Developer & Top-Rated Market Strategist",
  tagline:
    "Bridging Cutting-Edge Web Engineering with Data-Driven Market Intelligence",
  contact: {
    email: "murtzaharry21@gmail.com",
    phone: "+92 326 0586026",
    whatsapp: "+923260586026",
    address: "Street 40, G13-2, Islamabad, Pakistan",
    fiverr: "https://www.fiverr.com/murtaza_harry?public_mode=true",
    upwork: "https://www.upwork.com/freelancers/~01ee1420fb44abd6e6",
    github: "https://github.com/murtzaharri21-cyber",
    linkedin: "https://www.linkedin.com/in/ghulam-murtaza-493aa2212/",
  },
  stats: {
    experienceYears: "5+",
    globalClients: "100+",
    fiverrStatus: "Top-Rated Seller",
    upworkStatus: "Top-Rated Consultant",
    hskLevel: "HSK-4 Certified (Fluent Mandarin)",
    completedProjects: "150+",
  },
  about: {
    summary:
      "Computer Science graduate and Top-Rated Fiverr Seller with 5+ years of experience in market research, business analysis, and strategic consulting. Supported startups, SMEs, and established companies worldwide with data-driven insights and growth strategies. Full-Stack developer fluent in Chinese (HSK-4); experienced in cross-cultural collaboration.",
    highlights: [
      "5+ years delivering high-impact market research & full-stack web solutions",
      "Top-Rated Seller on Fiverr with over 100+ international clients across US, UK, Europe & Asia",
      "BSc in Computer Science with expertise in MERN & MEAN full stack ecosystems",
      "Fluent trilingual speaker: English (Professional), Chinese Mandarin (HSK-4 Certified), Urdu (Native)",
      "Specialist in bridging tech architecture with real-world business planning and go-to-market strategy",
    ],
  },
  education: [
    {
      degree: "Bachelor of Science in Computer Science (BScs)",
      institution: "Sarhad University Islamabad",
      period: "2021 – 2025",
      location: "Islamabad, Pakistan",
      icon: "fa-graduation-cap",
      description:
        "Comprehensive software engineering, algorithm design, data structures, full stack architectures, and database management.",
    },
    {
      degree: "Chinese Language Studies",
      institution: "NUML University (National University of Modern Languages)",
      period: "2020 – 2021",
      location: "Islamabad, Pakistan",
      icon: "fa-language",
      description:
        "Advanced Mandarin Chinese linguistic proficiency, commercial communication, and translation.",
    },
    {
      degree: "Bachelor of Science in Computer Science – Online",
      institution: "Beijing University (Peking University Online)",
      period: "2019 – 2020",
      location: "Beijing, China (Online)",
      icon: "fa-laptop-code",
      description:
        "Computational thinking, systems programming, and modern software development practices.",
    },
    {
      degree: "Chinese Literature & Cultural Studies",
      institution: "Hexi University",
      period: "2018 – 2019",
      location: "Gansu, China",
      icon: "fa-landmark",
      description:
        "Immersion study in Chinese literature, cultural nuance, and high-level cross-border business communication.",
    },
  ],
  training: [
    {
      title: "NAVTTC Certified MEAN & MERN Stack JavaScript Development",
      institution: "Adan Institute of Technology, I-9, Islamabad",
      authority: "Government of Pakistan (NAVTTC)",
      year: "2023",
      icon: "fa-certificate",
      skills: [
        "MongoDB",
        "Express.js",
        "React.js",
        "Angular",
        "Node.js",
        "RESTful APIs",
      ],
    },
  ],
  experience: [
    {
      role: "Freelance Market Researcher & Business Consultant",
      platform: "Fiverr (Top-Rated Seller)",
      period: "Since 2020 – Present",
      type: "Remote / International",
      badge: "Top-Rated Status",
      achievements: [
        "Delivered comprehensive market research, financial business plans, and competitive analysis to 100+ clients globally.",
        "Supported high-growth startups and established SMEs with go-to-market strategies and data-driven business model development.",
        "Maintained 100% 5-star Top-Rated Seller status through consistent, high-quality, on-time delivery across North America, Europe, and Asia.",
      ],
    },
    {
      role: "Market Researcher & Business Planner",
      platform: "Upwork",
      period: "2022 – 2026",
      type: "Remote / Global",
      badge: "Expert Consultant",
      achievements: [
        "Provided market research, feasibility studies, and strategic consulting to diverse clients across tech, e-commerce, and healthcare industries.",
        "Delivered granular industry analysis, competitor benchmarking, SWOT evaluations, and actionable business roadmaps.",
      ],
    },
    {
      role: "Full-Stack Web Developer",
      platform: "Independent / Contract",
      period: "2021 – Present",
      type: "Remote / Hybrid",
      badge: "MERN & MEAN",
      achievements: [
        "Architected and deployed responsive full-stack applications with Node.js, Express, React, and MongoDB.",
        "Designed interactive 3D WebGL interfaces, custom RESTful APIs, and secure authentication systems.",
      ],
    },
  ],
  skills: {
    development: [
      {
        name: "Node.js & Express",
        level: 95,
        category: "backend",
        icon: "fa-brands fa-node-js",
      },
      {
        name: "React.js & Redux",
        level: 92,
        category: "frontend",
        icon: "fa-brands fa-react",
      },
      {
        name: "JavaScript (ES6+) / TypeScript",
        level: 95,
        category: "core",
        icon: "fa-brands fa-js",
      },
      {
        name: "MongoDB & Mongoose",
        level: 88,
        category: "database",
        icon: "fa-solid fa-database",
      },
      {
        name: "MERN & MEAN Stack",
        level: 90,
        category: "fullstack",
        icon: "fa-solid fa-layer-group",
      },
      {
        name: "HTML5, CSS3, Tailwind & Modern UI",
        level: 96,
        category: "frontend",
        icon: "fa-solid fa-code",
      },
      {
        name: "Three.js & 3D WebGL",
        level: 85,
        category: "3d",
        icon: "fa-solid fa-cube",
      },
      {
        name: "RESTful APIs & Microservices",
        level: 90,
        category: "backend",
        icon: "fa-solid fa-network-wired",
      },
    ],
    business: [
      {
        name: "Market Research & Sizing (TAM/SAM/SOM)",
        level: 98,
        category: "research",
        icon: "fa-solid fa-chart-pie",
      },
      {
        name: "Competitive Benchmarking & SWOT",
        level: 96,
        category: "strategy",
        icon: "fa-solid fa-chess",
      },
      {
        name: "Business Planning & Financial Modeling",
        level: 94,
        category: "business",
        icon: "fa-solid fa-file-invoice-dollar",
      },
      {
        name: "Go-to-Market (GTM) Strategy",
        level: 92,
        category: "strategy",
        icon: "fa-solid fa-bullseye",
      },
      {
        name: "Data-Driven Decision Making",
        level: 95,
        category: "analytics",
        icon: "fa-solid fa-chart-line",
      },
    ],
    languages: [
      {
        language: "Urdu",
        proficiency: "Native Speaker",
        level: 100,
        flag: "🇵🇰",
      },
      {
        language: "English",
        proficiency: "Professional Working Proficiency",
        level: 95,
        flag: "🇬🇧",
      },
      {
        language: "Chinese (Mandarin)",
        proficiency: "HSK-4 Certified (Fluent)",
        level: 90,
        flag: "🇨🇳",
      },
    ],
  },
};

// Projects Data
const projectsData = [
  {
    id: "hunza-crafts",
    title: "Hunza Crafts",
    subtitle:
      "E-Commerce Platform for Artisan & Organic Products from Hunza Valley",
    category: "Full Stack / E-Commerce",
    tags: ["React", "Node.js", "Supabase", "E-Commerce", "Vercel"],
    description:
      "Live full-stack e-commerce platform connecting farmers and artisans in Hunza Valley, Gilgit-Baltistan directly with customers — featuring a product catalog (honey, dry fruits, handwoven shawls, wood crafts), shopping cart, wishlist, and an admin dashboard for inventory and order management.",
    metrics: "Live production store shipping nationwide across Pakistan",
    liveDemo: "https://hunzacrafts.vercel.app/",
    github: "https://github.com/murtzaharri21-cyber",
    featured: true,
  },
  {
    id: "nexus-market-intelligence",
    title: "OmniMarket 3D AI Intelligence Suite",
    subtitle: "Full-Stack Market Analytics & Interactive 3D Data Visualizer",
    category: "Full Stack & Analytics",
    tags: ["Node.js", "Express", "React", "Three.js", "MongoDB", "Chart.js"],
    description:
      "Enterprise-grade market intelligence platform featuring interactive 3D multidimensional market cluster visualization, automated competitor scraping, TAM/SAM/SOM calculators, and executive exportable PDF roadmaps.",
    metrics: "Over 40+ corporate clients benchmarked, 99.4% analysis accuracy",
    liveDemo: "#",
    github: "https://github.com/murtzaharri21-cyber",
    featured: true,
  },
  {
    id: "mern-global-commerce",
    title: "HyperTrade Global MERN Commerce Engine",
    subtitle:
      "High-Performance Cross-Border E-Commerce with Real-Time Inventory",
    category: "Full Stack",
    tags: [
      "React.js",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Stripe API",
    ],
    description:
      "A complete MERN stack global commerce engine built for cross-border vendors with trilingual support (English, Chinese, Urdu), instant currency conversion, JWT authentication, and administrative inventory telemetry.",
    metrics:
      "Sub-50ms query response time, handles 10k+ concurrent catalog queries",
    liveDemo: "#",
    github: "https://github.com/murtzaharri21-cyber",
    featured: true,
  },
  {
    id: "sinotech-cross-border-portal",
    title: "SinoConnect B2B Consultation Hub",
    subtitle: "Cross-Cultural Business Intelligence & Supply Chain Connector",
    category: "Business Strategy & Tech",
    tags: ["Node.js", "Express", "REST APIs", "HSK-4 Mandarin", "Vanilla CSS3"],
    description:
      "Specialized consulting platform connecting Western startups with Chinese manufacturers and supply chains, featuring automated bilingual inquiry routing, contract generation, and market risk radar.",
    metrics: "Facilitated $1.2M+ in cross-border sourcing deals",
    liveDemo: "#",
    github: "https://github.com/murtzaharri21-cyber",
    featured: true,
  },
  {
    id: "cyber-task-collaboration",
    title: "QuantumSync Real-Time Team Workspace",
    subtitle: "MEAN / MERN Real-time Kanban & Team Velocity Telemetry",
    category: "Full Stack",
    tags: ["Node.js", "Express", "React", "WebSocket", "MongoDB"],
    description:
      "High-concurrency collaborative project management dashboard with real-time websocket synchronization, automated sprint retrospectives, and interactive burndown charts.",
    metrics: "Real-time sync under 15ms latency across global clusters",
    liveDemo: "#",
    github: "https://github.com/murtzaharri21-cyber",
    featured: false,
  },
  {
    id: "startup-gtm-simulator",
    title: "VentureStrat Startup GTM Simulator",
    subtitle: "Interactive Financial Modeling & Market Penetration Tool",
    category: "Market Research",
    tags: ["JavaScript", "HTML5 Canvas", "Node.js", "Data Modeling"],
    description:
      "Financial modeling and Go-To-Market scenario forecasting tool allowing founders to simulate CAC, LTV, churn rates, and seed runway across 15+ industry verticals.",
    metrics: "Used by 85+ pre-seed & seed startups globally",
    liveDemo: "#",
    github: "https://github.com/murtzaharri21-cyber",
    featured: false,
  },
];

// REST API Endpoints
app.get("/api/profile", (req, res) => {
  res.json({
    success: true,
    data: profileData,
  });
});

app.get("/api/projects", (req, res) => {
  res.json({
    success: true,
    data: projectsData,
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    developer: "Ghulam Murtaza",
    platform: "Node.js " + process.version,
  });
});

// Contact Form Endpoint
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message, projectType } = req.body;

    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      return res.status(400).json({
        success: false,
        error: "Name, email, and message are required fields.",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        success: false,
        error: "Please provide a valid email address.",
      });
    }

    const newSubmission = {
      id:
        "msg_" + Date.now() + "_" + Math.random().toString(36).substring(2, 7),
      timestamp: new Date().toISOString(),
      name: trimmedName,
      email: trimmedEmail,
      subject: subject ? subject.trim() : "General Inquiry",
      projectType: projectType || "Full-Stack Development & Consulting",
      message: trimmedMessage,
    };

    // Persist to messages.json file safely
    let messages = [];
    try {
      const data = await fs.readFile(MESSAGES_FILE, "utf8");
      messages = JSON.parse(data);
    } catch {
      messages = [];
    }

    messages.push(newSubmission);
    await fs.writeFile(
      MESSAGES_FILE,
      JSON.stringify(messages, null, 2),
      "utf8",
    );

    console.log(
      `[Contact API] Received new message from ${newSubmission.name} (${newSubmission.email})`,
    );

    return res.status(201).json({
      success: true,
      message:
        "Thank you! Your message has been received. Ghulam will get back to you promptly.",
      receiptId: newSubmission.id,
    });
  } catch (err) {
    console.error("[Contact API Error]", err);
    return res.status(500).json({
      success: false,
      error: "Internal server error occurred while processing your message.",
    });
  }
});

const requireInboxKey = (req, res, next) => {
  if (!INBOX_KEY || req.get("x-inbox-key") !== INBOX_KEY) {
    return res.status(401).json({
      success: false,
      error: "A valid inbox key is required.",
    });
  }
  next();
};

app.get("/api/inbox", requireInboxKey, async (req, res) => {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf8");
    const messages = JSON.parse(data);
    return res.json({
      success: true,
      data: messages.sort(
        (first, second) =>
          new Date(second.timestamp).getTime() -
          new Date(first.timestamp).getTime(),
      ),
    });
  } catch {
    return res.json({ success: true, data: [] });
  }
});

app.patch("/api/inbox/:id", requireInboxKey, async (req, res) => {
  try {
    const data = await fs.readFile(MESSAGES_FILE, "utf8");
    const messages = JSON.parse(data);
    const message = messages.find((item) => item.id === req.params.id);

    if (!message) {
      return res
        .status(404)
        .json({ success: false, error: "Message not found." });
    }

    message.read = Boolean(req.body.read);
    await fs.writeFile(
      MESSAGES_FILE,
      JSON.stringify(messages, null, 2),
      "utf8",
    );
    return res.json({ success: true, data: message });
  } catch {
    return res
      .status(500)
      .json({ success: false, error: "Unable to update message." });
  }
});

// SPA Fallback
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(
    `🚀 Ghulam Murtaza 3D Portfolio Server is running at http://localhost:${PORT}`,
  );
  console.log(`✨ Environment: ${process.env.NODE_ENV || "development"}`);
});
