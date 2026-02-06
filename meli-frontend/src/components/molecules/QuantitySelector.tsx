import React from 'react';
import { Minus, Plus } from 'lucide-react';

interface QuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
  availableStock?: number;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  quantity,
  onChange,
  min = 1,
  max = 99,
  availableStock,
  className = '',
}) => {
  const effectiveMax = availableStock !== undefined ? Math.min(max, availableStock) : max;

  const handleDecrease = () => {
    if (quantity > min) {
      onChange(quantity - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < effectiveMax) {
      onChange(quantity + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= min && value <= effectiveMax) {
      onChange(value);
    }
  };

  return (
    <div className={className}>
      <label className="text-sm text-ml-gray-dark font-medium mb-2 block">
        Cantidad:
      </label>
      <div className="flex items-center gap-2">
        <button
          onClick={handleDecrease}
          disabled={quantity <= min}
          className="w-10 h-10 flex items-center justify-center border border-ml-gray-border rounded-md hover:bg-ml-gray-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Disminuir cantidad"
        >
          <Minus className="w-4 h-4 text-ml-gray-dark" />
        </button>

        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={effectiveMax}
          className="w-16 h-10 text-center border border-ml-gray-border rounded-md focus:outline-none focus:ring-2 focus:ring-ml-blue"
        />

        <button
          onClick={handleIncrease}
          disabled={quantity >= effectiveMax}
          className="w-10 h-10 flex items-center justify-center border border-ml-gray-border rounded-md hover:bg-ml-gray-light disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          aria-label="Aumentar cantidad"
        >
          <Plus className="w-4 h-4 text-ml-gray-dark" />
        </button>

        {availableStock !== undefined && (
          <span className="text-sm text-ml-gray-medium ml-2">
            ({availableStock} disponibles)
          </span>
        )}
      </div>
    </div>
  );
};

export default QuantitySelector;
