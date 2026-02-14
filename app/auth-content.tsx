'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthContent() {
  const router = useRouter();
  const params = useSearchParams();

  // ✅ decode redirect safely
  const redirectParam = params.get('redirect');
  const redirect = redirectParam ? decodeURIComponent(redirectParam) : null;

  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('veilUsers') || '[]');

    if (isLogin) {
      const user = users.find(
        (u: any) => u.username === username && u.password === password
      );

      if (user) {
        localStorage.setItem('veilCurrentUser', username);

        // ✅ redirect after login (token preserved)
        if (redirect) router.push(redirect);
        else router.push('/home');
      } else {
        alert('Invalid username or password');
      }
    } else {
      const userExists = users.find(
        (u: any) => u.username === username || u.email === email
      );

      if (userExists) {
        alert('Username or Email already exists');
        return;
      }

      const newUser = { email, username, password };
      users.push(newUser);
      localStorage.setItem('veilUsers', JSON.stringify(users));

      alert('Signup successful! Please login.');
      setIsLogin(true);
      setEmail('');
      setUsername('');
      setPassword('');
    }
  };

  return (
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
          placeholder={isLogin ? 'Username' : 'Username'}
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
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
      </form>

      <p style={styles.toggle}>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          type="button"
          onClick={() => {
            setIsLogin(!isLogin);
            setEmail('');
            setUsername('');
            setPassword('');
          }}
          style={styles.toggleBtn}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  content: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    color: '#fff',
    textAlign: 'center',
  },
  title: {
    fontSize: '3.5rem',
    fontFamily: 'var(--font-veil-title)',
    marginBottom: '0.5rem',
    letterSpacing: '3px',
    fontWeight: 600,
  },
  tagline: {
    fontSize: '1rem',
    fontFamily: 'var(--font-veil-text)',
    marginBottom: '2rem',
    color: '#bbb',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '300px',
  },
  input: {
    padding: '0.75rem 1rem',
    fontSize: '0.95rem',
    border: '1px solid #555',
    borderRadius: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    color: '#fff',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  button: {
    padding: '0.8rem 1rem',
    fontSize: '1rem',
    fontWeight: 600,
    border: 'none',
    borderRadius: '6px',
    backgroundColor: '#e63946',
    color: '#fff',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  toggle: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#bbb',
  },
  toggleBtn: {
    background: 'none',
    border: 'none',
    color: '#e63946',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: 0,
  },
};
