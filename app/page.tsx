"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Demo login (no real authentication yet)
    if (username && password) {
      router.push("/home"); // go to next page
    }
  };

  return (
    <main style={styles.container}>
      <h1 style={styles.title}>VEIL</h1>
      <p style={styles.tagline}>Hidden feelings revealed by choice</p>

      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        <button type="submit" style={styles.button}>
          Enter
        </button>
      </form>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f0f1a",
    color: "white",
    fontFamily: "sans-serif",
  },
  title: {
    fontSize: "3.5rem",
    marginBottom: "0.3rem",
    letterSpacing: "4px",
    fontFamily: "var(--font-veil-title)",
  },
  tagline: {
    fontSize: "0.9rem",
    color: "#ffb3b3",
    marginBottom: "2rem",
    fontFamily: "var(--font-veil-text)",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "280px",
    gap: "1rem",
  },
  input: {
    padding: "0.9rem",
    borderRadius: "8px",
    border: "none",
    outline: "none",
  },
  button: {
    padding: "0.9rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#6c5ce7",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
