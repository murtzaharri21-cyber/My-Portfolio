import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

import Marquee from "react-fast-marquee";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading, setLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth <= 768 ||
      window.matchMedia("(pointer: coarse)").matches ||
      /(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i.test(
        navigator.userAgent
      ));

  useEffect(() => {
    if (isMobile) {
      setLoading(100);
      setLoaded(true);
      setClicked(true);
      setIsLoading(false);
      return;
    }

    if (percent < 100) return;

    setLoaded(true);
    const finishLoading = window.setTimeout(() => setIsLoaded(true), 250);
    return () => window.clearTimeout(finishLoading);
  }, [isMobile, percent, setIsLoading, setLoading]);

  useEffect(() => {
    if (!isLoaded) return;

    setClicked(true);
    let cancelled = false;
    import("./utils/initialFX")
      .then((module) => {
        if (cancelled) return;
        try {
          module.initialFX?.();
        } finally {
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isLoaded, setIsLoading]);

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  }

  return (
    <>
      <div className="loading-header">
        <a href="/#" className="loader-title" data-cursor="disable">
          GM
        </a>
        <div className={`loaderGame ${clicked && "loader-out"}`}>
          <div className="loaderGame-container">
            <div className="loaderGame-in">
              {[...Array(27)].map((_, index) => (
                <div className="loaderGame-line" key={index}></div>
              ))}
            </div>
            <div className="loaderGame-ball"></div>
          </div>
        </div>
      </div>
      <div className="loading-screen">
        <div className="loading-marquee">
          <Marquee>
            <span> Full-Stack Developer</span> <span>Market Strategist</span>
            <span> Top-Rated Seller</span> <span>HSK-4 Certified</span>
            <span> Full-Stack Developer</span> <span>Market Strategist</span>
          </Marquee>
        </div>
        <div
          className={`loading-wrap ${clicked && "loading-clicked"}`}
          onMouseMove={(e) => handleMouseMove(e)}
        >
          <div className="loading-hover"></div>
          <div className={`loading-button ${loaded && "loading-complete"}`}>
            <div className="loading-container">
              <div className="loading-content">
                <div className="loading-content-in">
                  Loading <span>{percent}%</span>
                </div>
              </div>
              <div className="loading-box"></div>
            </div>
            <div className="loading-content2">
              <span>Welcome</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = window.setInterval(() => {
    const rand = Math.round(Math.random() * 5);
    percent = Math.min(percent + rand, 90);
    setLoading(percent);
    if (percent >= 90) window.clearInterval(interval);
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      window.clearInterval(interval);
      interval = window.setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          window.clearInterval(interval);
        }
      }, 8);
    });
  }
  return { loaded, percent, clear };
};
