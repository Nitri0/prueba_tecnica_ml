import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, MapPin, Menu, ChevronRight } from 'lucide-react';
import MLLogo from '../atoms/MLLogo';
import MLSearchBar from '../molecules/MLSearchBar';

interface MLHeaderProps {
  onSearch?: (query: string) => void;
  cartItemsCount?: number;
}

export const MLHeader: React.FC<MLHeaderProps> = ({ onSearch, cartItemsCount = 0 }) => {
  return (
    <header className="w-full bg-ml-yellow">
      {/* Barra principal */}
      <div className="py-3 ml-container">
        <div className="flex items-center gap-2 lg:gap-8">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <MLLogo size="sm" className="text-ml-gray-dark" />
          </Link>

          {/* Barra de búsqueda */}
          <MLSearchBar onSearch={onSearch} />

          {/* Menú hamburguesa - Solo mobile */}
          <button className="flex-shrink-0 p-2 transition-colors rounded lg:hidden hover:bg-black/5">
            <Menu className="w-6 h-6 text-ml-gray-dark" />
          </button>

          {/* Carrito - Solo mobile */}
          <Link
            to="/cart"
            className="relative flex-shrink-0 p-2 transition-colors rounded lg:hidden hover:bg-black/5"
          >
            <ShoppingCart className="w-6 h-6 text-ml-gray-dark" />
            {cartItemsCount > 0 && (
              <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                {cartItemsCount > 9 ? '9+' : cartItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Barra de ubicación - Solo mobile */}
      <div className="border-t lg:hidden bg-ml-yellow border-black/20">
        <button className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-black/5 transition-colors">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-ml-gray-dark" />
            <span className="text-sm font-normal text-ml-gray-dark">Ingresa tu ubicación</span>
          </div>
          <ChevronRight className="w-4 h-4 text-ml-gray-dark" />
        </button>
      </div>

      {/* Barra de navegación - Oculta en mobile */}
      <div className="hidden bg-ml-yellow lg:block">
        <div className="py-2 ml-container">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Ubicación */}
              <button className="flex items-center gap-2 px-2 py-1 text-xs transition-colors rounded hover:bg-black/5">
                <MapPin className="w-4 h-4 text-ml-gray-dark" />
                <div className="flex flex-col items-start">
                  <span className="text-ml-gray-dark/60 text-[10px]">Ingresa tu</span>
                  <span className="text-xs font-semibold text-ml-gray-dark">ubicación</span>
                </div>
              </button>

              {/* Navegación principal */}
              <nav className="flex items-center gap-6 text-sm">
                <Link to="/categories" className="flex items-center gap-1 text-ml-gray-dark hover:text-ml-blue">
                  Categorías
                </Link>
                <Link to="/offers" className="text-ml-gray-dark hover:text-ml-blue">
                  Ofertas
                </Link>
                <Link to="/coupons" className="text-ml-gray-dark hover:text-ml-blue">
                  Cupones
                </Link>
                <Link to="/supermarket" className="flex items-center gap-1 text-ml-gray-dark hover:text-ml-blue">
                  Supermercado
                  <span className="bg-ml-blue text-white text-[10px] font-bold px-1.5 py-0.5 rounded">NUEVO</span>
                </Link>
                <Link to="/fashion" className="text-ml-gray-dark hover:text-ml-blue">
                  Moda
                </Link>
                <Link to="/play" className="flex items-center gap-1 text-ml-gray-dark hover:text-ml-blue">
                  Mercado Play
                  <span className="bg-ml-green text-white text-[10px] font-bold px-1.5 py-0.5 rounded">GRATIS</span>
                </Link>
                <Link to="/sell" className="text-ml-gray-dark hover:text-ml-blue">
                  Vender
                </Link>
                <Link to="/help" className="text-ml-gray-dark hover:text-ml-blue">
                  Ayuda
                </Link>
              </nav>
            </div>

            {/* Sección derecha: cuenta y carrito */}
            <div className="flex items-center gap-6 text-sm">
              <Link to="/register" className="text-ml-gray-dark hover:text-ml-blue">
                Crea tu cuenta
              </Link>
              <Link to="/login" className="text-ml-gray-dark hover:text-ml-blue">
                Ingresa
              </Link>
              <Link to="/purchases" className="text-ml-gray-dark hover:text-ml-blue">
                Mis compras
              </Link>
              <Link to="/cart" className="relative p-1">
                <ShoppingCart className="w-6 h-6 text-ml-gray-dark" />
                {cartItemsCount > 0 && (
                  <span className="absolute flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full -top-1 -right-1">
                    {cartItemsCount > 9 ? '9+' : cartItemsCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MLHeader;
