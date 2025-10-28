import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

export default function Contact() {
  const form = useRef();
  const [status, setStatus] = useState("");

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus("> Connecting to Thewriter's neural uplink...");

    try {
      await emailjs.sendForm(
        "service_d3e2dpb", // your service ID
        "template_d1w9j0h", // your template ID
        form.current,
        "bhw-ipFIKXhkOcmj7" // your public key
      );
      setStatus("> Transmission sent successfully ✅");
      e.target.reset();
    } catch (error) {
      console.error(error);
      setStatus("> Transmission failed ❌ Check console for details.");
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-title">📡 Transmission Terminal</h2>
      <form ref={form} onSubmit={sendEmail} className="contact-form">
        <label>Name</label>
        <input type="text" name="user_name" required />

        <label>Email</label>
        <input type="email" name="user_email" required />

        <label>Message</label>
        <textarea name="message" required></textarea>

        <button className="btn-form" type="submit">Transmit Signal</button>
      </form>

      {status && <p className="contact-status">{status}</p>}
    </div>
  );
}
