import { Hero } from '@/modules/prp/components/landing/Hero';
import { Features } from '@/modules/prp/components/landing/Features';
import { Footer } from '@/modules/prp/components/landing/Footer';

export function Landing() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Features />
      <Footer />
    </div>
  );
}
