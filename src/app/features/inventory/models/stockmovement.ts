export interface StockMovement {
    id?: number;
    productId: number;
    userId: number;
    type: 'ENTREE' | 'SORTIE';
    quantity: number;
    date?: string;
    groupId: number;
  }