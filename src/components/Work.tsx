import { useState, useCallback } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { MdArrowBack, MdArrowForward } from "react-icons/md";

const projects = [
  {
    title: "Hunza Crafts",
    category: "E-Commerce Platform for Artisan Crafts",
    tools: "React.js, Node.js, Vercel, REST APIs, Modern UI",
    image: "https://fjzmbemfhtmydrycvrds.supabase.co/storage/v1/object/public/catalog/images/defaults/hero.jpg",
    link: "https://hunzacrafts.vercel.app/",
  },
  {
    title: "OmniMarket AI Suite",
    category: "Full-Stack Market Analytics Platform",
    tools: "Node.js, React, Three.js, MongoDB, Chart.js",
    image: "/images/placeholder.webp",
    link: "https://github.com/murtzaharri21-cyber",
  },
  {
    title: "HyperTrade Commerce Engine",
    category: "MERN Stack Cross-Border E-Commerce",
    tools: "React.js, Node.js, Express, MongoDB, Stripe API",
    image: "/images/placeholder.webp",
    link: "https://github.com/murtzaharri21-cyber",
  },
  {
    title: "SinoConnect B2B Hub",
    category: "Cross-Cultural Business Intelligence Portal",
    tools: "Node.js, Express, REST APIs, HSK-4 Mandarin",
    image: "/images/placeholder.webp",
    link: "https://github.com/murtzaharri21-cyber",
  },
  {
    title: "VentureStrat GTM Simulator",
    category: "Startup Financial Modeling & Market Penetration Tool",
    tools: "JavaScript, HTML5 Canvas, Node.js, Data Modeling",
    image: "/images/placeholder.webp",
    link: "https://github.com/murtzaharri21-cyber",
  },
];

const Work = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goToSlide = useCallback(
    (index: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating]
  );

  const goToPrev = useCallback(() => {
    const newIndex =
      currentIndex === 0 ? projects.length - 1 : currentIndex - 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  const goToNext = useCallback(() => {
    const newIndex =
      currentIndex === projects.length - 1 ? 0 : currentIndex + 1;
    goToSlide(newIndex);
  }, [currentIndex, goToSlide]);

  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>

        <div className="carousel-wrapper">
          {/* Navigation Arrows */}
          <button
            className="carousel-arrow carousel-arrow-left"
            onClick={goToPrev}
            aria-label="Previous project"
            data-cursor="disable"
          >
            <MdArrowBack />
          </button>
          <button
            className="carousel-arrow carousel-arrow-right"
            onClick={goToNext}
            aria-label="Next project"
            data-cursor="disable"
          >
            <MdArrowForward />
          </button>

          {/* Slides */}
          <div className="carousel-track-container">
            <div
              className="carousel-track"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
              }}
            >
              {projects.map((project, index) => (
                <div className="carousel-slide" key={index}>
                  <div className="carousel-content">
                    <div className="carousel-info">
                      <div className="carousel-number">
                        <h3>0{index + 1}</h3>
                      </div>
                      <div className="carousel-details">
                        <h4>{project.title}</h4>
                        <p className="carousel-category">
                          {project.category}
                        </p>
                        <div className="carousel-tools">
                          <span className="tools-label">Tools &amp; Stack</span>
                          <p>{project.tools}</p>
                        </div>
                      </div>
                    </div>
                    <div className="carousel-image-wrapper">
                      <WorkImage
                        image={project.image}
                        alt={project.title}
                        link={project.link}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dot Indicators */}
          <div className="carousel-dots">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentIndex ? "carousel-dot-active" : ""
                  }`}
                onClick={() => goToSlide(index)}
                aria-label={`Go to project ${index + 1}`}
                data-cursor="disable"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
