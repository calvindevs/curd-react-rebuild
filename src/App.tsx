import { useEffect, useState } from "react";
import type { Product } from "./types/product";
import { getProducts } from "./services/productService";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
    <form action="">
      <input type="text" />
    </form>
      {products.map((product, i) => (
        <div key={product.id}>
          <ul>
            <li>{i + 1}</li>
            <li>{product.name}</li>
            <li>{product.price}</li>
            <li>{product.stock}</li>
            <li>{product.description}</li>
          </ul>
        </div>
      ))}
    </>
  );
}
