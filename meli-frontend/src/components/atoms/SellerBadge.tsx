import React from 'react';
import { Award } from 'lucide-react';

interface SellerBadgeProps {
  level?: 'platinum' | 'gold' | 'silver' | 'bronze';
  className?: string;
}

const badgeConfig = {
  platinum: {
    text: 'MercadoLíder Platinum',
    color: 'text-purple-600',
    bg: 'bg-purple-50',
    border: 'border-purple-200',
  },
  gold: {
    text: 'MercadoLíder Gold',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  silver: {
    text: 'MercadoLíder',
    color: 'text-gray-600',
    bg: 'bg-gray-50',
    border: 'border-gray-200',
  },
  bronze: {
    text: 'MercadoLíder',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
};

export const SellerBadge: React.FC<SellerBadgeProps> = ({ level = 'gold', className = '' }) => {
  const config = badgeConfig[level];

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border ${config.bg} ${config.border} ${className}`}
    >
      <Award className={`w-4 h-4 ${config.color}`} />
      <span className={`text-xs font-semibold ${config.color}`}>
        {config.text}
      </span>
    </div>
  );
};

export default SellerBadge;
