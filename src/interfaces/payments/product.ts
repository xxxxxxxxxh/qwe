export interface Product {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}
