import { FormEvent, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MdClose, MdInbox, MdMarkEmailRead } from "react-icons/md";
import "./styles/Inbox.css";

interface InboxMessage {
  id: string;
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  projectType: string;
  message: string;
  read?: boolean;
}

const Inbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [key, setKey] = useState(() => localStorage.getItem("inbox-key") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [selected, setSelected] = useState<InboxMessage | null>(null);
  const [error, setError] = useState("");

  const loadMessages = async (inboxKey: string) => {
    const response = await fetch("/api/inbox", {
      headers: { "x-inbox-key": inboxKey },
    });
    const responseText = await response.text();
    let result: { error?: string; data?: InboxMessage[] } = {};
    if (responseText) {
      try {
        result = JSON.parse(responseText) as { error?: string; data?: InboxMessage[] };
      } catch {
        throw new Error("The server returned an invalid response. Please try again.");
      }
    }
    if (!response.ok) throw new Error(result.error || "Unable to open inbox.");
    localStorage.setItem("inbox-key", inboxKey);
    setKey(inboxKey);
    setMessages(result.data || []);
    setIsAuthenticated(true);
    setError("");
  };

  useEffect(() => {
    const savedKey = localStorage.getItem("inbox-key");
    if (savedKey) {
      loadMessages(savedKey).catch(() => {
        localStorage.removeItem("inbox-key");
        setIsAuthenticated(false);
      });
    }
  }, []);

  const openMessage = async (message: InboxMessage) => {
    setSelected(message);
    if (message.read) return;
    await fetch(`/api/inbox/${message.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "x-inbox-key": key },
      body: JSON.stringify({ read: true }),
    });
    setMessages((current) => current.map((item) => item.id === message.id ? { ...item, read: true } : item));
  };

  const submitKey = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await loadMessages(key);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Unable to open inbox.");
    }
  };

  const unreadCount = messages.filter((message) => !message.read).length;

  return createPortal(
    <>
      <button className="inbox-trigger" type="button" onClick={() => setIsOpen(true)} aria-label="Open inbox">
        <img src="/images/tron-logo.svg" alt="" />
        {unreadCount > 0 && <span>{unreadCount}</span>}
      </button>
      {isOpen && (
        <div className="inbox-backdrop" onClick={() => setIsOpen(false)}>
          <section className="inbox-panel" onClick={(event) => event.stopPropagation()}>
            <header className="inbox-header">
              <div><span>Private workspace</span><h2>Inbox</h2></div>
              <button type="button" onClick={() => setIsOpen(false)} aria-label="Close inbox"><MdClose /></button>
            </header>
            {!isAuthenticated ? (
              <form className="inbox-login" onSubmit={submitKey}>
                <MdInbox />
                <h3>Open your messages</h3>
                <p>Enter your private inbox key to read contact requests.</p>
                <input type="password" value={key} onChange={(event) => setKey(event.target.value)} placeholder="Inbox key" autoFocus />
                <button type="submit">Open inbox</button>
                {error && <small>{error}</small>}
              </form>
            ) : (
              <div className="inbox-content">
                <div className="inbox-list">
                  {messages.length === 0 && <p className="inbox-empty">No messages yet.</p>}
                  {messages.map((message) => (
                    <button className={`inbox-message ${!message.read ? "unread" : ""}`} key={message.id} type="button" onClick={() => openMessage(message)}>
                      <span className="inbox-avatar">{message.name.charAt(0).toUpperCase()}</span>
                      <span><strong>{message.name}</strong><small>{message.subject}</small></span>
                      <time>{new Date(message.timestamp).toLocaleDateString()}</time>
                    </button>
                  ))}
                </div>
                <article className="inbox-reader">
                  {selected ? <><div className="reader-meta"><span className="inbox-avatar">{selected.name.charAt(0).toUpperCase()}</span><div><strong>{selected.name}</strong><small>{selected.email}</small></div><MdMarkEmailRead /></div><h3>{selected.subject}</h3><small>{selected.projectType}</small><p>{selected.message}</p><a href={`mailto:${selected.email}`}>Reply by email</a></> : <p className="inbox-empty">Select a message to read it.</p>}
                </article>
              </div>
            )}
          </section>
        </div>
      )}
    </>,
    document.body,
  );
};

export default Inbox;