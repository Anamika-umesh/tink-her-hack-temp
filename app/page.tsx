"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// Prevent static generation for this dynamic page
export const dynamic = "force-dynamic";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ decode redirect safely
  const redirectParam = params.get("redirect");
  const redirect = redirectParam ? decodeURIComponent(redirectParam) : null;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("veilUsers") || "[]");

    if (isLogin) {
      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("veilCurrentUser", username);

        // ✅ redirect after login (token preserved)
        if (redirect) router.push(redirect);
        else router.push("/home");
      } else {
        alert("Invalid username or password");
      }
    } else {
      const userExists = users.find(
        (u: any) => u.username === username || u.email === email
      );

      if (userExists) {
        alert("Username or Email already exists");
        return;
      }

      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem("veilUsers", JSON.stringify(users));

      alert("Signup successful! Please login.");
      setIsLogin(true);
      setEmail("");
      setUsername("");
      setPassword("");
    }
  };

  return (
    <main style={styles.container}>
      <video autoPlay muted loop playsInline style={styles.video}>
        <source src="/wallpaper.mp4" type="video/mp4" />
      </video>

      <div style={styles.overlay} />

      <div style={styles.content}>
        <h1 style={styles.title}>VEIL</h1>
        <p style={styles.tagline}>Hidden feelings revealed by choice</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          {!isLogin && (
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          )}

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
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p style={styles.switchText}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span style={styles.switchBtn} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? " Sign Up" : " Login"}
          </span>
        </p>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0f0f1a",
    color: "white",
    position: "relative",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 0,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.65)",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 2,
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "2rem",
  },
  title: {
    fontSize: "3.5rem",
    marginBottom: "0.3rem",
    letterSpacing: "4px",
    fontWeight: "bold",
  },
  tagline: {
    fontSize: "0.9rem",
    color: "#ffb3b3",
    marginBottom: "1rem",
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
    fontSize: "0.9rem",
  },
  button: {
    padding: "0.9rem",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#e63946",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "all 0.3s ease",
  },
  switchText: {
    fontSize: "0.85rem",
    color: "#aaa",
  },
  switchBtn: {
    color: "#e63946",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "all 0.2s ease",
  },
};
