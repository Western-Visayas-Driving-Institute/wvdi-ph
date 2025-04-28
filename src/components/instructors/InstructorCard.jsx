import React from 'react';

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

  // Add timestamp to force image refresh
  const imageUrl = `${p.photo}?v=${new Date().getTime()}`;

  return (
    <article className="wvdi-card" itemScope itemType="https://schema.org/Person">
      <img src={imageUrl} alt={`${p.name} – Driving Instructor`} loading="lazy" />
      <h3 itemProp="name">{p.name}</h3>

      <p className="wvdi-accred" itemProp="identifier">
        LTO Acc. #: <strong>{p.accreditationNo}</strong>
      </p>
      <p className="wvdi-validity">
        Valid&nbsp;until {new Date(p.validTo).toLocaleDateString()}
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
