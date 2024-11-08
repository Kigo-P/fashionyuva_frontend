import { useState } from 'react';

function UpdateProductForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: 0,
    size: '',
    color: '',
    material: '',
    quantity: '',
    category: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 pt-8 p-8 rounded-lg bg-white mt-12">
      <h2 className="text-2xl font-bold text-center mb-6">Update Product</h2>
      <form onSubmit={handleSubmit} className="space-y-8"> {/* Increased space between form elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Increased gap */}
          <div className="space-y-3"> {/* Increased space between label and input */}
            <label htmlFor="title" className="block font-xl  text-black">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Product title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="price" className="block font-medium text-gray-900">Price</label>
            <input
              type="number"
              id="price"
              placeholder="0.00"
              value={formData.price}
              onChange={(e) => handleChange('price', Number(e.target.value))}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="size" className="block font-medium text-gray-900">Size</label>
            <select
              id="size"
              onChange={(e) => handleChange('size', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="space-y-3">
            <label htmlFor="color" className="block font-medium text-gray-900">Color</label>
            <input
              type="text"
              id="color"
              placeholder="Product color"
              value={formData.color}
              onChange={(e) => handleChange('color', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="material" className="block font-medium text-gray-900">Material</label>
            <input
              type="text"
              id="material"
              placeholder="Product material"
              value={formData.material}
              onChange={(e) => handleChange('material', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="quantity" className="block font-medium text-gray-900">Quantity</label>
            <input
              type="number"
              id="quantity"
              placeholder="Available quantity"
              value={formData.quantity}
              onChange={(e) => handleChange('quantity', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="space-y-3 md:col-span-2">
            <label htmlFor="category" className="block font-medium text-gray-900">Category</label>
            <select
              id="category"
              onChange={(e) => handleChange('category', e.target.value)}
              className="w-full border-gray-300 rounded-lg py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="" disabled>Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="children">Children</option>
            </select>
          </div>

          <div className="space-y-3 md:col-span-2">
            <label htmlFor="description" className="block font-medium text-gray-900">Description</label>
            <textarea
              id="description"
              placeholder="Product description"
              className="w-full border-gray-300 rounded-lg py-3 px-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
            />
          </div>
        </div>

        {/* Center the button in the middle with more spacing */}
        <div className="flex justify-center pt-8">
          <button 
            type="submit" 
            className="bg-[#050303] hover:bg-[#a7a7a7] text-white px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Update Product
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProductForm;
