"use client";
import React from "react";

export default function HomePage() {
  return (
    <main style={styles.container}>
      {/* HEADER */}
      <header style={styles.header}>
    
  <div style={styles.headerLeft}>
    <img src="/logo.png" alt="VEIL logo" style={styles.logoImg} />
    <h1 style={styles.logoText}>VEIL</h1>
  </div>

  <nav style={styles.nav}>
    <span>Home</span>
    <span>Profile</span>
    <span>Receiver</span>
    <span>Messages</span>
  </nav>
        </header>
    

      {/* CONTENT */}
      <section style={styles.content}>
        <h2>Send Your Confession</h2>
        <input type="email" placeholder="Receiver Email ID" style={styles.input} />
        <textarea placeholder="Write your anonymous confession..." style={styles.textarea} />
        <button style={styles.button}>Send 💌</button>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <p>"Love is powerful when words are hidden."</p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#111",
    color: "white",
    backgroundImage: "url('/bg.jpeg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center center",
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
},

  header: { padding: "1rem", backgroundColor: "#1a1a1a" },
  logo: { margin: 0, fontSize: "2rem" },
  nav: { display: "flex", gap: "1.5rem", marginTop: "0.5rem", fontSize: "0.9rem", cursor: "pointer" },
  content: { flex: 1, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "500px" },
  input: { padding: "0.8rem", borderRadius: "8px", border: "none" },
  textarea: { padding: "0.8rem", borderRadius: "8px", border: "none", minHeight: "120px" },
  button: { padding: "0.8rem", borderRadius: "8px", border: "none", backgroundColor: "#e63946", color: "white", fontWeight: "bold", cursor: "pointer" },
  footer: { padding: "1rem", backgroundColor: "#1a1a1a", textAlign: "center", color: "#aaa" },
};
