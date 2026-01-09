import './PrivacyPolicy.css';

const PrivacyPolicy = () => {
  return (
    <div className="privacy-page">
      <div className="page-container">
        <h1 className="page-title">Privacy Policy</h1>
        
        <div className="privacy-content">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              At AF Mart, we take your privacy seriously. This Privacy Policy explains how we 
              collect, use, disclose, and safeguard your information when you visit our website 
              and make purchases from our online store.
            </p>
            <p>
              By accessing or using our services, you agree to this Privacy Policy. If you do 
              not agree with the terms of this policy, please do not access our website.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personally identifiable information that you voluntarily 
            provide to us when you:</p>
            <ul>
              <li>Create an account on our website</li>
              <li>Make a purchase</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact our customer support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information (email, phone number, address)</li>
              <li>Payment information (processed securely through our payment partners)</li>
              <li>Order history and preferences</li>
              <li>Login credentials</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you visit our website, we may automatically collect certain information 
            about your device and usage patterns, including:</p>
            <ul>
              <li>IP address and browser type</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages viewed and time spent</li>
              <li>Date and time of visits</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Process and fulfill your orders</li>
              <li>Send order confirmations and updates</li>
              <li>Provide customer support and respond to inquiries</li>
              <li>Improve our website and services</li>
              <li>Personalize your shopping experience</li>
              <li>Send promotional emails and offers (with your consent)</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell or rent your personal information to third parties. We may 
            share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party companies that assist in 
              operating our website, processing payments, and delivering orders</li>
              <li><strong>Shipping Partners:</strong> Courier companies to deliver your orders</li>
              <li><strong>Legal Requirements:</strong> When required by law, court order, or 
              government request</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, 
              or sale of assets</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to enhance your experience. Cookies 
            help us:</p>
            <ul>
              <li>Remember your preferences and settings</li>
              <li>Understand how you use our website</li>
              <li>Improve our services and product offerings</li>
              <li>Provide personalized recommendations</li>
            </ul>
            <p>You can control cookies through your browser settings. Note that disabling 
            cookies may affect certain features of our website.</p>
          </section>

          <section className="privacy-section">
            <h2>6. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect 
            your personal information against unauthorized access, alteration, disclosure, 
            or destruction. These measures include:</p>
            <ul>
              <li>Secure Socket Layer (SSL) encryption</li>
              <li>Secure payment processing</li>
              <li>Regular security assessments</li>
              <li>Restricted access to personal information</li>
              <li>Employee training on data protection</li>
            </ul>
            <p>While we strive to protect your information, no method of transmission over 
            the Internet is 100% secure.</p>
          </section>

          <section className="privacy-section">
            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing emails</li>
              <li><strong>Object:</strong> Object to processing of your personal information</li>
            </ul>
            <p>To exercise these rights, please contact us at privacy@afmart.com</p>
          </section>

          <section className="privacy-section">
            <h2>8. Children's Privacy</h2>
            <p>Our website is not intended for children under the age of 18. We do not 
            knowingly collect personal information from minors. If you are a parent or 
            guardian and believe your child has provided us with personal information, 
            please contact us immediately.</p>
          </section>

          <section className="privacy-section">
            <h2>9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible 
            for the privacy practices or content of these websites. We encourage you to 
            review their privacy policies before providing any personal information.</p>
          </section>

          <section className="privacy-section">
            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of 
            any changes by posting the new Privacy Policy on this page and updating the 
            "Last Updated" date. We encourage you to review this Privacy Policy periodically.</p>
          </section>

          <section className="privacy-section">
            <h2>11. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or our privacy practices, 
            please contact us:</p>
            <div className="contact-details">
              <p><strong>Email:</strong> privacy@afmart.com</p>
              <p><strong>Phone:</strong> +92 300 1234567</p>
              <p><strong>Address:</strong> AF Mart Privacy Department, Lahore, Punjab, Pakistan</p>
            </div>
          </section>

          <section className="privacy-footer">
            <p>Last Updated: January 2026</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

