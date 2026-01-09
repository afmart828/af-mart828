import './Contact.css';
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-page">
      <div className="page-container">
        <h1 className="page-title">Contact Us</h1>
        
        <div className="contact-content">
          <div className="contact-info-section">
            <h2>Get In Touch</h2>
            <p>
              Have questions or need assistance? We're here to help! Reach out to us 
              through any of the following channels or fill out the form.
            </p>
            
            <div className="contact-details">
              <div className="contact-item">
                <h3>📍 Address</h3>
                <p>AF Mart Headquarters<br />Lahore, Punjab, Pakistan</p>
              </div>
              
              <div className="contact-item">
                <h3>📧 Email</h3>
                <p>support@afmart.com</p>
              </div>
              
              <div className="contact-item">
                <h3>📞 Phone</h3>
                <p>+92 300 1234567</p>
              </div>
              
              <div className="contact-item">
                <h3>🕐 Working Hours</h3>
                <p>Monday - Saturday: 9:00 AM - 9:00 PM<br />Sunday: 10:00 AM - 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="contact-form-section">
            <h2>Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="order">Order Inquiry</option>
                  <option value="shipping">Shipping Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="product">Product Question</option>
                  <option value="technical">Technical Support</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

