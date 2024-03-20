// BackgroundImage.js
import React, { useEffect } from 'react';

const Background = ({ imageUrl, children }) => {
  useEffect(() => {
    // Set background image on the body or html element
    document.body.style.backgroundImage = `url("${imageUrl}")`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundRepeat = 'no-repeat';

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.style.backgroundImage = '';
      document.body.style.backgroundSize = '';
      document.body.style.backgroundPosition = '';
      document.body.style.backgroundRepeat = '';
    };
  }, [imageUrl]);

  return (
    <div>
      {children}
    </div>
  );
};

export default Background;
