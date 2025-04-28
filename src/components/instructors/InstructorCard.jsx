import React from 'react';
import { instructorImages } from '../../assets/instructors';

export default function InstructorCard({ p }) {
  const handleBook = (e) => {
    e.preventDefault();
    const formSection = document.getElementById('contact');
    if (formSection) {
      // Add instructor name to form description if present
      const descInput = formSection.querySelector('textarea[name="description"], input[name="description"]');
      if (descInput) {
        descInput.value = `I'd like to book a lesson with ${p.name}. `;
        descInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.hash = `#contact?instructor=${encodeURIComponent(p.name)}`;
    }
  };

  // Get the proper image from our imports
  const instructorImage = instructorImages[p.id];
  
  // Add timestamp for cache busting
  const timestamp = new Date().getTime();

  return (
    <article className="wvdi-card" itemScope itemType="https://schema.org/Person">
      <img src={instructorImage} alt={`${p.name} – Driving Instructor`} loading="lazy" />
      <h3 itemProp="name">{p.name}</h3>

      <p className="wvdi-accred" itemProp="identifier">
        LTO Acc. #: <strong>{p.accreditationNo}</strong>
      </p>

      <ul className="wvdi-courses">
        {p.courses.map(c => <li key={c}>{c}</li>)}
      </ul>

      <p className="wvdi-bio" itemProp="description">{p.bio}</p>

      <footer>
        <button className="wvdi-button wvdi-button-primary" onClick={handleBook}>
          Book with {p.name.split(' ')[0]}
        </button>
      </footer>
    </article>
  );
}
