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
    // socketManager.updateListUser(listUser);
    Timer.periodic(Duration(minutes: 1), (timer) {
      // socketManager.updateMapTime();
      //  setState(() {});
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        child: StreamBuilder<List<UserModel>>(
            stream: socketManager.userStream,
            builder: (BuildContext context,
                AsyncSnapshot<List<UserModel>> snapshot) {
              if (snapshot.connectionState == ConnectionState.waiting) {
                return Center(
                  child: CircularProgressIndicator(),
                );
              } else if (snapshot.hasData) {
                return ListView.builder(
                    controller: socketManager.scrollController,
                    itemCount: snapshot.data!.length,
                    itemBuilder: (BuildContext context, int index) {
                      UserModel m = snapshot.data![index];
                      return Container(
                        margin: EdgeInsets.only(top: 20),
                        padding:
                            EdgeInsets.symmetric(horizontal: 10, vertical: 25),
                        decoration: BoxDecoration(
                            color: Colors.white,
                            borderRadius: BorderRadius.only(
                                topLeft: Radius.circular(35),
                                topRight: Radius.circular(35)),
                            boxShadow: [
                              BoxShadow(
                                color: Colors.grey.withOpacity(0.5),
                                blurRadius: 10,
                                spreadRadius: 2,
                                offset: Offset(0, 2),
                              )
                            ]),
                        child: Column(children: [
                          // for (int i = 0; i < listUser.length; i++)
                          Padding(
                            padding: EdgeInsets.symmetric(vertical: 15),
                            child: InkWell(
                              onTap: () async {
                                socketManager.userChatPage = m;
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
                                          borderRadius:
                                              BorderRadius.circular(35),
                                          child: Image.network(
                                            m.avatar,
                                            height: 65,
                                            width: 65,
                                          ),
                                        ),
                                        CircleAvatar(
                                          radius: 7,
                                          backgroundColor: (m.type == 'LEAVE')
                                              ? Colors.grey
                                              : Colors.green,
                                        ),
                                      ],
                                    ),
                                    Padding(
                                      padding:
                                          EdgeInsets.symmetric(horizontal: 20),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        children: [
                                          Text(
                                            m.fullname,
                                            style: TextStyle(
                                                fontSize: 18,
                                                color: GlobalColors.mainColor,
                                                fontWeight: FontWeight.bold),
                                          ),
                                          SizedBox(height: 10),
                                          Container(
                                            constraints:
                                                BoxConstraints(maxWidth: 100),
                                            child: Text(
                                              m.lastMessage,
                                              style: TextStyle(
                                                  fontSize: 16,
                                                  color: Colors.black54),
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
                                            m.online,
                                            style: TextStyle(
                                                fontSize: 15,
                                                color: Colors.black54),
                                          ),
                                          SizedBox(
                                            height: 10,
                                          ),
                                          if (m.messageUnRead > 0)
                                            Container(
                                              height: 23,
                                              width: 23,
                                              alignment: Alignment.center,
                                              decoration: BoxDecoration(
                                                  color: GlobalColors.mainColor,
                                                  borderRadius:
                                                      BorderRadius.circular(
                                                          25)),
                                              child: Text(
                                                m.messageUnRead.toString(),
                                                style: TextStyle(
                                                    color: Colors.white,
                                                    fontSize: 16,
                                                    fontWeight:
                                                        FontWeight.bold),
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
                    });
              } else if (snapshot.hasError) {
                // Xử lý khi có lỗi xảy ra
                return Center(
                  child: Text('Error loading data: ${snapshot.error}'),
                );
              } else {
                // Trả về một widget trống hoặc thông báo khi không có dữ liệu nào
                return Center(
                  child: Text('No data available'),
                );
              }
            }));
  }
}
