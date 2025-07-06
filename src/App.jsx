import React, { useEffect, useState } from 'react';
import ProductForm from './ProductForm';
import Login from './Login'; // ✅ Add this

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false); // add this line

  const API_BASE = 'https://inventory-api-ulj3.onrender.com';

  // ✅ Check session on load
  useEffect(() => {
    fetch(`${API_BASE}/check_session.php`, {
      credentials: "include",
    })
      .then((res) => {
        if (res.ok) setLoggedIn(true);
      })
      .catch(() => {});
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/read.php`, {
        credentials: "include", // ✅ Include session cookie
      });
      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("❌ Fetch error:", error);
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
  try {
    const res = await fetch(`${API_BASE}/logout.php`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    console.log(data.message);
    setLoggedIn(false); // 🔐 Forces re-render to show Login component
  } catch (error) {
    console.error("Logout failed", error);
  }
};


  const saveProduct = async (product) => {
    const url = product.id ? 'update.php' : 'add.php';

    try {
      const response = await fetch(`${API_BASE}/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", // ✅ Keep session
        body: JSON.stringify(product),
      });

      const result = await response.json();
      setEditingProduct(null);
      fetchProducts();
    } catch (error) {
      alert("An error occurred while saving the product.");
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`${API_BASE}/delete.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include", // ✅ Keep session
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
      alert("An error occurred while deleting the product.");
    }
  };

  useEffect(() => {
    if (loggedIn) fetchProducts();
  }, [loggedIn]);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />; //test comment
  }

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

      {loading && <p>⏳ Loading products...</p>}
      {error && <p className="text-red-500">❌ {error}</p>}

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
                <tr key={p.id} style={{ backgroundColor: editingProduct?.id === p.id ? '#eef' : 'transparent' }}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.quantity}</td>
                  <td>₱{p.price}</td>
                  <td className="action-buttons">
                    <button className="edit-button" onClick={() => setEditingProduct(p)}>Edit</button>
                    <button className="delete-button" onClick={() => deleteProduct(p.id)}>Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>

        </table>
        
      )}

    {/* ✅ Move logout here, outside the table */}
<div className="mt-auto text-center pt-6">
  <button
    className="bg-green-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded"
    onClick={logout}
  >
    🚪 Logout
  </button>
</div>

    </div>
  );
}

export default App;
