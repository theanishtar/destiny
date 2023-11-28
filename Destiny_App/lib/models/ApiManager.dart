import 'dart:convert';

import 'package:login_signup/models/SocketManager%20.dart';
import 'package:login_signup/utils/api.dart';
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
}
