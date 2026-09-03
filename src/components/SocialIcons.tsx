import {
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa6";
import { SiFiverr, SiUpwork } from "react-icons/si";
import "./styles/SocialIcons.css";
import { TbNotes } from "react-icons/tb";
import { useEffect } from "react";
import HoverLinks from "./HoverLinks";

const SocialIcons = () => {
  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth <= 768 ||
      window.matchMedia("(pointer: coarse)").matches);

  useEffect(() => {
    if (isMobile) return;
    const social = document.getElementById("social") as HTMLElement;
    if (!social) return;

    const spans = social.querySelectorAll("span");
    const cleanups: Array<() => void> = [];

    spans.forEach((item) => {
      const elem = item as HTMLElement;
      const link = elem.querySelector("a") as HTMLElement;

      const rect = elem.getBoundingClientRect();
      let mouseX = rect.width / 2;
      let mouseY = rect.height / 2;
      let currentX = 0;
      let currentY = 0;

      const updatePosition = () => {
        currentX += (mouseX - currentX) * 0.12;
        currentY += (mouseY - currentY) * 0.12;

        link.style.setProperty("--siLeft", `${currentX}px`);
        link.style.setProperty("--siTop", `${currentY}px`);

        requestAnimationFrame(updatePosition);
      };

      const onMouseMove = (e: MouseEvent) => {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < 40 && x > 10 && y < 40 && y > 5) {
          mouseX = x;
          mouseY = y;
        } else {
          mouseX = rect.width / 2;
          mouseY = rect.height / 2;
        }
      };

      document.addEventListener("mousemove", onMouseMove);
      updatePosition();

      cleanups.push(() => {
        elem.removeEventListener("mousemove", onMouseMove);
      });
    });

    return () => {
      document.removeEventListener("mousemove", () => undefined);
      cleanups.forEach((cleanup) => cleanup());
    };
  }, [isMobile]);

  return (
    <div className="icons-section">
      <div className="social-icons" data-cursor="icons" id="social">
        <span>
          <a
            href="https://github.com/murtzaharri21-cyber"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </span>
        <span>
          <a
            href="https://www.linkedin.com/in/ghulam-murtaza-493aa2212/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedinIn />
          </a>
        </span>
        <span className="inbox-dock-item">
          <button
            className="inbox-dock-trigger"
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-inbox"))}
            aria-label="Open inbox"
          >
            <img src="/images/tron-logo.svg" alt="" />
          </button>
        </span>
        <span>
          <a
            href="https://www.fiverr.com/murtaza_harry?public_mode=true"
            target="_blank"
            rel="noreferrer"
          >
            <SiFiverr />
          </a>
        </span>
        <span>
          <a
            href="https://www.upwork.com/freelancers/~01ee1420fb44abd6e6"
            target="_blank"
            rel="noreferrer"
          >
            <SiUpwork />
          </a>
        </span>
      </div>
      <a
        className="resume-button"
        href="/Ghulam_Murtaza_CV.pdf"
        target="_blank"
        rel="noreferrer"
      >
        <HoverLinks text="RESUME" />
        <span>
          <TbNotes />
        </span>
      </a>
    </div>
  );
};

export default SocialIcons;
