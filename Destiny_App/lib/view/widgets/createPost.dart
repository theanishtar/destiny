import 'dart:io';
import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({Key? key}) : super(key: key);

  @override
  _CreatePostState createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  String? valueChoose;
  String? _selectedCategory;
  List<String> _categories = ['Công khai', 'Riêng tư'];

  File? _image;

  String? _selectedProvince;
  List<String> _provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ'];

  String? _selectedDistrict;
  List<String> _districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận 4'];

  String? _selectedWard;
  List<String> _wards = ['Phường 1', 'Phường 2', 'Phường 3', 'Phường 4'];

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
        leading: BackButton(
          onPressed: () {
            Navigator.pop(context);
          },
        ),
      ),
      body: SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              _image == null ? Text('Chưa chọn ảnh') : Image.file(_image!),
              ElevatedButton(
                onPressed: pickImage,
                child: Text('Chọn ảnh'),
              ),
              SizedBox(height: 16.0),
              DropdownButton<String>(
                hint: Text(
                    'Đối tượng'), // Text hiển thị khi chưa chọn danh mục nào
                value: _selectedCategory,
                onChanged: (String? newValue) {
                  setState(() {
                    _selectedCategory = newValue;
                  });
                },
                items: _categories.map((String category) {
                  return DropdownMenuItem<String>(
                    value: category,
                    child: Text(category),
                  );
                }).toList(),
              ),
              SizedBox(height: 16.0),
              TextField(
                decoration: InputDecoration(labelText: 'Tên sản phẩm'),
              ),
              SizedBox(height: 16.0),
              TextField(
                decoration: InputDecoration(labelText: 'Hastag'),
              ),
              SizedBox(height: 16.0),
              TextField(
                decoration: InputDecoration(labelText: 'Nội dung'),
                maxLines: 4,
              ),
              SizedBox(height: 16.0),
              Row(
                mainAxisAlignment: MainAxisAlignment.start,
                children: [
                  Text(
                    "Địa chỉ",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              Row(
                children: [
                  Expanded(
                    child: DropdownButton<String>(
                      hint: Text('Tỉnh/Thành phố'),
                      value: _selectedProvince,
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedProvince = newValue;
                        });
                      },
                      items: _provinces.map((String province) {
                        return DropdownMenuItem<String>(
                          value: province,
                          child: Text(province),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              Row(
                children: [
                  Expanded(
                    child: DropdownButton<String>(
                      hint: Text('Quận/Huyện'),
                      value: _selectedDistrict,
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedDistrict = newValue;
                        });
                      },
                      items: _districts.map((String district) {
                        return DropdownMenuItem<String>(
                          value: district,
                          child: Text(district),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              Row(
                children: [
                  Expanded(
                    child: DropdownButton<String>(
                      hint: Text('Phường/Xã'),
                      value: _selectedWard,
                      onChanged: (String? newValue) {
                        setState(() {
                          _selectedWard = newValue;
                        });
                      },
                      items: _wards.map((String ward) {
                        return DropdownMenuItem<String>(
                          value: ward,
                          child: Text(ward),
                        );
                      }).toList(),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 16.0),
              ElevatedButton(
                onPressed: () {
                  // Xử lý tạo bài post mới với ảnh, danh mục, và địa chỉ
                  print('Danh mục được chọn: $_selectedCategory');
                  print('Tỉnh/Thành phố: $_selectedProvince');
                  print('Quận/Huyện: $_selectedDistrict');
                  print('Phường/Xã: $_selectedWard');
                },
                child: Text('Đăng bài'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
