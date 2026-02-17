import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Card, Button } from '@/components/ui';
import { getHistoryWithStatus, deleteEntry } from '@/lib/storage';
import type { AnalysisEntry } from '@/lib/types';
import { Trash2 } from 'lucide-react';

export function Resources() {
  const navigate = useNavigate();
  const [history, setHistory] = useState<AnalysisEntry[]>([]);
  const [hadCorruption, setHadCorruption] = useState(false);

  useEffect(() => {
    const { entries, hadCorruption: corrupted } = getHistoryWithStatus();
    setHistory(entries);
    setHadCorruption(corrupted);
  }, []);

  function handleDelete(id: string) {
    if (!confirm('Delete this analysis entry?')) return;
    deleteEntry(id);
    setHistory((prev) => prev.filter((e) => e.id !== id));
  }

  function handleView(entry: AnalysisEntry) {
    navigate('/dashboard/assessments', { state: { entry } });
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900">Resources</h2>

      {hadCorruption && (
        <Card className="mt-4 border-amber-200 bg-amber-50">
          <p className="text-sm text-amber-700">
            One saved entry couldn't be loaded. Create a new analysis.
          </p>
        </Card>
      )}

      {history.length === 0 ? (
        <Card className="mt-6">
          <p className="text-gray-600">
            No analysis history yet. Go to{' '}
            <span className="font-medium text-primary">Assessments</span> to
            analyze a job description.
          </p>
        </Card>
      ) : (
        <div className="mt-6 space-y-3">
          {history.map((entry) => (
            <Card
              key={entry.id}
              className="flex cursor-pointer items-center justify-between transition-shadow hover:shadow-lg"
              onClick={() => handleView(entry)}
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-gray-900">
                    {entry.role || 'Untitled Role'}
                  </span>
                  {entry.company && (
                    <span className="text-sm text-gray-500">
                      @ {entry.company}
                    </span>
                  )}
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white ${
                      entry.finalScore >= 75
                        ? 'bg-green-500'
                        : entry.finalScore >= 50
                          ? 'bg-yellow-500'
                          : 'bg-red-500'
                    }`}
                  >
                    {entry.finalScore}%
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {new Date(entry.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
              </div>
              <Button
                variant="ghost"
                className="ml-4 shrink-0 text-red-500 hover:bg-red-50 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(entry.id);
                }}
              >
                <Trash2 size={18} />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
