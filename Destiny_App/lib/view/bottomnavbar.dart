import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/screens/screen1.dart';
import 'package:login_signup/view/screens/screen2.dart';
import 'package:login_signup/view/screens/message.view.dart';
import 'package:login_signup/view/screens/notifications.view.dart';
import 'package:curved_navigation_bar/curved_navigation_bar.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/view/screens/profile.view.dart';

class BottomNavBar extends StatefulWidget {
  const BottomNavBar({Key? key}) : super(key: key);
  static final GlobalKey<_BottomNavBarState> navKey =
      GlobalKey<_BottomNavBarState>();
  @override
  State<BottomNavBar> createState() => _BottomNavBarState();
}

class _BottomNavBarState extends State<BottomNavBar> {
  int _selectedIndex = 0;
  void setSelectedIndex(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  List<Widget> screens = [
    Screen1(),
    FollowView(),
    MessageView(),
    NotificationView(),
    ProfileView(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      extendBody: true,
      backgroundColor: Colors.red,
      bottomNavigationBar: CurvedNavigationBar(
        index: _selectedIndex,
        backgroundColor: Colors.transparent,
        items: const [
          Icon(
            Icons.home,
            color: Color.fromARGB(255, 8, 162, 240),
            size: 30,
          ),
          Icon(
            Icons.favorite,
            color: Color.fromARGB(255, 8, 162, 240),
            size: 30,
          ),
          Icon(
            Icons.mark_unread_chat_alt_outlined,
            size: 30,
            color: Color.fromARGB(255, 8, 162, 240),
          ),
          Icon(
            Icons.notifications,
            size: 30,
            color: Color.fromARGB(255, 8, 162, 240),
          ),
          Icon(
            Icons.person,
            size: 30,
            color: Color.fromARGB(255, 8, 162, 240),
          ),
        ],
        onTap: (index) {
          setState(() {
            _selectedIndex = index;
          });
        },
      ),
      body: screens[_selectedIndex],
    );
  }
}
