import 'package:flutter/material.dart';
import 'package:flutter_svg/flutter_svg.dart';
import 'package:login_signup/utils/gobal.colors.dart';

import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/login.view.dart';
import 'package:login_signup/view/signup.view.dart';
import 'package:login_signup/view/widgets/button_screen.dart';
import 'package:flutter/services.dart';
import 'package:flutter_barcode_scanner/flutter_barcode_scanner.dart';
import 'package:http/http.dart' as http;
import 'package:quickalert/quickalert.dart';
import 'package:shared_preferences/shared_preferences.dart';

class SocialLogin extends StatefulWidget {
  const SocialLogin({super.key});

  @override
  State<SocialLogin> createState() => _SocialLoginState();
}

class _SocialLoginState extends State<SocialLogin> {
  late SocketManager socketManager = SocketManager();
  String _scanBarcode = '';
  Future<void> scanQR() async {
    String barcodeScanRes;
    try {
      barcodeScanRes = await FlutterBarcodeScanner.scanBarcode(
          '#ff6666', 'Cancel', true, ScanMode.QR);
      debugPrint(barcodeScanRes);
    } on PlatformException {
      barcodeScanRes = 'Failed to get platform version.';
    }
    if (!mounted) return;

    setState(() {
      _scanBarcode = barcodeScanRes;
      login();
    });
  }

  Future<void> login() async {
    String url = "v1/oauth/login/byapp";

    final response = await http.post(
      Uri.parse(ApiEndPoints.baseUrl + url),
      body: _scanBarcode.toString(), // Truyền số trang cần tải
    );

    if (response.statusCode == 200) {
      Map<String, dynamic> data =
          jsonDecode(Utf8Decoder().convert(response.bodyBytes));

      if (data['data']['roles'][0]['authority'] == "ROLE_USER") {
        String token = data['data']['token'];
        int id = data['data']['id'];

        SharedPreferences prefs = await SharedPreferences.getInstance();
        await prefs.setString('token', token);
        await prefs.setInt('id', id);
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
        socketManager.connectWebSocket();

        runApp(GetMaterialApp(
          home: BottomNavBar(),
        ));
      } else {
        showAlert();
      }
    } else if (response.statusCode == 402) {
      QuickAlert.show(
          context: context,
          title: "Cảnh báo",
          text: "Bạn đã hết thời gian đăng nhập !",
          type: QuickAlertType.error);
    }
  }

  void showAlert() {
    QuickAlert.show(
        context: context,
        title: "Cảnh báo",
        text: "Giao diện không tương thích với quyền của bạn!",
        type: QuickAlertType.error);
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          alignment: Alignment.center,
          child: Text(
            "Hoặc đăng nhập với",
            style: TextStyle(
                color: GlobalColors.textColor, fontWeight: FontWeight.w600),
          ),
        ),
        const SizedBox(height: 15),
        Container(
          width: MediaQuery.of(context).size.width * 0.8,
          child: Row(
            children: [
              ////Google
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  height: 55,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(.1),
                          blurRadius: 10,
                        )
                      ]),
                  child: SvgPicture.asset(
                    "assets/images/google.svg",
                    height: 25,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              ////Facebook
              Expanded(
                child: Container(
                  alignment: Alignment.center,
                  height: 55,
                  decoration: BoxDecoration(
                      color: Colors.white,
                      borderRadius: BorderRadius.circular(6),
                      boxShadow: [
                        BoxShadow(
                          color: Colors.black.withOpacity(.1),
                          blurRadius: 10,
                        )
                      ]),
                  child: SvgPicture.asset(
                    "assets/images/facebook.svg",
                    height: 30,
                  ),
                ),
              ),
              const SizedBox(width: 10),
              ////Twitter
              Expanded(
                child: Container(
                    alignment: Alignment.center,
                    height: 55,
                    decoration: BoxDecoration(
                        color: Colors.white,
                        borderRadius: BorderRadius.circular(6),
                        boxShadow: [
                          BoxShadow(
                            color: Colors.black.withOpacity(.1),
                            blurRadius: 10,
                          )
                        ]),
                    child: InkWell(
                      onTap: () {
                        scanQR();
                      },
                      child: SvgPicture.asset(
                        "assets/images/qr.svg",
                        height: 30,
                      ),
                    )),
              )
            ],
          ),
        )
      ],
    );
  }
}
