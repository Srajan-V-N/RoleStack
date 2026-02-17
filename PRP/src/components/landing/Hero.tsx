import { useNavigate } from 'react-router';
import { Button } from '@/components/ui';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-br from-primary to-indigo-800 px-4 py-32 text-center text-white">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Ace Your Placement
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-indigo-100">
        Practice coding, take assessments, and track your progress — everything
        you need to land your dream job.
      </p>
      <div className="mt-10">
        <Button
          variant="ghost"
          className="bg-white text-primary hover:bg-indigo-50 px-8 py-3 text-base font-semibold"
          onClick={() => navigate('/dashboard')}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
