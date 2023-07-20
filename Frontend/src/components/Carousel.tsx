import React, { useState } from 'react';

interface CarouselProps {
  slides: string[];
  slidesToShow: number;
}

const Carousel: React.FC<CarouselProps> = ({ slides, slidesToShow }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = (): void => {
    setCurrentSlide(currentSlide - 1);
  };

  const handleNext = (): void => {
    setCurrentSlide(currentSlide + 1);
  };

  const containerStyles: React.CSSProperties = {
    width: '100%',
    overflow: 'hidden',
    position: 'relative',
  };

  const slideStyles: React.CSSProperties = {
    display: 'flex',
    transition: 'transform 0.3s ease-in-out',
    transform: `translateX(-${currentSlide * (100 / slidesToShow)}%)`,
  };

  const arrowStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    fontSize: '24px',
    padding: '8px 16px',
    cursor: 'pointer',
  };

  const leftArrowStyles: React.CSSProperties = {
    ...arrowStyles,
    left: 0,
  };

  const rightArrowStyles: React.CSSProperties = {
    ...arrowStyles,
    right: 0,
  };

  return (
    <div className="carousel-container" style={containerStyles}>
      <div className="carousel-slides" style={slideStyles}>
        {slides.map((slide, index) => (
          <div
            key={index}
            className="carousel-slide"
            style={{ width: `${100 / slidesToShow}%` }}
          >
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
        {slides.slice(0, slidesToShow).map((slide, index) => (
          <div
            key={`clone-${index}`}
            className="carousel-slide"
            style={{ width: `${100 / slidesToShow}%` }}
          >
            <img src={slide} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>
      {currentSlide > 0 && (
        <div
          className="carousel-arrow carousel-arrow--left"
          style={leftArrowStyles}
          onClick={handlePrev}
        >
          &#8249;
        </div>
      )}
      {currentSlide < slides.length - slidesToShow && (
        <div
          className="carousel-arrow carousel-arrow--right"
          style={rightArrowStyles}
          onClick={handleNext}
        >
          &#8250;
        </div>
      )}
    </div>
  );
};

export default Carousel;
