import 'dart:convert';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;

class Post extends StatefulWidget {
  @override
  State<Post> createState() => _PostState();
}

class _PostState extends State<Post> {
  List? listPost;
  @override
  void initState() {
    super.initState();
    // this.getData();
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
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/post"),
        headers: headers);
    if (response.statusCode == 200) {
      setState(() {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        listPost = data['user'];
      });
    }
  }

  List<String> imagesList = [
    "https://static.wikia.nocookie.net/doraemon/images/8/8d/Doraemon_%282017_Remake%29.png/revision/latest?cb=20230908064228&path-prefix=en",
    "https://i.pinimg.com/736x/0f/4d/a8/0f4da8a2e550bd047de21ab679cfa8fa.jpg",
    "https://kenh14cdn.com/203336854389633024/2022/11/15/photo-6-16684998819951103587151.jpg",
    "https://i.pinimg.com/originals/d4/0e/07/d40e07b9c3e106922860500dca917cad.jpg",
    "https://kenh14cdn.com/thumb_w/600/2019/9/1/chaien-15672732658971052114509-crop-1567273272747169033775.png",
  ];
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
        SizedBox(
          height: 10,
        ),
        // Container(
        //   margin: EdgeInsets.only(left: 12),
        //   child: Row(
        //     children: [
        //       Text(
        //         "Tôi có món đồ cần trao đổi",
        //         style: TextStyle(fontSize: 16),
        //       )
        //     ],
        //   ),
        // ),
        // SizedBox(
        //   height: 10,
        // ),
        // ConstrainedBox(
        //   constraints: new BoxConstraints(
        //     minHeight: 150,
        //     minWidth: 150,
        //     maxHeight: 350.0,
        //     maxWidth: MediaQuery.of(context).size.width,
        //   ),
        //   child: CarouselSlider(
        //     items: imagesList
        //         .map((e) => ClipRRect(
        //               borderRadius: BorderRadius.circular(6),
        //               child: Stack(
        //                 fit: StackFit.expand,
        //                 children: [
        //                   Image.network(
        //                     e,
        //                     height: 200,
        //                     width: 100,
        //                     fit: BoxFit.cover,
        //                   ),
        //                   // Text(e)
        //                 ],
        //               ),
        //             ))
        //         .toList(),
        //     options: CarouselOptions(
        //         autoPlay: false,
        //         enableInfiniteScroll: false,
        //         enlargeCenterPage: true,
        //         height: 320),
        //   ),
        // ),
        // Row(
        //   mainAxisSize: MainAxisSize.max,
        //   mainAxisAlignment: MainAxisAlignment.center,
        //   children: [
        //     Container(
        //       margin: EdgeInsets.only(top: 10),
        //       alignment: Alignment.center,
        //       // color: Colors.black,
        //       height: 50,
        //       width: MediaQuery.of(context).size.width * 0.33,
        //       child: Container(
        //         width: 100,
        //         child: Row(
        //           children: [
        //             Container(
        //               alignment: Alignment.center,
        //               width: 30,
        //               child: Icon(
        //                 Icons.favorite_border,
        //                 color: Colors.red,
        //               ),
        //             ),
        //             Container(
        //                 alignment: Alignment.center,
        //                 width: 40,
        //                 child: Text("Thích")),
        //           ],
        //         ),
        //       ),
        //     ),
        //     Container(
        //       margin: EdgeInsets.only(top: 10),
        //       alignment: Alignment.center,
        //       // color: Colors.black,
        //       height: 50,
        //       width: MediaQuery.of(context).size.width * 0.33,
        //       child: Container(
        //         width: 100,
        //         child: Row(
        //           children: [
        //             Container(
        //               alignment: Alignment.center,
        //               width: 30,
        //               child: Icon(
        //                 Icons.comment,
        //                 color: Colors.green,
        //               ),
        //             ),
        //             Container(
        //                 alignment: Alignment.center,
        //                 width: 60,
        //                 child: Text("Bình luận")),
        //           ],
        //         ),
        //       ),
        //     ),
        //     Container(
        //       margin: EdgeInsets.only(top: 10),
        //       alignment: Alignment.center,
        //       // color: Colors.black,
        //       height: 50,
        //       width: MediaQuery.of(context).size.width * 0.33,
        //       child: Container(
        //         width: 100,
        //         child: Row(
        //           children: [
        //             Container(
        //               alignment: Alignment.center,
        //               width: 30,
        //               child: Icon(
        //                 Icons.share,
        //                 color: const Color.fromARGB(255, 2, 124, 224),
        //               ),
        //             ),
        //             Container(
        //                 alignment: Alignment.center,
        //                 width: 50,
        //                 child: Text("Chia sẻ")),
        //           ],
        //         ),
        //       ),
        //     ),
        //   ],
        // ),
      ]),
    );
  }
}
