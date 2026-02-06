import { Button } from '@/components/atoms/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    to: string;
  };
  secondaryCta?: {
    label: string;
    to: string;
  };
}

export function HeroSection({ title, subtitle, primaryCta, secondaryCta }: HeroSectionProps) {
  return (
    <section className="container px-4 py-16 md:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm">
          <Sparkles className="mr-2 h-4 w-4 text-primary" />
          <span>Construido con Atomic Design</span>
        </div>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          {title}
        </h1>
        <p className="mb-8 text-lg text-muted-foreground sm:text-xl">{subtitle}</p>
        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          {primaryCta && (
            <Button asChild size="lg">
              <Link to={primaryCta.to}>
                {primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
          {secondaryCta && (
            <Button asChild variant="outline" size="lg">
              <Link to={secondaryCta.to}>{secondaryCta.label}</Link>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
