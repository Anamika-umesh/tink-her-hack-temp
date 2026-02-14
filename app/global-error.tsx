'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backgroundColor: '#111',
            color: '#fff',
          }}
        >
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#e63946' }}>
            Something went wrong
          </h1>
          <button
            onClick={() => reset()}
            style={{
              padding: '12px 24px',
              fontSize: '1rem',
              backgroundColor: '#2ecc71',
              color: '#000',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
