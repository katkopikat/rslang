export default function toggleFullScreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else if (document.fullscreenEnabled) {
    document.exitFullscreen();
  }
}
