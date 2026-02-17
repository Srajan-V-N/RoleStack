import { Code2, Video, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui';

const features = [
  {
    icon: Code2,
    title: 'Practice Coding',
    description:
      'Solve curated problems across data structures, algorithms, and system design.',
  },
  {
    icon: Video,
    title: 'Video Resources',
    description:
      'Watch expert-led tutorials covering key placement topics and interview tips.',
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description:
      'Monitor your improvement with detailed analytics and performance insights.',
  },
];

export function Features() {
  return (
    <section className="bg-gray-50 px-4 py-20">
      <h2 className="text-center text-3xl font-bold text-gray-900">
        Everything You Need
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-center text-gray-600">
        A complete platform to prepare for your placement interviews.
      </p>
      <div className="mx-auto mt-12 grid max-w-5xl gap-8 sm:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary-light text-primary">
              <Icon size={24} />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              {title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
