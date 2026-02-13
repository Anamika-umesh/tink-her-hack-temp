"use client";
import React from "react";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const handleSend = () => {
    alert("Your confession was sent anonymously 💌 (demo)");
  };

  return (
    <main style={styles.container}>
      <div style={styles.overlay}>
        {/* HEADER */}
        <header style={styles.header}>
          <div style={styles.headerLeft}>
            <img src="/logo.png" style={styles.logoImg} />
            <h1 style={styles.logoText}>VEIL</h1>
          </div>

          <nav style={styles.nav}>
  <span onClick={() => router.push("/home")}>Home</span>
  <span onClick={() => router.push("/profile")}>Profile</span>
  <span onClick={() => router.push("/home")}>Receiver</span>
  <span onClick={() => router.push("/home")}>Messages</span>
</nav>

        </header>

        {/* CONTENT */}
        <section style={styles.content}>
          <h2>Send Your Confession</h2>

          <input
            type="email"
            placeholder="Receiver Email ID"
            style={styles.input}
          />

          <textarea
            placeholder="Write your anonymous confession..."
            style={styles.textarea}
          />

          <button style={styles.button} onClick={handleSend}>
            Send 💌
          </button>
        </section>

        {/* FOOTER */}
        <footer style={styles.footer}>
          <p>"Love is powerful when words are hidden."</p>
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
    backgroundColor: "rgba(0,0,0,0.6)",
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
  },
  navItem: {
    cursor: "pointer",
    opacity: 0.9,
  },
  content: {
    flex: 1,
    padding: "3rem 2rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "500px",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    minHeight: "120px",
  },
  button: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e63946",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  footer: {
    padding: "1rem",
    backgroundColor: "rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#ddd",
    fontSize: "0.9rem",
  },
};
