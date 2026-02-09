import React from 'react';
import { Check, MessageSquare, Clock } from 'lucide-react';
import SellerBadge from '../atoms/SellerBadge';
import { getImageUrl } from '../../utils/imageUrl';

interface SellerCardProps {
  name: string;
  logo?: string;
  isOfficialStore?: boolean;
  followers?: number;
  totalProducts?: number;
  level?: 'platinum' | 'gold' | 'silver' | 'bronze';
  totalSales?: number;
  reputation?: {
    red: number;
    orange: number;
    yellow: number;
    green: number;
  };
  checkGoodAttention?: boolean;
  checkOnTimeDelivery?: boolean;
  reputationMessage?: string;
  goodAttention?: boolean;
  onTimeDelivery?: boolean;
  onVisitStore?: () => void;
  className?: string;
}

export const SellerCard: React.FC<SellerCardProps> = ({
  name,
  logo,
  followers = 50,
  totalProducts = 50,
  level,
  totalSales = 100,
  reputation = { red: 5, orange: 5, yellow: 10, green: 80 },
  reputationMessage = '',
  goodAttention = true,
  onTimeDelivery = true,
  onVisitStore,
  className = '',
}) => {
  const formatNumber = (num: number): string => {
    return `+${num}`;
  };

  return (
    <div className={`bg-white lg:rounded-lg overflow-hidden border-t border-ml-gray-border lg:border lg:border-ml-gray-border ${className}`}>
      <div className="p-4">
        {/* Nombre del vendedor, logo y botón seguir */}
        <div className="flex items-center gap-3 mb-3">
          {/* Logo circular */}
          {logo && (
            <div className="w-16 h-16 rounded-full border border-ml-gray-border flex-shrink-0 overflow-hidden bg-white">
              <img
                src={getImageUrl(logo)}
                alt={`Logo de ${name}`}
                className="w-full h-full object-contain p-1"
              />
            </div>
          )}

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-ml-gray-dark mb-1">{name}</h3>
              {/* Botón Seguir */}
              <button className="px-4 py-1.5 bg-ml-blue-light text-ml-blue rounded-md hover:bg-ml-blue-light/80 transition-colors text-xs font-medium flex-shrink-0">
                Seguir
              </button>
            </div>
            {/* Estadísticas: Seguidores y Productos */}
            <div className="flex items-center gap-3 text-xs text-ml-gray-medium">
              <span>
                <span className="font-semibold text-ml-gray-dark">{formatNumber(followers)}</span>
                {' '}Seguidores
              </span>
              <span>
                <span className="font-semibold text-ml-gray-dark">{formatNumber(totalProducts)}</span>
                {' '}Productos
              </span>
            </div>
          </div>


        </div>

        {/* Badge MercadoLíder */}
        <div className="mb-3">
          <SellerBadge level={level} />
          {/* Reputation Message */}
          <p className="text-xs text-ml-gray-medium mt-0.5 ml-6">
            {reputationMessage}
          </p>
        </div>

        {/* Barra de reputación */}
        <div className="mb-4">
          <div className="flex h-1.5 rounded-full overflow-hidden mb-4">
            <div
              className="bg-red-300"
              style={{ width: `${reputation.red}%` }}
            />
            <div
              className="bg-orange-200"
              style={{ width: `${reputation.orange}%` }}
            />
            <div
              className="bg-yellow-200"
              style={{ width: `${reputation.yellow}%` }}
            />
            <div
              className="bg-ml-green"
              style={{ width: `${reputation.green}%` }}
            />
          </div>

          {/* Métricas principales */}
          <div className={`grid gap-3 text-center ${
            goodAttention && onTimeDelivery ? 'grid-cols-3' :
            goodAttention || onTimeDelivery ? 'grid-cols-2' : 'grid-cols-1'
          }`}>
            {/* Ventas */}
            <div>
              <p className="text-base font-semibold text-ml-gray-dark mb-0.5">{formatNumber(totalSales)}</p>
              <p className="text-xs text-ml-gray-medium">Ventas</p>
            </div>

            {/* Buena atención */}
            {goodAttention && (
              <div>
                <div className="flex justify-center mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-ml-gray-light flex items-center justify-center relative">
                    <MessageSquare className="w-4 h-4 text-ml-gray-dark" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-ml-green rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-ml-gray-medium leading-tight">
                  Buena atención
                </p>
              </div>
            )}

            {/* Entrega a tiempo */}
            {onTimeDelivery && (
              <div>
                <div className="flex justify-center mb-1.5">
                  <div className="w-7 h-7 rounded-full bg-ml-gray-light flex items-center justify-center relative">
                    <Clock className="w-4 h-4 text-ml-gray-dark" />
                    <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-ml-green rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                    </div>
                  </div>
                </div>
                <p className="text-xs text-ml-gray-medium leading-tight">
                  Entrega a tiempo
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Botón ir a la página del vendedor */}
        <button
          onClick={onVisitStore}
          className="w-full py-2 bg-ml-blue-light text-ml-blue rounded-md hover:bg-ml-blue-light/80 transition-colors text-sm font-normal"
        >
          Ir a la página del vendedor
        </button>
      </div>
    </div>
  );
};

export default SellerCard;
