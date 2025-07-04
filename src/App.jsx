import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'https://inventory-api-ulj3.onrender.com';
  

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/read.php`);
      const data = await res.json();
      console.log("📦 Fetched data:", data);
      setProducts(data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveProduct = async (product) => {
    const url = product.id ? 'update.php' : 'add.php';

    try {
      console.log("💾 Saving product:", product);
      const response = await fetch(`${API_BASE}/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const result = await response.json();
      console.log('✅ Product save response:', result);

      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      console.error('❌ Error saving product:', error);
      alert("An error occurred while saving the product.");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    console.log("🗑️ Deleting ID:", typeof id, id);

    try {
      const res = await fetch(`${API_BASE}/delet.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });

      const contentType = res.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await res.json();
        console.log('✅ Parsed JSON:', data);
      } else {
        const text = await res.text();
        throw new Error("Expected JSON but received: " + text);
      }

      fetchProducts();
    } catch (error) {
      console.error('❌ Delete error:', error);
      alert("An error occurred while deleting the product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1>📦 Inventory System</h1>

      <ProductForm
        onSave={saveProduct}
        productToEdit={editingProduct}
        onCancel={() => setEditingProduct(null)}
      />

      <input
        type="text"
        className="w-[300px] border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-4"
        placeholder="Search product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Loading + Error States */}
      {loading && <p>⏳ Loading products...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

      {/* Products Table */}
      {!loading && products.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {products
              .filter((p) =>
                p.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((p) => (
                <tr key={p.id} style={{
                  backgroundColor: editingProduct?.id === p.id ? '#eef' : 'transparent'
                }}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>₱{p.price}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => setEditingProduct(p)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => deleteProduct(p.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
