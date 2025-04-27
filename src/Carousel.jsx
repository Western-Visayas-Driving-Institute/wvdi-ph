import React, { useState, useEffect } from 'react';
import img1 from './assets/carroussel/20250419_154231.jpg';
import img2 from './assets/carroussel/20250419_154533.jpg';
import img3 from './assets/carroussel/327566808_722893742752791_5223380376576230867_n.jpg';
import img4 from './assets/carroussel/489759159_1105053924991996_7787271511780815861_n (1).jpg';

const images = [
  { src: img1, alt: '20250419_154231' },
  { src: img2, alt: '20250419_154533' },
  { src: img3, alt: '327566808_722893742752791_5223380376576230867_n' },
  { src: img4, alt: '489759159_1105053924991996_7787271511780815861_n (1)' },
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
    <div>
      <div className="wvdi-carousel">
        <button className="wvdi-carousel-btn prev" onClick={prev} aria-label="Previous image">&#8592;</button>
        <img
          src={images[current].src}
          alt={images[current].alt}
          className="wvdi-carousel-img"
        />
        <button className="wvdi-carousel-btn next" onClick={next} aria-label="Next image">&#8594;</button>
      </div>
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
