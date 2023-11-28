import 'dart:convert';
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/chatPage.view.dart';
import 'package:shared_preferences/shared_preferences.dart';

class RecentCharts extends StatefulWidget {
  const RecentCharts({super.key});

  @override
  State<RecentCharts> createState() => _RecentChartsState();
}

class _RecentChartsState extends State<RecentCharts> {
  late SocketManager socketManager = SocketManager();
  // late List<UserModel> listUser = socketManager.mapUser.values.toList();
  late List<UserModel> listUser = [];
  @override
  void initState() {
    super.initState();
    if (!SocketManager().isConnected) {
      SocketManager().connectWebSocket();
    }
    listUser = socketManager.mapUser.values.toList();
    Timer.periodic(Duration(minutes: 1), (timer) {
      // socketManager.updateMapTime();
      //  setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.only(top: 20),
      padding: EdgeInsets.symmetric(horizontal: 10, vertical: 25),
      decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
              topLeft: Radius.circular(35), topRight: Radius.circular(35)),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              blurRadius: 10,
              spreadRadius: 2,
              offset: Offset(0, 2),
            )
          ]),
      child: Column(children: [
        for (int i = 0; i < listUser.length; i++)
          Padding(
            padding: EdgeInsets.symmetric(vertical: 15),
            child: InkWell(
              onTap: () async {
                // SharedPreferences prefs = await SharedPreferences.getInstance();
                // String jsonUser = json.encode(listUser[i]);
                // await prefs.setString('myListUser',jsonUser);
                socketManager.userChatPage = listUser[i];
                runApp(GetMaterialApp(
                  home: ChatPage(),
                ));
              },
              child: Container(
                height: 65,
                child: Row(
                  children: [
                    Stack(
                      alignment: Alignment.bottomRight,
                      children: [
                        ClipRRect(
                          borderRadius: BorderRadius.circular(35),
                          child: Image.network(
                            listUser[i]!.avatar,
                            height: 65,
                            width: 65,
                          ),
                        ),
                        CircleAvatar(
                          radius: 7,
                          backgroundColor: (listUser[i]!.type == 'LEAVE')
                              ? Colors.grey
                              : Colors.green,
                        ),
                      ],
                    ),
                    Padding(
                      padding: EdgeInsets.symmetric(horizontal: 20),
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text(
                            listUser[i]!.fullname,
                            style: TextStyle(
                                fontSize: 18,
                                color: GlobalColors.mainColor,
                                fontWeight: FontWeight.bold),
                          ),
                          SizedBox(height: 10),
                          Container(
                            constraints: BoxConstraints(maxWidth: 100),
                            child: Text(
                              listUser[i]!.lastMessage,
                              style: TextStyle(
                                  fontSize: 16, color: Colors.black54),
                              maxLines: 1,
                              overflow: TextOverflow.ellipsis,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Spacer(),
                    Padding(
                      padding: const EdgeInsets.only(right: 10),
                      child: Column(
                        children: [
                          Text(
                            listUser[i]!.online,
                            style:
                                TextStyle(fontSize: 15, color: Colors.black54),
                          ),
                          SizedBox(
                            height: 10,
                          ),
                          if (listUser[i]!.messageUnRead > 0)
                            Container(
                              height: 23,
                              width: 23,
                              alignment: Alignment.center,
                              decoration: BoxDecoration(
                                  color: GlobalColors.mainColor,
                                  borderRadius: BorderRadius.circular(25)),
                              child: Text(
                                listUser[i]!.messageUnRead.toString(),
                                style: TextStyle(
                                    color: Colors.white,
                                    fontSize: 16,
                                    fontWeight: FontWeight.bold),
                              ),
                            )
                        ],
                      ),
                    )
                  ],
                ),
              ),
            ),
          )
      ]),
    );
  }
}
