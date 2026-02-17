import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card } from '@/components/ui';

const data = [
  { skill: 'DSA', value: 75 },
  { skill: 'System Design', value: 60 },
  { skill: 'Communication', value: 80 },
  { skill: 'Resume', value: 85 },
  { skill: 'Aptitude', value: 70 },
];

export function SkillBreakdown() {
  return (
    <Card>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        Skill Breakdown
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
            <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
            <Radar
              dataKey="value"
              stroke="var(--color-primary)"
              fill="var(--color-primary)"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
