import React, { useState, useEffect } from 'react';

function ProductForm({ onSave, productToEdit, onCancel }) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setQuantity(productToEdit.quantity);
      setPrice(productToEdit.price);
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !quantity || !price) {
      alert('Please fill in all fields.');
      return;
    }

    const productData = {
      name,
      quantity: parseInt(quantity),
      price: parseFloat(price),
    };

    if (productToEdit) productData.id = productToEdit.id;

    onSave(productData);
    setName('');
    setQuantity('');
    setPrice('');
  };

  const handleCancel = () => {
  setName('');
  setQuantity('');
  setPrice('');
  onCancel(); // resets editingProduct in App.jsx
};



return (
  <form
    onSubmit={handleSubmit}
    className={`form ${productToEdit ? 'editing' : ''}`}
  >

  <input
    type="text"
    placeholder="Product Name"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <input
    type="number"
    placeholder="Quantity"
    value={quantity}
    onChange={(e) => setQuantity(e.target.value)}
    required
    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

  <input
    type="number"
    placeholder="Price"
    value={price}
    onChange={(e) => setPrice(e.target.value)}
    required
    className="w-full max-w-sm px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
  />

    <div className="action-buttons">
      <button
        type="submit">
        {productToEdit ? 'Update Product' : 'Add Product'}
      </button>

      {productToEdit && (

        <button
          type="button"
          onClick={handleCancel}
          className="delete-button">
          Cancel
        </button>
      )}
    </div>
  </form>
);

}

export default ProductForm;