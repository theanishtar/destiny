import 'package:flutter/material.dart';
import 'package:login_signup/models/UserModel.dart';

class UserProvider extends ChangeNotifier {
  List<UserModel> _listUser = [];

  List<UserModel> get listUser => _listUser;

  void updateUserList(List<UserModel> newList) {
    _listUser = newList;
    notifyListeners(); // Thông báo cho người nghe về sự thay đổi dữ liệu
  }
}
