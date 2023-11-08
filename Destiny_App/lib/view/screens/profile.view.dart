import 'dart:convert';

import 'package:carousel_slider/carousel_slider.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/edit_profile.view.dart';
import 'package:login_signup/view/login_signup_screen.dart';
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
Map? listPost;

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
      'Authorization': ' Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };
    var id_user = await prefs.getInt('id');
    String requestBody = id_user.toString();

    http.Response response;
    response = await http.post(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/profile/data/header"),
        headers: headers,
        body: requestBody);
    if (response.statusCode == 200) {
      setState(() {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        // ava = data['avatar'];
        // fullname = data['fullname'];
        // countPost = data['countPost'];
        // countFollower = data['countFollower'];
        // countImg = data['countImg'];
        listPost = data;
        // print(listPost);
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
    return Scaffold(
      appBar: AppBar(
        title: Text("Trang cá nhân"),
        backgroundColor: Colors.white,
        elevation: 0,
        actions: [
          Padding(
            padding: const EdgeInsets.only(right: 10),
            child: PopupMenuButton(
              itemBuilder: (context) => [
                PopupMenuItem(
                    onTap: () {
                      runApp(GetMaterialApp(
                        home: HomeScreen(),
                      ));
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
                          backgroundImage: NetworkImage(listPost!['avatar']),
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
                        listPost!['fullname'],
                        style: Theme.of(context).textTheme.titleLarge,
                      ),
                    ),
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Column(
                          children: [
                            Text(
                              (listPost!['countPost']).toString(),
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
                              (listPost!['countFollower']).toString(),
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
                              (listPost!['countImg']).toString(),
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
            Post(),
            // Column(
            //   children: [
            //     Expanded(
            //       child: ListView(
            //         children: <Widget>[
            //           for (int i = 0; i < listPost!.length; i++)
            //             Container(
            //               height: 200.0,
            //               color: Colors.white,
            //               padding: EdgeInsets.only(
            //                   // top: 4,
            //                   bottom:
            //                       10), // Thêm padding để tạo khoảng cách giữa các bài viết
            //               margin: EdgeInsets.only(bottom: 10),
            //               child: Column(
            //                 children: [
            //                   Row(
            //                     mainAxisAlignment: MainAxisAlignment.spaceBetween,
            //                     children: [
            //                       Row(
            //                         children: [
            //                           Container(
            //                             margin:
            //                                 EdgeInsets.only(left: 10, top: 10),
            //                             child: InkWell(
            //                               onTap: () {
            //                                 Navigator.pushNamed(
            //                                     context, "profile");
            //                               },
            //                               child: CircleAvatar(
            //                                 backgroundImage: NetworkImage(ava!),
            //                               ),
            //                             ),
            //                           ),
            //                           Container(
            //                             margin:
            //                                 EdgeInsets.only(left: 10, top: 10),
            //                             child: Text(
            //                               fullname!,
            //                               style: TextStyle(
            //                                 fontSize: 15,
            //                                 fontWeight: FontWeight.w500,
            //                               ),
            //                             ),
            //                           )
            //                         ],
            //                       ),
            //                       Container(
            //                         margin: EdgeInsets.only(right: 10),
            //                         child: PopupMenuButton(
            //                           itemBuilder: (context) => [
            //                             PopupMenuItem(
            //                               onTap: () {
            //                                 Navigator.pushNamed(context, "/");
            //                               },
            //                               child: Row(
            //                                 children: [
            //                                   Icon(Icons.report),
            //                                   Padding(
            //                                     padding:
            //                                         EdgeInsets.only(left: 10.0),
            //                                     child: Text("Báo cáo bài viết"),
            //                                   ),
            //                                 ],
            //                               ),
            //                             ),
            //                             PopupMenuItem(
            //                               onTap: () {
            //                                 Navigator.pushNamed(context, "/");
            //                               },
            //                               child: Row(
            //                                 children: [
            //                                   Icon(Icons.report_off_outlined),
            //                                   Padding(
            //                                     padding:
            //                                         EdgeInsets.only(left: 10.0),
            //                                     child: Text("Báo cáo tài khoản"),
            //                                   ),
            //                                 ],
            //                               ),
            //                             ),
            //                           ],
            //                           child: Icon(
            //                             Icons.more_horiz,
            //                             color: GlobalColors.mainColor,
            //                           ),
            //                         ),
            //                       ),
            //                     ],
            //                   ),
            //                   SizedBox(
            //                     height: 10,
            //                   ),
            //                   ConstrainedBox(
            //                     constraints: BoxConstraints(
            //                       maxWidth: MediaQuery.of(context).size.width,
            //                     ),
            //                     child: Text(
            //                       listPost![i]['content'],
            //                       style: TextStyle(fontSize: 15),
            //                     ),
            //                   ),
            //                   SizedBox(
            //                     height: 10,
            //                   ),
            //                   ConstrainedBox(
            //                     constraints: BoxConstraints(
            //                       minHeight: 150,
            //                       minWidth: 150,
            //                       maxHeight: 350.0,
            //                       maxWidth: MediaQuery.of(context).size.width,
            //                     ),
            //                     child: listPost![i]['postImages'] != null &&
            //                             listPost![i]['postImages'].isNotEmpty
            //                         ? CarouselSlider(
            //                             items: (listPost![i]['postImages']
            //                                     as List<dynamic>)
            //                                 .map<Widget>((imageData) {
            //                               final imageUrl =
            //                                   imageData['link_image'];
            //                               return ClipRRect(
            //                                 borderRadius:
            //                                     BorderRadius.circular(6),
            //                                 child: Image.network(
            //                                   imageUrl,
            //                                   height: 200,
            //                                   width: 350,
            //                                   fit: BoxFit.cover,
            //                                 ),
            //                               );
            //                             }).toList(),
            //                             options: CarouselOptions(
            //                               autoPlay: false,
            //                               enableInfiniteScroll: false,
            //                               enlargeCenterPage: true,
            //                               height: 320,
            //                             ),
            //                           )
            //                         : Text(
            //                             "Không có hình ảnh để hiển thị"), // Thêm thông báo nếu không có hình ảnh
            //                   ),
            //                   Row(
            //                     mainAxisSize: MainAxisSize.max,
            //                     mainAxisAlignment: MainAxisAlignment.center,
            //                     children: [
            //                       Container(
            //                         margin: EdgeInsets.only(top: 10),
            //                         alignment: Alignment.center,
            //                         height: 50,
            //                         width:
            //                             MediaQuery.of(context).size.width * 0.33,
            //                         child: Container(
            //                           width: 100,
            //                           child: Row(
            //                             children: [
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 30,
            //                                 child: Icon(
            //                                   Icons.favorite_border,
            //                                   color: Colors.red,
            //                                 ),
            //                               ),
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 40,
            //                                 child: Text("Thích"),
            //                               ),
            //                             ],
            //                           ),
            //                         ),
            //                       ),
            //                       Container(
            //                         margin: EdgeInsets.only(top: 10),
            //                         alignment: Alignment.center,
            //                         height: 50,
            //                         width:
            //                             MediaQuery.of(context).size.width * 0.33,
            //                         child: Container(
            //                           width: 100,
            //                           child: Row(
            //                             children: [
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 30,
            //                                 child: Icon(
            //                                   Icons.comment,
            //                                   color: Colors.green,
            //                                 ),
            //                               ),
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 60,
            //                                 child: Text("Bình luận"),
            //                               ),
            //                             ],
            //                           ),
            //                         ),
            //                       ),
            //                       Container(
            //                         margin: EdgeInsets.only(top: 10),
            //                         alignment: Alignment.center,
            //                         height: 50,
            //                         width:
            //                             MediaQuery.of(context).size.width * 0.33,
            //                         child: Container(
            //                           width: 100,
            //                           child: Row(
            //                             children: [
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 30,
            //                                 child: Icon(
            //                                   Icons.share,
            //                                   color: const Color.fromARGB(
            //                                       255, 2, 124, 224),
            //                                 ),
            //                               ),
            //                               Container(
            //                                 alignment: Alignment.center,
            //                                 width: 50,
            //                                 child: Text("Chia sẻ"),
            //                               ),
            //                             ],
            //                           ),
            //                         ),
            //                       ),
            //                     ],
            //                   ),
            //                 ],
            //               ),
            //             ),
            //         ],
            //       ),
            //     ),
            //   ],
            // ),
            SizedBox(
              height: 80,
            )
          ],
        ),
      ),
    );
  }
}
