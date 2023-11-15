
import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/widgets/chat/Activechat.dart';
import 'package:login_signup/view/widgets/chat/RecentCharts.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';

class MessageView extends StatelessWidget {
  const MessageView({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: appBar(),
      body: ListView(
        children: [
          // Padding(
          //   padding: EdgeInsets.symmetric(vertical: 20, horizontal: 20),
          //   child: Text(
          //     "Nhắn tin",
          //     style: TextStyle(
          //         color: GlobalColors.mainColor,
          //         fontSize: 28,
          //         fontWeight: FontWeight.bold),
          //   ),
          // ),
          SizedBox(
            height: 20,
          ),
          Padding(
            padding: EdgeInsets.symmetric(horizontal: 15),
            child: Container(
              padding: EdgeInsets.symmetric(horizontal: 15),
              decoration: BoxDecoration(
                  color: Colors.white,
                  borderRadius: BorderRadius.circular(20),
                  boxShadow: [
                    BoxShadow(
                      color: Colors.grey,
                      blurRadius: 10,
                      spreadRadius: 2,
                      offset: Offset(0, 3),
                    )
                  ]),
              child: Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    Container(
                      width: 300,
                      child: Padding(
                        padding: EdgeInsets.symmetric(horizontal: 15),
                        child: TextFormField(
                          decoration: InputDecoration(
                              hintText: "Tìm kiếm", border: InputBorder.none),
                        ),
                      ),
                    ),
                    Icon(Icons.search, color: GlobalColors.mainColor),
                  ]),
            ),
          ),
          ActiveChat(),
          RecentCharts(),
        ],
      ),
    );
    // const Scaffold(
    //   backgroundColor: Colors.blueGrey,
    //   body: Center(
    //     child: Text(
    //       'Message',
    //       style: TextStyle(
    //         fontSize: 30,
    //         fontWeight: FontWeight.bold,
    //       ),
    //     ),
    //   ),
    // );
  }
}

PreferredSizeWidget appBar() {
  return AppBar(
    title: Text(
      "Nhắn tin",
      style: TextStyle(color: GlobalColors.mainColor),
    ),
    centerTitle: true,
    automaticallyImplyLeading: false,
  );
}
