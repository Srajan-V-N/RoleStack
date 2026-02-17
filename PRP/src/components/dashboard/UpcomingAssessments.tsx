import { Calendar } from 'lucide-react';
import { Card } from '@/components/ui';

const assessments = [
  { title: 'DSA Mock Test', time: 'Tomorrow, 10:00 AM' },
  { title: 'System Design Review', time: 'Wed, 2:00 PM' },
  { title: 'HR Interview Prep', time: 'Friday, 11:00 AM' },
];

export function UpcomingAssessments() {
  return (
    <Card className="p-0">
      <h3 className="px-6 pt-6 pb-4 text-lg font-semibold text-gray-900">
        Upcoming Assessments
      </h3>
      <ul className="divide-y divide-gray-100">
        {assessments.map((item) => (
          <li key={item.title} className="flex items-center gap-4 px-6 py-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-light">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{item.title}</p>
              <p className="text-xs text-gray-500">{item.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
