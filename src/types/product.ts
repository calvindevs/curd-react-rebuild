export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  description: string;
}

export interface ProductResponse {
  message: string;
  data: Product[];
}

export interface ProductForm {
  name: string;
  price: number;
  stock: number;
  description: string;
}
