import React from 'react';
import { CreditCard, Wallet, Building2 } from 'lucide-react';

export type PaymentMethod =
  | 'credit-card'
  | 'debit-card'
  | 'mercado-pago'
  | 'bank-transfer'
  | 'cash'
  | 'visa'
  | 'mastercard'
  | 'amex';

interface PaymentIconProps {
  method: PaymentMethod;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export const PaymentIcon: React.FC<PaymentIconProps> = ({
  method,
  size = 'md',
  className = '',
}) => {
  const iconSize = sizeClasses[size];

  const renderIcon = () => {
    switch (method) {
      case 'credit-card':
      case 'debit-card':
      case 'visa':
      case 'mastercard':
      case 'amex':
        return <CreditCard className={`${iconSize} text-ml-gray-dark`} />;
      case 'mercado-pago':
        return <Wallet className={`${iconSize} text-ml-blue`} />;
      case 'bank-transfer':
        return <Building2 className={`${iconSize} text-ml-gray-dark`} />;
      default:
        return <CreditCard className={`${iconSize} text-ml-gray-dark`} />;
    }
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {renderIcon()}
    </div>
  );
};

export default PaymentIcon;
