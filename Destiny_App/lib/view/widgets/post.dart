import 'package:flutter/material.dart';
import 'package:login_signup/utils/gobal.colors.dart';

class Post extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 480,
      margin: EdgeInsets.only(top: 10),
      width: MediaQuery.of(context).size.width,
      color: Colors.white,
      child: Column(children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Row(
              children: [
                Container(
                  margin: EdgeInsets.only(left: 10, top: 10),
                  child: InkWell(
                    onTap: () {
                      Navigator.pushNamed(context, "profile");
                    },
                    child: CircleAvatar(
                        backgroundImage: AssetImage("assets/images/conan.png")),
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(left: 10, top: 10),
                  child: Text(
                    "Lê Bích Vi",
                    style: TextStyle(fontSize: 15, fontWeight: FontWeight.w500),
                  ),
                )
              ],
            ),
            Container(
              margin: EdgeInsets.only(right: 10),
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
                            child: Text("Báo cáo bài viết"))
                      ],
                    ),
                  ),
                  PopupMenuItem(
                    onTap: () {
                      Navigator.pushNamed(context, "/");
                    },
                    child: Row(
                      children: [
                        Icon(Icons.logout),
                        Padding(
                            padding: EdgeInsets.only(left: 10.0),
                            child: Text("Báo cáo"))
                      ],
                    ),
                  ),
                  PopupMenuItem(
                    onTap: () {
                      Navigator.pushNamed(context, "/");
                    },
                    child: Row(
                      children: [
                        Icon(Icons.logout),
                        Padding(
                            padding: EdgeInsets.only(left: 10.0),
                            child: Text("Báo cáo"))
                      ],
                    ),
                  ),
                ],
                child: Icon(
                  Icons.more_horiz,
                  color: GlobalColors.mainColor,
                ),
              ),
              // child: Icon(Icons.more_horiz),
            )
          ],
        ),
        ConstrainedBox(
          constraints: new BoxConstraints(
            minHeight: 150,
            minWidth: 150,
            maxHeight: 350.0,
            maxWidth: MediaQuery.of(context).size.width,
          ),
          child: Container(
              margin: EdgeInsets.only(top: 10),
              child: Image.asset("assets/images/ao.jpg")),
        ),
        Row(
          mainAxisSize: MainAxisSize.max,
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Container(
              margin: EdgeInsets.only(top: 10),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 50,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.favorite_border,
                        color: Colors.red,
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 40,
                        child: Text("Thích")),
                  ],
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 50,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.comment,
                        color: Colors.green,
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 60,
                        child: Text("Bình luận")),
                  ],
                ),
              ),
            ),
            Container(
              margin: EdgeInsets.only(top: 10),
              alignment: Alignment.center,
              // color: Colors.black,
              height: 50,
              width: MediaQuery.of(context).size.width * 0.33,
              child: Container(
                width: 100,
                child: Row(
                  children: [
                    Container(
                      alignment: Alignment.center,
                      width: 30,
                      child: Icon(
                        Icons.share,
                        color: const Color.fromARGB(255, 2, 124, 224),
                      ),
                    ),
                    Container(
                        alignment: Alignment.center,
                        width: 50,
                        child: Text("Chia sẻ")),
                  ],
                ),
              ),
            ),
          ],
        ),
      ]),
    );
  }
}
