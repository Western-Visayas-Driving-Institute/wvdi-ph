import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import faqData from '../../data/faq.json';

function FAQItem({ question, answer, isOpen, onClick }) {
  return (
    <div className={`wvdi-faq-item ${isOpen ? 'open' : ''}`}>
      <button className="wvdi-faq-question" onClick={onClick} aria-expanded={isOpen}>
        <span>{question}</span>
        <FaChevronDown className="wvdi-faq-icon" />
      </button>
      <div className="wvdi-faq-answer">
        <p>{answer}</p>
      </div>
    </div>
  );
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="wvdi-faq-section">
      <h2>Frequently Asked Questions</h2>
      <p className="wvdi-faq-intro">
        Have questions? We've got answers. If you don't find what you're looking for, feel free to contact us.
      </p>
      <div className="wvdi-faq-list">
        {faqData.map((item, index) => (
          <FAQItem
            key={index}
            question={item.question}
            answer={item.answer}
            isOpen={openIndex === index}
            onClick={() => handleToggle(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default FAQSection;
