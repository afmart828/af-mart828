import './TermsConditions.css';

const TermsConditions = () => {
  return (
    <div className="terms-page">
      <div className="page-container">
        <h1 className="page-title">Terms & Conditions</h1>
        
        <div className="terms-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the AF Mart website (www.afmart.com), you accept and 
              agree to be bound by the terms and provisions of this agreement. If you do 
              not agree to abide by these terms, please do not use this website.
            </p>
            <p>
              AF Mart reserves the right to modify these Terms & Conditions at any time 
              without prior notice. Your continued use of the website constitutes acceptance 
              of any changes to these terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Use of Website</h2>
            <p>You agree to use this website only for lawful purposes and in a manner that 
            does not:</p>
            <ul>
              <li>Violate any applicable law or regulation</li>
              <li>Infringe on the rights of others</li>
              <li>Interfere with or disrupt the website's operation</li>
              <li>Attempt to gain unauthorized access to any part of the website</li>
              <li>Use the website for commercial purposes without authorization</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. Account Registration</h2>
            <p>To make purchases on our website, you may need to create an account. You agree to:</p>
            <ul>
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
          </section>

          <section className="terms-section">
            <h2>4. Products and Pricing</h2>
            <p><strong>Product Availability:</strong> All products are subject to availability. 
            We reserve the right to limit quantities or discontinue products at any time.</p>
            
            <p><strong>Pricing:</strong> Prices are displayed in Pakistani Rupees (PKR) and 
            are subject to change without notice. Despite our efforts, occasional errors in 
            pricing may occur. If a product is listed at an incorrect price, we reserve the 
            right to cancel orders placed at that price.</p>
            
            <p><strong>Taxes:</strong> All prices are inclusive of applicable taxes unless 
            otherwise stated.</p>
          </section>

          <section className="terms-section">
            <h2>5. Orders and Payment</h2>
            <p><strong>Order Acceptance:</strong> Your receipt of an order confirmation does 
            not signify our acceptance of your order. We reserve the right to accept or reject 
            any order for any reason.</p>
            
<p><strong>Payment Methods:</strong> We accept:</p>
            <ul>
              <li>Credit/Debit Cards (Visa, Mastercard)</li>
              <li>EasyPaisa, JazzCash</li>
              <li>Bank Transfer</li>
            </ul>
            
            <p><strong>Payment Security:</strong> All payment transactions are processed 
            securely through encrypted connections. We do not store your full payment details.</p>
          </section>

          <section className="terms-section">
            <h2>6. Shipping and Delivery</h2>
            <p>Please refer to our <a href="/shipping">Shipping Information</a> page for detailed 
            information about shipping methods, times, and costs.</p>
            <p>Delivery times are estimates and do not include processing time. We are not 
            responsible for delays caused by events beyond our control.</p>
          </section>

          <section className="terms-section">
            <h2>7. Returns and Refunds</h2>
            <p>We offer a 7-day return policy for most products. To be eligible for a return:</p>
            <ul>
              <li>Items must be unused and in original packaging</li>
              <li>Tags must be attached</li>
              <li>Return request must be submitted within 7 days of delivery</li>
            </ul>
            <p>The following items cannot be returned:</p>
            <ul>
              <li>Intimate apparel and swimwear</li>
              <li>Perishable goods</li>
              <li>Personalized or custom items</li>
              <li>Sealed media that has been opened</li>
            </ul>
            <p>Refunds are processed within 5-7 business days after receiving and inspecting 
            the returned item.</p>
          </section>

          <section className="terms-section">
            <h2>8. Intellectual Property</h2>
            <p>All content on this website, including but not limited to text, graphics, 
            logos, images, audio clips, and software, is the property of AF Mart or its 
            content suppliers and is protected by Pakistani and international copyright laws.</p>
            <p>You may not reproduce, distribute, display, or create derivative works from 
            any content without prior written consent from AF Mart.</p>
          </section>

          <section className="terms-section">
            <h2>9. User Content</h2>
            <p>By submitting reviews, comments, or other content to our website, you grant 
            AF Mart a non-exclusive, royalty-free, perpetual, irrevocable right to use, 
            reproduce, modify, and publish such content worldwide.</p>
            <p>You represent that you own or have the right to use any content you submit.</p>
          </section>

          <section className="terms-section">
            <h2>10. Limitation of Liability</h2>
            <p>AF Mart shall not be liable for any indirect, incidental, special, 
            consequential, or punitive damages resulting from your use of or inability 
            to use this website.</p>
            <p>Our total liability for any claim arising from your use of this website 
            shall not exceed the amount you paid for the products giving rise to such claim.</p>
          </section>

          <section className="terms-section">
            <h2>11. Disclaimer</h2>
            <p>This website is provided "as is" and "as available" without any warranties 
            of any kind, either express or implied. AF Mart does not warrant that the 
            website will be uninterrupted, timely, secure, or error-free.</p>
          </section>

          <section className="terms-section">
            <h2>12. Governing Law</h2>
            <p>These terms and conditions are governed by and construed in accordance with 
            the laws of Pakistan. Any disputes arising under these terms shall be subject 
            to the exclusive jurisdiction of the courts of Lahore, Punjab.</p>
          </section>

          <section className="terms-section">
            <h2>13. Contact Information</h2>
            <p>For questions about these Terms & Conditions, please contact us:</p>
            <div className="contact-details">
              <p><strong>Email:</strong> legal@afmart.com</p>
              <p><strong>Phone:</strong> +92 300 1234567</p>
              <p><strong>Address:</strong> AF Mart Legal Department, Lahore, Punjab, Pakistan</p>
            </div>
          </section>

          <section className="terms-footer">
            <p>Last Updated: January 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;

