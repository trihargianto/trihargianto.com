const Video = ({ webm, mp4 }) => {
  return (
    <video loop muted playsInline autoPlay width="100%">
      <source src={webm} type="video/webm" />
      <source src={mp4} type="video/mp4" />
    </video>
  );
};

export default Video;
