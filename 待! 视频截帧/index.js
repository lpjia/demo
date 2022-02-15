$("input").change(function () {

  var file = $(this)[0].files[0]
  var fileUrl = URL.createObjectURL(file);
  var videoElement = document.createElement("VIDEO")
  videoElement.src = fileUrl
  videoElement.autoplay = true
  videoElement.setAttribute('controls', 'controls');
  videoElement.currentTime = 1;//截取当前时间，部门视频第一帧黑屏
  videoElement.addEventListener("canplay", function (_event) {
    var canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth * 0.2;
    canvas.height = videoElement.videoHeight * 0.2;
    canvas.getContext('2d').drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    $("img")[0].src = canvas.toDataURL("image/png");

  }, false);
})