import 'dart:convert';

import 'package:custom_clippers/custom_clippers.dart';
import 'package:flutter/material.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

class ChatSample extends StatefulWidget {
  const ChatSample({super.key});

  @override
  State<ChatSample> createState() => _ChatSampleState();
}

class _ChatSampleState extends State<ChatSample> {
  late SocketManager socketManager = SocketManager();
  List<dynamic> message = [];
@override
void initState() {
  super.initState();
  loadData();
}

Future<void> loadData() async {
  UserModel userModel = socketManager.userChatPage;
  SharedPreferences prefs = await SharedPreferences.getInstance();
  var value = await prefs.getString('token');
  var headers = {
    'Authorization': 'Bearer $value',
    'Content-Type': 'application/json',
  };
  final res = await http.post(
    Uri.parse(ApiEndPoints.baseUrl + "/v1/user/chat/load/messages"),
    headers: headers,
    body: userModel.user_id.toString(),
  );
  Map<String, dynamic> data = jsonDecode(Utf8Decoder().convert(res.bodyBytes));
  message = data.values.toList();
  print('messages: ' + message[0]);
}

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(
          padding: EdgeInsets.only(right: 80),
          child: ClipPath(
            clipper: UpperNipMessageClipper(MessageType.receive),
            child: Container(
              padding:
                  EdgeInsets.only(left: 20, top: 20, bottom: 15, right: 20),
              decoration:
                  BoxDecoration(color: Color(0xFFE1E1E2), boxShadow: []),
              child: Text(
                "Xin chào, Bạn khỏe không?",
                style: TextStyle(fontSize: 16),
              ),
            ),
          ),
        ),
        Container(
          alignment: Alignment.centerRight,
          child: Padding(
            padding: EdgeInsets.only(top: 20, left: 140),
            child: ClipPath(
              clipper: LowerNipMessageClipper(MessageType.send),
              child: Container(
                padding:
                    EdgeInsets.only(left: 20, top: 10, bottom: 24, right: 20),
                decoration:
                    BoxDecoration(color: GlobalColors.mainColor, boxShadow: []),
                child: Text(
                  "Xin chào, Tôi khỏe cảm ơn lời hỏi thăm của bạn.Hy vọng chúng ta sớm gặp nhau.",
                  style: TextStyle(fontSize: 16, color: Colors.white),
                ),
              ),
            ),
          ),
        )
      ],
    );
  }
}
