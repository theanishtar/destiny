import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:image_picker/image_picker.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:quickalert/quickalert.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;
import 'package:firebase_storage/firebase_storage.dart';
import 'package:path/path.dart' as Path;
import 'package:flutter_spinkit/flutter_spinkit.dart';

class CreatePost extends StatefulWidget {
  const CreatePost({Key? key}) : super(key: key);

  @override
  _CreatePostState createState() => _CreatePostState();
}

class _CreatePostState extends State<CreatePost> {
  final TextEditingController productController = TextEditingController();
  final TextEditingController hastagController = TextEditingController();
  final TextEditingController contentController = TextEditingController();
  List<String> _provinces = [];
  String? valueChoose;
  bool post_status = true;
  List<String> _categories = ['Công khai', 'Riêng tư'];
  bool _isLoading = false;
  // File? _image;
  List<File> _images = [];
  String? _selectedProvince;
  // List<String> _provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ'];

  String? _selectedDistrict;
  List<String> _districts = [];

  String? _selectedWard;
  List<String> _wards = [];
  @override
  void initState() {
    super.initState();
    this.loadProvinces();
  }

  void showAlertSuccess() {
    QuickAlert.show(
        context: context,
        title: "Thành công",
        text: "Đăng bài thành công !",
        type: QuickAlertType.success);
  }

  Future<List<String>> fetchProvinces() async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };
    final res = await http.get(
      Uri.parse(ApiEndPoints.baseUrl + "v1/user/getAllProvinceName"),
      headers: headers,
    );

    if (res.statusCode == 200) {
      // Kiểm tra dữ liệu trả về từ API
      List<dynamic> decodedData =
          jsonDecode(Utf8Decoder().convert(res.bodyBytes));

      // Chuyển đổi thành danh sách chuỗi (List<String>)
      List<String> provinces =
          decodedData.map((item) => item.toString()).toList();

      print("Tỉnh: ");
      print(provinces);
      return provinces;
    } else {
      throw Exception('Failed to load provinces');
    }
  }

  void fetchDistricts(String selectedProvince) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };
    final res = await http.get(
      Uri.parse(ApiEndPoints.baseUrl +
          "v1/user/getAllDistrictName/" +
          selectedProvince),
      headers: headers,
    );

    if (res.statusCode == 200) {
      // Kiểm tra dữ liệu trả về từ API
      List<dynamic> decodedData =
          jsonDecode(Utf8Decoder().convert(res.bodyBytes));

      // Chuyển đổi thành danh sách chuỗi (List<String>)
      List<String> districts =
          decodedData.map((item) => item.toString()).toList();
      setState(() {
        _districts = districts;
        _selectedDistrict =
            null; // Đặt giá trị đã chọn về null để xóa lựa chọn trước đó (nếu cần)
      });
    }
  }

  void fetchWards(String selectedDistrict) async {
    SharedPreferences prefs = await SharedPreferences.getInstance();
    var value = await prefs.getString('token');
    var headers = {
      'Authorization': 'Bearer $value',
      'Content-Type': 'application/json',
    };
    final res = await http.get(
      Uri.parse(
          ApiEndPoints.baseUrl + "v1/user/getAllWardName/" + selectedDistrict),
      headers: headers,
    );

    if (res.statusCode == 200) {
      // Kiểm tra dữ liệu trả về từ API
      List<dynamic> decodedData =
          jsonDecode(Utf8Decoder().convert(res.bodyBytes));

      // Chuyển đổi thành danh sách chuỗi (List<String>)
      List<String> wards = decodedData.map((item) => item.toString()).toList();
      setState(() {
        _wards = wards;
        _selectedWard =
            null; // Đặt giá trị đã chọn về null để xóa lựa chọn trước đó (nếu cần)
      });
    }
  }

  void loadProvinces() async {
    List<String> fetchedProvinces = await fetchProvinces();
    setState(() {
      _provinces = fetchedProvinces;
    });
  }

  // Future pickImage() async {
  //   final pickedFile =
  //       await ImagePicker().pickImage(source: ImageSource.gallery);

  //   setState(() {
  //     if (pickedFile != null) {
  //       _image = File(pickedFile.path);
  //     } else {
  //       print('Không chọn ảnh');
  //     }
  //   });
  // }
  Future<List<String>> uploadImages(List<File> images) async {
    List<String> imageUrls = [];

    for (var imageFile in images) {
      String fileName = Path.basename(imageFile.path);
      Reference firebaseStorageRef =
          FirebaseStorage.instance.ref().child('mobile/$fileName');
      UploadTask uploadTask = firebaseStorageRef.putFile(imageFile);
      TaskSnapshot taskSnapshot = await uploadTask;
      String downloadUrl = await taskSnapshot.ref.getDownloadURL();
      imageUrls.add(downloadUrl);
    }
    print(imageUrls);
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
        _images.addAll(tempImages);
        // Bỏ comment ở đây nếu bạn muốn tải lên ảnh lên Firebase Storage
        // uploadImages(tempImages);
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Tạo bài post mới'),
        leading: BackButton(
          onPressed: () {
            runApp(GetMaterialApp(
              home: BottomNavBar(),
            ));
          },
        ),
      ),
      body: Stack(children: [
        SingleChildScrollView(
          child: Padding(
            padding: EdgeInsets.all(16.0),
            child: Column(
              children: <Widget>[
                _images.isEmpty
                    ? Text('Chưa chọn ảnh')
                    : SizedBox(
                        height: 100,
                        child: ListView.builder(
                          scrollDirection: Axis.horizontal,
                          itemCount: _images.length,
                          itemBuilder: (context, index) {
                            return Padding(
                              padding: EdgeInsets.all(4.0),
                              child: Image.file(_images[index]),
                            );
                          },
                        ),
                      ),
                ElevatedButton(
                  onPressed: pickImages,
                  child: Text('Chọn ảnh'),
                ),
                SizedBox(height: 16.0),
                DropdownButton<bool>(
                  hint: Text('Đối tượng'),
                  value: post_status,
                  onChanged: (bool? newValue) {
                    setState(() {
                      post_status = newValue!;
                    });
                  },
                  items: [
                    DropdownMenuItem<bool>(
                      value: false,
                      child: Text('Riêng tư'),
                    ),
                    DropdownMenuItem<bool>(
                      value: true,
                      child: Text('Công khai'),
                    ),
                  ],
                ),
                SizedBox(height: 16.0),
                TextField(
                  controller: productController,
                  decoration: InputDecoration(labelText: 'Tên sản phẩm'),
                ),
                SizedBox(height: 16.0),
                TextField(
                  controller: hastagController,
                  decoration: InputDecoration(labelText: 'Hastag'),
                ),
                SizedBox(height: 16.0),
                TextField(
                  controller: contentController,
                  decoration: InputDecoration(labelText: 'Nội dung'),
                  maxLines: 4,
                ),
                SizedBox(height: 16.0),
                Row(
                  mainAxisAlignment: MainAxisAlignment.start,
                  children: [
                    Text(
                      "Địa chỉ",
                      style:
                          TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
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
                            // Gọi hàm để load dữ liệu Quận/Huyện tương ứng với tỉnh/thành phố đã chọn
                            fetchDistricts(
                                newValue!); // Gọi hàm fetchDistricts với tham số là tỉnh/thành phố đã chọn
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
                            // Gọi hàm để load dữ liệu Phường/Xã tương ứng với Quận/Huyện đã chọn
                            fetchWards(
                                newValue!); // Gọi hàm fetchWards với tham số là Quận/Huyện đã chọn
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
                  onPressed: () async {
                    if (productController != null &&
                        contentController != null &&
                        _selectedProvince != null &&
                        _selectedDistrict != null &&
                        _selectedWard != null) {
                      // Tạo body cho request
                      Map<String, dynamic> requestBody = {
                        'product': productController.text,
                        'hash_tag': hastagController.text,
                        'content': contentController.text,
                        'post_status': post_status,
                        'province_name': _selectedProvince,
                        'district_name': _selectedDistrict,
                        'ward_name': _selectedWard,
                        'post_images': await uploadImages(
                            _images), // Gửi ảnh lên Firebase và nhận lại đường dẫn
                        // Thêm các trường thông tin khác vào đây (tên sản phẩm, hashtag, nội dung,...)
                      };

                      // Gửi request lên API
                      SharedPreferences prefs =
                          await SharedPreferences.getInstance();
                      var value = await prefs.getString('token');
                      var headers = {
                        'Authorization': 'Bearer $value',
                        'Content-Type': 'application/json',
                      };

                      var res = await http.post(
                        Uri.parse(
                            'http://192.168.137.1:8080/v1/user/upload/post'),
                        headers: headers,
                        body: jsonEncode(requestBody),
                      );

                      if (res.statusCode == 200) {
                        showAlertSuccess();
                        productController.clear();
                        hastagController.clear();
                        contentController.clear();
                        _images.clear();
                        runApp(GetMaterialApp(
                          home: BottomNavBar(),
                        ));
                      } else {
                        // Xử lý khi request không thành công
                        print('Lỗi khi tạo bài đăng mới: ${res.statusCode}');
                      }
                    } else {
                      void showAlertError() {
                        QuickAlert.show(
                            context: context,
                            // title: "Cảnh ",
                            text: "Vui lòng chọn đầy đủ thông tin !",
                            type: QuickAlertType.error);
                      }
                      // print('Vui lòng chọn đầy đủ thông tin');
                    }
                  },
                  child: Text('Đăng bài'),
                ),
              ],
            ),
          ),
        ),
        if (_isLoading)
          Container(
            color: Colors.black.withOpacity(0.5),
            child: Center(
              child: SpinKitWave(
                color: Colors.white,
                size: 50.0,
              ), // Hoặc LinearProgressIndicator()
            ),
          ),
      ]),
    );
  }
}
