let video = document.querySelector("video");
let startBtn = document.querySelector("#start");
let stopBtn = document.querySelector("#stop");
let mediaRecorder;
let chunks = [];
startBtn.addEventListener("click", function () {
  // code likhna hai jisse recording start ho jaye
  mediaRecorder.start();
});
stopBtn.addEventListener("click", function () {
  // code likhna hai jisse recording stop ho jaye
  mediaRecorder.stop();
});

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(function (mediaStream) {
    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });
    mediaRecorder.addEventListener("stop", function (e) {
      // for download 
      let blob = new Blob(chunks, { type: "video/mp4" });
      chunks=[];
      let a = document.createElement("a");
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = "video.mp4";
      a.click();
      a.remove();
    });
    video.srcObject = mediaStream;
  })
  .catch(function (err) {
    console.log(err);
  });
