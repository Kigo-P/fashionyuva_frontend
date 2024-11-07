import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const NewProductForm = () => {
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (values) => {
    const dataToSubmit = { ...values, images };

    // Add fetch logic to submit data
    fetch('/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSubmit),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Product submitted:', data);
        // Clear images after submission
        setImages([]);
        // Optionally, reset the form
        alert('Product added successfully');
      })
      .catch(error => {
        console.error('Error submitting product:', error);
        alert('Failed to add product');
      });
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Product title is required'),
    description: Yup.string().required('Product description is required'),
    price: Yup.number().min(0, 'Price must be greater than or equal to 0').required('Price is required'),
    size: Yup.string().required('Size is required'),
    color: Yup.string().required('Color is required'),
    material: Yup.string().required('Material is required'),
    quantity: Yup.number().min(0, 'Quantity must be greater than or equal to 0').required('Quantity is required'),
    category: Yup.string().required('Category is required'),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        price: 0,
        size: '',
        color: '',
        material: '',
        quantity: '',
        category: '',  
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, values }) => (
        <Form className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-[0_4px_10px_rgba(0,0,0,0.2)] pt-12 mt-6">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Add New Product</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <Field
                  type="text"
                  name="title"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="title" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <Field
                  as="textarea"
                  name="description"
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="description" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price (Ksh)</label>
                <Field
                  type="number"
                  name="price"
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="price" component="div" className="text-red-600 text-sm" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                <Field as="select" name="size" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select size</option>
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                  {/* Numeric sizes from 16 to 48 */}
                  {Array.from({ length: 33 }, (_, i) => i + 16).map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </Field>
                <ErrorMessage name="size" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
                <Field
                  type="text"
                  name="color"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="color" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Material</label>
                <Field
                  type="text"
                  name="material"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="material" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <Field
                  type="number"
                  name="quantity"
                  min="0"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <ErrorMessage name="quantity" component="div" className="text-red-600 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <Field as="select" name="category" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="">Select category</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Children">Children</option>
                </Field>
                <ErrorMessage name="category" component="div" className="text-red-600 text-sm" />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
            <div className="flex flex-wrap gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img src={image} alt={`Product ${index + 1}`} className="w-24 h-24 object-cover rounded-lg" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                <Upload size={24} className="text-gray-400" />
                <span className="text-xs text-gray-500 mt-1">Add Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  multiple
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="mt-8 w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Add Product
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default NewProductForm;