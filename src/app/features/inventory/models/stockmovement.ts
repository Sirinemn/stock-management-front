export interface StockMovement {
    id?: number;
    productId: number;
    userId: number;
    userName: string;
    productName: string;
    type: 'ENTREE' | 'SORTIE';
    quantity: number;
    date?: string;
    groupId: number;
  }