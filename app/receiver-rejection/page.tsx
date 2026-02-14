"use client";
import { useRouter } from "next/navigation";

export default function ReceiverRejectedPage() {
  const router = useRouter();

  return (
    <main style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#111", color: "#fff" }}>
      <div style={{ background: "#1a1a1a", padding: "2rem", borderRadius: 12, textAlign: "center", maxWidth: 400 }}>
        <h2>Confession Rejected 💔</h2>
        <p>You have successfully rejected this confession.</p>
        <p>This link is now permanently disabled.</p>

        <button
          onClick={() => router.push("/")}
          style={{
            marginTop: 20,
            padding: "0.6rem 1rem",
            borderRadius: 8,
            border: "none",
            background: "#e63946",
            color: "white",
            cursor: "pointer",
          }}
        >
          Go Home
        </button>
      </div>
    </main>
  );
}
