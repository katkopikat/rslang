import { API_URL } from '../constants';

class AudioPlayer {
  private audio = new Audio();

  private playlist: string[] = [];

  private playingIndex = 0;

  constructor() {
    this.audio.onended = this.playNext;
  }

  updatePlaylist = (paths: string[]) => {
    this.audio.pause();
    this.playlist = paths;
  };

  // play one file (path) or playlist (no path)
  play = (path?: string) => {
    if (path) {
      this.playlist = [] as string[];
      this.playPath(path);
    } else {
      this.playingIndex = 0;
      this.playByIndex(this.playingIndex);
    }
  };

  private playNext = () => {
    this.playingIndex += 1;
    this.playByIndex(this.playingIndex);
  };

  private playByIndex = (index: number) => {
    const path = this.playlist[index];
    if (path) this.playPath(path);
  };

  private playPath = (path: string) => {
    this.audio.src = `${API_URL}/${path}`;
    this.audio.currentTime = 0;
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.audio.play();
  };
}

const player = new AudioPlayer();

export default player;
