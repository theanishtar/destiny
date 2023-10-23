import 'dart:convert';
import 'dart:io';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:login_signup/models/Users.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EditProfile extends StatefulWidget {
  @override
  State<EditProfile> createState() => _EditProfileState();
}

String? avatar;
String? fullname;

class _EditProfileState extends State<EditProfile> {
  @override
  void initState() {
    super.initState();
    this.getData();
  }

  Future getData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };

    http.Response response;
    response = await http.get(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/profile/load/data"),
        headers: headers);
    if (response.statusCode == 200) {
      List<dynamic> data = json.decode('[' + response.body + ']');
      print(data);
      for (var item in data) {
        String name = item['fullname'] ?? "N/A";
        // List<dynamic> roles = item['roles'] ?? "N/A";
        String image = item['avartar'] ?? "N/A";
        String email = item['email'] ?? "N/A";
        String refreshToken = item['refreshToken'] ?? "N/A";
        setState(() {
          avatar = image;
          fullname = name;
        });
        // Sử dụng dữ liệu này theo nhu cầu của bạn
        // print('Name: $name');
        // print('Avatar: $avatar');
        // print('Token: $email');
        // print('Refresh Token: $refreshToken');
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          title: Text("Chỉnh sửa trang cá nhân"),
        ),
        body: Container(
          padding: EdgeInsets.only(left: 15, top: 20, right: 15),
          child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
            },
            child: ListView(
              children: [
                Center(
                  child: Stack(
                    children: [
                      Container(
                        width: 130,
                        height: 130,
                        decoration: BoxDecoration(
                            border: Border.all(width: 4, color: Colors.white),
                            boxShadow: [
                              BoxShadow(
                                  spreadRadius: 2,
                                  blurRadius: 10,
                                  color: Colors.black.withOpacity(0.1))
                            ],
                            shape: BoxShape.circle,
                            image: DecorationImage(
                                fit: BoxFit.cover,
                                image: NetworkImage(avatar!))),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(width: 4, color: Colors.white),
                              color: GlobalColors.mainColor),
                          child: InkWell(
                            onTap: () {},
                            child: Icon(
                              Icons.edit,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                buildTextField("Họ và tên", "Nhập họ và tên...", false),
                buildTextField("Mật khẩu", "Nhập mật khẩu...", true),
                buildTextField("Email", "Nhập email...", false),
                buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: () {},
                      child: Text(
                        "Hủy",
                        style: TextStyle(
                            fontSize: 15,
                            letterSpacing: 2,
                            color: Colors.black),
                      ),
                      style: OutlinedButton.styleFrom(
                          padding: EdgeInsets.symmetric(horizontal: 60),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20))),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        "Cập nhật",
                        style: TextStyle(
                            fontSize: 15,
                            letterSpacing: 2,
                            color: Colors.white),
                      ),
                      style: ElevatedButton.styleFrom(
                          primary: GlobalColors.mainColor,
                          padding: EdgeInsets.symmetric(horizontal: 40),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20))),
                    ),
                  ],
                ),
                SizedBox(
                  height: 40,
                )
              ],
            ),
          ),
        ));
  }
}

Widget buildTextField(
    String labelText, String placeholder, bool isPasswordTextField) {
  return Padding(
    padding: EdgeInsets.only(bottom: 30),
    child: TextField(
      obscureText: isPasswordTextField ? true : false,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.only(bottom: 5),
          labelText: labelText,
          floatingLabelBehavior: FloatingLabelBehavior.always,
          hintText: placeholder,
          hintStyle: TextStyle(
              fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey)),
    ),
  );
}
