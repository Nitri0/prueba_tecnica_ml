import React, { useState } from 'react';
import { CreditCard, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '../atoms/ui/dialog';
import { getImageUrl } from '../../utils/imageUrl';

export interface PaymentMethod {
  id: string;
  name: string;
  imageUrl: string;
  type: 'credit' | 'debit' | 'cash';
}

interface PaymentMethodsProps {
  maxInstallments: number;
  paymentMethods: PaymentMethod[];
  className?: string;
}

// Componente para renderizar logos de tarjetas
const PaymentLogo: React.FC<{ method: PaymentMethod; small?: boolean }> = ({ method, small = false }) => {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={`${small ? 'h-5' : 'h-8'} flex items-center justify-center bg-white`}>
        <img
          src={getImageUrl(method.imageUrl)}
          alt={method.name}
          className="max-h-full object-contain"
        />
      </div>
    </div>
  );
};

export const PaymentMethods: React.FC<PaymentMethodsProps> = ({
  maxInstallments,
  paymentMethods,
  className = '',
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const creditMethods = paymentMethods.filter(m => m.type === 'credit');
  const debitMethods = paymentMethods.filter(m => m.type === 'debit');
  const cashMethods = paymentMethods.filter(m => m.type === 'cash');

  return (
    <>
      <div className={`bg-white lg:rounded-lg border-t border-ml-gray-border lg:border lg:border-ml-gray-border p-4 lg:p-6 ${className}`}>
        <h3 className="text-lg lg:text-xl font-normal text-ml-gray-dark mb-4">Medios de pago</h3>

        {/* Banner de cuotas sin interés - Versión mobile simple */}
        <div className="lg:hidden mb-4">
          <div className="flex items-center gap-2 text-ml-green">
            <CreditCard className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm font-normal">
              ¡Paga en hasta {maxInstallments} cuotas sin interés!
            </span>
          </div>
        </div>

        {/* Banner de cuotas sin interés - Versión desktop con fondo */}
        <div className="hidden lg:block bg-ml-green rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 text-white">
            <CreditCard className="w-5 h-5" />
            <span className="text-xs">
              ¡Paga en hasta {maxInstallments} cuotas sin interés!
            </span>
          </div>
        </div>

        {/* Mobile: Todos los métodos en una sola fila */}
        <div className="lg:hidden mb-4">
          <div className="grid grid-cols-3 gap-2">
            {paymentMethods.slice(0, 6).map((method) => (
              <div
                key={method.id}
                className="border border-ml-gray-border rounded-lg p-2 flex items-center justify-center bg-white"
              >
                <PaymentLogo method={method} small />
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Métodos agrupados por categoría */}
        <div className="hidden lg:block">
          {/* Cuotas sin Tarjeta */}
          {cashMethods.length > 0 && (
            <div className="mb-6">
              <h4 className="text-base text-ml-gray-dark mb-3">Cuotas sin Tarjeta</h4>
              <div className="flex gap-3">
                {cashMethods.map((method) => (
                  <PaymentLogo key={method.id} method={method} />
                ))}
              </div>
            </div>
          )}

          {/* Tarjetas de crédito */}
          {creditMethods.length > 0 && (
            <div className="mb-6">
              <h4 className="text-base text-ml-gray-dark mb-3">Tarjetas de crédito</h4>
              <div className="flex gap-3">
                {creditMethods.map((method) => (
                  <PaymentLogo key={method.id} method={method} />
                ))}
              </div>
            </div>
          )}

          {/* Tarjetas de débito */}
          {debitMethods.length > 0 && (
            <div className="mb-6">
              <h4 className="text-base text-ml-gray-dark mb-3">Tarjetas de débito</h4>
              <div className="flex gap-3">
                {debitMethods.map((method) => (
                  <PaymentLogo key={method.id} method={method} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Link conoce otros medios - Mobile: botón con flecha */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="lg:hidden w-full flex items-center justify-between text-ml-blue text-sm font-normal hover:underline border border-ml-gray-border rounded-lg p-4"
        >
          <span>Ver más medios de pago</span>
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Link conoce otros medios - Desktop: link simple */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="hidden lg:block text-ml-blue text-xs font-normal hover:underline"
        >
          Conoce otros medios de pago
        </button>
      </div>

      {/* Modal con detalle de medios de pago */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">Medios de pago para este producto</DialogTitle>
          <DialogDescription className="sr-only">
            Información detallada sobre los métodos de pago disponibles
          </DialogDescription>

          <div className="p-6">
            {/* Header del modal */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-normal text-ml-gray-dark">
                Medios de pago para este producto
              </h2>
            </div>

            {/* Mercado Pago */}
            <div className="flex gap-4 mb-6 pb-6 border-b border-ml-gray-border">
              <div className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-ml-blue/10 rounded-full text-4xl">
                <div className="flex flex-col items-center gap-1">
                  <div className="h-16 w-16 flex items-center justify-center bg-white">
                    <img
                      src={"https://cdn.brandfetch.io/idVIjDKqnh/w/180/h/180/theme/dark/logo.png?c=1bxid64Mup7aczewSAYMX&t=1682483466804"}
                      alt={"Mercado Pago"}
                      className="max-h-full object-contain"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p className="text-sm text-ml-gray-dark">
                  Pagar con <span className="font-semibold">Mercado Pago</span> es elegir cualquiera de estos medios.
                  Es rápido, seguro y no tiene costo adicional.
                </p>
              </div>
            </div>

            {/* Tarjetas de crédito */}
            <div className="mb-6 pb-6 border-b border-ml-gray-border">
              <h3 className="text-lg font-semibold text-ml-gray-dark mb-2">Tarjetas de crédito</h3>
              <p className="text-sm text-ml-gray-medium mb-3">Acreditación instantánea.</p>

              <div className="bg-ml-gray-light/50 rounded-lg p-4 mb-4">
                <p className="text-sm mb-2">
                  <span className="text-ml-green font-semibold">Hasta {maxInstallments} cuotas sin interés</span> con estas tarjetas
                </p>
                <p className="text-xs text-ml-gray-medium">Con todos los bancos.</p>
              </div>

              <div className="flex gap-6 mb-3">
                {creditMethods.map((method) => (
                  <div key={method.id} className="flex flex-col items-center">
                    <PaymentLogo method={method} />
                    <span className="text-xs text-ml-green font-medium mt-2">{maxInstallments} cuotas</span>
                  </div>
                ))}
              </div>

              <a href="#" className="text-ml-blue text-sm hover:underline">
                Ver condiciones
              </a>
            </div>

            {/* Dinero en cuenta de Mercado Pago */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-ml-gray-dark mb-2">
                Dinero en tu cuenta de Mercado Pago
              </h3>
              <p className="text-sm text-ml-gray-dark mb-3">
                Al finalizar tu compra, pagas con el dinero disponible en tu cuenta.
                Puedes ingresar dinero a Mercado Pago con tu tarjeta de crédito o por transferencia bancaria.
              </p>
              <p className="text-sm text-ml-gray-medium mb-4">Acreditación instantánea.</p>

              <div className="flex items-center gap-3 mb-4">
                <div className="h-16 flex items-center justify-center text-4xl">
                  <PaymentLogo method={paymentMethods.find(m => m.id === 'mercadopago')!} />
                </div>
              </div>

              <a href="#" className="text-ml-blue text-sm hover:underline">
                Conoce más
              </a>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentMethods;
