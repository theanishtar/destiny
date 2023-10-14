import 'package:flutter/material.dart';

class NewPost extends StatelessWidget {
  const NewPost({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.only(top: 10),
      height: 120,
      width: MediaQuery.of(context).size.width,
      color: Colors.white,
      child: Column(children: [
        Row(
          children: [
            Container(
              child: CircleAvatar(
                  backgroundImage: AssetImage("assets/images/conan.png")),
              margin: EdgeInsets.only(left: 10),
            ),
            Container(
              margin: EdgeInsets.only(left: 15),
              width: 300,
              child: TextField(
                decoration: InputDecoration(
                    hintText: "Bạn đang nghĩ gì ?", border: InputBorder.none),
              ),
            )
          ],
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
}
