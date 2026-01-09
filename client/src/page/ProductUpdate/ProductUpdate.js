import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Lock, Eye, EyeOff, Package, Save, ArrowLeft, Trash2, Plus } from 'lucide-react';
import { getAllProducts, createProduct, updateProduct, deleteProduct } from '../../services/api/api';
import './ProductUpdate.css';

// Configuration - 4 passwords, each 12 digits
const VALID_PASSWORDS = ['123456789012', '234567890123', '345678901234', '456789012345'];

const ProductUpdate = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [passwords, setPasswords] = useState(['', '', '', '']);
  const [showPasswords, setShowPasswords] = useState([false, false, false, false]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Products list state
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  // Product form state
  const [product, setProduct] = useState({
    _id: '',
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handlePasswordChange = (index, value) => {
    // Only allow digits and limit to 12 characters
    const digitValue = value.replace(/\D/g, '').slice(0, 12);
    const newPasswords = [...passwords];
    newPasswords[index] = digitValue;
    setPasswords(newPasswords);
    setError('');
  };

  const handleShowPasswordToggle = (index) => {
    const newShowPasswords = [...showPasswords];
    newShowPasswords[index] = !newShowPasswords[index];
    setShowPasswords(newShowPasswords);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Check if all password fields are filled
    if (passwords.some(p => p.length !== 12)) {
      setError('Please enter all 12 digits for each password field');
      setLoading(false);
      return;
    }

    // Simulate verification delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Verify all 4 passwords
    const isValid = passwords.every((password, index) => password === VALID_PASSWORDS[index]);

    if (isValid) {
      setAuthenticated(true);
      fetchProducts();
    } else {
      setError('Invalid passwords. Access denied.');
      setPasswords(['', '', '', '']);
    }

    setLoading(false);
  };

  // Fetch products from API
  const fetchProducts = async () => {
    try {
      setProductsLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleProductChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? value.replace(/\D/g, '') : value
    }));
    setSuccess('');
  };

  const handleEditProduct = (prod) => {
    setEditingId(prod._id);
    setProduct({
      _id: prod._id,
      title: prod.title || prod.name || '',
      price: prod.price?.toString() || '',
      description: prod.description || '',
      category: prod.category || '',
      image: prod.image || ''
    });
    setSuccess('');
    setError('');
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    
    try {
      setLoading(true);
      await deleteProduct(id);
      setSuccess('Product deleted successfully!');
      fetchProducts();
    } catch (err) {
      setError('Failed to delete product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClearForm = () => {
    setEditingId(null);
    setProduct({
      _id: '',
      title: '',
      price: '',
      description: '',
      category: '',
      image: ''
    });
    setSuccess('');
    setError('');
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');

    try {
      const productData = {
        name: product.title,
        title: product.title,
        price: parseFloat(product.price) || 0,
        description: product.description,
        category: product.category,
        image: product.image || 'https://via.placeholder.com/300'
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        setSuccess('Product updated successfully!');
      } else {
        await createProduct(productData);
        setSuccess('Product created successfully!');
      }

      fetchProducts();
      handleClearForm();
    } catch (err) {
      setError('Failed to save product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password Entry Form
  if (!authenticated) {
    return (
      <div className="product-update-page">
        <div className="product-update-container">
          <div className="auth-card">
            <div className="auth-header">
              <Package className="auth-icon" />
              <h1 className="auth-title">Product Update</h1>
              <p className="auth-subtitle">Enter the 4 passwords to access</p>
            </div>

            {error && <div className="auth-error">{error}</div>}

            <form className="password-form" onSubmit={handlePasswordSubmit}>
              <div className="passwords-container">
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="password-field-group">
                    <label className="auth-label">
                      Password {index + 1}
                      <span className="password-hint"> (12 digits)</span>
                    </label>
                    <div className="input-with-icon">
                      <Lock className="input-icon" />
                      <input
                        type={showPasswords[index] ? "text" : "password"}
                        className="auth-input password-input"
                        placeholder="Enter 12 digits"
                        value={passwords[index]}
                        onChange={(e) => handlePasswordChange(index, e.target.value)}
                        maxLength={12}
                        inputMode="numeric"
                      />
                      <button
                        type="button"
                        className="password-toggle"
                        onClick={() => handleShowPasswordToggle(index)}
                      >
                        {showPasswords[index] ? (
                          <EyeOff className="toggle-icon" />
                        ) : (
                          <Eye className="toggle-icon" />
                        )}
                      </button>
                    </div>
                    <div className="password-strength">
                      <span className={`strength-bar ${passwords[index].length > 0 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 4 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 8 ? 'active' : ''}`}></span>
                      <span className={`strength-bar ${passwords[index].length >= 12 ? 'active' : ''}`}></span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={loading || passwords.some(p => p.length !== 12)}
              >
                {loading ? 'Verifying...' : 'Access Product Update'}
              </button>
            </form>

            <div className="auth-footer">
              <Link to="/" className="auth-link">
                <ArrowLeft className="link-icon" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Product Update Form
  return (
    <div className="product-update-page">
      <div className="product-update-container">
        <div className="update-card">
          <div className="update-header">
            <Package className="update-icon" />
            <h1 className="update-title">{editingId ? 'Update Product' : 'Add New Product'}</h1>
            <p className="update-subtitle">{editingId ? 'Modify product details below' : 'Fill in the details to create a new product'}</p>
          </div>

          {success && <div className="auth-success">{success}</div>}
          {error && <div className="auth-error">{error}</div>}

          <form className="update-form" onSubmit={handleProductSubmit}>
            <div className="auth-form-group">
              <label className="auth-label">Product Title</label>
              <input
                type="text"
                name="title"
                className="auth-input"
                placeholder="Enter product title"
                value={product.title}
                onChange={handleProductChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="auth-form-group">
                <label className="auth-label">Price ($)</label>
                <input
                  type="text"
                  name="price"
                  className="auth-input"
                  placeholder="Enter price"
                  value={product.price}
                  onChange={handleProductChange}
                  required
                />
              </div>
              <div className="auth-form-group">
                <label className="auth-label">Category</label>
                <select
                  name="category"
                  className="auth-input"
                  value={product.category}
                  onChange={handleProductChange}
                >
                  <option value="">Select category</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="beauty">Beauty & Health</option>
                  <option value="sports">Sports & Outdoors</option>
                  <option value="toys">Toys & Games</option>
                  <option value="books">Books</option>
                  <option value="automotive">Automotive</option>
                </select>
              </div>
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Image URL</label>
              <input
                type="url"
                name="image"
                className="auth-input"
                placeholder="https://example.com/image.jpg"
                value={product.image}
                onChange={handleProductChange}
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label">Description</label>
              <textarea
                name="description"
                className="auth-input textarea"
                placeholder="Enter product description"
                value={product.description}
                onChange={handleProductChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              {editingId && (
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClearForm}
                >
                  Cancel Edit
                </button>
              )}
              <button
                type="submit"
                className="save-btn"
                disabled={loading || !product.title || !product.price}
              >
                {loading ? (
                  editingId ? 'Updating...' : 'Creating...'
                ) : (
                  <>
                    <Save className="btn-icon" />
                    {editingId ? 'Update Product' : 'Create Product'}
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Products List */}
          <div className="products-list-section">
            <h3 className="products-list-title">Existing Products</h3>
            
            {productsLoading ? (
              <div className="products-loading">Loading products...</div>
            ) : products.length === 0 ? (
              <div className="products-empty">No products found. Create your first product above!</div>
            ) : (
              <div className="products-grid">
                {products.map((prod) => (
                  <div key={prod._id} className="product-item">
                    <img 
                      src={prod.image || 'https://via.placeholder.com/50'} 
                      alt={prod.title}
                      className="product-item-image"
                    />
                    <div className="product-item-details">
                      <span className="product-item-title">{prod.title}</span>
                      <span className="product-item-price">${prod.price}</span>
                    </div>
                    <div className="product-item-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditProduct(prod)}
                        title="Edit"
                      >
                        <Plus size={16} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteProduct(prod._id)}
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="auth-footer">
            <Link to="/" className="auth-link">
              <ArrowLeft className="link-icon" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;

