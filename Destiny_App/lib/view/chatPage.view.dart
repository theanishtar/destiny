import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/login_signup_screen.dart';
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
  late SocketManager socketManager = SocketManager();
  late UserModel userModel = socketManager.userChatPage;
  @override
  void initState() {
    super.initState();
    SharedPreferences.getInstance().then((prefs) {
      userModel = socketManager.userChatPage;

      // Check if userModel is not null before accessing its properties
      // if (userModel != null) {
      //   print('fullname: ' + userModel.fullname.toString());
      //   print('avatar: ' + userModel.avatar.toString());
      // } else {
      //   print('userModel is null');
      // }
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
                  Icons.video_call,
                  size: 30,
                  color: GlobalColors.mainColor,
                ),
              ),
              Padding(
                padding: const EdgeInsets.only(right: 25),
                child: PopupMenuButton(
                  itemBuilder: (context) => [
                    PopupMenuItem(
                        onTap: () {
                          runApp(GetMaterialApp(
                            home: HomeScreen(),
                          ));
                        },
                        child: Row(
                          children: [
                            // Icon(Icons.logout),
                            Padding(
                                padding: EdgeInsets.only(left: 10.0),
                                child: Text("Tất cả ảnh"))
                          ],
                        ))
                  ],
                  child: Icon(
                    Icons.more_vert,
                    color: GlobalColors.mainColor,
                  ),
                ),
              )
              // Padding(
              //   padding: EdgeInsets.only(right: 25),
              //   child: Icon(
              //     Icons.more_vert,
              //     color: GlobalColors.mainColor,
              //   ),
              // ),
            ],
          ),
        ),
      ),
      body: ListView(
          padding: EdgeInsets.only(top: 20, left: 20, right: 20, bottom: 80),
          children: [ChatSample()]),
      bottomSheet: ChatBottomSheet(),
    );
  }
}
