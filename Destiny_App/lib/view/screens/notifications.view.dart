import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/models/NotifyModel.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter/cupertino.dart';
import 'package:internet_connection_checker/internet_connection_checker.dart';

class NotificationView extends StatefulWidget {
  const NotificationView({Key? key});

  @override
  State<NotificationView> createState() => _NotificationViewState();
}

class _NotificationViewState extends State<NotificationView> {
  bool hasFollower = true;
  late SocketManager socketManager = SocketManager();

  @override
  void initState() {
    super.initState();
    getConnectivity();
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
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "Thông báo",
          style: TextStyle(
            color: GlobalColors.mainColor,
          ),
        ),
        automaticallyImplyLeading: false,
        centerTitle: true,
      ),
      body: Container(
        child: StreamBuilder<List<NotifyModel>>(
          stream: socketManager.notifyStream,
          builder: (BuildContext context,
              AsyncSnapshot<List<NotifyModel>> snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return Center(
                child: CircularProgressIndicator(),
              );
            } else if (snapshot.hasData) {
              return ListView.builder(
                physics: ClampingScrollPhysics(),
                padding: EdgeInsets.zero,
                itemCount: snapshot.data!.length,
                itemBuilder: (BuildContext context, int index) {
                  NotifyModel n = snapshot.data![index];
                  return ListTile(
                    leading: Container(
                      height: 50,
                      width: 50,
                      decoration: BoxDecoration(
                        image: DecorationImage(
                          image: NetworkImage(n.avatar),
                          fit: BoxFit.cover,
                        ),
                      ),
                    ),
                    title: Text(
                      n.fullname,
                      style: TextStyle(color: Colors.black),
                    ),
                    subtitle: Text(
                      "Bạn có thông báo mới.",
                      style: TextStyle(color: Colors.grey),
                    ),
                    trailing: hasFollower
                        ? ElevatedButton(
                            onPressed: () {
                              // Handle when the user presses the 'Follow' button
                            },
                            child: Text('Theo dõi'),
                          )
                        : null,
                    onTap: () {},
                    enabled: true,
                  );
                },
                // itemCount: snapshot.data!.length,
              );
            } else if (snapshot.hasError) {
              return Center(
                child: Text('Error: ${snapshot.error}'),
              );
            } else {
              // Return a default widget if none of the conditions are met
              return Center(
                child: Text('No data available'),
              );
            }
          },
        ),
      ),
    );
  }
}
