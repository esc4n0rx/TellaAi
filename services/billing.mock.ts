import { PlanType } from '@/types/auth.types';

/**
 * Mock do serviço de cobrança
 * Simula assinatura sem processar pagamentos reais
 */
export class BillingMockService {
  /**
   * Simula assinatura de um plano
   */
  static async subscribe(plan: PlanType): Promise<{ success: boolean; plan: PlanType }> {
    // Simula delay de API
    await new Promise((resolve) => setTimeout(resolve, 800));

    console.log(`[BILLING MOCK] User subscribed to plan: ${plan}`);

    return {
      success: true,
      plan,
    };
  }

  /**
   * Retorna informações sobre os planos disponíveis
   */
  static getPlans() {
    return [
      {
        id: 'free',
        name: 'Free',
        title: 'Explore o básico',
        price: 'R$ 0',
        features: [
          'Acesso a personagens básicos',
          'Conversas limitadas por dia',
          'Suporte por email',
        ],
      },
      {
        id: 'pro',
        name: 'Pro',
        title: 'Acesso premium',
        price: 'R$ 9,90',
        features: [
          'Personagens premium ilimitados',
          'Vozes e cenas exclusivas',
          'Conversas ilimitadas',
        ],
      },
    ];
  }
}