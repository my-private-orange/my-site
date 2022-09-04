var timer = undefined 

function requestAnimationFrame(callback, interval = 16) {
  var start;
  timer = setTimeout(function () {
    start = +new Date();
    requestAnimationFrame(callback, interval)
    callback(start);
  }, interval);
}

function cancelAnimationFrame() {
  clearTimeout(timer)
}

export {requestAnimationFrame, cancelAnimationFrame}