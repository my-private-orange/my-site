<template>
  <div class="container">
    <a-scene
      mindar-image="imageTargetSrc: target_statue.mind;"
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <!-- <a-assets>
        <img
          id="card"
          src="../assets/image/statue-marker.jpeg"
        />
      </a-assets> -->

      <a-camera
        position="0 0 0"
        look-controls="enabled: false"
      ></a-camera>
      <a-entity
        :id="`target-${index}`"
        :mindar-image-target="`targetIndex: ${index}`"
        v-for="(url, index) in urls"
        :key="index"
      >
        <a-plane
          :id="`card-plane-${index}`"
          position="0 0 0"
          :height="1280 / 960"
          width="1"
          rotation="0 0 0"
          material="opacity: 0; transparent: true;"
        ></a-plane>
      </a-entity>
    </a-scene>
  </div>
</template>

<script setup>
// mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/image-tracking/assets/card-example/card.mind;"

import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';
import { MAX_UNSIGNED_VALUE } from 'long';
const router = useRouter();
const to = (value) => {
  router.push(value);
};
const init = ref(false);
const urls = ref([
  'https://tool.vrwen.com/#/modelDetail?id=84656818026057728&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=84690793993998336&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=84969318911184896&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85023007524917248&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85038579000152064&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85053199677001728&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85314352500051968&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85330228930547712&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85379515156664320&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=88292836885270528&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=86141632457609216&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=86100401790783488&type=1',
  'https://tool.vrwen.com/#/modelDetail?id=85687192885792768&type=1',
]);
let imageIndex = 1;
onMounted(() => {
  window.dispatchEvent(window.pageLoadedEvent);
  if (!init.value) {
    for (var i = 0; i <= urls.value.length - 1; i++) {
      (function (index) {
        const targetElem = document.querySelector(`#target-${index}`);
        targetElem.addEventListener('targetFound', () => {
          console.log('targetFound', index);
          window.location.assign(urls.value[index]);
        });
        targetElem.addEventListener('targetLost', () => {
          console.log('targetLost', index);
        });
      })(i);
    }
    init.value = true;
  }
  // document.querySelector('a-scene').addEventListener('arReady', () => {
  //   console.log('ar-ready');

  // });
});
onBeforeUnmount(() => {
  document.querySelectorAll('.mindar-ui-overlay').forEach((elem) => elem.remove());
});
</script>

<style scoped lang="scss">
@import '../utils.scss';
.container {
  height: 100%;
  width: 100%;
  position: relative;
}
</style>
