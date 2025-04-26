import React, { useState, useEffect } from 'react';
import autoPng from './assets/Automatic.png';
import instructorsJpg from './assets/instructors.jpg';
import motorLesson from './assets/motor lesson.jpg';

const images = [
  { src: autoPng, alt: 'Automatic Car' },
  { src: instructorsJpg, alt: 'Instructors' },
  { src: motorLesson, alt: 'Motor Lesson' },
];

export default function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className="wvdi-carousel">
      <button className="wvdi-carousel-btn prev" onClick={prev} aria-label="Previous image">&#8592;</button>
      <img
        src={images[current].src}
        alt={images[current].alt}
        className="wvdi-carousel-img"
      />
      <button className="wvdi-carousel-btn next" onClick={next} aria-label="Next image">&#8594;</button>
      <div className="wvdi-carousel-dots">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={idx === current ? 'wvdi-dot active' : 'wvdi-dot'}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
}
