import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';
import StarRating from '../../components/StarRating/StarRating';
import { useCart } from '../../context/CartContext/CartContext';
import { useWishlist } from '../../context/WishlistContext/WishlistContext';
import { getProductById } from '../../services/api/api';
import './ProductPage.css';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await getProductById(id);
        setProduct({
          ...data,
          images: [
            data.image,
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600',
            'https://images.unsplash.com/photo-1545127398-14699f92334b?w=600'
          ],
          inStock: true,
          originalPrice: data.price * 1.3,
          discount: 23,
          reviews: Math.floor(Math.random() * 500) + 50
        });
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: product.image
      });
      // Optionally show a success message or notification
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="product-page">
        <div className="product-container">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-page">
        <div className="product-container">
          <p className="error-message">{error || 'Product not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-page">
      <div className="product-container">
        {/* Image Section */}
        <div className="product-images">
          <div className="main-image-wrapper">
            <img 
              src={product.images[selectedImage]} 
              alt={product.title}
              className="main-image"
            />
          </div>
          <div className="thumbnail-list">
            {product.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`${product.title} ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* Details Section */}
        <div className="product-details-section">
          <h1 className="product-page-title">{product.title}</h1>
          
          <div className="product-rating-section">
            <StarRating rating={product.rating} />
            <span className="reviews-count">({product.reviews} Reviews)</span>
          </div>

          <div className="price-section">
            <span className="current-price">Rs. {product.price.toFixed(2)}</span>
            <span className="original-price">Rs. {product.originalPrice.toFixed(2)}</span>
            <span className="discount-badge">-{product.discount}% OFF</span>
          </div>

          <div className="stock-status">
            {product.inStock ? (
              <span className="in-stock">In Stock</span>
            ) : (
              <span className="out-of-stock">Out of Stock</span>
            )}
          </div>

          <div className="quantity-selector">
            <label className="quantity-label">Quantity:</label>
            <div className="quantity-controls">
              <button 
                className="qty-btn"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="qty-display">{quantity}</span>
              <button 
                className="qty-btn"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <ShoppingCart className="btn-icon" />
              Add to Cart
            </button>
            <button className="buy-now-btn" onClick={handleBuyNow}>
              Buy Now
            </button>
            <button
              className={`wishlist-btn ${isInWishlist(product?.id) ? 'active' : ''}`}
              onClick={() => product && toggleWishlist(product)}
              title={isInWishlist(product?.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <Heart className={`btn-icon ${isInWishlist(product?.id) ? 'filled' : ''}`} />
            </button>
            <button className="share-btn">
              <Share2 className="btn-icon" />
            </button>
          </div>

          <div className="product-features">
            <div className="feature-item">
              <Truck className="feature-icon" />
              <div>
                <h4>Free Delivery</h4>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <Shield className="feature-icon" />
              <div>
                <h4>1 Year Warranty</h4>
                <p>Full coverage included</p>
              </div>
            </div>
            <div className="feature-item">
              <RotateCcw className="feature-icon" />
              <div>
                <h4>30 Days Returns</h4>
                <p>Easy return policy</p>
              </div>
            </div>
          </div>

          <div className="product-description">
            <h3 className="description-title">Description</h3>
            <p className="description-text">{product.description || product.title}</p>
            
            <h4 className="features-title">Category:</h4>
            <p className="category-text">{product.category}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
