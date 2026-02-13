"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("veilUsers") || "[]");

    if (isLogin) {
      // LOGIN LOGIC
      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem("veilCurrentUser", username);
        router.push("/home");
      } else {
        alert("Invalid username or password");
      }
    } else {
      // SIGNUP LOGIC

      // Check duplicate username or email
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

      <p style={{ marginTop: "1rem", fontSize: "0.8rem" }}>
        {isLogin ? "Don't have an account?" : "Already have an account?"}
        <span
          style={{ color: "#6c5ce7", cursor: "pointer", marginLeft: "5px" }}
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Sign Up" : "Login"}
        </span>
      </p>
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
  },
  tagline: {
    fontSize: "0.9rem",
    color: "#ffb3b3",
    marginBottom: "2rem",
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
