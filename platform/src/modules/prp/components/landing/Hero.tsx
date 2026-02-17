import { useNavigate } from 'react-router';
import { Button } from '@/modules/prp/components/ui';

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="bg-accent px-4 py-32 text-center text-white">
      <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
        Ace Your Placement
      </h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
        Practice coding, take assessments, and track your progress — everything
        you need to land your dream job.
      </p>
      <div className="mt-10">
        <Button
          variant="ghost"
          className="bg-white text-accent hover:bg-accent-light px-8 py-3 text-base font-semibold"
          onClick={() => navigate('/prp/dashboard')}
        >
          Get Started
        </Button>
      </div>
    </section>
  );
}
