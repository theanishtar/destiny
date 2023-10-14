import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/widgets/button_screen.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: GlobalColors.mainColor,
      body: SafeArea(
          child: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            SizedBox(
              height: 100,
            ),
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Container(
                  padding: EdgeInsets.only(bottom: 50),
                  child: Image.asset(
                    "assets/images/logo-euphoria.png",
                    width: 250,
                  ),
                ),
                ButtonCustom(
                  customCorlor: Colors.white.withOpacity(0.7),
                  text: "Đăng nhập",
                  onTap: () {
                    Navigator.pushNamed(context, "loginView");
                  },
                ),
                SizedBox(height: 15),
                ButtonCustom(
                  customCorlor:
                      Color.fromARGB(255, 93, 166, 226).withOpacity(0.7),
                  text: "Tạo tài khoản",
                  onTap: () {
                    Navigator.pushNamed(context, "signupView");
                  },
                ),
              ],
            ),
            Spacer(),
            Container(
              margin: EdgeInsets.only(bottom: 40),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Text(
                    "Điều khoản sử dụng",
                    style: TextStyle(color: Colors.white),
                  ),
                  SizedBox(width: 20),
                  Text(
                    "Chính sách bảo mật",
                    style: TextStyle(color: Colors.white),
                  )
                ],
              ),
            )
          ],
        ),
      )),
    );
  }
}
