import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
import 'package:login_signup/view/bottomnavbar.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'package:http/http.dart' as http;

class ApiManager {
  late SocketManager socketManager = SocketManager();
  Future<void> fetchComments(int postId) async {
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

  Future<void> autoLogin(Map<String, dynamic> data) async {
    String code = data['code'].toString();
    String email = data['email'].toString();
    http.Response response;
    response = await http.get(Uri.parse(
        ApiEndPoints.baseUrl + "v1/oauth/login/authcode/$code/$email"));
    if (response.statusCode == 200) {
      Map<String, dynamic> user = jsonDecode(utf8.decode(response.bodyBytes));
      String token = user['token'].toString();
      int id = user['id'];
      // String fullname = data['fullname'];
      // String avatar = data['avatar'];
      SharedPreferences prefs = await SharedPreferences.getInstance();
      await prefs.setString('token', token);
      await prefs.setInt('id', id);
      runApp(GetMaterialApp(
        home: BottomNavBar(),
      ));
    }
  }
}
