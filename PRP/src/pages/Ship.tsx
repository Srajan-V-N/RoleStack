import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const STORAGE_KEY = 'prp-test-checklist';
const TOTAL = 10;

function allPassed(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return (
        Array.isArray(parsed) &&
        parsed.length === TOTAL &&
        parsed.every(Boolean)
      );
    }
  } catch {
    // ignore
  }
  return false;
}

export function Ship() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    setUnlocked(allPassed());
  }, []);

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-bold">Ship</h1>

      {unlocked ? (
        <>
          <Card className="border-2 border-green-400 bg-green-50 text-center">
            <div className="mb-2 text-4xl">&#10003;</div>
            <p className="text-lg font-semibold text-green-700">
              All tests passed — you're ready to ship!
            </p>
          </Card>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link to="/prp/proof">
              <Button>Submit Proof</Button>
            </Link>
            <Link to="/prp/07-test">
              <Button variant="secondary">Test Checklist</Button>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">Back to Dashboard</Button>
            </Link>
          </div>
        </>
      ) : (
        <Navigate to="/prp/07-test" replace />
      )}
    </div>
  );
}
