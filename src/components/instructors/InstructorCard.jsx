import React from 'react';
import instructorImages from '../../assets/instructorImages';

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

  // Get the instructor image from our imported map
  const instructorImage = instructorImages[p.id];
  
  // Get preferred name for the button (nickname or first name)
  const getPreferredName = () => {
    if (p.id === 'ferdinand-jil-sulat-jadia') return 'Toto';
    if (p.id === 'marc-celes-jadia') return 'Bimbo';
    return p.name.split(' ')[0]; // Default to first name for other instructors
  };

  return (
    <article className="wvdi-card" itemScope itemType="https://schema.org/Person">
      <img src={instructorImage} alt={`${p.name} – Driving Instructor`} loading="lazy" />
      <h3 itemProp="name">{p.name}</h3>

      <p className="wvdi-accred" itemProp="identifier">
        LTO Acc. #: <strong>{p.accreditationNo}</strong>
      </p>

      <p className="wvdi-seniority">
        Since <strong>{p.seniority}</strong>
      </p>

      <p className="wvdi-bio" itemProp="description">{p.bio}</p>

      <footer>
        <button
          className="wvdi-cta"
          style={{ margin: '1rem 0', padding: '0.75rem 1.5rem', fontSize: '1rem' }}
          onClick={handleBook}
        >
          Book with {getPreferredName()}
        </button>
      </footer>
    </article>
  );
}
