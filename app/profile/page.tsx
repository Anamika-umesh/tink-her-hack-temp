"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);

  const [myConfessions, setMyConfessions] = useState<any[]>([]);

  // 🔁 Load profile from localStorage (demo)
  useEffect(() => {
    const saved = localStorage.getItem("veilProfile");
    if (saved) {
      const p = JSON.parse(saved);
      setName(p.name || "");
      setBio(p.bio || "");
      setEmail(p.email || "");
      setContact(p.contact || "");
      setPhoto(p.photo || null);
    }

    const senderName = localStorage.getItem("veilCurrentUser");
    if (senderName) {
      fetch(`/api/my-confessions?senderName=${senderName}`)
        .then((res) => res.json())
        .then((data) => setMyConfessions(data))
        .catch(() => {});
    }
  }, []);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPhoto(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    const profile = { name, bio, email, contact, photo };
    localStorage.setItem("veilProfile", JSON.stringify(profile));
    alert("Profile saved successfully!");
  };

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
            <span onClick={() => router.push("/receiver")}>Receiver</span>
            <span onClick={() => router.push("/about")}>About</span>
          </nav>
        </header>

        {/* CONTENT */}
        <section style={styles.content}>
          <h2 style={{ textAlign: "center" }}>Your Profile</h2>

          <div style={styles.avatarWrap}>
            <img
              src={photo || "/uploadphoto.png"}
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

          <input
            type="text"
            placeholder="Contact Number"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            style={styles.input}
          />

          <textarea
            placeholder="Short bio (optional)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            style={styles.textarea}
          />

          <button style={styles.button} onClick={handleSave}>
            Save Profile
          </button>

          {/* 🔔 SENT CONFESSIONS STATUS */}
          <h3 style={{ marginTop: "2rem" }}>My Sent Confessions</h3>

          {myConfessions.length === 0 && (
            <p style={{ color: "#ccc" }}>No confessions sent yet.</p>
          )}

          {myConfessions.map((c) => (
            <div key={c.token} style={styles.confessionCard}>
              <p><b>Message:</b> {c.confessionText}</p>
              <p><b>Status:</b> {c.status || "pending"}</p>

              {c.status === "accepted" && (
                <>
                  <p style={{ color: "#2ecc71" }}>Accepted ❤️</p>
                  <p><b>Receiver Reply:</b> {c.receiverReply || "No reply yet"}</p>
                </>
              )}

              {c.status === "rejected" && (
                <p style={{ color: "#e63946" }}>Rejected 💔</p>
              )}
            </div>
          ))}
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
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    maxWidth: "520px",
  },
  avatarWrap: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
  },
  uploadBtn: {
    padding: "0.5rem 0.8rem",
    borderRadius: 6,
    background: "#e63946",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: "bold",
  },
  input: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    width: "100%",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    minHeight: 100,
    outline: "none",
    width: "100%",
  },
  button: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e63946",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    width: "100%",
  },
  confessionCard: {
    background: "#1a1a1a",
    padding: "1rem",
    borderRadius: 10,
    marginTop: "1rem",
  },
  footer: {
    padding: "1rem",
    backgroundColor: "rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#ddd",
    fontSize: "0.9rem",
  },
};
