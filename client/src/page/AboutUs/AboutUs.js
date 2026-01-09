import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <div className="page-container">
        <h1 className="page-title">About Us</h1>
        <div className="about-content">
          <section className="about-section">
            <h2>Welcome to AF Mart</h2>
            <p>
              AF Mart is your premier online shopping destination, offering a wide range of 
              quality products across Electronics, Fashion, Home & Kitchen, Beauty & Health, 
              Sports & Outdoors, Toys & Games, Books, and Automotive categories.
            </p>
            <p>
              Founded with a mission to provide exceptional service and products to customers 
              across Pakistan, we strive to make online shopping convenient, reliable, and enjoyable.
            </p>
          </section>

          <section className="about-section">
            <h2>Our Vision</h2>
            <p>
              To become Pakistan's most trusted and customer-centric e-commerce platform, 
              delivering value and quality to every household.
            </p>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <ul className="benefits-list">
              <li>✓ Wide variety of products from trusted brands</li>
              <li>✓ Fast and reliable shipping across Pakistan</li>
              <li>✓ Secure payment options</li>
              <li>✓ Easy returns and exchanges</li>
              <li>✓ 24/7 customer support</li>
              <li>✓ Best prices and regular discounts</li>
            </ul>
          </section>

          <section className="about-section">
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p><strong>Email:</strong> support@afmart.com</p>
              <p><strong>Phone:</strong> +92 300 1234567</p>
              <p><strong>Address:</strong> Lahore, Punjab, Pakistan</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

