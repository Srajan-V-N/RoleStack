import { Card } from '@/components/ui';

const solved = 12;
const goal = 20;
const percent = (solved / goal) * 100;

const days = [
  { label: 'M', active: true },
  { label: 'T', active: true },
  { label: 'W', active: true },
  { label: 'T', active: false },
  { label: 'F', active: true },
  { label: 'S', active: false },
  { label: 'S', active: false },
];

export function WeeklyGoals() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Weekly Goals
      </h3>
      <p className="mb-2 text-sm text-gray-600">
        Problems Solved:{' '}
        <span className="font-semibold text-gray-900">
          {solved}/{goal}
        </span>{' '}
        this week
      </p>
      <div className="mb-4 h-2 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between">
        {days.map((day, i) => (
          <div
            key={i}
            className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium ${
              day.active
                ? 'bg-primary text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            {day.label}
          </div>
        ))}
      </div>
    </Card>
  );
}
