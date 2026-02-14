'use client';

import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        backgroundColor: '#111',
        color: '#fff',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '4rem', marginBottom: '0.5rem', color: '#e63946' }}>
        404
      </h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#ddd' }}>
        Page Not Found
      </h2>
      <p style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '500px', color: '#aaa' }}>
        The page you're looking for doesn't exist. It might have been removed or the link could be invalid.
      </p>
      <button
        onClick={() => router.push('/')}
        style={{
          padding: '12px 24px',
          fontSize: '1rem',
          backgroundColor: '#2ecc71',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        Go Home
      </button>
    </main>
  );
}
