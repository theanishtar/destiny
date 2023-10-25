import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/login.view.dart';
import 'package:http/http.dart' as http;
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
  final _formfield = GlobalKey<FormState>();
  void signup(String email, fullname, password) async {
    // String url = "http://192.168.137.1:8080/";

    print("aaaaaaaaa  " + email);
    print("bbbbbb  " + password);

    try {
      final data = {'email': email, 'fullname': fullname, 'password': password};
      final response =
          await http.post(Uri.parse(ApiEndPoints.baseUrl + "v1/oauth/register"),
              headers: <String, String>{
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: jsonEncode(data));
      if (response.statusCode == 200) {
        // Successful API call
        print("ok");
        print('Response data: ${response.body}');
        runApp(GetMaterialApp(
          home: BottomNavBar(),
        ));
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
          child: Form(
            key: _formfield,
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
                      keyboardType: TextInputType.emailAddress,
                      obscureText: false,
                      decoration: InputDecoration(
                          hintText: "Email",
                          border: InputBorder.none,
                          contentPadding: const EdgeInsets.all(0),
                          hintStyle: TextStyle(height: 1)),
                      validator: (value) {
                        if (value!.isEmpty) {
                          return "Vui lòng nhập email ";
                        }
                        bool emailValid =
                            RegExp(r"[a-z0-9]+@[a-z]+\.[a-z]{2,3}")
                                .hasMatch(value);
                        if (!emailValid) {
                          return "Vui lòng nhập đúng định dạng email";
                        }
                      },
                    ),
                  ),
                  const SizedBox(height: 10),
                  //Fullname input
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
                          controller: fullnameController,
                          keyboardType: TextInputType.text,
                          obscureText: false,
                          decoration: InputDecoration(
                              hintText: "Họ và tên",
                              border: InputBorder.none,
                              contentPadding: const EdgeInsets.all(0),
                              hintStyle: TextStyle(height: 1)),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Vui lòng nhập họ và tên";
                            }
                          })),
                  ////Password input
                  const SizedBox(height: 10),
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
                          keyboardType: TextInputType.text,
                          obscureText: false,
                          decoration: InputDecoration(
                              hintText: "Mật khẩu",
                              border: InputBorder.none,
                              contentPadding: const EdgeInsets.all(0),
                              hintStyle: TextStyle(height: 1)),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Vui lòng nhập mật khẩu";
                            }
                          })),
                  const SizedBox(height: 10),
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
                          controller: confirmPasswordController,
                          keyboardType: TextInputType.text,
                          obscureText: false,
                          decoration: InputDecoration(
                              hintText: "Xác nhận mật khẩu",
                              border: InputBorder.none,
                              contentPadding: const EdgeInsets.all(0),
                              hintStyle: TextStyle(height: 1)),
                          validator: (value) {
                            if (value!.isEmpty) {
                              return "Vui lòng nhập xác nhận mật khẩu";
                            }
                            // if (confirmPasswordController !=
                            //     passwordController) {
                            //   return "Mật khẩu xác nhận chưa trùng khớp";
                            // }
                          })),
                  const SizedBox(height: 20),
                  InkWell(
                    onTap: () {
                      if (_formfield.currentState!.validate()) {
                        signup(
                          emailController.text.toString(),
                          fullnameController.text.toString(),
                          passwordController.text.toString(),
                        );
                      }
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
                        "Đăng ký",
                        style: TextStyle(
                            color: Colors.white, fontWeight: FontWeight.w600),
                      ),
                    ),
                  ),
                  const SizedBox(height: 25),
                  const SocialSignup(),
                ],
              ),
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
