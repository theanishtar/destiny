import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({super.key});

  @override
  State<CreatePost> createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  File? _image;
  Future pickImage() async {
    final pickedFile =
        await ImagePicker().pickImage(source: ImageSource.gallery);

    setState(() {
      if (pickedFile != null) {
        _image = File(pickedFile.path);
      } else {
        print('Không chọn ảnh');
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tạo bài post mới'),
      ),
      body: Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            _image == null ? Text('Chưa chọn ảnh') : Image.file(_image!),
            ElevatedButton(
              onPressed: pickImage,
              child: Text('Chọn ảnh'),
            ),
            SizedBox(height: 16.0),
            TextField(
              decoration: InputDecoration(labelText: 'Tiêu đề'),
            ),
            SizedBox(height: 16.0),
            TextField(
              decoration: InputDecoration(labelText: 'Nội dung'),
              maxLines: 4,
            ),
            SizedBox(height: 16.0),
            ElevatedButton(
              onPressed: () {
                // Xử lý tạo bài post mới với ảnh
              },
              child: Text('Đăng bài'),
            ),
          ],
        ),
      ),
    );
  }
}
