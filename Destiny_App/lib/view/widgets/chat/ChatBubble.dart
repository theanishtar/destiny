import 'package:flutter/material.dart';

class ChatBubble extends StatelessWidget {
  final String messageText;
  final String time;

  const ChatBubble({required this.messageText, required this.time});

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          messageText,
          style: TextStyle(fontSize: 16),
        ),
        SizedBox(height: 4), // Khoảng cách giữa tin nhắn và thời gian
        Text(
          time,
          style: TextStyle(fontSize: 12, color: Colors.grey),
        ),
      ],
    );
  }
}
