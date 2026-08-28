/**
 * Ghulam Murtaza 3D Interactive Portfolio Main Controller
 */

import { soundEngine } from './audio.js';
import { threeScene } from './three-scene.js';
import { i18n } from './i18n.js';
import { terminal } from './terminal.js';

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initNavbar();
  initAudioToggle();
  initSceneHUD();
  initLangDropdown();
  initSkillTabs();
  initCardTilts();
  initContactForm();
  initResumeModal();
  initSoundsOnInteractiveElements();
});

/* ==========================================================================
   DYNAMIC TYPEWRITER EFFECT
   ========================================================================== */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const roles = [
    "Full Stack MERN/MEAN Developer",
    "Top-Rated Fiverr & Upwork Consultant",
    "Fluent Mandarin Speaker (HSK-4)",
    "Market Research & GTM Strategist",
    "Interactive 3D Web Architect"
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 90;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      el.textContent = currentRole.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      el.textContent = currentRole.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of text
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingSpeed = 400;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   NAVBAR & SCROLL SPY
   ========================================================================== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Active Section Spy
    let currentId = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
  }, { passive: true });
}

/* ==========================================================================
   AUDIO SYNTHESIZER TOGGLE
   ========================================================================== */
function initAudioToggle() {
  const audioBtn = document.getElementById('audio-toggle-btn');
  const soundWaves = document.querySelector('.sound-waves');

  if (!audioBtn) return;

  audioBtn.addEventListener('click', () => {
    const isUnmuted = soundEngine.toggleMute();
    audioBtn.classList.toggle('active', isUnmuted);
    
    if (isUnmuted) {
      soundEngine.playSuccess();
      if (soundWaves) soundWaves.style.display = 'inline-flex';
    } else {
      if (soundWaves) soundWaves.style.display = 'none';
    }
  });
}

/* ==========================================================================
   3D SCENE MODE HUD
   ========================================================================== */
function initSceneHUD() {
  const sceneBtns = document.querySelectorAll('.scene-btn');
  sceneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.mode;
      threeScene.setMode(mode);
      soundEngine.playWarp();
    });
  });
}

/* ==========================================================================
   TRILINGUAL LOCALIZATION DROPDOWN
   ========================================================================== */
function initLangDropdown() {
  const langBtn = document.getElementById('lang-btn');
  const langMenu = document.getElementById('lang-menu');
  const options = document.querySelectorAll('.lang-option');

  if (!langBtn || !langMenu) return;

  langBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    langMenu.classList.toggle('show');
    soundEngine.playClick();
  });

  document.addEventListener('click', () => {
    langMenu.classList.remove('show');
  });

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      const lang = opt.dataset.lang;
      i18n.setLanguage(lang);
      langMenu.classList.remove('show');
      soundEngine.playSuccess();
    });
  });
}

/* ==========================================================================
   SKILLS CATEGORY TABS FILTERING
   ========================================================================== */
function initSkillTabs() {
  const tabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillCards = document.querySelectorAll('.skill-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      soundEngine.playClick();

      const category = btn.dataset.category;
      skillCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   3D CARD TILT EFFECT (Vanilla 3D Transform)
   ========================================================================== */
function initCardTilts() {
  const tiltCards = document.querySelectorAll('.tilt-card, .project-card, .hero-3d-card, .experience-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   CONTACT FORM HANDLER (AJAX Fetch to Node.js Backend)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const statusAlert = document.getElementById('form-status-alert');
  const submitBtn = document.getElementById('form-submit-btn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    soundEngine.playClick();

    const name = document.getElementById('contact-name')?.value.trim();
    const email = document.getElementById('contact-email')?.value.trim();
    const subject = document.getElementById('contact-subject')?.value.trim();
    const projectType = document.getElementById('contact-type')?.value;
    const message = document.getElementById('contact-message')?.value.trim();

    if (!name || !email || !message) {
      showAlert("Please fill in all mandatory fields (Name, Email, Message).", "error");
      return;
    }

    // Show loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Transmitting...`;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, subject, projectType, message })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        showAlert(data.message || "Message transmitted successfully! Ghulam will respond promptly.", "success");
        form.reset();
        soundEngine.playSuccess();
      } else {
        showAlert(data.error || "Failed to transmit message. Please try again.", "error");
      }
    } catch (err) {
      showAlert("Network error. Please try reaching out directly via WhatsApp or Email.", "error");
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<i class="fa-solid fa-paper-plane"></i> <span data-i18n="formSubmit">Send Transmission</span>`;
      }
    }
  });

  function showAlert(msg, type) {
    if (!statusAlert) return;
    statusAlert.className = `form-status-alert ${type}`;
    statusAlert.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-triangle-exclamation'}"></i>
      <span>${msg}</span>
    `;
    statusAlert.style.display = 'flex';
  }
}

/* ==========================================================================
   RESUME & CV MODAL
   ========================================================================== */
function initResumeModal() {
  const modal = document.getElementById('resume-modal');
  const openBtns = document.querySelectorAll('.open-resume-btn');
  const closeBtn = document.getElementById('modal-close-btn');
  const printBtn = document.getElementById('print-resume-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal?.classList.add('open');
      soundEngine.playClick();
    });
  });

  closeBtn?.addEventListener('click', () => {
    modal?.classList.remove('open');
    soundEngine.playClick();
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('open');
    }
  });

  printBtn?.addEventListener('click', () => {
    window.print();
  });
}

/* ==========================================================================
   HOVER & CLICK SOUND TRIGGERS
   ========================================================================== */
function initSoundsOnInteractiveElements() {
  const hoverables = document.querySelectorAll('a, button, .btn-primary, .btn-secondary, .hud-btn, .scene-btn, .skill-tab-btn, .direct-link-row, .project-card');

  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      soundEngine.playHover();
    });
  });
}
