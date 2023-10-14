import 'package:custom_clippers/custom_clippers.dart';
import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';

class ChatSample extends StatelessWidget {
  const ChatSample({super.key});

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
