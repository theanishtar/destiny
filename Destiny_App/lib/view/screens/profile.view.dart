import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/edit_profile.view.dart';
import 'package:login_signup/view/widgets/button_screen.dart';
import 'package:login_signup/view/widgets/post.dart';
import 'package:shared_preferences/shared_preferences.dart';

class ProfileView extends StatefulWidget {
  const ProfileView({super.key});

  @override
  State<ProfileView> createState() => _ProfileViewState();
}

String? ava;
String? fullname;
int? countPost;
int? countFollower;
int? countImg;

class _ProfileViewState extends State<ProfileView> {
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
    response = await http.post(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/profile/data/timeline"),
        headers: headers,
        body: "0");
    if (response.statusCode == 200) {
      // List<dynamic> data = json.decode('[' + response.body + ']');
      // List<int> utf8Bytes = utf8.encode(data.toString());
      // String decodedData = utf8.decode(utf8Bytes);

      // print(data1['fullname']);

      setState(() {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        ava = data['dataFollows']['avatar'];
        fullname = data['dataFollows']['fullname'];
        countPost = data['dataFollows']['countPost'];
        countFollower = data['dataFollows']['countFollower'];
        countImg = data['dataFollows']['countImg'];
        print(data);
      });

      // Sử dụng dữ liệu này theo nhu cầu của bạn
      // print('Name: $name');
      // print('Avatar: $avatar');
      // print('Token: $email');
      // print('Refresh Token: $refreshToken');
      // }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          backgroundColor: Colors.white,
          elevation: 0,
          actions: [
            Padding(
              padding: const EdgeInsets.only(right: 10),
              child: PopupMenuButton(
                itemBuilder: (context) => [
                  PopupMenuItem(
                      onTap: () {
                        Navigator.pushNamed(context, "/");
                      },
                      child: Row(
                        children: [
                          Icon(Icons.logout),
                          Padding(
                              padding: EdgeInsets.only(left: 10.0),
                              child: Text("Đăng xuất"))
                        ],
                      ))
                ],
                child: Icon(
                  Icons.more_vert,
                  color: GlobalColors.mainColor,
                ),
              ),
            )
          ],
        ),
        body: SingleChildScrollView(
          child: Column(
            children: [
              Container(
                color: Colors.white,
                child: Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 55),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: [
                      Stack(
                        alignment: Alignment.bottomRight,
                        children: [
                          CircleAvatar(
                            radius: 50,
                            backgroundImage: NetworkImage(ava!),
                          ),
                          InkWell(
                            onTap: () {
                              runApp(GetMaterialApp(
                                home: EditProfile(),
                              ));
                            },
                            child: CircleAvatar(
                              radius: 12,
                              backgroundColor: GlobalColors.mainColor,
                              child: const Icon(
                                Icons.edit,
                                size: 15,
                                color: Colors.white,
                              ),
                            ),
                          )
                        ],
                      ),
                      Padding(
                        padding: const EdgeInsets.all(20.0),
                        child: Text(
                          fullname!,
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: [
                              Text(
                                (countPost!).toString(),
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Bài đăng",
                                style: Theme.of(context)
                                    .textTheme
                                    .subtitle1!
                                    .copyWith(color: Colors.grey[400]),
                              )
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                (countFollower!).toString(),
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Theo dõi",
                                style: Theme.of(context)
                                    .textTheme
                                    .subtitle1!
                                    .copyWith(color: Colors.grey[400]),
                              )
                            ],
                          ),
                          Column(
                            children: [
                              Text(
                                (countImg!).toString(),
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Ảnh",
                                style: Theme.of(context)
                                    .textTheme
                                    .subtitle1!
                                    .copyWith(color: Colors.grey[400]),
                              )
                            ],
                          )
                        ],
                      ),
                      SizedBox(
                        height: 20,
                      ),
                      ButtonCustom(
                          customCorlor: GlobalColors.mainColor,
                          text: "Follow",
                          onTap: () {}),
                      SizedBox(
                        height: 10,
                      )
                    ],
                  ),
                ),
              ),
              // Post(),
              // Post(),
              // Post(),
              SizedBox(
                height: 80,
              )
            ],
          ),
        ));
  }
}
