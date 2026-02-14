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

    const res = await fetch("/api/respond-confession", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token,
        status: "accepted",
        receiverReply: reply,
      }),
    });

    if (res.ok) {
      setReplySent(true);
    } else {
      alert("Failed to send reply");
    }
  };

  return (
    <main style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.logo}>VEIL</h1>
        <nav style={styles.nav}>
          <span onClick={() => router.push("/home")}>Home</span>
          <span onClick={() => router.push("/profile")}>Profile</span>
        </nav>
      </header>

      <section style={styles.content}>
        <h2>Open Confession</h2>

        {loading && <p>Loading confession...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

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
              <p style={{ color: "#2ecc71" }}>Reply sent successfully ✅</p>
            )}
          </>
        )}

        {accepted === false && (
          <div style={styles.card}>
            <p>It's okay 💙 Thanks for your time.</p>
          </div>
        )}
      </section>

      <footer style={styles.footer}>
        <p>"You choose what to reveal, and when."</p>
      </footer>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column", background: "#111", color: "white" },
  header: { padding: "1rem 2rem", display: "flex", justifyContent: "space-between", background: "#1a1a1a" },
  logo: { margin: 0, fontSize: "1.8rem" },
  nav: { display: "flex", gap: "1.2rem", fontSize: "0.9rem", cursor: "pointer" },
  content: { flex: 1, padding: "2rem", display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 520 },
  card: { padding: "1rem", borderRadius: 10, background: "#1a1a1a" },
  confession: { fontStyle: "italic", marginBottom: "1rem" },
  actions: { display: "flex", gap: "1rem" },
  accept: { padding: "0.6rem 1rem", borderRadius: 8, border: "none", background: "#2ecc71", cursor: "pointer" },
  reject: { padding: "0.6rem 1rem", borderRadius: 8, border: "none", background: "#e63946", color: "white", cursor: "pointer" },
  profileCard: { padding: "1rem", borderRadius: 10, background: "#1a1a1a", display: "flex", flexDirection: "column", gap: "0.6rem", maxWidth: 320 },
  avatar: { width: 80, height: 80, borderRadius: "50%", objectFit: "cover" },
  textarea: { padding: "0.6rem", borderRadius: 6, minHeight: 60 },
  footer: { padding: "1rem", background: "#1a1a1a", textAlign: "center", color: "#aaa" },
};
