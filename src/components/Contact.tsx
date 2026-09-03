import { FormEvent, useState } from "react";
import { MdArrowOutward, MdCopyright } from "react-icons/md";
import "./styles/Contact.css";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSending(true);
    setStatus("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unable to send message.");
      setStatus("Message sent successfully.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Unable to send message.");
    } finally {
      setIsSending(false);
    }
  };

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
            <h4>Send a message</h4>
            <form className="contact-form" onSubmit={handleSubmit}>
              <input type="text" placeholder="Your name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required />
              <input type="email" placeholder="Your email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
              <input type="text" placeholder="Subject" value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} />
              <textarea placeholder="Write your message" value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} rows={4} required />
              <button type="submit" disabled={isSending}>{isSending ? "Sending..." : "Send message"}</button>
              {status && <p className="contact-form-status">{status}</p>}
            </form>
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
