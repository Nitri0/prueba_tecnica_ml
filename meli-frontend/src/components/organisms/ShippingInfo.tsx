import React, { useState } from 'react';
import { MapPin, Truck, Calendar, ChevronRight } from 'lucide-react';
import ShippingBadge from '../atoms/ShippingBadge';

interface ShippingInfoProps {
  isFree?: boolean;
  estimatedDays?: { min: number; max: number };
  destination?: string;
  onChangeLocation?: () => void;
  className?: string;
}

export const ShippingInfo: React.FC<ShippingInfoProps> = ({
  isFree = true,
  estimatedDays = { min: 2, max: 3 },
  destination = 'Santiago',
  onChangeLocation,
  className = '',
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const formatEstimatedDate = () => {
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + estimatedDays.min);

    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + estimatedDays.max);

    const formatDate = (date: Date) => {
      const days = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
      const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
      return `${days[date.getDay()]}. ${date.getDate()} ${months[date.getMonth()]}`;
    };

    return `${formatDate(minDate)} - ${formatDate(maxDate)}`;
  };

  return (
    <div className={`bg-white rounded-lg p-6 border border-ml-gray-border ${className}`}>
      {/* Badge de envío gratis */}
      {isFree && <ShippingBadge isFree={isFree} className="mb-4" />}

      {/* Información principal */}
      <div className="space-y-4">
        {/* Destino */}
        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 text-ml-gray-dark flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-ml-gray-dark font-medium">Envío a {destination}</p>
            {onChangeLocation && (
              <button
                onClick={onChangeLocation}
                className="text-sm text-ml-blue hover:underline mt-1"
              >
                Cambiar ubicación
              </button>
            )}
          </div>
        </div>

        {/* Tiempo estimado */}
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 text-ml-gray-dark flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-ml-gray-dark font-medium">
              Llega {formatEstimatedDate()}
            </p>
            <p className="text-xs text-ml-gray-medium mt-1">
              Comprando ahora
            </p>
          </div>
        </div>

        {/* Detalles adicionales */}
        {showDetails && (
          <div className="pt-4 border-t border-ml-gray-border space-y-3">
            <div className="flex items-start gap-3">
              <Truck className="w-5 h-5 text-ml-gray-dark flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-ml-gray-dark font-medium">Retiro en correo</p>
                <p className="text-xs text-ml-gray-medium mt-1">
                  Gratis. Retira en la sucursal de correo más cercana
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Toggle detalles */}
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex items-center gap-2 text-sm text-ml-blue hover:underline font-medium"
        >
          <span>{showDetails ? 'Ver menos' : 'Ver más formas de entrega'}</span>
          <ChevronRight
            className={`w-4 h-4 transition-transform ${showDetails ? 'rotate-90' : ''}`}
          />
        </button>
      </div>

      {/* Garantía de devolución */}
      <div className="mt-6 pt-6 border-t border-ml-gray-border">
        <div className="flex items-start gap-2">
          <div className="w-8 h-8 rounded-full bg-ml-blue-light flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-ml-blue" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-ml-gray-dark">Devolución gratis</p>
            <p className="text-xs text-ml-gray-medium mt-0.5">
              Tienes 30 días desde que lo recibes
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;
