import React from 'react';
import MLHeader from '../organisms/MLHeader';

interface ProductDetailLayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  cartItemsCount?: number;
}

export const ProductDetailLayout: React.FC<ProductDetailLayoutProps> = ({
  children,
  onSearch,
  cartItemsCount,
}) => {
  return (
    <div className="min-h-screen bg-ml-gray-light">
      <MLHeader onSearch={onSearch} cartItemsCount={cartItemsCount} />
      <main className="lg:ml-container lg:py-6">
        {children}
      </main>
      <footer className="mt-12 bg-white border-t border-ml-gray-border">
        <div className="py-8 ml-container">
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ml-gray-dark">Acerca de</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Mercado Libre</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Investor relations</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Tendencias</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ml-gray-dark">Otros sitios</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Developers</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Mercado Pago</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Mercado Envíos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ml-gray-dark">Ayuda</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Comprar</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Vender</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Resolución de problemas</a></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-3 text-sm font-semibold text-ml-gray-dark">Redes sociales</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Twitter</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Facebook</a></li>
                <li><a href="#" className="text-xs text-ml-gray-medium hover:text-ml-blue">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-6 border-t border-ml-gray-border">
            <p className="text-xs text-center text-ml-gray-medium">
              Copyright © 1999-2026 MercadoLibre Chile Ltda.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ProductDetailLayout;
