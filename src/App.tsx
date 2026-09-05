import { useEffect, useState, type FormEvent } from "react";
import type { Product, ProductForm } from "./types/product";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
} from "./services/productService";

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>({
    name: "",
    price: 0,
    stock: 0,
    description: "",
  });

  const [editingId, setEditingId] = useState<number | null>(null);

  function resetForm() {
    setForm({
      name: "",
      price: 0,
      stock: 0,
      description: "",
    });
  }

  async function handleDelete(id: number) {
    await deleteProduct(id);
    const response = await getProducts();
    setProducts(response.data);
  }

  function handleEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      stock: product.stock,
      description: product.description,
    });
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (editingId === null) {
      await createProduct(form);
    } else {
      await updateProduct(editingId, form);
    }
    const response = await getProducts();
    setProducts(response.data);
    resetForm();
    setEditingId(null);
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

        <button type="submit">
          {editingId === null ? "Add Product" : "Update Product"}
        </button>
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
              <th colSpan={2} className="px-6 py-3 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, i) => (
              <tr
                key={product.id}
                className="bg-neutral-primary border-b border-default"
              >
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
                <td className="px-4 py-2">
                  <button className="mr-3 text-yellow-500"
                    onClick={() => {
                      handleEdit(product);
                    }}
                  >
                    Edit
                  </button>
                  <button className="text-red-500"
                    onClick={() => {
                      handleDelete(product.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
