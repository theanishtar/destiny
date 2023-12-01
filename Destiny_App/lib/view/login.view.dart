import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:http/http.dart' as http;
import 'package:dio/dio.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/signup.view.dart';
import 'package:login_signup/view/widgets/socialLogin.dart';
import 'package:login_signup/view/widgets/text.form.global.dart';
import 'package:quickalert/quickalert.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:stomp_dart_client/stomp.dart' as stomp;
import 'package:stomp_dart_client/stomp_frame.dart' as stomp;
import 'package:stomp_dart_client/stomp_config.dart';

class LoginView extends StatefulWidget {
  LoginView({super.key});

  @override
  State<LoginView> createState() => _LoginViewState();
}

class _LoginViewState extends State<LoginView> {
  late SocketManager manager = SocketManager();
  final TextEditingController emailController = TextEditingController();

  final TextEditingController passwordController = TextEditingController();

  final _formfield = GlobalKey<FormState>();

  bool isButtonPressed = false;

  final storage = const FlutterSecureStorage();

  void showAlert() {
    QuickAlert.show(
        context: context,
        title: "Cảnh báo",
        text: "Giao diện không tương thích với quyền của bạn!",
        type: QuickAlertType.error);
  }

  void showAlertError() {
    QuickAlert.show(
        context: context,
        title: "Thất bại",
        text: "Vui lòng kiểm tra mật khẩu hoạc email !",
        type: QuickAlertType.error);
  }

  void login(String email, password) async {
    try {
      final data = {'email': email, 'password': password};
      final response =
          await http.post(Uri.parse(ApiEndPoints.baseUrl + "v1/oauth/login"),
              headers: <String, String>{
                'Content-Type': 'application/json; charset=UTF-8',
              },
              body: jsonEncode(data));
      if (response.statusCode == 200) {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));

        if (data['roles'][0]['authority'] == "ROLE_USER") {
          String token = data['token'];
          int id = data['id'];
          // String fullname = data['fullname'];
          // String avatar = data['avatar'];
          SharedPreferences prefs = await SharedPreferences.getInstance();
          await prefs.setString('token', token);
          await prefs.setInt('id', id);
          await prefs.setString('email', email);
          await prefs.setString('password', password);
          // await prefs.setString('fullname', fullname);
          // await prefs.setString('avatar', avatar);
          await prefs.setBool('isLoggedIn', true);
          await prefs.setInt('user', 1);
          var headers = {
            'Authorization': 'Bearer $token',
            'Content-Type':
                'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
          };
          final res = await http.get(
              Uri.parse(ApiEndPoints.baseUrl + "v1/user/registrationchat"),
              headers: headers);
          Map<String, dynamic> registrationchat =
              jsonDecode(Utf8Decoder().convert(res.bodyBytes));
          manager.connectWebSocket();

          runApp(GetMaterialApp(
            home: BottomNavBar(),
          ));
        } else {
          showAlert();
        }
      } else {
        showAlertError();
        print('API call failed with status code: ${response.statusCode}');
      }
    } catch (e) {
      print("LOI: " + e.toString());
    }
  }

  void _handleButtonPress() {
    setState(() {
      isButtonPressed = !isButtonPressed;
    });
  }

  @override
  Widget build(BuildContext context) {
    Color buttonColor = isButtonPressed ? Colors.blue : Colors.green;
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
                        keyboardType: TextInputType.text,
                        obscureText: true,
                        decoration: InputDecoration(
                            hintText: "Mật khẩu",
                            border: InputBorder.none,
                            contentPadding: const EdgeInsets.all(0),
                            hintStyle: TextStyle(height: 1)),
                        validator: (value) {
                          if (value!.isEmpty) {
                            return "Vui lòng nhập mật khẩu";
                          }
                        }),
                  ),
                  const SizedBox(height: 20),
                  InkWell(
                    onTap: () {
                      _handleButtonPress();
                      if (_formfield.currentState!.validate()) {
                        login(emailController.text.toString(),
                            passwordController.text.toString());
                      }
                    },
                    child: Container(
                      alignment: Alignment.center,
                      height: 55,
                      decoration: BoxDecoration(
                        color: isButtonPressed ? Colors.red : Colors.black,
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
