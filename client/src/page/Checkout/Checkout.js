import { CreditCard, Lock } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext/CartContext';
import { useUser } from '../../context/UserContext/UserContext';
import { createOrder } from '../../services/api/api';
import './Checkout.css';

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { user, isAuthenticated } = useUser();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'Pakistan',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 10.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    if (!isAuthenticated) {
      setError('Please sign in to complete your order');
      navigate('/login');
      return;
    }

    setLoading(true);

    try {
      await createOrder({
        userId: user.id,
        items: cartItems,
        total: total,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          country: formData.country
        }
      });

      // Clear cart after successful order
      clearCart();
      
      // Navigate to order history or success page
      navigate('/orders');
    } catch (err) {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <h1 className="checkout-title">Checkout</h1>
        <div className="empty-cart-message">
          <p>Your cart is empty</p>
          <button onClick={() => navigate('/')} className="continue-shopping-btn">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-layout">
        <div className="checkout-forms">
          {/* Shipping Information */}
          <div className="checkout-section">
            <h2 className="section-heading">Shipping Information</h2>
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    className="form-input" 
                    placeholder="John" 
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    className="form-input" 
                    placeholder="Doe" 
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-input" 
                  placeholder="john.doe@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input 
                  type="tel" 
                  name="phone"
                  className="form-input" 
                  placeholder="+1 (555) 000-0000" 
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Street Address</label>
                <input 
                  type="text" 
                  name="address"
                  className="form-input" 
                  placeholder="123 Main St" 
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">City</label>
                  <input 
                    type="text" 
                    name="city"
                    className="form-input" 
                    placeholder="Dunyapur" 
                    value={formData.city}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">State/Province</label>
                  <input 
                    type="text" 
                    name="state"
                    className="form-input" 
                    placeholder="Punjab" 
                    value={formData.state}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">ZIP/Postal Code</label>
                  <input 
                    type="text" 
                    name="zip"
                    className="form-input" 
                    placeholder="12345" 
                    value={formData.zip}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Country</label>
                  <select 
                    name="country"
                    className="form-select"
                    value={formData.country}
                    onChange={handleChange}
                  >
                    <option>Pakistan</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>

              {/* Payment Information */}
              <div className="checkout-section payment-section">
                <h2 className="section-heading">
                  <CreditCard className="heading-icon" />
                  Payment Information
                </h2>
                
                <div className="form-group">
                  <label className="form-label">Card Number</label>
                  <input 
                    type="text" 
                    name="cardNumber"
                    className="form-input" 
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Cardholder Name</label>
                  <input 
                    type="text" 
                    name="cardName"
                    className="form-input" 
                    placeholder="John Doe" 
                    value={formData.cardName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Expiry Date</label>
                    <input 
                      type="text" 
                      name="expiryDate"
                      className="form-input" 
                      placeholder="MM/YY" 
                      maxLength="5"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">CVV</label>
                    <input 
                      type="text" 
                      name="cvv"
                      className="form-input" 
                      placeholder="123" 
                      maxLength="3"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="security-notice">
                  <Lock className="security-icon" />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>

              {error && <div className="checkout-error">{error}</div>}

              <button type="submit" className="place-order-button" disabled={loading}>
                {loading ? 'Processing...' : `Place Order - Rs ${total.toFixed(2)}`}
              </button>
            </form>
          </div>
        </div>

        {/* Order Summary */}
        <div className="order-summary-sidebar">
          <h3 className="summary-heading">Order Summary</h3>
          
          <div className="order-items">
            {cartItems.map((item) => (
              <div key={item.id} className="order-item">
                <img src={item.image} alt={item.title} className="order-item-image" />
                <div className="order-item-details">
                  <p className="order-item-title">{item.title}</p>
                  <p className="order-item-quantity">Qty: {item.quantity}</p>
                </div>
                <p className="order-item-price">Rs {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>

          <div className="summary-calculations">
            <div className="calc-row">
              <span>Subtotal:</span>
              <span>Rs {subtotal.toFixed(2)}</span>
            </div>
            <div className="calc-row">
              <span>Shipping:</span>
              <span>Rs {shipping.toFixed(2)}</span>
            </div>
            <div className="calc-row">
              <span>Tax:</span>
              <span>Rs {tax.toFixed(2)}</span>
            </div>
            <div className="calc-divider"></div>
            <div className="calc-row calc-total">
              <span>Total:</span>
              <span>Rs {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

