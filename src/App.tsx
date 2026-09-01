import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductForm } from "./types/product";
import { createProduct, getProducts } from "./services/productService";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    await createProduct(form);
  }

  useEffect(() => {
    getProducts().then((response) => {
      setProducts(response.data);
    });
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={form.name}
          onChange={(e) => {
            setForm({
              ...form,
              name: e.target.value,
            });
          }}
        />
        <input
          type="number"
          value={form.price}
          onChange={(e) => {
            setForm({
              ...form,
              price: Number(e.target.value),
            });
          }}
        />
        <input
          type="number"
          value={form.stock}
          onChange={(e) => {
            setForm({ ...form, stock: Number(e.target.value) });
          }}
        />
        <input
          type="text"
          value={form.description}
          onChange={(e) => {
            setForm({
              ...form,
              description: e.target.value,
            });
          }}
        />

        <button type="submit">Add Product</button>
      </form>

      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
        <table className="w-full text-sm text-left rtl:text-right text-body">
          <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">
                #
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Description
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Price
              </th>
              <th scope="col" className="px-6 py-3 font-medium">
                Stock
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr className="bg-neutral-primary border-b border-default">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                >
                  {i + 1}
                </th>
                <td className="px-6 py-4">{product.name}</td>
                <td className="px-6 py-4">{product.description}</td>
                <td className="px-6 py-4">{product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
