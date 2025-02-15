// src/pages/admin/ManageProducts.js
import { useState, useEffect } from 'react';
import { fetchProducts, deleteProduct } from '../../services/Api';

const ManageProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const { data } = await fetchProducts();
      setProducts(data);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Manage Products</h1>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.stockQuantity}</td>
              <td>
                <button className="mr-2">Edit</button>
                <button onClick={() => handleDelete(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageProducts;