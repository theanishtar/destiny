import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'package:login_signup/utils/api.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class FollowView extends StatefulWidget {
  const FollowView({Key? key}) : super(key: key);

  @override
  State<FollowView> createState() => _FollowViewState();
}

class _FollowViewState extends State<FollowView> {
  bool isLoading = false;
  List? following;
  List? follower;
  List? friends;

  bool dataLoaded = false; // Biến để kiểm tra xem dữ liệu đã tải xong chưa

  @override
  void initState() {
    super.initState();
    following = [];
    follower = [];
    friends = [];
    this.getdata();
  }

  void getdata() {
    setState(() {
      isLoading = true; // Hiển thị loading indicator
    });
    this.getDataFollowing();
    this.getDataFollower();
    this.getDataFriends();
    setState(() {
      isLoading = false; // Ẩn loading indicator sau khi tải dữ liệu
    });
  }

  Future getDataFollowing() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };

    http.Response response;
    response = await http.get(
      Uri.parse(ApiEndPoints.baseUrl + "v1/user/following/load/data"),
      headers: headers,
    );
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(utf8.decode(response.bodyBytes));
        following = data;
      });
    }
  }

  Future getDataFollower() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };

    http.Response response;
    response = await http.get(
      Uri.parse(ApiEndPoints.baseUrl + "v1/user/follower/load/data"),
      headers: headers,
    );
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(utf8.decode(response.bodyBytes));
        follower = data;
      });
    }
  }

  Future getDataFriends() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };

    http.Response response;
    response = await http.get(
      Uri.parse(ApiEndPoints.baseUrl + "v1/user/friends/load/data"),
      headers: headers,
    );
    if (response.statusCode == 200) {
      setState(() {
        List data = jsonDecode(utf8.decode(response.bodyBytes));
        friends = data;
      });
    }
  }

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
                  ListView.builder(
                    shrinkWrap: true, // Đảm bảo widget co lại theo nội dung
                    // physics: NeverScrollableScrollPhysics(),
                    itemCount: friends!.length,
                    itemBuilder: (context, i) => Container(
                      padding: EdgeInsets.only(right: 20, left: 20),
                      color: Colors.white,
                      // height: double.infinity,
                      // width: double.infinity,
                      child: Column(
                        children: [
                          Container(
                            // height: double.infinity,
                            // width: double.infinity,
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
                                        child: Image.network(
                                            friends![i]['avatar']),
                                      ),
                                    ),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          friends![i]['fullname'],
                                          style: TextStyle(
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Container(
                                          constraints:
                                              BoxConstraints(maxWidth: 100),
                                          child: Text(
                                            friends![i]['username'],
                                            style: TextStyle(
                                                color: Colors.grey[600]),
                                            maxLines: 1,
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        )
                                      ],
                                    )
                                  ],
                                ),
                                Container(
                                  height: 40,
                                  decoration: BoxDecoration(
                                    border:
                                        Border.all(color: Color(0xffeeeeee)),
                                    borderRadius: BorderRadius.circular(50),
                                  ),
                                  child: MaterialButton(
                                    elevation: 0,
                                    color: friends![i]['checkFollow']
                                        ? Color(0xffeeeeee)
                                        : Color(0xffffff),
                                    onPressed: () {
                                      setState(() {
                                        friends![i]['checkFollow'] =
                                            !friends![i]['checkFollow'];
                                      });
                                    },
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    child: Text(
                                      friends![i]['checkFollow']
                                          ? "Theo dõi"
                                          : "Hủy",
                                      style: TextStyle(color: Colors.black),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  ListView.builder(
                    shrinkWrap: true, // Đảm bảo widget co lại theo nội dung
                    // physics: NeverScrollableScrollPhysics(),
                    itemCount: following!.length,
                    itemBuilder: (context, i) => Container(
                      padding: EdgeInsets.only(right: 20, left: 20),
                      color: Colors.white,
                      // height: double.infinity,
                      // width: double.infinity,
                      child: Column(
                        children: [
                          Container(
                            // height: double.infinity,
                            // width: double.infinity,
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
                                        child: Image.network(
                                            following![i]['avatar']),
                                      ),
                                    ),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          following![i]['fullname'],
                                          style: TextStyle(
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          following![i]['username'],
                                          style: TextStyle(
                                              color: Colors.grey[600]),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                                Container(
                                  height: 40,
                                  decoration: BoxDecoration(
                                    border:
                                        Border.all(color: Color(0xffeeeeee)),
                                    borderRadius: BorderRadius.circular(50),
                                  ),
                                  child: MaterialButton(
                                    elevation: 0,
                                    color: following![i]['checkFollow']
                                        ? Color(0xffeeeeee)
                                        : Color(0xffffff),
                                    onPressed: () {
                                      setState(() {
                                        following![i]['checkFollow'] =
                                            !following![i]['checkFollow'];
                                      });
                                    },
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    child: Text(
                                      following![i]['checkFollow']
                                          ? "Theo dõi"
                                          : "Bỏ theo dõi",
                                      style: TextStyle(color: Colors.black),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                  ListView.builder(
                    shrinkWrap: true, // Đảm bảo widget co lại theo nội dung
                    // physics: NeverScrollableScrollPhysics(),
                    itemCount: follower!.length,
                    itemBuilder: (context, i) => Container(
                      padding: EdgeInsets.only(right: 20, left: 20),
                      color: Colors.white,
                      // height: double.infinity,
                      // width: double.infinity,
                      child: Column(
                        children: [
                          Container(
                            // height: double.infinity,
                            // width: double.infinity,
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
                                        child: Image.network(
                                            follower![i]['avatar']),
                                      ),
                                    ),
                                    SizedBox(
                                      width: 10,
                                    ),
                                    Column(
                                      crossAxisAlignment:
                                          CrossAxisAlignment.start,
                                      children: [
                                        Text(
                                          follower![i]['fullname'],
                                          style: TextStyle(
                                              color: Colors.black,
                                              fontWeight: FontWeight.w500),
                                        ),
                                        SizedBox(
                                          height: 5,
                                        ),
                                        Text(
                                          follower![i]['username'],
                                          style: TextStyle(
                                              color: Colors.grey[600]),
                                          maxLines: 1,
                                          overflow: TextOverflow.ellipsis,
                                        ),
                                      ],
                                    )
                                  ],
                                ),
                                Container(
                                  height: 40,
                                  decoration: BoxDecoration(
                                    border:
                                        Border.all(color: Color(0xffeeeeee)),
                                    borderRadius: BorderRadius.circular(50),
                                  ),
                                  child: MaterialButton(
                                    elevation: 0,
                                    color: follower![i]['checkFollow']
                                        ? Color(0xffeeeeee)
                                        : Color(0xffffff),
                                    onPressed: () {
                                      setState(() {
                                        follower![i]['checkFollow'] =
                                            !follower![i]['checkFollow'];
                                      });
                                    },
                                    shape: RoundedRectangleBorder(
                                      borderRadius: BorderRadius.circular(50),
                                    ),
                                    child: Text(
                                      follower![i]['checkFollow']
                                          ? "Bỏ theo dõi"
                                          : "Theo dõi",
                                      style: TextStyle(color: Colors.black),
                                    ),
                                  ),
                                ),
                              ],
                            ),
                          ),
                        ],
                      ),
                    ),
                  ),
                ],
              ),
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
          ],
        ),

        // Hiển thị tiến trình tải
      ),
    );
  }
}
