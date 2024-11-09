export const Product = {
  id: undefined, // Optional
  title: '',
  description: '',
  price: 0,
  size: '',
  color: '',
  material: '',
  quantity: '',
  images: [],
  category_id: 1,
};

export const ProductState = {
  products: [],
  status: 'idle', // Can be 'idle', 'loading', 'succeeded', or 'failed'
  error: null, // Error as string or null
};
