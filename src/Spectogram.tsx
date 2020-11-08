import * as React from 'react';
import { boundClass } from 'autobind-decorator';
import * as Color from 'color';


import Tool from './Tool';


const FFT_SIZE = 8192;
const MAX_FREQUENCY = 4000;
const SAMPLE_RATE = 48000;  // Ideally we would deduct this from audioSource, but this makes
                            // calculating the canvas size a bit awkward.
const BIN_SIZE = SAMPLE_RATE / FFT_SIZE;
const HEIGHT = Math.ceil(MAX_FREQUENCY / BIN_SIZE);  // FFT_SIZE / 2 means the entire spectrum is shown
const WIDTH = 500;


const SOURCE_COLOR_MAP: ReadonlyArray<[number, Color]> = [
  [  0, Color.hsv(240, 60, 95).alpha(0.00)],  // Blue
  [ 31, Color.hsv(240, 60, 95).alpha(0.00)],  // Blue
  [ 87, Color.hsv(240, 60, 95).alpha(0.40)],  // Blue
  [143, Color.hsv(300, 60, 95).alpha(0.60)],  // Purple
  [199, Color.hsv(  0, 60, 95).alpha(0.80)],  // Red
  [255, Color.hsv( 60, 60, 95).alpha(1.00)],  // Yellow
];


interface SpectogramState {
  error: Error,
  paused: boolean,
}



@boundClass
export default class Spectogram extends Tool<{}, SpectogramState> {
  static title = 'Spectogram';

  private canvas = React.createRef<HTMLCanvasElement>();

  private audioStream: MediaStream;
  private audioContext: AudioContext;
  private analyzer: AnalyserNode;
  private audioSource: MediaStreamAudioSourceNode;

  private frameIndex = 0;
  private audioData = new Uint8Array(HEIGHT);
  private imageData = new ImageData(1, HEIGHT);

  private colorMap = this.buildColorMap(SOURCE_COLOR_MAP);


  constructor(props) {
    super(props);

    this.state = {
      error: null,
      paused: false,
    };
  }



  render() {
    let error = null;
    if(this.state.error) {
      error = (
        <div className="error-notice__wrapper">
          <div className="error-notice">
            {this.state.error.message}
          </div>
        </div>
      );
    }

    return (
      <React.Fragment>
        <canvas
          ref={this.canvas}
          width={WIDTH}
          height={HEIGHT}
          className="w-screen h-screen"
        ></canvas>
        {error}
      </React.Fragment>
    );
  }


  async componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown);

    try {
      this.audioStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      this.audioContext = new window.AudioContext();
      this.analyzer = new AnalyserNode(this.audioContext, {
        fftSize: FFT_SIZE,
      });
      this.audioSource = this.audioContext.createMediaStreamSource(this.audioStream);
      this.audioSource.connect(this.analyzer);

      this.updateCanvas();

    } catch(e: any) {
      this.setState({
        error: e
      });
    }
  }


  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown);

    this.audioStream.getTracks().forEach(track => {
      track.stop();
    });
  }


  onKeyDown(event) {
    if(event.code === 'Space') {
      this.setState({
        paused: !this.state.paused,
      });
    }
  }


  updateCanvas() {
    if(!this.canvas.current) {
      return;
    }

    if(!this.state.paused) {
      this.drawCanvas();
    }

    requestAnimationFrame(this.updateCanvas);
  }


  drawCanvas() {
    let canvas = this.canvas.current;
    let ctx = canvas.getContext('2d');

    let position = this.frameIndex;
    if(this.frameIndex >= WIDTH) {
      let imageData = ctx.getImageData(1, 0, WIDTH - 1, HEIGHT);
      ctx.putImageData(imageData, 0, 0);
      position = WIDTH - 1;
    }
    this.frameIndex++;

    this.analyzer.getByteFrequencyData(this.audioData);
    this.getImageData(this.audioData, this.imageData);
    ctx.putImageData(this.imageData, position, 0);
  }


  getImageData(audioData: Uint8Array, imageData: ImageData) {
    for(let i = 0; i < HEIGHT; i++) {
      let audioLevel = audioData[i];
      this.getImagePixel(audioLevel, imageData, audioData.length - i - 1);
    }
  }


  getImagePixel(audioLevel: number, imageData: ImageData, index: number) {
    let color = this.colorMap[audioLevel];
    imageData.data[4 * index + 0] = color[0];
    imageData.data[4 * index + 1] = color[1];
    imageData.data[4 * index + 2] = color[2];
    imageData.data[4 * index + 3] = color[3];
  }


  buildColorMap(sourceMap: ReadonlyArray<[number, Color]>): number[][] {
    let map: number[][] = [];
    for(let level = 0; level < 256; level++) {
      let color: Color = this.mapColor(level, sourceMap);
      map.push([
        Math.round(color.red()),
        Math.round(color.green()),
        Math.round(color.blue()),
        Math.round(color.alpha() * 255),
      ]);
    }
    return map;
  }


  mapColor(level: number, sourceMap: ReadonlyArray<[number, Color]>) {
    let toColorIndex = 1;
    while(sourceMap[toColorIndex][0] < level) {
      toColorIndex++;
    }

    let fromColorLevel: number = sourceMap[toColorIndex - 1][0];
    let fromColor: Color = sourceMap[toColorIndex - 1][1];
    let toColorLevel: number = sourceMap[toColorIndex][0];
    let toColor: Color = sourceMap[toColorIndex][1];
    let mix = (level - fromColorLevel) / (toColorLevel - fromColorLevel);

    return fromColor.mix(toColor, mix);
  }
}
