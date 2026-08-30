import { useEffect, useRef } from "react";

const MobileHero3D = () => {
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;

    const update = () => {
      currentX += (pointerX - currentX) * 0.1;
      currentY += (pointerY - currentY) * 0.1;

      scene.style.setProperty("--rotate-x", `${currentY.toFixed(2)}deg`);
      scene.style.setProperty("--rotate-y", `${currentX.toFixed(2)}deg`);

      if (Math.abs(pointerX - currentX) > 0.03 || Math.abs(pointerY - currentY) > 0.03) {
        rafRef.current = requestAnimationFrame(update);
      } else {
        rafRef.current = null;
      }
    };

    const handleMove = (event: PointerEvent | TouchEvent) => {
      const point = "touches" in event ? event.touches[0] : event;
      const rect = scene.getBoundingClientRect();
      const x = (point.clientX - rect.left) / rect.width - 0.5;
      const y = (point.clientY - rect.top) / rect.height - 0.5;

      pointerX = x * 12;
      pointerY = y * -12;

      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    const handleLeave = () => {
      pointerX = 0;
      pointerY = 0;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(update);
      }
    };

    scene.addEventListener("pointermove", handleMove);
    scene.addEventListener("pointerleave", handleLeave);
    scene.addEventListener("touchmove", handleMove as EventListener, {
      passive: true,
    });
    scene.addEventListener("touchend", handleLeave);

    return () => {
      scene.removeEventListener("pointermove", handleMove);
      scene.removeEventListener("pointerleave", handleLeave);
      scene.removeEventListener("touchmove", handleMove as EventListener);
      scene.removeEventListener("touchend", handleLeave);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="mobile-hero-3d" aria-hidden="true">
      <div className="mobile-hero-scene" ref={sceneRef}>
        <div className="mobile-hero-backdrop" />
        <div className="mobile-hero-orb mobile-hero-orb-one" />
        <div className="mobile-hero-orb mobile-hero-orb-two" />
        <div className="mobile-hero-ring" />
        <div className="mobile-hero-particles">
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="mobile-particle" />
          ))}
        </div>
        <div className="mobile-hero-card">
          <span className="mobile-hero-badge">Creative Dev</span>
          <strong>Ghulam Murtaza</strong>
          <small>Full-Stack Engineer</small>
        </div>
      </div>
    </div>
  );
};

export default MobileHero3D;
