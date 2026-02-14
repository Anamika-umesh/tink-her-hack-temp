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
  <h2 style={styles.title}>About VEIL</h2>

  <p style={styles.lead}>
    Not every feeling is meant to be spoken out loud.  
    Some emotions live quietly in the heart — waiting for a safe place to exist.
  </p>

  <div style={styles.card}>
    <h3>🌙 What is VEIL?</h3>
    <p>
      VEIL is an anonymous emotional expression platform built for the moments
      when you want to say something but don’t know how — or don’t feel safe
      revealing who you are.  
      It’s a space where honesty meets privacy, and vulnerability meets safety.
    </p>
  </div>

  <div style={styles.card}>
    <h3>✨ Why VEIL Exists</h3>
    <p>
      We live in a world where expressing emotions can feel risky.  
      Fear of judgment, rejection, embarrassment, or misunderstanding often
      keeps people silent. VEIL exists to remove that fear.
    </p>
    <p>
      Here, your feelings are valid — whether they’re romantic, appreciative,
      apologetic, or simply heartfelt.
    </p>
  </div>

  <div style={styles.card}>
    <h3>💌 What You Can Share</h3>
    <ul style={styles.list}>
      <li>Unspoken love you’ve carried quietly.</li>
      <li>Gratitude you never found the courage to express.</li>
      <li>Apologies left unsaid.</li>
      <li>Admiration for someone who changed your life.</li>
      <li>Encouraging words that might brighten someone’s day.</li>
    </ul>
  </div>

  <div style={styles.card}>
    <h3>🔐 Privacy & Safety First</h3>
    <p>
      Your identity stays hidden unless you choose otherwise.  
      We design VEIL with privacy at its core — so your emotions can travel
      safely, without exposing you.
    </p>
    <p>
      Every confession is protected, and you always stay in control of what you
      reveal and when.
    </p>
  </div>

  <div style={styles.card}>
    <h3>🫶 For the Receiver</h3>
    <p>
      Receiving an anonymous message can be powerful.  
      It can remind you that you matter more than you realize.
    </p>
    <p>
      VEIL lets you decide how to respond — accept the message, reflect on it,
      or simply let it be a quiet reminder that someone cares.
    </p>
  </div>

  <div style={styles.card}>
    <h3>🌱 Emotional Well-being</h3>
    <p>
      Bottling up emotions can be heavy. Expressing them — even anonymously —
      can be freeing. VEIL isn’t just about confessions; it’s about emotional
      release, reflection, and healing.
    </p>
  </div>

  <div style={styles.highlight}>
    <h3>💖 Our Philosophy</h3>
    <p>
      We believe vulnerability is not weakness.  
      We believe kindness can be anonymous.  
      We believe emotions deserve space to breathe.
    </p>
    <p>
      VEIL is built for quiet hearts in a loud world.
    </p>
  </div>

  <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
    <p style={{ fontStyle: "italic", opacity: 0.85 }}>
      “Sometimes the truth needs a mask to be spoken.”
    </p>

    <button
      style={{
        marginTop: "1rem",
        padding: "0.9rem 2rem",
        borderRadius: "999px",
        border: "none",
        background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
        color: "black",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
      }}
      onClick={() => router.push("/home")}
    >
      Begin Your Story 💌
    </button>
  </div>
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
  title: {
  fontSize: "2.4rem",
  marginBottom: "0.5rem",
  textAlign: "center",
  letterSpacing: "1px",
},

lead: {
  textAlign: "center",
  fontSize: "1.1rem",
  color: "#c60606",
  marginBottom: "2rem",
},

card: {
  background: "rgba(0,0,0,0.5)",
  padding: "1.5rem",
  borderRadius: "14px",
  boxShadow: "0 8px 25px rgba(0,0,0,0.3)",
  backdropFilter: "blur(6px)",
  transition: "transform 0.3s ease, box-shadow 0.3s ease",
  cursor: "pointer",
},
"card:hover": {
  transform: "translateY(-8px)",
  boxShadow: "0 12px 35px rgba(230, 57, 70, 0.4)",
},

highlight: {
  background: "linear-gradient(135deg, rgba(255,99,132,0.3), rgba(255,159,64,0.3))",
  padding: "1.8rem",
  borderRadius: "16px",
  textAlign: "center",
  marginTop: "1.5rem",
  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
},

list: {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginLeft: "1rem",
},

};
