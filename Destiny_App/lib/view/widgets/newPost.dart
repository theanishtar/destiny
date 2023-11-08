import 'dart:convert';
import 'dart:math';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:login_signup/models/Users.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/widgets/createPost.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class NewPost extends StatefulWidget {
  const NewPost({
    super.key,
  });

  @override
  State<NewPost> createState() => _NewPostState();
}

String? avatar;
Map<String, dynamic>? mapResponse;

class _NewPostState extends State<NewPost> {
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
        String image = item['avatar'] ?? "N/A";
        String email = item['email'] ?? "N/A";
        String refreshToken = item['refreshToken'] ?? "N/A";
        setState(() {
          avatar = image;
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
    return Container(
      padding: EdgeInsets.only(top: 0),
      height: 90,
      width: MediaQuery.of(context).size.width,
      color: Colors.white,
      child: Column(children: [
        Row(
          children: [
            Container(
              child: CircleAvatar(backgroundImage: NetworkImage(avatar!)),
              margin: EdgeInsets.only(left: 10),
            ),
            Container(
              margin: EdgeInsets.only(left: 15),
              width: 300,
              child: TextField(
                decoration: InputDecoration(
                    hintText: "Bạn đang nghĩ gì ?", border: InputBorder.none),
                onTap: () {
                  runApp(GetMaterialApp(
                    home: CreatePost(),
                  ));
                },
              ),
            )
          ],
        ),
        // Text(stringResponse.toString()),
        Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.only(top: 0),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 40,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.live_tv,
                        color: Colors.red,
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 60,
                        child: Text("Trực tiếp")),
                  ],
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 0),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 40,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.photo,
                        color: Colors.green,
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 30,
                        child: Text("Ảnh")),
                  ],
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 0),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 40,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.room,
                        color: const Color.fromARGB(255, 2, 124, 224),
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 30,
                        child: Text("Vị trí")),
                  ],
                ),
              ),
            ),
          ],
        )
      ]),
    );
  }
  // );
  //   } else if (snapshot.hasError) {
  //     return Text(snapshot.error.toString());
  //   }

  //   return const CircularProgressIndicator();
  // });
}
// }
