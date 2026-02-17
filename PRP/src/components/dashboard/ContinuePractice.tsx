import { PlayCircle } from 'lucide-react';
import { Card, Button } from '@/components/ui';

const topic = 'Dynamic Programming';
const completed = 3;
const total = 10;
const percent = (completed / total) * 100;

export function ContinuePractice() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Continue Practice
      </h3>
      <p className="mb-1 text-sm font-medium text-gray-700">{topic}</p>
      <p className="mb-2 text-xs text-gray-500">
        {completed}/{total} problems completed
      </p>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <Button>
        <PlayCircle className="mr-2 h-4 w-4" />
        Continue
      </Button>
    </Card>
  );
}
