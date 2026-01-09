// Use environment variable for backend URL
// After deploying backend, set this in Vercel client project settings
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Mock data for fallback when backend is unavailable
const MOCK_PRODUCTS = [
  {
    _id: '1',
    id: '1',
    name: 'Premium Wireless Headphones',
    title: 'Premium Wireless Headphones',
    price: 199.99,
    image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    brand: 'AudioTech',
    category: 'electronics',
    countInStock: 50,
    description: 'High-quality wireless headphones with noise cancellation'
  },
  {
    _id: '2',
    id: '2',
    name: 'Smart Fitness Watch',
    title: 'Smart Fitness Watch',
    price: 149.99,
    image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879._SX._UX._SY._UY_.jpg',
    brand: 'FitGear',
    category: 'electronics',
    countInStock: 30,
    description: 'Track your health and fitness goals with this smart watch'
  },
  {
    _id: '3',
    id: '3',
    name: 'Designer Leather Jacket',
    title: 'Designer Leather Jacket',
    price: 299.99,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    brand: 'FashionPro',
    category: 'fashion',
    countInStock: 20,
    description: 'Classic leather jacket for the modern fashionista'
  },
  {
    _id: '4',
    id: '4',
    name: 'Professional Camera Lens',
    title: 'Professional Camera Lens',
    price: 599.99,
    image: 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg',
    brand: 'PhotoPro',
    category: 'electronics',
    countInStock: 15,
    description: 'Capture stunning photos with this professional lens'
  },
  {
    _id: '5',
    id: '5',
    name: 'Organic Face Cream',
    title: 'Organic Face Cream',
    price: 49.99,
    image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
    brand: 'NaturalGlow',
    category: 'beauty',
    countInStock: 100,
    description: 'Nourish your skin with our organic face cream'
  }
];

let mockProducts = [...MOCK_PRODUCTS];

const fetchData = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `HTTP error! status: ${response.status}` }));
      throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Helper to check if we should use mock data
const shouldUseMockData = () => {
  const isLocalhost = API_BASE_URL.includes('localhost');
  const useMock = process.env.REACT_APP_USE_MOCK === 'true' || isLocalhost;
  return useMock;
};

export const getAllProducts = async () => {
  if (shouldUseMockData()) {
    return mockProducts;
  }
  return await fetchData('/api/products');
};

export const getProductById = async (id) => {
  if (shouldUseMockData()) {
    const product = mockProducts.find(p => p._id === id || p.id === id);
    if (product) return product;
    throw new Error('Product not found');
  }
  return await fetchData(`/api/products/${id}`);
};

export const getProductsByCategory = async (category) => {
  if (shouldUseMockData()) {
    return mockProducts.filter(p => p.category === category);
  }
  return await fetchData(`/api/products/category/${category}`);
};

export const getCategories = async () => {
  if (shouldUseMockData()) {
    const categories = [...new Set(mockProducts.map(p => p.category))];
    return categories;
  }
  return await fetchData('/api/products/categories');
};

export const getLimitedProducts = async (limit = 10) => {
  if (shouldUseMockData()) {
    return mockProducts.slice(0, limit);
  }
  return await fetchData(`/api/products?limit=${limit}`);
};

export const getSortedProducts = async (sort = 'asc') => {
  if (shouldUseMockData()) {
    const sorted = [...mockProducts].sort((a, b) => 
      sort === 'asc' ? a.price - b.price : b.price - a.price
    );
    return sorted;
  }
  return await fetchData(`/api/products?sort=${sort}`);
};

// Product CRUD operations (for ProductUpdate page)
export const createProduct = async (productData) => {
  if (shouldUseMockData()) {
    const newProduct = {
      _id: Date.now().toString(),
      id: Date.now().toString(),
      ...productData,
      createdAt: new Date().toISOString()
    };
    mockProducts = [newProduct, ...mockProducts];
    return newProduct;
  }
  return await fetchData('/api/products', {
    method: 'POST',
    body: JSON.stringify(productData),
  });
};

export const updateProduct = async (id, productData) => {
  if (shouldUseMockData()) {
    const index = mockProducts.findIndex(p => p._id === id || p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockProducts[index] = { ...mockProducts[index], ...productData };
    return mockProducts[index];
  }
  return await fetchData(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(productData),
  });
};

export const deleteProduct = async (id) => {
  if (shouldUseMockData()) {
    const index = mockProducts.findIndex(p => p._id === id || p.id === id);
    if (index === -1) throw new Error('Product not found');
    mockProducts.splice(index, 1);
    return { message: 'Product removed' };
  }
  return await fetchData(`/api/products/${id}`, {
    method: 'DELETE',
  });
};

export const loginUser = async (credentials) => {
  try {
    const data = await fetchData('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const data = await fetchData('/api/users/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    return data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};

export const createOrder = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: '#ORD-' + Date.now(),
        ...orderData,
        status: 'processing',
        createdAt: new Date().toISOString()
      });
    }, 1000);
  });
};

export const getUserOrders = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          id: '#ORD-2024-001',
          date: 'Jan 5, 2026',
          status: 'delivered',
          total: 204.38,
          items: [
            {
              id: 1,
              image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
              title: 'Product Name',
              quantity: 2,
              price: 89.99
            }
          ]
        }
      ]);
    }, 1000);
  });
};