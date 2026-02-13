"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AboutPage() {
  const router = useRouter();

  return (
    <main style={styles.container}>
      <div style={styles.overlay}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <img src="/logoo.png" style={styles.logoImg} />
            <h1 style={styles.logoText}>VEIL</h1>
          </div>

          <nav style={styles.nav}>
            <span onClick={() => router.push("/home")}>Home</span>
            <span onClick={() => router.push("/profile")}>Profile</span>
            <span onClick={() => router.push("/about")}>About</span>
          </nav>
        </header>

        {/* CONTENT */}
        <section style={styles.content}>
          <h2>About VEIL</h2>

          <p>
            VEIL is a platform designed to help people express their hidden
            feelings safely and anonymously. Sometimes words are hard to say
            out loud — VEIL gives you a space where emotions can be shared
            without fear or judgment.
          </p>

          <h3>✨ How It Works</h3>
          <ul>
            <li>Sign up and create your account.</li>
            <li>Send anonymous confessions to anyone.</li>
            <li>Receive heartfelt messages privately.</li>
            <li>Stay secure — your identity remains hidden.</li>
          </ul>

          <h3>🔐 Our Mission</h3>
          <p>
            We believe emotions matter. VEIL aims to create a safe digital
            space where honesty, vulnerability, and love can exist without
            pressure.
          </p>

          <h3>💌 Why VEIL?</h3>
          <p>
            Whether it’s admiration, apology, appreciation, or love — VEIL
            makes it easier to share what’s in your heart.
          </p>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>"Love is powerful when words are hidden."</p>
          <p>© 2026 VEIL — Hidden feelings, finally heard.</p>
        </footer>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    backgroundImage: "url('/OIP.png')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  },
  overlay: {
    minHeight: "100vh",
    backgroundColor: "rgba(0,0,0,0.65)",
    display: "flex",
    flexDirection: "column",
    color: "white",
  },
  header: {
    padding: "1rem 2rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(224, 125, 125, 0.6)",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoImg: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  logoText: {
    fontSize: "1.8rem",
    margin: 0,
    letterSpacing: "2px",
  },
  nav: {
    display: "flex",
    gap: "1.5rem",
    fontSize: "0.95rem",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "3rem 2rem",
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  footer: {
    padding: "1rem",
    backgroundColor: "rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#ddd",
    fontSize: "0.9rem",
  },
};
