import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/widgets/button_screen.dart';
import 'package:login_signup/view/widgets/post.dart';

class ProfileView extends StatelessWidget {
  const ProfileView({super.key});

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
                          const CircleAvatar(
                            radius: 50,
                            backgroundImage:
                                AssetImage("assets/images/conan.png"),
                          ),
                          InkWell(
                            onTap: () {
                              Navigator.pushNamed(context, 'editProfile');
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
                          "Lê Bích Vi",
                          style: Theme.of(context).textTheme.titleLarge,
                        ),
                      ),
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Column(
                            children: [
                              Text(
                                "32",
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Follow",
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
                                "1.200",
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Like",
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
                                "200",
                                style: Theme.of(context).textTheme.titleLarge,
                              ),
                              const SizedBox(
                                height: 10,
                              ),
                              Text(
                                "Followers",
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
              Post(),
              Post(),
              Post(),
              SizedBox(
                height: 80,
              )
            ],
          ),
        ));
  }
}
