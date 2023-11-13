import 'dart:convert';
import 'dart:io';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EditProfile extends StatefulWidget {
  @override
  State<EditProfile> createState() => _EditProfileState();
}

String? avatar;
String? fullname;
String? email;
String? birthday;
String? gender;
String? city;
String? province;
String? ward;

class _EditProfileState extends State<EditProfile> {
  TextEditingController fname = TextEditingController();

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
      // List<dynamic> data = json.decode('[' + response.body + ']');
      // print(data);

      setState(() {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        print(data['fullname']);
        avatar = data['avartar'];
        fullname = data['fullname'];
        email = data['email'];
        birthday = data['birthday'];
        gender = data['gender_name'];
        city = data['district_name'];
        province = data['province_name'];
        ward = data['ward_name'];
        // textfname = fname.text;
        // textfname = name;
      });
      print(fname);
      // Sử dụng dữ liệu này theo nhu cầu của bạn
      // print('Name: $name');
      // print('Avatar: $avatar');
      // print('Token: $email');
      // print('Refresh Token: $refreshToken');
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
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextField(
                    // controller: textfname.,
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Họ và tên",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: fullname,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Email",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: email,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Ngày sinh",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: birthday,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Giới tính",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: gender,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Thành phố",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: city,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Tỉnh",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: province,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Phường",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: ward,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                // buildTextField("Ngày sinh", "Nhập ngày sinh...", false),
                SizedBox(
                  height: 10,
                ),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: () {
                        runApp(GetMaterialApp(
                          home: ProfileView(),
                        ));
                      },
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
    child: TextFormField(
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
