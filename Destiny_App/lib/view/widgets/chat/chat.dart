// import 'dart:convert';

// import 'package:custom_clippers/custom_clippers.dart';
// import 'package:flutter/material.dart';
// import 'package:login_signup/models/SocketManager%20.dart';
// import 'package:login_signup/models/UserModel.dart';
// import 'package:login_signup/utils/api.dart';
// import 'package:login_signup/utils/gobal.colors.dart';
// import 'package:http/http.dart' as http;
// import 'package:shared_preferences/shared_preferences.dart';
// import 'package:flutter_spinkit/flutter_spinkit.dart';

// class Chat extends StatefulWidget {
//   const Chat({super.key});

//   @override
//   State<Chat> createState() => _ChatState();
// }

// class _ChatState extends State<Chat> {
//   late SocketManager socketManager = SocketManager();
//   bool isLoading = false;
//   UserModel userModel = new UserModel();
//   final ScrollController _scrollController = ScrollController();
//   final GlobalKey _scrollKey = GlobalKey();

//   @override
//   void initState() {
//     super.initState();
//     // loadData();
//     // socketManager.context = context;
//     // socketManager.onChatSampleReset = (context) {
//     //   // Reset trang ChatSample bằng cách pop và push lại trang
//     //   Navigator.of(context).popUntil((route) => route.isFirst);
//     //   Navigator.of(context).pushReplacement(
//     //     MaterialPageRoute(
//     //       builder: (context) => ChatSample(),
//     //     ),
//     //   );
//     //   print("sdaaaaaaaaaaaaaaaaaaaa");
//     // };
//   }

//   @override
//   void dispose() {
//     _scrollController.removeListener(
//         _scrollListener); // Loại bỏ listener khi widget bị dispose
//     _scrollController.dispose();
//     super.dispose();
//   }

//   void _scrollListener() {
//     if (_scrollController.position.pixels ==
//         _scrollController.position.maxScrollExtent) {
//       // Đây là cuộn đến cuối danh sách
//       // Bạn có thể thực hiện logic tải thêm dữ liệu ở đây nếu cần
//     }
//   }

//   Future<List<dynamic>> loadData() async {
//     try {
//       userModel = socketManager.userChatPage;
//       SharedPreferences prefs = await SharedPreferences.getInstance();
//       var value = await prefs.getString('token');
//       var headers = {
//         'Authorization': 'Bearer $value',
//         'Content-Type': 'application/x-www-form-urlencoded',
//       };

//       final res = await http.post(
//           Uri.parse(ApiEndPoints.baseUrl + "v1/user/chat/load/messages"),
//           headers: headers,
//           body: {'to': userModel.user_id.toString(), 'page': "1"});

//       List<dynamic> data = jsonDecode(Utf8Decoder().convert(res.bodyBytes));

//       print("bbbbbbbbbb " + data.toString());
//       socketManager.listMessages = data;

//       print("aaaaaaaaaaaa" + socketManager.listMessages.length.toString());
//       return socketManager.listMessages;
//     } catch (error) {
//       // Print or log the error for debugging purposes
//       print('Error loading data: $error');
//       throw error; // Rethrow the error to be caught by the FutureBuilder
//     } finally {}
//   }

//   void _scrollToBottom() {
//     final RenderBox renderBox =
//         _scrollKey.currentContext!.findRenderObject() as RenderBox;
//     _scrollController.animateTo(
//       renderBox.size.height,
//       duration: Duration(milliseconds: 100),
//       curve: Curves.easeOut,
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return Stack(children: <Widget>[
//       Container(
//           height: 500,
//           width: MediaQuery.of(context).size.width - 40,
//           child: Column(children: [
//             Expanded(
//               child: FutureBuilder<List<dynamic>>(
//                 future: loadData(),
//                 builder: (BuildContext context,
//                     AsyncSnapshot<List<dynamic>> snapshot) {
//                   if (snapshot.connectionState == ConnectionState.waiting) {
//                     return Center(
//                       child: CircularProgressIndicator(),
//                     );
//                   } else if (snapshot.hasData) {
//                     return ListView.builder(
//                         itemCount: snapshot.data!.length,
//                         itemBuilder: (BuildContext context, int index) {
//                           var m = snapshot.data![index];
//                           return Column(
//                             children: [
//                               if (m["day"] != null)
//                                 Center(
//                                   child: Text(
//                                     '${socketManager.checkDate(m["day"])}',
//                                     style: TextStyle(
//                                       fontSize: 16,
//                                       fontWeight: FontWeight.bold,
//                                       color: Colors.grey,
//                                     ),
//                                   ),
//                                 ),
//                               if (m['user_id'] == userModel.user_id)
//                                 Row(
//                                   crossAxisAlignment: CrossAxisAlignment.start,
//                                   mainAxisAlignment: MainAxisAlignment.start,
//                                   children: [
//                                     Padding(
//                                       padding: EdgeInsets.only(right: 10),
//                                       child: ClipRRect(
//                                         borderRadius: BorderRadius.circular(30),
//                                         child: Image.network(
//                                           userModel.avatar,
//                                           height: 45,
//                                           width: 45,
//                                           fit: BoxFit.cover,
//                                         ),
//                                       ),
//                                     ),
//                                     Container(
//                                       child: Padding(
//                                         padding: EdgeInsets.only(
//                                             top: 20, right: 110),
//                                         child: Column(
//                                           crossAxisAlignment:
//                                               CrossAxisAlignment.start,
//                                           children: [
//                                             ClipPath(
//                                               clipper: UpperNipMessageClipper(
//                                                   MessageType.receive),
//                                               child: Container(
//                                                 padding: m['type'] == 'image' &&
//                                                         m['images'] != null &&
//                                                         m['images']
//                                                             is List<dynamic>
//                                                     ? EdgeInsets.only(
//                                                         left: 15,
//                                                         top: 20,
//                                                         bottom: 10,
//                                                         right: 30,
//                                                       )
//                                                     : EdgeInsets.only(
//                                                         left: 20,
//                                                         top: 20,
//                                                         bottom: 10,
//                                                         right: 20),
//                                                 decoration: BoxDecoration(
//                                                   color: m['type'] == 'image' &&
//                                                           m['images'] != null &&
//                                                           m['images']
//                                                               is List<dynamic>
//                                                       ? GlobalColors.loadColor
//                                                       : Color(0xFFE1E1E2),
//                                                   boxShadow: [],
//                                                 ),
//                                                 child: Column(
//                                                   crossAxisAlignment:
//                                                       CrossAxisAlignment.start,
//                                                   children: [
//                                                     if (m['type'] == 'image' &&
//                                                         m['images'] != null &&
//                                                         m['images']
//                                                             is List<dynamic>)
//                                                       for (var imageUrl
//                                                           in m['images'])
//                                                         // Kiểm tra nếu là loại hình ảnh thì hiển thị hình ảnh
//                                                         ImageMessageWidget(
//                                                             imageUrl: imageUrl)
//                                                     else if (m['type'] ==
//                                                         'text')
//                                                       Text(
//                                                         m['content'],
//                                                         style: TextStyle(
//                                                             fontSize: 16),
//                                                       ),
//                                                     SizedBox(
//                                                       height: 5,
//                                                     ),
//                                                     Text(
//                                                       '${socketManager.getCustomTime(m["send_time"])}',
//                                                       style: TextStyle(
//                                                         fontSize: 12,
//                                                         color: Colors.grey,
//                                                       ),
//                                                     ),
//                                                   ],
//                                                 ),
//                                               ),
//                                             ),
//                                           ],
//                                         ),
//                                       ),
//                                     ),
//                                   ],
//                                 )
//                               else
//                                 Container(
//                                   alignment: Alignment.centerRight,
//                                   child: Padding(
//                                     padding:
//                                         EdgeInsets.only(top: 20, left: 140),
//                                     child: Stack(
//                                       children: [
//                                         Container(
//                                           child: Column(
//                                             crossAxisAlignment:
//                                                 CrossAxisAlignment.end,
//                                             children: [
//                                               ClipPath(
//                                                 clipper: LowerNipMessageClipper(
//                                                     MessageType.send),
//                                                 child: Container(
//                                                   padding: m['type'] ==
//                                                               'image' &&
//                                                           m['images'] != null &&
//                                                           m['images']
//                                                               is List<dynamic>
//                                                       ? EdgeInsets.only(
//                                                           left: 60,
//                                                           top: 10,
//                                                           bottom: 20,
//                                                           right: 10,
//                                                         )
//                                                       : EdgeInsets.only(
//                                                           left: 20,
//                                                           top: 10,
//                                                           bottom: 20,
//                                                           right: 20,
//                                                         ),
//                                                   decoration: BoxDecoration(
//                                                     color:
//                                                         m['type'] == 'image' &&
//                                                                 m['images'] !=
//                                                                     null &&
//                                                                 m['images']
//                                                                     is List<
//                                                                         dynamic>
//                                                             ? GlobalColors
//                                                                 .loadColor
//                                                             : GlobalColors
//                                                                 .mainColor,
//                                                     boxShadow: [],
//                                                   ),
//                                                   child: Column(
//                                                     crossAxisAlignment:
//                                                         CrossAxisAlignment
//                                                             .start,
//                                                     children: [
//                                                       if (m['type'] ==
//                                                               'image' &&
//                                                           m['images'] != null &&
//                                                           m['images']
//                                                               is List<dynamic>)
//                                                         // Kiểm tra nếu là loại hình ảnh thì hiển thị hình ảnh
//                                                         for (var imageUrl
//                                                             in m['images'])
//                                                           // Kiểm tra nếu là loại hình ảnh thì hiển thị hình ảnh
//                                                           ImageMessageWidget(
//                                                               imageUrl:
//                                                                   imageUrl)
//                                                       else if (m['type'] ==
//                                                           'text')
//                                                         Text(
//                                                           m['content'],
//                                                           style: TextStyle(
//                                                               fontSize: 16,
//                                                               color:
//                                                                   Colors.white),
//                                                         ),
//                                                       SizedBox(
//                                                         height: 5,
//                                                       ),
//                                                       Text(
//                                                         '${socketManager.getCustomTime(m["send_time"])}',
//                                                         style: TextStyle(
//                                                           fontSize: 12,
//                                                           color: Colors.grey,
//                                                         ),
//                                                       ),
//                                                     ],
//                                                   ),
//                                                 ),
//                                               ),
//                                             ],
//                                           ),
//                                         ),
//                                       ],
//                                     ),
//                                   ),
//                                 ),
//                             ],
//                           );
//                         });
//                   } else if (snapshot.hasError) {
//                     // Xử lý khi có lỗi xảy ra
//                     return Center(
//                       child: Text('Error loading data: ${snapshot.error}'),
//                     );
//                   } else {
//                     // Trả về một widget trống hoặc thông báo khi không có dữ liệu nào
//                     return Center(
//                       child: Text('No data available'),
//                     );
//                   }
//                 },
//               ),
//             ),
//           ]))
//     ]);
//   }
// }

// class ImageMessageWidget extends StatelessWidget {
//   final String imageUrl;

//   const ImageMessageWidget({Key? key, required this.imageUrl})
//       : super(key: key);

//   void _onImageTapped(BuildContext context) {
//     // Xử lý sự kiện khi người dùng nhấn vào ảnh ở đây
//     // Ví dụ: Mở ảnh trong một dialog hoặc chuyển sang màn hình xem ảnh lớn hơn
//     showDialog(
//       context: context,
//       builder: (BuildContext context) {
//         return Dialog(
//           child: GestureDetector(
//             onTap: () {
//               Navigator.of(context)
//                   .pop(); // Đóng dialog khi người dùng chạm vào bất kỳ nơi nào trên màn hình
//             },
//             child: Container(
//               width: 300.0,
//               height: 300.0,
//               child: Image.network(
//                 imageUrl,
//                 errorBuilder: (BuildContext context, Object exception,
//                     StackTrace? stackTrace) {
//                   // Hiển thị dòng văn bản 'Ảnh lỗi' khi hình ảnh không thể tải
//                   return Text('Ảnh lỗi');
//                 },
//                 fit: BoxFit.cover,
//               ),
//             ),
//           ),
//         );
//       },
//     );
//   }

//   @override
//   Widget build(BuildContext context) {
//     return GestureDetector(
//       onTap: () {
//         _onImageTapped(context); // Gọi hàm xử lý khi ảnh được nhấn
//       },
//       child: Container(
//         margin: EdgeInsets.only(bottom: 6.0),
//         child: Row(
//           mainAxisAlignment: MainAxisAlignment.start,
//           crossAxisAlignment: CrossAxisAlignment.start,
//           children: [
//             Container(
//               margin: EdgeInsets.only(right: 4.0, left: 4),
//               width: 150.0,
//               height: 150.0,
//               decoration: BoxDecoration(
//                 borderRadius: BorderRadius.circular(8.0),
//                 color: Colors.grey[300],
//               ),
//               child: ClipRRect(
//                 borderRadius: BorderRadius.circular(8.0),
//                 child: Image.network(
//                   imageUrl,
//                   errorBuilder: (BuildContext context, Object exception,
//                       StackTrace? stackTrace) {
//                     // Hiển thị dòng văn bản 'Ảnh lỗi' khi hình ảnh không thể tải
//                     return Text('Ảnh lỗi');
//                   },
//                   fit: BoxFit.cover,
//                 ),
//               ),
//             ),
//           ],
//         ),
//       ),
//     );
//   }
// }


// // class ImageListWidget extends StatelessWidget {
// //   final List<dynamic> imageList;

// //   const ImageListWidget({Key? key, required this.imageList}) : super(key: key);

// //   @override
// //   Widget build(BuildContext context) {
// //     return ListView.builder(
// //       itemCount: imageList.length,
// //       itemBuilder: (context, index) {
// //         return Image.network(
// //           imageList[index],
// //           height: 100, // Thiết lập kích thước hình ảnh tùy ý
// //           width: 100, // Thiết lập kích thước hình ảnh tùy ý
// //           fit: BoxFit.cover, // Chỉ định cách thức hiển thị hình ảnh
// //         );
// //       },
// //     );
// //   }
// // }
