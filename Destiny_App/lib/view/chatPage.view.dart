import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/widgets/chat/chatSample.dart';
import 'package:login_signup/view/widgets/chat/chatBottomSheet.dart';

class ChatPage extends StatelessWidget {
  const ChatPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: PreferredSize(
        preferredSize: Size.fromHeight(70.0),
        child: Padding(
          padding: EdgeInsets.only(top: 5),
          child: AppBar(
            leadingWidth: 30,
            title: Row(
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(30),
                  child: Image.asset(
                    "assets/images/conan.png",
                    height: 45,
                    width: 45,
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(left: 10),
                  child: Text(
                    "Lê Bích Vi",
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
