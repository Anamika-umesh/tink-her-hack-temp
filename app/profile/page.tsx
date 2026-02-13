"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>VEIL</h1>
        <nav style={styles.nav}>
          <span onClick={() => router.push("/home")}>Home</span>
          <span onClick={() => router.push("/profile")}>Profile</span>
          <span onClick={() => router.push("/receiver")}>Receiver</span>
          <span onClick={() => router.push("/home")}>Messages</span>
        </nav>
      </header>

      <section style={styles.content}>
        <h2>Your Profile</h2>

        <div style={styles.avatarWrap}>
          <img
            src={photo || "/avatar.png"}
            alt="Profile"
            style={styles.avatar}
          />
          <label style={styles.uploadBtn}>
            Upload Photo
            <input type="file" accept="image/*" hidden onChange={handlePhoto} />
          </label>
        </div>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <textarea
          placeholder="Short bio (optional)"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          style={styles.textarea}
        />

        <button style={styles.button} onClick={() => alert("Saved (demo)")}>
          Save Profile
        </button>
      </section>

      <footer style={styles.footer}>
        <p>"Be yourself; love finds honesty."</p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#111", color: "white" },
  header: { padding: "1rem 2rem", display: "flex", justifyContent: "space-between", background: "#1a1a1a" },
  logo: { margin: 0, fontSize: "1.8rem" },
  nav: { display: "flex", gap: "1.2rem", fontSize: "0.9rem", cursor: "pointer" },
  content: { flex: 1, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 420 },
  avatarWrap: { display: "flex", alignItems: "center", gap: "12px" },
  avatar: { width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid #333" },
  uploadBtn: { padding: "0.4rem 0.7rem", borderRadius: 6, background: "#333", cursor: "pointer", fontSize: 12 },
  input: { padding: "0.8rem", borderRadius: 8, border: "none", outline: "none" },
  textarea: { padding: "0.8rem", borderRadius: 8, border: "none", minHeight: 100, outline: "none" },
  button: { padding: "0.8rem", borderRadius: 8, border: "none", background: "#e63946", color: "white", fontWeight: "bold", cursor: "pointer" },
  footer: { padding: "1rem", background: "#1a1a1a", textAlign: "center", color: "#aaa" },
};
