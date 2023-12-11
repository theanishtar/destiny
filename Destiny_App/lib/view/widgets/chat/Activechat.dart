import 'package:flutter/material.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';

class ActiveChat extends StatefulWidget {
  const ActiveChat({super.key});

  @override
  State<ActiveChat> createState() => _ActiveChatState();
}

class _ActiveChatState extends State<ActiveChat> {
  late SocketManager socketManager = SocketManager();
  late List<UserModel> listUser = socketManager.mapUser.values.toList();
  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 25, left: 5),
      child: SingleChildScrollView(
        scrollDirection: Axis.horizontal,
        child: Row(
          children: [
            for (int i = 0; i < listUser.length; i++)
              Padding(
                padding: EdgeInsets.symmetric(vertical: 10, horizontal: 12),
                child: Container(
                  width: 65,
                  height: 65,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(35),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.grey.withOpacity(0.5),
                          blurRadius: 10,
                          spreadRadius: 2,
                          offset: Offset(0, 3),
                        )
                      ]),
                  child: Stack(
                    alignment: Alignment.bottomRight,
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(35),
                        child: Image.network(listUser[i].avatar ??
                            'http://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png'),
                      ),
                      CircleAvatar(
                        radius: 7,
                        backgroundColor: (listUser[i]!.type == 'LEAVE')
                            ? Colors.grey
                            : Colors.green,
                      ),
                    ],
                  ),
                ),
              )
          ],
        ),
      ),
    );
  }
}
