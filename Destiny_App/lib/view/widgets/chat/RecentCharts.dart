import 'dart:convert';
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/provider/UserProvider.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/chatPage.view.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/cupertino.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';

class RecentCharts extends StatefulWidget {
  const RecentCharts({Key? key});

  @override
  State<RecentCharts> createState() => _RecentChartsState();
}

class _RecentChartsState extends State<RecentCharts> {
  late SocketManager socketManager = SocketManager();
  // late UserProvider userProvider = UserProvider();
  // late List<UserModel> listUser = [];

  @override
  void initState() {
    super.initState();
    getConnectivity();
    print('length: ' + socketManager.userProvider.listUser.length.toString());
    // if (!SocketManager().isConnected) {
    //   SocketManager().connectWebSocket();
    // }
    // listUser = socketManager.mapUser.values.toList();
    socketManager.userProvider
        .updateUserList(socketManager.mapUser.values.toList());
    Timer.periodic(Duration(minutes: 1), (timer) {
      // socketManager.updateMapTime();
      //  setState(() {});
    });
  }

  late StreamSubscription subscription;
  var isDeviceConnected = false;
  bool isAlertSet = false;

  Future<void> getConnectivity() async {
    subscription = Connectivity()
        .onConnectivityChanged
        .listen((ConnectivityResult event) async {
      isDeviceConnected = await InternetConnectionChecker().hasConnection;
      if (!isDeviceConnected && !isAlertSet) {
        showDialogBox();
        setState(() => isAlertSet = true);
      } else if (isDeviceConnected && isAlertSet) {
        setState(() => isAlertSet = false);
      }
    });
  }

  @override
  void dispose() {
    subscription.cancel();
    super.dispose();
  }

  void showDialogBox() {
    showCupertinoDialog<String>(
      context: context,
      builder: (BuildContext context) => CupertinoAlertDialog(
        title: const Text("Không có kết nối"),
        content: const Text("Vui lòng kiểm tra kết nối internet"),
        actions: <Widget>[
          TextButton(
            onPressed: () async {
              Navigator.pop(context, 'Cancel');
              isDeviceConnected =
                  await InternetConnectionChecker().hasConnection;
              if (!isDeviceConnected) {
                showDialogBox();
                setState(() => isAlertSet = true);
              }
            },
            child: const Text("OK"),
          ),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
        margin: EdgeInsets.only(top: 20),
        padding: EdgeInsets.symmetric(horizontal: 10, vertical: 25),
        decoration: BoxDecoration(
          color: Colors.white,
          borderRadius: BorderRadius.only(
            topLeft: Radius.circular(35),
            topRight: Radius.circular(35),
          ),
          boxShadow: [
            BoxShadow(
              color: Colors.grey.withOpacity(0.5),
              blurRadius: 10,
              spreadRadius: 2,
              offset: Offset(0, 2),
            )
          ],
        ),
        child: SizedBox(
          // Wrap your ListView.builder with SizedBox
          height: MediaQuery.of(context).size.height *
              0.7, // Set a specific height or use a different value
          child: ListView.builder(
            itemCount: socketManager.userProvider.listUser.length,
            itemBuilder: (BuildContext context, int index) {
              return Padding(
                padding: EdgeInsets.symmetric(vertical: 15),
                child: InkWell(
                  onTap: () async {
                    socketManager.userChatPage =
                        socketManager.userProvider.listUser[index];
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
                              child: FadeInImage.assetNetwork(
                                placeholder:
                                    'http://pluspng.com/img-png/png-user-icon-person-icon-png-people-person-user-icon-2240.png',
                                image: socketManager
                                        .userProvider.listUser[index].avatar ??
                                    '',
                                height: 65,
                                width: 65,
                                fit: BoxFit
                                    .cover, // Có thể điều chỉnh theo yêu cầu của bạn
                              ),
                            ),
                            CircleAvatar(
                              radius: 7,
                              backgroundColor: (socketManager
                                          .userProvider.listUser[index].type ==
                                      'LEAVE')
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
                                socketManager
                                    .userProvider.listUser[index].fullname,
                                style: TextStyle(
                                  fontSize: 18,
                                  color: GlobalColors.mainColor,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                              SizedBox(height: 10),
                              Container(
                                constraints: BoxConstraints(maxWidth: 100),
                                child: Text(
                                  socketManager
                                      .userProvider.listUser[index].lastMessage,
                                  style: TextStyle(
                                    fontSize: 16,
                                    color: Colors.black54,
                                  ),
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
                                socketManager
                                    .userProvider.listUser[index].online,
                                style: TextStyle(
                                  fontSize: 15,
                                  color: Colors.black54,
                                ),
                              ),
                              SizedBox(height: 10),
                              if (socketManager.userProvider.listUser[index]
                                      .messageUnRead >
                                  0)
                                Container(
                                  height: 23,
                                  width: 23,
                                  alignment: Alignment.center,
                                  decoration: BoxDecoration(
                                    color: GlobalColors.mainColor,
                                    borderRadius: BorderRadius.circular(25),
                                  ),
                                  child: Text(
                                    socketManager.userProvider.listUser[index]
                                        .messageUnRead
                                        .toString(),
                                    style: TextStyle(
                                      color: Colors.white,
                                      fontSize: 16,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                )
                            ],
                          ),
                        )
                      ],
                    ),
                  ),
                ),
              );
            },
          ),
        ));
  }
}
