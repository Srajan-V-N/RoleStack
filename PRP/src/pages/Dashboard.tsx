import { OverallReadiness } from '@/components/dashboard/OverallReadiness';
import { SkillBreakdown } from '@/components/dashboard/SkillBreakdown';
import { ContinuePractice } from '@/components/dashboard/ContinuePractice';
import { WeeklyGoals } from '@/components/dashboard/WeeklyGoals';
import { UpcomingAssessments } from '@/components/dashboard/UpcomingAssessments';

export function Dashboard() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold text-gray-900">Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <OverallReadiness />
        <SkillBreakdown />
        <ContinuePractice />
        <WeeklyGoals />
        <UpcomingAssessments />
      </div>
    </div>
  );
}
