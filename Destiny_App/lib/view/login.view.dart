import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/signup.view.dart';
import 'package:login_signup/view/widgets/socialLogin.dart';
import 'package:login_signup/view/widgets/text.form.global.dart';

class LoginView extends StatelessWidget {
  LoginView({super.key});
  final TextEditingController emailController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void login(String email, password) async {
    String url = "http://192.168.1.165:8080/";
    print("aaaaaaaaa  " + email);
    print("bbbbbb  " + password);

    try {
      final data = {'email': email, 'password': password};
      final response = await http.post(Uri.parse(url + "v1/oauth/login"),
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode(data));
      if (response.statusCode == 200) {
        // Successful API call
        print("ok");
        print('Response data: ${response.body}');
        Get.off(BottomNavBar());
      } else {
        // Handle API call errors
        print('API call failed with status code: ${response.statusCode}');
      }
    } catch (e) {
      print("LOI: " + e.toString());
    }
  }

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

                const SizedBox(height: 60),
                Text(
                  "Đăng nhập vào tài khoản của bạn ",
                  style: TextStyle(
                      color: GlobalColors.textColor,
                      fontSize: 16,
                      fontWeight: FontWeight.w500),
                ),
                const SizedBox(height: 25),
                ////Email Input

                Container(
                  height: 55,
                  padding: const EdgeInsets.only(top: 3, left: 15),
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 7,
                        )
                      ]),
                  child: TextFormField(
                    controller: emailController,
                    validator: (value) =>
                        value!.isEmpty ? "Vui lòng nhập email" : null,
                    keyboardType: TextInputType.emailAddress,
                    obscureText: false,
                    decoration: InputDecoration(
                        hintText: "Email",
                        border: InputBorder.none,
                        contentPadding: const EdgeInsets.all(0),
                        hintStyle: TextStyle(height: 1)),
                  ),
                ),
                ////Password input
                const SizedBox(height: 20),
                Container(
                  height: 55,
                  padding: const EdgeInsets.only(top: 3, left: 15),
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 7,
                        )
                      ]),
                  child: TextFormField(
                    controller: passwordController,
                    validator: (value) =>
                        value!.isEmpty ? "Vui lòng nhập mật khẩu" : null,
                    keyboardType: TextInputType.text,
                    obscureText: true,
                    decoration: InputDecoration(
                        hintText: "Mật khẩu",
                        border: InputBorder.none,
                        contentPadding: const EdgeInsets.all(0),
                        hintStyle: TextStyle(height: 1)),
                  ),
                ),
                const SizedBox(height: 20),
                InkWell(
                  onTap: () {
                    login(emailController.text.toString(),
                        passwordController.text.toString());
                  },
                  child: Container(
                    alignment: Alignment.center,
                    height: 55,
                    decoration: BoxDecoration(
                      color: GlobalColors.mainColor,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(0.1),
                          blurRadius: 10,
                        ),
                      ],
                    ),
                    child: const Text(
                      "Đăng nhập",
                      style: TextStyle(
                          color: Colors.white, fontWeight: FontWeight.w600),
                    ),
                  ),
                ),
                // ButtonGlobal(
                //     email: emailController.text,
                //     password: passwordController.text),
                const SizedBox(height: 35),
                const SocialLogin(),
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
              "Bạn chưa có tài khoản?",
            ),
            InkWell(
              onTap: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(
                    builder: (context) {
                      return SignupView();
                    },
                  ),
                );
              },
              child: Text(
                "Đăng ký",
                style: TextStyle(color: GlobalColors.mainColor),
              ),
            )
          ],
        ),
      ),
    );
  }
}
