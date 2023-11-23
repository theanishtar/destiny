import 'dart:convert';
import 'dart:io';
import 'package:get/get_navigation/get_navigation.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/utils/gobal.colors.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:login_signup/view/screens/profile.view.dart';
import 'package:shared_preferences/shared_preferences.dart';

class EditProfile extends StatefulWidget {
  @override
  State<EditProfile> createState() => _EditProfileState();
}

String? avatar;
String? fullname;
String? email;
String? birthday;
String? gender;
String? city;
String? province;
String? ward;

class _EditProfileState extends State<EditProfile> {
  TextEditingController fnameController = TextEditingController();
  TextEditingController emailController = TextEditingController();
  TextEditingController birthdayController = TextEditingController();
  TextEditingController genderController = TextEditingController();
  List<String> _provinces = [];
  String? _selectedProvince;
  // List<String> _provinces = ['Hà Nội', 'Hồ Chí Minh', 'Đà Nẵng', 'Cần Thơ'];

  String? _selectedDistrict;
  List<String> _districts = [];

  String? _selectedWard;
  List<String> _wards = [];
  @override
  void initState() {
    super.initState();
    this.getData();
    this.loadProvinces();
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
        Uri.parse(ApiEndPoints.baseUrl + "v1/user/profile/load/data"),
        headers: headers);
    if (response.statusCode == 200) {
      // List<dynamic> data = json.decode('[' + response.body + ']');
      // print(data);

      setState(() {
        Map<String, dynamic> data =
            jsonDecode(Utf8Decoder().convert(response.bodyBytes));
        print(data['fullname']);
        avatar = data['avartar'];
        fullname = data['fullname'];
        email = data['email'];
        birthday = data['birthday'];
        print(birthday);
        gender = data['gender_name'];
        city = data['district_name'];
        province = data['province_name'];
        ward = data['ward_name'];
        fnameController.text = fullname!;
        emailController.text = email!;
        birthdayController.text = birthday!;
        genderController.text = gender!;
        // _selectedProvince = city;
        // _selectedDistrict = province;
        // _selectedWard = ward;
        // textfname = fname.text;
        // textfname = name;
      });
      // print(fname);
      // Sử dụng dữ liệu này theo nhu cầu của bạn
      // print('Name: $name');
      // print('Avatar: $avatar');
      // print('Token: $email');
      // print('Refresh Token: $refreshToken');
    }
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

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          centerTitle: true,
          leading: BackButton(onPressed: () {
            runApp(GetMaterialApp(
              home: BottomNavBar(),
            ));
          }),
          title: Text("Chỉnh sửa trang cá nhân"),
        ),
        body: Container(
          padding: EdgeInsets.only(left: 15, top: 20, right: 15),
          child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
            },
            child: ListView(
              children: [
                Center(
                  child: Stack(
                    children: [
                      Container(
                        width: 130,
                        height: 130,
                        decoration: BoxDecoration(
                            border: Border.all(width: 4, color: Colors.white),
                            boxShadow: [
                              BoxShadow(
                                  spreadRadius: 2,
                                  blurRadius: 10,
                                  color: Colors.black.withOpacity(0.1))
                            ],
                            shape: BoxShape.circle,
                            image: DecorationImage(
                                fit: BoxFit.cover,
                                image: NetworkImage(avatar ?? ''))),
                      ),
                      Positioned(
                        bottom: 0,
                        right: 0,
                        child: Container(
                          height: 40,
                          width: 40,
                          decoration: BoxDecoration(
                              shape: BoxShape.circle,
                              border: Border.all(width: 4, color: Colors.white),
                              color: GlobalColors.mainColor),
                          child: InkWell(
                            onTap: () {},
                            child: Icon(
                              Icons.edit,
                              color: Colors.white,
                            ),
                          ),
                        ),
                      ),
                    ],
                  ),
                ),
                SizedBox(
                  height: 30,
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextField(
                    controller: fnameController,
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Họ và tên",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        // hintText: fullname,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    controller: emailController,
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Email",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        // hintText: email,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    controller: birthdayController,
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Ngày sinh",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        // hintText: birthday,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
                Padding(
                  padding: EdgeInsets.only(bottom: 30),
                  child: TextFormField(
                    controller: genderController,
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding: EdgeInsets.only(bottom: 5),
                        labelText: "Giới tính",
                        floatingLabelBehavior: FloatingLabelBehavior.always,
                        hintText: birthday,
                        hintStyle: TextStyle(
                            fontSize: 16,
                            fontWeight: FontWeight.bold,
                            color: Colors.grey)),
                  ),
                ),
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
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                  children: [
                    OutlinedButton(
                      onPressed: () {
                        runApp(GetMaterialApp(
                          home: ProfileView(),
                        ));
                      },
                      child: Text(
                        "Hủy",
                        style: TextStyle(
                            fontSize: 15,
                            letterSpacing: 2,
                            color: Colors.black),
                      ),
                      style: OutlinedButton.styleFrom(
                          padding: EdgeInsets.symmetric(horizontal: 60),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20))),
                    ),
                    ElevatedButton(
                      onPressed: () {},
                      child: Text(
                        "Cập nhật",
                        style: TextStyle(
                            fontSize: 15,
                            letterSpacing: 2,
                            color: Colors.white),
                      ),
                      style: ElevatedButton.styleFrom(
                          primary: GlobalColors.mainColor,
                          padding: EdgeInsets.symmetric(horizontal: 40),
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20))),
                    ),
                  ],
                ),
                SizedBox(
                  height: 40,
                )
              ],
            ),
          ),
        ));
  }
}

Widget buildTextField(
    String labelText, String placeholder, bool isPasswordTextField) {
  return Padding(
    padding: EdgeInsets.only(bottom: 30),
    child: TextFormField(
      obscureText: isPasswordTextField ? true : false,
      decoration: InputDecoration(
          contentPadding: EdgeInsets.only(bottom: 5),
          labelText: labelText,
          floatingLabelBehavior: FloatingLabelBehavior.always,
          hintText: placeholder,
          hintStyle: TextStyle(
              fontSize: 16, fontWeight: FontWeight.bold, color: Colors.grey)),
    ),
  );
}
