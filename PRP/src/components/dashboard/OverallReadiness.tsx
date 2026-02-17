import { Card } from '@/components/ui';

const score = 72;
const radius = 70;
const circumference = 2 * Math.PI * radius;
const offset = circumference - (score / 100) * circumference;

export function OverallReadiness() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Overall Readiness
      </h3>
      <div className="flex items-center justify-center">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="12"
          />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            transform="rotate(-90 80 80)"
          />
          <text
            x="80"
            y="74"
            textAnchor="middle"
            className="fill-gray-900 text-4xl font-bold"
            fontSize="36"
            fontWeight="700"
          >
            {score}
          </text>
          <text
            x="80"
            y="98"
            textAnchor="middle"
            className="fill-gray-500"
            fontSize="12"
          >
            Readiness Score
          </text>
        </svg>
      </div>
    </Card>
  );
}
