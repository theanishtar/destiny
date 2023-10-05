const url = 'http://localhost:8080';
let stompClient = null;
let stompClientComment = null;
let selectedUser = null;
let newMessages = new Map();
let image = null;
let userNamSession = null;
let toUserComment = null;
function connectToChat(userName) {
	/*	console.log("connecting to chat...")
		console.log("Username: " + userName)*/
	let socket = new SockJS(url + '/chat');
	let socketComment = new SockJS(url + '/comment');
	stompClient = Stomp.over(socket);
	stompClientComment = Stomp.over(socketComment);
	stompClient.connect({}, function(frame) {
		/*console.log("connected to: " + frame);*/
		stompClient.subscribe("/topic/messages/" + userName, function(response) {
			let data = JSON.parse(response.body);
			/*console.log("data_fromlogin1: " + data.img);*/
			if (selectedUser === data.fromLogin) {
				render(data.message, data.fromLogin, data.img);
			} else {
				newMessages.set(data.fromLogin, data.message, data.img);
				$('#userNameAppender_' + data.fromLogin).append('<span class="countMesages" id="newMessage_' + data.fromLogin + '">+1</span>');
			}
		});
		stompClient.subscribe("/topic/public", function(response) {
			let data = JSON.parse(response.body);
			let usersTemplateHTML = "";
			let username = $('#userName').val();
			for (let key of Object.keys(data)) {
				let online = "";
				let timeOff = "";
				let count = "";
				let value = data[key];
				if (key != username) {
					if (value.type === 'JOIN') {
						online = '<div class="online"></div>';
					} else if (value.messageUnRead > 0) {
						count = '<span class="countMesages badge">+' + value.messageUnRead + '</span>' + '</p>';
					}
					else {
						timeOff = '<div class="timer">12 sec</div>';
					}
					usersTemplateHTML = usersTemplateHTML + '<a href="#"  onclick="selectUser(\'' + key + '\')"><div class="discussion">' +
						'<div class="photo"  id="userNameAppenderImg_' + key +
						'" style="background-image: url(' + value.image + ');">' + online +
						'</div>' +
						'<div class="desc-contact">' +
						'<p id="userNameAppender_' + key + '" class="name">' + value.fullName +
						'<p class="message">' + value.lastMessage + '</p>' +
						'</div>' + timeOff +
						'</div></a>';
				}

			}
			//<span class="new-notifications">Mới</span>
			$('#usersList').html(usersTemplateHTML);
		});
		stompClient.send("/app/fetchAllUsers");

	});
	stompClientComment.connect({}, function(frame) {
		stompClientComment.subscribe("/topic/loadComments", function(response) {
			let count = 0;
			/*let dropdownNotification = document.querySelector(".notificationCount");*/
			for (let key of Object.keys(data)) {
				let value = data[key];
				if (value.userNameSession == userNamSession) {
					if (value.cmt_Status === false) {
						count++;
					}
				}
			}
			if (count > 0) {
				$('#notifyMenu').append('<div class="notification"></div>');
				$('#notificationCount').append('<span>' + count + '</span>');
			}
		});
		stompClientComment.send("/app/loadNotification");
	});
	window.event.preventDefault();
}

function sendMsg(from, text, img) {
	stompClient.send("/app/chat/" + selectedUser, {}, JSON.stringify({
		fromLogin: from,
		message: text,
		img: img
	}));
	insertData(from, text);
}
function notify() {

}

function sendMsgInterested(from, text, img, sendUser, idPost) {
	stompClient.send("/app/chat/" + sendUser, {}, JSON.stringify({
		fromLogin: from,
		message: text,
		img: img
	}));
	/*insertData(from, text);*/


	$.ajax({
		url: url + "/insertChat",
		type: "get",
		data: {
			fromLogin: from,
			toUser: sendUser,
			userName: from,
			message: text,
			time: getCurrentTime()
		},
		success: function(data) {
		},
		error: function(xhr) {
			/*alert("error")*/
		}

	});
	$.ajax({
		url: url + "/Interested",
		type: "get",
		data: {
			userName: sendUser,
			post: idPost
		},
		success: function(data) {
		},
		error: function(xhr) {
			/*alert("error")*/
		}

	});



}

function registration(userName) {
	userNamSession = userName;
	$.ajax({
		url: url + "/registration/" + userName,
		type: "get",
		data: {
			userName: userName
		},
		success: function(data) {
			connectToChat(userName);
		},
		error: function(xhr) {
			/*alert("error")*/
		}

	})
}
function notification() {
	$.ajax({
		url: url + "/registration/" + userName,
		type: "get",
		data: {
			userName: userName
		},
		success: function(data) {
			connectToChat(userName);
		},
		error: function(xhr) {
			/*alert("error")*/
		}

	})
}

function selectUser(userName) {
	let userLogin = document.getElementById('userName').value;
	selectedUser = userName;
	let fullName = document.getElementById("userNameAppender_" + userName).textContent.trim();
	image = document.getElementById("userNameAppenderImg_" + userName).style.backgroundImage.slice(5, -2);
	let isNew = document.getElementById("newMessage_" + userName) !== null;
	if (isNew) {
		let element = document.getElementById("newMessage_" + userName);
		element.parentNode.removeChild(element);
		render(newMessages.get(userName), userName, image);
	}
	document.querySelectorAll(".message ,.time").forEach((e) => {
		e.remove();
	})
	userFromLoginCustom = userLogin;
	userToLoginCustom = selectedUser;
	createChats(userLogin, userName);

	/*let container_message = document.querySelector(".container_message"),
		clearfix = container_message.querySelector(".people-list .clearfix"),
		messageNull = container_message.querySelector(".message-null");
	close_mess = container_message.querySelector(".close_mess");
	clearfix.addEventListener("click", () => {
		container_message.classList.add("active");
		messageNull.style.display = 'none';
	});*/
	//stompClientComment.send("/app/loadNotification/" + postUser);

	$('#selectedUserId').html('');
	$('#selectedUserImageId').html('');
	$('#selectedUserImageId').append('<div class="photo"' +
		' style="background-image: url(' + image + ');">' +
		'<div class="online"></div>' +
		'</div>');
	$('#selectedUserId').append('<p class="name">' + fullName + '</p>');
}
function createChats(userLogin, userName) {
	let chatName = userName;
	$.ajax({
		url: url + "/createChats/" + chatName,
		type: "get",
		data: {
			fromLogin: userLogin,
			toUser: userName,
		},
		success: function(data) {
			if (data != null) {
				$chatHistory.append(data);
			}
		},
		error: function(xhr) {
		/*	alert("error")*/
		}

	})
}

