import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Network error. Please try again later.");
    }
  };

  return (
    <section
      id="contact"
      style={{
        padding: "5rem 1.5rem",
        background: "transparent",
        display: "flex",
        justifyContent: "center"
      }}
    >
      <div
        style={{
          background: "rgba(27, 31, 59, 0.8)",
          padding: "3rem 4rem",
          borderRadius: "48px",
          maxWidth: "600px",
          width: "100%",
          boxShadow: `
            0 0 8px #5D9EFF,
            0 0 20px #A3E4D7,
            0 0 30px #5D9EFF,
            inset 0 0 12px #A3E4D7
          `,
          border: "2px solid #5D9EFF",
          color: "#E5E9F0",
          transition: "box-shadow 0.3s ease"
        }}
      >
        <h2
          style={{
            fontSize: "2.6rem",
            background: "linear-gradient(90deg, #5D9EFF, #A3E4D7)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontFamily: "var(--font-heading)",
            marginBottom: "2rem",
            textAlign: "center"
          }}
        >
          Contact Us
        </h2>

        {submitted ? (
          <p
            style={{
              fontSize: "1.3rem",
              textAlign: "center",
              color: "#A3E4D7"
            }}
          >
            ✅ Thanks for reaching out! We'll get back to you shortly.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              style={inputStyle}
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ ...inputStyle, resize: "vertical" }}
            />

            <button
              type="submit"
              style={submitBtnStyle}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              Send Message
            </button>
            {error && (
              <p style={{ color: "#ff6464", textAlign: "center" }}>{error}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
};

const inputStyle = {
  padding: "1rem",
  borderRadius: "12px",
  border: "1px solid #5D9EFF",
  background: "rgba(255, 255, 255, 0.05)",
  color: "#E5E9F0",
  fontSize: "1rem",
  outline: "none",
  transition: "border-color 0.3s ease"
};

const submitBtnStyle = {
  background: "linear-gradient(to right, #5D9EFF, #A3E4D7)",
  padding: "1.2rem",
  borderRadius: "999px",
  border: "none",
  fontWeight: "700",
  fontSize: "1.1rem",
  cursor: "pointer",
  color: "#0B0C2A",
  boxShadow: "0 8px 25px rgba(93,158,255,0.3)",
  transition: "transform 0.3s ease"
};

export default Contact;
