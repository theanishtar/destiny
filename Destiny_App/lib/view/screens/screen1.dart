import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/models/Users.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/widgets/myAppBar.dart';
import 'package:login_signup/view/widgets/newPost.dart';
import 'package:login_signup/view/widgets/post.dart';
import 'package:http/http.dart' as http;

class Screen1 extends StatefulWidget {
  const Screen1({super.key});

  @override
  State<Screen1> createState() => _Screen1State();
}

class _Screen1State extends State<Screen1> {
  // List<Users> user = [];

  // @override
  // void initState() {
  //   super.initState();
  //   this.fetchUser();
  // }

  // fetchUser() async {
  //   var url = "v1/oauth/user/nguyentt@fpt.edu.vn";
  //   var response = await http.get(
  //       Uri.parse(ApiEndPoints.baseUrl + "v1/oauth/user/nguyentt@fpt.edu.vn"));
  //   if (response.statusCode == 200) {
  //     var items = json.decode(response.body);
  //     setState(() {
  //       user = items;
  //     });
  //   } else {
  //     setState(() {
  //       user = [];
  //     });
  //   }
  // }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: SingleChildScrollView(
          child: Container(
        width: MediaQuery.of(context).size.width,
        child: Column(children: [
          MyAppBar(),
          NewPost(),
          Post(),
          // Post(),
          // Post(),
          SizedBox(
            height: 60,
          )
        ]),
      )),
    );
  }
}
