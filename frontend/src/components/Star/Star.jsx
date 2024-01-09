import React, { useState, useEffect } from 'react';

const Star = ({ filled, size, onClick }) => {
  const [starColor, setStarColor] = useState(filled ? '#ffd700' : '#808080');
  const [isClickable, setIsClickable] = useState(true);

  useEffect(() => {
    // Reset color when filled prop changes
    setStarColor(filled ? '#ffd700' : '#808080');
  }, [filled]);

  const handleMouseEnter = () => {
    if (isClickable) {
      setStarColor('#ffd700'); // Set color to yellow on hover
    }
  };

  const handleMouseLeave = () => {
    if (isClickable) {
      setStarColor(filled ? '#ffd700' : '#808080'); // Reset color on mouse leave
    }
  };

  const handleClick = () => {
    if (isClickable && onClick) {
      onClick();
      setStarColor('#ffd700'); // Set color to yellow when clicked
      setIsClickable(false); // Disable further clicks
    }
  };

  const starStyle = {
    color: starColor,
    fontSize: size || '40px',
  };

  return (
    <span
      style={starStyle}
      className='shadow'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      &#9733;
    </span>
  );
};

export default Star;
