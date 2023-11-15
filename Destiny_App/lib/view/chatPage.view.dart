import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/screens/message.view.dart';
import 'package:login_signup/view/widgets/chat/chatSample.dart';
import 'package:login_signup/view/widgets/chat/chatBottomSheet.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ChatPage extends StatefulWidget {
  const ChatPage({super.key});

  @override
  State<ChatPage> createState() => _ChatPageState();
}

class _ChatPageState extends State<ChatPage> {
  SocketManager socketManager = SocketManager();
  UserModel userModel = new UserModel();
  @override
void initState() {
  super.initState();
  SharedPreferences.getInstance().then((prefs) {
    String listTemp = prefs.getString('myListUser') ?? '[]';
    userModel = socketManager.userChatPage;
    print('fullname: ' + userModel.fullname.toString());
     print('fullname: ' + userModel.avatar.toString());
  });
}


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(70.0),
        child: Padding(
          padding: EdgeInsets.only(top: 5),
          child: AppBar(
            leading: BackButton(
              onPressed: () {
                runApp(GetMaterialApp(
                  home: MessageView(),
                ));
              },
            ),
            leadingWidth: 30,
            title: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(30),
                  child: Image.network(
                    userModel.avatar,
                    height: 45,
                    width: 45,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 10),
                  child: Text(
                    userModel.fullname,
                    style: TextStyle(color: GlobalColors.mainColor),
                  ),
                )
              ],
            ),
            actions: [
              Padding(
                padding: EdgeInsets.only(right: 25),
                child: Icon(
                  Icons.phone,
                  color: GlobalColors.mainColor,
                ),
              ),
              Padding(
                padding: EdgeInsets.only(right: 25),
                child: Icon(
                  Icons.video_call,
                  size: 30,
                  color: GlobalColors.mainColor,
                ),
              ),
              Padding(
                padding: EdgeInsets.only(right: 25),
                child: Icon(
                  Icons.more_vert,
                  color: GlobalColors.mainColor,
                ),
              ),
            ],
          ),
        ),
      ),
      body: ListView(
          padding: EdgeInsets.only(top: 20, left: 20, right: 20, bottom: 80),
          children: [
            ChatSample(),
            ChatSample(),
            ChatSample(),
            ChatSample(),
            ChatSample(),
            ChatSample()
          ]),
      bottomSheet: ChatBottomSheet(),
    );
  }
}
