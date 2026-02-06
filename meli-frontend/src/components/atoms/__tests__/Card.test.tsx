import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card';

describe('Card', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('rounded-lg', 'border', 'bg-card');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('debe tener shadow-sm por defecto', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('shadow-sm');
  });
});

describe('CardHeader', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex', 'flex-col', 'p-6');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<CardHeader className="custom-header">Header</CardHeader>);
    expect(container.firstChild).toHaveClass('custom-header');
  });
});

describe('CardTitle', () => {
  it('debe renderizar como h3', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title.tagName).toBe('H3');
  });

  it('debe tener clases de título', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none');
  });

  it('debe aplicar className personalizado', () => {
    render(<CardTitle className="custom-title">Title</CardTitle>);
    const title = screen.getByText('Title');
    expect(title).toHaveClass('custom-title');
  });
});

describe('CardDescription', () => {
  it('debe renderizar correctamente', () => {
    render(<CardDescription>Description text</CardDescription>);
    const desc = screen.getByText('Description text');
    expect(desc).toBeInTheDocument();
    expect(desc.tagName).toBe('P');
  });

  it('debe tener clases de descripción', () => {
    render(<CardDescription>Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc).toHaveClass('text-sm', 'text-muted-foreground');
  });

  it('debe aplicar className personalizado', () => {
    render(<CardDescription className="custom-desc">Description</CardDescription>);
    const desc = screen.getByText('Description');
    expect(desc).toHaveClass('custom-desc');
  });
});

describe('CardContent', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('p-6', 'pt-0');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<CardContent className="custom-content">Content</CardContent>);
    expect(container.firstChild).toHaveClass('custom-content');
  });
});

describe('CardFooter', () => {
  it('debe renderizar correctamente', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(screen.getByText('Footer')).toBeInTheDocument();
    expect(container.firstChild).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
  });

  it('debe aplicar className personalizado', () => {
    const { container } = render(<CardFooter className="custom-footer">Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('custom-footer');
  });
});

describe('Card con todos los subcomponentes', () => {
  it('debe renderizar card completo', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card content goes here</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description')).toBeInTheDocument();
    expect(screen.getByText('Card content goes here')).toBeInTheDocument();
    expect(screen.getByText('Card footer')).toBeInTheDocument();
  });
});
