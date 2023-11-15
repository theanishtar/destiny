import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';

import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:shared_preferences/shared_preferences.dart';
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
  List? listUser;
  List? listPost;
  int currentPage = 1;
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
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/post"),
        headers: headers,
        body: "1");
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        // listUser = data['user'];

        listPost = data;
        print("1");
        print(data);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[300],
      body: Column(
        children: [
          MyAppBar(),
          NewPost(),
          Expanded(
            child: ListView(
              children: <Widget>[
                for (int i = 0; i < listPost!.length; i++)
                  Container(
                    color: Colors.white,
                    padding: EdgeInsets.only(
                        // top: 4,
                        bottom:
                            10), // Thêm padding để tạo khoảng cách giữa các bài viết
                    margin: EdgeInsets.only(bottom: 10),
                    child: Column(
                      children: [
                        Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: [
                            Row(
                              children: [
                                Container(
                                  margin: EdgeInsets.only(left: 10, top: 10),
                                  child: InkWell(
                                    onTap: () async {
                                      SharedPreferences prefs =
                                          await SharedPreferences.getInstance();
                                      await prefs.setInt(
                                          'id', listPost![i]['user_id']);
                                      runApp(GetMaterialApp(
                                        home: ProfileView(),
                                      ));
                                    },
                                    child: CircleAvatar(
                                      backgroundImage:
                                          NetworkImage(listPost![i]['avatar']),
                                    ),
                                  ),
                                ),
                                Container(
                                    margin: EdgeInsets.only(left: 10, top: 10),
                                    child: listPost![i]['postEntityProfile'] ==
                                            null
                                        ? Text(
                                            listPost![i]['fullname'],
                                            style: TextStyle(
                                              fontSize: 15,
                                              fontWeight: FontWeight.w500,
                                            ),
                                          )
                                        : ConstrainedBox(
                                            constraints: BoxConstraints(
                                              maxWidth: MediaQuery.of(context)
                                                      .size
                                                      .width *
                                                  0.75,
                                            ),
                                            child: Text(
                                              listPost![i]['fullname'] +
                                                  " đã chia sẻ bài viết của " +
                                                  listPost![i]
                                                          ['postEntityProfile']
                                                      ['fullname'],
                                              style: TextStyle(fontSize: 15),
                                            ),
                                          ))
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
                                        Icon(Icons.report),
                                        Padding(
                                          padding: EdgeInsets.only(left: 10.0),
                                          child: Text("Báo cáo bài viết"),
                                        ),
                                      ],
                                    ),
                                  ),
                                  PopupMenuItem(
                                    onTap: () {
                                      Navigator.pushNamed(context, "/");
                                    },
                                    child: Row(
                                      children: [
                                        Icon(Icons.report_off_outlined),
                                        Padding(
                                          padding: EdgeInsets.only(left: 10.0),
                                          child: Text("Báo cáo tài khoản"),
                                        ),
                                      ],
                                    ),
                                  ),
                                ],
                                child: Icon(
                                  Icons.more_horiz,
                                  color: GlobalColors.mainColor,
                                ),
                              ),
                            ),
                          ],
                        ),
                        SizedBox(
                          height: 10,
                        ),
                        listPost![i]['postEntityProfile'] == null
                            ? Column(
                                children: [
                                  ConstrainedBox(
                                    constraints: BoxConstraints(
                                      maxWidth:
                                          MediaQuery.of(context).size.width,
                                    ),
                                    child: Text(
                                      listPost![i]['content'],
                                      style: TextStyle(fontSize: 15),
                                    ),
                                  ),
                                  SizedBox(
                                    height: 10,
                                  ),
                                  ConstrainedBox(
                                    constraints: BoxConstraints(
                                      minHeight: 150,
                                      minWidth: 150,
                                      maxHeight: 350.0,
                                      maxWidth:
                                          MediaQuery.of(context).size.width,
                                    ),
                                    child: CarouselSlider(
                                      items: (listPost![i]['images']
                                                  as List<dynamic>?)
                                              ?.map<Widget>((imageData) {
                                            if (imageData is String) {
                                              return ClipRRect(
                                                borderRadius:
                                                    BorderRadius.circular(6),
                                                child: Image.network(
                                                  imageData,
                                                  height: 200,
                                                  width: 350,
                                                  fit: BoxFit.cover,
                                                ),
                                              );
                                            }
                                            return SizedBox
                                                .shrink(); // Nếu dữ liệu hình ảnh không hợp lệ, hiển thị Widget trống
                                          })?.toList() ??
                                          [],
                                      options: CarouselOptions(
                                          autoPlay: false,
                                          enableInfiniteScroll: false,
                                          enlargeCenterPage: true,
                                          height: 320),
                                    ),
                                  ),
                                ],
                              )
                            : Container(
                                color: Colors.white,
                                padding: EdgeInsets.only(
                                    // top: 4,
                                    bottom:
                                        10), // Thêm padding để tạo khoảng cách giữa các bài viết
                                margin: EdgeInsets.only(bottom: 10),
                                child: Column(
                                  children: [
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.spaceBetween,
                                      children: [
                                        Row(
                                          children: [
                                            Container(
                                              margin: EdgeInsets.only(
                                                  left: 10, top: 10),
                                              child: InkWell(
                                                onTap: () async {
                                                  SharedPreferences prefs =
                                                      await SharedPreferences
                                                          .getInstance();

                                                  await prefs.setInt(
                                                      'id',
                                                      listPost![i][
                                                              'postEntityProfile']
                                                          ['user_id']);
                                                  runApp(GetMaterialApp(
                                                    home: ProfileView(),
                                                  ));
                                                },
                                                child: CircleAvatar(
                                                  backgroundImage: NetworkImage(
                                                      listPost![i][
                                                              'postEntityProfile']
                                                          ['avatar']),
                                                ),
                                              ),
                                            ),
                                            Container(
                                                margin: EdgeInsets.only(
                                                    left: 10, top: 10),
                                                child: Text(
                                                  listPost![i]
                                                          ['postEntityProfile']
                                                      ['fullname'],
                                                  style: TextStyle(
                                                    fontSize: 15,
                                                    fontWeight: FontWeight.w500,
                                                  ),
                                                ))
                                          ],
                                        ),
                                        Container(
                                          margin: EdgeInsets.only(right: 10),
                                          child: PopupMenuButton(
                                            itemBuilder: (context) => [
                                              PopupMenuItem(
                                                onTap: () {
                                                  Navigator.pushNamed(
                                                      context, "/");
                                                },
                                                child: Row(
                                                  children: [
                                                    Icon(Icons.report),
                                                    Padding(
                                                      padding: EdgeInsets.only(
                                                          left: 10.0),
                                                      child: Text(
                                                          "Báo cáo bài viết"),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                              PopupMenuItem(
                                                onTap: () {
                                                  Navigator.pushNamed(
                                                      context, "/");
                                                },
                                                child: Row(
                                                  children: [
                                                    Icon(Icons
                                                        .report_off_outlined),
                                                    Padding(
                                                      padding: EdgeInsets.only(
                                                          left: 10.0),
                                                      child: Text(
                                                          "Báo cáo tài khoản"),
                                                    ),
                                                  ],
                                                ),
                                              ),
                                            ],
                                            child: Icon(
                                              Icons.more_horiz,
                                              color: GlobalColors.mainColor,
                                            ),
                                          ),
                                        ),
                                      ],
                                    ),
                                    SizedBox(
                                      height: 10,
                                    ),
                                    Column(
                                      children: [
                                        ConstrainedBox(
                                          constraints: BoxConstraints(
                                            maxWidth: MediaQuery.of(context)
                                                .size
                                                .width,
                                          ),
                                          child: Text(
                                            listPost![i]['postEntityProfile']
                                                ['content'],
                                            style: TextStyle(fontSize: 15),
                                          ),
                                        ),
                                        SizedBox(
                                          height: 10,
                                        ),
                                        ConstrainedBox(
                                          constraints: BoxConstraints(
                                            minHeight: 150,
                                            minWidth: 150,
                                            maxHeight: 350.0,
                                            maxWidth: MediaQuery.of(context)
                                                .size
                                                .width,
                                          ),
                                          child: CarouselSlider(
                                            items:
                                                (listPost![i]['postEntityProfile']
                                                                ['images']
                                                            as List<dynamic>?)
                                                        ?.map<Widget>(
                                                            (imageData) {
                                                      if (imageData is String) {
                                                        return ClipRRect(
                                                          borderRadius:
                                                              BorderRadius
                                                                  .circular(6),
                                                          child: Image.network(
                                                            imageData,
                                                            height: 200,
                                                            width: 350,
                                                            fit: BoxFit.cover,
                                                          ),
                                                        );
                                                      }
                                                      return SizedBox
                                                          .shrink(); // Nếu dữ liệu hình ảnh không hợp lệ, hiển thị Widget trống
                                                    })?.toList() ??
                                                    [],
                                            options: CarouselOptions(
                                                autoPlay: false,
                                                enableInfiniteScroll: false,
                                                enlargeCenterPage: true,
                                                height: 320),
                                          ),
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                              ),
                        Row(
                          mainAxisSize: MainAxisSize.max,
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Container(
                              margin: EdgeInsets.only(top: 10),
                              alignment: Alignment.center,
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
                                        width: 20,
                                        child: Text(listPost![i]
                                                ['countInterested']
                                            .toString())),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              margin: EdgeInsets.only(top: 10),
                              alignment: Alignment.center,
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
                                      child: Text("Bình luận"),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                            Container(
                              margin: EdgeInsets.only(top: 10),
                              alignment: Alignment.center,
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
                                        color: const Color.fromARGB(
                                            255, 2, 124, 224),
                                      ),
                                    ),
                                    Container(
                                      alignment: Alignment.center,
                                      width: 50,
                                      child: Text("Chia sẻ"),
                                    ),
                                  ],
                                ),
                              ),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
