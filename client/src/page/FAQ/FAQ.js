import './FAQ.css';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const faqData = [
    {
      category: 'Ordering',
      questions: [
        {
          id: 'order-1',
          question: 'How do I place an order?',
          answer: 'Browse our products, add items to your cart, and proceed to checkout. You\'ll need to create an account or login, then enter your shipping and payment information to complete your order.'
        },
        {
          id: 'order-2',
          question: 'Can I modify or cancel my order?',
          answer: 'You can modify or cancel your order within 1 hour of placing it. After that, the order is processed and cannot be changed. Contact customer support immediately for assistance.'
        },
        {
          id: 'order-3',
          question: 'How do I track my order?',
          answer: 'Log into your account and go to "My Orders" to track your order status. You\'ll also receive email updates with tracking information once your order ships.'
        }
      ]
    },
    {
      category: 'Shipping & Delivery',
      questions: [
        {
          id: 'ship-1',
          question: 'What are the shipping options?',
          answer: 'We offer Standard Shipping (3-5 business days) and Express Shipping (1-2 business days) for most locations across Pakistan.'
        },
        {
          id: 'ship-2',
          question: 'How much does shipping cost?',
          answer: 'Standard shipping is FREE for orders over Rs. 2,000. For orders under Rs. 2,000, a flat shipping fee of Rs. 150 applies. Express shipping costs Rs. 300.'
        },
        {
          id: 'ship-3',
          question: 'Do you ship to all cities in Pakistan?',
          answer: 'Yes, we ship to all major cities and towns across Pakistan including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and many more.'
        },
        {
          id: 'ship-4',
          question: 'What if my package is damaged or missing items?',
          answer: 'If your package arrives damaged or with missing items, please contact us within 48 hours with photos of the damage. We\'ll arrange a replacement or refund immediately.'
        }
      ]
    },
    {
      category: 'Returns & Refunds',
      questions: [
        {
          id: 'return-1',
          question: 'What is your return policy?',
          answer: 'We offer a 7-day return policy for most products. Items must be unused, in original packaging, and with tags attached. Certain items like intimate wear, perishables, and personalized products cannot be returned.'
        },
        {
          id: 'return-2',
          question: 'How do I initiate a return?',
          answer: 'Log into your account, go to "My Orders," select the order, and click "Return Item." Follow the instructions to schedule a pickup or drop off at our return center.'
        },
        {
          id: 'return-3',
          question: 'When will I receive my refund?',
          answer: 'Refunds are processed within 5-7 business days after we receive and inspect the returned item. The refund will be credited to your original payment method.'
        }
      ]
    },
    {
      category: 'Payment',
      questions: [
        {
          id: 'pay-1',
          question: 'What payment methods do you accept?',
answer: 'We accept Credit/Debit Cards (Visa, Mastercard), EasyPaisa, JazzCash, and Bank Transfer.'
        },
        {
          id: 'pay-2',
          question: 'Is my payment information secure?',
          answer: 'Yes, all payments are processed through secure, encrypted connections. We do not store your full payment details on our servers.'
        }
      ]
    },
    {
      category: 'Account & Security',
      questions: [
        {
          id: 'acc-1',
          question: 'How do I create an account?',
          answer: 'Click "Sign Up" in the top right corner, enter your email address and create a password. You\'ll receive a verification email to activate your account.'
        },
        {
          id: 'acc-2',
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page, enter your email address, and we\'ll send you a link to reset your password.'
        },
        {
          id: 'acc-3',
          question: 'How can I update my account information?',
          answer: 'Log into your account and go to "My Profile" to update your personal information, shipping addresses, and communication preferences.'
        }
      ]
    }
  ];

  const toggleItem = (category, questionId) => {
    setOpenItems(prev => ({
      ...prev,
      [`${category}-${questionId}`]: !prev[`${category}-${questionId}`]
    }));
  };

  return (
    <div className="faq-page">
      <div className="page-container">
        <h1 className="page-title">Frequently Asked Questions</h1>
        
        <div className="faq-content">
          {faqData.map((category) => (
            <div key={category.category} className="faq-category">
              <h2 className="category-title">{category.category}</h2>
              
              <div className="faq-list">
                {category.questions.map((faq) => {
                  const isOpen = openItems[`${category.category}-${faq.id}`];
                  return (
                    <div key={faq.id} className="faq-item">
                      <button
                        className={`faq-question ${isOpen ? 'open' : ''}`}
                        onClick={() => toggleItem(category.category, faq.id)}
                      >
                        <span>{faq.question}</span>
                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                      {isOpen && (
                        <div className="faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="faq-contact-cta">
          <h3>Still have questions?</h3>
          <p>Can't find the answer you're looking for? Please contact our support team.</p>
          <a href="/contact" className="contact-button">Contact Us</a>
        </div>
      </div>
    </div>
  );
};

export default FAQ;

