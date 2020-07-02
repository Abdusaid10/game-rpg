class Sound {
  constructor() {
    this.sound_on = true;
    this.music_on = true;
    this.bg_music_playing = false;
  }

  set musicOn(value) {
    this.music_on = value;
  }

  get musicOn() {
    return this.music_on;
  }

  set soundOn(value) {
    this.sound_on = value;
  }

  get soundOn() {
    return this.sound_on;
  }

  set bgMusicPlaying(value) {
    this.bg_music_playing = value;
  }

  get bgMusicPlaying() {
    return this.bg_music_playing;
  }
}

export { Sound as default };