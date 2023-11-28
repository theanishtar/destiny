import 'dart:async';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/models/UserModel.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:firebase_storage/firebase_storage.dart';
import 'package:path/path.dart' as Path;

class ChatBottomSheet extends StatefulWidget {
  const ChatBottomSheet({Key? key});

  @override
  State<ChatBottomSheet> createState() => _ChatBottomSheetState();
}

class _ChatBottomSheetState extends State<ChatBottomSheet> {
  final TextEditingController textValue = TextEditingController();
  late SocketManager socketManager = SocketManager();
  late UserModel userModel = socketManager.userChatPage;
  List<File> pickedImages = []; // Danh sách hình ảnh đã chọn

  Future<List<String>> uploadImages(List<File> images) async {
    List<String> imageUrls = [];

    for (var imageFile in images) {
      String fileName = Path.basename(imageFile.path);
      Reference firebaseStorageRef =
          FirebaseStorage.instance.ref().child('message-image/$fileName');
      UploadTask uploadTask = firebaseStorageRef.putFile(imageFile);
      TaskSnapshot taskSnapshot = await uploadTask;
      String downloadUrl = await taskSnapshot.ref.getDownloadURL();
      imageUrls.add(downloadUrl);
    }
    print("aaaaaaaaaa" + imageUrls.toString());
    return imageUrls;
  }

  Future<void> pickImages() async {
    List<XFile>? pickedFiles =
        await ImagePicker().pickMultiImage(maxWidth: 800, maxHeight: 600);

    if (pickedFiles != null) {
      List<File> tempImages = [];
      for (var file in pickedFiles) {
        tempImages.add(File(file.path));
      }

      setState(() {
        this.pickedImages.addAll(tempImages);
        print("zzzz " + this.pickedImages.toString());
      });
    }
  }

  void sendMessage(String message) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    int id_user = await prefs.getInt('id') ?? 0;
    List<String> images = [];
    String type = '';

    if (this.pickedImages.length > 0) {
      type = "image";
      images = await uploadImages(this.pickedImages);
    }
    socketManager.sendMessage(
        id_user, message, '', userModel.user_id, type, images);
  }

  void removeImage(int index) {
    setState(() {
      this.pickedImages.removeAt(index);
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 65,
      decoration: BoxDecoration(color: Colors.white, boxShadow: [
        BoxShadow(
          color: Colors.grey.withOpacity(0.5),
          spreadRadius: 2,
          blurRadius: 10,
          offset: Offset(0, 3),
        )
      ]),
      child: Row(
        children: [
          Padding(
            padding: const EdgeInsets.only(right: 10, left: 10),
            child: InkWell(
              onTap: pickImages, // Chọn hình ảnh khi nhấn vào biểu tượng ảnh
              child: Icon(
                Icons.image,
                color: Colors.blue,
                size: 30,
              ),
            ),
          ),
          Padding(
            padding: EdgeInsets.only(left: 10),
            child: Container(
              alignment: Alignment.centerRight,
              width: 270,
              child: Wrap(
                alignment: WrapAlignment.end,
                children: [
                  // Hiển thị các hình ảnh đã chọn và biểu tượng "x"
                  for (var index = 0; index < pickedImages.length; index++)
                    Stack(
                      children: [
                        Padding(
                          padding: EdgeInsets.symmetric(horizontal: 4.0),
                          child: Image.file(
                            pickedImages[index],
                            width: 50,
                            height: 50,
                            fit: BoxFit.cover,
                          ),
                        ),
                        Positioned(
                          top: 0,
                          right: 0,
                          child: GestureDetector(
                            onTap: () {
                              removeImage(index);
                            },
                            child: Container(
                              decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                color: Colors.red, // Màu sắc biểu tượng "x"
                              ),
                              child: Icon(
                                Icons.close,
                                color:
                                    Colors.white, // Màu sắc của biểu tượng "x"
                                size: 18,
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  // Hiển thị nội dung văn bản của tin nhắn
                  Expanded(
                    child: TextFormField(
                      decoration: InputDecoration(
                        hintText: "Tin nhắn...",
                        border: InputBorder.none,
                      ),
                      controller: textValue,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Spacer(),
          Padding(
            padding: EdgeInsets.only(right: 10),
            child: InkWell(
              onTap: () {
                sendMessage(textValue.text.toString());

                socketManager.scrollController
                    .addListener(socketManager.scrollToBottom);

                // Tạo một Timer để xóa listener sau 10 giây
                Timer(Duration(seconds: 5), () {
                  socketManager.scrollController
                      .removeListener(socketManager.scrollToBottom);
                });

                textValue.clear();
                // pickedImages.clear();
              },
              child: Icon(
                Icons.send,
                color: GlobalColors.mainColor,
                size: 30,
              ),
            ),
          )
        ],
      ),
    );
  }
}
