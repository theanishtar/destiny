import { Component, OnInit } from '@angular/core';
declare var io: any;

import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent {
  public roomForm!: FormGroup;
  socket: any;
  roomName: string = '';

  ngOnInit() {
    this.videoCall();
  }

  constructor(
    private formbuilder: FormBuilder,
  ) {
    this.createRoomForm();
  }
  createRoomForm() {
    this.roomForm = this.formbuilder.group({
      roomName: [''],
    });
  }

  get roomFormControl() {
    return this.roomForm.controls;
  }

  videoCall() {
    const LOCAL_IP_ADDRESS = "localhost"; // change it

    const getElement = id => document.getElementById(id);
    const [btnConnect, btnToggleVideo, btnToggleAudio, divRoomConfig, roomDiv, roomNameInput] = ["btnConnect",
      "toggleVideo", "toggleAudio", "roomConfig", "roomDiv", "roomName"].map(getElement);

    const localVideo = document.getElementById('localVideo') as HTMLVideoElement;
    const remoteVideo = document.getElementById('remoteVideo') as HTMLVideoElement;

    let remoteDescriptionPromise, roomName, localStream, remoteStream,
      rtcPeerConnection, isCaller;

    const iceServers = {
      iceServers: [
        { urls: `stun:${LOCAL_IP_ADDRESS}:3478` },
        {
          urls: `turn:${LOCAL_IP_ADDRESS}:3478`,
          username: "username",
          credential: "password"
        }
      ]
    };

    const streamConstraints = { audio: true, video: true };

    this.socket = io('http://localhost:8000');

    btnToggleVideo!.addEventListener("click", () => toggleTrack("video"));
    btnToggleAudio!.addEventListener("click", () => toggleTrack("audio"));

    function toggleTrack(trackType) {
      if (!localStream) {
        return;
      }

      const track = trackType === "video" ? localStream.getVideoTracks()[0]
        : localStream.getAudioTracks()[0];
      const enabled = !track.enabled;
      track.enabled = enabled;

      const toggleButton = getElement(
        `toggle${trackType.charAt(0).toUpperCase() + trackType.slice(1)}`);
      const icon = getElement(`${trackType}Icon`);
      toggleButton!.classList.toggle("disabled-style", !enabled);
      toggleButton!.classList.toggle("enabled-style", enabled);
      icon!.classList.toggle("bi-camera-video-fill",
        trackType === "video" && enabled);
      icon!.classList.toggle("bi-camera-video-off-fill",
        trackType === "video" && !enabled);
      icon!.classList.toggle("bi-mic-fill", trackType === "audio" && enabled);
      icon!.classList.toggle("bi-mic-mute-fill", trackType === "audio" && !enabled);
    }

    btnConnect!.onclick = () => {
      try {
        if (this.roomForm.get("roomName")!.value === "") {
          alert("Room can not be null!");
        } else {
          alert(this.roomForm.get("roomName")!.value);
          roomName = this.roomForm.get("roomName")!.value;
          this.socket.emit("joinRoom", roomName);
          divRoomConfig!.classList.add("d-none");
          roomDiv!.classList.remove("d-none");
        }
      } catch (error) {
        console.log(error)
      }

    };

    const handleSocketEvent = (eventName, callback) => this.socket.on(eventName,
      callback);

    handleSocketEvent("created", e => {
      navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
        isCaller = true;
      }).catch(console.error);
    });

    handleSocketEvent("joined", e => {
      navigator.mediaDevices.getUserMedia(streamConstraints).then(stream => {
        localStream = stream;
        localVideo.srcObject = stream;
        this.socket.emit("ready", roomName);
      }).catch(console.error);
    });

    handleSocketEvent("candidate", e => {
      if (rtcPeerConnection) {
        const candidate = new RTCIceCandidate({
          sdpMLineIndex: e.label, candidate: e.candidate,
        });

        rtcPeerConnection.onicecandidateerror = (error) => {
          console.error("Error adding ICE candidate: ", error);
        };

        if (remoteDescriptionPromise) {
          remoteDescriptionPromise
            .then(() => {
              if (candidate != null) {
                return rtcPeerConnection.addIceCandidate(candidate);
              }
            })
            .catch(error => console.log(
              "Error adding ICE candidate after remote description: ", error));
        }
      }
    });

    handleSocketEvent("ready", e => {
      if (isCaller) {
        rtcPeerConnection = new RTCPeerConnection(iceServers);
        rtcPeerConnection.onicecandidate = onIceCandidate;
        rtcPeerConnection.ontrack = onAddStream;
        rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
        rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);
        rtcPeerConnection
          .createOffer()
          .then(sessionDescription => {
            rtcPeerConnection.setLocalDescription(sessionDescription);
            this.socket.emit("offer", {
              type: "offer", sdp: sessionDescription, room: roomName,
            });
          })
          .catch(error => console.log(error));
      }
    });

    handleSocketEvent("offer", e => {
      if (!isCaller) {
        rtcPeerConnection = new RTCPeerConnection(iceServers);
        rtcPeerConnection.onicecandidate = onIceCandidate;
        rtcPeerConnection.ontrack = onAddStream;
        rtcPeerConnection.addTrack(localStream.getTracks()[0], localStream);
        rtcPeerConnection.addTrack(localStream.getTracks()[1], localStream);

        if (rtcPeerConnection.signalingState === "stable") {
          remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
            new RTCSessionDescription(e));
          remoteDescriptionPromise
            .then(() => {
              return rtcPeerConnection.createAnswer();
            })
            .then(sessionDescription => {
              rtcPeerConnection.setLocalDescription(sessionDescription);
              this.socket.emit("answer", {
                type: "answer", sdp: sessionDescription, room: roomName,
              });
            })
            .catch(error => console.log(error));
        }
      }
    });

    handleSocketEvent("answer", e => {
      if (isCaller && rtcPeerConnection.signalingState === "have-local-offer") {
        remoteDescriptionPromise = rtcPeerConnection.setRemoteDescription(
          new RTCSessionDescription(e));
        remoteDescriptionPromise.catch(error => console.log(error));
      }
    });

    handleSocketEvent("userDisconnected", (e) => {
      remoteVideo.srcObject = null;
      isCaller = true;
    });

    handleSocketEvent("setCaller", callerId => {
      isCaller = this.socket.id === callerId;
    });

    handleSocketEvent("full", e => {
      alert("room is full!");
      window.location.reload();
    });

    const onIceCandidate = e => {
      if (e.candidate) {
        console.log("sending ice candidate");
        this.socket.emit("candidate", {
          type: "candidate",
          label: e.candidate.sdpMLineIndex,
          id: e.candidate.sdpMid,
          candidate: e.candidate.candidate,
          room: roomName,
        });
      }
    }

    const onAddStream = e => {
      remoteVideo.srcObject = e.streams[0];
      remoteStream = e.stream;
    }
  }
}
