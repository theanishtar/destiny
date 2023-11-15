import 'dart:async';
import 'dart:convert';
import 'dart:ffi';

import 'package:get/get.dart';
import 'package:image/image.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/api.dart';
import 'package:stomp_dart_client/stomp.dart' as stomp;
import 'package:stomp_dart_client/stomp_frame.dart' as stomp;
import 'package:stomp_dart_client/stomp_config.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SocketManager {
  static final SocketManager _instance = SocketManager._internal();
  factory SocketManager() {
    return _instance;
  }

  SocketManager._internal();
  late stomp.StompClient stompClient;
  final StreamController<String> _streamController = StreamController<String>();
  var user_id = 0;
 UserModel userChatPage = new UserModel();
  bool isConnected = false;
  Map<String, UserModel> mapUser = new Map<String, UserModel>();
  void connectWebSocket() {
    if (isConnected) {
      return; // Already connected, no need to reconnect
    }
    final socketUrl = ApiEndPoints.baseUrl + 'chat';
    stompClient = stomp.StompClient(
      config: StompConfig.sockJS(
        url: socketUrl,
        onConnect: onConnectCallback,
        onWebSocketError: (dynamic error) => print(error.toString()),
      ),
    );

    if (stompClient != null) {
      print(stompClient.config.url);
      stompClient.activate();
    } else {
      print('StompClient is null');
    }
  }

  stomp.StompClient getSocket() {
    return stompClient;
  }

  void onConnectCallback(stomp.StompFrame frame) async {
    isConnected = true;
    SharedPreferences prefs = await SharedPreferences.getInstance();
    user_id = await prefs.getInt('id') ?? 0;
    var check = 26;
    stompClient.send(
      destination: '/app/fetchAllUsers',
      body: 'Hello STOMP!',
    );
    // Subscribe đến một topic
    stompClient.subscribe(
      destination: '/topic/public',
      callback: (stomp.StompFrame frame) {
        // Xử lý tin nhắn nhận được từ topic
        print('Received STOMP Message: ${frame.body}');
        String? data = frame.body;

        Map<String, dynamic> datajson = json.decode(data!);

        for (var key in datajson.keys) {
          if (key == user_id.toString()) {
            var value = datajson[key];
            for (var v in value) {
              UserModel model = new UserModel();
              model.type = v['type'].toString();
              model.user_id = int.parse(v['user_id'].toString());
              model.username = v['username'];
              model.fullname = v['fullname'];
              model.email = v['email'];
              model.avatar = v['avatar'].toString();
              model.messageUnRead = int.parse(v['messageUnRead'].toString());
              model.lastMessage = v['lastMessage'];
              model.online = v['online'];
              model.isFriend = bool.parse(v['friend'].toString());
              mapUser[v['user_id'].toString()] = model;
            }
          }
        }
        print("length: " + mapUser.length.toString());
        _streamController.add(frame.body!);
      },
    );
  }

  void sendMessage() {
    // Gửi tin nhắn STOMP
    stompClient.send(
      destination: '/app/chat',
      body: 'Hello STOMP!',
    );
  }
}
