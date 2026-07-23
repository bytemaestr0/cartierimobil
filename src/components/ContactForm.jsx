import { useState } from "react";
import "./ContactForm.css";

export default function ContactForm({ t, defaultMessage, dealSlug, dealTitle }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: defaultMessage,
  });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, dealSlug, dealTitle }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch (err) {
      console.error("Failed to submit request:", err);
      setStatus("error");
    }
  };

  const sent = status === "sent";

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <h3 className="contact-form__title">{t.formTitle}</h3>
      <p className="contact-form__subtitle">{t.formSubtitle}</p>

      <label className="contact-form__field">
        <span>{t.nameLabel}</span>
        <input
          type="text"
          required
          placeholder={t.namePlaceholder}
          value={form.name}
          onChange={update("name")}
        />
      </label>

      <label className="contact-form__field">
        <span>{t.emailLabel}</span>
        <input
          type="email"
          required
          placeholder={t.emailPlaceholder}
          value={form.email}
          onChange={update("email")}
        />
      </label>

      <label className="contact-form__field">
        <span>{t.phoneLabel}</span>
        <input
          type="tel"
          placeholder={t.phonePlaceholder}
          value={form.phone}
          onChange={update("phone")}
        />
      </label>

      <label className="contact-form__field">
        <span>{t.messageLabel}</span>
        <textarea rows={5} value={form.message} onChange={update("message")} />
      </label>

      <button
        type="submit"
        className="btn btn--primary contact-form__submit"
        disabled={status === "sending" || sent}
      >
        {sent ? "✓" : status === "sending" ? "…" : t.submit}
        {status === "idle" && (
          <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
            <path
              d="M4 10h12M11 5l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>

      {status === "error" && (
        <p className="contact-form__error" role="alert">
          {t.submitError || "Something went wrong. Please try again."}
        </p>
      )}
    </form>
  );
}
