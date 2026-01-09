import './Careers.css';
import { useState } from 'react';
import { Briefcase, MapPin, Clock, DollarSign, ChevronRight } from 'lucide-react';

const Careers = () => {
  const [expandedJob, setExpandedJob] = useState(null);

  const jobs = [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      department: 'Technology',
      location: 'Lahore, Punjab',
      type: 'Full-time',
      salary: 'Rs. 150,000 - 250,000/month',
      description: 'We are looking for an experienced Full Stack Developer to join our technology team. You will be responsible for building and maintaining our e-commerce platform.',
      requirements: [
        '5+ years of experience in web development',
        'Proficiency in React, Node.js, and MongoDB',
        'Experience with RESTful API design and implementation',
        'Strong understanding of database design and optimization',
        'Excellent problem-solving skills'
      ]
    },
    {
      id: 2,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'Lahore, Punjab',
      type: 'Full-time',
      salary: 'Rs. 80,000 - 120,000/month',
      description: 'Join our marketing team to drive brand awareness and customer engagement through digital channels.',
      requirements: [
        '3+ years of digital marketing experience',
        'Expertise in SEO, SEM, and social media marketing',
        'Experience with Google Analytics and marketing automation tools',
        'Strong analytical and communication skills',
        'Proven track record of successful campaigns'
      ]
    },
    {
      id: 3,
      title: 'Customer Support Representative',
      department: 'Customer Service',
      location: 'Lahore, Punjab',
      type: 'Full-time',
      salary: 'Rs. 35,000 - 50,000/month',
      description: 'We\'re seeking a friendly and dedicated customer support representative to assist our customers with inquiries and issues.',
      requirements: [
        'Excellent communication skills in English and Urdu',
        '1+ year of customer service experience',
        'Strong problem-solving abilities',
        'Patience and empathy when handling customer concerns',
        'Ability to work in rotating shifts'
      ]
    },
    {
      id: 4,
      title: 'Warehouse Manager',
      department: 'Operations',
      location: 'Lahore, Punjab',
      type: 'Full-time',
      salary: 'Rs. 60,000 - 90,000/month',
      description: 'Lead our warehouse operations to ensure efficient inventory management and timely order fulfillment.',
      requirements: [
        '3+ years of warehouse management experience',
        'Knowledge of inventory management systems',
        'Strong leadership and team management skills',
        'Ability to optimize warehouse workflows',
        'Attention to detail and organizational skills'
      ]
    },
    {
      id: 5,
      title: 'UI/UX Designer',
      department: 'Design',
      location: 'Lahore, Punjab',
      type: 'Full-time',
      salary: 'Rs. 70,000 - 100,000/month',
      description: 'Create beautiful and user-friendly interfaces for our e-commerce platform.',
      requirements: [
        '3+ years of UI/UX design experience',
        'Proficiency in Figma, Adobe XD, or similar tools',
        'Strong portfolio showcasing web and mobile designs',
        'Understanding of user research and testing methods',
        'Ability to translate business requirements into design solutions'
      ]
    }
  ];

  const benefits = [
    '🚀 Competitive salary and performance bonuses',
    '🏥 Health insurance coverage',
    '🎓 Professional development opportunities',
    '🏖️ Paid annual leave',
    '🌟 Employee discounts on all products',
    '👥 Friendly and collaborative work environment',
    '📈 Career growth opportunities',
    '💻 Latest technology and tools'
  ];

  const toggleJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  return (
    <div className="careers-page">
      <div className="page-container">
        <h1 className="page-title">Careers at AF Mart</h1>
        
        <div className="careers-intro">
          <h2>Join Our Team</h2>
          <p>
            At AF Mart, we're always looking for talented individuals who are passionate about 
            e-commerce and customer service. Join us and be part of Pakistan's fastest-growing 
            online shopping platform!
          </p>
        </div>

        <div className="benefits-section">
          <h3>Why Work With Us?</h3>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <div key={index} className="benefit-item">
                {benefit}
              </div>
            ))}
          </div>
        </div>

        <div className="jobs-section">
          <h3>Open Positions</h3>
          <div className="jobs-list">
            {jobs.map((job) => (
              <div key={job.id} className={`job-card ${expandedJob === job.id ? 'expanded' : ''}`}>
                <div className="job-header" onClick={() => toggleJob(job.id)}>
                  <div className="job-info">
                    <h4 className="job-title">{job.title}</h4>
                    <div className="job-meta">
                      <span className="meta-item">
                        <Briefcase size={16} /> {job.department}
                      </span>
                      <span className="meta-item">
                        <MapPin size={16} /> {job.location}
                      </span>
                      <span className="meta-item">
                        <Clock size={16} /> {job.type}
                      </span>
                      <span className="meta-item">
                        <DollarSign size={16} /> {job.salary}
                      </span>
                    </div>
                  </div>
                  <ChevronRight 
                    size={24} 
                    className={`expand-icon ${expandedJob === job.id ? 'rotated' : ''}`} 
                  />
                </div>
                
                {expandedJob === job.id && (
                  <div className="job-details">
                    <div className="job-description">
                      <h5>Description</h5>
                      <p>{job.description}</p>
                    </div>
                    <div className="job-requirements">
                      <h5>Requirements</h5>
                      <ul>
                        {job.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="apply-button">
                      Apply Now
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="careers-cta">
          <h3>Don't see the right position?</h3>
          <p>We're always looking for great talent. Send your resume to careers@afmart.com</p>
        </div>
      </div>
    </div>
  );
};

export default Careers;

