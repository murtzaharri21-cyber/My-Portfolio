import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact-section section-container" id="contact">
      <div className="contact-container">
        <h3>Contact</h3>
        <div className="contact-flex">
          <div className="contact-box">
            <h4>Connect</h4>
            <p>
              <a
                href="https://www.linkedin.com/in/ghulam-murtaza-493aa2212/"
                target="_blank"
                rel="noreferrer"
                data-cursor="disable"
              >
                LinkedIn — Ghulam Murtaza
              </a>
            </p>
            <p>
              <a
                href="mailto:murtzaharry21@gmail.com"
                data-cursor="disable"
              >
                murtzaharry21@gmail.com
              </a>
            </p>
            <h4>Education</h4>
            <p>
              BSc Computer Science, Sarhad University Islamabad — 2021–2025
            </p>
            <p>
              Chinese Language Studies, NUML University — 2020–2021
            </p>
            <p>HSK-4 Certified (Fluent Mandarin Chinese)</p>
          </div>
          <div className="contact-box">
            <h4>Social</h4>
            <a
              href="https://github.com/murtzaharri21-cyber"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              GitHub <MdArrowOutward />
            </a>
            <a
              href="https://www.linkedin.com/in/ghulam-murtaza-493aa2212/"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              LinkedIn <MdArrowOutward />
            </a>
            <a
              href="https://www.fiverr.com/murtaza_harry?public_mode=true"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Fiverr <MdArrowOutward />
            </a>
            <a
              href="https://www.upwork.com/freelancers/~01ee1420fb44abd6e6"
              target="_blank"
              rel="noreferrer"
              data-cursor="disable"
              className="contact-social"
            >
              Upwork <MdArrowOutward />
            </a>
          </div>
          <div className="contact-box">
            <h2>
              Designed and Developed <br /> by <span>Ghulam Murtaza</span>
            </h2>
            <h5>
              <MdCopyright /> 2026
            </h5>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
