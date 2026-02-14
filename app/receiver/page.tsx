'use client';
import { Suspense } from 'react';
import ReceiverContent from './receiver-content';

export const dynamic = 'force-dynamic';

export default function ReceiverPage() {
  return (
    <Suspense fallback={<div style={{ color: '#fff', padding: '2rem', textAlign: 'center' }}>Loading...</div>}>
      <ReceiverContent />
    </Suspense>
  );
}