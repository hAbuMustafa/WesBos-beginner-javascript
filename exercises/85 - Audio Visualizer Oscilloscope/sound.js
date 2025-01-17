import { $, hslToRgb } from './utils';

const WIDTH = 1500;
const HEIGHT = 1500;

const canvas = $('canvas');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;

let analyzer;
let bufferLength;

async function getAudio() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  analyzer.fftSize = 2 ** 8;
  bufferLength = analyzer.frequencyBinCount;

  const timeData = new Uint8Array(bufferLength);
  const freqData = new Uint8Array(bufferLength);

  drawTimeData(timeData);
  drawFreqData(freqData);
}

function drawTimeData(timeData) {
  analyzer.getByteTimeDomainData(timeData);
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;

  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;

    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });
  ctx.stroke();

  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFreqData(freqData) {
  analyzer.getByteFrequencyData(freqData);

  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;

  freqData.forEach((amount) => {
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const [r, g, b] = hslToRgb(h, s, l);
    const barHeight = HEIGHT * percent;
    ctx.fillStyle = `rgb(${r},${g},${b},0.2)`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  });

  requestAnimationFrame(() => drawFreqData(freqData));
}

getAudio();
