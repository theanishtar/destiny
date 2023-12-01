import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';

import 'package:flutter/src/widgets/container.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/ApiManager.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:login_signup/view/widgets/createPost.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/widgets/myAppBar.dart';
import 'package:login_signup/view/widgets/newPost.dart';
import 'package:login_signup/view/widgets/post.dart';
import 'package:http/http.dart' as http;
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Screen1 extends StatefulWidget {
  const Screen1({super.key});

  @override
  State<Screen1> createState() => _Screen1State();
}

class _Screen1State extends State<Screen1> {
  late SocketManager socketManager = SocketManager();
  late ApiManager apiManager = ApiManager();
  TextEditingController commentController = TextEditingController();
  ScrollController _scrollController = ScrollController();
  bool isLoading = false;
  List? listUser;
  List? listPost;
  String? avatarUser;
  int currentPage = 1;
  Map<int, bool>? mapIntersted;
  @override
  void initState() {
    super.initState();
    this.getData();
    _scrollController.addListener(_onScroll);
  }

  void _onScroll() {
    if (_scrollController.position.pixels ==
        _scrollController.position.maxScrollExtent) {
      // Kiểm tra khi scroll đến cuối danh sách
      _loadMorePosts();
    }
  }

  void _loadMorePosts() async {
    setState(() {
      isLoading = true; // Hiển thị loading indicator
    });
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');

    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };
    currentPage++; // Tăng số trang lên để load trang tiếp theo
    // Gọi API với trang mới và cập nhật danh sách bài post
    var response = await http.post(
      Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/post"),
      headers: headers,
      body: currentPage.toString(), // Truyền số trang cần tải
    );

    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        listPost!.addAll(data); // Thêm dữ liệu mới vào danh sách cũ
      });
    }

    setState(() {
      isLoading = false; // Ẩn loading indicator sau khi tải dữ liệu
    });
  }

  Future getData() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var avataruser = await prefs.getString('avatar');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };
    http.Response response;
    setState(() {
      isLoading = true; // Hiển thị loading indicator khi bắt đầu tải dữ liệu
    });
    response = await http.post(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/post"),
        headers: headers,
        body: currentPage.toString());
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(Utf8Decoder().convert(response.bodyBytes));

        avatarUser = avataruser;
        listPost = data;

        print(data);
      });
    }

    Future.delayed(Duration(seconds: 2), () {
      setState(() {
        isLoading = false; // Ẩn loading indicator sau khi dữ liệu đã được tải
      });
    });
  }

  void _showCommentDialog(int postId, int userId) {
    apiManager.fetchComments(postId);
    int tempCommentId;
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return SimpleDialog(
          title: Text('Bình luận'),
          children: [
            Container(
              height: 500,
              width: MediaQuery.of(context).size.width - 40,
              child: Column(
                children: [
                  Expanded(
                    child: StreamBuilder<List<dynamic>>(
                      stream: socketManager.commentStream,
                      // future: _fetchComments(postId),
                      builder:
                          (BuildContext context, AsyncSnapshot<List> snapshot) {
                        if (snapshot.connectionState ==
                            ConnectionState.waiting) {
                          return Center(
                            child: CircularProgressIndicator(),
                          );
                        } else if (snapshot.hasData) {
                          return ListView.builder(
                            itemCount: snapshot.data!.length,
                            itemBuilder: (BuildContext context, int index) {
                              var comment = snapshot.data![index];
                              tempCommentId = comment[0];
                              bool hasReplies = true;
                              return Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  ListTile(
                                    leading: CircleAvatar(
                                      backgroundImage: NetworkImage(comment[9]),
                                    ),
                                    title: Text(comment[7]),
                                    subtitle: Text(comment[5]),
                                    // Hiển thị nội dung bình luận
                                  ),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.end,
                                    children: [
                                      TextButton(
                                        onPressed: () {
                                          socketManager.repCmtId = comment[0];
                                        },
                                        child: Text(comment[11] != null
                                            ? comment[11].toString() +
                                                ' Trả lời'
                                            : 0.toString() + ' Trả lời'),
                                      ),
                                      if (hasReplies)
                                        TextButton(
                                          onPressed: () {
                                            _showRepliesBottomSheet(
                                                postId, comment[0]);
                                          },
                                          child: Text('Xem thêm'),
                                        ),
                                    ],
                                  ),
                                  Divider(), // Thêm đường phân cách giữa các comment
                                ],
                              );
                            },
                          );
                        } else if (snapshot.hasError) {
                          return Text('Đã xảy ra lỗi: ${snapshot.error}');
                        }
                        return SizedBox(); // Trường hợp không có dữ liệu
                      },
                    ),
                  ),
                  Padding(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 5, vertical: 5),
                    child: Row(
                      children: [
                        Expanded(
                          child: TextField(
                            controller: commentController,
                            decoration: InputDecoration(
                              hintText: 'Nhập bình luận của bạn...',
                              // border: OutlineInputBorder(),
                            ),
                            // Controller và logic để lưu nội dung của TextField
                          ),
                        ),
                        SizedBox(width: 10),
                        ElevatedButton(
                          onPressed: () {
                            // tempCommentId = comment[0];
                            addComment(commentController.text.toString(),
                                postId, userId, socketManager.repCmtId);
                            commentController.clear();
                          },
                          child: Text('Gửi'),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            Positioned(
              top: 10,
              right: 5,
              child: GestureDetector(
                onTap: () {
                  Navigator.of(context).pop();
                },
                child: Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.grey.withOpacity(0.3),
                  ),
                  padding: EdgeInsets.all(5),
                  child: Icon(Icons.close),
                ),
              ),
            ),
          ],
        );
      },
    );
  }

  void _showRepliesBottomSheet(int postId, int commentId) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext context) {
        return Container(
          padding: EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Các phản hồi',
                style: TextStyle(
                  fontSize: 18.0,
                  fontWeight: FontWeight.bold,
                ),
              ),
              SizedBox(height: 10.0),
              FutureBuilder<List>(
                future: _fetchReplies(postId, commentId),
                builder: (BuildContext context, AsyncSnapshot<List> snapshot) {
                  if (snapshot.connectionState == ConnectionState.waiting) {
                    return Center(
                      child: CircularProgressIndicator(),
                    );
                  } else if (snapshot.hasData) {
                    return ListView.builder(
                      shrinkWrap: true,
                      itemCount: snapshot.data!.length,
                      itemBuilder: (BuildContext context, int index) {
                        var reply = snapshot.data![index];
                        return ListTile(
                          leading: CircleAvatar(
                            backgroundImage: NetworkImage(reply[9]),
                          ),
                          title: Text(reply[7]),
                          subtitle: Text(reply[5]),
                          // Hiển thị thông tin người đã trả lời comment
                        );
                      },
                    );
                  } else if (snapshot.hasError) {
                    return Text('Đã xảy ra lỗi: ${snapshot.error}');
                  }
                  return SizedBox(); // Trường hợp không có dữ liệu
                },
              ),
            ],
          ),
        );
      },
    );
  }

  void addComment(String content, int post_id, int toUser, int idCmt) async {
    if (context != null) {
      var type = socketManager.repCmtId > 0 ? 'REPCOMMENT' : 'COMMENT';
      print("OK");
      socketManager.sendNotify(content, post_id, toUser, type, idCmt);
    }
  }

  Future<List> _fetchReplies(int postId, int idComment) async {
    print(postId);
    print(idComment);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };
    http.Response response;

    response = await http.post(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/comment/reply"),
        headers: headers,
        body: jsonEncode({'idPost': postId, 'cmtId': idComment}));

    if (response.statusCode == 200) {
      Map<String, dynamic> data =
          jsonDecode(Utf8Decoder().convert(response.bodyBytes));
      print(data);
      return data['list_comment'];
    } else {
      throw Exception('Failed to load comments');
    }
  }

  Future<void> _fetchComments(int postId) async {
    print(postId);
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type':
          'application/json', // Điều này phụ thuộc vào yêu cầu cụ thể của máy chủ
    };
    http.Response response;

    response = await http.post(
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/load/comment"),
        headers: headers,
        body: postId.toString());

    if (response.statusCode == 200) {
      Map<String, dynamic> data =
          jsonDecode(Utf8Decoder().convert(response.bodyBytes));

      // return data['list_comment'];
      socketManager.updateListComment(data['list_comment']);
    } else {
      throw Exception('Failed to load comments');
    }
  }

  Future<bool> checkInterested(int postId, List<dynamic> interested) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var currentUserId = await prefs.getInt('id');
    Map<int, bool> mapInterested = {};
    mapInterested[postId] = false;

    // Các hoạt động bất đồng bộ
    await Future.forEach(interested, (user) {
      if (user['user_id'] == currentUserId) {
        mapInterested[postId] = true;
        return;
      }
    });

    return mapInterested[postId] ?? false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[300],
        body: Stack(children: <Widget>[
          Column(
            children: [
              MyAppBar(),
              Container(
                padding: EdgeInsets.only(top: 0),
                height: 90,
                width: MediaQuery.of(context).size.width,
                color: Colors.white,
                child: Column(children: [
                  Row(
                    children: [
                      Container(
                        margin: EdgeInsets.only(left: 10),
                        child: CircleAvatar(
                          backgroundImage: avatarUser != null
                              ? NetworkImage(avatarUser!)
                              : NetworkImage(
                                  'https://firebasestorage.googleapis.com/v0/b/destiny-davisy.appspot.com/o/daviuser.png?alt=media&token=2d59b1a7-5ce8-4d5a-96f6-17b32a620b51&_gl=1*1g5m6wy*_ga*MTcxMDU3NTczOS4xNjc2OTc2NjE1*_ga_CW55HF8NVT*MTY5NjUwMzgxNi44LjEuMTY5NjUwNTk0MC4xNy4wLjA.'),
                        ),
                      ),
                      Container(
                        margin: EdgeInsets.only(left: 15),
                        width: 300,
                        child: TextField(
                          decoration: InputDecoration(
                              hintText: "Bạn đang nghĩ gì ?",
                              border: InputBorder.none),
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
              ),
              Expanded(
                child: ListView(
                  controller: _scrollController,
                  children: <Widget>[
                    // if (listPost != null)
                    for (int i = 0;
                        listPost?.length != null && i < listPost!.length;
                        i++)
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
                                      margin:
                                          EdgeInsets.only(left: 10, top: 10),
                                      child: InkWell(
                                        onTap: () async {
                                          SharedPreferences prefs =
                                              await SharedPreferences
                                                  .getInstance();
                                          await prefs.setInt(
                                              'id', listPost![i]['user_id']);
                                          await prefs.setInt('user', 0);
                                          runApp(GetMaterialApp(
                                            home: ProfileView(),
                                          ));
                                        },
                                        child: CircleAvatar(
                                          backgroundImage: NetworkImage(
                                              listPost![i]['avatar']),
                                        ),
                                      ),
                                    ),
                                    Container(
                                        margin:
                                            EdgeInsets.only(left: 10, top: 10),
                                        child: listPost![i]
                                                    ['postEntityProfile'] ==
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
                                                  maxWidth:
                                                      MediaQuery.of(context)
                                                              .size
                                                              .width *
                                                          0.75,
                                                ),
                                                child: Text(
                                                  listPost![i]['fullname'] +
                                                      " đã chia sẻ bài viết của " +
                                                      listPost![i][
                                                              'postEntityProfile']
                                                          ['fullname'],
                                                  style:
                                                      TextStyle(fontSize: 15),
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
                                              padding:
                                                  EdgeInsets.only(left: 10.0),
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
                                              padding:
                                                  EdgeInsets.only(left: 10.0),
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
                                                        BorderRadius.circular(
                                                            6),
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
                                                      backgroundImage:
                                                          NetworkImage(listPost![
                                                                      i][
                                                                  'postEntityProfile']
                                                              ['avatar']),
                                                    ),
                                                  ),
                                                ),
                                                Container(
                                                    margin: EdgeInsets.only(
                                                        left: 10, top: 10),
                                                    child: Text(
                                                      listPost![i][
                                                              'postEntityProfile']
                                                          ['fullname'],
                                                      style: TextStyle(
                                                        fontSize: 15,
                                                        fontWeight:
                                                            FontWeight.w500,
                                                      ),
                                                    ))
                                              ],
                                            ),
                                            Container(
                                              margin:
                                                  EdgeInsets.only(right: 10),
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
                                                          padding:
                                                              EdgeInsets.only(
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
                                                          padding:
                                                              EdgeInsets.only(
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
                                                listPost![i]
                                                        ['postEntityProfile']
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
                                                                as List<
                                                                    dynamic>?)
                                                            ?.map<Widget>(
                                                                (imageData) {
                                                          if (imageData
                                                              is String) {
                                                            return ClipRRect(
                                                              borderRadius:
                                                                  BorderRadius
                                                                      .circular(
                                                                          6),
                                                              child:
                                                                  Image.network(
                                                                imageData,
                                                                height: 200,
                                                                width: 350,
                                                                fit: BoxFit
                                                                    .cover,
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
                                  width:
                                      MediaQuery.of(context).size.width * 0.33,
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
                                  width:
                                      MediaQuery.of(context).size.width * 0.33,
                                  child: GestureDetector(
                                    onTap: () {
                                      _showCommentDialog(
                                          listPost![i]['post_id'],
                                          listPost![i][
                                              'user_id']); // Gọi hàm để hiển thị dialog khi nhấn vào bình luận
                                    },
                                    child: Container(
                                      width: 90,
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
                                            width: 20,
                                            child: Text(listPost![i]
                                                    ['countCommnet']
                                                .toString()),
                                          ),
                                        ],
                                      ),
                                    ),
                                  ),
                                ),
                                Container(
                                  margin: EdgeInsets.only(top: 10),
                                  alignment: Alignment.center,
                                  height: 50,
                                  width:
                                      MediaQuery.of(context).size.width * 0.33,
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
          isLoading
              ? Container(
                  color: Colors.black.withOpacity(0.5),
                  child: Center(
                    child: SpinKitWave(
                      color: Colors.white,
                      size: 50.0,
                    ),
                  ),
                )
              : SizedBox(),
        ]));
  }
}