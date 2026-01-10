const API_BASE_URL = 'https://fakestoreapi.com';

const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  return await fetchData('/products');
};

export const getProductById = async (id) => {
  return await fetchData(`/products/${id}`);
};

export const getProductsByCategory = async (category) => {
  return await fetchData(`/products/category/${category}`);
};

export const getCategories = async () => {
  return await fetchData('/products/categories');
};

export const getLimitedProducts = async (limit = 10) => {
  return await fetchData(`/products?limit=${limit}`);
};

export const getSortedProducts = async (sort = 'asc') => {
  return await fetchData(`/products?sort=${sort}`);
};

export const loginUser = async (credentials) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        email: credentials.email,
        name: 'John Doe',
        token: 'fake_jwt_token_' + Date.now()
      });
    }, 1000);
  });
};

export const registerUser = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Date.now(),
        email: userData.email,
        name: userData.name,
        token: 'fake_jwt_token_' + Date.now()
      });
    }, 1000);
  });
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