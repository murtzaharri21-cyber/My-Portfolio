/**
 * Interactive Sci-Fi CLI Terminal
 * Enables visitors to explore Ghulam Murtaza's background via terminal commands
 */

import { soundEngine } from './audio.js';
import { threeScene } from './three-scene.js';

class TerminalEmulator {
  constructor() {
    this.container = document.getElementById('terminal-body');
    this.input = document.getElementById('terminal-input');
    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => `
=== AVAILABLE SYSTEM COMMANDS ===
  • help          : Display this command listing
  • bio           : Overview of Ghulam Murtaza & expertise
  • skills        : Full stack development & business intelligence skills
  • education     : Academic journey (Sarhad Univ, Beijing Univ, Hexi Univ, NUML)
  • experience    : Professional track record (Fiverr Top-Rated & Upwork)
  • chinese       : HSK-4 Mandarin certification & China background
  • projects      : Featured 3D & Web applications
  • contact       : Direct communication channels & email
  • download-cv   : Open and print interactive Curriculum Vitae
  • scene <mode>  : Switch 3D WebGL mode [nexus | globe | cube]
  • clear         : Clear terminal console
      `,

      bio: () => `
[DEVELOPER BIO & STRATEGIST PROFILE]
Name: Ghulam Murtaza
Title: Full Stack Developer & Top-Rated Market Strategist
Location: Islamabad, Pakistan
Summary: Computer Science graduate with 5+ years of experience bridging cutting-edge full-stack engineering (MERN/MEAN) with data-driven market intelligence. Completed 100+ global projects with 100% 5-star rating on Fiverr (Top-Rated) and Upwork. Fluent in Chinese Mandarin (HSK-4 Certified).
      `,

      skills: () => `
[TECHNICAL & STRATEGIC MATRIX]
■ Full Stack Web:
  - Node.js & Express.js (95%)
  - React.js & Redux (92%)
  - JavaScript ES6+ / TypeScript (95%)
  - MongoDB & Mongoose (88%)
  - MEAN & MERN Stack Architecture (90%)
  - HTML5, Modern CSS3, Tailwind & UI Design (96%)
  - Three.js & 3D WebGL (85%)
  - RESTful APIs & Microservices (90%)

■ Market Research & Business Consulting:
  - Market Sizing (TAM/SAM/SOM) (98%)
  - Competitive Benchmarking & SWOT Analysis (96%)
  - Financial Modeling & Business Plans (94%)
  - Go-To-Market (GTM) Strategy (92%)
  - Data-Driven Decision Making (95%)
      `,

      education: () => `
[ACADEMIC BACKGROUND]
1. BSc in Computer Science (BScs) | Sarhad University Islamabad (2021 – 2025)
2. Chinese Language Studies | NUML University Islamabad (2020 – 2021)
3. BSc in Computer Science – Online | Beijing University (2019 – 2020)
4. Chinese Literature & Cultural Studies | Hexi University, China (2018 – 2019)
      `,

      training: () => `
[PROFESSIONAL CERTIFICATIONS]
• NAVTTC Certified MEAN & MERN Stack JavaScript Development
  - Adan Institute of Technology, I-9, Islamabad (Government of Pakistan)
• HSK-4 Chinese Mandarin Official Proficiency Certification
      `,

      experience: () => `
[CAREER & FREELANCE TRACK RECORD]
★ Fiverr Top-Rated Seller (Since 2020)
  - Delivered comprehensive market research, financial business plans, and competitor analysis to 100+ international clients.
★ Upwork Business Planner & Market Researcher (2022 – 2026)
  - Provided strategic market consulting, industry benchmarking, and actionable commercial roadmaps.
★ Full-Stack Web Engineer (2021 – Present)
  - Architected high-performance web systems, custom REST APIs, and interactive 3D WebGL interfaces.
      `,

      chinese: () => `
[CHINESE LANGUAGE & CHINA EXPERIENCE (HSK-4)]
• Certified HSK-4 Level in Mandarin Chinese.
• Studied in China at Hexi University (Gansu, China) & Beijing University Online.
• Extensive experience in cross-cultural consultation, Chinese market analysis, and bilateral supply-chain coordination.
      `,

      projects: () => `
[FEATURED CASE STUDIES]
1. OmniMarket 3D AI Intelligence Suite (Node.js, React, Three.js, MongoDB)
2. HyperTrade Global MERN Commerce Engine (MERN Stack, Stripe, Trilingual)
3. SinoConnect B2B Consultation Hub (Node.js, REST APIs, Cross-Border)
4. QuantumSync Real-Time Team Workspace (Node.js, WebSockets, MongoDB)
5. VentureStrat Startup GTM Simulator (JavaScript, Canvas, Financial Modeling)
      `,

      contact: () => `
[COMMUNICATION CHANNELS]
Email: murtzaharry21@gmail.com
Phone / WhatsApp: +92 326 0586026
Location: Street 40, G13-2, Islamabad, Pakistan
Fiverr: Top-Rated Seller
Upwork: Top-Rated Consultant
      `,

      "download-cv": () => {
        const modal = document.getElementById('resume-modal');
        if (modal) modal.classList.add('open');
        return "Initiating Curriculum Vitae viewport...";
      },

      clear: () => {
        this.clear();
        return null;
      }
    };

    this.init();
  }

  init() {
    if (!this.input || !this.container) return;

    this.input.addEventListener('keydown', (e) => {
      soundEngine.playTerminalKey();

      if (e.key === 'Enter') {
        const rawCmd = this.input.value.trim();
        if (!rawCmd) return;

        this.history.push(rawCmd);
        this.historyIndex = this.history.length;
        this.executeCommand(rawCmd);
        this.input.value = '';
      } else if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.history[this.historyIndex] || '';
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.input.value = this.history[this.historyIndex] || '';
        } else {
          this.historyIndex = this.history.length;
          this.input.value = '';
        }
      }
    });
  }

  executeCommand(raw) {
    const parts = raw.split(' ');
    const cmd = parts[0].toLowerCase();
    const arg = parts[1] ? parts[1].toLowerCase() : null;

    this.appendLine(`<span class="prompt-symbol">nexus@murtaza:~$</span> <span class="term-cmd-history">${this.escapeHTML(raw)}</span>`);

    if (cmd === 'scene' && arg) {
      if (['nexus', 'globe', 'cube'].includes(arg)) {
        threeScene.setMode(arg);
        this.appendLine(`<span class="term-result success">>> 3D Scene switched to [${arg.toUpperCase()}].</span>`);
        soundEngine.playWarp();
      } else {
        this.appendLine(`<span class="term-result error">>> Unknown scene mode '${arg}'. Choose: nexus, globe, cube</span>`);
      }
    } else if (this.commands[cmd]) {
      const output = this.commands[cmd]();
      if (output) {
        this.appendLine(`<pre class="term-result info">${this.escapeHTML(output.trim())}</pre>`);
      }
    } else {
      this.appendLine(`<span class="term-result error">>> Command '${this.escapeHTML(cmd)}' not recognized. Type 'help' for valid commands.</span>`);
    }

    this.scrollToBottom();
  }

  appendLine(html) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = html;
    this.container.appendChild(line);
  }

  clear() {
    this.container.innerHTML = `
      <div class="term-welcome">
        [SYSTEM INITIALIZED: GHULAM MURTAZA OS v3.2.0]<br>
        Type <span style="color:var(--neon-cyan); font-weight:700;">help</span> to inspect system commands.
      </div>
    `;
  }

  scrollToBottom() {
    this.container.scrollTop = this.container.scrollHeight;
  }

  escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
}

export const terminal = new TerminalEmulator();
