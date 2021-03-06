let video = document.querySelector("video");
let recordBtn = document.querySelector("#record");
let recDiv = recordBtn.querySelector("div")
let capBtn = document.querySelector("#capture");
let capDiv = capBtn.querySelector("div")

let mediaRecorder;
let isRecording = false;
let chunks = [];


recordBtn.addEventListener("click",function(e){
  if(isRecording){
    mediaRecorder.stop()
    isRecording = false
    recDiv.classList.remove("record-animation")
  }else{
    mediaRecorder.start()
    isRecording = true
    recDiv.classList.add("record-animation")
  }
})

capBtn.addEventListener("click", function () {

  capDiv.classList.add("capture-animation")
  setTimeout(function(){
    capDiv.classList.remove("capture-animation")
  },1000)

  //jobhi image screen pr dikhara use save krwana
  let canvas = document.createElement("canvas");
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  let tool = canvas.getContext("2d");
  tool.drawImage(video, 0, 0);

  let link = canvas.toDataURL();
  let a = document.createElement("a");
  a.href = link;
  a.download = "img.png";
  a.click();
  a.remove();
  canvas.remove()
});

navigator.mediaDevices
  .getUserMedia({ video: true, audio: true })
  .then(function (mediaStream) {

    mediaRecorder = new MediaRecorder(mediaStream);

    mediaRecorder.addEventListener("dataavailable", function (e) {
      chunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function (e) {
      let blob = new Blob(chunks, { type: "video/mp4" });
      chunks = [];
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