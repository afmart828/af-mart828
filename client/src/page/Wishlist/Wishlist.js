import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { useWishlist } from '../../context/WishlistContext/WishlistContext';
import { useCart } from '../../context/CartContext/CartContext';
import StarRating from '../../components/StarRating/StarRating';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();
  const [sortBy, setSortBy] = useState('name');

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  const sortedItems = [...wishlistItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating?.rate || b.rating || 0) - (a.rating?.rate || a.rating || 0);
      case 'name':
      default:
        return a.title.localeCompare(b.title);
    }
  });

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <div className="wishlist-container">
          <div className="empty-wishlist">
            <Heart className="empty-heart-icon" />
            <h2>Your Wishlist is Empty</h2>
            <p>Add items you love to your wishlist and keep track of them here.</p>
            <Link to="/" className="continue-shopping-btn">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-container">
        <div className="wishlist-header">
          <h1>My Wishlist ({wishlistItems.length})</h1>
          <div className="wishlist-controls">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
            <button
              onClick={clearWishlist}
              className="clear-wishlist-btn"
            >
              Clear All
            </button>
          </div>
        </div>

        <div className="wishlist-grid">
          {sortedItems.map((product) => (
            <div key={product.id} className="wishlist-item">
              <div className="wishlist-item-image">
                <Link to={`/product/${product.id}`}>
                  <img src={product.image} alt={product.title} />
                </Link>
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="remove-from-wishlist"
                  title="Remove from wishlist"
                >
                  <Trash2 className="remove-icon" />
                </button>
              </div>

              <div className="wishlist-item-details">
                <Link to={`/product/${product.id}`} className="wishlist-item-title">
                  {product.title}
                </Link>

                <div className="wishlist-item-price">
                  <span className="current-price">Rs. {product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">Rs. {product.originalPrice}</span>
                  )}
                </div>

                <div className="wishlist-item-rating">
                  <StarRating rating={product.rating?.rate || product.rating || 0} />
                  <span className="rating-count">
                    ({product.rating?.count || product.reviews || 0})
                  </span>
                </div>

                <div className="wishlist-item-actions">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className={`add-to-cart-btn ${isInCart(product.id) ? 'in-cart' : ''}`}
                    disabled={isInCart(product.id)}
                  >
                    <ShoppingCart className="cart-icon" />
                    {isInCart(product.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
