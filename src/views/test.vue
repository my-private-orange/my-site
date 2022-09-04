<template>
  <video
    class="layer"
    src=""
    muted
    webkit-playsinline
    playsinline
    x5-playsinline
    style="left: 1000%"
  ></video>
  <canvas
    id="canvaselement"
    width="1920"
    height="1080"
  ></canvas>
</template>

<script setup>
import { onMounted } from 'vue';

onMounted(() => {
  const videoElement = document.querySelector('video');
  console.log(videoElement);
  const h = (stream) => {
    console.log(stream);
    'srcObject' in videoElement ? ((videoElement.src = ''), (videoElement.srcObject = stream)) : (videoElement.src = URL.createObjectURL(stream));
    videoElement.play();
  };
  var s = {
    audio: true,
    video: { width: 1920, height: 1080 },
  };
  const d = (err) => {
    console.error(err);
  };
  navigator.mediaDevices && navigator.mediaDevices.getUserMedia
    ? navigator.mediaDevices.getUserMedia(s).then(h, d)
    : navigator.getUserMedia
    ? navigator.getUserMedia(s, h, d)
    : a(new Error('当前浏览器不支持打开摄像头'));

  const canvas = document.querySelector('canvas');
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  var ctx = canvas.getContext('2d', { alpha: false });

  function drawImage(video) {
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  var fps = 60;

  const canvasInterval = window.setInterval(() => {
    drawImage(videoElement);
  }, 1000 / fps);
});
</script>

<style>
.layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
