function CameraCapture()
{
  var videoStreamUrl = false;

  var video = document.getElementById('video');
  var allow = document.getElementById('allow');

  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  navigator.getUserMedia({video: true}, function (stream)
  {
    allow.style.display = "none";
    videoStreamUrl = window.URL.createObjectURL(stream);
    video.src = videoStreamUrl;
  }, function ()
  {
    alert('Cannot use camera');
  });
}
