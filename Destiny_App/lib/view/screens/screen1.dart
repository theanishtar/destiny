import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/view/widgets/myAppBar.dart';
import 'package:login_signup/view/widgets/newPost.dart';
import 'package:login_signup/view/widgets/post.dart';

class Screen1 extends StatelessWidget {
  const Screen1({super.key});

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
          Post(),
          Post(),
          SizedBox(
            height: 60,
          )
        ]),
      )),
    );
  }
}
