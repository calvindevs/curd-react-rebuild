import type { Product, ProductForm, ProductResponse } from "@/types/product";
import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  timeout: 5000,
});

export async function getProducts() {
  const response = await api.get<ProductResponse>("/products");
  return response.data;
}

export async function createProduct(data: ProductForm) {
  const response = await api.post<Product>("/products", data);
  return response.data;
}

export async function updateProduct(id: number, data: ProductForm){
  const response = await api.put<Product>(`/products/${id}`, data);
  return response.data;
}