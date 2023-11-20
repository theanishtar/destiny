let $chatHistory;
let $button;
let $textarea;
let $chatHistoryList;
let userFromLoginCustom = "";
let userToLoginCustom = "";

export function init() {
	cacheDOM();
	bindEvents();
}

export function bindEvents() {
	$button.on('click', addMessage.bind(this));
	$textarea.on('keyup', addMessageEnter.bind(this));
}

export function cacheDOM() {
	$chatHistory = $('.messages-chat');
	$button = $('#sendBtn');
	$textarea = $('#message-to-send');
	/*$chatHistoryList = $chatHistory.find('ul');*/
}

export function render(message, userName, img) {
	// alert("hello")
	scrollToBottom();
	// responses
	var templateResponse = Handlebars.compile($("#message-response-template").html());
	var contextResponse = {
		response: message,
		time: getCurrentTime(),
		userName: userName,
		Img: img
	};


	setTimeout(function() {
		$chatHistory.append(templateResponse(contextResponse));
		scrollToBottom();
	}.bind(this), 1500);
}

export function sendMessage(message) {
	let username = $('#userName').val();
	let avatar = $('#userAvatar').val();
	console.log(username)
	if (message.trim() !== '') {
		sendMsg(username, message, avatar);
		scrollToBottom();
		var template = Handlebars.compile($("#message-template").html());
		var context = {
			messageOutput: message,
			time: getCurrentTime(),
			toUserName: selectedUser
		};
		/*	insertData(username,message);*/

		$chatHistory.append(template(context));
		scrollToBottom();
		$textarea.val('');
	}
}

export function sendMessageInterested(fromUser, avatar, sendUser,idPost) {
	let message = "Mình quan tâm đến sản phẩm của bạn!";
	sendMsgInterested(fromUser, message, avatar, sendUser,idPost);
}

export function scrollToBottom() {
	$chatHistory.scrollTop($chatHistory[0].scrollHeight);
}

export function getCurrentTime() {
	return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
}
export function getDate() {
	return new Date().toISOString().slice(0, 10);
}
export function addMessage() {
	sendMessage($textarea.val());
}

export function addMessageEnter(event) {
	// enter was pressed
	if (event.keyCode === 13) {
		addMessage();
	}
}

export function insertData(userName, message) {
	$.ajax({
		url: url + "/insertChat",
		type: "get",
		data: {
			fromLogin: userFromLoginCustom,
			toUser: userToLoginCustom,
			userName: userName,
			message: message,
			time: getCurrentTime()
		},
		success: function(data) {
		},
		error: function(xhr) {
			alert("error")
		}

	});
}
init();

