/* eslint-env jasmine */
/* eslint-disable no-use-before-define */
import TestHelpers from './test-helpers';

let audioElement;
let wavesurfer;
export function sharedTests(backend) {
  let element;
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

  beforeEach(() => {
    audioElement = TestHelpers.createElement('testAudio', 'audio');
    const wave = TestHelpers.createWaveform({
      container: TestHelpers.createElement(),
      waveColor: 'red',
      progressColor: 'orange',
      cursorColor: 'white',
      backend
    });
    wavesurfer = wave[0];
    element = wave[1];
  });

  afterEach(() => {
    wavesurfer.destroy();
    TestHelpers.removeElement(element);
  });
  /**
   * @test {WaveSurfer#isReady}
   */
  it('should be ready', done => {
    wavesurfer.once('ready', done);
    loadElement();
  });

  /**
   * @test {WaveSurfer#waveform-ready} When the waveform is drawn, the 'waveform-ready' event is triggered
   */
  it('should fire waveform-ready event when the waveform is drawn', done => {
    const waveformReadySpy = jasmine.createSpy('waveform-ready-spy');

    wavesurfer.on('waveform-ready', () => {
      waveformReadySpy();

      expect(waveformReadySpy).toHaveBeenCalledTimes(1);

      done();
    });

    loadAudioPeaks();
  });

  /**
   * @test {WaveSurfer#play}
   * @test {WaveSurfer#isPlaying}
   */
  it('should play', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.play();

      expect(wavesurfer.isPlaying()).toBeTrue();

      done();
    });
    loadElement();
  });

  /**
   * @test {WaveSurfer#play}
   * @test {WaveSurfer#isPlaying}
   * @test {WaveSurfer#pause}
   */
  it('should pause', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.play();
      expect(wavesurfer.isPlaying()).toBeTrue();

      wavesurfer.pause();
      expect(wavesurfer.isPlaying()).toBeFalse();

      done();
    });
    loadElement();
  });

  /**
   * @test {WaveSurfer#playPause}
   * @test {WaveSurfer#isPlaying}
   */
  it('should play or pause', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.playPause();
      expect(wavesurfer.isPlaying()).toBeTrue();

      wavesurfer.playPause();
      expect(wavesurfer.isPlaying()).toBeFalse();

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#getDuration}  */
  it('should get duration', done => {
    wavesurfer.once('ready', () => {
      const duration = parseInt(wavesurfer.getDuration(), 10);
      expect(duration).toEqual(TestHelpers.EXAMPLE_FILE_DURATION);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#getCurrentTime}  */
  it('should get currentTime', done => {
    wavesurfer.once('ready', () => {
      // initially zero
      let time = wavesurfer.getCurrentTime();
      expect(time).toEqual(0);

      // seek to 50%
      wavesurfer.seekTo(0.5);
      time = parseInt(wavesurfer.getCurrentTime(), 10);
      expect(time).toEqual(10);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#setCurrentTime}  */
  it('should set currentTime', done => {
    wavesurfer.once('ready', () => {
      // initially zero
      let time = wavesurfer.getCurrentTime();
      expect(time).toEqual(0);

      // set to 10 seconds
      wavesurfer.setCurrentTime(10);
      time = wavesurfer.getCurrentTime();
      expect(time).toEqual(10);

      // set to something higher than duration
      wavesurfer.setCurrentTime(1000);
      time = wavesurfer.getCurrentTime();
      // sets it to end of track
      time = parseInt(wavesurfer.getCurrentTime(), 10);
      expect(time).toEqual(TestHelpers.EXAMPLE_FILE_DURATION);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#skipBackward}  */
  it('should skip backward', done => {
    wavesurfer.once('ready', () => {
      // seek to 50%
      wavesurfer.seekTo(0.5);

      // skip 4 seconds backward
      wavesurfer.skipBackward(4);
      let time = wavesurfer.getCurrentTime();
      expect(time).toBeWithinRange(6.88, 6.89);

      // skip backward with params.skipLength (default: 2 seconds)
      wavesurfer.skipBackward();
      time = wavesurfer.getCurrentTime();
      expect(time).toBeWithinRange(4.88, 4.89);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#skipForward}  */
  it('should skip forward', done => {
    wavesurfer.once('ready', () => {
      // skip 4 seconds forward
      wavesurfer.skipForward(4);
      let time = wavesurfer.getCurrentTime();
      expect(time).toBeWithinRange(3.99, 4);

      // skip forward with params.skipLength (default: 2 seconds)
      wavesurfer.skipForward();
      time = wavesurfer.getCurrentTime();
      expect(time).toBeWithinRange(5.99, 6);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#getPlaybackRate}  */
  it('should get playback rate', done => {
    wavesurfer.once('ready', () => {
      const rate = wavesurfer.getPlaybackRate();
      expect(rate).toEqual(1);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#setPlaybackRate}  */
  it('should set playback rate', done => {
    wavesurfer.once('ready', () => {
      const rate = 0.5;
      wavesurfer.setPlaybackRate(rate);

      expect(wavesurfer.getPlaybackRate()).toEqual(rate);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#getVolume}  */
  it('should get volume', done => {
    audioElement.volume = 0.3;
    wavesurfer.once('ready', () => {
      const volume = wavesurfer.getVolume();
      expect(volume).toEqual(audioElement.volume);

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#setVolume}  */
  it('should set volume', done => {
    const targetVolume = 0.5;

    wavesurfer.once('volume', result => {
      expect(result).toEqual(targetVolume);
      expect(wavesurfer.getVolume()).toEqual(targetVolume);

      done();
    });

    wavesurfer.once('ready', () => {
      wavesurfer.setVolume(targetVolume);
    });
    loadElement();
  });

  /** @test {WaveSurfer#toggleMute}  */
  it('should toggle mute', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.toggleMute();
      expect(wavesurfer.isMuted).toBeTrue();

      wavesurfer.toggleMute();
      expect(wavesurfer.isMuted).toBeFalse();

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#setMute}  */
  it('should set mute', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.setMute(true);
      expect(wavesurfer.isMuted).toBeTrue();

      wavesurfer.setMute(false);
      expect(wavesurfer.isMuted).toBeFalse();

      done();
    });
    loadElement();
  });

  /** @test {WaveSurfer#getMute}  */
  it('should get mute', done => {
    wavesurfer.once('ready', () => {
      wavesurfer.setMute(true);
      expect(wavesurfer.getMute()).toBeTrue();

      wavesurfer.setMute(false);
      expect(wavesurfer.getMute()).toBeFalse();

      done();
    });
    loadElement();
  });
}

export function sharedErrorTests(backend) {
  let element;

  beforeEach(() => {
    element = TestHelpers.createElement('test');
  });

  afterEach(() => {
    TestHelpers.removeElement(element);
  });

  /**
   * @test {WaveSurfer}
   */
  it('throw when load is called with invalid HTMLMediaElement', () => {
    const wave = TestHelpers.createWaveform({
      container: '#test',
      backend
    });
    expect(() => {
      wave[0].load({
        foo: 'bar'
      });
    }).toThrow(new Error('media parameter is not a valid media element'));
  });
}
function loadElement() {
  // set src
  audioElement.src = TestHelpers.EXAMPLE_FILE_PATH;
  wavesurfer.load(audioElement);
}

/** Retrieve normalized waveform peaks, then load an audio resource giving peaks and setting preload attribute to 'none' * */
function loadAudioPeaks() {
  TestHelpers.getPeaks(TestHelpers.EXAMPLE_STEREO_FILE_JSON_PATH, peaks => {
    const src = TestHelpers.EXAMPLE_STEREO_FILE_PATH;

    wavesurfer.load(src, peaks, 'none', TestHelpers.EXAMPLE_STEREO_FILE_DURATION);
  });
}
