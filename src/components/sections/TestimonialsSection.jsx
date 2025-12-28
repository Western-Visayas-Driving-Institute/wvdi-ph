import React from 'react';
import { FaStar, FaQuoteLeft, FaGraduationCap, FaClock, FaUsers, FaMapMarkerAlt } from 'react-icons/fa';
import testimonialData from '../../data/testimonials.json';

function StatCard({ icon: Icon, value, label }) {
  return (
    <div className="wvdi-stat-card">
      <Icon className="wvdi-stat-icon" />
      <span className="wvdi-stat-value">{value}</span>
      <span className="wvdi-stat-label">{label}</span>
    </div>
  );
}

function TestimonialCard({ name, location, course, rating, text }) {
  return (
    <div className="wvdi-testimonial-card">
      <FaQuoteLeft className="wvdi-quote-icon" />
      <p className="wvdi-testimonial-text">{text}</p>
      <div className="wvdi-testimonial-rating">
        {[...Array(rating)].map((_, i) => (
          <FaStar key={i} className="wvdi-star" />
        ))}
      </div>
      <div className="wvdi-testimonial-author">
        <strong>{name}</strong>
        <span>{location}</span>
        <span className="wvdi-testimonial-course">{course}</span>
      </div>
    </div>
  );
}

function TestimonialsSection() {
  const { stats, testimonials } = testimonialData;

  return (
    <section id="testimonials" className="wvdi-testimonials-section">
      {/* Statistics Bar */}
      <div className="wvdi-stats-bar">
        <StatCard icon={FaGraduationCap} value={stats.totalGraduates} label="Graduates" />
        <StatCard icon={FaStar} value={stats.passRate} label="Pass Rate" />
        <StatCard icon={FaClock} value={stats.yearsExperience} label="Years Experience" />
        <StatCard icon={FaUsers} value={stats.instructors} label="Expert Instructors" />
        <StatCard icon={FaMapMarkerAlt} value={stats.branches} label="Branches" />
      </div>

      {/* Testimonials */}
      <h2>What Our Students Say</h2>
      <div className="wvdi-testimonials-grid">
        {testimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} {...testimonial} />
        ))}
      </div>
    </section>
  );
}

export default TestimonialsSection;
