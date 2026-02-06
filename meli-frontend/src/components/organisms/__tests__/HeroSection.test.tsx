import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { HeroSection, HeroSectionProps } from '../HeroSection';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

const defaultProps: HeroSectionProps = {
  title: 'Título de Prueba',
  subtitle: 'Subtítulo de prueba para el componente',
};

describe('HeroSection', () => {
  it('debe renderizar correctamente', () => {
    renderWithRouter(<HeroSection {...defaultProps} />);
    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
  });

  it('debe mostrar el título proporcionado', () => {
    renderWithRouter(<HeroSection {...defaultProps} />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Título de Prueba');
  });

  it('debe mostrar el subtítulo proporcionado', () => {
    renderWithRouter(<HeroSection {...defaultProps} />);
    expect(screen.getByText('Subtítulo de prueba para el componente')).toBeInTheDocument();
  });

  it('debe mostrar el badge de Atomic Design', () => {
    renderWithRouter(<HeroSection {...defaultProps} />);
    expect(screen.getByText('Construido con Atomic Design')).toBeInTheDocument();
  });

  it('debe renderizar CTA primario cuando se proporciona', () => {
    const props: HeroSectionProps = {
      ...defaultProps,
      primaryCta: {
        label: 'Empezar Ahora',
        to: '/start',
      },
    };
    renderWithRouter(<HeroSection {...props} />);
    expect(screen.getByText('Empezar Ahora')).toBeInTheDocument();
  });

  it('debe renderizar CTA secundario cuando se proporciona', () => {
    const props: HeroSectionProps = {
      ...defaultProps,
      secondaryCta: {
        label: 'Más Información',
        to: '/info',
      },
    };
    renderWithRouter(<HeroSection {...props} />);
    expect(screen.getByText('Más Información')).toBeInTheDocument();
  });

  it('debe renderizar ambos CTAs cuando se proporcionan', () => {
    const props: HeroSectionProps = {
      ...defaultProps,
      primaryCta: {
        label: 'Empezar Ahora',
        to: '/start',
      },
      secondaryCta: {
        label: 'Más Información',
        to: '/info',
      },
    };
    renderWithRouter(<HeroSection {...props} />);
    expect(screen.getByText('Empezar Ahora')).toBeInTheDocument();
    expect(screen.getByText('Más Información')).toBeInTheDocument();
  });

  it('debe tener enlaces correctos en los CTAs', () => {
    const props: HeroSectionProps = {
      ...defaultProps,
      primaryCta: {
        label: 'Empezar Ahora',
        to: '/start',
      },
      secondaryCta: {
        label: 'Más Información',
        to: '/info',
      },
    };
    renderWithRouter(<HeroSection {...props} />);

    const primaryLink = screen.getByText('Empezar Ahora').closest('a');
    const secondaryLink = screen.getByText('Más Información').closest('a');

    expect(primaryLink).toHaveAttribute('href', '/start');
    expect(secondaryLink).toHaveAttribute('href', '/info');
  });

  it('debe tener contenedor centrado', () => {
    const { container } = renderWithRouter(<HeroSection {...defaultProps} />);
    const innerContainer = container.querySelector('.mx-auto.max-w-3xl.text-center');
    expect(innerContainer).toBeInTheDocument();
  });

  it('debe renderizar sin CTAs', () => {
    renderWithRouter(<HeroSection {...defaultProps} />);
    expect(screen.getByText('Título de Prueba')).toBeInTheDocument();
    expect(screen.getByText('Subtítulo de prueba para el componente')).toBeInTheDocument();
  });

  it('debe tener icono de Sparkles en el badge', () => {
    const { container } = renderWithRouter(<HeroSection {...defaultProps} />);
    const sparklesIcon = container.querySelector('.inline-flex svg');
    expect(sparklesIcon).toBeInTheDocument();
  });
});
