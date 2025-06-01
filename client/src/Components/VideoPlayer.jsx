import { useRef, useEffect, useState } from "react";

function VideoPlayer({ lectures, currentVideoIndex }) {
  const videoRef = useRef(null);

  const [isMuted, setIsMuted] = useState(true); 

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    const handleKeydown = (e) => {
      // Prevent spacebar from interfering with form inputs
      if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
  
      switch (e.code) {
        case "Space":
          e.preventDefault();
          if (video.paused) {
            video.play();
          } else {
            video.pause();
          }
          break;
        case "ArrowRight":
          video.currentTime += 10;
          break;
        case "ArrowLeft":
          video.currentTime -= 10;
          break;
        case "ArrowUp":
          video.volume = Math.min(video.volume + 0.1, 1);
          break;
        case "ArrowDown":
          video.volume = Math.max(video.volume - 0.1, 0);
          break;
        case "KeyF":
          if (document.fullscreenElement) {
            document.exitFullscreen();
          } else {
            video.requestFullscreen();
          }
          break;
        case "KeyM":
          video.muted = !video.muted;
          setIsMuted(video.muted); // Correct state update
          break;
        default:
          break;
      }
    };
  
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, []);
  

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <video
      ref={videoRef}
      className="object-fill rounded-lg w-full shadow-md transition-all duration-300 group-hover:shadow-xl"
      src={lectures && lectures[currentVideoIndex]?.lecture?.secure_url}
      controls
      disablePictureInPicture
      muted = {isMuted}
      controlsList="nodownload"
      onDoubleClick={toggleFullscreen} // Double Click Fullscreen
    ></video>
  );
}

export default VideoPlayer;
