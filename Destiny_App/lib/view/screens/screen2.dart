import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:login_signup/models/Users.dart';
import 'package:login_signup/utils/gobal.colors.dart';

class FollowView extends StatefulWidget {
  const FollowView({super.key});

  @override
  State<FollowView> createState() => _FollowViewState();
}

class _FollowViewState extends State<FollowView> {
  List<Users> _users = [
    Users(
        "Lê Bích Vi",
        "vilb",
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        true),
    Users(
        "Lê Bích Vi",
        "vilb",
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        true),
    Users(
        "Lê Bích Vi",
        "vilb",
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        true),
    Users(
        "Lê Bích Vi",
        "vilb",
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        true),
    Users(
        "Lê Bích Vi",
        "vilb",
        "https://w7.pngwing.com/pngs/129/292/png-transparent-female-avatar-girl-face-woman-user-flat-classy-users-icon.png",
        true),
  ];

  @override
  Widget build(BuildContext context) {
    return DefaultTabController(
        length: 3,
        child: Scaffold(
          appBar: AppBar(
            elevation: 0,
            centerTitle: true,
            backgroundColor: Colors.white,
            automaticallyImplyLeading: false,
            title: Text(
              "Theo dõi",
              style: TextStyle(color: Colors.black),
            ),
          ),
          body: Column(
            children: [
              TabBar(labelColor: Colors.black, tabs: [
                Tab(
                  text: "Bạn bè",
                ),
                Tab(
                  text: "Đang theo dõi",
                ),
                Tab(
                  text: "Người theo dõi",
                ),
              ]),
              Expanded(
                  child: TabBarView(
                children: [
                  Container(
                    padding: EdgeInsets.only(right: 20, left: 20),
                    color: Colors.white,
                    height: double.infinity,
                    width: double.infinity,
                    child: ListView.builder(
                        itemCount: _users.length,
                        itemBuilder: (context, index) {
                          return userComponent(
                              name: _users[index].name,
                              username: _users[index].username,
                              image: _users[index].image,
                              isFollowed: _users[index].isFlollerByMe,
                              user: _users[index]);
                        }),
                  ),
                  Container(
                    padding: EdgeInsets.only(right: 20, left: 20),
                    color: Colors.white,
                    height: double.infinity,
                    width: double.infinity,
                    child: ListView.builder(
                        itemCount: _users.length,
                        itemBuilder: (context, index) {
                          return userComponent(
                              name: _users[index].name,
                              username: _users[index].username,
                              image: _users[index].image,
                              isFollowed: _users[index].isFlollerByMe,
                              user: _users[index]);
                        }),
                  ),
                  Container(
                    padding: EdgeInsets.only(right: 20, left: 20),
                    color: Colors.white,
                    height: double.infinity,
                    width: double.infinity,
                    child: ListView.builder(
                        itemCount: _users.length,
                        itemBuilder: (context, index) {
                          return userComponent(
                              name: _users[index].name,
                              username: _users[index].username,
                              image: _users[index].image,
                              isFollowed: _users[index].isFlollerByMe,
                              user: _users[index]);
                        }),
                  ),
                ],
              ))
            ],
          ),
        ));
  }

  userComponent({name, username, image, isFollowed, required Users user}) {
    return Container(
      margin: EdgeInsets.only(top: 20),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Row(
            children: [
              Container(
                width: 60,
                height: 60,
                child: ClipRRect(
                  borderRadius: BorderRadius.circular(50),
                  child: Image.network(image),
                ),
              ),
              SizedBox(
                width: 10,
              ),
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    name,
                    style: TextStyle(
                        color: Colors.black, fontWeight: FontWeight.w500),
                  ),
                  SizedBox(
                    height: 5,
                  ),
                  Text(
                    username,
                    style: TextStyle(color: Colors.grey[600]),
                  ),
                ],
              )
            ],
          ),
          Container(
            height: 40,
            decoration: BoxDecoration(
                border: Border.all(color: Color(0xffeeeeee)),
                borderRadius: BorderRadius.circular(50)),
            child: MaterialButton(
              elevation: 0,
              color: isFollowed ? Color(0xffeeeeee) : Color(0xffffff),
              onPressed: () {
                setState(() {
                  user.isFlollerByMe = !user.isFlollerByMe;
                });
              },
              shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(50)),
              child: Text(
                isFollowed ? "Bỏ theo dõi" : "Theo dõi",
                style: TextStyle(color: Colors.black),
              ),
            ),
          )
        ],
      ),
    );
  }
}
