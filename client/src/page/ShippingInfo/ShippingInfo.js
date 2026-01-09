import './ShippingInfo.css';

const ShippingInfo = () => {
  return (
    <div className="shipping-page">
      <div className="page-container">
        <h1 className="page-title">Shipping Information</h1>
        
        <div className="shipping-content">
          <section className="shipping-section">
            <h2>Shipping Methods & Times</h2>
            <div className="shipping-options">
              <div className="shipping-option">
                <h3>Standard Shipping</h3>
                <p className="delivery-time">3-5 Business Days</p>
                <p className="shipping-cost">FREE for orders over Rs. 2,000</p>
                <p className="shipping-cost">Rs. 150 for orders under Rs. 2,000</p>
                <p className="description">
                  Our reliable standard shipping delivers to most locations within 3-5 business days. 
                  Perfect for non-urgent orders.
                </p>
              </div>
              
              <div className="shipping-option featured">
                <h3>Express Shipping</h3>
                <p className="delivery-time">1-2 Business Days</p>
                <p className="shipping-cost">Rs. 300 (Flat Rate)</p>
                <p className="description">
                  Need it fast? Our express shipping delivers to major cities within 1-2 business days. 
                  Ideal for urgent orders.
                </p>
              </div>
              
              <div className="shipping-option">
                <h3>Same-Day Delivery</h3>
                <p className="delivery-time">Same Day (Lahore Only)</p>
                <p className="shipping-cost">Rs. 500 (Flat Rate)</p>
                <p className="description">
                  Available for orders placed before 11 AM in Lahore. Get your products delivered 
                  on the same day!
                </p>
              </div>
            </div>
          </section>

          <section className="shipping-section">
            <h2>Coverage Areas</h2>
            <div className="coverage-grid">
              <div className="coverage-item">
                <h4>Major Cities</h4>
                <p>Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, Multan, Peshawar, Quetta, 
                Gujranwala, Sialkot, Sargodha, Bahawalpur, Hyderabad, Sukkur, Larkana</p>
              </div>
              <div className="coverage-item">
                <h4>Tier 2 & 3 Cities</h4>
                <p>We deliver to most cities and towns across Pakistan. Enter your location at 
                checkout to confirm delivery availability.</p>
              </div>
            </div>
          </section>

          <section className="shipping-section">
            <h2>Order Processing</h2>
            <ul className="process-list">
              <li><strong>Order Confirmation:</strong> You'll receive an email/SMS confirmation immediately after placing your order.</li>
              <li><strong>Processing Time:</strong> Orders are typically processed within 24 hours (excluding weekends and holidays).</li>
              <li><strong>Tracking:</strong> Once shipped, you'll receive tracking information via email and SMS.</li>
              <li><strong>Delivery Attempts:</strong> Our courier will attempt delivery 2 times. If unsuccessful, you'll receive a call to reschedule.</li>
            </ul>
          </section>

          <section className="shipping-section">
            <h2>Shipping Restrictions</h2>
            <ul className="restrictions-list">
              <li>We currently ship within Pakistan only.</li>
              <li>Some products may have shipping restrictions due to size, weight, or local regulations.</li>
              <li>PO Boxes are not eligible for delivery.</li>
              <li>High-value orders may require signature verification upon delivery.</li>
            </ul>
          </section>

          <section className="shipping-section">
            <h2>Shipping Partners</h2>
            <p>We partner with trusted courier services to ensure safe and timely delivery:</p>
            <div className="partners-logos">
              <span className="partner-name">TCS</span>
              <span className="partner-name">M&P Express</span>
              <span className="partner-name">Leopard Courier</span>
              <span className="partner-name">DHL</span>
            </div>
          </section>

          <section className="shipping-section">
            <h2>Shipping FAQs</h2>
            <div className="shipping-faqs">
              <div className="faq-item">
                <h4>Can I change my shipping address after ordering?</h4>
                <p>Address changes are possible within 1 hour of placing your order. Contact customer support immediately.</p>
              </div>
              <div className="faq-item">
                <h4>What if my package is lost or damaged?</h4>
                <p>In the rare event of a lost or damaged package, contact us within 48 hours. We'll investigate and either reship or refund your order.</p>
              </div>
              <div className="faq-item">
                <h4>Do you offer international shipping?</h4>
                <p>Currently, we only ship within Pakistan. We're working on expanding to international shipping soon!</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ShippingInfo;

