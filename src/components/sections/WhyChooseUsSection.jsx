import React from 'react';
import { FaCheckCircle, FaCertificate, FaCar, FaTools, FaUserTie, FaMapMarkedAlt, FaGift } from 'react-icons/fa';

const benefits = [
  {
    icon: FaCertificate,
    title: "LTO Accredited",
    description: "Fully licensed by the Land Transportation Office. Your training certificate is officially recognized."
  },
  {
    icon: FaGift,
    title: "FREE Defensive Driving",
    description: "Complimentary defensive driving lectures included with every course - a WVDI exclusive."
  },
  {
    icon: FaTools,
    title: "FREE Car Maintenance Training",
    description: "Learn hands-on vehicle maintenance and preventive care - skills for life."
  },
  {
    icon: FaUserTie,
    title: "Experienced Instructors",
    description: "Our 8 instructors average 10+ years experience. Patient, professional, and LTO-certified."
  },
  {
    icon: FaMapMarkedAlt,
    title: "3 Convenient Locations",
    description: "Branches in Bacolod, Himamaylan, and Dumaguete. Training where you need it."
  },
  {
    icon: FaCar,
    title: "Modern Training Vehicles",
    description: "Learn on well-maintained automatic and manual transmission vehicles."
  }
];

function BenefitCard({ icon: Icon, title, description }) {
  return (
    <div className="wvdi-benefit-card">
      <div className="wvdi-benefit-icon">
        <Icon />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function WhyChooseUsSection() {
  return (
    <section id="why-choose-us" className="wvdi-why-choose-section">
      <h2>Why Choose WVDI?</h2>
      <p className="wvdi-why-intro">
        Not all driving schools are the same. Here's what sets WVDI apart from the rest.
      </p>
      <div className="wvdi-benefits-grid">
        {benefits.map((benefit, index) => (
          <BenefitCard key={index} {...benefit} />
        ))}
      </div>
      <div className="wvdi-guarantee-box">
        <FaCheckCircle className="wvdi-guarantee-icon" />
        <div>
          <strong>Our Promise:</strong> If you're not satisfied with your first lesson,
          we'll make it right or refund your payment. Your success is our priority.
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;
