const PRE = "DELTA";
const SUF = "MEET";
var room_id;
var getUserMedia =
  navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia;
var local_stream;
var screenStream;
var peer = null;
var currentPeer = null;
var screenSharing = false;

export const call = {
  createRoom: function createRoom(idRoom) {
    room_id = PRE + idRoom + SUF;
    peer = new Peer(room_id);
    // console.log("Peer Connected with ID: ", id);
    hideModal();
    getUserMedia(
      { video: true, audio: true },
      (stream) => {
        console.log(stream)
        local_stream = stream;
        setLocalStream(local_stream);
      },
      (err) => {
        console.log(err);
      }
    );
    // peer.on("open", (idRoom) => {
    //   alert("OK")
    //   hideModal();
    //   getUserMedia(
    //     { video: true, audio: true },
    //     (stream) => {
    //       console.log(stream)
    //       local_stream = stream;
    //       setLocalStream(local_stream);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // });
    peer.on("call", (call) => {
      call.answer(local_stream);
      call.on("stream", (stream) => {
        setRemoteStream(stream);
      });
      currentPeer = call;
    });

    
  },

  joinRoom: function joinRoom(room_id) {
    // console.log("Joining Room");
    // let room = document.getElementById("room-input").value;
    if (room_id == " " || room_id == "") {
      alert("Please enter room number");
      return;
    }
    room_id = PRE + room_id + SUF;
    hideModal();
    peer = new Peer();
    peer.on("open", (id) => {
      // console.log("Connected with Id: " + id);
      getUserMedia(
        { video: true, audio: true },
        (stream) => {
          local_stream = stream;
          setLocalStream(local_stream);
          // notify("Joining peer");
          let call = peer.call(room_id, stream);
          call.on("stream", (stream) => {
            setRemoteStream(stream);
          });
          currentPeer = call;
        },
        (err) => {
          console.log(err);
        }
      );
    });
  },

  startScreenShare: function startScreenShare() {
    if (screenSharing) {
      stopScreenSharing();
    }
    navigator.mediaDevices.getDisplayMedia({ video: true }).then((stream) => {
      screenStream = stream;
      let videoTrack = screenStream.getVideoTracks()[0];
      videoTrack.onended = () => {
        stopScreenSharing();
      };
      if (peer) {
        let sender = currentPeer.peerConnection.getSenders().find(function (s) {
          return s.track.kind == videoTrack.kind;
        });
        sender.replaceTrack(videoTrack);
        screenSharing = true;
      }
      console.log(screenStream);
    });
  },
  isCameraOpen: function isCameraOpen() {
    return new Promise((resolve, reject) => {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          // Người dùng đã cho phép truy cập camera
          // Đóng stream để giải phóng tài nguyên
          stream.getTracks().forEach(track => track.stop());
          resolve(true);
        })
        .catch((error) => {
          // Lỗi xảy ra hoặc người dùng từ chối quyền truy cập
          resolve(false);
        });
    });
  },
  offCame: function offCame(){

    const video = document.getElementById('local-video');
    // A video's MediaStream object is available through its srcObject attribute
    const mediaStream = video.srcObject;
    // console.log("mediastream: "+mediaStream)
    // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
    const tracks = mediaStream.getTracks();

    // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
    tracks[0].stop();

    // Or stop all like so:
    tracks.forEach(track => track.stop())

    
    // Get the video track from the local stream
    // Assuming local_stream is defined somewhere in your code
    let videoTrack = local_stream.getVideoTracks()[0];
    local_stream.setLocalStream = null;
    // Check if videoTrack is present
    if (videoTrack) {
      // Stop the video track to turn off the camera
      videoTrack.stop();
    } else {
      console.error('No video track found in local_stream.');
    }
  },

  // turnOffCamera: function turnOffCamera(value) {
  //   console.warn("Tắt cam: ")
  //   let videoTrack = local_stream.getVideoTracks()[0];
  //   // console.log("đã tắt cam");
  //   // Kiểm tra xem videoTrack có tồn tại không
  //   if (videoTrack) {
  //     // Tạm dừng video track
  //     videoTrack.enabled = false;
  //     if (currentPeer && currentPeer.peerConnection) {
  //       // Lặp qua tất cả các sender trong peerConnection của currentPeer
  //       currentPeer.peerConnection.getSenders().forEach((sender) => {
  //         // Kiểm tra xem sender có loại track giống với videoTrack không
  //         if (sender.track && sender.track.kind === videoTrack.kind) {
  //           // Thay thế track của sender bằng videoTrack
  //           sender.replaceTrack(videoTrack);
  //         }
  //       });
  //     }
  //   } else {
  //     console.error("Không tìm thấy track video trong local_stream.");
  //   }
 
  //   let off = document.getElementById("off-camera-" + value);
  //   let on = document.getElementById("on-camera-" + value);
  //   if(off && on){
  //     off.style.display = "none";
  //     on.style.display = "block";
  //   }
  // },

  turnOffCamera: function turnOffCamera(value) {
    let videoTrack = local_stream.getVideoTracks()[0];

    // Kiểm tra xem videoTrack có tồn tại không
    if (videoTrack) {
        // Tạm dừng video track
        videoTrack.enabled = false;
        // Lặp qua tất cả các sender trong peerConnection của currentPeer
        currentPeer.peerConnection.getSenders().forEach((sender) => {
            // Kiểm tra xem sender có loại track giống với videoTrack không
            if (sender.track && sender.track.kind === videoTrack.kind) {
                // Thay thế track của sender bằng videoTrack
                sender.replaceTrack(videoTrack);
            }
        });
    } else {
        console.error('Không tìm thấy track video trong local_stream.');
    }

    // document.querySelector("off-camera-" + value).style.display = "none";
    // document.querySelector("on-camera-" + value).style.display = "block";
        let off = document.getElementById("off-camera-" + value);
      let on = document.getElementById("on-camera-" + value);
      if(off && on){
        off.style.display = "none";
        on.style.display = "block";
      }
  },


  turnOnCamera: function turnOnCamera(value) {
    // Lấy track video từ local_stream
    let videoTrack = local_stream.getVideoTracks()[0];

    // Kiểm tra xem videoTrack có tồn tại không
    if (videoTrack) {
      // Bật lại video track
      videoTrack.enabled = true;
      
      // Lặp qua tất cả các sender trong peerConnection của currentPeer
      currentPeer.peerConnection.getSenders().forEach((sender) => {
        // Kiểm tra xem sender có loại track giống với videoTrack không
        if (sender.track && sender.track.kind === videoTrack.kind) {
          // Thay thế track của sender bằng videoTrack
          sender.replaceTrack(videoTrack);
        }
      });
    } else {
      console.error("Không tìm thấy track video trong local_stream.");
    }

    // document.getElementById("off-camera-" + value).style.display = "block";
    // document.getElementById("on-camera-" + value).style.display = "none";
    let off = document.getElementById("off-camera-" + value);
      let on = document.getElementById("on-camera-" + value);
      if(off && on){
        off.style.display = "block";
        on.style.display = "none";
      }
  },

  turnOnMicro: function turnOnMicro(value) {
    // Lấy track âm thanh từ local_stream
    let audioTrack = local_stream.getAudioTracks()[0];

    // Kiểm tra xem audioTrack có tồn tại không
    if (audioTrack) {
      // Bật lại audio track
      audioTrack.enabled = true;

      // Lặp qua tất cả các sender trong peerConnection của currentPeer
      currentPeer.peerConnection.getSenders().forEach((sender) => {
        // Kiểm tra xem sender có loại track giống với audioTrack không
        if (sender.track && sender.track.kind === audioTrack.kind) {
          // Thay thế track của sender bằng audioTrack
          sender.replaceTrack(audioTrack);
        }
      });
    } else {
      console.error("Không tìm thấy track âm thanh trong local_stream.");
    }

    // document.getElementById("off-mic-" + value).style.display = "block";
    // document.getElementById("on-mic-" + value).style.display = "none";

    let off = document.getElementById("off-mic-" + value);
    let on = document.getElementById("on-mic-" + value);
    if(off && on){
      off.style.display = "block";
      on.style.display = "none";
    }
  },

  turnOffMicro: function turnOffMicro(value) {
    // Lấy track âm thanh từ local_stream
    let audioTrack = local_stream.getAudioTracks()[0];

    // Kiểm tra xem audioTrack có tồn tại không
    if (audioTrack) {
      // Tạm dừng audio track
      audioTrack.enabled = false;
      if (currentPeer && currentPeer.peerConnection) {
        // Lặp qua tất cả các sender trong peerConnection của currentPeer
      currentPeer.peerConnection.getSenders().forEach((sender) => {
        // Kiểm tra xem sender có loại track giống với audioTrack không
        if (sender.track && sender.track.kind === audioTrack.kind) {
          // Thay thế track của sender bằng audioTrack
          sender.replaceTrack(audioTrack);
        }
      });
      }
      
    } else {
      console.error("Không tìm thấy track âm thanh trong local_stream.");
    }

    let off = document.getElementById("off-mic-" + value);
    let on = document.getElementById("on-mic-" + value);
    if(off && on){
      off.style.display = "none";
      on.style.display = "block";
    }
    // document.getElementById("off-mic-" + value).style.display = "none";
    // document.getElementById("on-mic-" + value).style.display = "block";
  },

  translate: function translate(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);

    xhr.onreadystatechange = function () {
      if (xhr.readyState == XMLHttpRequest.DONE) {
        if (xhr.status == 200) {
          callback(xhr.responseText);
        } else {
          console.error("Error:", xhr.status);
        }
      }
    };

    xhr.send();
  },

  styleCall: function hideModal() {
    var localVideoElement = document.getElementById("local-video");
    var remoteVideoElement = document.getElementById("remote-videoo");
    //   document.getElementById("entry-modal").hidden = true;
    // Check if the element exists
    if (localVideoElement) {
      localVideoElement.hidden = false;
      localVideoElement.style.top = "10%";
      localVideoElement.style.width = "300px";
      localVideoElement.style.objectFit = "cover";
      localVideoElement.style.height = "150px";
      localVideoElement.style.zIndex = "1";
      localVideoElement.style.right = "5%";
      localVideoElement.style.backgroundColor = "#444444";
      localVideoElement.style.position = "absolute";
    }
    if (remoteVideoElement) {
      remoteVideoElement.style.backgroundColor = "#ececed";
    }
  }
};

function hideModal() {
  var localVideoElement = document.getElementById("local-video");
  var remoteVideoElement = document.getElementById("remote-videoo");
  //   document.getElementById("entry-modal").hidden = true;
  // Check if the element exists
  if (localVideoElement) {
    localVideoElement.hidden = false;
    localVideoElement.style.top = "10%";
    localVideoElement.style.width = "300px";
    localVideoElement.style.objectFit = "cover";
    localVideoElement.style.height = "150px";
    localVideoElement.style.zIndex = "1";
    localVideoElement.style.right = "5%";
    localVideoElement.style.backgroundColor = "#444444";
    localVideoElement.style.position = "absolute";
  }
  if (remoteVideoElement) {
    remoteVideoElement.style.backgroundColor = "#ececed";
  }
}

function setLocalStream(stream) {
  let video = document.getElementById("local-video");
  if(video){
    video.srcObject = stream;
    video.muted = true;
    video.play();
  }
}

function setRemoteStream(stream) {
  let video = document.getElementById("remote-video");
  video.srcObject = stream;
  // video.muted = true;
  video.play();
}

function notify(msg) {
  let notification = document.getElementById("notification");
  if (notification) {
    notification.innerHTML = msg;
    notification.hidden = false;
    setTimeout(() => {
      notification.hidden = true;
    }, 3000);
  }
}

function stopScreenSharing() {
  if (!screenSharing) return;
  let videoTrack = local_stream.getVideoTracks()[0];
  if (peer) {
    let sender = currentPeer.peerConnection.getSenders().find(function (s) {
      return s.track.kind == videoTrack.kind;
    });
    sender.replaceTrack(videoTrack);
  }
  screenStream.getTracks().forEach(function (track) {
    track.stop();
  });
  screenSharing = false;
}

//
