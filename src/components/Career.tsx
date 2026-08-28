import "./styles/Career.css";

const Career = () => {
  return (
    <div className="career-section section-container">
      <div className="career-container">
        <h2>
          My career <span>&</span>
          <br /> experience
        </h2>
        <div className="career-info">
          <div className="career-timeline">
            <div className="career-dot"></div>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Freelance Market Researcher</h4>
                <h5>Fiverr · Top-Rated Seller</h5>
              </div>
              <h3>NOW</h3>
            </div>
            <p>
              Since 2020 – Present. Delivered comprehensive market research,
              financial business plans, and competitive analysis to 100+ clients
              globally. Maintained 100% 5-star Top-Rated Seller status across
              North America, Europe, and Asia.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Market Researcher & Business Planner</h4>
                <h5>Upwork · Expert Consultant</h5>
              </div>
              <h3>2022–26</h3>
            </div>
            <p>
              Provided market research, feasibility studies, and strategic
              consulting to diverse clients across tech, e-commerce, and
              healthcare industries. Delivered granular industry analysis,
              competitor benchmarking, SWOT evaluations, and actionable business
              roadmaps.
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>Full-Stack Web Developer</h4>
                <h5>Independent / Contract</h5>
              </div>
              <h3>2021–26</h3>
            </div>
            <p>
              Architected and deployed responsive full-stack applications with
              Node.js, Express, React, and MongoDB. Designed interactive 3D
              WebGL interfaces, custom RESTful APIs, and secure authentication
              systems (MERN & MEAN Stack).
            </p>
          </div>
          <div className="career-info-box">
            <div className="career-info-in">
              <div className="career-role">
                <h4>BSc Computer Science</h4>
                <h5>Sarhad University Islamabad</h5>
              </div>
              <h3>2021–25</h3>
            </div>
            <p>
              Graduated with expertise in software engineering, algorithm
              design, data structures, full-stack architectures, and database
              management. NAVTTC Certified MEAN & MERN Stack Developer (2023).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
