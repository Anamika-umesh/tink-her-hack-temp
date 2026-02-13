"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ReceiverPage() {
  const params = useSearchParams();
  const token = params.get("token");

  const [accepted, setAccepted] = useState<null | boolean>(null);

  const confession = "I’ve admired you for a long time. This is my anonymous confession 💌";

  useEffect(() => {
    if (!token) {
      alert("Invalid or missing confession link");
    }
  }, [token]);

  return (
    <main style={styles.container}>
      <h1>VEIL – Receiver</h1>

      {accepted === null && (
        <div style={styles.card}>
          <p>This confession is hidden.</p>
          <button style={styles.accept} onClick={() => setAccepted(true)}>
            Accept ❤️
          </button>
          <button style={styles.reject} onClick={() => setAccepted(false)}>
            Reject 💔
          </button>
        </div>
      )}

      {accepted === true && (
        <div style={styles.card}>
          <h3>Confession</h3>
          <p>{confession}</p>
        </div>
      )}

      {accepted === false && (
        <div style={styles.card}>
          <h3>Sorry for disturbing you 🙏</h3>
          <p>The sender respects your decision.</p>
        </div>
      )}
    </main>
  );
}

const styles: any = {
  container: { minHeight: "100vh", background: "#111", color: "white", padding: "2rem" },
  card: { background: "#1a1a1a", padding: "1.5rem", borderRadius: 12, maxWidth: 400 },
  accept: { marginRight: 10, padding: "8px 16px", background: "#2ecc71", border: "none", borderRadius: 6 },
  reject: { padding: "8px 16px", background: "#e63946", border: "none", borderRadius: 6, color: "white" },
};
