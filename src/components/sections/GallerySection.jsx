import React, { useState, useEffect } from 'react';

function GallerySection() {
  const [images, setImages] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);

  useEffect(() => {
    // Dynamic import of all gallery images
    const imageModules = import.meta.glob('../../assets/gallery/*.{png,webp,jpg,jpeg}', {
      eager: true,
      import: 'default'
    });

    const loadedImages = Object.entries(imageModules).map(([path, src], index) => ({
      src,
      alt: `Gallery image ${index + 1}`,
      id: index
    }));

    setImages(loadedImages);
  }, []);

  const openLightbox = (imageSrc) => {
    setLightboxImage(imageSrc);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'auto';
  };

  // Handle Escape key to close lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightboxImage) {
        closeLightbox();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage]);

  return (
    <>
      <section className="wvdi-gallery">
        <h2>Photo Gallery</h2>
        <p>Discover our facilities, vehicles, and training environment:</p>
        <div className="wvdi-gallery-images">
          {images.map((image) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              loading="lazy"
              onClick={() => openLightbox(image.src)}
            />
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div className="wvdi-lightbox" onClick={closeLightbox}>
          <div className="wvdi-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <span className="wvdi-lightbox-close" onClick={closeLightbox}>
              &times;
            </span>
            <img src={lightboxImage} alt="Enlarged gallery image" />
          </div>
        </div>
      )}
    </>
  );
}

export default GallerySection;
