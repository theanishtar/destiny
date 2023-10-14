import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/utils/gobal.colors.dart';

class NotificationView extends StatefulWidget {
  const NotificationView({super.key});

  @override
  State<NotificationView> createState() => _NotificationViewState();
}

class _NotificationViewState extends State<NotificationView> {
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
      body: ListView.separated(
          physics: ClampingScrollPhysics(),
          padding: EdgeInsets.zero,
          itemBuilder: (context, index) {
            return ListTile(
              leading: Container(
                height: 50,
                width: 50,
                decoration: BoxDecoration(
                    image: DecorationImage(
                        image: AssetImage("assets/images/tb.png"),
                        fit: BoxFit.cover)),
              ),
              title: Text(
                "Thông báo",
                style: TextStyle(color: Colors.black),
              ),
              subtitle: Text(
                "Bạn có thông báo mới.",
                style: TextStyle(color: Colors.grey),
              ),
              onTap: () {},
              enabled: true,
            );
          },
          separatorBuilder: (context, index) {
            return Divider();
          },
          itemCount: 35),
    );
  }
}
