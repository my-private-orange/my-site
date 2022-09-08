<template>
  <div class="container">
    <a-scene
      mindar-image="imageTargetSrc: https://img.vrwenbo.com/xv3h2limkgcy41swaq0597ro68fzndpt.mind;"
      color-space="sRGB"
      renderer="colorManagement: true, physicallyCorrectLights"
      vr-mode-ui="enabled: false"
      device-orientation-permission-ui="enabled: false"
    >
      <a-assets>
        <img
          id="word"
          crossOrigin="Anonymous"
          :src="wordImageUrl"
        />
        <!-- <a-asset-item
          id="avatarModel"
          src="https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/image-tracking/assets/card-example/softmind/scene.gltf"
        ></a-asset-item> -->
      </a-assets>

      <a-camera
        position="0 0 0"
        look-controls="enabled: false"
      ></a-camera>
      <a-entity
        id="target-1"
        mindar-image-target="targetIndex: 0"
      >
        <a-plane
          id="word-plane-1"
          material="transparent: true"
          src="#word"
          position="0 0 0"
          :height="387 / 366"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
      <a-entity
        id="target-2"
        mindar-image-target="targetIndex: 1"
      >
        <a-plane
          id="word-plane-2"
          material="transparent: true"
          src="#word"
          position="0 0 0"
          :height="387 / 366"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
      <a-entity
        id="target-3"
        mindar-image-target="targetIndex: 2"
      >
        <a-plane
          id="word-plane-3"
          material="transparent: true"
          src="#word"
          position="0 0 0"
          :height="387 / 366"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
      <a-entity
        id="target-4"
        mindar-image-target="targetIndex: 3"
      >
        <a-plane
          id="word-plane-4"
          material="transparent: true"
          src="#word"
          position="0 0 0"
          :height="387 / 366"
          width="1"
          rotation="0 0 0"
        ></a-plane>
      </a-entity>
    </a-scene>
  </div>
</template>

<script setup>
// mindar-image="imageTargetSrc: https://cdn.jsdelivr.net/gh/hiukim/mind-ar-js@1.1.5/examples/image-tracking/assets/card-example/card.mind;"

import { useRouter } from 'vue-router';
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

const router = useRouter();
const to = (value) => {
  router.push(value);
};
let imageIndex = 1;
const wordImageUrl = ref('');
onMounted(() => {
  document.querySelector('a-scene').addEventListener('arReady', () => {
    console.log('ar-ready');
    window.dispatchEvent(window.pageLoadedEvent);
  });
  for (var i = 1; i <= 4; i++) {
    (function (index) {
      const wordIndex = index;
      const targetElem = document.querySelector(`#target-${index}`);
      targetElem.addEventListener('targetFound', () => {
        wordImageUrl.value = new URL(`../assets/image/words/${imageIndex}_${wordIndex}-min.png`, import.meta.url).href;
        console.log('targetFound', index);
      });
      targetElem.addEventListener('targetLost', () => {
        console.log('targetLost', index);
        if (imageIndex === 28) {
          imageIndex = 1;
        } else {
          imageIndex++;
        }
        document.querySelector(`#word-plane-${index}`).setAttribute('src', '');
        wordImageUrl.value = new URL(`../assets/image/words/${imageIndex}_${wordIndex}-min.png`, import.meta.url).href;
        // wordImageUrl.value = new URL(`../assets/image/test.png`, import.meta.url).href;
        nextTick(() => {
          document.querySelector(`#word-plane-${index}`).setAttribute('src', '#word');
        });
      });
    })(i);
  }
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
