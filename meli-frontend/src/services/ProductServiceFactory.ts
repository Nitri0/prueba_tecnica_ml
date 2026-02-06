import type { IProductService } from './IProductService';
import { MockProductService } from './implementations/MockProductService';
import { ApiProductService } from './implementations/ApiProductService';

/**
 * Tipo de servicio disponible
 */
export type ServiceType = 'mock' | 'api';

/**
 * Configuración del servicio
 */
export interface ServiceConfig {
  type: ServiceType;
  apiUrl?: string; // Solo necesario para tipo 'api'
}

/**
 * Factory para crear instancias del servicio de productos
 * Permite cambiar fácilmente entre implementaciones
 */
export class ProductServiceFactory {
  private static instance: IProductService | null = null;
  private static currentConfig: ServiceConfig | null = null;

  /**
   * Obtiene la instancia del servicio configurado
   * Usa patrón Singleton para reutilizar la misma instancia
   */
  static getInstance(config?: ServiceConfig): IProductService {
    // Si hay nueva configuración o no hay instancia, crear nueva
    if (config && (!this.instance || this.configChanged(config))) {
      this.currentConfig = config;
      this.instance = this.createService(config);
    }

    // Si no hay configuración ni instancia, usar mock por defecto
    if (!this.instance) {
      this.currentConfig = { type: 'mock' };
      this.instance = new MockProductService();
    }

    return this.instance;
  }

  /**
   * Resetea la instancia (útil para testing o cambio de configuración)
   */
  static reset(): void {
    this.instance = null;
    this.currentConfig = null;
  }

  /**
   * Crea una nueva instancia del servicio según la configuración
   */
  private static createService(config: ServiceConfig): IProductService {
    switch (config.type) {
      case 'mock':
        return new MockProductService();

      case 'api':
        return new ApiProductService(config.apiUrl);

      default:
        console.warn(`Tipo de servicio desconocido: ${config.type}, usando mock`);
        return new MockProductService();
    }
  }

  /**
   * Verifica si la configuración ha cambiado
   */
  private static configChanged(newConfig: ServiceConfig): boolean {
    if (!this.currentConfig) return true;

    return (
      this.currentConfig.type !== newConfig.type ||
      this.currentConfig.apiUrl !== newConfig.apiUrl
    );
  }

  /**
   * Obtiene la configuración actual
   */
  static getCurrentConfig(): ServiceConfig | null {
    return this.currentConfig;
  }
}

/**
 * Helper function para obtener el servicio con configuración desde variables de entorno
 */
export function getProductService(): IProductService {
  const serviceType = (import.meta.env.VITE_PRODUCT_SERVICE || 'mock') as ServiceType;
  const apiUrl = import.meta.env.VITE_API_URL;

  return ProductServiceFactory.getInstance({
    type: serviceType,
    apiUrl,
  });
}
