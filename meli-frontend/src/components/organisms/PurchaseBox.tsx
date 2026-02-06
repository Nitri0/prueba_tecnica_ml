import React, { useState } from 'react';
import { RotateCcw, ShieldCheck } from 'lucide-react';
import QuantitySelector from '../molecules/QuantitySelector';

interface PurchaseBoxProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  condition: 'new' | 'used' | 'refurbished';
  soldCount?: number;
  availableStock?: number;
  onBuy?: (quantity: number) => void;
  onAddToCart?: (quantity: number) => void;
  className?: string;
}

export const PurchaseBox: React.FC<PurchaseBoxProps> = ({
  availableStock,
  onBuy,
  onAddToCart,
  className = '',
}) => {
  const [quantity, setQuantity] = useState(1);

  // Calcular fecha de llegada
  const getDeliveryDate = () => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(today.getDate() + 3); // 3 días después

    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
    return days[deliveryDate.getDay()];
  };

  return (
    <div className={`bg-white lg:rounded-lg lg:p-5 pt-3 lg:mt-4 lg:border lg:border-ml-gray-border ${className}`}>
      {/* Mensaje de envío gratis */}
      <div className="mb-4">
        <p className="text-base font-medium text-ml-green">
          Llega gratis el {getDeliveryDate()}
        </p>
        <p className="text-xs text-ml-gray-medium mt-0.5">
          por ser tu primera compra
        </p>
        <a href="#" className="inline-block mt-1 text-xs text-ml-blue hover:underline">
          Más detalles y formas de entrega
        </a>
      </div>

      {/* Stock disponible */}
      {availableStock !== undefined && (
        <div className="mb-5">
          {availableStock > 0 ? (
            <span className="text-base font-medium text-ml-green">
              Stock disponible
            </span>
          ) : (
            <span className="text-base font-medium text-red-500">
              Sin stock
            </span>
          )}
        </div>
      )}

      {/* Selector de cantidad */}
      <QuantitySelector
        quantity={quantity}
        onChange={setQuantity}
        availableStock={availableStock}
        className="mb-5"
      />

      {/* Botones de acción */}
      <div className="mb-6 space-y-3">
        <button
          onClick={() => onBuy?.(quantity)}
          disabled={!availableStock || availableStock === 0}
          className="w-full px-6 py-3 text-base font-semibold text-white transition-colors rounded-md shadow-sm bg-ml-blue hover:bg-ml-blue-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Comprar ahora
        </button>

        <button
          onClick={() => onAddToCart?.(quantity)}
          disabled={!availableStock || availableStock === 0}
          className="w-full px-6 py-3 text-base font-semibold transition-colors rounded-md bg-ml-blue-light text-ml-blue hover:bg-ml-blue-light/80 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Agregar al carrito
        </button>
      </div>

      {/* Garantías */}
      <div className="pt-4 space-y-3 border-t border-ml-gray-border">
        {/* Devolución gratis */}
        <div className="flex items-start gap-2">
          <RotateCcw className="w-5 h-5 text-ml-blue flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-ml-blue">Devolución gratis</p>
            <p className="text-xs text-ml-gray-medium">
              Tienes 30 días desde que lo recibes
            </p>
          </div>
        </div>

        {/* Compra Protegida */}
        <div className="flex items-start gap-2">
          <ShieldCheck className="w-5 h-5 text-ml-blue flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-ml-blue">Compra Protegida</p>
            <p className="text-xs text-ml-gray-medium">
              Recibe el producto que esperabas o te devolvemos tu dinero
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseBox;
