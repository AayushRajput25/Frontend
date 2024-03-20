import React, { useRef } from "react";

function ForContent() {
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <div>
        <div className="forVideo">
            
        <video  ref={videoRef} controls>
            <source src="./videos/video1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <button onClick={handlePlayPause}>Play/Pause</button>
        </div>

        <div className="forText">
            
        </div>    
    </div>
  );
}

export default ForContent;

