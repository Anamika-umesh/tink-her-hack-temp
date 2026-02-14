"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function ReceiverPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [accepted, setAccepted] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(true);
  const [confession, setConfession] = useState<string | null>(null);
  const [senderProfile, setSenderProfile] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [replySent, setReplySent] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      setError("Invalid or missing token.");
      setLoading(false);
      return;
    }

    fetch(`/api/get-confession?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error("Invalid link");
        return res.json();
      })
      .then((data) => {
        setConfession(data.confessionText);
        setSenderProfile(data.senderProfile);
        setLoading(false);
      })
      .catch(() => {
        setError("This confession link is invalid or expired.");
        setLoading(false);
      });
  }, [token]);

  const sendResponse = async (status: "accepted" | "rejected") => {
    await fetch("/api/respond-confession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        status,
        receiverReply: "",
      }),
    });

    setAccepted(status === "accepted");
  };

  const sendReply = async () => {
    if (!reply.trim()) return alert("Please write a reply first.");

    try {
      const res = await fetch("/api/respond-confession", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          status: "accepted",
          receiverReply: reply,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setReplySent(true);
        alert("Reply sent successfully! 💬");
      } else {
        console.error("Reply error:", data);
        alert(`Failed to send reply: ${data.error || "Unknown error"}`);
      }
    } catch (err) {
      console.error("Reply fetch error:", err);
      alert("Failed to send reply: " + (err instanceof Error ? err.message : String(err)));
    }
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
            <span onClick={() => router.push("/about")}>About</span>
          </nav>
        </header>

        {/* CONTENT */}
        <section style={styles.content}>
          <h2 style={{ textAlign: "center" }}>Open Confession</h2>

          {loading && <p>Loading confession...</p>}
          {error && <p style={{ color: "#e63946" }}>{error}</p>}

          {!loading && !error && accepted === null && (
            <div style={styles.card}>
              <p style={styles.confession}>
                “Someone has sent you a hidden message. Accept to reveal it.”
              </p>
              <div style={styles.actions}>
                <button style={styles.accept} onClick={() => sendResponse("accepted")}>
                  Accept ❤️
                </button>
                <button style={styles.reject} onClick={() => sendResponse("rejected")}>
                  Reject 💔
                </button>
              </div>
            </div>
          )}

          {accepted === true && confession && senderProfile && (
            <>
              <div style={styles.card}>
                <p style={styles.confession}>“{confession}”</p>
              </div>

              <div style={styles.profileCard}>
                <h3>Sender Profile</h3>
                <img src={senderProfile.photo} alt="Sender" style={styles.avatar} />
                <p><b>Name:</b> {senderProfile.name}</p>
                <p><b>Bio:</b> {senderProfile.bio}</p>
                <p><b>Contact:</b> {senderProfile.contact || "Hidden"}</p>
              </div>

              {!replySent ? (
                <div style={styles.card}>
                  <h3>Send Reply</h3>
                  <textarea
                    placeholder="Type your reply..."
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    style={styles.textarea}
                  />
                  <button style={styles.accept} onClick={sendReply}>
                    Send Reply 💌
                  </button>
                </div>
              ) : (
                <p style={{ color: "#2ecc71", textAlign: "center" }}>
                  Reply sent successfully ✅
                </p>
              )}
            </>
          )}

          {accepted === false && (
            <div style={styles.card}>
              <p>It's okay 💙 Thanks for your time.</p>
            </div>
          )}
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
  card: {
    background: "rgba(26,26,26,0.9)",
    padding: "1.2rem",
    borderRadius: 12,
    backdropFilter: "blur(4px)",
  },
  confession: {
    fontStyle: "italic",
    fontSize: "1.05rem",
    marginBottom: "1rem",
    lineHeight: 1.5,
  },
  actions: {
    display: "flex",
    gap: "1rem",
  },
  accept: {
    padding: "0.7rem 1.1rem",
    borderRadius: 8,
    border: "none",
    background: "#e63946",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  reject: {
    padding: "0.7rem 1.1rem",
    borderRadius: 8,
    border: "none",
    background: "#444",
    color: "white",
    cursor: "pointer",
  },
  profileCard: {
    background: "rgba(26,26,26,0.9)",
    padding: "1.2rem",
    borderRadius: 12,
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    maxWidth: 320,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
    marginBottom: "0.5rem",
  },
  textarea: {
    padding: "0.8rem",
    borderRadius: "8px",
    border: "none",
    minHeight: 90,
    outline: "none",
    width: "100%",
    marginBottom: "0.5rem",
  },
  footer: {
    padding: "1rem",
    backgroundColor: "rgba(0,0,0,0.6)",
    textAlign: "center",
    color: "#ddd",
    fontSize: "0.9rem",
  },
};
