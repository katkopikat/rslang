import React from 'react';
import ReactPlayer from 'react-player';
import './Video.scss';

const Video = () => (
  <div className="player-wrapper">
    <ReactPlayer
      className="react-player"
      url="https://www.youtube.com/watch?v=ApGPxHjryHY"
      light="../../assets/img/video.jpg"
      playIcon={<img alt="play" src="../../assets/img/play.png" />}
      controls
      width="100%"
      height="100%"
    />
  </div>
);

export default Video;
