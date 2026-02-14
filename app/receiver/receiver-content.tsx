'use client';
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function ReceiverContent() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  const [accepted, setAccepted] = useState<null | boolean>(null);
  const [loading, setLoading] = useState(true);
  const [confession, setConfession] = useState<string | null>(null);
  const [senderProfile, setSenderProfile] = useState<any>(null);
  const [reply, setReply] = useState('');
  const [replySent, setReplySent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setError('Invalid or missing token.');
      setLoading(false);
      return;
    }

    fetch(`/api/get-confession?token=${token}`)
      .then((res) => {
        if (!res.ok) throw new Error('Invalid link');
        return res.json();
      })
      .then((data) => {
        setConfession(data.confessionText);
        setSenderProfile(data.senderProfile);
        setLoading(false);
      })
      .catch(() => {
        setError('This confession link is invalid or expired.');
        setLoading(false);
      });
  }, [token]);

  const sendResponse = async (status: 'accepted' | 'rejected') => {
    await fetch('/api/respond-confession', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token,
        status,
        receiverReply: '',
      }),
    });
    setReplySent(true);
  };

  if (loading) {
    return (
      <main style={styles.container}>
        <div style={styles.overlay}>
          <section style={styles.content}>
            <p>Loading...</p>
          </section>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main style={styles.container}>
        <div style={styles.overlay}>
          <section style={styles.content}>
            <p style={{ color: '#e63946' }}>{error}</p>
            <button onClick={() => router.push('/')} style={styles.button}>
              Go Home
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (replySent) {
    return (
      <main style={styles.container}>
        <div style={styles.overlay}>
          <section style={styles.content}>
            <h2>✨ Thank You!</h2>
            <p>Your response has been recorded.</p>
            <button onClick={() => router.push('/home')} style={styles.button}>
              Go Back
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main style={styles.container}>
      <div style={styles.overlay}>
        <section style={styles.content}>
          <h2 style={styles.title}>💌 Anonymous Confession</h2>

          {senderProfile && (
            <div style={styles.profileCard}>
              <img src={senderProfile.photo} alt="Sender" style={styles.avatar} />
              <h3>{senderProfile.name}</h3>
              <p style={styles.bio}>{senderProfile.bio}</p>
            </div>
          )}

          <div style={styles.confessionBox}>
            <p>{confession}</p>
          </div>

          <textarea
            placeholder="(Optional) Reply to this confession..."
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            style={styles.textarea}
          />

          <div style={styles.buttons}>
            <button
              onClick={() => sendResponse('rejected')}
              style={{ ...styles.button, backgroundColor: '#e63946' }}
            >
              Reject 💔
            </button>
            <button
              onClick={() => sendResponse('accepted')}
              style={{ ...styles.button, backgroundColor: '#2ecc71' }}
            >
              Accept ❤️
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#111',
    color: '#fff',
    position: 'relative',
  },
  overlay: {
    position: 'relative',
    zIndex: 1,
    padding: '2rem',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    paddingTop: '2rem',
  },
  title: {
    textAlign: 'center',
    fontSize: '2rem',
    marginBottom: '2rem',
  },
  profileCard: {
    textAlign: 'center',
    marginBottom: '2rem',
    padding: '1rem',
    borderRadius: '8px',
    backgroundColor: '#222',
  },
  avatar: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    marginBottom: '1rem',
  },
  bio: {
    color: '#aaa',
    fontSize: '0.9rem',
    marginTop: '0.5rem',
  },
  confessionBox: {
    padding: '1.5rem',
    backgroundColor: '#1a1a1a',
    borderLeft: '4px solid #e63946',
    borderRadius: '8px',
    marginBottom: '2rem',
    lineHeight: '1.6',
  },
  textarea: {
    width: '100%',
    padding: '1rem',
    backgroundColor: '#222',
    border: '1px solid #444',
    borderRadius: '8px',
    color: '#fff',
    marginBottom: '2rem',
    minHeight: '100px',
    fontFamily: 'inherit',
  },
  buttons: {
    display: 'flex',
    gap: '1rem',
    justifyContent: 'center',
  },
  button: {
    padding: '0.8rem 1.5rem',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 'bold',
    color: '#fff',
  },
};
