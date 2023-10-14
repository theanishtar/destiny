import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/login.view.dart';
import 'package:login_signup/view/widgets/buttonSignup.form.global.dart';
import 'package:login_signup/view/widgets/socialLogin.dart';
import 'package:login_signup/view/widgets/socialSignup.dart';
import 'package:login_signup/view/widgets/text.form.global.dart';

class SignupView extends StatelessWidget {
  SignupView({super.key});
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();
  final TextEditingController fullnameController = TextEditingController();
  final TextEditingController confirmPasswordController =
      TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SingleChildScrollView(
        child: SafeArea(
          child: Container(
            width: double.infinity,
            padding: const EdgeInsets.all(15.0),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const SizedBox(height: 35),
                Container(
                  alignment: Alignment.center,
                  child: Text(
                    "Destiny",
                    style: TextStyle(
                        color: GlobalColors.mainColor,
                        fontSize: 35,
                        fontWeight: FontWeight.bold),
                  ),
                ),

                const SizedBox(height: 30),
                Text(
                  "Tạo tài khoản của bạn",
                  style: TextStyle(
                      color: GlobalColors.textColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 20),
                ////Email Input
                TextFormGlobal(
                  controller: emailController,
                  text: "Email",
                  obscure: false,
                  textInputType: TextInputType.emailAddress,
                ),
                const SizedBox(height: 10),
                //Fullname input
                TextFormGlobal(
                    controller: fullnameController,
                    text: "Họ và tên",
                    textInputType: TextInputType.text,
                    obscure: false),
                ////Password input
                const SizedBox(height: 10),
                TextFormGlobal(
                    controller: passwordController,
                    text: "Mật khẩu",
                    textInputType: TextInputType.text,
                    obscure: false),
                const SizedBox(height: 10),
                TextFormGlobal(
                    controller: passwordController,
                    text: "Xác nhận mật khẩu",
                    textInputType: TextInputType.text,
                    obscure: false),
                const SizedBox(height: 20),
                const ButtonGlobalSignup(),
                const SizedBox(height: 25),
                const SocialSignup(),
              ],
            ),
          ),
        ),
      ),
      bottomNavigationBar: Container(
        height: 50,
        color: Colors.white,
        alignment: Alignment.center,
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              "Bạn đã có tài khoản?",
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return LoginView();
                    },
                  ),
                );
              },
              child: Text(
                "Đăng nhập",
                style: TextStyle(color: GlobalColors.mainColor),
              ),
            )
          ],
        ),
      ),
    );
  }
}
