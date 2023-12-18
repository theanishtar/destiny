import 'dart:async';
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:hexcolor/hexcolor.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/login_signup_screen.dart';
import 'package:loading_animation_widget/loading_animation_widget.dart';
import 'package:http/http.dart' as http;
import 'package:quickalert/quickalert.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SplashScreen extends StatefulWidget {
  const SplashScreen({super.key});

  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {
  late SocketManager manager = SocketManager();
  void initState() {
    super.initState();
    Timer(
        const Duration(
            seconds: 10), // Adjust  the  duration according to requirements.
        // For Navigation
        () async {
      SharedPreferences prefs = await SharedPreferences.getInstance();
      String email = prefs.getString('email').toString();
      String password = prefs.getString('password').toString();
      print('email: ' + email);
      print('pass: ' + password);
      if (email != "null" && password != "null") {
        // print('object');
        login(email, password);
      } else {
        runApp(GetMaterialApp(
          home: HomeScreen(),
        ));
      }
    });
  }

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
    Navigator.of(context).pushReplacement(
      MaterialPageRoute(
        builder: (BuildContext context) => const HomeScreen(),
      ),
    );
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

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: const BoxDecoration(
          gradient: LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.topRight,
              colors: [Color.fromARGB(255, 252, 212, 225), Color(0xFFB5FFFC)])),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Image.asset(
                "assets/images/logo-euphoria.png",
                width: 350,
              ),
              const SizedBox(height: 40),
              Center(
                  child: LoadingAnimationWidget.staggeredDotsWave(
                      color: Colors.pink.shade400, size: 100))
              // Lottie.network(
              //     "https://lottie.host/b5cba365-85ee-4e4a-b916-0b85866a39aa/NShxkixgVU.json",
              //     height: 100)
            ],
          ),
        ),
      ),
    );
  }
}
