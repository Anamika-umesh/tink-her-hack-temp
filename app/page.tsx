import { Suspense } from 'react';
import AuthContent from './auth-content';

export const dynamic = 'force-dynamic';

export default function AuthPage() {
  return (
    <main style={styles.container}>
      <video autoPlay muted loop playsInline style={styles.video}>
        <source src="/wallpaper.mp4" type="video/mp4" />
      </video>

      <div style={styles.overlay} />

      <Suspense fallback={<div style={{ color: '#fff', zIndex: 2, position: 'relative' }}>Loading...</div>}>
        <AuthContent />
      </Suspense>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0f0f1a',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    zIndex: 1,
  },
};
