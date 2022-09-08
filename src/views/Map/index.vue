<template>
  <div class="content">
    <audio id="audio" />
    <!-- <my-navigation-bar title="智慧孔庙"></my-navigation-bar> -->
    <page-frame ref="frame">
      <div class="title">
        同安孔庙平面导览图
        <!-- {{this.transformOrigin.map(i => i.toFixed(2)).join(', ')}} -->
      </div>
      <canvas
        id="canvas"
        type="2d"
        :style="{ height: canvasHeight + 'px', width: '100%' }"
        @mousewheel="onMouseWheel"
        @touchstart="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend="onTouchEnd"
      ></canvas>
      <div :class="['tools', shouldShowAllTools ? 'show-all' : '']">
        <div
          :class="['tool-item', 'toggler', shouldShowAllTools ? 'selected' : '']"
          @click="shouldShowAllTools = !shouldShowAllTools"
        >
          <img
            src="../../assets/image/zhankai_selected.png"
            v-if="shouldShowAllTools"
          />
          <img
            src="../../assets/image/zhankai.png"
            v-else
          />
        </div>
        <div
          :class="['tool-item', !hiddenOverlayIndexs.length ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 1 + 'rem' : 0 }"
          @click="!hiddenOverlayIndexs.length ? (hiddenOverlayIndexs = [0, 1, 2, 3, 4]) : (hiddenOverlayIndexs = [])"
        >
          <img
            src="../../assets/image/all_selected.png"
            v-if="!hiddenOverlayIndexs.length"
          />
          <img
            src="../../assets/image/all.png"
            v-else
          />
        </div>
        <div
          :class="['tool-item', shouldShowOnlyJingdian ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 2 + 'rem' : 0 }"
          @click="hiddenOverlayIndexs = [1, 2, 3, 4]"
        >
          <img
            src="../../assets/image/jingdian_selected.png"
            v-if="shouldShowOnlyJingdian"
          />
          <img
            src="../../assets/image/jingdian.png"
            v-else
          />
        </div>
        <div
          :class="['tool-item', shouldShowOnlyWC ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 3 + 'rem' : 0 }"
          @click="hiddenOverlayIndexs = [0, 1, 3, 4]"
        >
          <img
            src="../../assets/image/wc_selected.png"
            v-if="shouldShowOnlyWC"
          />
          <img
            src="../../assets/image/wc.png"
            v-else
          />
        </div>
        <div
          :class="['tool-item', shouldShowOnlyEntranceAndExit ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 4 + 'rem' : 0 }"
          @click="hiddenOverlayIndexs = [0, 1, 2]"
        >
          <img
            src="../../assets/image/entrance_selected.png"
            v-if="shouldShowOnlyEntranceAndExit"
          />
          <img
            src="../../assets/image/entrance.png"
            v-else
          />
        </div>
        <!-- <div
          :class="['tool-item', shouldShowOnlyExit ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 5 + 'rem' : 0 }"
          @click="hiddenOverlayIndexs = [0, 1, 2, 3]"
        >
          <img src="../../assets/image/exit_selected.png" v-if="shouldShowOnlyExit" />
          <img src="../../assets/image/exit.png" v-else />
        </div> -->
        <div
          :class="['tool-item', shouldShowOnlySecurity ? 'selected' : '']"
          :style="{ top: shouldShowAllTools ? 2.375 * 5 + 'rem' : 0 }"
          @click="hiddenOverlayIndexs = [0, 2, 3, 4]"
        >
          <img
            src="../../assets/image/security_selected.png"
            v-if="shouldShowOnlySecurity"
          />
          <img
            src="../../assets/image/security.png"
            v-else
          />
        </div>
        <div
          :class="['tool-item']"
          :style="{ top: shouldShowAllTools ? 2.375 * 6 + 'rem' : 0 }"
          @click="showModal = true"
        >
          <img src="../../assets/image/tuli.png" />
        </div>
      </div>
      <div
        class="footer"
        :style="{ transform: `scale(0.9)` }"
      >
        <template v-if="isAnimating">
          <styled-button
            class="back-btn"
            @click="initCanvas"
          >
            <!-- <img :src="buttonIconUrl" mode="aspectFit" class="route-icon" /> -->
            返回
          </styled-button>
          <styled-button
            class="darker control-btn"
            darker
            @click="playPause"
          >
            <!-- <img :src="buttonIconUrl" mode="aspectFit" class="route-icon" /> -->
            {{ isWalking ? '暂停' : '继续' }}
          </styled-button>
        </template>
        <template v-else>
          <styled-button
            class="darker"
            darker
            @click="showRoutes"
          >
            <img
              :src="buttonIconUrl"
              mode="aspectFit"
              class="route-icon"
            />
            路线推荐
          </styled-button>
          <styled-button
            class="voice-btn"
            @click="startVoice"
          >
            语音导览
          </styled-button>
        </template>
      </div>
    </page-frame>

    <div
      class="modal"
      v-if="showModal"
    >
      <div class="dialog">
        <styled-title>图例</styled-title>
        <div class="tuli-list">
          <div class="tuli-item">
            <img src="../../assets/image/all.png" />
            <span>全 部</span>
          </div>
          <div class="tuli-item">
            <img src="../../assets/image/jingdian.png" />
            <span>景 点</span>
          </div>
          <div class="tuli-item">
            <img src="../../assets/image/entrance.png" />
            <span>入 口</span>
          </div>
          <div class="tuli-item">
            <img src="../../assets/image/exit.png" />
            <span>出 口</span>
          </div>
          <div class="tuli-item">
            <img src="../../assets/image/wc.png" />
            <span>卫生间</span>
          </div>
          <div class="tuli-item">
            <img src="../../assets/image/security.png" />
            <span>保安室</span>
          </div>
        </div>
        <div class="btns">
          <button @click="showModal = false">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageFrame from '@/components/PageFrame/PageFrame.vue';
import StyledButton from '@/components/StyledButton/StyledButton.vue';
import StyledTitle from '@/components/StyledTitle/StyledTitle.vue';
import { requestAnimationFrame, cancelAnimationFrame } from '@/utils/animation-frame.js';
import {
  mapBgUrl,
  mapJingdianUrl,
  mapBaoAnShiUrl,
  mapGongCeUrl,
  mapRuKouUrl,
  mapChuKouUrl,
  arrowImageDownUrl,
  arrowImageRightUrl,
  arrowImageUpUrl,
  arrowImageLeftUrl,
  personImageUrl,
  buttonIconUrl,
} from './base64-images';
let mapBg, frameContentElem;
let arrowImageUp, arrowImageDown, arrowImageLeft, arrowImageRight, personImage;
let currentIndex = 0;
const lastX = 0.810552811550152;
const lastY = 0.1802407575153829;
let currentX = lastX,
  currentY = lastY,
  currentDirection;
const pathPoints = [];
const DIRECTION_UP = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;
const DIRECTION_RIGHT = 4;

let arrowPoints = [];
arrowPoints.push([lastX, lastY, DIRECTION_DOWN, 0]);
const overlays = [mapJingdianUrl, mapBaoAnShiUrl, mapGongCeUrl, mapRuKouUrl, mapChuKouUrl];
const overlayImages = [];

export default {
  components: {
    PageFrame,
    StyledButton,
    StyledTitle,
    StyledTitle,
  },
  data() {
    return {
      frameHeight: 0,
      frameTopY: 0,
      titleBottomY: 0,
      footerHeight: 0,
      frameContentPaddingBottom: 0,
      canvas: null,
      ctx: null,
      realCanvasWidth: 0,
      realCanvasHeight: 0,
      imageAspectRaito: 1,
      isAnimating: false,
      isWalking: false,
      buttonIconUrl,
      scale: 1,
      transformOrigin: [0.5, 0.5],
      distance: NaN,
      lastPoint: null,
      devicePixelRatio: NaN,
      hasRoute: false,
      shouldShowAllTools: false,
      hiddenOverlayIndexs: [],
      showModal: false,
      hasFinishedWalking: false,
    };
  },
  computed: {
    canvasHeight() {
      console.log('this.frameHeight', this.frameHeight);
      console.log('this.titleBottomY', this.titleBottomY);
      console.log('this.frameTopY', this.frameTopY);
      console.log('this.footerHeight', this.footerHeight);
      console.log('this.frameContentPaddingBottom', this.frameContentPaddingBottom);
      const result = this.frameHeight - (this.titleBottomY - this.frameTopY) - this.footerHeight - this.frameContentPaddingBottom;
      console.log('result', result);
      return result;
    },

    shouldShowOnlyJingdian() {
      return this.hiddenOverlayIndexs.length === 4 && this.hiddenOverlayIndexs.every((val, index) => val === [1, 2, 3, 4][index]);
    },

    shouldShowOnlyWC() {
      return this.hiddenOverlayIndexs.length === 4 && this.hiddenOverlayIndexs.every((val, index) => val === [0, 1, 3, 4][index]);
    },

    shouldShowOnlyEntranceAndExit() {
      return this.hiddenOverlayIndexs.length === 3 && this.hiddenOverlayIndexs.every((val, index) => val === [0, 1, 2][index]);
    },

    shouldShowOnlyExit() {
      return this.hiddenOverlayIndexs.length === 4 && this.hiddenOverlayIndexs.every((val, index) => val === [0, 1, 2, 3][index]);
    },

    shouldShowOnlySecurity() {
      return this.hiddenOverlayIndexs.length === 4 && this.hiddenOverlayIndexs.every((val, index) => val === [0, 2, 3, 4][index]);
    },
    arrowSize() {
      return 0.015873 * this.realCanvasWidth;
    },
  },
  watch: {
    canvasHeight() {
      if (this.canvasHeight > 0) {
        this.$nextTick(() => {
          this.initCanvas();
        });
      }
    },
    hiddenOverlayIndexs() {
      const isWalking = this.isWalking;
      if (this.isAnimating) {
        if (!isWalking) {
          cancelAnimationFrame();
          this.drawFrame();
        } else {
          cancelAnimationFrame();
          this.drawRoute();
        }
      } else {
        this.initCanvas({ keepScale: true });
      }
    },
    startVoice() {},
  },
  mounted() {
    const frameRef = document.querySelector('.frame');
    const frameContentRef = document.querySelector('.frame-content');
    frameContentElem = frameContentRef;
    const titleRef = document.querySelector('.title');
    const footerRef = document.querySelector('.footer');

    const frameRect = frameRef.getBoundingClientRect();
    this.frameHeight = frameRect.height;
    this.frameTopY = frameRect.top;

    const frameContentStyles = getComputedStyle(frameContentRef);
    this.frameContentPaddingBottom = Number(frameContentStyles.getPropertyValue('padding-bottom').replace(/\D+/g, '')) || 0;

    const titleRect = titleRef.getBoundingClientRect();
    this.titleBottomY = titleRect.bottom;

    const footerRect = footerRef.getBoundingClientRect();
    this.footerHeight = footerRect.height;
  },
  methods: {
    showRoutes() {
      if (this.isAnimating) return;
      !this.hasRoute && this.prepareRoutes();
      this.ctx.beginPath();
      this.drawRoute();
    },
    playPause() {
      if (this.hasFinishedWalking) {
        return;
      }
      if (this.isWalking) {
        cancelAnimationFrame();
        this.isWalking = false;
      } else {
        this.drawRoute();
      }
    },
    initCanvas({ keepScale } = {}) {
      if (this.isAnimating || this.isWalking) {
        this.ctx.closePath();
        cancelAnimationFrame();
        this.isAnimating = false;
        this.isWalking = false;
        this.hasFinishedWalking = false;

        currentX = lastX;
        currentY = lastY;
        arrowPoints = [];
        arrowPoints.push([lastX, lastY, DIRECTION_DOWN, 0]);

        currentIndex = 0;
      }

      if (!this.canvas || !this.ctx) {
        const canvas = document.querySelector('#canvas');
        const ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.ctx = ctx;
      }
      if (!this.realCanvasWidth || !this.realCanvasHeight) {
        const rect = this.canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio;
        this.devicePixelRatio = dpr;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        this.ctx.scale(dpr, dpr);
        this.realCanvasWidth = canvas.width / dpr;
        this.realCanvasHeight = canvas.height / dpr;
      }

      if (!mapBg) {
        mapBg = new Image();
        // 图片加载完成回调
        mapBg.onload = () => {
          // 将图片绘制到 canvas 上
          this.renderWidth = this.realCanvasWidth;
          this.renderHeight = (656 / 750) * this.renderWidth;
          this.imageAspectRaito = 750 / 656;
          this.renderStartX = 0;
          this.renderStartY = (this.realCanvasHeight - this.renderHeight) / 2;
          this.ctx.clearRect(0, 0, this.realCanvasWidth, this.realCanvasHeight);
          this.drawBG();
          // this.drawRoute()
          this.drawOverlay();
        };
        // 设置图片src
        mapBg.src = mapBgUrl;
      } else {
        this.ctx.clearRect(0, 0, this.realCanvasWidth, this.realCanvasHeight);
        this.drawBG();
        // this.drawRoute()
        this.drawOverlay();
      }

      if (!keepScale && this.scale !== 1) {
        this.scaleCanvas(1, { x: 0.5, y: 0.5 });
      }

      arrowImageDown = new Image();
      arrowImageDown.src = arrowImageDownUrl;

      arrowImageRight = new Image();
      arrowImageRight.src = arrowImageRightUrl;

      arrowImageUp = new Image();
      arrowImageUp.src = arrowImageUpUrl;
      arrowImageLeft = new Image();
      arrowImageLeft.src = arrowImageLeftUrl;
      personImage = new Image();
      personImage.src = personImageUrl;
    },
    drawBG() {
      this.ctx.drawImage(mapBg, 0, 372, 750, 656, this.renderStartX, this.renderStartY, this.renderWidth, this.renderHeight);
    },
    drawOverlay() {
      overlays.forEach((item, index) => {
        if (this.hiddenOverlayIndexs.indexOf(index) >= 0) return;
        let img = overlayImages[index];
        if (!img) {
          img = new Image();
          img.onload = () => {
            overlayImages[index] = img;
            this.ctx.drawImage(img, 0, 372, 750, 656, this.renderStartX, this.renderStartY, this.renderWidth, this.renderHeight);
          };
          // // 设置图片src
          img.src = item;
        } else {
          this.ctx.drawImage(img, 0, 372, 750, 656, this.renderStartX, this.renderStartY, this.renderWidth, this.renderHeight);
        }
      });
    },
    prepareRoutes() {
      let { x, y } = this.getPixelCoordFromRelative(lastX, lastY);
      this.ctx.moveTo(x, y);

      const points = [
        [0.810552811550152, 0.42123665695196083],
        [0.7515672492401215, 0.42123665695196083],
        [0.7515672492401215, 0.45568719442694047],
        [0.810552811550152, 0.45568719442694047],
        [0.810552811550152, 0.8207366013511009],
        [0.7099041005291006, 0.8207366013511009],
        [0.7099041005291006, 0.7448495118321719],
        [0.47207420634920634, 0.7448495118321719],
        [0.47207420634920634, 0.452315545755904],
        [0.6292162698412699, 0.452315545755904],
        [0.6292162698412699, 0.7848307291666666],
        [0.25525132275132273, 0.7848307291666666],
        [0.25525132275132273, 0.4291585759049555],
        [0.1684506309068674, 0.4291585759049555],
        [0.1684506309068674, 0.817605998731895],
        [0.01459219685006649, 0.817605998731895],
      ];

      pathPoints.push([lastX, lastY, DIRECTION_DOWN]);
      points.forEach(([relX, relY]) => {
        while (!(relY.toFixed(3) === currentY.toFixed(3) && relX.toFixed(3) === currentX.toFixed(3))) {
          if (relX.toFixed(3) === currentX.toFixed(3) && relY.toFixed(3) !== currentY.toFixed(3)) {
            if (currentY > relY) {
              currentY -= 0.001;
              currentDirection = DIRECTION_UP;
            } else {
              currentY += 0.001;
              currentDirection = DIRECTION_DOWN;
            }
            pathPoints.push([currentX, currentY, currentDirection]);
          } else if (relY.toFixed(3) === currentY.toFixed(3) && relX.toFixed(3) !== currentX.toFixed(3)) {
            if (currentX > relX) {
              currentX -= 0.001;
              currentDirection = DIRECTION_LEFT;
            } else {
              currentX += 0.001;
              currentDirection = DIRECTION_RIGHT;
            }
            pathPoints.push([currentX, currentY, currentDirection]);
          }
        }
      });

      // console.log(pathPoints)
      this.hasRoute = true;
    },
    drawRoute() {
      this.isAnimating = true;
      let lastSetTime = 0;
      const targetScale = this.realCanvasHeight / this.renderHeight;

      // this.canvas.style.transition = 'transform 0.5s'
      requestAnimationFrame((time) => {
        this.isWalking = true;

        this.drawFrame();

        arrowPoints = arrowPoints.map((arrowPoint) => {
          const currentIndex = arrowPoint[3];
          const nextIndex = currentIndex + 1 > pathPoints.length - 1 ? 0 : currentIndex + 1;
          return pathPoints[nextIndex] ? [...pathPoints[nextIndex], nextIndex] : arrowPoint;
        });

        if (currentIndex < pathPoints.length) {
          const [currentX, currentY] = pathPoints[currentIndex];
          let nextPoint = this.getPixelCoordFromRelative(currentX, currentY);
          this.ctx.lineTo(nextPoint.x, nextPoint.y);
          let animatingScale = this.scale;
          if (animatingScale < targetScale) {
            animatingScale += 0.008;
          } else {
            animatingScale = targetScale;
          }

          this.scaleCanvas(animatingScale, {
            x: currentX,
            y: currentY,
          });
          const lastArrowPoint = arrowPoints[arrowPoints.length - 1];
          const minGap = 0.07;
          // console.log('minGap', minGap)
          if (!lastSetTime) {
            lastSetTime = time;
          } else if (time - lastSetTime >= 300 && (lastArrowPoint[0] - lastX > minGap || lastArrowPoint[1] - lastY > minGap)) {
            lastSetTime = time;
            arrowPoints.push([lastX, lastY, DIRECTION_DOWN, 0]);
          }

          currentIndex++;
        } else {
          this.isWalking = false;
          this.hasFinishedWalking = true;
        }
      }, 5);
    },

    drawFrame() {
      this.ctx.clearRect(0, 0, this.realCanvasWidth, this.realCanvasHeight);
      // if (scale < 2) {
      // 	scale+=0.01
      // 	console.log(scale)
      // 	this.ctx.scale(1.01, 1.01)
      // }

      this.drawBG();
      // if (currentIndex > 40 && this.canvas.style.transition !== 'unset') {
      //   this.canvas.style.transition = 'unset'
      // }

      this.drawLine();
      this.drawArrows();

      this.drawOverlay();
      this.drawPerson();
    },
    drawLine() {
      this.ctx.strokeStyle = '#c9273a';
      this.ctx.setLineDash([3, 2]);
      // this.ctx.lineDashOffset = currentIndex
      this.ctx.lineWidth = 1.5;

      this.ctx.stroke();
    },
    drawArrows() {
      const arrowSize = this.arrowSize;

      arrowPoints.forEach(([x, y, direction]) => {
        let { x: centerX, y: centerY } = this.getPixelCoordFromRelative(x, y);
        if (direction === DIRECTION_UP) {
          centerX -= arrowSize / 2;
          this.ctx.drawImage(arrowImageUp, centerX, centerY, arrowSize, arrowSize);
        }
        if (direction === DIRECTION_DOWN) {
          centerX -= arrowSize / 2;
          this.ctx.drawImage(arrowImageDown, centerX, centerY, arrowSize, arrowSize);
        }
        if (direction === DIRECTION_RIGHT) {
          centerY -= arrowSize / 2;
          this.ctx.drawImage(arrowImageRight, centerX, centerY, arrowSize, arrowSize);
        }
        if (direction === DIRECTION_LEFT) {
          centerY -= arrowSize / 2;
          this.ctx.drawImage(arrowImageLeft, centerX, centerY, arrowSize, arrowSize);
        }
      });
    },
    drawPerson() {
      const lastPathPoint = pathPoints[currentIndex < pathPoints.length ? currentIndex : pathPoints.length - 1];
      let { x: lastPathPointX, y: lastPathPointY } = this.getPixelCoordFromRelative(lastPathPoint[0], lastPathPoint[1]);
      const personWidth = 0.052 * this.realCanvasWidth;
      const personHeight = personWidth * (81 / 56);
      lastPathPointX -= personWidth / 2;
      lastPathPointY -= personHeight;
      this.ctx.drawImage(personImage, lastPathPointX, lastPathPointY, 0.052 * this.realCanvasWidth, 0.052 * this.realCanvasWidth * (81 / 56));
    },
    scaleCanvas(scale = this.scale, { x, y } = { x: this.transformOrigin[0], y: this.transformOrigin[1] }) {
      let _scale = scale;
      if (_scale < 1) _scale = 1;
      if (_scale > 3) {
        _scale = 3;
        this.canvas.style.transform = `scale(${_scale})`;
        this.scale = _scale;
        return;
      }
      this.canvas.style.transform = `scale(${_scale})`;
      this.scale = _scale;

      if (x > 1) x = 1;
      if (x < 0) x = 0;
      if (y > 1) y = 1;
      if (y < 0) y = 0;
      // this.canvas.style.transformOrigin = `${x * 100}% ${y * 100}%`
      this.canvas.style.transformOrigin = `${x * this.realCanvasWidth}px ${y * this.realCanvasHeight}px`;
      this.transformOrigin = [x, y];
    },

    onePointCoord(point, relativeElem) {
      const _elme = relativeElem || this.canvas;
      let rect = _elme.getBoundingClientRect();

      let clientX = point.clientX;
      let clientY = point.clientY;

      let result = {
        x: clientX - rect.left,
        y: clientY - rect.top,
      };
      if (_elme === this.canvas && this.scale > 1) {
        result.x = result.x / this.scale;
        result.y = result.y / this.scale;
      }
      // console.log('result', result)
      return result;
    },

    getPointerCoords(evt, relativeElem) {
      let pointer;
      if (evt.touches && evt.touches[0]) {
        pointer = evt.touches[0];
      } else if (evt.changedTouches && evt.changedTouches[0]) {
        pointer = evt.changedTouches[0];
      } else {
        pointer = evt;
      }
      return this.onePointCoord(pointer, relativeElem);
    },

    onMouseWheel(event) {
      if (this.isWalking) {
        return;
      }
      let { x, y } = this.getPointerCoords(event);

      if (0.0 > event.deltaY) {
        this.scaleCanvas(this.scale + 0.02, {
          x: x / (this.realCanvasWidth * this.scale),
          y: y / (this.realCanvasHeight * this.scale),
        });
      } else if (0.0 < event.deltaY) {
        this.scaleCanvas(this.scale - 0.02, {
          x: x / (this.realCanvasWidth * this.scale),
          y: y / (this.realCanvasHeight * this.scale),
        });
      }
    },

    onTouchStart(event) {
      if (2 === event.touches.length) {
        if (this.isWalking) {
          return;
        }
        const { x: _x1, y: _y1 } = this.onePointCoord(event.touches[0], frameContentElem);
        const { x: _x2, y: _y2 } = this.onePointCoord(event.touches[1], frameContentElem);
        const { x: x1, y: y1 } = this.onePointCoord(event.touches[0]);
        const { x: x2, y: y2 } = this.onePointCoord(event.touches[1]);
        this.transformOrigin = [(x1 + x2) / 2 / this.realCanvasWidth, (y1 + y2) / 2 / this.realCanvasHeight];
        // this.scaleCanvas(this.scale)

        const distance = Math.sqrt(Math.pow(_x2 - _x1, 2) + Math.pow(_y2 - _y1, 2));
        this.distance = distance;

        // console.log(this.distance)
        return;
      }

      if (1 == event.touches.length) {
        let { x, y } = this.getPointerCoords(event, frameContentElem);

        this.handlePointerStart({ x, y });
      }
    },

    onTouchMove(event) {
      if (2 === event.touches.length && this.distance) {
        if (this.isWalking) {
          return;
        }
        const { x: _x1, y: _y1 } = this.onePointCoord(event.touches[0], frameContentElem);
        const { x: _x2, y: _y2 } = this.onePointCoord(event.touches[1], frameContentElem);
        const { x: x1, y: y1 } = this.onePointCoord(event.touches[0]);
        const { x: x2, y: y2 } = this.onePointCoord(event.touches[1]);
        const distance = Math.sqrt(Math.pow(_x2 - _x1, 2) + Math.pow(_y2 - _y1, 2));
        const delta = distance - this.distance;
        this.transformOrigin = [(x1 + x2) / 2 / this.realCanvasWidth, (y1 + y2) / 2 / this.realCanvasHeight];
        const scaleDelta = (delta / this.realCanvasWidth) * this.devicePixelRatio;
        this.scaleCanvas(this.scale + scaleDelta);
        this.distance = distance;
        return;
      }
      let { x, y } = this.getPointerCoords(event, frameContentElem);
      // console.log({x, y})
      this.handlePointerMove({ x, y });
    },

    onTouchEnd(event) {
      // if (this.distance) {
      //   this.distance = 0;

      //   if (this.hasRoute) {
      //     this.drawRoute()
      //   }
      //   return;
      // }
      // let { x, y } = this.getPointerCoords(event)
      this.handlePointerEnd();
    },

    handlePointerStart({ x, y }) {
      // if (this.isWalking) {
      //   return;
      // }

      this.lastPoint = { x, y };
    },

    handlePointerMove({ x, y }) {
      // if (this.isWalking) {
      //   return;
      // }
      if (!this.lastPoint) return;

      const deltaX = x - this.lastPoint.x;
      const deltaY = y - this.lastPoint.y;

      // console.log('delta', deltaX, deltaY)

      const scaleDeltaX = deltaX / this.realCanvasWidth / this.scale;
      const scaleDeltaY = deltaY / this.realCanvasHeight / this.scale;

      // console.log('scale delta', scaleDeltaX, scaleDeltaY)
      // console.log('scale delta * 2', scaleDeltaX * 2, scaleDeltaY * 2)

      this.scaleCanvas(undefined, {
        x: this.transformOrigin[0] - scaleDeltaX,
        y: this.transformOrigin[1] - scaleDeltaY,
      });
      this.lastPoint = { x, y };
    },

    handlePointerEnd() {
      this.lastPoint = null;
    },

    // onTouchStart(event) {
    //   console.log(event.touches[0].clientX, event.touches[0].clientY)
    //   const rect = this.canvas.getBoundingClientRect()
    //   console.log(
    //     'rel',
    //     this.getRelativeCoord(
    //       event.touches[0].clientX - rect.left,
    //       event.touches[0].clientY - rect.top
    //     )
    //   )
    // },
    // onTouchMove (event) {
    //   // console.log(event.touches[0].x, event.touches[0].y)
    // },
    getRelativeCoord(x, y) {
      const relX = (x - this.renderStartX) / this.renderWidth;
      const relY = (y - this.renderStartY) / this.renderHeight;
      return {
        relX,
        relY,
      };
    },
    getPixelCoordFromRelative(relX, relY) {
      const x = relX * this.renderWidth + this.renderStartX;
      const y = relY * this.renderHeight + this.renderStartY;
      return {
        x,
        y,
      };
    },
    showTuliModal() {},
  },
};
</script>

<style lang="scss">
.content {
  background-image: url('https://img.vrwenbo.com/aJpbnjwrgW4uLeckvSOMzmTqhDZAIHXC.jpeg');
  background-size: cover;
  background-position: center 2.25rem;
  width: 100%;
  height: 100%;

  .frame .frame-content {
    padding-top: 2.0625rem !important;
    padding-left: 0.375rem !important;
    padding-right: 0.375rem !important;
    overflow: hidden !important;
  }

  #canvas {
    // transition: transform 0.1s;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }

  .title {
    font-size: 1.1875rem;
    font-weight: 600;
    color: #41210f;
    line-height: 1.3125rem;
    text-align: center;
    padding-bottom: 0.625rem;
  }
  .tools {
    position: absolute;
    z-index: 1001;
    right: 3rem;
    top: 3.46875rem;

    .tool-item {
      position: absolute;
      left: 0;
      top: 0;
      transition: all 0.3s;
      opacity: 0;
      background-size: contain;
      background-repeat: no-repeat;
      width: 1.71875rem;
      height: 1.71875rem;
      // border: 1px solid black;
      border-radius: 0.3125rem;
      background-color: rgba(247, 240, 219, 1);
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: 0.1562rem 0.1562rem 0.1562rem rgba(38, 18, 2, 0.3);
      border: 0.0652rem solid rgba(164, 139, 120, 1);

      &.selected {
        background-color: rgba(164, 139, 120, 1);
      }

      > img {
        width: 0.875rem;
      }
    }
    &.show-all {
      .tool-item {
        opacity: 1;
      }
    }
    .toggler {
      opacity: 1;
      z-index: 10000;

      > img {
        transform: rotate(-90deg);
      }
    }
  }
  .footer {
    // padding-bottom: 30rpx;
    padding-top: 0.9375rem;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .styled-button {
      width: 11.28125rem;
      height: 2.875rem !important;
      font-size: 1.125rem !important;
      line-height: 1 !important;
      padding-right: 6% !important;
      padding-bottom: 1% !important;

      &:nth-child(2) {
        margin-left: 1em;
      }
    }
    .route-icon {
      width: 1.09375rem;
      height: 1.0625rem;
      margin-right: 0.3125rem;
    }
  }

  .modal {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 2000;

    .dialog {
      width: 20.3125rem;
      height: 24.46875rem;
      background-image: url(../../assets/image/tuli-bg.jpeg);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      box-sizing: border-box;
      padding: 2.6875rem 2.40625rem 2.34375rem;

      .tuli-list {
        margin-top: 2.59375rem;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .tuli-item {
          width: 7.34375rem;
          height: 2.8125rem;
          background: rgba(164, 139, 120, 0.3);
          margin-bottom: 0.9375rem;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #654c3d;
          display: flex;
          justify-content: center;
          align-items: center;
          img {
            width: 0.9375rem;
            margin-right: 1rem;
          }
        }
      }

      .btns {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 2.90625rem;
        button {
          width: 7.5rem;
          height: 2.5rem;
          background: #41210f;
          border-radius: 1.25rem;
          border: none;
          box-shadow: none;
          color: white;
        }
      }
    }
  }
}
</style>
